(function () {
  'use strict';

  // ★ 前端页面全部隐藏所有编辑控件
const EDIT_MODE = /admin\.html$/i.test(window.location.pathname);

  // ================= 常量 =================
  const STORE_KEY = 'navStoreV2';
  const DATA_SOURCE = 'nav.json';

  const DEFAULT_GROUP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 1 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
  const PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  const EDIT_ICON = '<svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';
  const TRASH_ICON = '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 1 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

  // 全局状态
  let navData = [];
  let currentView = null;
  let currentFiltered = null; // 站内搜索的筛选结果，null 表示未搜索

  // ORIGINAL：data.js 内置数据的深拷贝，作为 nav.json 不可用时的唯一兜底
  let ORIGINAL = window.__NAV_ORIGINAL__ || [];
  if (!Array.isArray(ORIGINAL)) ORIGINAL = [];

  // DOM 引用（延迟取值，避免脚本执行时 DOM 未就绪）
  let navList, content, logo;

  // ================= 数据层 =================
  // 数据源策略（方案 B）：
  //   ① 优先读取仓库根目录的 nav.json（多端共享的唯一真实数据源）
  //   ② nav.json 加载失败 / 解析失败 / 为空数组 → 回退到 data.js 内置数据
  //   localStorage 仅作为“本机编辑草稿”使用，不再参与数据源优先级判定，
  //   避免不同设备读到不同版本导致前后端图标不一致。
  async function loadNavData() {
    // ① 真实数据源：nav.json（加时间戳与 no-store 绕过 CDN/浏览器缓存）
    //    后台保存 = 下载 nav.json → 手动上传覆盖仓库，此后所有端 fetch 到同一份。
    // ② nav.json 不可用 → 回退到 data.js 内置数据（本地预览 / 文件缺失时的降级）
    // ③ localStorage 仅存“编辑草稿”，不参与数据源判定，避免各端读到不同版本。
    let data = null;
    let reason = '';
    try {
      const res = await fetch(DATA_SOURCE + '?v=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        data = await res.json();
        if (!Array.isArray(data) || data.length === 0) { data = null; reason = 'nav.json 内容为空或不是数组'; }
      } else {
        reason = 'nav.json 响应异常（状态 ' + res.status + '）';
      }
    } catch (e) {
      reason = 'nav.json 不可达（' + e.message + '）';
    }

    if (data) {
      navData = data;
      console.log('[数据源] nav.json ✓  共 ' + navData.length + ' 组');
      // 以 nav.json 为准刷新草稿，保证下次编辑基于最新版本
      try { localStorage.setItem(STORE_KEY, JSON.stringify(navData)); } catch (e) {}
      return;
    }

    // ② 兜底：data.js 内置数据（仅 nav.json 确实不可用时）
    navData = JSON.parse(JSON.stringify(ORIGINAL));
    console.warn('[数据源] 回退到 data.js，共 ' + navData.length + ' 组 —— ' + reason);
  }

  // 保存：仅写入本机 localStorage（静态托管无法写回仓库文件）
  function saveNavData() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(navData));
    } catch (e) {
      console.warn('[保存] localStorage 写入失败:', e.message);
    }
  }

  // 导出：生成 nav.json 供手动上传到仓库
  function exportNavJson() {
    const blob = new Blob([JSON.stringify(navData, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nav.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ================= 工具函数 =================
  function svgFromString(str) {
    if (!str) return null;
    try {
      const d = document.createElement('div');
      d.innerHTML = str.trim();
      const svg = d.querySelector('svg');
      return svg && svg.cloneNode(true);
    } catch (e) { return null; }
  }

  function svgToString(svgNode) {
    if (!svgNode) return '';
    const clone = svgNode.cloneNode(true);
    clone.setAttribute('width', '18');
    clone.setAttribute('height', '18');
    clone.classList.add('section-icon');
    return new XMLSerializer().serializeToString(clone);
  }

    function getSectionIcon(sec) {
    // 优先用分组自带的 icon
    if (sec && sec.icon) {
      const node = svgFromString(sec.icon);
      if (node) return svgToString(node);
    }
    // 兜底：默认文件夹图标（不再依赖 navIcons，避免引用不存在的变量）
    return svgToString(svgFromString(DEFAULT_GROUP_ICON));
  }

  function getDomain(rawUrl) {
    try {
      const u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
      return u.hostname;
    } catch (e) { return ''; }
  }

  // 仅在用户未填写图标时提供默认取值；不主动抓取，避免 CORS 失败
  function getDefaultIcon(rawUrl) {
    const domain = getDomain(rawUrl);
    return domain ? 'https://icons.duckduckgo.com/ip3/' + domain + '.ico' : '';
  }

  function getFallback(l) {
    const ch = (l.title || '?').trim().charAt(0).toUpperCase();
    let hash = 0;
    const seed = l.title || l.url || '';
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return { ch, hue: hash % 360 };
  }

  // ================= 主题：深浅模式 =================
  // 说明：HTML 里 .theme-icon 是空标签，图标必须由 JS 注入（与 custom.js 行为一致）。
  // CSS（.theme-icon .icon-sun / .icon-moon + html[data-theme="dark"]）负责切换动画。
  const SUN_ICON = '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const MOON_ICON = '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  // 主题切换：系统跟随最高优先级（与 custom.js 后台保持一致）
  // - 每次刷新都重新读取系统偏好
  // - 手动切换仅本会话生效，刷新后立即回到系统值
  // - 不向 localStorage 写入任何主题锁定值
  function systemPrefersDark() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) { return false; }
  }

  function updateThemeButton(theme) {
    const themeText = document.querySelector('.theme-text');
    if (themeText) themeText.textContent = theme === 'dark' ? '浅色模式' : '深色模式';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.querySelector('.theme-icon');

    // 注入日月图标（避免重复注入）
    if (themeIcon && !themeIcon.querySelector('svg')) {
      themeIcon.innerHTML = SUN_ICON + MOON_ICON;
    }

    // 系统跟随最高优先级：每次刷新都重新读系统偏好
    applyTheme(systemPrefersDark() ? 'dark' : 'light');

    // 监听系统主题变化，实时跟随（任何时候都响应，不做任何锁定）
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = function (e) { applyTheme(e.matches ? 'dark' : 'light'); };
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler); // Safari < 14
    }

    if (themeBtn) {
      themeBtn.onclick = function () {
        // 手动切换：仅本会话生效，刷新后立即回到系统值
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      };
    }
  }


  // Logo 点击 → 显示全部（与 custom.js 后台行为一致）
  function bindLogoClick() {
    if (!logo) return;
    logo.onclick = function () {
      currentView = null;
      currentFiltered = null;
      renderSidebar(navData);
      renderContent(navData.filter(function (s) { return (s.links || []).length > 0; }));
    };
    logo.style.cursor = 'pointer';
  }

  // 搜索引擎切换（与 custom.js 后台逻辑一致）
  // 依赖 HTML 结构：#searchTags 容器内的 .tag 按钮带 data-engine 属性
  var SEARCH_ENGINES = {
    site:   { url: null,                                   placeholder: '按 \\ 快速唤起搜索' },
    bing:   { url: 'https://www.bing.com/search?q=',       placeholder: 'Bing 搜索' },
    baidu:  { url: 'https://www.baidu.com/s?wd=',         placeholder: '百度一下' },
    google: { url: 'https://www.google.com/search?q=',     placeholder: 'Google 搜索' }
  };
  var currentEngine = 'site';

  function bindSearchEngines() {
    var container = document.getElementById('searchTags');
    if (!container) return;
    var input = document.getElementById('subSearchInput');

    function updatePlaceholder() {
      if (input && SEARCH_ENGINES[currentEngine]) {
        input.placeholder = SEARCH_ENGINES[currentEngine].placeholder;
      }
    }

    container.querySelectorAll('.tag').forEach(function (btn) {
      btn.onclick = function () {
        container.querySelectorAll('.tag').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentEngine = btn.dataset.engine;
        updatePlaceholder();
      };
    });

    updatePlaceholder();
  }

  // 站内搜索过滤（仅搜索 title / url / desc 字段）
  function filterData(data, keyword) {
    var kw = (keyword || '').toLowerCase();
    return (data || []).map(function (sec) {
      var matched = (sec.links || []).filter(function (l) {
        return (l.title || '').toLowerCase().indexOf(kw) >= 0 ||
               (l.url || '').toLowerCase().indexOf(kw) >= 0 ||
               (l.desc || '').toLowerCase().indexOf(kw) >= 0;
      });
      return { category: sec.category, icon: sec.icon, links: matched };
    }).filter(function (sec) { return sec.links.length > 0; });
  }

  // 搜索完成后清空输入框
  function clearSearchInput() {
    var input = document.getElementById('subSearchInput');
    if (input) input.value = '';
  }

  // 站内搜索：记录筛选结果，使分组切换/Logo 点击能正确退出搜索态
  function enterSearchState(filtered) {
    currentFiltered = filtered;
    renderContent(filtered);
  }

  function exitSearchState() {
    currentFiltered = null;
    renderContentForCurrent();
  }

  function doSearchWithEngine(keyword) {
    if (!keyword) {
      exitSearchState();
      clearSearchInput();
      return;
    }
    if (currentEngine === 'site') {
      enterSearchState(filterData(navData, keyword));
    } else if (SEARCH_ENGINES[currentEngine]) {
      window.open(SEARCH_ENGINES[currentEngine].url + encodeURIComponent(keyword), '_blank');
    }
    clearSearchInput();
  }

  // 前台搜索绑定：按钮点击 + 回车 + 实时筛选 + / 聚焦
  function bindSearchInput() {
    var input = document.getElementById('subSearchInput');
    var btn = document.getElementById('subSearchBtn');
    if (!input) return;

    function doSearch() {
      doSearchWithEngine(input.value.trim());
    }

    // 站内模式：输入即实时筛选；外部引擎模式不实时跳转
    input.addEventListener('input', function () {
      if (currentEngine === 'site') {
        var kw = input.value.trim();
        if (kw) {
          enterSearchState(filterData(navData, kw));
        } else {
          exitSearchState();
        }
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
      if (e.key === 'Escape') {
        input.value = '';
        exitSearchState();
        input.blur();
      }
    });

    if (btn) btn.onclick = doSearch;

    // 按 \ 快速聚焦搜索框（不与中文输入冲突）
    document.addEventListener('keydown', function (e) {
      if ((e.key === '\\' || e.code === 'Backslash') && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // ================= 渲染层 =================
  function cardTpl(l, cat, index) {
    const fb = getFallback(l);
    const bg = 'hsl(' + fb.hue + ', 65%, 88%)';
    const fg = 'hsl(' + fb.hue + ', 45%, 32%)';
    const safeUrl = (l.url || '').replace(/"/g, '&quot;');
    const iconHtml = l.icon
      ? '<img src="' + l.icon + '" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{textContent:\'' + fb.ch + '\',className:\'card-fallback\',style:\'background:' + bg + ';color:' + fg + '\'}))">'
      : '<span class="card-fallback" style="background:' + bg + ';color:' + fg + '">' + fb.ch + '</span>';

    const actHtml = EDIT_MODE
      ? '<div class="card-actions">' +
          '<button class="card-act-btn" data-act="edit" data-cat="' + cat + '" data-index="' + index + '" title="编辑">' + EDIT_ICON + '</button>' +
          '<button class="card-act-btn" data-act="del" data-cat="' + cat + '" data-index="' + index + '" title="删除">' + TRASH_ICON + '</button>' +
        '</div>'
      : '';

    return '<div class="card"' + (EDIT_MODE ? ' draggable="true"' : '') + ' data-cat="' + cat + '" data-index="' + index + '">' +
      '<div class="card-main" onclick="window.open(\'' + safeUrl + '\',\'_blank\')">' +
        '<div class="card-icon">' + iconHtml + '</div>' +
        '<div class="card-body">' +
          '<div class="card-title">' + (l.title || '') + '</div>' +
          '<div class="card-desc">' + (l.desc || '') + '</div>' +
        '</div>' +
      '</div>' +
      actHtml +
    '</div>';
  }

  function renderContent(data) {
    if (!content) return;
    content.innerHTML = '';
    if (!data || data.length === 0) {
      content.innerHTML = '<div class="empty">未找到相关内容</div>';
      return;
    }
    data.forEach(function (sec) {
      const links = sec.links || [];
      const grpActHtml = EDIT_MODE
        ? '<span class="group-actions">' +
            '<button class="grp-act-btn" data-act="edit" data-cat="' + sec.category + '" title="编辑分组">' + EDIT_ICON + '</button>' +
            '<button class="grp-act-btn" data-act="del" data-cat="' + sec.category + '" title="删除分组">' + TRASH_ICON + '</button>' +
          '</span>'
        : '';

      const title = '<h2 class="section-title">' +
        getSectionIcon(sec) +
        '<span>' + (sec.category || '') + '</span>' +
        grpActHtml +
      '</h2>';

      const cards = links.map(function (l, i) { return cardTpl(l, sec.category, i); }).join('');
      const addCard = EDIT_MODE
        ? '<a href="javascript:void(0)" class="card add-card" onclick="window.directOpenLinkModal(\'' + (sec.category || '').replace(/'/g, "\\'") + '\')">' +
            '<div class="card-icon">' + PLUS_ICON + '</div>' +
            '<div class="card-body">' +
              '<div class="card-title">添加网址</div>' +
              '<div class="card-desc">新增到「' + (sec.category || '') + '」</div>' +
            '</div></a>'
        : '';

content.innerHTML += title + '<div class="grid">' + cards + addCard + '</div>';
    });
    if (EDIT_MODE) bindDragSort();

    // 版权 + 免责声明（始终在卡片内容最底部）
    content.innerHTML += '<div class="footer-legal">' +
      '<p> Copyright © ' + new Date().getFullYear() + ' Basic-yao</p>' +
      '<p>免责声明：本站仅作个人网址索引，不存储第三方内容，亦不对各网址的真实性、准确性、合法性负责！</p>' +
    '</div>';
  }

  function renderContentForCurrent() {
    // 搜索态优先：保持当前筛选结果，避免搜完后被分组渲染覆盖
    if (currentFiltered) {
      renderContent(currentFiltered);
      return;
    }
    let data;
    if (currentView) {
      const group = navData.find(function (s) { return s.category === currentView; });
      if (group) data = [group];
    }
    if (!data) data = navData.filter(function (s) { return (s.links || []).length > 0; });
    renderContent(data);
  }

  function renderSidebar(data) {
    if (!navList) return;
    navList.innerHTML = '';
    (data || []).forEach(function (item) {
      const div = document.createElement('div');
      div.className = 'nav-item';
      div.draggable = true;
      div.dataset.cat = item.category || '';

      const parent = document.createElement('div');
      parent.className = 'nav-parent';

      const iconWrap = document.createElement('span');
      iconWrap.className = 'nav-icon';
      const svgNode = svgFromString(item.icon || DEFAULT_GROUP_ICON);
      if (svgNode) iconWrap.appendChild(svgNode);

      const titleWrap = document.createElement('span');
      titleWrap.className = 'nav-title';
      titleWrap.textContent = item.category || '';

      parent.appendChild(iconWrap);
      parent.appendChild(titleWrap);
      parent.onclick = function () {
        currentView = item.category;
        currentFiltered = null;
        navList.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
        div.classList.add('active');
        renderContent([item]);
        if (typeof resetScrollToTop === 'function') resetScrollToTop();
      };

      div.appendChild(parent);
      navList.appendChild(div);
    });

    // 以下三项均为后台专属功能，前台（index.html）不渲染
    if (EDIT_MODE) {
      // 添加分组
      const addDiv = document.createElement('div');
      addDiv.className = 'nav-item add-group-item';
      addDiv.innerHTML = '<div class="nav-parent"><span class="nav-icon">' + PLUS_ICON + '</span><span class="nav-title">添加分组</span></div>';
      addDiv.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        openGroupModal(null);
      };
      navList.appendChild(addDiv);

      // 重置为默认数据（回退到 data.js 内置数据）
      const resetBtn = document.createElement('button');
      resetBtn.className = 'reset-btn';
      resetBtn.textContent = '重置为默认数据';
      resetBtn.onclick = function () {
        if (!confirm('确定重置所有自定义分组和编辑内容吗？')) return;
        try {
          navData = JSON.parse(JSON.stringify(ORIGINAL));
        } catch (e) {
          navData = [];
        }
        saveNavData();
        currentView = null;
        renderSidebar(navData);
        renderContentForCurrent();
        if (logo && typeof logo.onclick === 'function') logo.onclick();
      };
      navList.appendChild(resetBtn);

      // 导出 nav.json（方案 B 的核心操作：下载后上传到仓库）
      const exportBtn = document.createElement('button');
      exportBtn.className = 'reset-btn';
      exportBtn.textContent = '导出 nav.json';
      exportBtn.onclick = function () {
        exportNavJson();
        alert('已生成 nav.json。请将其上传到仓库根目录覆盖原文件，各端刷新后即可同步。');
      };
      navList.appendChild(exportBtn);

      bindGroupDragSort();
    }
  }

  // ================= 交互：分组 =================
  function openGroupModal(cat) {
    const group = cat ? navData.find(function (s) { return s.category === cat; }) : null;
    const isEdit = !!group;
    const nameVal = isEdit ? group.category : '';
    const iconVal = isEdit ? (group.icon || '') : '';

    showModal(
      '<h3>' + (isEdit ? '编辑分组' : '新建分组') + '</h3>' +
      '<label>分组名称 *</label>' +
      '<input type="text" id="groupName" placeholder="例如：电影资源" value="' + nameVal + '">' +
      '<label>分组图标（SVG 字符串）</label>' +
      '<input type="text" id="groupIcon" placeholder="留空使用默认文件夹图标" value="' + iconVal.replace(/"/g, '&quot;') + '">' +
      '<div class="hint">粘贴 Lucide 风格 SVG，例如：&lt;svg viewBox="0 0 24 24" ...&gt;&lt;/svg&gt;</div>' +
      '<div class="btn-row">' +
        '<button class="btn btn-cancel" id="groupCancel">取消</button>' +
        '<button class="btn btn-primary" id="groupSubmit">保存</button>' +
      '</div>'
    );

    document.getElementById('groupCancel').onclick = hideModal;
    document.getElementById('groupSubmit').onclick = function () {
      const name = document.getElementById('groupName').value.trim();
      if (!name) { document.getElementById('groupName').focus(); return; }
      const icon = document.getElementById('groupIcon').value.trim() || DEFAULT_GROUP_ICON;

      if (isEdit) {
        group.category = name;
        group.icon = icon;
      } else {
        if (navData.some(function (s) { return s.category === name; })) {
          alert('该分组已存在');
          return;
        }
        navData.push({ category: name, icon: icon, links: [] });
      }
      saveNavData();
      currentView = name;
      renderSidebar(navData);
      renderContentForCurrent();
      hideModal();
    };
  }

  // ================= 交互：网址 =================
  function buildLinkModal(cat, index) {
    const isEdit = index !== null && index !== undefined;
    let editLink = null;
    if (isEdit) {
      const group = navData.find(function (s) { return s.category === cat; });
      if (group) editLink = group.links[index];
    }

    const urlVal = editLink ? editLink.url : '';
    const titleVal = editLink ? editLink.title : '';
    const descVal = editLink ? editLink.desc : '';
    const iconVal = editLink ? editLink.icon : '';
    const catVal = cat || currentView || '';
    const options = navData.map(function (s) {
      const selected = s.category === catVal ? ' selected' : '';
      return '<option value="' + s.category + '"' + selected + '>' + s.category + '</option>';
    }).join('');

    showModal(
      '<h3>' + (isEdit ? '编辑网址' : '添加网址') + '</h3>' +
      '<label>网址 *</label>' +
      '<input type="text" id="linkUrl" placeholder="https://example.com" value="' + urlVal + '">' +
      '<label>标题</label>' +
      '<input type="text" id="linkTitle" placeholder="留空自动取域名" value="' + titleVal + '">' +
      '<label>描述</label>' +
      '<input type="text" id="linkDesc" placeholder="选填" value="' + descVal + '">' +
      '<label>图标</label>' +
      '<input type="text" id="linkIcon" placeholder="留空使用站点 favicon" value="' + iconVal + '">' +
      '<label>分类</label>' +
      '<select id="linkCategory">' + options + '</select>' +
      '<div class="btn-row">' +
        '<button class="btn btn-cancel" id="linkCancel">取消</button>' +
        '<button class="btn btn-primary" id="linkSubmit">保存</button>' +
      '</div>'
    );

    document.getElementById('linkCancel').onclick = hideModal;
    document.getElementById('linkSubmit').onclick = function () {
      const url = document.getElementById('linkUrl').value.trim();
      if (!url) { document.getElementById('linkUrl').focus(); return; }

      const fullUrl = url.startsWith('http') ? url : 'https://' + url;
      const domain = getDomain(fullUrl);
      if (!domain) { alert('网址格式不正确'); return; }

      const title = document.getElementById('linkTitle').value.trim() || domain.replace(/^www\./, '');
      const desc = document.getElementById('linkDesc').value.trim() || '';
      let icon = document.getElementById('linkIcon').value.trim();
      if (!icon) icon = getDefaultIcon(fullUrl);
      const newCat = document.getElementById('linkCategory').value;

      if (isEdit) {
        const oldGroup = navData.find(function (s) { return s.category === cat; });
        if (!oldGroup) return;
        if (newCat === cat) {
          oldGroup.links[index] = { title: title, url: fullUrl, desc: desc, icon: icon };
        } else {
          oldGroup.links.splice(index, 1);
          const target = navData.find(function (s) { return s.category === newCat; });
          if (target) {
            target.links.push({ title: title, url: fullUrl, desc: desc, icon: icon });
          } else {
            navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [{ title: title, url: fullUrl, desc: desc, icon: icon }] });
          }
        }
      } else {
        const target = navData.find(function (s) { return s.category === newCat; });
        if (target) {
          target.links.push({ title: title, url: fullUrl, desc: desc, icon: icon });
        } else {
          navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [{ title: title, url: fullUrl, desc: desc, icon: icon }] });
        }
      }

      saveNavData();
      currentView = newCat;
      renderSidebar(navData);
      renderContentForCurrent();
      hideModal();
    };
  }

  function openLinkModal(cat, index) {
    if (index === undefined) index = null;
    if (!cat && currentView) cat = currentView;
    window._navEditState = { cat: cat, index: index };
    buildLinkModal(cat, index);
  }

  window.directOpenLinkModal = function (cat) {
    openLinkModal(cat, null);
  };

  // ================= 弹窗 =================
  function initModal() {
    if (!document.getElementById('navExtModal')) {
      document.body.insertAdjacentHTML('beforeend',
        '<div class="modal-overlay" id="navExtModal" style="display:none">' +
          '<div class="modal-content" id="navExtModalContent"></div>' +
        '</div>'
      );
    }
  }

  function showModal(html) {
    const overlay = document.getElementById('navExtModal');
    const mContent = document.getElementById('navExtModalContent');
    mContent.innerHTML = html;
    overlay.style.display = 'flex';
    const firstInput = mContent.querySelector('input, select');
    if (firstInput) firstInput.focus();
  }

  function hideModal() {
    const overlay = document.getElementById('navExtModal');
    if (overlay) overlay.style.display = 'none';
  }

  // ================= 事件委托 =================
  function handleGlobalClick(e) {
    const addGroup = e.target.closest && e.target.closest('.add-group-item');
    if (addGroup) { e.preventDefault(); openGroupModal(null); return; }

    const addCard = e.target.closest && e.target.closest('.add-card');
    if (addCard) { e.preventDefault(); openLinkModal(addCard.dataset.cat, null); return; }

    const actBtn = e.target.closest && e.target.closest('.card-act-btn');
    if (actBtn) {
      e.preventDefault();
      e.stopPropagation();
      const cat = actBtn.dataset.cat;
      const index = parseInt(actBtn.dataset.index, 10);
      if (actBtn.dataset.act === 'edit') openLinkModal(cat, index);
      else if (actBtn.dataset.act === 'del') deleteLink(cat, index);
      return;
    }

    const grpBtn = e.target.closest && e.target.closest('.grp-act-btn');
    if (grpBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (grpBtn.dataset.act === 'edit') openGroupModal(grpBtn.dataset.cat);
      else if (grpBtn.dataset.act === 'del') deleteGroup(grpBtn.dataset.cat);
    }
  }

  // ================= 增删改 =================
  function deleteLink(cat, index) {
    const group = navData.find(function (s) { return s.category === cat; });
    if (!group) return;
    if (confirm('确定删除这个网址吗？')) {
      group.links.splice(index, 1);
      saveNavData();
      renderContentForCurrent();
    }
  }

  function deleteGroup(cat) {
    if (!confirm('确定删除分组「' + cat + '」及其所有网址吗？')) return;
    navData = navData.filter(function (s) { return s.category !== cat; });
    if (currentView === cat) currentView = null;
    saveNavData();
    renderSidebar(navData);
    renderContentForCurrent();
  }

  // ================= 拖拽排序：分组 =================
  function bindGroupDragSort() {
    const dragState = { sourceCat: null };

    navList.addEventListener('dragstart', function (e) {
      const item = e.target.closest && e.target.closest('.nav-item[draggable="true"]');
      if (!item) return;
      dragState.sourceCat = item.dataset.cat;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.dataset.cat);
    });

    navList.addEventListener('dragover', function (e) {
      e.preventDefault();
      if (!dragState.sourceCat) return;
      const item = e.target.closest && e.target.closest('.nav-item[draggable="true"]');
      if (!item || item.dataset.cat === dragState.sourceCat) return;
      navList.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
      item.classList.add('drag-over-sidebar');
    });

    navList.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target.closest && e.target.closest('.nav-item[draggable="true"]');
      if (!target || !dragState.sourceCat || target.dataset.cat === dragState.sourceCat) {
        navList.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
        dragState.sourceCat = null;
        return;
      }
      moveGroup(dragState.sourceCat, target.dataset.cat);
      dragState.sourceCat = null;
      navList.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
    });

    navList.addEventListener('dragend', function () {
      navList.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
      dragState.sourceCat = null;
    });
  }

  function moveGroup(sourceCat, targetCat) {
    const fromIndex = navData.findIndex(function (s) { return s.category === sourceCat; });
    const toIndex = navData.findIndex(function (s) { return s.category === targetCat; });
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
    const moved = navData.splice(fromIndex, 1)[0];
    navData.splice(toIndex, 0, moved);
    saveNavData();
    if (currentView === sourceCat) currentView = targetCat;
    renderSidebar(navData);
    renderContentForCurrent();
  }

  // ================= 拖拽排序：卡片 =================
  function bindDragSort() {
    const dragState = { source: null };

    content.addEventListener('dragstart', function (e) {
      const card = e.target.closest && e.target.closest('.card[draggable="true"]');
      if (!card) return;
      dragState.source = { cat: card.dataset.cat, index: parseInt(card.dataset.index, 10) };
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.cat + ':' + card.dataset.index);
    });

    content.addEventListener('dragover', function (e) {
      e.preventDefault();
      if (!dragState.source) return;
      const card = e.target.closest && e.target.closest('.card[draggable="true"]');
      if (!card) return;
      if (card.dataset.cat === dragState.source.cat && parseInt(card.dataset.index, 10) === dragState.source.index) return;
      content.querySelectorAll('.card').forEach(function (c) { c.classList.remove('drag-over-target'); });
      card.classList.add('drag-over-target');
    });

    content.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const card = e.target.closest && e.target.closest('.card[draggable="true"]');
      const src = dragState.source;
      dragState.source = null;
      content.querySelectorAll('.card').forEach(function (c) { c.classList.remove('drag-over-target'); });
      if (!src || !card) return;
      moveLink(src.cat, src.index, card.dataset.cat, parseInt(card.dataset.index, 10));
    });

    content.addEventListener('dragend', function () {
      content.querySelectorAll('.card').forEach(function (c) { c.classList.remove('drag-over-target'); });
      dragState.source = null;
    });
  }

  function moveLink(sourceCat, sourceIndex, targetCat, targetIndex) {
    const fromGroup = navData.find(function (s) { return s.category === sourceCat; });
    const toGroup = navData.find(function (s) { return s.category === targetCat; });
    if (!fromGroup || !toGroup) return;

    const sourceLinks = fromGroup.links || [];
    if (sourceIndex < 0 || sourceIndex >= sourceLinks.length) return;

    const targetLinks = toGroup.links || [];
    const targetValid = targetIndex >= 0 && targetIndex < targetLinks.length;

    if (sourceCat === targetCat) {
      if (!targetValid || sourceIndex === targetIndex) return;
      const moved = sourceLinks.splice(sourceIndex, 1)[0];
      sourceLinks.splice(targetIndex, 0, moved);
    } else {
      const moved = sourceLinks.splice(sourceIndex, 1)[0];
      if (targetValid) targetLinks.splice(targetIndex, 0, moved);
      else targetLinks.push(moved);
    }
    saveNavData();
    renderSidebar(navData);
    renderContentForCurrent();
  }

  // ================= 启动 =================
  // 关键：loadNavData 是异步的，必须用 await 等待数据到位后再渲染，
  // 否则 renderSidebar / renderContent 拿到的是空数组。
  (function boot() {
    navList = document.getElementById('navList');
    content = document.getElementById('content');
    logo = document.getElementById('logo');

    // 刷新兜底：先对齐一次系统主题，保证跟随不失效
    try { document.documentElement.setAttribute('data-theme', (systemPrefersDark() ? 'dark' : 'light')); } catch (e) {}

    initTheme();
    bindLogoClick();       // 修复②：Logo 点击回首页（显示全部）
    bindSearchEngines();   // 修复③：搜索栏引擎切换
    bindSearchInput();    // 修复④：搜索输入绑定（回车 / 按钮 / 实时筛选）
    initModal();
    document.addEventListener('click', handleGlobalClick);

    // 清理卡片上的 title 属性，避免浏览器原生 tooltip 遮挡悬浮展开内容
    document.querySelectorAll('.card[title]').forEach(function (el) { el.removeAttribute('title'); });

    loadNavData().then(function () {
      renderSidebar(navData);
      renderContentForCurrent();
      document.querySelectorAll('.card[title]').forEach(function (el) { el.removeAttribute('title'); });
    }).catch(function (e) {
      console.error('[启动] 数据加载失败:', e);
      renderSidebar(navData);
      renderContentForCurrent();
    });
  })();

// 卡片悬浮浮层：固定在卡片上方，不跟随鼠标，不扰动布局
(function () {
  var TIP_DELAY = 300, tipTimer = null, hideTimer = null;
  var tip = null;

  function getTip() {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'nav-card-tip';
      document.body.appendChild(tip);
      tip.addEventListener('mouseenter', function () { clearTimeout(hideTimer); tip.classList.add('show'); });
      tip.addEventListener('mouseleave', function () { hideTimer = setTimeout(hideTip, 120); });
    }
    return tip;
  }

  function buildTip(card) {
    var title = card.querySelector('.card-title');
    var desc  = card.querySelector('.card-desc');
    var url   = card.querySelector('.card-url');
    var html = '';
    if (title && title.textContent) html += '<span class="tip-title">' + title.textContent.trim() + '</span>';
    if (desc  && desc.textContent)   html += '<span class="tip-desc">'  + desc.textContent.trim()  + '</span>';
    if (url   && url.textContent)    html += '<span class="tip-url">'   + url.textContent.trim()   + '</span>';
    return html;
  }

  function positionTip(card) {
    if (!tip) return;
    var r = card.getBoundingClientRect();
    tip.style.width = r.width + 'px';
    tip.style.left  = '0px';
    tip.style.top   = '-9999px';
    tip.classList.add('show');
    var th = tip.offsetHeight;
    var left = r.left + window.pageXOffset;
    var top  = r.top + window.pageYOffset - th - 12;
    if (top < window.pageYOffset) top = r.bottom + window.pageYOffset + 12;
    var maxLeft = document.documentElement.clientWidth - tip.offsetWidth - 12;
    if (left > maxLeft) left = maxLeft;
    if (left < 12) left = 12;
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
  }

  function showTip(card) {
    var html = buildTip(card);
    if (!html) return;
    tip = getTip();
    tip.innerHTML = html;
    positionTip(card);
  }

  function hideTip() { if (tip) tip.classList.remove('show'); }

// ★ 触屏设备：不弹浮层，点卡片直接跳转
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  document.addEventListener('mouseover', function (e) {
    var card = e.target.closest && e.target.closest('.card');
    if (!card) return;
    clearTimeout(hideTimer);
    tipTimer = setTimeout(function () { showTip(card); }, TIP_DELAY);
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest('.card')) {
      clearTimeout(tipTimer);
      hideTimer = setTimeout(hideTip, 120);
    }
  });

  window.addEventListener('scroll', function () { if (tip && tip.classList.contains('show')) hideTip(); }, true);
  window.addEventListener('resize', function () { if (tip && tip.classList.contains('show')) hideTip(); });
})();

// 声明样式 + 修复废弃 meta 标签（只改 app.js，不动 HTML）
  (function () {
    var style = document.createElement('style');
    style.textContent = '.footer-legal{margin-top:24px;padding:16px 20px;text-align:center;font-size:12px;line-height:1.7;color:#888;border-top:1px solid rgba(127,127,127,0.25)}.footer-legal p{margin:4px 0}@media (prefers-color-scheme: dark){.footer-legal{color:#999;border-top-color:rgba(255,255,255,0.15)}}';
    document.head.appendChild(style);

    var meta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (meta) meta.setAttribute('name', 'mobile-web-app-capable');
  })();
})();