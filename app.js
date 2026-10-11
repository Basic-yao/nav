(function () {
  'use strict';

  // ============================================================
  // 常量与状态
  // ============================================================
  var STORE_KEY = 'navStoreV2';
  var STORE_KEY_THEME = 'navTheme';
  var DEFAULT_GROUP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
  var EDIT_ICON = '<svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';
  var TRASH_ICON = '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

  
  var currentView = null;
  var searchKeyword = '';
  var ORIGINAL = JSON.parse(JSON.stringify(navData));

  // ============================================================
  // 保存与加载
  // ============================================================
  // 保存：仅在当前是 admin 后台页时才写入，避免前端导航页误改数据源。
  // 导航页是只读展示，不负责持久化数据。
  function saveNavData() {
    if (typeof window.IS_ADMIN === 'undefined' || !window.IS_ADMIN) return;
    try {
      if (!Array.isArray(navData) || navData.length === 0) return;
      localStorage.setItem(STORE_KEY, JSON.stringify(navData));
    } catch (e) {
      console.error('[nav] 保存失败:', e);
    }
  }

  async function loadNavData() {
    // 清理旧版本残留的存储 key，避免历史数据污染（旧 key 格式可能与当前不兼容）
    try {
      var LEGACY_KEYS = ['navStore', 'navStoreV1', 'navData', 'navDataV2'];
      for (var i = 0; i < LEGACY_KEYS.length; i++) {
        try { localStorage.removeItem(LEGACY_KEYS[i]); } catch (e) { /* ignore */ }
      }
    } catch (e) { /* ignore */ }

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
    return svgToString(svgFromString(DEFAULT_GROUP_ICON));
  }

  function getDomain(rawUrl) {
    try {
      var u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
      return u.hostname;
    } catch (e) { return ''; }
  }

  // 图标解析顺序（三段，全部纯前端，无需任何后端/代理）：
  //   1) data.js 显式配置的 icon  → 用它
  //   2) 主域名/favicon.ico       → 站点自己的 favicon，最能代表站点
  //   3) 首字色块                 → 兜底，绝不显示破图
  // 第 2 段会被跨域策略拦截 → 触发 <img onerror> → 第 3 段首字兜底。
  // 站点自己的 favicon 若是合法可访问资源，则正常显示，无需任何中转服务。
  function guessFavicon(rawUrl) {
    var domain = getDomain(rawUrl);
    if (!domain) return '';
    var origin = 'https://' + domain;
    try {
      var u = new URL(rawUrl.indexOf('://') > -1 ? rawUrl : 'https://' + rawUrl);
      origin = u.origin;
    } catch (e) { /* keep default */ }
    return origin + '/favicon.ico';
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
    // 图标优先级：data.js 显式配置 > 主域名/favicon.ico > 首字色块
    // 图标取值顺序：
    //   1) data.js / nav.json 里该 link 已存的 icon → 用它
    //   2) 主域名/favicon.ico                     → 站点自己的 favicon
    //   3) <img onerror> 触发首字色块               → 兜底，永不破图
    // resolvedIcon 先用「占位 URL」渲染（保证立即有图），
    // 再异步真实抓取并替换，避免破图。
    var resolvedIcon = (l.icon && String(l.icon).trim())
      ? String(l.icon).trim()
      : guessFavicon(l.url);
    var hasIcon = !!resolvedIcon;
    if (hasIcon && /^https?:\/\/(www\.google\.com\/s2\/|icons\.duckduckgo\.com\/)/.test(resolvedIcon)) {
      hasIcon = true; // 保持占位渲染，稍后由 fetchFavicon 替换
    }
    var fbJson = JSON.stringify(fb.ch);
    var bgJson = JSON.stringify(bg);
    var fgJson = JSON.stringify(fg);

    var fbEnc = encodeURIComponent(fb.ch);
    var bgEnc = encodeURIComponent(bg);
    var fgEnc = encodeURIComponent(fg);

    var iconHtml;
    if (hasIcon) {
      iconHtml = '<img src="' + resolvedIcon.replace(/"/g, '&quot;') + '" alt="" loading="lazy" data-fallback="' + fbEnc + '" data-bg="' + bgEnc + '" data-fg="' + fgEnc + '" onerror="window.__fallbackIcon(this)">';
    } else {
      iconHtml = '<span class="card-fallback" style="background:' + bg + ';color:' + fg + '">' + fb.ch + '</span>';
    }

    // 异步真实抓取 favicon：若成功则把占位 URL 替换为 data URI
    if (hasIcon && l.url && /^https?:\/\/(www\.google\.com\/s2\/|icons\.duckduckgo\.com\/)/.test(resolvedIcon)) {
      var _realUrl = l.url;
      var _placeholder = resolvedIcon;
      setTimeout(function () {
        try {
          fetchFavicon(_realUrl, function (dataUri) {
            if (!dataUri) return;
            document.querySelectorAll('.card[data-cat="' + cat + '"][data-index="' + index + '"] img').forEach(function (img) {
              if (img.src === _placeholder || img.src === _realUrl) img.src = dataUri;
            });
          });
        } catch (e) { /* 静默失败，保留占位 */ }
      }, 0);
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
      var svgNode = svgFromString(item.icon || DEFAULT_GROUP_ICON);
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

  // 用户是否手动切换过主题。一旦为 true，就不再跟随系统。
  var userPickedTheme = false;

  function systemPrefersDark() {
    try {
      return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  // 模块级函数：必须定义在 initTheme 之外，否则严格模式下内层作用域隔离
  // 会导致 applyTheme 调用时提示 ReferenceError。
  function updateThemeButton(theme) {
    var themeText = document.querySelector('.theme-text');
    if (!themeText) return;
    themeText.textContent = theme === 'dark' ? '浅色模式' : '深色模式';
  }

  // ============================================================
  // 主题：系统跟随为最高优先级
  // ------------------------------------------------------------
  // 规则：
  //   1. 每次加载/刷新都重新读取系统 prefers-color-scheme，直接应用；
  //   2. 运行中系统主题变化，实时跟随（change 事件）；
  //   3. 用户点击切换按钮 → 仅本会话内生效，不持久化；
  //   4. localStorage 里的 navTheme 只作为"会话恢复"：如果用户在
  //      上一会话手动切过，本会话首次加载沿用一次，但一旦系统或
  //      用户再次操作就立即让位于系统；
  //   5. 后端编辑页（custom.js）的保存逻辑与前端导航页完全独立，
  //      编辑缓存只在 admin.html 内生效，不影响 index.html。
  // ============================================================
  function initTheme() {
    var themeBtn = document.getElementById('themeBtn');
    var themeIcon = document.querySelector('.theme-icon');
    var themeText = document.querySelector('.theme-text');

    if (themeIcon && !themeIcon.querySelector('svg')) {
      themeIcon.innerHTML = SUN_ICON + MOON_ICON;
    }

    // 读取系统偏好（最高优先级依据）
    var sysDark = systemPrefersDark();
    var systemTheme = sysDark ? 'dark' : 'light';

    // 系统跟随最高优先级：每次刷新都重新读系统偏好

    // 监听系统主题变化，实时跟随（最高优先级，任何时候都响应）
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function (e) {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler); // Safari < 14
    }

    if (themeBtn) {
      themeBtn.onclick = function () {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      };
    }

  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  // 模块级函数：必须定义在 initTheme 之外，否则严格模式下内层作用域隔离
  // 会导致 applyTheme 调用时提示 ReferenceError。
  function updateThemeButton(theme) {
    var themeText = document.querySelector('.theme-text');
    if (!themeText) return;
    themeText.textContent = theme === 'dark' ? '浅色模式' : '深色模式';
  }

  // 防抖：编辑内容保存，避免高频输入时频繁写存储
  var saveTimer = null;
  function scheduleSave() {
    if (!saveNavData) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { saveNavData(); } catch (e) { /* ignore */ }
    }, 300);
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
  // 兜底：即便 loadNavData 因 file:// fetch 失败而异常，主题与渲染也照跑
  function bootThemeAndRender() {
    try { initTheme(); } catch (e) { console.error('[nav] initTheme 失败:', e); }
    try { bindLogoClick(); } catch (e) { console.error('[nav] bindLogoClick 失败:', e); }
    try { bindSearchEngines(); } catch (e) { console.error('[nav] bindSearchEngines 失败:', e); }
    try { bindSearch(); } catch (e) { console.error('[nav] bindSearch 失败:', e); }
    try {
      renderSidebar(navData);
      renderContent(navData.filter(function (s) { return (s.links || []).length > 0; }));
    } catch (e) { console.error('[nav] 渲染失败:', e); }
  }

  // 启动入口：loadNavData 完成后再渲染，避免读到被清空的中间状态
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;

    // 刷新兜底：无论何种情况，启动前先把系统主题对齐一次，
    // 保证"系统跟随"在任何环境下都不失效。
    try {
      var sys = systemPrefersDark() ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', sys);
    } catch (e) { /* ignore */ }

    bootThemeAndRender();
  }

  (async function bootNav() {
    try {
      await loadNavData();
    } catch (e) {
      // file:// 下 fetch 会失败，回退到 data.js 内置数据（ORIGINAL 已在文件顶部拷贝）
      console.warn('[nav] loadNavData 异常，使用内置数据:', e && e.message);
    }
    // loadNavData 可能清空 navData（例如用户 store 损坏或 fetch 异常路径）。
    // 仅当 navData 确实为空时才用 ORIGINAL 兜底，绝不覆盖用户已有的真实数据。
    try {
      if (!Array.isArray(navData) || navData.length === 0) {
        var backup = JSON.parse(JSON.stringify(ORIGINAL));
        navData.length = 0;
        backup.forEach(function (item) { navData.push(item); });
        window.__NAV_FALLBACK = true;
      } else {
        window.__NAV_FALLBACK = false;
      }
    } catch (e) { window.__NAV_FALLBACK = false; }
    boot();
  })();

  // 兜底：若页面已加载完成但 async 启动未触发（例如脚本被动态注入），
  // 在下一个事件循环强制执行一次渲染，保证页面不会出现空白。
  if (typeof setImmediate === 'function') {
    setImmediate(boot);
  } else {
    setTimeout(boot, 0);
  }

  // 自检：启动完成后把关键信息打到 console，方便一眼定位"是数据/渲染/主题哪一层失败"
  setTimeout(function () {
    var r = {
      navDataLen: (navData && navData.length),
      fallback: window.__NAV_FALLBACK,
      dataTheme: document.documentElement.getAttribute('data-theme'),
      cards: document.querySelectorAll('.card').length,
      navItems: document.querySelectorAll('.nav-item').length,
      sections: document.querySelectorAll('.section-title').length,
      contentLen: (document.getElementById('content') || {}).innerHTML ? (document.getElementById('content').innerHTML.length) : -1,
    };
    console.log('%c[nav self-check]', 'color:#1677ff;font-weight:bold', r);
    if (r.cards === 0 || r.navItems === 0) {
      console.warn('[nav] 自检未通过：卡片或侧边栏为 0，请截图发给我定位');
    }
  }, 600);

  // 保险：若文档已处于 readyState=complete（脚本被延迟加载等情况），
  // async 函数未执行时也能兜底触发一次主题判定。
  try {
    if (document.documentElement.getAttribute('data-theme') === null) {
      var _mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.setAttribute('data-theme', (_mq && _mq.matches) ? 'dark' : 'light');
    }
  } catch (e) {}
})();
