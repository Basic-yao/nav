// 真正的云标签 SVG（黄橙渐变，三层堆叠）
const cloudTagSvg = `<svg viewBox="0 0 24 24" width="100%" height="100%"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#FF8F00"/></linearGradient></defs><path d="M12 4l-8 4 8 4 8-4-8-4z" fill="url(#cg)" opacity=".9"/><path d="M4 10l8 4 8-4" fill="none" stroke="url(#cg)" stroke-width="1.5"/><path d="M4 14l8 4 8-4" fill="none" stroke="url(#cg)" stroke-width="1.5"/></svg>`;
const catIcon = `<span class="nav-icon">${cloudTagSvg}</span>`;
const cardIcon = `<span class="card-icon">${cloudTagSvg}</span>`;

// 搜索源配置
const searchEngines = {
  '常用': { label:'搜索', url:'https://www.baidu.com/s?wd=' },
  '百度': { label:'百度一下', url:'https://www.baidu.com/s?wd=' },
  'Google': { label:'Google Search', url:'https://www.google.com/search?q=' },
  'Bing': { label:'Bing 搜索', url:'https://www.bing.com/search?q=' },
  '知乎': { label:'知乎搜索', url:'https://www.zhihu.com/search?q=' },
  '微信': { label:'微信搜索', url:'https://weixin.sogou.com/weixin?query=' },
  '微博': { label:'微博搜索', url:'https://s.weibo.com/weibo/' },
  '豆瓣': { label:'豆瓣搜索', url:'https://www.douban.com/search?q=' },
  '搜外问答': { label:'搜外搜索', url:'https://www.so.com/s?q=' }
};

let currentEngine = '百度';

// 导航数据（含二级菜单）
const navData = [
  { category:"常用推荐", links:[
    {title:"Dribbble",desc:"全球UI设计师作品分享平台。",url:"https://dribbble.com/",icon:cardIcon},
    {title:"Behance",desc:"Adobe旗下设计师交流平台。",url:"https://www.behance.net/",icon:cardIcon},
    {title:"站酷",desc:"中国人气设计师互动平台。",url:"https://www.zcool.com.cn/",icon:cardIcon},
    {title:"Pinterest",desc:"全球美图收藏采集站。",url:"https://www.pinterest.com/",icon:cardIcon},
    {title:"Medium",desc:"高质量设计文章。",url:"https://medium.com/",icon:cardIcon},
    {title:"Youtube",desc:"全球最大学习分享平台。",url:"https://www.youtube.com/",icon:cardIcon}
  ]},
  { category:"社区咨询", links:[
    {title:"知乎",desc:"中文互联网高质量问答社区。",url:"https://www.zhihu.com/",icon:cardIcon},
    {title:"微信",desc:"国民级社交应用。",url:"https://weixin.qq.com/",icon:cardIcon},
    {title:"微博",desc:"热点资讯与社交平台。",url:"https://weibo.com/",icon:cardIcon},
    {title:"豆瓣",desc:"文艺青年聚集地。",url:"https://www.douban.com/",icon:cardIcon}
  ]},
  { category:"灵感采集", children:[
    { label:"发现产品", links:[
      {title:"Product Hunt",desc:"发现新产品。",url:"https://www.producthunt.com/",icon:cardIcon}
    ]},
    { label:"界面灵感", links:[
      {title:"Dribbble",desc:"UI灵感。",url:"https://dribbble.com/",icon:cardIcon}
    ]},
    { label:"网页灵感", links:[
      {title:"Awwwards",desc:"网页设计奖项。",url:"https://www.awwwards.com/",icon:cardIcon}
    ]}
  ], links:[]},
  { category:"素材资源", links:[{title:"Pinterest",desc:"素材灵感。",url:"https://www.pinterest.com/",icon:cardIcon}]},
  { category:"常用工具", links:[{title:"TinyPNG",desc:"图片压缩。",url:"https://tinypng.com/",icon:cardIcon}]},
  { category:"学习教程", links:[{title:"B站",desc:"学习平台。",url:"https://www.bilibili.com/",icon:cardIcon}]},
  { category:"UED团队", links:[{title:"Alibaba UED",desc:"阿里设计。",url:"https://ued.alibaba.com/",icon:cardIcon}]},
  { category:"友情链接", links:[{title:"GitHub",desc:"代码托管。",url:"https://github.com/",icon:cardIcon}]},
  { category:"在线编辑", links:[{title:"Figma",desc:"在线设计。",url:"https://www.figma.com/",icon:cardIcon}]},
  { category:"关于本站", links:[{title:"About",desc:"关于本导航。",url:"#",icon:cardIcon}]}
];

// DOM
const navList=document.getElementById('navList'), container=document.getElementById('navContainer');
const topSearch=document.getElementById('topSearch'), subTags=document.getElementById('subTags'), subSearchInput=document.getElementById('subSearchInput');
const subSearchBtn=document.getElementById('subSearchBtn'), searchBtn=document.getElementById('searchBtn');
const themeBtn=document.getElementById('toggle-theme'), html=document.documentElement;

// 渲染左侧
function renderSidebar(data){
  navList.innerHTML='';
  data.forEach((sec,i)=>{
    const hasChild=sec.children&&sec.children.length;
    const item=document.createElement('div');
    item.className='nav-item'; item.dataset.index=i; item.dataset.haschild=hasChild?'1':'0';
    item.innerHTML=`<span class="nav-item-left">${catIcon}<span>${sec.category}</span></span><span class="nav-arrow">${hasChild?'▼':'>'}</span>`;
    navList.appendChild(item);
    if(hasChild){
      const sub=document.createElement('div'); sub.className='sub-menu'; sub.id=`sub-${i}`;
      sec.children.forEach((ch,j)=>{
        const s=document.createElement('div'); s.className='sub-item'; s.dataset.pidx=i; s.dataset.cidx=j;
        s.innerHTML=ch.label; sub.appendChild(s);
      });
      navList.appendChild(sub);
    }
    item.onclick=(e)=>{
      e.stopPropagation();
      navList.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
      item.classList.add('active');
      if(hasChild){
        const subEl=document.getElementById(`sub-${i}`), arrow=item.querySelector('.nav-arrow');
        const isOpen=subEl.classList.contains('open');
        navList.querySelectorAll('.sub-menu.open').forEach(s=>s.classList.remove('open'));
        navList.querySelectorAll('.nav-arrow.open').forEach(a=>a.classList.remove('open'));
        if(!isOpen){subEl.classList.add('open');arrow.classList.add('open');}
        renderContent([{category:sec.children[0].label,links:sec.children[0].links,icon:catIcon}]);
      } else {
        renderContent([{...sec,icon:catIcon}]);
      }
      // 切换搜索标签
      if(sec.category.includes('社区')) renderSubTags('zhihu'); else renderSubTags('default');
    };
  });
  navList.querySelectorAll('.sub-item').forEach(el=>{
    el.onclick=(e)=>{
      e.stopPropagation();
      navList.querySelectorAll('.sub-item').forEach(s=>s.classList.remove('active'));
      el.classList.add('active');
      const p=el.dataset.pidx,c=el.dataset.cidx,ch=data[p].children[c];
      renderContent([{category:ch.label,links:ch.links,icon:catIcon}]);
    };
  });
}

// 渲染内容
function renderContent(data){
  container.innerHTML='';
  data.forEach((sec,i)=>{
    container.innerHTML+=`<h2 class="section-title">${sec.icon||catIcon} ${sec.category}</h2><div class="grid">${sec.links.map(l=>`<a href="${l.url}" target="_blank" class="card">${l.icon||cardIcon}<div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div></a>`).join('')}</div>`;
  });
}

// 次级标签
function renderSubTags(area){
  const tags=area==='zhihu'?['知乎','微信','微博','豆瓣','搜外问答']:['常用','百度','Google','Bing'];
  subTags.innerHTML=tags.map(t=>`<span class="sub-tag ${t===currentEngine?'active':''}" data-engine="${t}">${t}</span>`).join('');
  subTags.querySelectorAll('.sub-tag').forEach(t=>{
    t.onclick=()=>{currentEngine=t.dataset.engine;subSearchInput.placeholder=searchEngines[currentEngine].label;renderSubTags(area);};
  });
  subSearchInput.placeholder=searchEngines[currentEngine].label;
}

// 搜索执行
function doSearch(kw,engine=currentEngine){
  if(!kw)return;
  window.open(searchEngines[engine].url+encodeURIComponent(kw),'_blank');
}
subSearchBtn.onclick=()=>doSearch(subSearchInput.value);
subSearchInput.onkeydown=e=>{if(e.key==='Enter')doSearch(subSearchInput.value);};
searchBtn.onclick=()=>doSearch(topSearch.value);
topSearch.onkeydown=e=>{if(e.key==='Enter')doSearch(topSearch.value);};

// 顶部搜索（全站过滤）
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