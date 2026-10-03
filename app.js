// 统一的黄橙立体“云标签”图标（带三层渐变）
const cloudIcon = `<svg class="cloud-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#F8B500"/>
  <path d="M2 7l10 5 10-5M2 12l10 5 10-5M2 17l10 5 10-5" fill="none" stroke="#E89C00" stroke-width="1.5"/>
  <path d="M12 22l10-5v-5l-10 5z" fill="#D68A00" opacity="0.8"/>
</svg>`;

const catIcon = cloudIcon; // 左侧分类也用云标签

const navData = [
  { category: "常用推荐", icon: catIcon, links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台。", url: "https://dribbble.com/", icon: cloudIcon },
    { title: "Behance", desc: "Adobe旗下设计师交流平台。", url: "https://www.behance.net/", icon: cloudIcon },
    { title: "站酷", desc: "中国人气设计师互动平台。", url: "https://www.zcool.com.cn/", icon: cloudIcon },
    { title: "Pinterest", desc: "全球美图收藏采集站。", url: "https://www.pinterest.com/", icon: cloudIcon },
    { title: "Medium", desc: "高质量设计文章。", url: "https://medium.com/", icon: cloudIcon },
    { title: "Youtube", desc: "全球最大学习分享平台。", url: "https://www.youtube.com/", icon: cloudIcon }
  ]},
  { category: "社区咨询", icon: catIcon, links: [
    { title: "知乎", desc: "中文互联网高质量问答社区。", url: "https://www.zhihu.com/", icon: cloudIcon },
    { title: "微信", desc: "社交与资讯。", url: "https://weixin.qq.com/", icon: cloudIcon },
    { title: "微博", desc: "热点资讯与社交。", url: "https://weibo.com/", icon: cloudIcon },
    { title: "豆瓣", desc: "书影音与讨论。", url: "https://www.douban.com/", icon: cloudIcon }
  ]},
  { category: "灵感采集", icon: catIcon, hasChild: true, children: [
    { label: "发现产品", links: [
      { title: "Product Hunt", desc: "发现新鲜有趣的产品。", url: "https://www.producthunt.com/", icon: cloudIcon },
      { title: "UI中国", desc: "图形交互与界面设计交流。", url: "https://www.ui.cn/", icon: cloudIcon }
    ]},
    { label: "界面灵感", links: [
      { title: "花瓣", desc: "收集灵感，保存有用的素材。", url: "https://huaban.com/", icon: cloudIcon },
      { title: "优设", desc: "设计师交流学习平台。", url: "https://www.uisdc.com/", icon: cloudIcon }
    ]},
    { label: "网页灵感", links: [
      { title: "Awwwards", desc: "网页设计奖项与灵感。", url: "https://www.awwwards.com/", icon: cloudIcon },
      { title: "CSS Design Awards", desc: "CSS网页设计展示。", url: "https://www.cssdesignawards.com/", icon: cloudIcon }
    ]}
  ], links: [] },
  { category: "素材资源", icon: catIcon, links: [
    { title: "Iconfont", desc: "阿里巴巴矢量图标库。", url: "https://www.iconfont.cn/", icon: cloudIcon },
    { title: "Unsplash", desc: "免费高清图库。", url: "https://unsplash.com/", icon: cloudIcon }
  ]},
  { category: "常用工具", icon: catIcon, links: [
    { title: "TinyPNG", desc: "图片压缩神器。", url: "https://tinypng.com/", icon: cloudIcon },
    { title: "Remove.bg", desc: "一键去背景。", url: "https://www.remove.bg/", icon: cloudIcon }
  ]},
  { category: "学习教程", icon: catIcon, links: [
    { title: "Bilibili", desc: "学习资源丰富的视频站。", url: "https://www.bilibili.com/", icon: cloudIcon }
  ]},
  { category: "UED团队", icon: catIcon, links: [
    { title: "阿里云", desc: "云计算与技术服务。", url: "https://www.aliyun.com/", icon: cloudIcon }
  ]},
  { category: "友情链接", icon: catIcon, links: [
    { title: "友链1", desc: "友情链接示例。", url: "#", icon: cloudIcon }
  ]},
  { category: "在线编辑", icon: catIcon, links: [
    { title: "Figma", desc: "在线协作设计工具。", url: "https://www.figma.com/", icon: cloudIcon }
  ]},
  { category: "关于本站", icon: catIcon, links: [
    { title: "GitHub", desc: "项目源码。", url: "https://github.com/", icon: cloudIcon }
  ]}
];

const navList = document.getElementById('navList');
const container = document.getElementById('navContainer');
const topSearch = document.getElementById('topSearch');
const menuToggle = document.getElementById('menuToggle');

// 渲染左侧栏（含Logo）
function renderSidebar(data) {
  navList.innerHTML = `<div class="logo">${cloudIcon} 网址导航</div>` + 
    data.map((sec, i) => `
    <div class="nav-item ${i===0?'active':''}" data-index="${i}" data-haschild="${sec.hasChild?1:0}">
      <span class="nav-item-left"><span>${sec.icon}</span> <span>${sec.category}</span></span>
      <span class="nav-arrow ${sec.hasChild?'▼':(sec.links.length?'>':'')}"></span>
    </div>
    ${sec.hasChild ? `<div class="sub-menu" id="sub-${i}">
      ${sec.children.map((ch, ci) => `<div class="sub-item" data-pidx="${i}" data-cidx="${ci}">${ch.label}</div>`).join('')}
    </div>` : ''}
  `).join('');

  // 绑定事件
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
        navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
        navList.querySelectorAll('.nav-arrow.open').forEach(a => a.classList.remove('open'));
        if (!isOpen) {
          sub.classList.add('open');
          arrow.classList.add('open');
        }
        // 默认渲染第一项
        const sec = data[idx];
        if (sec.children[0]) renderContent([{category: sec.children[0].label, links: sec.children[0].links, icon: catIcon}]);
      } else {
        renderContent([{...data[idx], icon: catIcon}]);
      }
    };
  });

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
  if(!k) { renderContent([navData[0]]); return; }
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

// 移动端菜单
menuToggle.onclick = () => navList.classList.toggle('show');

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
renderContent([navData[0]]);