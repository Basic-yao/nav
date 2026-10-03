// ===== 原生线条图标（左侧 + 标题）=====
const navIcons = {
  '常用推荐': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  '社区咨询': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  '灵感采集': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 00-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0012 2z"></path></svg>',
  '素材资源': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-2.72l-3.56-7.28A2 2 0 0015.28 9H14z"></path><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"></path></svg>',
  '常用工具': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>',
  '学习教程': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path></svg>',
  'UED团队': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>',
  '友情链接': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path></svg>',
  '在线编辑': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
  '关于本站': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path></svg>',
  '默认': '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>'
};

// ===== 搜索引擎（顺序：Bing > 百度 > Google）=====
const searchEngines = {
  'Bing':   { label: '微软Bing搜索',   url: 'https://cn.bing.com/search?q=' },
  '百度':   { label: '百度一下',       url: 'https://www.baidu.com/s?wd=' },
  'Google': { label: 'Google搜索',     url: 'https://www.google.com/search?q=' }
};
let currentEngine = 'Bing';

// ===== 导航数据（真实 favicon）=====
const navData = [
  { category: "常用推荐", links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台", url: "https://dribbble.com", icon: "https://api.faviconkit.com/dribbble.com/32" },
    { title: "Behance", desc: "Adobe旗下设计师交流平台", url: "https://behance.net", icon: "https://api.faviconkit.com/behance.net/32" },
    { title: "UI中国", desc: "图形交互与界面设计交流", url: "https://ui.cn", icon: "https://api.faviconkit.com/ui.cn/32" },
    { title: "站酷", desc: "中国人气设计师互动平台", url: "https://zcool.com.cn", icon: "https://api.faviconkit.com/zcool.com.cn/32" },
    { title: "Pinterest", desc: "全球美图收藏聚集站", url: "https://pinterest.com", icon: "https://api.faviconkit.com/pinterest.com/32" },
    { title: "Medium", desc: "高质量设计文章", url: "https://medium.com", icon: "https://api.faviconkit.com/medium.com/32" },
    { title: "Youtube", desc: "全球最大的学习分享平台", url: "https://youtube.com", icon: "https://api.faviconkit.com/youtube.com/32" },
    { title: "Google", desc: "全球最大的UI学习分享平台", url: "https://google.com", icon: "https://api.faviconkit.com/google.com/32" }
  ]},
  { category: "社区咨询", links: [
    { title: "雷锋网", desc: "人工智能和智能硬件领域的互联网科技媒体", url: "https://leiphone.com", icon: "https://api.faviconkit.com/leiphone.com/32" },
    { title: "36kr", desc: "创业资讯、科技新闻", url: "https://36kr.com", icon: "https://api.faviconkit.com/36kr.com/32" },
    { title: "人人都是产品经理", desc: "产品经理学习交流平台", url: "https://woshipm.com", icon: "https://api.faviconkit.com/woshipm.com/32" },
    { title: "掘金", desc: "面向程序员的技术社区", url: "https://juejin.cn", icon: "https://api.faviconkit.com/juejin.cn/32" }
  ]},
  { category: "灵感采集", children: [
    { label: "发现产品", links: [{ title: "Producthunt", desc: "发现新鲜有趣的产品", url: "https://producthunt.com", icon: "https://api.faviconkit.com/producthunt.com/32" }] },
    { label: "界面灵感", links: [{ title: "Figma", desc: "在线协作设计工具", url: "https://figma.com", icon: "https://api.faviconkit.com/figma.com/32" }] },
    { label: "网页灵感", links: [{ title: "Awwwards", desc: "网页设计奖项", url: "https://awwwards.com", icon: "https://api.faviconkit.com/awwwards.com/32" }] }
  ], links: [] },
  { category: "素材资源", links: [
    { title: "Iconfont", desc: "阿里巴巴矢量图标库", url: "https://iconfont.cn", icon: "https://api.faviconkit.com/iconfont.cn/32" },
    { title: "Unsplash", desc: "免费高清图片", url: "https://unsplash.com", icon: "https://api.faviconkit.com/unsplash.com/32" }
  ]},
  { category: "常用工具", links: [
    { title: "TinyPNG", desc: "图片压缩神器", url: "https://tinypng.com", icon: "https://api.faviconkit.com/tinypng.com/32" },
    { title: "Remove.bg", desc: "一键去背景", url: "https://remove.bg", icon: "https://api.faviconkit.com/remove.bg/32" },
    { title: "Carbon", desc: "代码截图美化", url: "https://carbon.now.sh", icon: "https://api.faviconkit.com/carbon.now.sh/32" },
    { title: "Stack Overflow", desc: "程序员问答社区", url: "https://stackoverflow.com", icon: "https://api.faviconkit.com/stackoverflow.com/32" },
    { title: "MDN Web Docs", desc: "Web技术文档", url: "https://developer.mozilla.org", icon: "https://api.faviconkit.com/developer.mozilla.org/32" },
    { title: "Can I Use", desc: "前端兼容性查询", url: "https://caniuse.com", icon: "https://api.faviconkit.com/caniuse.com/32" }
  ]},
  { category: "学习教程", links: [
    { title: "Bilibili", desc: "学习资源丰富的视频站", url: "https://bilibili.com", icon: "https://api.faviconkit.com/bilibili.com/32" }
  ]},
  { category: "UED团队", links: [] },
  { category: "友情链接", links: [] },
  { category: "在线编辑", links: [] },
  { category: "关于本站", links: [] }
];

// ===== DOM =====
const navList = document.getElementById('navList'), content = document.getElementById('content');
const searchTags = document.getElementById('searchTags'), subSearchInput = document.getElementById('subSearchInput'), subSearchBtn = document.getElementById('subSearchBtn');
const themeBtn = document.getElementById('toggle-theme'), html = document.documentElement;

// ===== 渲染左侧栏 =====
function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach((sec, idx) => {
    const icon = navIcons[sec.category] || navIcons['默认'];
    const hasChild = sec.children && sec.children.length > 0;
    const arrow = hasChild ? '<span class="nav-arrow">▼</span>' : '';
    let html = `<div class="nav-item" data-index="${idx}"><span class="nav-icon">${icon}</span><span>${sec.category}</span>${arrow}</div>`;
    if (hasChild) {
      html += `<div class="sub-menu" id="sub-${idx}">${sec.children.map((ch,cidx)=>`<div class="sub-item" data-pidx="${idx}" data-cidx="${cidx}">${ch.label}</div>`).join('')}</div>`;
    }
    navList.innerHTML += html;
  });

  navList.querySelectorAll('.nav-item').forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      const idx = el.dataset.index, has = el.classList.contains('has-child');
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
      if (has) {
        const sub = document.getElementById(`sub-${idx}`), arrow = el.querySelector('.nav-arrow');
        const isOpen = sub.classList.contains('open');
        navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
        navList.querySelectorAll('.nav-arrow.open').forEach(a => a.classList.remove('open'));
        if (!isOpen) { sub.classList.add('open'); arrow.classList.add('open'); }
        if (data[idx].children[0]) renderContent([{category:data[idx].children[0].label, links:data[idx].children[0].links}]);
      } else {
        renderContent([data[idx]]);
      }
    };
  });
  navList.querySelectorAll('.sub-item').forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      navList.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      const p = el.dataset.pidx, c = el.dataset.cidx, ch = data[p].children[c];
      renderContent([{category:ch.label, links:ch.links}]);
    };
  });
}

// ===== 渲染内容 =====
function renderContent(data) {
  content.innerHTML = '';
  data.forEach(sec => {
    const titleIcon = navIcons[sec.category] || navIcons['默认'];
    content.innerHTML += `<h2 class="section-title">${titleIcon} ${sec.category}</h2><div class="grid">${(sec.links||[]).map(l=>`<a href="${l.url}" target="_blank" class="card"><div class="card-icon"><img src="${l.icon}" alt="" onerror="this.style.display='none'"></div><div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div></a>`).join('')}</div>`;
  });
}

// ===== 搜索标签（Bing > 百度 > Google，品牌色）=====
function renderSearchTags() {
  const tags = ['Bing', '百度', 'Google'];
  searchTags.innerHTML = tags.map((t, i) => {
    if (i === 0) return `<span class="tag ${t===currentEngine?'active':''}" data-engine="${t}">${t}</span><span class="arrow">></span>`;
    return `<span class="tag ${t===currentEngine?'active':''}" data-engine="${t}">${t}</span>`;
  }).join('');
  searchTags.querySelectorAll('.tag').forEach(t => {
    t.onclick = () => { currentEngine = t.dataset.engine; subSearchInput.placeholder = searchEngines[currentEngine].label; renderSearchTags(); };
  });
  subSearchInput.placeholder = searchEngines[currentEngine].label;
}

// ===== 搜索执行 =====
function doSearch(kw, engine = currentEngine) {
  if (!kw) return;
  window.open(searchEngines[engine].url + encodeURIComponent(kw), '_blank');
}
subSearchBtn.onclick = () => doSearch(subSearchInput.value);
subSearchInput.onkeydown = e => { if (e.key === 'Enter') doSearch(subSearchInput.value); };

// ===== 主题切换 =====
function syncTheme() {
  const t = html.getAttribute('data-theme');
  themeBtn.querySelector('.theme-icon').textContent = t === 'dark' ? '☀️' : '🌙';
  themeBtn.querySelector('.theme-text').textContent = t === 'dark' ? '浅色模式' : '深色模式';
}
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', cur);
  localStorage.setItem('theme', cur);
  syncTheme();
};
html.setAttribute('data-theme', localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
syncTheme();

// ===== 初始化 =====
renderSidebar(navData);
renderContent([navData[0]]);
navList.querySelector('.nav-item')?.classList.add('active');
renderSearchTags();