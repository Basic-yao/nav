const cloudTagIcon = `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#ff9900" d="M12 2L2 7l10 5 10-5-10-5z"/><path fill="#cc7a00" d="M2 7l10 5 10-5M2 12l10 5 10-5M2 17l10 5 10-5"/></svg>`;
const catIcon = cloudTagIcon;

// 数据：children 即为二级菜单
const navData = [
  { category: "常用推荐", icon: catIcon, links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台。", url: "https://dribbble.com/", icon: cloudTagIcon },
    { title: "Behance", desc: "Adobe旗下设计师交流平台。", url: "https://www.behance.net/", icon: cloudTagIcon },
    { title: "站酷", desc: "中国人气设计师互动平台。", url: "https://www.zcool.com.cn/", icon: cloudTagIcon },
    { title: "Pinterest", desc: "全球美图收藏采集站。", url: "https://www.pinterest.com/", icon: cloudTagIcon },
    { title: "Medium", desc: "高质量设计文章。", url: "https://medium.com/", icon: cloudTagIcon },
    { title: "Youtube", desc: "全球最大学习分享平台。", url: "https://youtube.com/", icon: cloudTagIcon }
  ]},
  { category: "社区咨询", icon: catIcon, links: [
    { title: "雷锋网", desc: "人工智能科技媒体。", url: "https://www.leiphone.com/", icon: cloudTagIcon },
    { title: "36kr", desc: "创业资讯科技新闻。", url: "https://36kr.com/", icon: cloudTagIcon },
    { title: "人人都是产品经理", desc: "产品爱好者交流平台。", url: "https://www.woshipm.com/", icon: cloudTagIcon }
  ]},
  { 
    category: "灵感采集", icon: catIcon, 
    children: [
      { label: "发现产品", links: [{title:"Product Hunt", desc:"发现新鲜产品", url:"https://www.producthunt.com/", icon:cloudTagIcon}] },
      { label: "界面灵感", links: [{title:"Dribbble", desc:"界面灵感", url:"https://dribbble.com/", icon:cloudTagIcon}] },
      { label: "网页灵感", links: [{title:"Awwwards", desc:"网页设计灵感", url:"https://www.awwwards.com/", icon:cloudTagIcon}] }
    ],
    links: [] // 父级自身可不填，或填默认
  },
  { category: "素材资源", icon: catIcon, links: [
    { title: "花瓣", desc: "收集灵感保存素材。", url: "https://huaban.com/", icon: cloudTagIcon },
    { title: "UI中国", desc: "图形交互与界面设计。", url: "https://ui.cn/", icon: cloudTagIcon }
  ]},
  { category: "常用工具", icon: catIcon, links: [
    { title: "Google", desc: "全球最大UI学习分享平台。", url: "https://google.com/", icon: cloudTagIcon },
    { title: "TinyPNG", desc: "图片压缩。", url: "https://tinypng.com/", icon: cloudTagIcon }
  ]},
  { category: "学习教程", icon: catIcon, links: [{ title: "优设", desc: "设计师交流学习平台。", url: "https://ui.cn/", icon: cloudTagIcon }] },
  { category: "UED团队", icon: catIcon, links: [] },
  { category: "友情链接", icon: catIcon, links: [] },
  { category: "在线编辑", icon: catIcon, links: [] },
  { category: "关于本站", icon: catIcon, links: [] }
];

const navList = document.getElementById('navList');
const container = document.getElementById('navContainer');
const topSearch = document.getElementById('topSearch');

// 渲染左侧栏（含二级菜单）
function renderSidebar(data) {
  let html = `<div class="side-logo">${cloudTagIcon} 网址导航</div>`;
  data.forEach((sec, i) => {
    const hasChild = sec.children && sec.children.length;
    html += `<div class="nav-item" data-index="${i}" data-haschild="${hasChild?'1':'0'}">
      <span style="display:flex;align-items:center;gap:8px;">${sec.icon} <span>${sec.category}</span></span>
      <span class="nav-arrow">${hasChild ? '▼' : '>'}</span>
    </div>`;
    if (hasChild) {
      html += `<div class="sub-menu" id="sub-${i}">`;
      sec.children.forEach((ch, j) => {
        html += `<span class="sub-item" data-pidx="${i}" data-cidx="${j}">${ch.label}</span>`;
      });
      html += `</div>`;
    }
  });
  navList.innerHTML = html;

  // 父级点击：展开/收起
  navList.querySelectorAll('.nav-item').forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      const idx = el.dataset.index;
      const has = el.dataset.haschild === '1';
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
      
      if (has) {
        const sub = document.getElementById(`sub-${idx}`);
        const arrow = el.querySelector('.nav-arrow');
        const isOpen = sub.classList.contains('open');
        // 手风琴：关闭其他
        navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
        navList.querySelectorAll('.nav-arrow.open').forEach(a => a.classList.remove('open'));
        if (!isOpen) {
          sub.classList.add('open');
          arrow.classList.add('open');
        }
        // 默认渲染第一个子项
        const sec = data[idx];
        if (sec.children[0]) renderContent([{category: sec.children[0].label, links: sec.children[0].links, icon: catIcon}]);
      } else {
        renderContent([{...data[idx], icon: catIcon}]);
      }
    };
  });

  // 子级点击
  navList.querySelectorAll('.sub-item').forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      navList.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      const pidx = el.dataset.pidx, cidx = el.dataset.cidx;
      const ch = data[pidx].children[cidx];
      renderContent([{category: ch.label, links: ch.links, icon: catIcon}]);
    };
  });
}

// 渲染右侧内容
function renderContent(data) {
  container.innerHTML = '';
  data.forEach((sec, i) => {
    container.innerHTML += `<h2 class="section-title" id="sec-${i}"><span>${sec.icon}</span> ${sec.category}</h2>
      <div class="grid">
        ${sec.links.map(l => `<a href="${l.url}" target="_blank" class="card">
          <div class="card-icon">${l.icon||''}</div>
          <div><div class="card-title">${l.title}</div><div class="card-desc">${l.desc}</div></div>
        </a>`).join('')}
      </div>`;
  });
}

// 搜索
topSearch.addEventListener('input', e => {
  const k = e.target.value.toLowerCase().trim();
  if(!k) { renderContent(navData.filter(s=>s.links.length)); return; }
  const filtered = navData.map(s => {
    let links = s.links.filter(l => l.title.toLowerCase().includes(k) || l.desc.includes(k));
    if (s.children) {
      s.children.forEach(ch => {
        ch.links.forEach(l => { if(l.title.toLowerCase().includes(k)||l.desc.includes(k)) links.push(l); });
      });
    }
    return {...s, links};
  }).filter(s => s.links.length);
  renderContent(filtered);
});

// 主题
const themeBtn = document.getElementById('toggle-theme'), html = document.documentElement;
function syncTheme() {
  const t = html.getAttribute('data-theme');
  themeBtn.querySelector('.theme-icon').textContent = t==='dark'?'☀️':'🌙';
  themeBtn.querySelector('.theme-text').textContent = t==='dark'?'浅色模式':'深色模式';
}
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme')==='dark'?'light':'dark';
  html.setAttribute('data-theme', cur); localStorage.setItem('theme', cur); syncTheme();
};
html.setAttribute('data-theme', localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
syncTheme();

// 初始化
renderSidebar(navData);
renderContent([navData[0]]); // 默认显示常用推荐
navList.querySelector('.nav-item')?.classList.add('active');