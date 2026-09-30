# 我的导航页 🚀

一个自托管的浏览器新标签页导航，纯静态、零后端、全前端驱动。

> 打开新标签页 = 你自己的导航站，支持系统跟随主题、搜索、分组、拖拽排序、天气时钟。

---

## ✨ 功能一览

| 功能 | 说明 |
|------|------|
| 🌓 系统跟随主题 | 自动跟随系统浅色/深色，按钮可手动覆盖 |
| 🔍 搜索框 | 实时过滤站点，回车直跳或调用搜索引擎 |
| 📂 分组管理 | JSON 驱动，改数据即更新 |
| 🔎 多搜索引擎 | Google / Bing / DuckDuckGo / GitHub / npm 一键切换 |
| 🖼 Favicon | 自动获取站点图标，支持本地缓存 + Cloudflare Worker 代理 |
| 🔄 拖拽排序 | 卡片拖拽交换位置（当前会话） |
| ⌨️ 键盘快捷键 | `/` 聚焦、`1-9` 打开分组、`↑↓` 选择卡片 |
| 🌤 天气 + 时钟 | 自动定位天气，实时时钟 |
| 📥 书签导入 | 浏览器书签 HTML 一键转 nav.json |
| 🐳 Docker 开发 | 一条命令本地跑起来 |
| 🤖 自动部署 | GitHub Actions → GitHub Pages，改 JSON 即更新 |

---

## 🚀 快速部署

### 1. 克隆仓库

```bash
git clone https://github.com/<你的用户名>/<仓库名>.git
cd <仓库名>
```

### 2. 开启 GitHub Pages

1. 仓库 → **Settings** → **Pages**
2. **Source** 选 **GitHub Actions**
3. 推送代码后自动部署

### 3. 访问地址

```
https://<你的用户名>.github.io/<仓库名>/
```

### 4. 浏览器新标签页

安装扩展（任选其一）：
- Chrome: **Custom New Tab URL**
- Edge: **Custom New Tab**

扩展设置中填入 Pages 地址即可。

---

## 📝 维护指南

### 添加 / 编辑站点

只改一个文件：`data/nav.json`

```json
{
  "name": "开发",
  "sites": [
    {
      "title": "GitHub",
      "url": "https://github.com",
      "desc": "代码托管"
    }
  ]
}
```

改完 `git push` → 1 分钟内自动生效。

### 添加搜索引擎

在 `data/nav.json` 的 `settings.searchEngines` 里加：

```json
"baidu": { "label": "百度", "url": "https://www.baidu.com/s?wd=" }
```

### 添加分组

在 `data/nav.json` 的 `groups` 数组里加一个新对象即可。

---

## ⌨️ 快捷键

| 快捷键 | 效果 |
|--------|------|
| `/` | 聚焦搜索框 |
| `Esc` | 清空搜索 |
| `↑` `↓` | 键盘选择卡片 |
| `Enter` | 打开选中站点 / 搜索 |
| `1` - `9` | 打开第 N 组第一个站点 |
| `Shift` + `1` - `9` | 新标签打开第 N 组第一个 |
| 🖥️ 按钮 | 循环切换：系统 → 深色 → 浅色 |

---

## 🖼 Favicon 配置（可选）

### 方案 A：Cloudflare Worker 代理（推荐，国内稳）

1. 去 [dash.cloudflare.com](https://dash.cloudflare.com) → Workers → Create
2. 复制 `scripts/worker-favicon.js` 内容到编辑器
3. 部署后复制地址
4. 编辑 `app.js`，把 `FAVICON_PROXY` 改成你的地址：

```js
const FAVICON_PROXY = "https://favicon-proxy.<你>.workers.dev/?u=";
```

### 方案 B：本地缓存（Actions 自动抓取）

每周一自动运行 `scripts/fetch-icons.js`，图标存到 `icons/` 目录。

手动触发：仓库 → Actions → Cache Favicons → Run workflow

### 方案 C：什么都不配

`FAVICON_PROXY` 留空即可，页面会尝试读 `icons/` 目录，没有就隐藏图标占位。

---

## 📥 导入浏览器书签

1. 浏览器 → 书签管理器 → 导出为 HTML（得到 `bookmarks.html`）
2. 安装依赖：`npm install`
3. 转换：`node scripts/bookmarks-to-nav.js bookmarks.html --output data/nav.json`
4. 提交：`git add data/nav.json && git commit -m "feat: import bookmarks" && git push`

---

## 🐳 Docker 本地开发

```bash
# 启动
docker compose up -d

# 访问 http://localhost:8080

# 停止
docker compose down
```

或用任意静态服务器：

```bash
npx serve .
# 或
python -m http.server 8000
```

---

## 🌤 天气配置（可选）

默认使用浏览器定位 + Open-Meteo API（免费无 key）。

如果浏览器拒绝定位，自动降级到 IP 城市。

如需切换天气源，改 `app.js` 中 `loadWeather()` 函数。

---

## 📁 文件结构

```
.
├── README.md
├── docker-compose.yml        # Docker 本地开发
├── index.html                # 页面入口
├── styles.css                # 样式（含暗色变量）
├── app.js                    # 全部逻辑
├── package.json              # jsdom 依赖
├── .gitignore
├── .nojekyll                 # 禁用 Jekyll
├── data/
│   └── nav.json              # 站点数据（唯一需要维护的文件）
├── icons/                    # favicon 缓存（Actions 自动填充）
├── scripts/
│   ├── fetch-icons.js        # 图标抓取脚本
│   ├── worker-favicon.js     # Cloudflare Worker 代码（可选）
│   └── bookmarks-to-nav.js   # 书签导入脚本
└── .github/workflows/
    ├── deploy.yml            # 部署 Pages
    └── cache-icons.yml       # 定时缓存图标
```

---

## 🛠 本地开发

```bash
# 安装依赖（书签导入用）
npm install

# 启动
docker compose up -d
# 或
npx serve .
```

> 天气和定位功能需要 `https` 或 `localhost`，纯 `file://` 打开会失败。

---

## 🔧 常见问题

### 图标不显示？

1. 确认 `icons/` 目录有对应文件
2. 或配置 `FAVICON_PROXY` 走 Worker 代理
3. 检查浏览器控制台是否有 CORS 报错

### 主题不跟随系统？

- 确认浏览器支持 `prefers-color-scheme`
- 清除 `localStorage` 中的 `theme` 键
- 点击 🖥️ 按钮切回"系统"模式

### 天气显示"暂不可用"？

- 检查网络是否能访问 `api.open-meteo.com`
- 定位被拒时自动降级 IP 城市，检查 `ipapi.co` 是否可达

---

## 📄 License

MIT — 随便用、随便改

---

## 🙋 问题 / 建议

开 Issue 或 PR，欢迎贡献。
