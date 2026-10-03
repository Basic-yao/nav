# Nav · 个人导航页

一个轻量、纯净、自托管的浏览器新标签页导航页。左侧分类栏 + 卡片网格，深浅色自动跟随系统。

## 特性

- 纯前端，零依赖，无需构建
- 左侧栏分类导航，点击平滑滚动
- 顶部实时搜索（按 `/` 聚焦）
- 深浅色自动跟随系统
- 响应式布局，移动端适配

## 文件结构

```
nav/
├── index.html      # 页面结构
├── styles.css      # 样式（深浅色跟随系统）
├── app.js          # 数据 + 渲染 + 搜索
├── .gitattributes  # 统一 LF 换行
└── README.md
```

## 自定义

编辑 `app.js` 中的 `navData` 数组，按需增删分类和链接：

```js
{
  category: "分类名",
  links: [
    { title: "网站名", url: "https://...", desc: "描述" }
  ]
}
```

## 部署

推送到 GitHub 后，在仓库 Settings → Pages 开启 GitHub Pages 即可自动发布。

访问地址：`https://你的用户名.github.io/nav`
