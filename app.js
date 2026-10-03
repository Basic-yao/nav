// 1. 定义“云标签”SVG（复刻参考图的层叠样式）
const cloudTagIcon = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <!-- 顶部黄色层 -->
  <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="#FFA500"/>
  <!-- 底部左侧层 -->
  <path d="M2 7L12 12L12 17L2 12L2 7Z" fill="#333333"/>
  <!-- 底部右侧层 -->
  <path d="M22 7L12 12L12 17L22 12L22 7Z" fill="#555555"/>
</svg>`;

// 2. 分类图标（浅色侧栏用，保持简约，也可换成 cloudTagIcon）
const catIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;

const navData = [
  { category: "常用推荐", icon: catIcon, links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台。", url: "https://dribbble.com/", icon: cloudTagIcon },
    { title: "Behance", desc: "Adobe旗下的设计师交流平台。", url: "https://www.behance.net/", icon: cloudTagIcon },
    { title: "二维码演示", desc: "手机扫一扫，也可以点击。", url: "#", icon: cloudTagIcon },
    { title: "UI中国", desc: "图形交互与界面设计交流。", url: "https://www.ui.cn/", icon: cloudTagIcon },
    { title: "站酷", desc: "中国人气设计师互动平台。", url: "https://www.zcool.com.cn/", icon: cloudTagIcon },
    { title: "Pinterest", desc: "全球美图收藏集站。", url: "https://www.pinterest.com/", icon: cloudTagIcon },
    { title: "花瓣", desc: "收集灵感,保存有用的素材。", url: "https://huaban.com/", icon: cloudTagIcon },
    { title: "Medium", desc: "高质量设计文章。", url: "https://medium.com/", icon: cloudTagIcon },
    { title: "优设", desc: "设计师交流学习平台。", url: "https://www.uisdc.com/", icon: cloudTagIcon },
    { title: "Producthunt", desc: "发现新鲜有趣的产品。", url: "https://www.producthunt.com/", icon: cloudTagIcon },
    { title: "Youtube", desc: "全球最大的学习分享平台。", url: "https://www.youtube.com/", icon: cloudTagIcon },
    { title: "Google", desc: "全球最大的UI学习分享平台。", url: "https://www.google.com/", icon: cloudTagIcon }
  ]},
  { category: "社区咨询", icon: catIcon, links: [
    { title: "雷锋网", desc: "人工智能和智能硬件领域的互联网科技媒体。", url: "https://www.leiphone.com/", icon: cloudTagIcon },
    { title: "36kr", desc: "创业资讯、科技新闻。", url: "https://36kr.com/", icon: cloudTagIcon },
    { title: "数英网", desc: "数字媒体及职业招聘网站。", url: "https://www.digitaling.com/", icon: cloudTagIcon },
    { title: "猎云网", desc: "互联网创业项目推荐和创业创新资讯。", url: "https://lieyunwang.com/", icon: cloudTagIcon },
    { title: "人人都是产品经理", desc: "产品经理、产品爱好者学习交流平台。", url: "https://www.woshipm.com/", icon: cloudTagIcon },
    { title: "互联网早读课", desc: "互联网行业深度阅读与学习平台。", url: "https://www.zaodula.com/", icon: cloudTagIcon },
    { title: "产品壹佰", desc: "为产品经理爱好者提供最优质的产品资讯。", url: "https://www.chanpin100.com/", icon: cloudTagIcon },
    { title: "PMCAFF", desc: "中国第一产品经理人气组织。", url: "https://www.pmcaff.com/", icon: cloudTagIcon },
    { title: "爱运营", desc: "网站运营人员学习交流。", url: "https://www.iyunying.org/", icon: cloudTagIcon },
    { title: "鸟哥笔记", desc: "移动互联网第一干货平台。", url: "https://www.niaogebiji.com/", icon: cloudTagIcon },
    { title: "古田路9号", desc: "国内专业品牌创意平台。", url: "https://www.gtn9.com/", icon: cloudTagIcon },
    { title: "优阅网", desc: "UI设计师学习交流社区。", url: "#", icon: cloudTagIcon }
  ]},
  { category: "开发设计", icon: catIcon, links: [
    { title: "GitHub", desc: "代码托管平台。", url: "https://github.com/", icon: cloudTagIcon },
    { title: "Gitee", desc: "国内代码托管。", url: "https://gitee.com/", icon: cloudTagIcon },
    { title: "MDN Web Docs", desc: "Web 技术文档。", url: "https://developer.mozilla.org/", icon: cloudTagIcon },
    { title: "Figma", desc: "在线协作设计工具。", url: "https://www.figma.com/", icon: cloudTagIcon },
    { title: "Vercel", desc: "前端项目部署平台。", url: "https://vercel.com/", icon: cloudTagIcon }
  ]},
  { category: "常用工具", icon: catIcon, links: [
    { title: "TinyPNG", desc: "图片压缩神器。", url: "https://tinypng.com/", icon: cloudTagIcon },
    { title: "Remove.bg", desc: "一键去背景。", url: "https://www.remove.bg/", icon: cloudTagIcon },
    { title: "Carbon", desc: "代码截图美化。", url: "https://carbon.now.sh/", icon: cloudTagIcon }
  ]}
];

const container = document.getElementById('navContainer');
const navList = document.getElementById('navList');
const topSearch = document.getElementById('topSearch');
const themeBtn = document.getElementById('toggle-theme');
const html = document.documentElement;
const themeIcon = themeBtn.querySelector('.theme-icon');
const themeText = themeBtn.querySelector('.theme-text');

function render(data) {
  container.innerHTML = '';
  navList.innerHTML = '';
  data.forEach((section, i) => {
    navList.innerHTML += `<div data-index="${i}">
      <span class="nav-item-left"><span>${section.icon}</span> <span>${section.category}</span></span>
      <span class="nav-arrow">></span>
    </div>`;
    container.innerHTML += `<h2 class="section-title" id="sec${i}"><span>${section.icon}</span> ${section.category}</h2>
      <div class="grid">
        ${section.links.map(l => `<a href="${l.url}" target="_blank" class="card">
          <div class="card-icon">${l.icon || ''}</div>
          <div>
            <div class="card-title">${l.title}</div>
            <div class="card-desc">${l.desc}</div>
          </div>
        </a>`).join('')}
      </div>`;
  });
  navList.querySelectorAll('div').forEach(el => {
    el.onclick = () => {
      document.getElementById(`sec${el.dataset.index}`).scrollIntoView({ behavior: 'smooth' });
      navList.querySelectorAll('div').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
    };
  });
}

topSearch.addEventListener('input', e => {
  const k = e.target.value.toLowerCase().trim();
  if(!k) { render(navData); return; }
  const filtered = navData.map(s => ({...s, links: s.links.filter(l => l.title.toLowerCase().includes(k) || l.desc.includes(k))})).filter(s => s.links.length);
  render(filtered);
});

document.addEventListener('keydown', e => {
  if(e.key === '/' && !e.ctrlKey && document.activeElement !== topSearch) {
    e.preventDefault(); topSearch.focus();
  }
});

function syncTheme() {
  const t = html.getAttribute('data-theme');
  themeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
  themeText.textContent = t === 'dark' ? '浅色模式' : '深色模式';
}
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', cur);
  localStorage.setItem('theme', cur);
  syncTheme();
};
const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', saved);
syncTheme();

render(navData);
navList.querySelector('div')?.classList.add('active');