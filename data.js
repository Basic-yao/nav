// ============================================================
// 数据区：分组已按你要求的顺序排列，操作系统放最后
// 图标为 Lucide 线条风格
// ============================================================
const navData = [
  {
    "category": "常用网站",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></svg>",
    "links": [
      {
        "title": "Github",
        "url": "https://github.com/",
        "desc": "全球最大的开源仓库",
        "icon": "https://github.githubassets.com/favicons/favicon.svg"
      },
      {
        "title": "Gitee",
        "url": "https://gitee.com/",
        "desc": "基于 Git 的代码托管和研发协作平台",
        "icon": "https://gitee.com/favicon.ico"
      },
      {
        "title": "万能视频下载",
        "url": "https://greenvideo.cc/",
        "desc": "视频下载,微博视频下载,短视频下载,无水印视频下载,油管视频下载,快手视频下载,全能视频下载,万能视频下载",
        "icon": "https://greenvideo.cc/favicon.ico"
      }
      {
        "title": "视频下载工具",
        "url": "https://www.convry.com/",
        "desc": "致力打造即用即走型在线工具箱",
        "icon": "https://www.convry.com/favicon.ico"
      }
    ]
  },
  {
    "category": "电视应用",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"7\" width=\"20\" height=\"15\" rx=\"2\"/><polyline points=\"17 2 12 7 7 2\"/></svg>",
    "links": [
      {
        "title": "王二小放牛娃",
        "url": "https://9280.kstore.space/newwex.json",
        "desc": "TVBox数据源",
        "icon": "https://icons.duckduckgo.com/ip3/9280.kstore.space.ico"
      },
      {
        "title": "IPTV 直播源",
        "url": "https://iptv.hacks.tools/",
        "desc": "全部频道 IPTV 直播源 | 免费国际电视直播源",
        "icon": "https://iptv.hacks.tools/favicon.svg"
      },
      {
        "title": "TVBox全链路资源",
        "url": "https://zoo.ink/tvbox.html",
        "desc": "TVBox全链路资源聚合导航页，汇集TvBox相关软件下载、接口地址与资源站点，为电视盒子用户提供一站式的免费影视观影资源索引与配置指南。",
        "icon": "https://zoo.ink/wp-content/themes/zoo/assets/img/favicon.png"
      },
      {
        "title": "淘IPTV",
        "url": "https://taoiptv.com/",
        "desc": "全网自动搜集酒店源和组播源，过滤低分辨率保留1920x1080高清，筛选播放速度优质流畅源，IPTV频道每天2次自动检测、发布最新的有效源。",
        "icon": "https://taoiptv.com/upload/20240312/ab83c2f29ff9c2.jpg"
      }
    ]
  },
  {
    "category": "软件下载",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>",
    "links": [
      {
        "title": "果核剥壳",
        "url": "https://www.ghxi.com/",
        "desc": "互联网的净土。PC软件，手机软件，正版软件，破解软件",
        "icon": "https://www.google.com/s2/favicons?domain=ghxi.com"
      },
      {
        "title": "腾讯软件中心",
        "url": "https://pc.qq.com/",
        "desc": "腾讯官方软件下载平台",
        "icon": "https://www.google.com/s2/favicons?domain=pc.qq.com"
      }
    ]
  },
  {
    "category": "生活应用",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"/></svg>",
    "links": [
      {
        "title": "iFixit：免费修理手册",
        "url": "https://zh.ifixit.com/",
        "desc": "iFixit 是一个以维修为主题的全球性互助社区。从一个一个的设备开始，让我们来一步一个脚印一点一点的修复这个世界。你可以在问题解答论坛和专家一起互动——还可以创建并与全世界分享由你编篡的维修手册。你可以在这里买到所有关于你的 DIY 维修计划的配件及工具，帮助修复好你的苹果或安卓设备。",
        "icon": "https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-96x96.png"
      },
      {
        "title": "56IDC.Net",
        "url": "https://56idc.net/store/hk-vps",
        "desc": "HK卡 - 56IDC.Net | 无聊云",
        "icon": "https://56idc.net/assets/img/logo.png"
      },
      {
        "title": "香港共用月神卡",
        "url": "https://store.cuniq.com/tc/services-plan/cuniq-go/cuniq-go-monthly",
        "desc": "內地及香港共用月神卡｜中國聯通(香港)CUniq網上商城",
        "icon": "https://store.cuniq.com/logo.ico"
      },
      {
        "title": "问真八字在线排盘",
        "url": "https://pcbz.iwzwh.com/",
        "desc": "网页版问真八字在线排盘，免下载使用，更适合专业命理师的选择。为您提供八字命盘准确信息、命例云存储、真太阳时、AI智能提示格局、旺衰、五行能量、八字合婚、玄学学堂、名人八字库、断事笔记等功能。",
        "icon": "https://pcbz.iwzwh.com/favicon.ico"
      },
      {
        "title": "88看球直播",
        "url": "https://www.88kq.org/",
        "desc": "88直播地址发布页_NBA足球免费直播_收藏不迷路",
        "icon": "https://www.88kq.org/img/88.png"
      },
      {
        "title": "卜易居算命网",
        "url": "https://www.buyiju.com/",
        "desc": "免费算命,生辰八字算命,周易占卜,姓名测试打分-卜易居算命网",
        "icon": "https://i.buyiju.com/favicon.ico"
      },
      {
        "title": "倪海厦大全集",
        "url": "http://www.finalhopes.com/",
        "desc": "经方派倪海厦大全集和医案在线查询,下载,自学中医和中医入门经验分享指导",
        "icon": "http://www.finalhopes.com/favicon.ico"
      }
    ]
  },
  {
    "category": "实用工具",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>",
    "links": [
      {
        "title": "节点小宝",
        "url": "https://iepose.com/",
        "desc": "节点小宝,节点小宝官网,内网穿透,异地组网,远程访问,NAS远程,P2P直连,无需公网IP,远程桌面,远程办公",
        "icon": "https://cdn.iepose.com/iepose_pc/favicon.ico"
      },
      {
        "title": "易采集Easy Spider",
        "url": "https://www.easyspider.net",
        "desc": "可视化爬虫, 不需要写代码, 无代码, 开源, 免费, 浏览器自动化测试工具, 机器人流程自动化, RPA",
        "icon": "https://www.easyspider.net/favicon.ico"
      },
      {
        "title": "tailscale.com",
        "url": "https://tailscale.com/",
        "desc": "一个免费的异地联网打洞工具",
        "icon": "https://tailscale.com/favicon.ico"
      },
      {
        "title": "硬盘检测修复工具",
        "url": "https://www.victoria-ssd-hdd.cn/",
        "desc": "Victoria SSD/HDD 是一款免费、专业的硬盘检测与修复工具，同时支持机械硬盘（HDD）与固态硬盘（SSD）。提供表面扫描、S.M.A.R.T. 监测、坏道修复、安全擦除等功能，深耕硬盘底层 20 余年，深受全球技术爱好者信赖。",
        "icon": "https://www.victoria-ssd-hdd.cn/images/logo.png"
      },
      {
        "title": "BTSOU",
        "url": "https://www.mefcl.com/btresourcesearch.html",
        "desc": "磁力资源搜索助手 | BTSOU Plus",
        "icon": "https://www.mefcl.com/favicon.ico"
      },
      {
        "title": "在线配色器",
        "url": "https://www.chinavid.com/color.html",
        "desc": "在线配色器-在线色彩搭配和色彩配色方案",
        "icon": "https://www.chinavid.com/wp-content/themes/Vstyle/assets/img/favicon.ico"
      }
    ]
  },
  {
    "category": "素材资源",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>",
    "links": [
      {
        "title": "magnific.com",
        "url": "https://www.magnific.com/",
        "desc": "原Freepik.com",
        "icon": "https://media.magnific.com/magnific-favicons/favicon.ico?v=2"
      }
    ]
  },
  {
    "category": "网络书籍",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg>",
    "links": [
      {
        "title": "Z-Library",
        "url": "https://zh.101isfj.ru/",
        "desc": "世界上最大的电子图书馆。自由访问知识和文化。",
        "icon": "https://zh.101isfj.ru/img/favicons/apple-touch-icon.png?v=1"
      }
    ]
  },
  {
    "category": "网盘云储",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z\"/></svg>",
    "links": [
      {
        "title": "阿里小站",
        "url": "https://pan666.cn",
        "desc": "阿里云盘资源共享站。人人为我，我为人人的共享资源社区",
        "icon": "https://www.google.com/s2/favicons?domain=pan666.cn"
      }
    ]
  },
  {
    "category": "学习资源",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"/><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"/></svg>",
    "links": [
      {
        "title": "Fmhy.net",
        "url": "https://fmhy.net/",
        "desc": "互联网上的免费资源收藏！",
        "icon": "https://fmhy.net/hall.png"
      },
      {
        "title": "新华字典",
        "url": "https://www.hao86.com/",
        "desc": "新华字典,成语,诗词,在线翻译,谜语,歇后语",
        "icon": "https://www.hao86.com/favicon.ico"
      }
    ]
  },
  {
    "category": "操作系统",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\"/><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"/><line x1=\"9\" y1=\"1\" x2=\"9\" y2=\"4\"/><line x1=\"15\" y1=\"1\" x2=\"15\" y2=\"4\"/><line x1=\"9\" y1=\"20\" x2=\"9\" y2=\"23\"/><line x1=\"15\" y1=\"20\" x2=\"15\" y2=\"23\"/><line x1=\"20\" y1=\"9\" x2=\"23\" y2=\"9\"/><line x1=\"20\" y1=\"14\" x2=\"23\" y2=\"14\"/><line x1=\"1\" y1=\"9\" x2=\"4\" y2=\"9\"/><line x1=\"1\" y1=\"14\" x2=\"4\" y2=\"14\"/></svg>",
    "links": [
      {
        "title": "Windows 11",
        "url": "https://www.microsoft.com/zh-cn/software-download/windows11",
        "desc": "微软官方 Windows 11 下载",
        "icon": "https://www.microsoft.com/favicon.ico?v2"
      },
      {
        "title": "Ubuntu",
        "url": "https://ubuntu.com/download/desktop",
        "desc": "Linux 桌面发行版",
        "icon": "https://www.google.com/s2/favicons?domain=ubuntu.com"
      },
      {
        "title": "macOS",
        "url": "https://www.apple.com/macos/",
        "desc": "Apple 官方 macOS 页面",
        "icon": "https://www.google.com/s2/favicons?domain=apple.com"
      }
    ]
  }
];
