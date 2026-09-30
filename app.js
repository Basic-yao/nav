const $ = (s) => document.querySelector(s);
const nav = $("#nav");
const search = $("#search");
const html = document.documentElement;

// ============ 主题 ============
const themeBtn = $("#toggle-theme");

function syncIcon() {
  const t = html.getAttribute('data-theme');
  themeBtn.textContent = t === 'dark' ? '☀️' : t === 'light' ? '🌙' : '🖥️';
}

themeBtn.onclick = () => {
  const cur = html.getAttribute('data-theme');
  if (cur === 'dark') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else if (cur === 'light') {
    html.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  } else {
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', sysDark ? 'light' : 'dark');
    localStorage.setItem('theme', sysDark ? 'light' : 'dark');
  }
  syncIcon();
};

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) html.setAttribute('data-theme', 'dark');
      else html.removeAttribute('data-theme');
      syncIcon();
    }
  });

syncIcon();

// ============ 搜索引擎 ============
let engineKeys = [];
let currentEngine = null;

function initEngines() {
  const engines = DATA.settings.searchEngines;
  engineKeys = Object.keys(engines);
  const saved = localStorage.getItem('engine');
  currentEngine = engineKeys.includes(saved) ? saved : engineKeys[0] || 'google';
  renderEngine();
}

function renderEngine() {
  const sel = $('#engine');
  if (!sel) return;
  sel.innerHTML = engineKeys.map((k) =>
    `<option value="${k}">${DATA.settings.searchEngines[k].label}</option>`
  ).join('');
  sel.value = currentEngine;
}

function searchUrl(q) {
  return DATA.settings.searchEngines[currentEngine].url + encodeURIComponent(q);
}

$('#engine').addEventListener('change', (e) => {
  currentEngine = e.target.value;
  localStorage.setItem('engine', currentEngine);
});

// ============ Favicon ============
// 配置你的 Cloudflare Worker 地址，留空则走本地 icons 目录
// 例: const FAVICON_PROXY = "https://favicon-proxy.xxx.workers.dev/?u=";
const FAVICON_PROXY = "";

function getFavicon(url) {
  if (FAVICON_PROXY) return FAVICON_PROXY + encodeURIComponent(url);
  const hash = Math.abs([...url].reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)).toString(36);
  return `icons/${hash}.ico`;
}

function faviconFallback(img, url) {
  let tried = 0;
  img.onerror = () => {
    tried++;
    const hash = Math.abs([...url].reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)).toString(36);
    if (tried === 1) {
      img.src = `icons/${hash}.png`;
    } else if (tried === 2 && FAVICON_PROXY) {
      img.src = FAVICON_PROXY + encodeURIComponent(url);
    } else {
      img.onerror = null;
      img.style.visibility = 'hidden';
    }
  };
}

// ============ URL hash ============
function hashUrl(url) {
  return Math.abs([...url].reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)).toString(36);
}

// ============ 数据 & 渲染 ============
let DATA = null;
let activeIdx = -1;

async function load() {
  const res = await fetch("data/nav.json", { cache: "no-store" });
  DATA = await res.json();
  initEngines();
  render("");
}

function getAllSites() {
  return DATA.groups.flatMap((g) =>
    g.sites.map((s) => ({ ...s, _group: g.name }))
  );
}

function render(keyword) {
  nav.innerHTML = "";
  const kw = keyword.trim().toLowerCase();
  let totalVisible = 0;
  let cardIdx = 0;

  for (const g of DATA.groups) {
    const sites = g.sites.filter((s) =>
      !kw ||
      s.title.toLowerCase().includes(kw) ||
      (s.desc || "").toLowerCase().includes(kw)
    );
    if (!sites.length) continue;

    totalVisible += sites.length;
    const sec = document.createElement("section");
    sec.className = "group";
    sec.innerHTML = `<h2>${g.name}</h2>`;
    const grid = document.createElement("div");
    grid.className = "grid";

    for (const s of sites) {
      const a = document.createElement("a");
      a.className = "card";
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.dataset.idx = cardIdx++;

      const icon = getFavicon(s.url);
      a.innerHTML = `
        <div class="card-top">
          <img class="favicon" src="${icon}" alt="" data-origin="${s.url}" loading="lazy" />
          <span class="title">${s.title}</span>
        </div>
        <div class="desc">${s.desc || ""}</div>
      `;
      grid.appendChild(a);
    }
    sec.appendChild(grid);
    nav.appendChild(sec);
  }

  document.querySelectorAll('.favicon').forEach((img) => {
    faviconFallback(img, img.dataset.origin);
  });

  if (totalVisible === 0) {
    nav.innerHTML = `<div class="empty">没有匹配的站点</div>`;
  }

  // 站点计数
  const countEl = $('#site-count');
  if (countEl) {
    const total = DATA.groups.reduce((n, g) => n + g.sites.length, 0);
    countEl.textContent = `${total} 个站点 · ${DATA.groups.length} 个分组`;
  }

  activeIdx = -1;
  setupDrag();
}

// ============ 搜索 ============
search.addEventListener("input", () => render(search.value));

search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const v = search.value.trim();
    if (!v) return;
    const all = getAllSites();
    const hit = all.find((s) => s.title.toLowerCase() === v.toLowerCase());
    if (hit) { window.open(hit.url, "_blank"); return; }
    const fuzzy = all.find((s) => s.title.toLowerCase().includes(v.toLowerCase()));
    if (fuzzy) { window.open(fuzzy.url, "_blank"); return; }
    window.open(searchUrl(v), "_blank");
  }

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const cards = document.querySelectorAll(".card");
    if (!cards.length) return;
    if (activeIdx >= 0) cards[activeIdx].classList.remove("active");
    if (e.key === "ArrowDown") {
      activeIdx = (activeIdx + 1) % cards.length;
    } else {
      activeIdx = (activeIdx - 1 + cards.length) % cards.length;
    }
    cards[activeIdx].classList.add("active");
    cards[activeIdx].scrollIntoView({ block: "nearest" });
  }
});

nav.addEventListener("click", () => {
  search.value = "";
  render("");
});

// ============ 全局快捷键 ============
document.addEventListener("keydown", (e) => {
  // / 聚焦搜索
  if (e.key === "/" && document.activeElement !== search) {
    e.preventDefault();
    search.focus();
    search.select();
  }
  // Esc 清空
  if (e.key === "Escape") {
    search.value = "";
    render("");
    search.focus();
  }

  // 数字键 1-9 打开分组
  if (document.activeElement === search) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const n = parseInt(e.key);
  if (n >= 1 && n <= 9) {
    const groups = document.querySelectorAll('.group');
    const idx = n - 1;
    if (groups[idx]) {
      const firstCard = groups[idx].querySelector('.card');
      if (firstCard) {
        if (e.shiftKey) {
          window.open(firstCard.href, '_blank');
        } else {
          firstCard.click();
        }
      }
    }
  }
});

// ============ 拖拽排序 ============
let dragSrc = null;

function setupDrag() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('dragstart', function(e) {
      dragSrc = this;
      this.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', function() {
      this.classList.remove('dragging');
      cards.forEach(c => c.classList.remove('drag-over'));
    });

    card.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    });

    card.addEventListener('dragenter', function(e) {
      if (this !== dragSrc) this.classList.add('drag-over');
    });

    card.addEventListener('dragleave', function() {
      this.classList.remove('drag-over');
    });

    card.addEventListener('drop', function(e) {
      e.stopPropagation();
      if (dragSrc !== this) {
        const parent = this.parentNode;
        const sibling = this.nextSibling === dragSrc ? this : this.nextSibling;
        parent.insertBefore(dragSrc, sibling);
      }
      return false;
    });
  });
}

// ============ 天气 ============
async function loadWeather() {
  const el = $('#weather');
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000, maximumAge: 300000 });
    });
    const { latitude, longitude } = pos.coords;
    const resp = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await resp.json();
    el.textContent = `${weatherEmoji(data.current.weather_code)} ${Math.round(data.current.temperature_2m)}°C`;
  } catch (e) {
    try {
      const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
      const loc = await r.json();
      const resp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,weather_code&timezone=auto`
      );
      const data = await resp.json();
      el.textContent = `${weatherEmoji(data.current.weather_code)} ${Math.round(data.current.temperature_2m)}°C · ${loc.city || ''}`;
    } catch (e2) {
      el.textContent = '🌤 天气暂不可用';
    }
  }
}

function weatherEmoji(code) {
  if (code <= 1) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫';
  if (code <= 67) return '🌧';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦';
  if (code <= 86) return '🌨';
  return '⛈';
}

// ============ 时钟 ============
function updateClock() {
  const el = $('#clock');
  if (!el) return;
  const now = new Date();
  el.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

// ============ 背景壁纸（Picsum，国内稳定） ============
function loadBg() {
  const el = $('#bg');
  if (!el) return;

  // 读取上次保存
  const saved = localStorage.getItem('bgUrl');
  if (saved) {
    el.style.backgroundImage = `url("${saved}")`;
  }

  // Picsum：1000x600 灰度关闭，加时间戳防缓存
  const seed = Math.floor(Math.random() * 10000);
  const url = `https://picsum.photos/seed/${seed}/1920/1080`;

  const img = new Image();
  img.onload = () => {
    el.style.backgroundImage = `url("${url}")`;
    localStorage.setItem('bgUrl', url);
  };
  img.onerror = () => {
    // 失败保持原样，不影响使用
  };
  img.src = url;
}

// 双击空白处换壁纸
document.addEventListener('dblclick', (e) => {
  if (e.target.closest('.card') || e.target.closest('.topbar') || e.target.closest('.widget-bar') || e.target.closest('.footer')) return;
  loadBg();
});

// ============ 启动 ============
load();
loadWeather();
loadBg();
updateClock();
setInterval(updateClock, 1000);
