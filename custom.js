(function () {
  'use strict';

  // ============================================================
  // 常量与状态
  // ============================================================
  var STORE_KEY = 'navStoreV2';
  var NAV_READY = false;
  var BOOTED = false;

  var SUN_ICON = '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON_ICON = '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  var DEFAULT_GROUP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
  var PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  var EDIT_ICON = '<svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';
  var TRASH_ICON = '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

  
  // 保存对外部 navData 的引用，通过修改数组内容而非重新赋值
  var navDataRef = navData;
  var ORIGINAL = JSON.parse(JSON.stringify(navDataRef));
  var currentView = null;

  // ============================================================
  // 保存与加载
  // ============================================================
  function saveNavData() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(navDataRef));
    } catch (e) {
      console.error('[nav] 保存失败:', e);
    }
  }

  // 安全替换 navDataRef 指向的数组内容（不重新赋值外部 const）
  function replaceNavData(newData) {
    navDataRef.length = 0;
    newData.forEach(function (item) { navDataRef.push(item); });
  }

  async function loadNavData() {
    if (NAV_READY) return;

    // 数据来源优先级：
    //   1) nav.json  —— 部署后由后台「导出 nav.json」生成的唯一数据源，跨设备同步
    //   2) data.js   —— 内置默认数据（开发/本地双击/未部署时的兜底）
    // localStorage 不再参与自动加载：后台是编辑工作区，关闭即丢弃，
    // 只有显式点「保存」才会写入，避免本地临时改动污染其他设备。
    try {
      var res = await fetch('nav.json?v=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        var data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          replaceNavData(data);
          NAV_READY = true;
          return;
        }
      }
    } catch (e) { /* file:// 协议下 fetch 会失败，正常 */ }

    replaceNavData(JSON.parse(JSON.stringify(ORIGINAL)));
    NAV_READY = true;
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
    var node = svgFromString(sec.icon);
    if (node) return svgToString(node);

    return svgToString(svgFromString(DEFAULT_GROUP_ICON));
  }

  function getDomain(rawUrl) {
    try {
      var u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
      return u.hostname;
    } catch (e) { return ''; }
  }

  // ===== 图标自动获取 =====
  // 真正的跨域抓取，返回图标 data URI（base64）。
  // 优先级：Google s2 →  DuckDuckGo → 站点 /favicon.ico 等
  // 全部失败返回 ''，交由首字色块兜底。
  // 说明：跨域抓取依赖浏览器扩展权限或部署在同域代理下；
  //       纯本地 file:// 双击时浏览器会拦截，属于正常现象。
  function fetchFavicon(rawUrl, cb) {
    var domain = getDomain(rawUrl);
    if (!domain) { cb(''); return; }

    // 候选来源列表，逐个尝试
    var candidates = [
      'https://www.google.com/s2/favicons?sz=64&domain=' + encodeURIComponent(domain),
      'https://icons.duckduckgo.com/ip3/' + encodeURIComponent(domain) + '.ico'
    ];
    // 尝试从站点 HTML 的 <link rel="icon"> 中解析真实图标地址
    try {
      var origin = (rawUrl.indexOf('://') > -1 ? rawUrl : 'https://' + rawUrl);
      candidates.push(origin.replace(/\/[^\/]*$/, '/').replace(/\?.*$/, '').replace(/\/$/, '') + '/favicon.ico');
    } catch (e) { /* ignore */ }

    var idx = 0;
    (function tryNext() {
      if (idx >= candidates.length) { cb(''); return; }
      var url = candidates[idx++];
      var xhr = new XMLHttpRequest();
      try {
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.timeout = 6000;
        xhr.onload = function () {
          if (xhr.status === 200 && xhr.response && xhr.response.byteLength > 200) {
            var ct = xhr.getResponseHeader('Content-Type') || 'image/x-icon';
            // 只接受真正的图片类型
            if (!/^image\//.test(ct) && !/icon/.test(ct)) { tryNext(); return; }
            var bytes = new Uint8Array(xhr.response);
            var bin = '';
            for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
            try {
              var b64 = btoa(bin);
              cb('data:' + ct + ';base64,' + b64);
            } catch (e) { tryNext(); }
          } else { tryNext(); }
        };
        xhr.onerror = function () { tryNext(); };
        xhr.ontimeout = function () { tryNext(); };
        xhr.send();
      } catch (e) { tryNext(); }
    })();
  }

  // 解析站点 HTML 中的 <link rel="icon"> 得到更精确的图标地址
  function parseIconFromHtml(rawUrl, cb) {
    var origin;
    try {
      origin = (rawUrl.indexOf('://') > -1 ? rawUrl : 'https://' + rawUrl);
      origin = origin.replace(/\/[^\/]*$/, '/').replace(/\?.*$/, '').replace(/\/$/, '');
    } catch (e) { cb(''); return; }

    var xhr = new XMLHttpRequest();
    try {
      xhr.open('GET', origin + '/', true);
      xhr.responseType = 'text';
      xhr.timeout = 6000;
      xhr.onload = function () {
        if (xhr.status === 200 && typeof xhr.response === 'string') {
          var m = xhr.response.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/i)
               || xhr.response.match(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*>/i);
          if (m) {
            var href = (m[0].match(/href=["']([^"']+)["']/i) || [])[1];
            if (href) {
              try {
                var abs = new URL(href, origin + '/').toString();
                fetchFavicon(abs, function (dataUri) { cb(dataUri); });
                return;
              } catch (e) { /* ignore */ }
            }
          }
        }
        cb(''); // 没解析到，交给通用抓取
      };
      xhr.onerror = function () { cb(''); };
      xhr.ontimeout = function () { cb(''); };
      xhr.send();
    } catch (e) { cb(''); }
  }

  // 兼容旧调用：guessFavicon 返回占位 URL，实际取值改由 fetchFavicon 完成
  function guessFavicon(rawUrl) {
    var domain = getDomain(rawUrl);
    if (!domain) return '';
    return 'https://www.google.com/s2/favicons?sz=64&domain=' + encodeURIComponent(domain);
  }

  function getFavicon(rawUrl) {
    return guessFavicon(rawUrl);
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

    var fbEnc = encodeURIComponent(fb.ch);
    var bgEnc = encodeURIComponent(bg);
    var fgEnc = encodeURIComponent(fg);

    var iconHtml;
    if (hasIcon) {
      var _ic = (l.icon && String(l.icon).trim()) ? String(l.icon).trim() : guessFavicon(l.url);
      iconHtml = '<img src="' + _ic.replace(/"/g, '&quot;') + '" alt="" loading="lazy" data-fallback="' + fbEnc + '" data-bg="' + bgEnc + '" data-fg="' + fgEnc + '" onerror="window.__fallbackIcon(this)">';
    } else {
      iconHtml = '<span class="card-fallback" style="background:' + bg + ';color:' + fg + '">' + fb.ch + '</span>';
    }

    var editBtn = '<button class="card-act-btn" data-act="edit" data-cat="' + cat + '" data-index="' + index + '" title="编辑">' + EDIT_ICON + '</button>';
    var delBtn = '<button class="card-act-btn" data-act="del" data-cat="' + cat + '" data-index="' + index + '" title="删除">' + TRASH_ICON + '</button>';

    var addCard = '<div class="card add-card" data-cat="' + cat + '">' +
      '<div class="card-icon">' + PLUS_ICON + '</div>' +
      '<div class="card-body"><div class="card-title">添加网址</div><div class="card-desc">新增至「' + cat + '」</div></div>' +
    '</div>';

    return '<div class="card" draggable="true" data-cat="' + cat + '" data-index="' + index + '">' +
      '<div class="card-main" onclick="window.open(\'' + safeUrl + '\',\'_blank\')">' +
        '<div class="card-icon">' + iconHtml + '</div>' +
        '<div class="card-body">' +
          '<div class="card-title">' + (l.title || '') + '</div>' +
          '<div class="card-desc">' + (l.desc || '') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-actions">' + editBtn + delBtn + '</div>' +
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
        '<button class="grp-act-btn" data-act="edit" data-cat="' + sec.category + '" title="编辑分组">' + EDIT_ICON + '</button>' +
        '<button class="grp-act-btn" data-act="del" data-cat="' + sec.category + '" title="删除分组">' + TRASH_ICON + '</button>' +
      '</h2>';

      var cards = links.map(function (l, i) { return cardTpl(l, sec.category, i); }).join('');
      var addCard = '<div class="card add-card" data-cat="' + sec.category + '">' +
        '<div class="card-icon">' + PLUS_ICON + '</div>' +
        '<div class="card-body"><div class="card-title">添加网址</div><div class="card-desc">新增至「' + sec.category + '」</div></div>' +
      '</div>';
      contentEl.innerHTML += title + '<div class="grid">' + cards + addCard + '</div>';
    });
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
      if (item.category === currentView) div.classList.add('active');

      var parent = document.createElement('div');
      parent.className = 'nav-parent';

      var iconWrap = document.createElement('span');
      iconWrap.className = 'nav-icon';
      var svgNode = svgFromString(item.icon || guessFavicon(item.url) || DEFAULT_GROUP_ICON);
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
        renderContent([item]);
      };

      div.appendChild(parent);
      navListEl.appendChild(div);
    });

    // 添加分组按钮
    var addDiv = document.createElement('div');
    addDiv.className = 'nav-item add-group-item';
    addDiv.innerHTML = '<div class="nav-parent"><span class="nav-icon">' + PLUS_ICON + '</span><span class="nav-title">添加分组</span></div>';
    navListEl.appendChild(addDiv);

    // 重置按钮
    var resetBtn = document.createElement('button');
    resetBtn.className = 'reset-btn';
    resetBtn.textContent = '放弃本次修改';
    resetBtn.onclick = function () {
      if (!confirm('确定放弃本次修改？将回到当前 data.js / nav.json 的内容，未导出的改动会丢失。')) return;
      localStorage.removeItem(STORE_KEY);
      replaceNavData(JSON.parse(JSON.stringify(ORIGINAL)));
      currentView = null;
      renderSidebar(navDataRef);
      renderContentForCurrent();
    };
    navListEl.appendChild(resetBtn);

    // 导出按钮
    var exportBtn = document.createElement('button');
    exportBtn.className = 'reset-btn';
    exportBtn.textContent = '导出 nav.json';
    exportBtn.onclick = function () {
      var blob = new Blob([JSON.stringify(navDataRef, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'nav.json';
      a.click();
      URL.revokeObjectURL(url);
    };
    navListEl.appendChild(exportBtn);
  }

  // ============================================================
  // 拖拽 —— 卡片
  // ============================================================
  function bindCardDragSort() {
    var contentEl = document.getElementById('content');
    if (!contentEl) return;

    contentEl.addEventListener('dragstart', function (e) {
      var card = e.target.closest('.card[draggable="true"]');
      if (!card) return;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.cat + ':' + card.dataset.index);
    });

    contentEl.addEventListener('dragover', function (e) {
      e.preventDefault();
      var card = e.target.closest('.card');
      if (!card) return;
      contentEl.querySelectorAll('.card').forEach(function (c) { c.classList.remove('drag-over-target'); });
      card.classList.add('drag-over-target');
    });

    contentEl.addEventListener('drop', function (e) {
      e.preventDefault();
      var target = e.target.closest('.card[draggable="true"]');
      contentEl.querySelectorAll('.card').forEach(function (c) { c.classList.remove('drag-over-target'); });
      if (!target) return;

      var data = e.dataTransfer.getData('text/plain').split(':');
      var sourceCat = data[0];
      var sourceIndex = parseInt(data[1], 10);
      var targetCat = target.dataset.cat;
      var targetIndex = parseInt(target.dataset.index, 10);

      var sourceLinks = navDataRef.find(function (s) { return s.category === sourceCat; }).links;
      var targetLinks = navDataRef.find(function (s) { return s.category === targetCat; }).links;

      var moved = sourceLinks.splice(sourceIndex, 1)[0];
      targetLinks.splice(targetIndex, 0, moved);

      saveNavData();
      renderSidebar(navDataRef);
      renderContentForCurrent();
    });

    contentEl.addEventListener('dragend', function (e) {
      contentEl.querySelectorAll('.card').forEach(function (c) { c.classList.remove('drag-over-target'); });
    });
  }

  // ============================================================
  // 拖拽 —— 分组
  // ============================================================
  function bindGroupDragSort() {
    var dragState = { sourceCat: null };
    var navListEl = document.getElementById('navList');
    if (!navListEl) return;

    navListEl.addEventListener('dragstart', function (e) {
      var item = e.target.closest('.nav-item[draggable="true"]');
      if (!item) return;
      dragState.sourceCat = item.dataset.cat;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.dataset.cat);
    });

    navListEl.addEventListener('dragover', function (e) {
      e.preventDefault();
      if (!dragState.sourceCat) return;
      var item = e.target.closest('.nav-item[draggable="true"]');
      if (!item || item.dataset.cat === dragState.sourceCat) return;
      navListEl.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
      item.classList.add('drag-over-sidebar');
    });

    navListEl.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var target = e.target.closest('.nav-item[draggable="true"]');
      navListEl.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
      if (!target || !dragState.sourceCat || target.dataset.cat === dragState.sourceCat) {
        dragState.sourceCat = null;
        return;
      }
      moveGroup(dragState.sourceCat, target.dataset.cat);
      dragState.sourceCat = null;
    });

    navListEl.addEventListener('dragend', function (e) {
      navListEl.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('drag-over-sidebar'); });
    });
  }

  function moveGroup(sourceCat, targetCat) {
    var sourceIndex = navDataRef.findIndex(function (s) { return s.category === sourceCat; });
    var targetIndex = navDataRef.findIndex(function (s) { return s.category === targetCat; });
    if (sourceIndex < 0 || targetIndex < 0) return;

    var moved = navDataRef.splice(sourceIndex, 1)[0];
    var newTargetIndex = navDataRef.findIndex(function (s) { return s.category === targetCat; });
    navDataRef.splice(newTargetIndex, 0, moved);

    saveNavData();
    renderSidebar(navDataRef);
    renderContentForCurrent();
  }

  // ============================================================
  // 增删改
  // ============================================================
  function deleteLink(cat, index) {
    if (!confirm('确定删除该网址吗？')) return;
    var group = navDataRef.find(function (s) { return s.category === cat; });
    if (!group) return;
    group.links.splice(index, 1);
    saveNavData();
    renderSidebar(navDataRef);
    renderContentForCurrent();
  }

  function deleteGroup(cat) {
    if (!confirm('确定删除分组「' + cat + '」及其所有网址吗？')) return;
    var idx = navDataRef.findIndex(function (s) { return s.category === cat; });
    if (idx < 0) return;
    navDataRef.splice(idx, 1);
    if (currentView === cat) currentView = null;
    saveNavData();
    renderSidebar(navDataRef);
    renderContentForCurrent();
  }

  // ============================================================
  // 模态框 —— 遮罩不关闭，仅按钮/Esc 关闭
  // ============================================================
  var modalKeyHandler = null;

  function initModal() {
    if (!document.getElementById('navExtModal')) {
      var overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.id = 'navExtModal';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.style.display = 'none';
      overlay.innerHTML = '<div class="modal-content" id="navExtModalContent"></div>';
      document.body.appendChild(overlay);

      // 遮罩点击不关闭
      overlay.onclick = function (e) {
        e.stopPropagation();
      };
    }
  }

  function showModal(html) {
    var overlay = document.getElementById('navExtModal');
    var contentBox = document.getElementById('navExtModalContent');
    if (!overlay || !contentBox) return;

    contentBox.innerHTML = html;
    overlay.style.display = 'flex';

    if (modalKeyHandler) {
      document.removeEventListener('keydown', modalKeyHandler);
    }
    modalKeyHandler = function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        hideModal();
      }
    };
    document.addEventListener('keydown', modalKeyHandler);

    var firstInput = contentBox.querySelector('input, select, textarea, button');
    if (firstInput) firstInput.focus();
  }

  function hideModal() {
    var overlay = document.getElementById('navExtModal');
    if (overlay) overlay.style.display = 'none';
    if (modalKeyHandler) {
      document.removeEventListener('keydown', modalKeyHandler);
      modalKeyHandler = null;
    }
  }

  // ============================================================
  // 分组编辑弹窗
  // ============================================================
  function openGroupModal(cat) {
    var group = cat ? navDataRef.find(function (s) { return s.category === cat; }) : null;
    var titleText = group ? '编辑分组' : '新建分组';
    var nameVal = group ? group.category : '';
    var iconVal = group ? (group.icon || '') : '';

    showModal(
      '<h3>' + titleText + '</h3>' +
      '<label>分组名称 *</label>' +
      '<input type="text" id="groupName" placeholder="例如：电影资源" value="' + nameVal.replace(/"/g, '&quot;') + '">' +
      '<label>分组图标（SVG 字符串）</label>' +
      '<input type="text" id="groupIcon" placeholder="留空使用默认文件夹图标" value="' + iconVal.replace(/"/g, '&quot;') + '">' +
      '<div class="hint">粘贴 Lucide 风格 SVG，例如：&lt;svg viewBox="0 0 24 24" ...&gt;&lt;/svg&gt;</div>' +
      '<div class="btn-row">' +
        '<button type="button" class="btn btn-cancel" id="groupCancel">取消</button>' +
        '<button type="button" class="btn btn-primary" id="groupSubmit">保存</button>' +
      '</div>'
    );

    document.getElementById('groupCancel').onclick = hideModal;
    document.getElementById('groupSubmit').onclick = function () {
      var name = document.getElementById('groupName').value.trim();
      if (!name) { document.getElementById('groupName').focus(); return; }
      var icon = document.getElementById('groupIcon').value.trim() || DEFAULT_GROUP_ICON;

      if (group) {
        group.category = name;
        group.icon = icon;
      } else {
        navDataRef.push({ category: name, icon: icon, links: [] });
      }

      saveNavData();
      currentView = name;
      renderSidebar(navDataRef);
      renderContentForCurrent();
      hideModal();
    };
  }

  // ============================================================
  // 网址编辑弹窗
  // ============================================================
  function openLinkModal(cat, index) {
    var group = navDataRef.find(function (s) { return s.category === cat; });
    var link = (index !== null && index !== undefined && group) ? group.links[index] : null;
    var isEdit = !!link;

    var titleText = isEdit ? '编辑网址' : '新建网址';
    var linkTitle = link ? link.title : '';
    var linkUrl = link ? link.url : '';
    var linkDesc = link ? (link.desc || '') : '';
    var linkIcon = link ? (link.icon || '') : '';

    var categoryOptions = navDataRef.map(function (g) {
      return '<option value="' + g.category + '"' + (g.category === cat ? ' selected' : '') + '>' + g.category + '</option>';
    }).join('');

    showModal(
      '<h3>' + titleText + '</h3>' +
      '<label>网址（必填）<span class="req">*</span></label>' +
      '<input type="text" id="linkUrl" placeholder="https://example.com" value="' + linkUrl.replace(/"/g, '&quot;') + '">' +
      '<label>标题 <span class="opt">（不填则自动获取）</span></label>' +
      '<input type="text" id="linkTitle" placeholder="例如：百度" value="' + linkTitle.replace(/"/g, '&quot;') + '">' +
      '<label>描述 <span class="opt">（不填则自动获取）</span></label>' +
      '<input type="text" id="linkDesc" placeholder="一句话简介" value="' + linkDesc.replace(/"/g, '&quot;') + '">' +
      '<label>图标 <span class="opt">（不填则自动获取 favicon）</span></label>' +
      '<span class="icon-input-wrap"><input type="text" id="linkIcon" placeholder="图标 URL，留空自动获取站点图标" value="' + linkIcon.replace(/"/g, '&quot;') + '"></span>' +
      '<label>分组</label>' +
      '<select id="linkCategory">' + categoryOptions + '</select>' +
      '<div class="hint">未填写标题、描述或图标时，保存后会自动从网址抓取并填充。</div>' +
      '<div class="btn-row">' +
        '<button type="button" class="btn btn-cancel" id="linkCancel">取消</button>' +
        '<button type="button" class="btn btn-primary" id="linkSubmit">保存</button>' +
      '</div>'
    );

    var urlInput = document.getElementById('linkUrl');
    var titleInput = document.getElementById('linkTitle');
    var descInput = document.getElementById('linkDesc');
    var iconInput = document.getElementById('linkIcon');

    // 离开网址输入框时，自动填充未填写的标题/描述/图标。
    // 图标：尝试真实抓取站点 favicon（Google s2 / DuckDuckGo / 站点自带），
    //       抓取失败才走首字兜底。
    // 标题/描述：优先用 navData 里已存的；没有则从页面 <title>/<meta> 解析。
    var fetching = false;
    function autoFill(raw, { fillTitleDesc }) {
      if (!raw) return;
      var domain = getDomain(raw);
      if (!domain) return;

      // 标题/描述：先看 navData 里是否已有该网址
      if (fillTitleDesc) {
        var known = null;
        try {
          navDataRef.forEach(function (sec) {
            (sec.links || []).forEach(function (l) {
              if (!known && l.url && normalizeUrl(l.url) === normalizeUrl(raw)) known = l;
            });
          });
        } catch (e) { known = null; }
        if (known) {
          if (!titleInput.value.trim()) titleInput.value = known.title || domain.replace(/^www\./, '');
          if (!descInput.value.trim()) descInput.value = known.desc || ('来自 ' + domain);
        }
      }

      // 图标：已填则不覆盖；否则真实抓取
      if (iconInput.value.trim()) { previewIcon(iconInput.value.trim()); return; }
      if (fetching) return;
      fetching = true;
      fetchFavicon(raw, function (dataUri) {
        fetching = false;
        if (dataUri && !iconInput.value.trim()) {
          iconInput.value = dataUri;
          previewIcon(dataUri);
        } else {
          // 抓取失败：尝试解析站点 HTML 的 <link rel="icon">
          parseIconFromHtml(raw, function (fromHtml) {
            if (fromHtml && !iconInput.value.trim()) {
              iconInput.value = fromHtml;
              previewIcon(fromHtml);
            } else {
              previewIcon(''); // 交给保存时的首字兜底
            }
          });
        }
      });
    }

    // 实时预览：把图标输入框里的值立刻渲染成缩略图，方便一眼确认
    var previewTimer = null;
    function previewIcon(src) {
      var box = document.getElementById('iconPreview');
      if (!box) {
        box = document.createElement('div');
        box.id = 'iconPreview';
        box.className = 'icon-preview';
        iconInput.parentNode.insertBefore(box, iconInput.nextSibling);
      }
      if (!src) { box.innerHTML = ''; return; }
      box.innerHTML = '<img src="' + src.replace(/"/g, '&quot;') + '" alt="" onerror="this.parentNode.innerHTML=\x27\x27">';
    }

    // URL 归一化：用于判断「同一个网址」是否已存在图标
    function normalizeUrl(u) {
      try {
        var o = new URL(u.indexOf('://') > -1 ? u : 'https://' + u);
        return (o.hostname + o.pathname + o.search).toLowerCase().replace(/\/$/, '');
      } catch (e) { return u; }
    }

    if (!isEdit) {
      urlInput.addEventListener('blur', function () {
        var raw = urlInput.value.trim();
        if (!raw) return;
        var domain = getDomain(raw);
        if (!domain) return;
        if (!titleInput.value.trim()) titleInput.value = domain.replace(/^www\./, '');
        if (!descInput.value.trim()) descInput.value = '来自 ' + domain;
        autoFill(raw, { fillTitleDesc: true });
      });
    }

    iconInput.addEventListener('input', function () {
      clearTimeout(previewTimer);
      var v = iconInput.value.trim();
      if (!v) { previewIcon(''); return; }
      previewTimer = setTimeout(function () { previewIcon(v); }, 300);
    });
    // 已有数据打开编辑时，立即显示当前图标
    if (isEdit && iconInput.value.trim()) previewIcon(iconInput.value.trim());

    document.getElementById('linkCancel').onclick = hideModal;
    document.getElementById('linkSubmit').onclick = function () {
      var url = urlInput.value.trim();
      var title = titleInput.value.trim();
      var desc = descInput.value.trim();
      var icon = iconInput.value.trim();
      var newCat = document.getElementById('linkCategory').value.trim();

      if (!url || !newCat) {
        alert('请填写网址和所属分组');
        return;
      }

      // 保存前兜底：标题/描述/图标都为空时，用网址信息补全
      if (!title) title = (getDomain(url) || '').replace(/^www\./, '') || '新网址';
      if (!desc) desc = '来自 ' + (getDomain(url) || url);
      if (!icon) {
        // 尝试抓取一次（异步），若来不及则在 onload 回调里补写
        fetchFavicon(url, function (dataUri) {
          if (dataUri) {
            saved.icon = dataUri;
            saveNavData();
          }
        });
      }

      var saved = { title: title, url: url, desc: desc, icon: icon };

      if (isEdit) {
        // 编辑现有：如果在同一分组，直接修改；否则移动
        if (newCat === cat) {
          group.links[index] = saved;
        } else {
          group.links.splice(index, 1);
          var target = navDataRef.find(function (s) { return s.category === newCat; });
          if (target) target.links.push(saved);
        }
      } else {
        var target2 = navDataRef.find(function (s) { return s.category === newCat; });
        if (target2) target2.links.push(saved);
        else navDataRef.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [saved] });
      }

      saveNavData();
      currentView = newCat;
      renderSidebar(navDataRef);
      renderContentForCurrent();
      hideModal();
    };
  }

  // ============================================================
  // 全局点击处理
  // ============================================================
  function handleGlobalClick(e) {
    var addGroup = e.target.closest('.add-group-item');
    if (addGroup) {
      e.preventDefault();
      openGroupModal(null);
      return;
    }

    var addCard = e.target.closest('.add-card');
    if (addCard) {
      e.preventDefault();
      e.stopPropagation();
      openLinkModal(addCard.dataset.cat, null);
      return;
    }

    var actBtn = e.target.closest('.card-act-btn');
    if (actBtn) {
      e.preventDefault();
      e.stopPropagation();
      var cat = actBtn.dataset.cat;
      var index = parseInt(actBtn.dataset.index, 10);
      if (actBtn.dataset.act === 'edit') openLinkModal(cat, index);
      else if (actBtn.dataset.act === 'del') deleteLink(cat, index);
      return;
    }

    var grpBtn = e.target.closest('.grp-act-btn');
    if (grpBtn) {
      e.preventDefault();
      e.stopPropagation();
      var gcat = grpBtn.dataset.cat;
      if (grpBtn.dataset.act === 'edit') openGroupModal(gcat);
      else if (grpBtn.dataset.act === 'del') deleteGroup(gcat);
    }
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
  // Logo 点击 → 显示全部
  // ============================================================
  function bindLogoClick() {
    var logo = document.getElementById('logo');
    if (logo) {
      logo.onclick = function () {
        currentView = null;
        var input = document.getElementById('subSearchInput');
        if (input) input.value = '';
        renderSidebar(navDataRef);
        renderContent(navDataRef.filter(function (s) { return (s.links || []).length > 0; }));
      };
      logo.style.cursor = 'pointer';
    }
  }

  // ============================================================
  // 搜索功能
  // ============================================================
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
      };
    });

    updatePlaceholder();
  }

  function doSearchWithEngine(keyword) {
    // 空关键词不跳转，也不搜索
    if (!keyword) return;
    if (currentEngine === 'site') {
      var filtered = filterData(navDataRef, keyword);
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
      var keyword = input.value.trim();
      doSearchWithEngine(keyword);
    }

    // input 事件只做站内实时搜索（站内模式），不跳转外部
    input.addEventListener('input', function () {
      if (currentEngine === 'site') {
        var keyword = input.value.trim();
        var filtered = filterData(navDataRef, keyword);
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
  // 渲染当前视图
  // ============================================================
  function renderContentForCurrent() {
    var data;
    if (currentView) {
      var group = navDataRef.find(function (s) { return s.category === currentView; });
      if (group) data = [group];
    }
    if (!data) {
      data = navDataRef.filter(function (s) { return (s.links || []).length > 0; });
    }
    renderContent(data);
  }

  // ============================================================
  // 主题切换
  // ============================================================
  // ============================================================
  // 主题切换：系统跟随最高优先级
  // - 每次刷新都重新读取系统偏好
  // - 手动切换仅本会话生效，刷新后立即回到系统值
  // - 不向 localStorage 写入任何主题锁定值
  // ============================================================
  var STORE_KEY_THEME = 'navTheme';

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

  function initTheme() {
    var themeBtn = document.getElementById('themeBtn');
    var themeIcon = document.querySelector('.theme-icon');
    var themeText = document.querySelector('.theme-text');

    // 注入日月图标
    if (themeIcon && !themeIcon.querySelector('svg')) {
      themeIcon.innerHTML = SUN_ICON + MOON_ICON;
    }

    // 系统跟随最高优先级：每次刷新都重新读系统偏好
    var initialTheme = systemPrefersDark() ? 'dark' : 'light';
    applyTheme(initialTheme);

    // 监听系统主题变化，实时跟随（任何时候都响应，不做任何锁定）
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
        // 手动切换：仅本会话生效，刷新后立即回到系统值
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      };
    }
  }

  // 模块级函数：定义在 initTheme 之外，避免严格模式下内层作用域隔离
  // 导致 applyTheme 调用时抛出 ReferenceError: updateThemeButton is not defined
  function updateThemeButton(theme) {
    var themeText = document.querySelector('.theme-text');
    if (!themeText) return;
    themeText.textContent = theme === 'dark' ? '浅色模式' : '深色模式';
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
  // 启动 —— 只执行一次
  // ============================================================
  async function bootNav() {
    if (BOOTED) return;
    BOOTED = true;

    // 刷新兜底：先对齐一次系统主题，保证跟随不失效
    try {
      var sys = systemPrefersDark() ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', sys);
    } catch (e) { /* ignore */ }

    try { initTheme(); } catch (e) { console.error('[nav] initTheme 失败:', e); }

    // loadNavData 是异步的，期间 DOM 已就绪；先渲染一次快照，避免白屏
    try { renderSidebar(navDataRef); } catch (e) { console.error('[nav] 预渲染侧边栏失败:', e); }
    try { renderContentForCurrent(); } catch (e) { console.error('[nav] 预渲染内容失败:', e); }

    bindLogoClick();
    bindSearchEngines();
    bindSearch();
    initModal();
    document.addEventListener('click', handleGlobalClick);
    bindCardDragSort();
    bindGroupDragSort();

    await loadNavData();

    if (!Array.isArray(navDataRef) || navDataRef.length === 0) {
      replaceNavData(JSON.parse(JSON.stringify(ORIGINAL)));
    }

    try { renderSidebar(navDataRef); } catch (e) { console.error('[nav] renderSidebar 失败:', e); }
    try { renderContentForCurrent(); } catch (e) { console.error('[nav] renderContent 失败:', e); }
  }

  // 暴露全局 API
  window.openLinkModal = openLinkModal;
  window.openGroupModal = openGroupModal;
  window.directOpenLinkModal = function (cat) {
    openLinkModal(cat, null);
  };

  // 启动
  bootNav();

})();
