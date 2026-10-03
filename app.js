// 蓝色线条云标签 SVG (全站统一)
const cloudIcon = `<svg viewBox="0 0 24 24"><path d="M7 16a4 4 0 0 1-.88-7.9A5 5 0 0 1 15.9 8.5 4 4 0 0 1 17 16H7z"/></svg>`;

const searchEngines = {
  '常用': { url: 'https://www.baidu.com/s?wd=', label: '搜索常用' },
  '百度': { url: 'https://www.baidu.com/s?wd=', label: '百度一下' },
  'Google': { url: 'https://www.google.com/search?q=', label: 'Google Search' },
  'Bing': { url: 'https://www.bing.com/search?q=', label: 'Bing 搜索' },
  '知乎': { url: 'https://www.zhihu.com/search?q=', label: '知乎搜索' },
  '微信': { url: 'https://weixin.sogou.com/weixin?type=2&query=', label: '微信搜索' },
  '微博': { url: 'https://s.weibo.com/weibo/', label: '微博搜索' },
  '豆瓣': { url: 'https://www.douban.com/search?q=', label: '豆瓣搜索' },
  '搜外问答': { url: 'https://www.so.com/s?q=', label: '搜外搜索' }
};

const navData = [
  { category: "常用推荐", icon: cloudIcon, links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台。", url: "https://dribbble.com/", icon: cloudIcon },
    { title: "Behance", desc: "Adobe旗下设计师交流平台。", url: "https://www.behance.net/", icon: cloudIcon },
    { title: "站酷", desc: "中国人气设计师互动平台。", url: "https://www.zcool.com.cn/", icon: cloudIcon },
    { title: "Pinterest", desc: "全球美图收藏采集站。", url: "https://www.pinterest.com/", icon: cloudIcon },
    { title: "Medium", desc: "高质量设计文章。", url: "https://medium.com/", icon: cloudIcon },
    { title: "Youtube", desc: "全球最大学习分享平台。", url: "https://www.youtube.com/", icon: cloudIcon }
  ]},
  { category: "社区咨询", icon: cloudIcon, links: [
    { title: "知乎", desc: "中文互联网高质量问答社区。", url: "https://www.zhihu.com/", icon: cloudIcon },
    { title: "微信", desc: "移动端社交与资讯。", url: "https://weixin.qq.com/", icon: cloudIcon },
    { title: "微博", desc: "社交媒体与热点。", url: "https://weibo.com/", icon: cloudIcon }
  ]},
  { category: "灵感采集", icon: cloudIcon, children: [
    { label: "发现产品", links: [{ title: "Product Hunt", desc: "发现新产品", url: "https://www.producthunt.com/", icon: cloudIcon }] },
    { label: "界面灵感", links: [{ title: "Figma", desc: "在线协作设计工具", url: "https://www.figma.com/", icon: cloudIcon }] },
    { label: "网页灵感", links: [{ title: "Awwwards", desc: "网页设计奖项", url: "https://www.awwwards.com/", icon: cloudIcon }] }
  ], links: [] },
  { category: "素材资源", icon: cloudIcon, links: [
    { title: "TinyPNG", desc: "图片压缩神器。", url: "https://tinypng.com/", icon: cloudIcon },
    { title: "Remove.bg", desc: "一键去背景。", url: "https://www.remove.bg/", icon: cloudIcon }
  ]},
  { category: "常用工具", icon: cloudIcon, links: [
    { title: "Carbon", desc: "代码截图美化。", url: "https://carbon.now.sh/", icon: cloudIcon },
    { title: "在线文件传输", desc: "无需注册的大文件传输。", url: "https://example.com/", icon: cloudIcon },
    { title: "Stack Overflow", desc: "程序员问答社区。", url: "https://stackoverflow.com/", icon: cloudIcon },
    { title: "MDN Web Docs", desc: "Web技术文档。", url: "https://developer.mozilla.org/", icon: cloudIcon },
    { title: "Can I Use", desc: "前端兼容性查询。", url: "https://caniuse.com/", icon: cloudIcon }
  ]},
  { category: "学习教程", icon: cloudIcon, links: [] },
  { category: "UED团队", icon: cloudIcon, links: [] },
  { category: "友情链接", icon: cloudIcon, links: [] },
  { category: "在线编辑", icon: cloudIcon, links: [] },
  { category: "关于本站", icon: cloudIcon, links: [] }
];

let currentEngine = '百度';
const navList = document.getElementById('navList'), container = document.getElementById('container');
const topSearch = document.getElementById('topSearch'), searchBtn = document.getElementById('searchBtn');
const subTags = document.getElementById('subTags'), subSearchInput = document.getElementById('subSearchInput'), subSearchBtn = document.getElementById('subSearchBtn');
const themeBtn = document.getElementById('toggle-theme'), html = document.documentElement;

// 渲染左侧
function renderSidebar(data) {
  navList.innerHTML = `<div class="brand">${cloudIcon} 网址导航</div>`;
  data.forEach((sec, idx) => {
    const hasChild = sec.children && sec.children.length;
    navList.innerHTML += `<div class="nav-item" data-index="${idx}" data-haschild="${hasChild?1:0}">
      <div class="nav-item-left">${sec.icon||cloudIcon} <span>${sec.category}</span></div>
      <span class="nav-arrow">${hasChild?'▼':'>'}</span>
    </div>`;
    if(hasChild) {
      navList.innerHTML += `<div class="sub-menu" id="sub-${idx}">
        ${sec.children.map((ch,cidx)=>`<div class="sub-item" data-pidx="${idx}" data-cidx="${cidx}">${ch.label}</div>`).join('')}
      </div>`;
    }
  });

  navList.querySelectorAll('.nav-item').forEach(el => {
    el.onclick = (e) => {
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
        if(sec.children[0]) renderContent([{category:sec.children[0].label, links:sec.children[0].links, icon:cloudIcon}]);
      } else {
        renderContent([{...data[idx], icon:cloudIcon}]);
      }
      // 切换次级标签
      if(sec.category.includes('社区')) renderSubTags('zhihu'); else renderSubTags('default');
    };
  });
  navList.querySelectorAll('.sub-item').forEach(el=>{
    el.onclick=(e)=>{
      e.stopPropagation();
      navList.querySelectorAll('.sub-item').forEach(s=>s.classList.remove('active'));
      el.classList.add('active');
      const p=el.dataset.pidx,c=el.dataset.cidx,ch=data[p].children[c];
      renderContent([{category:ch.label,links:ch.links,icon:cloudIcon}]);
    };
  });
}

// 渲染内容
function renderContent(data) {
  container.innerHTML='';
  data.forEach(sec=>{
    container.innerHTML+=`<h2 class="section-title">${sec.icon||cloudIcon} ${sec.category}</h2><div class="grid">${sec.links.map(l=>`<a href="${l.url}" target="_blank" class="card"><div class="card-icon">${l.icon||cloudIcon}</div><div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div></a>`).join('')}</div>`;
  });
}

// 次级标签
function renderSubTags(area) {
  const tags=area==='zhihu'?['知乎','微信','微博','豆瓣','搜外问答']:['常用','百度','Google','Bing'];
  subTags.innerHTML=tags.map(t=>`<span class="sub-tag ${t===currentEngine?'active':''}" data-engine="${t}">${t}</span>`).join('');
  subTags.querySelectorAll('.sub-tag').forEach(t=>{
    t.onclick=()=>{currentEngine=t.dataset.engine;subSearchInput.placeholder=searchEngines[currentEngine].label;renderSubTags(area);};
  });
  subSearchInput.placeholder=searchEngines[currentEngine].label;
}

// 搜索
function doSearch(kw,engine=currentEngine){if(!kw)return;window.open(searchEngines[engine].url+encodeURIComponent(kw),'_blank');}
subSearchBtn.onclick=()=>doSearch(subSearchInput.value);
subSearchInput.onkeydown=e=>{if(e.key==='Enter')doSearch(subSearchInput.value);};
searchBtn.onclick=()=>doSearch(topSearch.value);
topSearch.onkeydown=e=>{if(e.key==='Enter')doSearch(topSearch.value);};

topSearch.addEventListener('input',e=>{
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
function syncTheme(){const t=html.getAttribute('data-theme');themeBtn.querySelector('.theme-icon').textContent=t==='dark'?'☀️':'🌙';themeBtn.querySelector('.theme-text').textContent=t==='dark'?'浅色模式':'深色模式';}
themeBtn.onclick=()=>{const cur=html.getAttribute('data-theme')==='dark'?'light':'dark';html.setAttribute('data-theme',cur);localStorage.setItem('theme',cur);syncTheme();};
html.setAttribute('data-theme',localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
syncTheme();

// 初始化
renderSidebar(navData);
renderContent([navData[0]]);
navList.querySelector('.nav-item')?.classList.add('active');
renderSubTags('default');