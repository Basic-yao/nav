// ============================================================
// ★ 逻辑层：navData 已在 data.js 中定义
// 二级菜单结构：父项带箭头，子项缩进嵌套在父项下方（参考图样式）
// ============================================================

const navIcons = {};
navData.forEach(d => navIcons[d.category] = d.icon);

const searchEngines = {
  'Bing': { url: 'https://cn.bing.com/search?q=', label: 'Bing 搜索' },
  '百度': { url: 'https://www.baidu.com/s?wd=', label: '百度一下' },
  'Google': { url: 'https://www.google.com/search?q=', label: 'Google 搜索' }
};
let currentEngine = 'Bing';

const html = document.documentElement;
const logo = document.getElementById('logo');
const navList = document.getElementById('navList');
const content = document.getElementById('content');
const themeBtn = document.getElementById('themeBtn');
const searchTags = document.getElementById('searchTags');
const subSearchInput = document.getElementById('subSearchInput');
const subSearchBtn = document.getElementById('subSearchBtn');

// ===== 侧边栏渲染 =====
function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach((item) => {
    const hasChild = item.children && item.children.length > 0;
    const div = document.createElement('div');
    div.className = 'nav-item' + (hasChild ? ' has-child' : '');

    // 父项：图标 + 文字 + 箭头
    const parent = document.createElement('div');
    parent.className = 'nav-parent';
    parent.innerHTML = `<span class="nav-icon">${navIcons[item.category] || item.icon}</span><span class="nav-title">${item.category}</span><span class="nav-arrow">${hasChild ? '▼' : ''}</span>`;

    // 子项容器（嵌套在父项下方）
    let sub = null;
    if (hasChild) {
      sub = document.createElement('div');
      sub.className = 'sub-menu';
      item.children.forEach((ch) => {
        const subItem = document.createElement('div');
        subItem.className = 'sub-item';
        subItem.innerHTML = `<span class="sub-dot">·</span><span class="sub-label">${ch.label}</span>`;
        subItem.onclick = (e) => {
          e.stopPropagation();
          navList.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
          subItem.classList.add('active');
          renderContent([{ category: ch.label, links: ch.links }]);
        };
        sub.appendChild(subItem);
      });
    }

    div.appendChild(parent);
    if (sub) div.appendChild(sub);

    // 点击父项：整块展开/收起（手风琴）
    parent.onclick = () => {
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      div.classList.add('active');

      if (hasChild) {
        const isOpen = sub.classList.contains('open');
        // 收起其它已展开的
        navList.querySelectorAll('.sub-menu.open').forEach(s => {
          if (s !== sub) s.classList.remove('open');
        });
        navList.querySelectorAll('.nav-item.has-child.open').forEach(n => {
          if (n !== div) n.classList.remove('open');
        });
        sub.classList.toggle('open', !isOpen);
        div.classList.toggle('open', !isOpen);
        // 展开时默认渲染第一个子分类
        if (!isOpen && item.children[0]) {
          renderContent([{ category: item.children[0].label, links: item.children[0].links }]);
        }
      } else {
        renderContent([item]);
      }
    };

    navList.appendChild(div);
  });
}

// ===== 内容渲染 =====
function renderContent(data) {
  content.innerHTML = '';
  data.forEach(sec => {
    const titleIcon = navIcons[sec.category] || '';
    let allLinks = [...(sec.links || [])];
    if (sec.children) sec.children.forEach(ch => { if (ch.links) allLinks = allLinks.concat(ch.links); });
    if (allLinks.length === 0) return;
    content.innerHTML += `<h2 class="section-title"><span class="nav-icon">${titleIcon}</span>${sec.category}</h2><div class="grid">${allLinks.map(l => `<a href="${l.url}" target="_blank" class="card"><div class="card-icon"><img src="${l.icon}" alt="" onerror="this.style.display='none'"></div><div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div></a>`).join('')}</div>`;
  });
}

logo.onclick = () => {
  navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
  navList.querySelectorAll('.nav-item.has-child.open').forEach(n => n.classList.remove('open'));
  renderContent(navData.filter(s => s.links?.length > 0 || s.children?.some(c => c.links?.length > 0)));
};

// ===== 搜索 =====
function renderSearchTags() {
  const tags = ['Bing', '百度', 'Google'];
  searchTags.innerHTML = tags.map((t, i) => {
    if (i === 0) return `<span class="tag ${t === currentEngine ? 'active' : ''}" data-engine="${t}">${t}</span><span class="arrow">></span>`;
    return `<span class="tag ${t === currentEngine ? 'active' : ''}" data-engine="${t}">${t}</span>`;
  }).join('');
  searchTags.querySelectorAll('.tag').forEach(t => {
    t.onclick = () => { currentEngine = t.dataset.engine; subSearchInput.placeholder = searchEngines[currentEngine].label; renderSearchTags(); };
  });
}
function doSearch(kw) { if (!kw) return; window.open(searchEngines[currentEngine].url + encodeURIComponent(kw), '_blank'); }
subSearchBtn.onclick = () => doSearch(subSearchInput.value);
subSearchInput.onkeydown = e => { if (e.key === 'Enter') doSearch(subSearchInput.value); };

// ===== 深浅模式：系统跟随 + 手动切换互不打架 =====
const mql = window.matchMedia('(prefers-color-scheme: dark)');
let userOverride = null; // null = 跟系统，'dark'/'light' = 手动

// 黑白单色 SVG 图标（无 fill，用 currentColor 跟随文字色）
const iconMoon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
const iconSun  = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  themeBtn.querySelector('.theme-icon').innerHTML = t === 'dark' ? iconSun : iconMoon;
  themeBtn.querySelector('.theme-text').textContent = t === 'dark' ? '浅色模式' : '深色模式';
}
function resolveTheme() { return userOverride || (mql.matches ? 'dark' : 'light'); }
function refresh() { applyTheme(resolveTheme()); }

refresh();
mql.addEventListener('change', () => { if (!userOverride) refresh(); });
themeBtn.onclick = () => {
  const cur = resolveTheme();
  userOverride = !userOverride ? (cur === 'dark' ? 'light' : 'dark') : null;
  refresh();
};

// ===== 初始化 =====
renderSidebar(navData);
renderContent([navData[0]]);
navList.querySelector('.nav-item')?.classList.add('active');
renderSearchTags();
