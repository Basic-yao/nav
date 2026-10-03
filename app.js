// 统一立体云标签 SVG
const cloudTagIcon = `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#ff9900" d="M19 13a4 4 0 0 0-3.5-3.97 5 5 0 0 0-9.66 1.72A4 4 0 0 0 5 14a4 4 0 0 0 4 4h10a4 4 0 0 0 0-5z"/><path fill="#ffcc66" d="M12 6a5 5 0 0 0-4.9 3.67 4 4 0 0 0-1.1 7.33h10.5a4 4 0 0 0-4.5-11z"/></svg>`;
const catIcon = cloudTagIcon;

// 搜索源配置（真实搜索接口）
const searchEngines = {
  '常用': { url: 'https://www.baidu.com/s?wd=', label: '百度一下' },
  '百度': { url: 'https://www.baidu.com/s?wd=', label: '百度一下' },
  'Google': { url: 'https://www.google.com/search?q=', label: 'Google Search' },
  'Bing': { url: 'https://www.bing.com/search?q=', label: 'Bing 搜索' },
  '知乎': { url: 'https://www.zhihu.com/search?q=', label: '知乎搜索' },
  '微信': { url: 'https://weixin.sogou.com/weixin?type=2&query=', label: '微信搜索' },
  '微博': { url: 'https://s.weibo.com/weibo/', label: '微博搜索' },
  '豆瓣': { url: 'https://www.douban.com/search?q=', label: '豆瓣搜索' },
  '搜外问答': { url: 'https://www.sowhy.com/search/', label: '搜外搜索' }
};
let currentEngine = '百度';

// 导航数据（含二级菜单）
const navData = [
  { category: "常用推荐", icon: catIcon, links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台。", url: "https://dribbble.com/", icon: cloudTagIcon },
    { title: "Behance", desc: "Adobe旗下设计师交流平台。", url: "https://www.behance.net/", icon: cloudTagIcon },
    { title: "站酷", desc: "中国人气设计师互动平台。", url: "https://www.zcool.com.cn/", icon: cloudTagIcon },
    { title: "Pinterest", desc: "全球美图收藏采集站。", url: "https://www.pinterest.com/", icon: cloudTagIcon },
    { title: "Medium", desc: "高质量设计文章。", url: "https://medium.com/", icon: cloudTagIcon },
    { title: "Youtube", desc: "全球最大学习分享平台。", url: "https://www.youtube.com/", icon: cloudTagIcon }
  ]},
  { category: "社区咨询", icon: catIcon, links: [{title:"知乎", desc:"中文互联网高质量问答", url:"https://www.zhihu.com/", icon:cloudTagIcon}]},
  { category: "灵感采集", icon: catIcon, children: [
    { label: "发现产品", links: [{title:"Product Hunt", desc:"发现新产品", url:"https://www.producthunt.com/", icon:cloudTagIcon}] },
    { label: "界面灵感", links: [{title:"Dribbble", desc:"UI灵感", url:"https://dribbble.com/", icon:cloudTagIcon}] },
    { label: "网页灵感", links: [{title:"Awwwards", desc:"网页设计奖", url:"https://www.awwwards.com/", icon:cloudTagIcon}] }
  ], links: [] },
  { category: "素材资源", icon: catIcon, links: [{title:"Unsplash", desc:"免费高清图", url:"https://unsplash.com/", icon:cloudTagIcon}] },
  { category: "常用工具", icon: catIcon, links: [{title:"TinyPNG", desc:"图片压缩", url:"https://tinypng.com/", icon:cloudTagIcon}] },
  { category: "学习教程", icon: catIcon, links: [{title:"MDN", desc:"Web文档", url:"https://developer.mozilla.org/", icon:cloudTagIcon}] },
  { category: "UED团队", icon: catIcon, links: [] },
  { category: "友情链接", icon: catIcon, links: [] },
  { category: "在线编辑", icon: catIcon, links: [{title:"CodePen", desc:"前端代码演示", url:"https://codepen.io/", icon:cloudTagIcon}] },
  { category: "关于本站", icon: catIcon, links: [] }
];

// DOM
const navList = document.getElementById('navList'), container = document.getElementById('navContainer');
const topSearch = document.getElementById('topSearch'), subSearchInput = document.getElementById('subSearchInput');
const subTags = document.getElementById('subTags'), menuToggle = document.getElementById('menuToggle');

// 渲染左侧（含二级）
function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach((sec, i) => {
    const hasChild = sec.children && sec.children.length;
    navList.innerHTML += `<div class="nav-item" data-index="${i}" data-haschild="${hasChild?1:0}">
      <span><span>${sec.icon}</span> ${sec.category}</span>
      <span class="nav-arrow">${hasChild?'▼':'>'}</span>
      ${hasChild?`<div class="sub-menu" id="sub-${i}">${sec.children.map((c,j)=>`<div class="sub-item" data-pidx="${i}" data-cidx="${j}">${c.label}</div>`).join('')}</div>`:''}
    </div>`;
  });
  
  navList.querySelectorAll('.nav-item').forEach(el => {
    el.onclick = (e) => {
      if(e.target.classList.contains('sub-item')) return;
      e.stopPropagation();
      const idx = el.dataset.index, has = el.dataset.haschild==='1';
      navList.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
      el.classList.add('active');
      if(has) {
        const sub=document.getElementById(`sub-${idx}`), arrow=el.querySelector('.nav-arrow');
        const isOpen=sub.classList.contains('open');
        navList.querySelectorAll('.sub-menu.open').forEach(s=>s.classList.remove('open'));
        navList.querySelectorAll('.nav-arrow.open').forEach(a=>a.classList.remove('open'));
        if(!isOpen){sub.classList.add('open');arrow.classList.add('open');}
        const sec=data[idx];
        if(sec.children[0]) renderContent([{category:sec.children[0].label, links:sec.children[0].links, icon:catIcon}]);
      } else renderContent([{...data[idx], icon:catIcon}]);
    };
  });
  navList.querySelectorAll('.sub-item').forEach(el=>{
    el.onclick=(e)=>{
      e.stopPropagation();
      navList.querySelectorAll('.sub-item').forEach(s=>s.classList.remove('active'));
      el.classList.add('active');
      const ch=data[el.dataset.pidx].children[el.dataset.cidx];
      renderContent([{category:ch.label, links:ch.links, icon:catIcon}]);
    };
  });
}

// 渲染右侧
function renderContent(data) {
  container.innerHTML='';
  data.forEach(sec=>{
    container.innerHTML+=`<h2 class="section-title"><span>${sec.icon}</span> ${sec.category}</h2>
      <div class="grid">${sec.links.map(l=>`<a href="${l.url}" target="_blank" class="card">
        <div class="card-icon">${l.icon||''}</div><div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div>
      </a>`).join('')}</div>`;
  });
}

// 次级搜索标签渲染与切换
const defaultTags = ['常用','百度','Google','Bing'];
const zhihuTags = ['知乎','微信','微博','豆瓣','搜外问答'];
function renderSubTags(area='default') {
  subTags.innerHTML = (area==='zhihu'?zhihuTags:defaultTags).map(t=>`<span class="sub-tag ${t===currentEngine?'active':''}" data-engine="${t}">${t}</span>`).join('');
  subTags.querySelectorAll('.sub-tag').forEach(t=>{
    t.onclick=()=>{
      currentEngine=t.dataset.engine;
      subSearchInput.placeholder=searchEngines[currentEngine].label;
      renderSubTags(area);
    };
  });
}
// 根据左侧选中动态切换标签组
function updateSubArea(category) {
  if(category.includes('社区')) renderSubTags('zhihu');
  else renderSubTags('default');
}

// 搜索执行
function doSearch(keyword, engine=currentEngine) {
  if(!keyword) return;
  const url = searchEngines[engine].url + encodeURIComponent(keyword);
  window.open(url, '_blank');
}
document.getElementById('subSearchBtn').onclick=()=>doSearch(subSearchInput.value);
subSearchInput.onkeydown=e=>{if(e.key==='Enter')doSearch(subSearchInput.value);};
document.getElementById('searchBtn').onclick=()=>doSearch(topSearch.value);
topSearch.onkeydown=e=>{if(e.key==='Enter')doSearch(topSearch.value);};

// 顶部搜索（全站过滤）
topSearch.addEventListener('input', e => {
  const k=e.target.value.toLowerCase().trim();
  if(!k){renderContent([navData[0]]);return;}
  const filtered=navData.map(s=>{
    let links=s.links.filter(l=>l.title.toLowerCase().includes(k)||l.desc.includes(k));
    if(s.children)s.children.forEach(c=>c.links.forEach(l=>{if(l.title.toLowerCase().includes(k)||l.desc.includes(k))links.push(l);}));
    return{...s,links};
  }).filter(s=>s.links.length);
  renderContent(filtered);
});

// 主题
const themeBtn=document.getElementById('toggle-theme'), html=document.documentElement;
function syncTheme(){const t=html.getAttribute('data-theme');themeBtn.querySelector('.theme-icon').textContent=t==='dark'?'☀️':'🌙';themeBtn.querySelector('.theme-text').textContent=t==='dark'?'浅色模式':'深色模式';}
themeBtn.onclick=()=>{const cur=html.getAttribute('data-theme')==='dark'?'light':'dark';html.setAttribute('data-theme',cur);localStorage.setItem('theme',cur);syncTheme();};
html.setAttribute('data-theme',localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
syncTheme();

// 初始化
renderSidebar(navData);
renderContent([navData[0]]);
navList.querySelector('.nav-item')?.classList.add('active');
renderSubTags('default');
subSearchInput.placeholder=searchEngines[currentEngine].label;
menuToggle.onclick=()=>navList.classList.toggle('show');