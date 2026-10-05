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

const SVG_NS = 'http://www.w3.org/2000/svg';

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
    const child = doc.documentElement.firstElementChild;
    if (!child) return null;
    const node = document.importNode(child, true);
    for (const [k, v] of Object.entries(STROKE_ATTRS)) {
      if (!node.hasAttribute(k)) node.setAttribute(k, v);
    }
    return node;
  } catch (e) {
    return null;
  }
}

function getFallback(l) {
  const ch = (l.title || '?').trim().charAt(0).toUpperCase();
  let hash = 0;
  const seed = l.title || l.url || '';
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = hash % 360;
  return { ch, hue };
}

function resetScrollToTop() {
  const target = document.scrollingElement || document.documentElement;
  requestAnimationFrame(() => target.scrollTo(0, 0));
}

function syncScrollbarVar() {
  const w = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', w + 'px');
}

function cardTpl(l) {
  const fb = getFallback(l);
  const bg = `hsl(${fb.hue}, 65%, 88%)`;
  const fg = `hsl(${fb.hue}, 45%, 32%)`;
  const safeUrl = (l.url || '').replace(/"/g, '&quot;');
  return `<a href="${safeUrl}" target="_blank" class="card">
    <div class="card-icon">
      <img src="${l.icon}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${fb.ch}',className:'card-fallback',style:'background:${bg};color:${fg}'}))">
    </div>
    <div class="card-body">
      <div class="card-head">
        <div class="card-title">${l.title}</div>
      </div>
      <div class="card-desc">${l.desc}</div>
    </div>
  </a>`;
}

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
    const allLinks = [...(sec.links || [])];
    if (allLinks.length === 0) return;
    content.innerHTML += `<h2 class="section-title">${getSectionIcon(sec)}<span>${sec.category}</span></h2><div class="grid">${allLinks.map(l => cardTpl(l)).join('')}</div>`;
  });
}

function doLocalSearch(kw) {
  kw = (kw || '').trim();
  if (!kw) {
    renderContent(navData.filter(s => (s.links || []).length > 0));
    return;
  }
  const lower = kw.toLowerCase();
  const hitData = navData.map(sec => ({
    ...sec,
    links: (sec.links || []).filter(l =>
      (l.title || '').toLowerCase().includes(lower) ||
      (l.desc || '').toLowerCase().includes(lower)
    )
  })).filter(sec => sec.links.length > 0);
  renderContent(hitData);
}

function doWebSearch(kw) {
  kw = kw.trim();
  if (!kw) return;
  window.open(searchEngines[currentEngine].url + encodeURIComponent(kw), '_blank');
}

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
      if (currentEngine === '站内') {
        subSearchInput.focus();
        doLocalSearch(subSearchInput.value);
      }
    };
  });
}

subSearchInput.addEventListener('input', (e) => {
  if (currentEngine === '站内') {
    doLocalSearch(e.target.value);
  }
});

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

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== subSearchInput) {
    e.preventDefault();
    currentEngine = '站内';
    subSearchInput.placeholder = '按 / 快速唤起站内搜索';
    renderSearchTags();
    subSearchInput.value = '';
    subSearchInput.focus();
    renderContent(navData.filter(s => (s.links || []).length > 0));
  }
});

function renderSidebar(data) {
  navList.innerHTML = '';
  data.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'nav-item';

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

    parent.appendChild(iconWrap);
    parent.appendChild(titleWrap);

    parent.onclick = () => {
      navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      div.classList.add('active');
      renderContent([item]);
      resetScrollToTop();
    };

    div.appendChild(parent);
    navList.appendChild(div);
  });
}

logo.onclick = () => {
  navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  currentEngine = '站内';
  subSearchInput.placeholder = '按 / 快速唤起站内搜索';
  subSearchInput.value = '';
  renderSearchTags();
  renderContent(navData.filter(s => (s.links || []).length > 0));
  resetScrollToTop();
};

const mql = window.matchMedia('(prefers-color-scheme: dark)');
let userOverride = null;
const iconMoonSrc = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
const iconSunSrc  = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
const themeIconEl = themeBtn.querySelector('.theme-icon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
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

renderSidebar(navData);
syncScrollbarVar();
window.addEventListener('resize', syncScrollbarVar);
currentEngine = '站内';
subSearchInput.placeholder = '按 / 快速唤起站内搜索';
renderSearchTags();
renderContent(navData.filter(s => (s.links || []).length > 0));

function syncScrollbarVar() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}
window.addEventListener('load', syncScrollbarVar);
window.addEventListener('resize', syncScrollbarVar);
syncScrollbarVar();