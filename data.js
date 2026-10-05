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
        "title": "一为导航",
        "url": "https://nav.iowen.cn/",
        "desc": "onenav主题演示站",
        "icon": "https://www.google.com/s2/favicons?domain=nav.iowen.cn"
      },
      {
        "title": "趣导航",
        "url": "https://qssily.com/",
        "desc": "",
        "icon": "https://www.google.com/s2/favicons?domain=qssily.com"
      }
    ]
  },
  {
    "category": "电视应用",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"7\" width=\"20\" height=\"15\" rx=\"2\"/><polyline points=\"17 2 12 7 7 2\"/></svg>",
    "links": [
      {
        "title": "字幕库",
        "url": "https://zmk.pw/",
        "desc": "",
        "icon": "https://www.google.com/s2/favicons?domain=zmk.pw"
      },
      {
        "title": "SubHD",
        "url": "https://subhd.tv/",
        "desc": "",
        "icon": "https://www.google.com/s2/favicons?domain=subhd.tv"
      },
      {
        "title": "当贝市场",
        "url": "http://www.dangbei.com/",
        "desc": "TV端应用商店",
        "icon": "https://www.google.com/s2/favicons?domain=dangbei.com"
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
        "title": "老男人游戏网",
        "url": "https://www.oldmantvg.net/",
        "desc": "仓储式主机资源站 精校 完整 极致 静待您的垂青",
        "icon": "https://www.google.com/s2/favicons?domain=oldmantvg.net"
      },
      {
        "title": "音乐磁场",
        "url": "https://www.hifini.com/",
        "desc": "",
        "icon": "https://www.google.com/s2/favicons?domain=hifini.com"
      },
      {
        "title": "果核音乐搜搜",
        "url": "https://music.ghxi.com/",
        "desc": "",
        "icon": "https://www.google.com/s2/favicons?domain=music.ghxi.com"
      }
    ]
  },
  {
    "category": "实用工具",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>",
    "links": [
      {
        "title": "网络剪贴板",
        "url": "https://netcut.cn/",
        "desc": "在线跨屏剪切文字",
        "icon": "https://www.google.com/s2/favicons?domain=netcut.cn"
      },
      {
        "title": "草料二维码",
        "url": "https://cli.im/url",
        "desc": "在线二维码生成工具",
        "icon": "https://www.google.com/s2/favicons?domain=cli.im"
      },
      {
        "title": "在线文件传输",
        "url": "https://musetransfer.com/",
        "desc": "",
        "icon": "https://www.google.com/s2/favicons?domain=musetransfer.com"
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
    "links": []
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
    "links": []
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
