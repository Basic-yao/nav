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

    // 1. 优先使用本地已保存的数据
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          replaceNavData(parsed);
          NAV_READY = true;
          return;
        }
      }
    } catch (e) { /* 忽略损坏数据 */ }

    // 2. 本地无数据：尝试 nav.json
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

    // 3. 回退到内置默认数据
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

    var fallback = DEFAULT_ICONS[sec.category] || null;
    var node2 = svgFromString(fallback || sec.icon);
    if (node2) return svgToString(node2);
    return svgToString(svgFromString(DEFAULT_GROUP_ICON));
  }

  function getDomain(rawUrl) {
    try {
      var u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
      return u.hostname;
    } catch (e) { return ''; }
  }

  function getFavicon(rawUrl) {
    var domain = getDomain(rawUrl);
    return domain ? 'https://icons.duckduckgo.com/ip3/' + domain + '.ico' : '';
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
      iconHtml = '<img src="' + l.icon.replace(/"/g, '&quot;') + '" alt="" loading="lazy" data-fallback="' + fbEnc + '" data-bg="' + bgEnc + '" data-fg="' + fgEnc + '" onerror="window.__fallbackIcon(this)">';
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
      var svgNode = svgFromString(item.icon || DEFAULT_ICONS[item.category] || DEFAULT_GROUP_ICON);
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
    resetBtn.textContent = '恢复默认数据';
    resetBtn.onclick = function () {
      if (!confirm('确定恢复默认数据？当前所有修改将丢失。')) return;
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
      '<input type="text" id="linkIcon" placeholder="图标 URL，留空自动获取站点图标" value="' + linkIcon.replace(/"/g, '&quot;') + '">' +
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

    // 离开网址输入框时，自动填充未填写的标题/描述/图标
    if (!isEdit) {
      urlInput.addEventListener('blur', function () {
        var raw = urlInput.value.trim();
        if (!raw) return;
        var domain = getDomain(raw);
        if (!domain) return;
        if (!titleInput.value.trim()) titleInput.value = domain.replace(/^www\./, '');
        if (!descInput.value.trim()) descInput.value = '来自 ' + domain;
        if (!iconInput.value.trim()) iconInput.value = getFavicon(raw);
      });
    }

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

      // 保存前若仍为空，按网址兜底填充
      if (!title) title = (getDomain(url) || '').replace(/^www\./, '') || '新网址';
      if (!desc) desc = '来自 ' + (getDomain(url) || url);
      if (!icon) icon = getFavicon(url);

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
  function initTheme() {
    var themeBtn = document.getElementById('themeBtn');
    var themeIcon = document.querySelector('.theme-icon');
    var themeText = document.querySelector('.theme-text');

    // 注入日月图标
    if (themeIcon && !themeIcon.querySelector('svg')) {
      themeIcon.innerHTML = SUN_ICON + MOON_ICON;
    }

    // 读取保存的主题
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

    initTheme();
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

    renderSidebar(navDataRef);
    renderContentForCurrent();
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
