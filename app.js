// ============================================================
// ★ 数据区：添加/删除网站链接只改这里
// ============================================================
const navData = [
  {
    category: '常用工具',
    icon: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    links: [
      { title: '网络剪贴板', url: 'https://netcut.cn/', desc: '在线跨屏剪切文字', icon: 'https://www.google.com/s2/favicons?domain=netcut.cn' },
      { title: '草料二维码', url: 'https://cli.im/url', desc: '在线二维码生成工具', icon: 'https://www.google.com/s2/favicons?domain=cli.im' },
      { title: '在线文件传输', url: 'https://musetransfer.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=musetransfer.com' }
    ]
  },
  {
    category: '云服务平台',
    icon: '<svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    links: [
      { title: 'Github', url: 'https://github.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=github.com' }
    ]
  },
  {
    category: '网络资源',
    icon: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    children: [
      { label: '软件', links: [{ title: '果核剥壳', url: 'https://www.ghxi.com/', desc: '互联网的净土。PC软件，手机软件，正版软件，破解软件', icon: 'https://www.google.com/s2/favicons?domain=ghxi.com' }] },
      { label: '游戏', links: [{ title: '老男人游戏网', url: 'https://www.oldmantvg.net/', desc: '仓储式主机资源站 精校 完整 极致 静待您的垂青', icon: 'https://www.google.com/s2/favicons?domain=oldmantvg.net' }] }
    ],
    links: []
  },
  {
    category: '影视影音',
    icon: '<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
    children: [
      { label: '影视', links: [{ title: '阿里小站', url: 'https://pan666.cn', desc: '阿里云盘资源共享站。人人为我，我为人人的共享资源社区', icon: 'https://www.google.com/s2/favicons?domain=pan666.cn' }] },
      { label: '字幕', links: [
        { title: '字幕库', url: 'https://zmk.pw/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=zmk.pw' },
        { title: 'SubHD', url: 'https://subhd.tv/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=subhd.tv' }
      ] },
      { label: '音乐', links: [
        { title: '果核音乐搜搜', url: 'https://music.ghxi.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=music.ghxi.com' },
        { title: '音乐磁场', url: 'https://www.hifini.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=hifini.com' }
      ] }
    ],
    links: []
  },
  {
    category: '友情链接',
    icon: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    links: [
      { title: '一为导航', url: 'https://nav.iowen.cn/', desc: 'onenav主题演示站', icon: 'https://www.google.com/s2/favicons?domain=nav.iowen.cn' },
      { title: '趣导航', url: 'https://qssily.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=qssily.com' }
    ]
  }
];
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
  data.forEach((item, pidx) => {
    const hasChild = item.children && item.children.length > 0;
    const div = document.createElement('div');
    div.className = 'nav-item';
    div.innerHTML = `<span class="nav-icon">${item.icon}</span><span>${item.category}</span>${hasChild ? '<span class="nav-arrow">▼</span>' : ''}`;

    if (hasChild) {
      const sub = document.createElement('div');
      sub.className = 'sub-menu';
      item.children.forEach((ch, cidx) => {
        const subItem = document.createElement('div');
        subItem.className = 'sub-item';
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
  navList.querySelectorAll('.nav-arrow.open').forEach(a => a.classList.remove('open'));
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

// ===== 深浅模式：始终跟随系统，手动点击仅临时翻转当前会话 =====
const mql = window.matchMedia('(prefers-color-scheme: dark)');

function applySystemTheme() {
  const t = mql.matches ? 'dark' : 'light';
  html.setAttribute('data-theme', t);
  themeBtn.querySelector('.theme-icon').innerHTML = t === 'dark'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  themeBtn.querySelector('.theme-text').textContent = t === 'dark' ? '浅色模式' : '深色模式';
}

// 初始化：只读系统
applySystemTheme();
// 实时监听系统变化
mql.addEventListener('change', applySystemTheme);
// 手动点击：临时翻转
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', cur);
  themeBtn.querySelector('.theme-icon').innerHTML = cur === 'dark'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  themeBtn.querySelector('.theme-text').textContent = cur === 'dark' ? '浅色模式' : '深色模式';
};

// ===== 初始化 =====
renderSidebar(navData);
renderContent([navData[0]]);
navList.querySelector('.nav-item')?.classList.add('active');
renderSearchTags();
