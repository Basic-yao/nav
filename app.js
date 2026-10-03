const navData = [
  { category: "常用工具", icon: "🛠️", links: [
    { title: "网络剪贴板", url: "#", desc: "在线跨屏剪切文字", icon: `<svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1z"/><path d="M20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"/></svg>` },
    { title: "草料二维码", url: "#", desc: "在线二维码生成工具", icon: `<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>` },
    { title: "在线文件传输", url: "#", desc: "无需注册的大文件传输", icon: `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>` },
    { title: "TinyPNG", url: "#", desc: "图片压缩神器", icon: `<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>` },
    { title: "Remove.bg", url: "#", desc: "一键去背景", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
    { title: "Carbon", url: "#", desc: "代码截图美化", icon: `<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>` }
  ]},
  { category: "开发设计", icon: "💻", links: [
    { title: "GitHub", url: "#", desc: "代码托管平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.69.92.69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2z"/></svg>` },
    { title: "Gitee", url: "#", desc: "国内代码托管", icon: `<svg viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 20.016c-1.05.84-2.46.66-3.32-.39-1.05-1.05-2.82-1.53-4.55-1.53s-3.5.48-4.55 1.53c-.86 1.05-2.27 1.23-3.32.39C1.26 18.96 0 16.68 0 14.16c0-3.3 2.7-6 6-6h12c3.3 0 6 2.7 6 6 0 2.52-1.26 4.8-3.016 5.856z"/></svg>` },
    { title: "Stack Overflow", url: "#", desc: "程序员问答社区", icon: `<svg viewBox="0 0 24 24"><path d="M17.36 20.22v-1.672l4.5 1.5v-12l-4.5 1.5v-1.672l6-2v15l-6 2zm-4.86-4.5l-1.5 4.5-3.86-1.28 1.5-4.5 3.86 1.28zm-3.36-4.5l-1.5 4.5-3.86-1.28 1.5-4.5 3.86 1.28zm-3.36-4.5l-1.5 4.5-3.86-1.28 1.5-4.5 3.86 1.28zm14.22 11.22l-4.5-1.5v-9l4.5 1.5v9z"/></svg>` },
    { title: "MDN Web Docs", url: "#", desc: "Web 技术文档", icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>` },
    { title: "Figma", url: "#", desc: "在线协作设计工具", icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>` },
    { title: "Can I Use", url: "#", desc: "前端兼容性查询", icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg>` },
    { title: "npm", url: "#", desc: "JavaScript 包管理器", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
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

function render(data) {
  container.innerHTML = '';
  navList.innerHTML = '';
  data.forEach((section, i) => {
    navList.innerHTML += `<div data-index="${i}">${section.icon} ${section.category}</div>`;
    container.innerHTML += `<h2 class="section-title" id="sec${i}">${section.icon} ${section.category}</h2><div class="grid">
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

function syncIcon() {
  themeBtn.textContent = html.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', cur);
  localStorage.setItem('theme', cur);
  syncIcon();
};
const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', saved);
syncIcon();

render(navData);