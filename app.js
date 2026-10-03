// 保留你当前线上的数据
const navData = [
  { category: "常用工具", icon: "🛠️", links: [
    { title: "网络剪贴板", url: "#", desc: "在线跨屏剪切文字", icon: "📋" },
    { title: "草料二维码", url: "#", desc: "在线二维码生成工具", icon: "🔳" },
    { title: "在线文件传输", url: "#", desc: "无需注册的大文件传输", icon: "🚀" },
    { title: "TinyPNG", url: "#", desc: "图片压缩神器", icon: "🖼️" },
    { title: "Remove.bg", url: "#", desc: "一键去背景", icon: "💎" },
    { title: "Carbon", url: "#", desc: "代码截图美化", icon: "</>" }
  ]},
  { category: "开发设计", icon: "💻", links: [
    { title: "GitHub", url: "#", desc: "代码托管平台", icon: "🐙" },
    { title: "Gitee", url: "#", desc: "国内代码托管", icon: "🐎" },
    { title: "Stack Overflow", url: "#", desc: "程序员问答社区", icon: "📚" },
    { title: "MDN Web Docs", url: "#", desc: "Web 技术文档", icon: "📖" },
    { title: "Figma", url: "#", desc: "在线协作设计工具", icon: "🎨" },
    { title: "Can I Use", url: "#", desc: "前端兼容性查询", icon: "✅" },
    { title: "npm", url: "#", desc: "JavaScript 包管理器", icon: "📦" },
    { title: "Vercel", url: "#", desc: "前端项目部署平台", icon: "▲" }
  ]},
  { category: "AI 工具", icon: "🤖", links: [
    { title: "ChatGPT", url: "#", desc: "AI 对话助手", icon: "💬" },
    { title: "Midjourney", url: "#", desc: "AI 绘画", icon: "🎨" }
  ]}
];

const container = document.getElementById('navContainer');
const navList = document.getElementById('navList');
const searchInput = document.getElementById('searchInput');
const themeBtn = document.getElementById('toggle-theme');
const html = document.documentElement;

// 渲染主内容与左侧栏
function render(data) {
  container.innerHTML = '';
  navList.innerHTML = '';
  
  data.forEach((section, i) => {
    // 左侧栏项
    navList.innerHTML += `<div data-index="${i}">${section.icon} ${section.category}</div>`;
    
    // 右侧内容
    container.innerHTML += `
      <h2 class="section-title" id="sec${i}">${section.icon} ${section.category}</h2>
      <div class="grid">
        ${section.links.map(l => `
          <a href="${l.url}" target="_blank" class="card">
            <div class="card-icon">${l.icon || '🔗'}</div>
            <div class="card-title">${l.title}</div>
            <div class="card-desc">${l.desc}</div>
          </a>
        `).join('')}
      </div>`;
  });

  // 左侧栏点击平滑滚动
  navList.querySelectorAll('div').forEach(el => {
    el.onclick = () => {
      const idx = el.dataset.index;
      document.getElementById(`sec${idx}`).scrollIntoView({ behavior: 'smooth' });
      navList.querySelectorAll('div').forEach(n => n.classList.remove('active'));
      el.classList.add('active');
    };
  });
}

// 搜索功能
searchInput.addEventListener('input', e => {
  const k = e.target.value.toLowerCase().trim();
  if(!k) { render(navData); return; }
  const filtered = navData.map(s => ({
    ...s, 
    links: s.links.filter(l => l.title.toLowerCase().includes(k) || l.desc.includes(k))
  })).filter(s => s.links.length);
  render(filtered);
});

// 快捷键聚焦搜索
document.addEventListener('keydown', e => {
  if(e.key === '/' && !e.ctrlKey && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
});

// 保留原有的主题切换逻辑
function syncIcon() {
  const t = html.getAttribute('data-theme');
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme');
  if (cur === 'dark') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  syncIcon();
};
const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);
else if (window.matchMedia('prefers-color-scheme: dark').matches) html.setAttribute('data-theme', 'dark');
syncIcon();

// 初始渲染
render(navData);