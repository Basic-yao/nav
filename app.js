const navData = [
  { category: "常用工具", icon: `✂️`, links: [
    { title: "网络剪贴板", url: "#", desc: "在线跨屏剪切文字", icon: `<svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zM19 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>` },
    { title: "草料二维码", url: "#", desc: "在线二维码生成工具", icon: `<svg viewBox="0 0 24 24"><path d="M4 4h4v4H4zm12 0h4v4h-4zM4 16h4v4H4zm12 0h4v4h-4zM10 4h4v4h-4zM10 10h4v4h-4zM10 16h4v4h-4z"/></svg>` },
    { title: "在线文件传输", url: "#", desc: "无需注册的大文件传输", icon: `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>` },
    { title: "TinyPNG", url: "#", desc: "图片压缩神器", icon: `<svg viewBox="0 0 24 24"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-5-5.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>` },
    { title: "Remove.bg", url: "#", desc: "一键去背景", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
    { title: "Carbon", url: "#", desc: "代码截图美化", icon: `<svg viewBox="0 0 24 24"><path d="M8 4l-4 4 4 4 4-4-4-4zm8 0l4 4-4 4-4-4 4-4zM4 12l4 4 4-4-4-4-4 4zm8 0l4 4 4-4-4-4-4 4z"/></svg>` }
  ]},
  { category: "开发设计", icon: `💻`, links: [
    { title: "GitHub", url: "https://github.com", desc: "代码托管平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.73.8 1.18 1.82 1.18 3.07 0 4.4-2.68 5.36-5.24 5.65.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>` },
    { title: "Gitee", url: "#", desc: "国内代码托管", icon: `<svg viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.986.623 1.823 1.456 2.446 2.442.624.987.95 2.13.95 3.273 0 1.143-.326 2.286-.95 3.273a5.94 5.94 0 0 1-2.446 2.442c-.987.624-2.13.95-3.273.95-1.143 0-2.286-.326-3.273-.95a5.94 5.94 0 0 1-2.442-2.442c-.624-.987-.95-2.13-.95-3.273 0-1.143.326-2.286.95-3.273a5.94 5.94 0 0 1 2.442-2.442c.987-.624 2.13-.95 3.273-.95 1.143 0 2.286.326 3.273.95z"/></svg>` },
    { title: "Stack Overflow", url: "#", desc: "程序员问答社区", icon: `<svg viewBox="0 0 24 24"><path d="M18 20v-2h2v4H4v-4h2v2h12zM7.5 16.5l10-2 .5 2-10 2-.5-2zm1.5-4l8-1.5.5 2-8 1.5-.5-2zm2-4l6-1 .5 2-6 1-.5-2zM16 4l-1.5 2 4 4 1.5-2-4-4z"/></svg>` },
    { title: "MDN Web Docs", url: "#", desc: "Web 技术文档", icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>` },
    { title: "Figma", url: "#", desc: "在线协作设计工具", icon: `<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-4 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/></svg>` },
    { title: "Can I Use", url: "#", desc: "前端兼容性查询", icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>` },
    { title: "npm", url: "#", desc: "JavaScript 包管理器", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
    { title: "Vercel", url: "#", desc: "前端项目部署平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "AI 工具", icon: `🤖`, links: [
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
    navList.innerHTML += `<div data-index="${i}"><span>${section.icon}</span> <span>${section.category}</span></div>`;
    container.innerHTML += `<h2 class="section-title" id="sec${i}"><span>${section.icon}</span> ${section.category}</h2><div class="grid">
      ${section.links.map(l => `<a href="${l.url}" target="_blank" class="card">
        <div class="card-icon">${l.icon || ''}</div>
        <div class="card-title">${l.title}</div>
        <div class="card-desc">${l.desc}</div>
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