(function () {
  'use strict';

  // ============================================================
  // 常量与状态
  // ============================================================
  var STORE_KEY = 'navStoreV2';
  var DEFAULT_GROUP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
  var EDIT_ICON = '<svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';
  var TRASH_ICON = '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

  var DEFAULT_ICONS = {
    '常用网站': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
    '电视应用': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>',
    '软件下载': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    '生活应用': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    '实用工具': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    '素材资源': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    '网络书籍': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    '网盘云储': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    '学习资源': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    '操作系统': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>'
  };

  var currentView = null;
  var searchKeyword = '';
  var ORIGINAL = JSON.parse(JSON.stringify(navData));

  // ============================================================
  // 保存与加载
  // ============================================================
  function saveNavData() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(navData));
    } catch (e) {
      console.error('[nav] 保存失败:', e);
    }
  }

  async function loadNavData() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw !== null && raw !== undefined && raw !== '') {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          navData.length = 0;
          parsed.forEach(function (item) { navData.push(item); });
          return;
        }
      }
    } catch (e) { /* ignore */ }

    try {
      var res = await fetch('nav.json?v=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        var data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          navData.length = 0;
          data.forEach(function (item) { navData.push(item); });
          return;
        }
      }
    } catch (e) { /* file:// 协议下 fetch 会失败，正常 */ }

    navData.length = 0;
    JSON.parse(JSON.stringify(ORIGINAL)).forEach(function (item) { navData.push(item); });
  }

  // ============================================================
  // 工具函数
  // ============================================================
  function svgFromString(str) {
    if (!str) return null;
    try {
      var div = document.createElement('div');
      div.innerHTML = str.trim();
      return div.querySelector('svg');
    } catch (e) {
      return null;
    }
  }

  function svgToString(svgNode) {
    if (!svgNode) return '';
    var clone = svgNode.cloneNode(true);
    clone.setAttribute('width', '18');
    clone.setAttribute('height', '18');
    clone.classList.add('section-icon');
    return new XMLSerializer().serializeToString(clone);
  }

  function getSectionIcon(sec) {
    if (sec.icon) {
      var node = svgFromString(sec.icon);
      if (node) return svgToString(node);
    }
    var fallback = DEFAULT_ICONS[sec.category] || DEFAULT_GROUP_ICON;
    var node2 = svgFromString(fallback);
    if (node2) return svgToString(node2);
    return svgToString(svgFromString(DEFAULT_GROUP_ICON));
  }

  function getDomain(rawUrl) {
    try {
      var u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
      return u.hostname;
    } catch (e) { return ''; }
  }

  function getFallback(l) {
    var ch = (l.title || '?').trim().charAt(0).toUpperCase();
    var hash = 0;
    var seed = l.title || l.url || '';
    for (var i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    var hue = hash % 360;
    return { ch: ch, hue: hue };
  }

  // ============================================================
  // 卡片模板
  // ============================================================
  function cardTpl(l, cat, index) {
    var fb = getFallback(l);
    var bg = 'hsl(' + fb.hue + ', 65%, 88%)';
    var fg = 'hsl(' + fb.hue + ', 45%, 32%)';
    var safeUrl = (l.url || '').replace(/"/g, '&quot;');
    var hasIcon = !!(l.icon && String(l.icon).trim());
    var fbJson = JSON.stringify(fb.ch);
    var bgJson = JSON.stringify(bg);
    var fgJson = JSON.stringify(fg);

    var fbEnc = encodeURIComponent(fb.ch);
    var bgEnc = encodeURIComponent(bg);
    var fgEnc = encodeURIComponent(fg);

    var iconHtml;
    if (hasIcon) {
      iconHtml = '<img src="' + l.icon.replace(/"/g, '&quot;') + '" alt="" loading="lazy" data-fallback="' + fbEnc + '" data-bg="' + bgEnc + '" data-fg="' + fgEnc + '" onerror="window.__fallbackIcon(this)">';
    } else {
      iconHtml = '<span class="card-fallback" style="background:' + bg + ';color:' + fg + '">' + fb.ch + '</span>';
    }

    return '<div class="card" data-cat="' + cat + '" data-index="' + index + '">' +
      '<div class="card-main" onclick="window.open(\'' + safeUrl + '\',\'_blank\')">' +
        '<div class="card-icon">' + iconHtml + '</div>' +
        '<div class="card-body">' +
          '<div class="card-title">' + (l.title || '') + '</div>' +
          '<div class="card-desc">' + (l.desc || '') + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // ============================================================
  // 渲染内容区
  // ============================================================
  function renderContent(data) {
    var contentEl = document.getElementById('content');
    if (!contentEl) return;
    contentEl.innerHTML = '';

    if (!data || data.length === 0) {
      contentEl.innerHTML = '<div class="empty">未找到相关内容</div>';
      return;
    }

    data.forEach(function (sec) {
      var links = sec.links || [];
      var title = '<h2 class="section-title">' +
        getSectionIcon(sec) +
        '<span>' + sec.category + '</span>' +
      '</h2>';

      // 前端只读展示，不渲染“添加网址”卡片
      var cards = links.map(function (l, i) { return cardTpl(l, sec.category, i); }).join('');
      contentEl.innerHTML += title + '<div class="grid">' + cards + '</div>';
    });
  }

  // ============================================================
  // 搜索过滤
  // ============================================================
  function filterData(data, keyword) {
    if (!keyword) return data;
    var kw = keyword.toLowerCase();
    return data.map(function (sec) {
      var matched = (sec.links || []).filter(function (l) {
        return (l.title || '').toLowerCase().indexOf(kw) >= 0 ||
               (l.url || '').toLowerCase().indexOf(kw) >= 0 ||
               (l.desc || '').toLowerCase().indexOf(kw) >= 0;
      });
      return { category: sec.category, icon: sec.icon, links: matched };
    }).filter(function (sec) { return sec.links.length > 0; });
  }

  // ============================================================
  // 渲染侧边栏
  // ============================================================
  function renderSidebar(data) {
    var navListEl = document.getElementById('navList');
    if (!navListEl) return;
    navListEl.innerHTML = '';

    data.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'nav-item';
      div.dataset.cat = item.category;

      var parent = document.createElement('div');
      parent.className = 'nav-parent';

      var iconWrap = document.createElement('span');
      iconWrap.className = 'nav-icon';
      var svgNode = svgFromString(item.icon || DEFAULT_ICONS[item.category]);
      if (svgNode) iconWrap.appendChild(svgNode);

      var titleWrap = document.createElement('span');
      titleWrap.className = 'nav-title';
      titleWrap.textContent = item.category;

      parent.appendChild(iconWrap);
      parent.appendChild(titleWrap);

      parent.onclick = function () {
        currentView = item.category;
        navListEl.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
        div.classList.add('active');
        var group = navData.find(function (s) { return s.category === currentView; });
        renderContent(group ? [group] : []);
      };

      div.appendChild(parent);
      navListEl.appendChild(div);
    });
  }

  // ============================================================
  // Logo 点击 → 显示全部
  // ============================================================
  function bindLogoClick() {
    var logo = document.getElementById('logo');
    if (logo) {
      logo.onclick = function () {
        currentView = null;
        var input = document.getElementById('subSearchInput');
        if (input) input.value = '';
        renderSidebar(navData);
        renderContent(navData.filter(function (s) { return (s.links || []).length > 0; }));
      };
    }
  }

  // ============================================================
  // 搜索引擎切换
  // ============================================================
  var SEARCH_ENGINES = {
    site: { url: null, placeholder: '按 / 快速唤起站内搜索' },
    bing: { url: 'https://www.bing.com/search?q=', placeholder: 'Bing 搜索' },
    baidu: { url: 'https://www.baidu.com/s?wd=', placeholder: '百度一下' },
    google: { url: 'https://www.google.com/search?q=', placeholder: 'Google 搜索' }
  };
  var currentEngine = 'site';

  function bindSearchEngines() {
    var container = document.getElementById('searchTags');
    if (!container) return;
    var input = document.getElementById('subSearchInput');

    function updatePlaceholder() {
      if (input) input.placeholder = SEARCH_ENGINES[currentEngine].placeholder;
    }

    container.querySelectorAll('.tag').forEach(function (btn) {
      btn.onclick = function () {
        container.querySelectorAll('.tag').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentEngine = btn.dataset.engine;
        updatePlaceholder();
        // 切换引擎时只更新 placeholder，不自动跳转
        // 如果用户已在站内搜索了内容，切换引擎后输入框保留关键词，等待手动提交
      };
    });

    updatePlaceholder();
  }

  function doSearchWithEngine(keyword) {
    // 空关键词不跳转，也不搜索
    if (!keyword) return;
    if (currentEngine === 'site') {
      var filtered = filterData(navData, keyword);
      renderContent(filtered);
    } else {
      var url = SEARCH_ENGINES[currentEngine].url + encodeURIComponent(keyword);
      window.open(url, '_blank');
    }
  }

  // ============================================================
  // 搜索功能
  // ============================================================
  function bindSearch() {
    var input = document.getElementById('subSearchInput');
    var btn = document.getElementById('subSearchBtn');
    if (!input) return;

    function doSearch() {
      searchKeyword = input.value.trim();
      doSearchWithEngine(searchKeyword);
    }

    // input 事件只做站内实时搜索（站内模式），不跳转外部
    input.addEventListener('input', function () {
      if (currentEngine === 'site') {
        searchKeyword = input.value.trim();
        var filtered = filterData(navData, searchKeyword);
        renderContent(filtered);
      }
      // 外部搜索引擎模式下，input 不触发任何操作
    });

    // 回车提交搜索
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });

    // 点击搜索按钮提交
    if (btn) btn.onclick = doSearch;

    // 按 / 快速聚焦搜索框
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
      if (e.key === 'Escape' && document.activeElement === input) {
        input.blur();
      }
    });
  }

  // ============================================================
  // 主题切换
  // ============================================================
  var SUN_ICON = '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON_ICON = '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function initTheme() {
    var themeBtn = document.getElementById('themeBtn');
    var themeIcon = document.querySelector('.theme-icon');
    var themeText = document.querySelector('.theme-text');

    if (themeIcon && !themeIcon.querySelector('svg')) {
      themeIcon.innerHTML = SUN_ICON + MOON_ICON;
    }

    var savedTheme = localStorage.getItem('navTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    if (themeBtn) {
      themeBtn.onclick = function () {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('navTheme', next);
        updateThemeButton(next);
      };
    }

    function updateThemeButton(theme) {
      if (!themeText) return;
      themeText.textContent = theme === 'dark' ? '浅色模式' : '深色模式';
    }
  }

  // ============================================================
  // 全局：图片加载失败时替换为首字母图标
  // ============================================================
  window.__fallbackIcon = function (img) {
    if (!img || img.dataset.fallbackHandled) return;
    img.dataset.fallbackHandled = '1';
    var span = document.createElement('span');
    span.className = 'card-fallback';
    span.textContent = decodeURIComponent(img.dataset.fallback || '?');
    span.style.background = decodeURIComponent(img.dataset.bg || '');
    span.style.color = decodeURIComponent(img.dataset.fg || '');
    if (img.parentNode) img.parentNode.replaceChild(span, img);
  };

  // ============================================================
  // 启动
  // ============================================================
  (async function bootNav() {
    await loadNavData();
    initTheme();
    bindLogoClick();
    bindSearchEngines();
    bindSearch();
    renderSidebar(navData);
    renderContent(navData.filter(function (s) { return (s.links || []).length > 0; }));
  })();

})();
