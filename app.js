// ============================================================
// 核心逻辑
// ============================================================

const navIcons = {};
navData.forEach(d => navIcons[d.category] = d.icon);

const searchEngines = {
  '站内': { url: '', label: '站内搜索' },
  'Bing': { url: 'https://cn.bing.com/search?q=', label: 'Bing 搜索' },
  '百度': { url: 'https://www.baidu.com/s?wd=', label: '百度一下' },
  'Google': { url: 'https://www.google.com/search?q=', label: 'Google 搜索' }
};
let currentEngine = '站内';

const html = document.documentElement;
const logo = document.getElementById('logo');
const navList = document.getElementById('navList');
const content = document.getElementById('content');
const themeBtn = document.getElementById('themeBtn');
const searchTags = document.getElementById('searchTags');
const subSearchInput = document.getElementById('subSearchInput');
const subSearchBtn = document.getElementById('subSearchBtn');

// ===== SVG 命名空间（必须显式声明，Safari 才能识别动态创建的 SVG）=====
const SVG_NS = 'http://www.w3.org/2000/svg';

// ===== 把 data.js 里的 SVG 字符串解析成真实 SVG 元素 =====
// 用 DOMParser 解析，规避 Safari 对 innerHTML 插入自闭合 SVG 标签的解析差异
// 线条风图标的默认描边属性
const STROKE_ATTRS = {
  'fill': 'none',
  'stroke': 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
};

function svgFromString(str) {
  if (!str) return null;
  try {
    const doc = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg">' + str + '</svg>',
      'image/svg+xml'
    );
    if (doc.querySelector('parsererror')) return null;
    // 取根 svg 的第一个元素（真正的图标节点）
    const child = doc.documentElement.firstElementChild;
    if (!child) return null;
    // 克隆到当前文档上下文
    const node = document.importNode(child, true);

    // 若内部图形本身没声明 fill/stroke，则统一套用线条描边，
    // 保证图标永远是线条风，不会变成实心块
    for (const [k, v] of Object.entries(STROKE_ATTRS)) {
      if (!node.hasAttribute(k)) node.setAttribute(k, v);
    }
    return node;
  } catch (e) {
    return null;
  }
}

// ===== 卡片图标兜底：favicon 失败时用「首字母色块」代替空白 =====
// 首字母取 title，颜色按 title 哈希固定，保证同一站点颜色稳定
function getFallback(l) {
  const ch = (l.title || '?').trim().charAt(0).toUpperCase();
  let hash = 0;
  const seed = l.title || l.url || '';
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = hash % 360;
  return { ch, hue };
}

// ===== 卡片模板 =====
function cardTpl(l) {
  const fb = getFallback(l);
  const bg = `hsl(${fb.hue}, 65%, 88%)`;
  const fg = `hsl(${fb.hue}, 45%, 32%)`;
  const safeUrl = (l.url || '').replace(/"/g, '&quot;');
  return `<a href="${safeUrl}" target="_blank" class="card">
    <div class="card-icon">
      <img src="${l.icon}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${fb.ch}',className:'card-fallback',style:'background:${bg};color:${fg}'}))">
    </div>
    <div>
      <div class="card-title">${l.title}</div>
      <div class="card-desc">${l.desc}</div>
    </div>
  </a>`;
}

// ===== 渲染内容区 =====
// 分类标题的图标取用规则：
//   1) 该分类在 navData 中登记过 icon（顶层分类）        → 用它
//   2) 子分类有自己的 icon（data.js 里可选填 icon 字段） → 用它
//   3) 都没有                                             → 回退到父级分类的图标
// 这样「软件 / 游戏」这类子分类也会显示对应线条图标，而不是空白
function getSectionIcon(sec, ch) {
  if (ch && ch.icon) return svgToString(svgFromString(ch.icon));
  const byKey = navIcons[ch ? ch.label : sec.category];
  if (byKey) return svgToString(svgFromString(byKey));
  return svgToString(svgFromString(navIcons[sec.category]));
}
function svgToString(node) {
  if (!node) return '';
  const clone = node.cloneNode(true);
  clone.setAttribute('width', '18');
  clone.setAttribute('height', '18');
  clone.classList.add('section-icon');
  return new XMLSerializer().serializeToString(clone);
}

function renderContent(data) {
  content.innerHTML = '';
  if (!data || data.length === 0) {
    content.innerHTML = `<div class="empty">未找到相关内容</div>`;
    return;
  }
  data.forEach(sec => {
    if (sec.children && sec.children.length > 0) {
      sec.children.forEach(ch => {
        if (!ch.links || ch.links.length === 0) return;
        content.innerHTML += `<h2 class="section-title">${getSectionIcon(sec, ch)}<span>${ch.label}</span></h2><div class="grid">${ch.links.map(l => cardTpl(l)).join('')}</div>`;
      });
    } else {
      const allLinks = [...(sec.links || [])];
      if (allLinks.length === 0) return;
      content.innerHTML += `<h2 class="section-title">${getSectionIcon(sec)}<span>${sec.category}</span></h2><div class="grid">${allLinks.map(l => cardTpl(l)).join('')}</div>`;
    }
  });
}

// ===== 站内搜索（核心：实时过滤）=====
function doLocalSearch(kw) {
  kw = (kw || '').trim();
  if (!kw) {
    // 空关键词 → 显示全量
    renderContent(navData.filter(s => s.links?.length > 0 || s.children?.some(c => c.links?.length > 0)));
    return;
  }
  const lower = kw.toLowerCase();
  const hitData = navData.map(sec => {
    const hitLinks = (sec.links || []).filter(l =>
      (l.title || '').toLowerCase().includes(lower) ||
      (l.desc || '').toLowerCase().includes(lower)
    );
    const hitChildren = (sec.children || []).map(ch => ({
      ...ch,
      links: (ch.links || []).filter(l =>
        (l.title || '').toLowerCase().includes(lower) ||
        (l.desc || '').toLowerCase().includes(lower)
      )
    })).filter(ch => ch.links.length > 0);
    return { ...sec, links: hitLinks, children: hitChildren };
  }).filter(sec => sec.links.length > 0 || sec.children.length > 0);
  renderContent(hitData);
}

// ===== 外站搜索 =====
function doWebSearch(kw) {
  kw = kw.trim();
  if (!kw) return;
  window.open(searchEngines[currentEngine].url + encodeURIComponent(kw), '_blank');
}

// ===== 渲染引擎标签 =====
function renderSearchTags() {
  const tags = ['站内', 'Bing', '百度', 'Google'];
  searchTags.innerHTML = tags.map((t, i) => {
    if (i < tags.length - 1) {
      return `<span class="tag ${t === currentEngine ? 'active' : ''}" data-engine="${t}">${t}</span><span class="arrow">></span>`;
    }
    return `<span class="tag ${t === currentEngine ? 'active' : ''}" data-engine="${t}">${t}</span>`;
  }).join('');
  searchTags.querySelectorAll('.tag').forEach(t => {
    t.onclick = () => {
      currentEngine = t.dataset.engine;
      subSearchInput.placeholder = currentEngine === '站内'
        ? '按 / 快速唤起站内搜索'
        : searchEngines[currentEngine].label;
      renderSearchTags();
      // 切到站内时立即聚焦输入框（手机端自动弹出键盘）
      if (currentEngine === '站内') {
        subSearchInput.focus();
        doLocalSearch(subSearchInput.value);
      }
    };
  });
}

// ===== ★ 实时搜索：input 事件（每输入一个字就触发）=====
subSearchInput.addEventListener('input', (e) => {
  if (currentEngine === '站内') {
    doLocalSearch(e.target.value);
  }
});

// ===== 回车 / 点击按钮 =====
subSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (currentEngine === '站内') {
      doLocalSearch(subSearchInput.value);
    } else {
      doWebSearch(subSearchInput.value);
    }
  }
});

subSearchBtn.addEventListener('click', () => {
  if (currentEngine === '站内') {
    doLocalSearch(subSearchInput.value);
  } else {
    doWebSearch(subSearchInput.value);
  }
});

// ===== 全局 / 键唤起站内搜索 =====
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== subSearchInput) {
    e.preventDefault();
    currentEngine = '站内';
    subSearchInput.placeholder = '按 / 快速唤起站内搜索';
    renderSearchTags();
    subSearchInput.value = '';
    subSearchInput.focus();
    renderContent(navData.filter(s => s.links?.length > 0 || s.children?.some(c => c.links?.length > 0)));
  }
});

// ===== 侧边栏渲染 =====
function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach((item) => {
    const hasChild = item.children && item.children.length > 0;
    const div = document.createElement('div');
    div.className = 'nav-item' + (hasChild ? ' has-child' : '');

    const parent = document.createElement('div');
    parent.className = 'nav-parent';

    const iconWrap = document.createElement('span');
    iconWrap.className = 'nav-icon';
    const svgNode = svgFromString(navIcons[item.category] || item.icon);
    if (svgNode) {
      iconWrap.appendChild(svgNode);
    }

    const titleWrap = document.createElement('span');
    titleWrap.className = 'nav-title';
    titleWrap.textContent = item.category;

    const arrowWrap = document.createElement('span');
    arrowWrap.className = 'nav-arrow';
    arrowWrap.textContent = hasChild ? '▼' : '';

    parent.appendChild(iconWrap);
    parent.appendChild(titleWrap);
    parent.appendChild(arrowWrap);

    let sub = null;
    if (hasChild) {
      sub = document.createElement('div');
      sub.className = 'sub-menu';
      item.children.forEach((ch) => {
        const subItem = document.createElement('div');
        subItem.className = 'sub-item';

        const dot = document.createElement('span');
        dot.className = 'sub-dot';
        dot.textContent = '·';

        const label = document.createElement('span');
        label.className = 'sub-label';
        label.textContent = ch.label;

        subItem.appendChild(dot);
        subItem.appendChild(label);

        subItem.onclick = (e) => {
          e.stopPropagation();
          navList.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
          subItem.classList.add('active');
          renderContent([{ category: ch.label, links: ch.links }]);
        };
        sub.appendChild(subItem);
      });
    }

    div.appendChild(parent);
    if (sub) div.appendChild(sub);

    parent.onclick = () => {
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      div.classList.add('active');
      // 手机端：直接跳第一个子分类，不展开
      if (window.innerWidth <= 768 && hasChild) {
        renderContent([{ category: item.children[0].label, links: item.children[0].links }]);
        return;
      }
      if (hasChild) {
        const isOpen = sub.classList.contains('open');
        navList.querySelectorAll('.sub-menu.open').forEach(s => { if (s !== sub) s.classList.remove('open'); });
        navList.querySelectorAll('.nav-item.has-child.open').forEach(n => { if (n !== div) n.classList.remove('open'); });
        sub.classList.toggle('open', !isOpen);
        div.classList.toggle('open', !isOpen);
        if (!isOpen && item.children[0]) {
          renderContent([{ category: item.children[0].label, links: item.children[0].links }]);
        }
      } else {
        renderContent([item]);
      }
    };

    navList.appendChild(div);
  });
}

// ===== Logo 点击回首页 =====
logo.onclick = () => {
  navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  navList.querySelectorAll('.sub-menu.open').forEach(s => s.classList.remove('open'));
  navList.querySelectorAll('.nav-item.has-child.open').forEach(n => n.classList.remove('open'));
  currentEngine = '站内';
  subSearchInput.placeholder = '按 / 快速唤起站内搜索';
  subSearchInput.value = '';
  renderSearchTags();
  renderContent(navData.filter(s => s.links?.length > 0 || s.children?.some(c => c.links?.length > 0)));
  if (window.innerWidth <= 768) {
    navList.querySelector('.nav-item')?.classList.add('active');
  }
};

// ===== 深浅模式 =====
const mql = window.matchMedia('(prefers-color-scheme: dark)');
let userOverride = null;
// 月 / 日 图标用 SVG 字符串存源，再用 svgFromString 走 DOM API 创建，
// 避免 innerHTML 注入 SVG 在 iOS Safari 上解析失败（只显示文字、无图标）
const iconMoonSrc = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
const iconSunSrc  = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
const themeIconEl = themeBtn.querySelector('.theme-icon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  // 重建 SVG 节点，保证手机端也能正常渲染线条图标
  themeIconEl.textContent = '';
  const svg = svgFromString(t === 'dark' ? iconSunSrc : iconMoonSrc);
  if (svg) {
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    themeIconEl.appendChild(svg);
  }
  themeBtn.querySelector('.theme-text').textContent = t === 'dark' ? '浅色模式' : '深色模式';
}
function resolveTheme() { return userOverride || (mql.matches ? 'dark' : 'light'); }
function refresh() { applyTheme(resolveTheme()); }

refresh();
mql.addEventListener('change', () => { if (!userOverride) refresh(); });
themeBtn.onclick = () => {
  const cur = resolveTheme();
  userOverride = !userOverride ? (cur === 'dark' ? 'light' : 'dark') : null;
  refresh();
};

// ===== 初始化 =====
renderSidebar(navData);
currentEngine = '站内';
subSearchInput.placeholder = '按 / 快速唤起站内搜索';
renderSearchTags();
renderContent(navData.filter(s => s.links?.length > 0 || s.children?.some(c => c.links?.length > 0)));
navList.querySelector('.nav-item')?.classList.add('active');
