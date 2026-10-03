// ============ 导航数据 ============
const navData = [
  {
    category: "常用工具",
    icon: "fa-tools",
    links: [
      { title: "网络剪贴板", url: "https://netcut.cn/", desc: "在线跨屏剪切文字", icon: "fa-clipboard" },
      { title: "草料二维码", url: "https://cli.im/", desc: "在线二维码生成工具", icon: "fa-qrcode" },
      { title: "在线文件传输", url: "https://musetransfer.com/", desc: "无需注册的大文件传输", icon: "fa-paper-plane" },
      { title: "TinyPNG", url: "https://tinypng.com/", desc: "图片压缩神器", icon: "fa-image" },
      { title: "Remove.bg", url: "https://www.remove.bg/", desc: "一键去背景", icon: "fa-eraser" },
      { title: "Carbon", url: "https://carbon.now.sh/", desc: "代码截图美化", icon: "fa-code" },
    ]
  },
  {
    category: "开发设计",
    icon: "fa-code",
    links: [
      { title: "GitHub", url: "https://github.com/", desc: "代码托管平台", icon: "fa-github" },
      { title: "Gitee", url: "https://gitee.com/", desc: "国内代码托管", icon: "fa-git-alt" },
      { title: "Stack Overflow", url: "https://stackoverflow.com/", desc: "程序员问答社区", icon: "fa-stack-overflow" },
      { title: "MDN Web Docs", url: "https://developer.mozilla.org/", desc: "Web 技术文档", icon: "fa-firefox" },
      { title: "Figma", url: "https://www.figma.com/", desc: "在线协作设计工具", icon: "fa-figma" },
      { title: "Can I Use", url: "https://caniuse.com/", desc: "前端兼容性查询", icon: "fa-check-circle" },
      { title: "npm", url: "https://www.npmjs.com/", desc: "JavaScript 包管理器", icon: "fa-box" },
      { title: "Vercel", url: "https://vercel.com/", desc: "前端项目部署平台", icon: "fa-rocket" },
    ]
  },
  {
    category: "AI 工具",
    icon: "fa-robot",
    links: [
      { title: "ChatGPT", url: "https://chat.openai.com/", desc: "OpenAI 对话模型", icon: "fa-comments" },
      { title: "Claude", url: "https://claude.ai/", desc: "Anthropic AI 助手", icon: "fa-brain" },
      { title: "通义千问", url: "https://tongyi.aliyun.com/", desc: "阿里 AI 助手", icon: "fa-cloud" },
      { title: "文心一言", url: "https://yiyan.baidu.com/", desc: "百度 AI 对话", icon: "fa-wind" },
      { title: "Midjourney", url: "https://www.midjourney.com/", desc: "AI 绘画生成", icon: "fa-paint-brush" },
      { title: "Notion AI", url: "https://www.notion.so/", desc: "智能笔记助手", icon: "fa-book" },
    ]
  },
  {
    category: "影视影音",
    icon: "fa-video",
    links: [
      { title: "Bilibili", url: "https://bilibili.com/", desc: "弹幕视频网", icon: "fa-tv" },
      { title: "YouTube", url: "https://youtube.com/", desc: "全球视频平台", icon: "fa-youtube" },
      { title: "网易云音乐", url: "https://music.163.com/", desc: "在线音乐", icon: "fa-music" },
      { title: "QQ音乐", url: "https://y.qq.com/", desc: "腾讯音乐平台", icon: "fa-headphones" },
      { title: "豆瓣", url: "https://douban.com/", desc: "电影/书籍/音乐评分", icon: "fa-film" },
      { title: "爱奇艺", url: "https://iqiyi.com/", desc: "在线影视", icon: "fa-play-circle" },
    ]
  },
  {
    category: "学习资源",
    icon: "fa-graduation-cap",
    links: [
      { title: "B站学习区", url: "https://bilibili.com/v/knowledge/", desc: "B站知识区", icon: "fa-book-open" },
      { title: "知乎", url: "https://zhihu.com/", desc: "问答社区", icon: "fa-question-circle" },
      { title: "掘金", url: "https://juejin.cn/", desc: "开发者社区", icon: "fa-diamond" },
      { title: "简书", url: "https://jianshu.com/", desc: "创作社区", icon: "fa-pen" },
      { title: "Wikipedia", url: "https://wikipedia.org/", desc: "自由百科全书", icon: "fa-globe" },
      { title: "Coursera", url: "https://coursera.org/", desc: "在线课程平台", icon: "fa-university" },
    ]
  },
  {
    category: "云盘存储",
    icon: "fa-cloud",
    links: [
      { title: "阿里云盘", url: "https://www.aliyundrive.com/", desc: "阿里云盘", icon: "fa-cloud-upload" },
      { title: "百度网盘", url: "https://pan.baidu.com/", desc: "百度云存储", icon: "fa-hdd" },
      { title: "123云盘", url: "https://www.123pan.com/", desc: "不限速网盘", icon: "fa-database" },
      { title: "蓝奏云", url: "https://wwww.lanzou.com/", desc: "小文件分享", icon: "fa-share-alt" },
      { title: "OneDrive", url: "https://onedrive.live.com/", desc: "微软云存储", icon: "fa-cloud-arrow-up" },
    ]
  },
  {
    category: "购物生活",
    icon: "fa-shopping-cart",
    links: [
      { title: "淘宝", url: "https://taobao.com/", desc: "网购平台", icon: "fa-shopping-bag" },
      { title: "京东", url: "https://jd.com/", desc: "正品电商", icon: "fa-truck" },
      { title: "拼多多", url: "https://pinduoduo.com/", desc: "拼团购物", icon: "fa-tags" },
      { title: "美团", url: "https://meituan.com/", desc: "外卖/到店", icon: "fa-utensils" },
      { title: "饿了么", url: "https://ele.me/", desc: "在线外卖", icon: "fa-hamburger" },
      { title: "高德地图", url: "https://amap.com/", desc: "导航出行", icon: "fa-map" },
    ]
  },
  {
    category: "友情链接",
    icon: "fa-link",
    links: [
      { title: "一为导航", url: "https://nav.iowen.cn/", desc: "onenav 主题演示站", icon: "fa-compass" },
      { title: "趣导航", url: "https://qssily.com/", desc: "简洁导航站", icon: "fa-rocket" },
      { title: "果核剥壳", url: "https://www.ghxi.com/", desc: "软件分享社区", icon: "fa-seedling" },
    ]
  }
];

// ============ 年份 ============
document.getElementById('year').innerText = new Date().getFullYear();

// ============ 主题状态提示 ============
const themeTag = document.getElementById('themeTag');
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  themeTag.innerText = "(深色模式)";
} else {
  themeTag.innerText = "(浅色模式)";
}

// ============ 渲染 ============
const container = document.getElementById('navContainer');
const searchInput = document.getElementById('searchInput');

function render(data) {
  container.innerHTML = '';
  data.forEach(section => {
    const secHtml = `
      <h2 class="section-title"><i class="fa-solid ${section.icon}"></i> ${section.category}</h2>
      <div class="grid">
        ${section.links.map(link => `
          <a href="${link.url}" target="_blank" class="card">
            <div class="card-icon"><i class="fa-solid ${link.icon}"></i></div>
            <div class="card-title">${link.title}</div>
            <div class="card-desc">${link.desc}</div>
          </a>
        `).join('')}
      </div>
    `;
    container.innerHTML += secHtml;
  });
}

// ============ 搜索 ============
searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = navData.map(sec => ({
    ...sec,
    links: sec.links.filter(l =>
      l.title.toLowerCase().includes(keyword) ||
      l.desc.toLowerCase().includes(keyword) ||
      sec.category.includes(keyword)
    )
  })).filter(sec => sec.links.length > 0);
  render(filtered);
});

// ============ 初始渲染 ============
render(navData);
