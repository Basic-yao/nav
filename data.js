// ============================================================
// ★ 数据区：添加/删除网站链接只改这里
// ============================================================
const navData = [
  {
    category: '常用工具',
    icon: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    links: [
      { title: '网络剪贴板', url: 'https://netcut.cn/', desc: '在线跨屏剪切文字', icon: 'https://www.google.com/s2/favicons?domain=netcut.cn' },
      { title: '草料二维码', url: 'https://cli.im/url', desc: '在线二维码生成工具', icon: 'https://www.google.com/s2/favicons?domain=cli.im' },
      { title: '在线文件传输', url: 'https://musetransfer.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=musetransfer.com' }
    ]
  },
  {
    category: '云服务平台',
    icon: '<svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    links: [
      { title: 'Github', url: 'https://github.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=github.com' }
    ]
  },
  {
    category: '网络资源',
    icon: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    children: [
      { label: '软件', links: [{ title: '果核剥壳', url: 'https://www.ghxi.com/', desc: '互联网的净土。PC软件，手机软件，正版软件，破解软件', icon: 'https://www.google.com/s2/favicons?domain=ghxi.com' }] },
      { label: '游戏', links: [{ title: '老男人游戏网', url: 'https://www.oldmantvg.net/', desc: '仓储式主机资源站 精校 完整 极致 静待您的垂青', icon: 'https://www.google.com/s2/favicons?domain=oldmantvg.net' }] }
    ],
    links: []
  },
  {
    category: '影视影音',
    icon: '<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
    children: [
      { label: '影视', links: [{ title: '阿里小站', url: 'https://pan666.cn', desc: '阿里云盘资源共享站。人人为我，我为人人的共享资源社区', icon: 'https://www.google.com/s2/favicons?domain=pan666.cn' }] },
      { label: '字幕', links: [
        { title: '字幕库', url: 'https://zmk.pw/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=zmk.pw' },
        { title: 'SubHD', url: 'https://subhd.tv/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=subhd.tv' }
      ] },
      { label: '音乐', links: [
        { title: '果核音乐搜搜', url: 'https://music.ghxi.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=music.ghxi.com' },
        { title: '音乐磁场', url: 'https://www.hifini.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=hifini.com' }
      ] }
    ],
    links: []
  },
  {
    category: '友情链接',
    icon: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    links: [
      { title: '一为导航', url: 'https://nav.iowen.cn/', desc: 'onenav主题演示站', icon: 'https://www.google.com/s2/favicons?domain=nav.iowen.cn' },
      { title: '趣导航', url: 'https://qssily.com/', desc: '', icon: 'https://www.google.com/s2/favicons?domain=qssily.com' }
    ]
  }
];
// ============================================================
