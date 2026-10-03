const navData = [
  { category: "设计资源", icon: "🎨", links: [
    { title: "UI 设计", desc: "用户界面设计灵感与资源", url: "https://www.ui.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "站酷", desc: "中国人气设计师互动平台", url: "https://www.zcool.com.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "花瓣网", desc: "采集发现网络上你喜欢的一切", url: "https://huaban.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Dribbble", desc: "全球 UI 设计师作品分享平台", url: "https://dribbble.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Behance", desc: "Adobe 旗下设计师交流平台", url: "https://www.behance.net/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Pinterest", desc: "全球美图收藏集站", url: "https://www.pinterest.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "优设", desc: "设计师交流学习平台", url: "https://www.uisdc.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Figma 社区", desc: "Figma 社区资源与模板", url: "https://www.figma.com/community", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Sketch 中文网", desc: "Sketch 官方中文资源", url: "https://www.sketch.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Adobe XD", desc: "Adobe 用户体验设计工具", url: "https://www.adobe.com/products/xd.html", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "InVision", desc: "在线原型设计与协作", url: "https://www.invisionapp.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Mobbin", desc: "移动端 UI 设计参考库", url: "https://mobbin.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "灵感收集", icon: "💡", links: [
    { title: "Awwwards", desc: "全球最佳网站设计与开发奖项", url: "https://www.awwwards.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "SiteSee", desc: "精选现代网站画廊", url: "https://sitesee.co/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Httpster", desc: "精选优秀网站设计案例", url: "https://httpster.net/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Land-book", desc: "优质落地页设计参考", url: "https://land-book.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Lapa Ninja", desc: "全球最佳着陆页灵感", url: "https://www.lapa.ninja/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Godly", desc: "精选网站设计灵感", url: "https://godly.website/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Screen Lane", desc: "应用与网站界面截图库", url: "https://screenlane.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Web Design Inspiration", desc: "网页设计灵感集合", url: "https://www.webdesign-inspiration.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "One Page Love", desc: "单页网站设计灵感", url: "https://onepagelove.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Design Inspiration", desc: "平面与网页设计灵感", url: "https://www.designspiration.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "图标素材", icon: "🔤", links: [
    { title: "Iconfont", desc: "阿里妈妈图标管理平台", url: "https://www.iconfont.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Font Awesome", desc: "最流行的图标字体库", url: "https://fontawesome.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Material Icons", desc: "Google Material Design 图标", url: "https://material.io/resources/icons/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Iconify", desc: "汇聚所有开源图标集", url: "https://iconify.design/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Flaticon", desc: "全球最大免费图标库", url: "https://www.flaticon.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "IconMonstr", desc: "免费图标字体资源", url: "https://iconmonstr.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Nucleo", desc: "优质图标素材库", url: "https://nucleoapp.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "SVG Repo", desc: "免费开源 SVG 图标", url: "https://www.svgrepo.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Heroicons", desc: "Tailwind 出品的手工图标", url: "https://heroicons.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Feather Icons", desc: "简洁美观的开源图标", url: "https://feathericons.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "配色工具", icon: "🎨", links: [
    { title: "Khroma", desc: "AI 配色方案生成器", url: "http://khroma.co/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Coolors", desc: "快速配色方案生成", url: "https://coolors.co/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Web Gradients", desc: "180 款渐变背景合集", url: "https://webgradients.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Adobe Color", desc: "Adobe 配色社区与工具", url: "https://color.adobe.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Color Claim", desc: "独特颜色组合收集", url: "https://colorclaim.tumblr.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "UI Gradients", desc: "精美渐变配色方案", url: "https://uigradients.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Color Hunt", desc: "精选配色方案社区", url: "https://colorhunt.co/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Happy Hues", desc: "即用型配色调色板", url: "https://www.happyhues.co/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Paletton", desc: "色环配色工具", url: "https://paletton.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Material Palette", desc: "Material Design 配色生成", url: "https://www.materialpalette.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "图片素材", icon: "🖼️", links: [
    { title: "Unsplash", desc: "免费高质量摄影图片", url: "https://unsplash.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Pexels", desc: "免费商用高清图片", url: "https://www.pexels.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Pixabay", desc: "免费图片与矢量素材", url: "https://pixabay.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "TinyPNG", desc: "在线图片压缩神器", url: "https://tinypng.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Remove.bg", desc: "一键智能抠图", url: "https://www.remove.bg/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Mockup Zone", desc: "免费/付费 PSD 样机", url: "https://mockupzone.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Smartmockups", desc: "在线样机生成工具", url: "https://smartmockups.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Lorem Picsum", desc: "随机占位图片服务", url: "https://picsum.photos/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Wallhaven", desc: "高清壁纸下载", url: "https://wallhaven.cc/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "StockSnap", desc: "免费商用图片素材", url: "https://stocksnap.io/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "开发工具", icon: "💻", links: [
    { title: "GitHub", desc: "全球最大代码托管平台", url: "https://github.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Gitee", desc: "国内代码托管平台", url: "https://gitee.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "GitLab", desc: "一体化 DevOps 平台", url: "https://gitlab.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Vercel", desc: "前端项目零配置部署", url: "https://vercel.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Netlify", desc: "现代网站构建与部署", url: "https://netlify.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "CodePen", desc: "在线前端代码编辑", url: "https://codepen.io/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "JSFiddle", desc: "在线 JavaScript 调试", url: "https://jsfiddle.net/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "npm", desc: "JavaScript 包管理器", url: "https://www.npmjs.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Can I Use", desc: "前端兼容性查询", url: "https://caniuse.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Carbon", desc: "代码截图美化", url: "https://carbon.now.sh/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "社区咨询", icon: "📰", links: [
    { title: "雷锋网", desc: "人工智能与智能硬件资讯", url: "https://www.leiphone.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "36氪", desc: "新商业媒体与创业资讯", url: "https://36kr.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "人人都是产品经理", desc: "产品经理学习交流平台", url: "http://www.woshipm.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "知乎", desc: "中文互联网问答社区", url: "https://www.zhihu.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "掘金", desc: "面向程序员的技术社区", url: "https://juejin.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "前端网", desc: "前端开发者社区", url: "https://qianduan.net/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "InfoQ", desc: "IT 新闻与深度技术内容", url: "https://www.infoq.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "CSS-Tricks", desc: "CSS 与前端技巧教程", url: "https://css-tricks.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Smashing Magazine", desc: "Web 设计与开发深度文章", url: "https://www.smashingmagazine.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "A List Apart", desc: "Web 标准与设计思考", url: "https://alistapart.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "AI 工具", icon: "🤖", links: [
    { title: "ChatGPT", desc: "OpenAI 智能对话助手", url: "https://chat.openai.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Claude", desc: "Anthropic 智能助手", url: "https://claude.ai/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Midjourney", desc: "AI 艺术绘画生成", url: "https://www.midjourney.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "通义千问", desc: "阿里 AI 大模型", url: "https://tongyi.aliyun.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "文心一言", desc: "百度 AI 对话助手", url: "https://yiyan.baidu.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "DeepSeek", desc: "深度求索 AI 助手", url: "https://www.deepseek.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Notion AI", desc: "智能笔记与写作", url: "https://www.notion.so/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "GitHub Copilot", desc: "AI 代码补全助手", url: "https://github.com/features/copilot", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "日常工具", icon: "🛠️", links: [
    { title: "网络剪贴板", desc: "在线跨屏剪切文字", url: "https://netcut.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "草料二维码", desc: "在线二维码生成工具", url: "https://cli.im/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "RegExr", desc: "正则表达式在线测试", url: "https://regexr.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Excalidraw", desc: "手绘风格在线白板", url: "https://excalidraw.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Muse Transfer", desc: "无需注册大文件传输", url: "https://musetransfer.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Google 翻译", desc: "免费在线语言翻译", url: "https://translate.google.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Stack Overflow", desc: "程序员问答社区", url: "https://stackoverflow.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "MDN Web Docs", desc: "Web 技术权威文档", url: "https://developer.mozilla.org/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "影视影音", icon: "🎬", links: [
    { title: "Bilibili", desc: "国内弹幕视频网站", url: "https://www.bilibili.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "YouTube", desc: "全球最大视频平台", url: "https://www.youtube.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "网易云音乐", desc: "在线音乐播放平台", url: "https://music.163.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "豆瓣", desc: "电影/书籍/音乐评分", url: "https://www.douban.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "爱奇艺", desc: "在线影视平台", url: "https://www.iqiyi.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "腾讯视频", desc: "腾讯视频在线平台", url: "https://v.qq.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "优酷", desc: "阿里文娱视频平台", url: "https://www.youku.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Spotify", desc: "全球流媒体音乐服务", url: "https://www.spotify.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "云盘存储", icon: "☁️", links: [
    { title: "阿里云盘", desc: "阿里云盘存储服务", url: "https://www.aliyundrive.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "百度网盘", desc: "百度云存储服务", url: "https://pan.baidu.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "123 云盘", desc: "不限速网盘", url: "https://www.123pan.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "蓝奏云", desc: "小文件快速分享", url: "https://www.lanzou.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "OneDrive", desc: "微软云存储服务", url: "https://onedrive.live.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "Google Drive", desc: "Google 云端硬盘", url: "https://drive.google.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "坚果云", desc: "专业同步网盘", url: "https://www.jianguoyun.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "腾讯微云", desc: "腾讯云存储服务", url: "https://www.weiyun.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]},
  { category: "友情链接", icon: "🔗", links: [
    { title: "一为导航", desc: "onenav 主题演示站", url: "https://nav.iowen.cn/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "趣导航", desc: "简洁网址导航站", url: "https://qssily.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "果核剥壳", desc: "软件分享与下载社区", url: "https://www.ghxi.com/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` },
    { title: "老男人游戏网", desc: "仓储式主机游戏资源站", url: "https://www.oldmantvg.net/", icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>` }
  ]}
];

// ============ 渲染逻辑 ============
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