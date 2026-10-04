(function () {
  'use strict';

  const STORE_KEY = 'navStoreV2';
  const DEFAULT_GROUP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
  const PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  const EDIT_ICON = '<svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';
  const TRASH_ICON = '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

  const ORIGINAL = JSON.parse(JSON.stringify(navData));
  let currentView = null;

  function saveNavData() {
    localStorage.setItem(STORE_KEY, JSON.stringify(navData));
  }

async function loadNavData() {
  // 1. 从仓库 nav.json 加载（真实数据源）
  try {
    const res = await fetch('nav.json?v=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      navData = await res.json();
      return;
    }
  } catch(e) {}

  // 2. 仓库加载失败：尝试本地草稿
  try {
    const local = localStorage.getItem('navStoreV2');
    if (local) {
      navData = JSON.parse(local);
      return;
    }
  } catch(e) {}

  // 3. 最后回退到内置默认数据
  navData = JSON.parse(JSON.stringify(ORIGINAL));
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
    if (sec.icon) {
      const node = svgFromString(sec.icon);
      if (node) return svgToString(node);
    }
    const fallback = navIcons[sec.category];
    const node2 = svgFromString(fallback || sec.icon);
    if (node2) return svgToString(node2);
    return svgToString(svgFromString(DEFAULT_GROUP_ICON));
  }

  function getDomain(rawUrl) {
    try {
      const u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
      return u.hostname;
    } catch (e) { return ''; }
  }

  function getFavicon(rawUrl) {
    const domain = getDomain(rawUrl);
    return domain ? 'https://icons.duckduckgo.com/ip3/' + domain + '.ico' : '';
  }

  function getFallback(l) {
    const ch = (l.title || '?').trim().charAt(0).toUpperCase();
    let hash = 0;
    const seed = l.title || l.url || '';
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    const hue = hash % 360;
    return { ch, hue };
  }

  function cardTpl(l, cat, index) {
    const fb = getFallback(l);
    const bg = `hsl(${fb.hue}, 65%, 88%)`;
    const fg = `hsl(${fb.hue}, 45%, 32%)`;
    const safeUrl = (l.url || '').replace(/"/g, '&quot;');
    return `<div class="card" draggable="true" data-cat="${cat}" data-index="${index}">
      <div class="card-main" onclick="window.open('${safeUrl}','_blank')">
        <div class="card-icon">
          <img src="${l.icon}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${fb.ch}',className:'card-fallback',style:'background:${bg};color:${fg}'}))">
        </div>
        <div class="card-body">
          <div class="card-title">${l.title}</div>
          <div class="card-desc">${l.desc}</div>
        </div>
      </div>
      <div class="card-actions">
        <button class="card-act-btn" data-act="edit" data-cat="${cat}" data-index="${index}" title="编辑">${EDIT_ICON}</button>
        <button class="card-act-btn" data-act="del" data-cat="${cat}" data-index="${index}" title="删除">${TRASH_ICON}</button>
      </div>
    </div>`;
  }

function renderContent(data) {
  content.innerHTML = '';
  if (!data || data.length === 0) {
    content.innerHTML = '<div class="empty">未找到相关内容</div>';
    return;
  }
  data.forEach(sec => {
    const links = sec.links || [];
    const title = `<h2 class="section-title">
      ${getSectionIcon(sec)}
      <span>${sec.category}</span>
      <span class="group-actions">
        <button class="grp-act-btn" data-act="edit" data-cat="${sec.category}" title="编辑分组">${EDIT_ICON}</button>
        <button class="grp-act-btn" data-act="del" data-cat="${sec.category}" title="删除分组">${TRASH_ICON}</button>
      </span>
    </h2>`;
    const cards = links.map((l, i) => cardTpl(l, sec.category, i)).join('');
const addCard =
  '<a href="javascript:void(0)" class="card add-card" onclick="window.directOpenLinkModal(\'' + sec.category.replace(/'/g, "\\'") + '\')">' +
    '<div class="card-icon">' + PLUS_ICON + '</div>' +
    '<div class="card-body">' +
      '<div class="card-title">添加网址</div>' +
      '<div class="card-desc">新增到「' + sec.category + '」</div>' +
    '</div>' +
  '</a>';
    content.innerHTML += title + '<div class="grid">' + cards + addCard + '</div>';
  });

  bindDragSort();

}

function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'nav-item';
    div.draggable = true;
    div.dataset.cat = item.category;

    const parent = document.createElement('div');
    parent.className = 'nav-parent';

    const iconWrap = document.createElement('span');
    iconWrap.className = 'nav-icon';
    const svgNode = svgFromString(item.icon || navIcons[item.category]);
    if (svgNode) iconWrap.appendChild(svgNode);

    const titleWrap = document.createElement('span');
    titleWrap.className = 'nav-title';
    titleWrap.textContent = item.category;

    parent.appendChild(iconWrap);
    parent.appendChild(titleWrap);

    parent.onclick = () => {
      currentView = item.category;
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      div.classList.add('active');
      renderContent([item]);
      if (typeof resetScrollToTop === 'function') resetScrollToTop();
    };

    div.appendChild(parent);
    navList.appendChild(div);
  });

  const addDiv = document.createElement('div');
  addDiv.className = 'nav-item add-group-item';
  addDiv.innerHTML = '<div class="nav-parent"><span class="nav-icon">' + PLUS_ICON + '</span><span class="nav-title">添加分组</span></div>';

  // 直接绑定添加分组点击
  addDiv.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openGroupModal(null);
  };

  navList.appendChild(addDiv);

  const resetBtn = document.createElement('button');
  resetBtn.className = 'reset-btn';
  resetBtn.textContent = '重置为默认数据';
  resetBtn.onclick = () => {
    if (confirm('确定重置所有自定义分组和编辑内容吗？')) {
      navData.length = 0;
      JSON.parse(JSON.stringify(ORIGINAL)).forEach(x => navData.push(x));
      saveNavData();
      currentView = null;
      renderSidebar(navData);
      renderContent(navData.filter(s => (s.links || []).length > 0));
      if (typeof logo !== 'undefined' && logo && typeof logo.onclick === 'function') logo.onclick();
    }
  };
navList.appendChild(resetBtn);

  // 新增：导出数据JSON按钮
  const exportBtn = document.createElement('button');
  exportBtn.className = 'reset-btn';
  exportBtn.textContent = '导出数据JSON';
  exportBtn.onclick = function() {
    const blob = new Blob([JSON.stringify(navData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nav.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  navList.appendChild(exportBtn);

  bindGroupDragSort();
}



  function handleGlobalClick(e) {
    const addGroup = e.target.closest('.add-group-item');
    if (addGroup) {
      e.preventDefault();
      openGroupModal(null);
      return;
    }

    const addCard = e.target.closest('.add-card');
    if (addCard) {
      e.preventDefault();
     openLinkModal(addCard.dataset.cat, null);
      return;
    }

    const actBtn = e.target.closest('.card-act-btn');
    if (actBtn) {
      e.preventDefault();
      e.stopPropagation();
      const cat = actBtn.dataset.cat;
      const index = parseInt(actBtn.dataset.index, 10);
      if (actBtn.dataset.act === 'edit') openLinkModal(cat, index);
      else if (actBtn.dataset.act === 'del') deleteLink(cat, index);
      return;
    }

    const grpBtn = e.target.closest('.grp-act-btn');
    if (grpBtn) {
      e.preventDefault();
      e.stopPropagation();
      const cat = grpBtn.dataset.cat;
      if (grpBtn.dataset.act === 'edit') openGroupModal(cat);
      else if (grpBtn.dataset.act === 'del') deleteGroup(cat);
    }
  }

  function bindGroupDragSort() {
    const dragState = { sourceCat: null };

    navList.addEventListener('dragstart', (e) => {
      const item = e.target.closest('.nav-item[draggable="true"]');
      if (!item) return;
      dragState.sourceCat = item.dataset.cat;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.dataset.cat);
    });

    navList.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!dragState.sourceCat) return;
      const item = e.target.closest('.nav-item[draggable="true"]');
      if (!item || item.dataset.cat === dragState.sourceCat) return;
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('drag-over-sidebar'));
      item.classList.add('drag-over-sidebar');
    });

    navList.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target.closest('.nav-item[draggable="true"]');
      if (!target || !dragState.sourceCat || target.dataset.cat === dragState.sourceCat) {
        navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('drag-over-sidebar'));
        dragState.sourceCat = null;
        return;
      }
      moveGroup(dragState.sourceCat, target.dataset.cat);
      dragState.sourceCat = null;
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('drag-over-sidebar'));
    });

    navList.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('drag-over-sidebar'));
      dragState.sourceCat = null;
    });
  }

  function moveGroup(sourceCat, targetCat) {
    const fromIndex = navData.findIndex(s => s.category === sourceCat);
    const toIndex = navData.findIndex(s => s.category === targetCat);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
    const [moved] = navData.splice(fromIndex, 1);
    navData.splice(toIndex, 0, moved);
    saveNavData();
    if (currentView === sourceCat) currentView = targetCat;
    renderSidebar(navData);
    renderContentForCurrent();
  }

  function bindDragSort() {
    const dragState = { source: null };

    content.addEventListener('dragstart', (e) => {
      const card = e.target.closest('.card[draggable="true"]');
      if (!card) return;
      dragState.source = { cat: card.dataset.cat, index: parseInt(card.dataset.index, 10) };
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.cat + ':' + card.dataset.index);
    });

    content.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!dragState.source) return;
      const card = e.target.closest('.card[draggable="true"]');
      if (!card) return;
      const target = card.dataset;
      if (target.cat === dragState.source.cat && parseInt(target.index, 10) === dragState.source.index) return;
      content.querySelectorAll('.card').forEach(c => c.classList.remove('drag-over-target'));
      card.classList.add('drag-over-target');
    });

    content.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = e.target.closest('.card[draggable="true"]');
      const src = dragState.source;
      dragState.source = null;
      if (!src || !card) {
        content.querySelectorAll('.card').forEach(c => c.classList.remove('drag-over-target'));
        return;
      }
      const target = card.dataset;
      moveLink(src.cat, src.index, target.cat, parseInt(target.index, 10));
      content.querySelectorAll('.card').forEach(c => c.classList.remove('drag-over-target'));
    });

    content.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
      content.querySelectorAll('.card').forEach(c => c.classList.remove('drag-over-target'));
      dragState.source = null;
    });
  }

  function moveLink(sourceCat, sourceIndex, targetCat, targetIndex) {
    const fromGroup = navData.find(s => s.category === sourceCat);
    const toGroup = navData.find(s => s.category === targetCat);
    if (!fromGroup || !toGroup) return;
    const sourceLinks = fromGroup.links || [];
    if (sourceIndex < 0 || sourceIndex >= sourceLinks.length) return;
    let targetLinks = toGroup.links || [];
    const targetValid = targetIndex >= 0 && targetIndex < targetLinks.length;

    if (sourceCat === targetCat) {
      if (!targetValid || sourceIndex === targetIndex) return;
      const [moved] = sourceLinks.splice(sourceIndex, 1);
      sourceLinks.splice(targetIndex, 0, moved);
    } else {
      const [moved] = sourceLinks.splice(sourceIndex, 1);
      if (targetValid) {
        targetLinks.splice(targetIndex, 0, moved);
      } else {
        targetLinks.push(moved);
      }
    }
    saveNavData();
    renderSidebar(navData);
    renderContentForCurrent();
  }

  function deleteLink(cat, index) {
    const group = navData.find(s => s.category === cat);
    if (!group) return;
    if (confirm('确定删除这个网址吗？')) {
      group.links.splice(index, 1);
      saveNavData();
      renderContentForCurrent();
    }
  }

  function deleteGroup(cat) {
    if (!confirm('确定删除分组「' + cat + '」及其所有网址吗？')) return;
    navData = navData.filter(s => s.category !== cat);
    if (currentView === cat) currentView = null;
    saveNavData();
    renderSidebar(navData);
    renderContentForCurrent();
  }

  function initModal() {
    if (!document.getElementById('navExtModal')) {
      document.body.insertAdjacentHTML('beforeend',
        '<div class="modal-overlay" id="navExtModal" style="display:none">' +
          '<div class="modal-content" id="navExtModalContent"></div>' +
        '</div>'
      );
    }
    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('click', e => {
      if (e.target.id === 'navExtModal') hideModal();
    });
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
    document.getElementById('navExtModal').style.display = 'none';
  }

  function openGroupModal(cat) {
    const group = cat ? navData.find(s => s.category === cat) : null;
    const titleText = group ? '编辑分组' : '新建分组';
    const nameVal = group ? group.category : '';
    const iconVal = group ? (group.icon || '') : '';

    showModal(
      '<h3>' + titleText + '</h3>' +
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
    document.getElementById('groupSubmit').onclick = () => {
      const name = document.getElementById('groupName').value.trim();
      if (!name) { document.getElementById('groupName').focus(); return; }
      const icon = document.getElementById('groupIcon').value.trim() || DEFAULT_GROUP_ICON;

      if (group) {
        group.category = name;
        group.icon = icon;
      } else {
        if (navData.some(s => s.category === name)) {
          alert('该分组已存在');
          return;
        }
        navData.push({ category: name, icon, links: [] });
      }

      saveNavData();
      currentView = name;
      renderSidebar(navData);
      renderContentForCurrent();
      hideModal();
    };
  }

  function openLinkModal(cat, index) {
    let editLink = null;
    const isEdit = index !== null && index !== undefined;

    if (isEdit) {
      const group = navData.find(s => s.category === cat);
      if (!group) return;
      editLink = group.links[index];
      if (!editLink) return;
    }

    const titleText = isEdit ? '编辑网址' : '添加网址';
    const urlVal = isEdit ? editLink.url : '';
    const titleVal = isEdit ? editLink.title : '';
    const descVal = isEdit ? editLink.desc : '';
    const iconVal = isEdit ? editLink.icon : '';
    const catVal = cat || currentView || '';
    const optionsStr = navData.map(s => {
      const selected = s.category === catVal ? 'selected' : '';
      return '<option value="' + s.category + '" ' + selected + '>' + s.category + '</option>';
    }).join('');

    showModal(
      '<h3>' + titleText + '</h3>' +
      '<label>网址 *</label>' +
      '<input type="text" id="linkUrl" placeholder="https://example.com" value="' + urlVal + '">' +
      '<label>标题</label>' +
      '<input type="text" id="linkTitle" placeholder="留空自动取域名" value="' + titleVal + '">' +
      '<label>描述</label>' +
      '<input type="text" id="linkDesc" placeholder="选填" value="' + descVal + '">' +
      '<label>图标（URL）</label>' +
      '<input type="text" id="linkIcon" placeholder="留空自动获取网站 favicon" value="' + iconVal + '">' +
      '<label>分类</label>' +
      '<select id="linkCategory">' + optionsStr + '</select>' +
      '<div class="btn-row">' +
        '<button class="btn btn-cancel" id="linkCancel">取消</button>' +
        '<button class="btn btn-primary" id="linkSubmit">保存</button>' +
      '</div>'
    );

    document.getElementById('linkCancel').onclick = hideModal;
    document.getElementById('linkSubmit').onclick = () => {
      const url = document.getElementById('linkUrl').value.trim();
      if (!url) { document.getElementById('linkUrl').focus(); return; }

      const fullUrl = url.startsWith('http') ? url : 'https://' + url;
      const domain = getDomain(fullUrl);
      if (!domain) { alert('网址格式不正确'); return; }

      const title = document.getElementById('linkTitle').value.trim() || domain.replace(/^www\./, '');
      const desc = document.getElementById('linkDesc').value.trim() || '';
      let icon = document.getElementById('linkIcon').value.trim();
      if (!icon) icon = getFavicon(fullUrl);
      const newCat = document.getElementById('linkCategory').value;

      if (isEdit) {
        const oldGroup = navData.find(s => s.category === cat);
        if (!oldGroup) return;
        const oldIndex = index;
        if (newCat === cat) {
          oldGroup.links[oldIndex] = { title, url: fullUrl, desc, icon };
        } else {
          oldGroup.links.splice(oldIndex, 1);
          const targetGroup = navData.find(s => s.category === newCat);
          if (targetGroup) {
            targetGroup.links.push({ title, url: fullUrl, desc, icon });
          } else {
            navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [{ title, url: fullUrl, desc, icon }] });
          }
        }
      } else {
        const targetGroup = navData.find(s => s.category === newCat);
        if (targetGroup) {
          targetGroup.links.push({ title, url: fullUrl, desc, icon });
        } else {
          navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [{ title, url: fullUrl, desc, icon }] });
        }
      }

      currentView = newCat;
      saveNavData();
      renderSidebar(navData);
      renderContentForCurrent();
      hideModal();
    };
  }

  initModal();
  loadNavData();
  renderSidebar(navData);
  renderContentForCurrent();
// ============ 启动 ============
  initModal();
  loadNavData();
  renderSidebar(navData);
  renderContentForCurrent();

  // 🆕 新增代码从这里开始
window.directOpenLinkModal = function(cat) {
  console.log('直接触发添加网址，分类：', cat);
  if (typeof openLinkModal === 'function') {
    openLinkModal(cat, null);   // ✅ 正确：第一个参数是分组名，第二个是 null（表示新增）
  } else {
    alert('系统错误：找不到弹窗函数！');
  }
};

  document.addEventListener('click', function(e) {
    const addCard = e.target.closest('.add-card');
    if (addCard) {
      e.preventDefault();
      e.stopPropagation();
      const cat = addCard.getAttribute('data-cat');
      window.directOpenLinkModal(cat);
    }
  });
  // 🆕 新增代码到这里结束
// ================= 全局保存函数（内联按钮调用） =================
window._navSaveLink = function () {
  try {
    const urlInput = document.getElementById('linkUrl');
    const catSelect = document.getElementById('linkCategory');
    if (!urlInput || !catSelect) return;

    const url = urlInput.value.trim();
    if (!url) { urlInput.focus(); return; }

    const fullUrl = url.startsWith('http') ? url : 'https://' + url;
    let domain = '';
    try { domain = new URL(fullUrl).hostname; } catch (e) {}

    if (!domain) {
      alert('网址格式不正确');
      return;
    }

    const titleInput = document.getElementById('linkTitle');
    const descInput = document.getElementById('linkDesc');
    const iconInput = document.getElementById('linkIcon');

    const title = titleInput.value.trim() || domain.replace(/^www\./, '');
    const desc = descInput.value.trim() || '';
    let icon = iconInput.value.trim();
    if (!icon) icon = 'https://icons.duckduckgo.com/ip3/' + domain + '.ico';
    const newCat = catSelect.value;

    const state = window._navEditState || { cat: null, index: null };

    if (state.index !== null) {
      // 编辑已有书签
      const oldGroup = navData.find(s => s.category === state.cat);
      if (!oldGroup) return;

      if (newCat === state.cat) {
        oldGroup.links[state.index] = { title, url: fullUrl, desc, icon };
      } else {
        oldGroup.links.splice(state.index, 1);
        const target = navData.find(s => s.category === newCat);
        if (target) {
          target.links.push({ title, url: fullUrl, desc, icon });
        } else {
          navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [{ title, url: fullUrl, desc, icon }] });
        }
      }
    } else {
      // 新增书签
      const target = navData.find(s => s.category === newCat);
      if (target) {
        target.links.push({ title, url: fullUrl, desc, icon });
      } else {
        navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [{ title, url: fullUrl, desc, icon }] });
      }
    }

    saveNavData();
    currentView = newCat;

    renderSidebar(navData);
    if (typeof renderContentForCurrent === 'function') {
      renderContentForCurrent();
    } else {
      renderContent(navData.filter(s => (s.links || []).length > 0));
    }

    hideModal();
  } catch (err) {
    alert('保存出错：' + err.message);
  }
};
// ================= 独立修复补丁：添加网址/保存网址 =================
(function () {
  // 确保模态框容器存在
  if (!document.getElementById('navExtModal')) {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'navExtModal';
    overlay.style.display = 'none';
    overlay.innerHTML = '<div class="modal-content" id="navExtModalContent"></div>';
    document.body.appendChild(overlay);
  }

  // 全局打开添加网址弹窗
window.openLinkModal = function (cat, index) {
  if (index === undefined) index = null;

  // 关键：如果没有传入分组，就用当前侧边栏选中的分组
  if (!cat && typeof currentView !== 'undefined') {
    cat = currentView;
  }

  window._navEditState = { cat: cat, index: index };
  var isEdit = index !== null;

  var editLink = null;
  if (isEdit) {
    var group = navData.find(function (s) { return s.category === cat; });
    if (!group) return;
    editLink = group.links[index];
    if (!editLink) return;
  }

  // 生成分类下拉选项，cat 对应的分组自动 selected
  var options = '';
  navData.forEach(function (s) {
    var sel = s.category === (cat || '') ? ' selected' : '';
    options += '<option value="' + s.category + '"' + sel + '>' + s.category + '</option>';
  });

  var contentBox = document.getElementById('navExtModalContent');
  contentBox.innerHTML =
    '<h3>' + (isEdit ? '编辑网址' : '添加网址') + '</h3>' +
    '<label>网址 *</label>' +
    '<input type="text" id="navUrl" value="' + (editLink ? editLink.url : '') + '">' +
    '<label>标题</label>' +
    '<input type="text" id="navTitle" value="' + (editLink ? editLink.title : '') + '">' +
    '<label>描述</label>' +
    '<input type="text" id="navDesc" value="' + (editLink ? editLink.desc : '') + '">' +
    '<label>图标 URL</label>' +
    '<input type="text" id="navIcon" value="' + (editLink ? editLink.icon : '') + '">' +
    '<label>分类</label>' +
    '<select id="navCat">' + options + '</select>' +
    '<div class="btn-row">' +
      '<button type="button" class="btn btn-cancel" id="navCancel">取消</button>' +
      '<button type="button" class="btn btn-primary" onclick="window._navSaveLink();">保存</button>' +
    '</div>';

  document.getElementById('navCancel').onclick = function () {
    document.getElementById('navExtModal').style.display = 'none';
  };
  document.getElementById('navExtModal').style.display = 'flex';
  document.getElementById('navUrl').focus();
};

  // 全局保存网址（保存成功后直接刷新页面显示结果）
 window._navSaveLink = function () {
  try {
    var url = document.getElementById('navUrl').value.trim();
    if (!url) { document.getElementById('navUrl').focus(); return; }

    var fullUrl = url.startsWith('http') ? url : 'https://' + url;
    var domain = '';
    try { domain = new URL(fullUrl).hostname; } catch (e) { domain = ''; }
    if (!domain) { alert('网址格式不正确'); return; }

    var title = document.getElementById('navTitle').value.trim() || domain.replace(/^www\./, '');
    var desc = document.getElementById('navDesc').value.trim() || '';
    var icon = document.getElementById('navIcon').value.trim();
    if (!icon) icon = 'https://icons.duckduckgo.com/ip3/' + domain + '.ico';
    var newCat = document.getElementById('navCat').value;

    var state = window._navEditState || {};
    var oldCat = state.cat;
    var oldIndex = state.index;
    var saved = { title: title, url: fullUrl, desc: desc, icon: icon };

    if (oldIndex !== null && oldCat) {
      var oldGroup = navData.find(function (g) { return g.category === oldCat; });
      if (oldGroup) {
        if (oldCat === newCat) {
          oldGroup.links[oldIndex] = saved;
        } else {
          oldGroup.links.splice(oldIndex, 1);
          var target = navData.find(function (g) { return g.category === newCat; });
          if (target) target.links.push(saved);
          else navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [saved] });
        }
      }
    } else {
      var target2 = navData.find(function (g) { return g.category === newCat; });
      if (target2) target2.links.push(saved);
      else navData.push({ category: newCat, icon: DEFAULT_GROUP_ICON, links: [saved] });
    }

    // 写入本地存储
    localStorage.setItem('navStoreV2', JSON.stringify(navData));

    // 关键：保存后不刷新页面，而是设置当前视图为保存的分组并重新渲染
    currentView = newCat;

    if (typeof renderSidebar === 'function') renderSidebar(navData);
    if (typeof renderContentForCurrent === 'function') {
      renderContentForCurrent();
    } else {
      var data = navData.filter(function (g) { return g.category === newCat; });
      renderContent(data);
    }

    // 高亮侧边栏当前分组
    if (typeof navList !== 'undefined' && navList) {
      navList.querySelectorAll('.nav-item').forEach(function (item) {
        if (item.dataset.cat === newCat) item.classList.add('active');
        else item.classList.remove('active');
      });
    }

    // 关闭弹窗
document.getElementById('navExtModal').style.display = 'none';
alert('已保存到本机。要让别人看到，请点“导出数据JSON”并将 nav.json 上传到仓库。');
  } catch (e) {
    alert('保存出错：' + e.message);
  }
};

  // 点击“添加网址”卡片时统一走这个全局函数
  document.addEventListener('click', function (e) {
    var card = e.target.closest ? e.target.closest('.add-card') : null;
    if (card) {
      e.preventDefault();
      e.stopPropagation();
      window.openLinkModal(card.getAttribute('data-cat'), null);
    }
  });
})();
// ===== 修复：补全刷新函数（不重复声明 currentView） =====
function renderContentForCurrent() {
  var data;
  if (typeof currentView !== 'undefined' && currentView) {
    var group = navData.find(function (s) { return s.category === currentView; });
    if (group) data = [group];
  }
  if (!data) {
    data = navData.filter(function (s) { return (s.links || []).length > 0; });
  }
  renderContent(data);
}

})();