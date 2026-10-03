// ============================================================
// ★ 你只需要改这里：添加/删除网站链接
// ============================================================
const navData = [
  {
    category: '常用推荐',
    links: [
      { title: 'Bing', url: 'https://cn.bing.com', desc: '微软搜索', icon: 'https://api.faviconkit.com/cn.bing.com/64' },
      { title: '百度', url: 'https://www.baidu.com', desc: '百度一下', icon: 'https://api.faviconkit.com/www.baidu.com/64' },
      { title: 'Google', url: 'https://www.google.com', desc: 'Google搜索', icon: 'https://api.faviconkit.com/www.google.com/64' },
      { title: 'Dribbble', url: 'https://dribbble.com', desc: 'UI设计灵感', icon: 'https://api.faviconkit.com/dribbble.com/64' },
      { title: '站酷', url: 'https://zcool.com.cn', desc: '设计师社区', icon: 'https://api.faviconkit.com/zcool.com.cn/64' },
    ]
  },
  {
    category: '灵感采集',
    children: [
      { label: '发现产品', links: [{ title: 'Product Hunt', url: 'https://producthunt.com', desc: '发现新产品', icon: 'https://api.faviconkit.com/producthunt.com/64' }] },
      { label: '界面灵感', links: [{ title: 'Figma', url: 'https://figma.com', desc: '设计工具', icon: 'https://api.faviconkit.com/figma.com/64' }] },
      { label: '网页灵感', links: [{ title: 'Awwwards', url: 'https://awwwards.com', desc: '网页设计奖项', icon: 'https://api.faviconkit.com/awwwards.com/64' }] },
    ],
    links: []
  },
  {
    category: '开发工具',
    links: [
      { title: 'GitHub', url: 'https://github.com', desc: '代码托管', icon: 'https://api.faviconkit.com/github.com/64' },
      { title: 'MDN', url: 'https://developer.mozilla.org', desc: 'Web文档', icon: 'https://api.faviconkit.com/developer.mozilla.org/64' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com', desc: '问答社区', icon: 'https://api.faviconkit.com/stackoverflow.com/64' },
    ]
  },
  {
    category: '社区资讯',
    links: [
      { title: '36kr', url: 'https://36kr.com', desc: '创业资讯', icon: 'https://api.faviconkit.com/36kr.com/64' },
      { title: '掘金', url: 'https://juejin.cn', desc: '技术社区', icon: 'https://api.faviconkit.com/juejin.cn/64' },
    ]
  },
];
// ============================================================

const navIcons = {
  '常用推荐': '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  '灵感采集': '<svg viewBox="0 0 24 24"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 00-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0012 2z"></path></svg>',
  '开发工具': '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
  '社区资讯': '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  '默认': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>'
};

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

function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach((item, pidx) => {
    const hasChild = item.children && item.children.length > 0;
    const div = document.createElement('div');
    div.className = 'nav-item';
    div.dataset.pidx = pidx;
    const icon = navIcons[item.category] || navIcons['默认'];
    div.innerHTML = `<span class="nav-icon">${icon}</span><span>${item.category}</span>${hasChild ? '<span class="nav-arrow">▼</span>' : ''}`;
    if (hasChild) {
      const sub = document.createElement('div');
      sub.className = 'sub-menu';
      item.children.forEach((ch, cidx) => {
        const subItem = document.createElement('div');
        subItem.className = 'sub-item';
        subItem.dataset.pidx = pidx;
        subItem.dataset.cidx = cidx;
        subItem.innerHTML = `<span>·</span><span>${ch.label}</span>`;
        subItem.onclick = (e) => {
          e.stopPropagation();
          navList.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
          subItem.classList.add('active');
          renderContent([{ category: ch.label, links: ch.links }]);
        };
        sub.appendChild(subItem);
      });
      div.appendChild(sub);
      div.onclick = () => {
        navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        div.classList.add('active');
        const arrow = div.querySelector('.nav-arrow');
        const isOpen = sub.classList.contains('open');
        navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
        navList.querySelectorAll('.nav-arrow.open').forEach(a => a.classList.remove('open'));
        if (!isOpen) { sub.classList.add('open'); arrow.classList.add('open'); }
        if (item.children[0]) renderContent([{ category: item.children[0].label, links: item.children[0].links }]);
      };
    } else {
      div.onclick = () => {
        navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        div.classList.add('active');
        renderContent([item]);
      };
    }
    navList.appendChild(div);
  });
}

function renderContent(data) {
  content.innerHTML = '';
  data.forEach(sec => {
    const titleIcon = navIcons[sec.category] || navIcons['默认'];
    let allLinks = [...(sec.links || [])];
    if (sec.children) sec.children.forEach(ch => { if (ch.links) allLinks = allLinks.concat(ch.links); });
    if (allLinks.length === 0) return;
    content.innerHTML += `<h2 class="section-title">${titleIcon} ${sec.category}</h2><div class="grid">${allLinks.map(l => `<a href="${l.url}" target="_blank" class="card"><div class="card-icon"><img src="${l.icon}" alt="" onerror="this.style.display='none'"></div><div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div></a>`).join('')}</div>`;
  });
}

logo.onclick = () => {
  navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
  navList.querySelectorAll('.nav-arrow.open').forEach(a => a.classList.remove('open'));
  renderContent(navData.filter(s => s.links?.length > 0 || s.children?.some(c => c.links?.length > 0)));
};

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

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  themeBtn.querySelector('.theme-icon').textContent = t === 'dark' ? '☀️' : '🌙';
  themeBtn.querySelector('.theme-text').textContent = t === 'dark' ? '浅色模式' : '深色模式';
}
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', cur);
  applyTheme(cur);
};
const saved = localStorage.getItem('theme');
const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (sysDark ? 'dark' : 'light'));

renderSidebar(navData);
renderContent([navData[0]]);
navList.querySelector('.nav-item')?.classList.add('active');
renderSearchTags();