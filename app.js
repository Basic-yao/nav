const navData = [
  { category: "常用推荐", icon: "⭐", links: [
    { title: "Dribbble", desc: "全球UI设计师作品分享平台。", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Behance", desc: "Adobe旗下的设计师交流平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "二维码演示", desc: "二维码演示，手机扫一扫", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "UI中国", desc: "图形交互与界面设计交流", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "站酷", desc: "中国人气设计师互动平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Pinterest", desc: "全球美图收藏集站", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "花瓣", desc: "收集灵感,保存有用的素材", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Medium", desc: "高质量设计文章", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "优设", desc: "设计师交流学习平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Producthunt", desc: "发现新鲜有趣的产品", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Youtube", desc: "全球最大的学习分享平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Google", desc: "全球最大的UI学习分享平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "社区咨询", icon: "💬", links: [
    { title: "雷锋网", desc: "人工智能和智能硬件领域", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "36kr", desc: "创业资讯、科技新闻", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "数英网", desc: "数字媒体及职业招聘网站", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "猎云网", desc: "互联网创业项目推荐", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "人人都是产品经理", desc: "产品经理学习交流平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "互联网早读课", desc: "互联网行业深度阅读", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "产品壹佰", desc: "产品经理人优质资讯", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "PMCAFF", desc: "产品经理人气组织", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "爱运营", desc: "网站运营人员学习交流", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "鸟哥笔记", desc: "移动互联网第一干货平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "古田路9号", desc: "国内专业品牌创意平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "优阅网", desc: "UI设计师学习交流社区", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "开发设计", icon: "💻", links: [
    { title: "GitHub", desc: "代码托管平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Gitee", desc: "国内代码托管", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Vercel", desc: "前端项目部署平台", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "npm", desc: "JavaScript 包管理器", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "AI 工具", icon: "🤖", links: [
    { title: "AI 助手", desc: "智能对话", icon: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>` }
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