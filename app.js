const navData = [
  { category: "常用工具", icon: "🔧", links: [
    { title: "网络剪贴板", url: "#", desc: "在线跨屏剪切文字", icon: `<svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zM15 5H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-5-5zm0 1.5L18.5 9H16V6.5z"/></svg>` },
    { title: "草料二维码", url: "#", desc: "在线二维码生成工具", icon: `<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h-3v2h3v-3zm-5 5h2v2h-2v-2z"/></svg>` },
    { title: "在线文件传输", url: "#", desc: "无需注册的大文件传输", icon: `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/></svg>` },
    { title: "TinyPNG", url: "#", desc: "图片压缩神器", icon: `<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>` },
    { title: "Remove.bg", url: "#", desc: "一键去背景", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
    { title: "Carbon", url: "#", desc: "代码截图美化", icon: `<svg viewBox="0 0 24 24"><path d="M8 3L2 7l10 5 10-5-6-4-6 4z"/></svg>` }
  ]},
  { category: "开发设计", icon: "💻", links: [
    { title: "GitHub", url: "#", desc: "代码托管平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 .5C5.73.5.67 5.56.67 11.83c0 5.02 3.24 9.27 7.74 10.78.57.1.78-.25.78-.55v-2.1c-3.15.69-3.81-1.32-3.81-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.51-.29-5.16-1.26-5.16-5.6 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.96 10.96 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.35-2.66 5.31-5.2 5.59.41.36.78 1.06.78 2.15v3.19c0 .31.21.66.79.55 4.49-1.51 7.73-5.76 7.73-10.78C23.33 5.56 18.27.5 12 .5z"/></svg>` },
    { title: "Gitee", url: "#", desc: "国内代码托管", icon: `<svg viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 20.016c-1.05 1.516-3.32 2.984-5.09 2.984-1.77 0-4.04-1.468-5.09-2.984l-1.86-2.61 3.36-1.14 1.59 2.22c.94 1.31 2.72 1.31 3.66 0l1.59-2.22 3.36 1.14-1.47 2.61z"/></svg>` },
    { title: "Stack Overflow", url: "#", desc: "程序员问答社区", icon: `<svg viewBox="0 0 24 24"><path d="M18 14v3h2v-5h-4v2h2zm-4-2v7H4V8h10v4zm2-8H2v16h16V4h-2zm-1 10H6v-2h9v2zm0-3H6V9h9v2zm0-3H6V6h9v2z"/></svg>` },
    { title: "MDN Web Docs", url: "#", desc: "Web 技术文档", icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>` },
    { title: "Figma", url: "#", desc: "在线协作设计工具", icon: `<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm0 10a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4h-4z"/></svg>` },
    { title: "Can I Use", url: "#", desc: "前端兼容性查询", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
    { title: "npm", url: "#", desc: "JavaScript 包管理器", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Vercel", url: "#", desc: "前端项目部署平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "AI 工具", icon: "🤖", links: [
    { title: "AI 助手", url: "#", desc: "智能对话", icon: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>` }
  ]}
];

const container = document.getElementById('navContainer');
const navList = document.getElementById('navList');
const searchInput = document.getElementById('searchInput');
const themeBtn = document.getElementById('toggle-theme');
const html = document.documentElement;
const themeIcon = themeBtn.querySelector('.theme-icon');
const themeText = themeBtn.querySelector('.theme-text');

function render(data) {
  container.innerHTML = '';
  navList.innerHTML = '';
  data.forEach((section, i) => {
    // 左侧栏（带箭头）
    navList.innerHTML += `<div data-index="${i}">
      <span class="nav-item-left"><span>${section.icon}</span> <span>${section.category}</span></span>
      <span class="nav-arrow">></span>
    </div>`;
    
    // 主内容（标题与图标平行，卡片内小图标+标题+描述）
    container.innerHTML += `<h2 class="section-title"><span>${section.icon}</span> ${section.category}</h2>
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

searchInput.addEventListener('input', e => {
  const k = e.target.value.toLowerCase().trim();
  if(!k) { render(navData); return; }
  const filtered = navData.map(s => ({...s, links: s.links.filter(l => l.title.toLowerCase().includes(k) || l.desc.includes(k))})).filter(s => s.links.length);
  render(filtered);
});

document.addEventListener('keydown', e => {
  if(e.key === '/' && !e.ctrlKey && document.activeElement !== searchInput) {
    e.preventDefault(); searchInput.focus();
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
// 默认激活第一项
navList.querySelector('div')?.classList.add('active');