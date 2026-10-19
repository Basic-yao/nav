/* ============================================================
 * login.js —— 后台登录校验（独立模块，零依赖）
 * 特点：
 *   1. 不依赖 custom.js / data.js，即使它们报错也不影响登录
 *   2. 弹窗 DOM 由本文件动态创建，admin.html 里无需写弹窗结构
 *   3. 跟随主题：读取 html[data-theme]，深色遮罩 #141518 / 浅色 #ffffff
 *   4. 密码错误时清空输入框并重新聚焦
 * ============================================================ */
(function () {
  'use strict';

  // ★ 在这里修改管理密码
  var PASS = '1233';

  // 已经创建过就不再重复创建（防止被意外调用多次）
  if (document.getElementById('loginOverlay')) return;

  // ---------- 1. 创建遮罩 ----------
  var overlay = document.createElement('div');
  overlay.id = 'loginOverlay';

  // 跟随主题的实色遮罩
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var maskColor = isDark ? '#141518' : '#ffffff';

  overlay.style.cssText =
    'position:fixed;' +
    'inset:0;' +
    'display:flex;' +
    'align-items:center;' +
    'justify-content:center;' +
    'z-index:999999;' +
    'background:' + maskColor + ';';

  // ---------- 2. 创建登录框 ----------
  var dialog = document.createElement('div');
  dialog.style.cssText =
    'width:320px;' +
    'padding:30px;' +
    'text-align:center;' +
    'background:' + (isDark ? '#171a21' : '#ffffff') + ';' +
    'color:' + (isDark ? '#e6e8ec' : '#1f2329') + ';' +
    'border:1px solid ' + (isDark ? '#262a33' : '#e5e7eb') + ';' +
    'border-radius:12px;' +
    'box-shadow:0 20px 60px rgba(0,0,0,' + (isDark ? '0.6' : '0.25') + ');';

  dialog.innerHTML =
    '<h2 style="margin:0 0 15px;font-size:20px;font-weight:700;">管理登录</h2>' +
    '<input type="password" id="adminPwd" autocomplete="off" placeholder="请输入密码" ' +
      'style="width:100%;padding:10px;margin-bottom:15px;font-size:16px;' +
      'color:' + (isDark ? '#e6e8ec' : '#1f2329') + ';' +
      'background:' + (isDark ? '#1b1f27' : '#ffffff') + ';' +
      'border:1px solid ' + (isDark ? '#262a33' : '#d1d5db') + ';' +
      'border-radius:6px;box-sizing:border-box;outline:none;font-family:inherit;">' +
    '<button id="loginBtn" ' +
      'style="width:100%;padding:10px;font-size:14px;font-weight:600;' +
      'color:#fff;background:#1677ff;border:none;border-radius:6px;cursor:pointer;">' +
      '登录</button>' +
    '<p id="loginMsg" style="display:none;margin-top:10px;font-size:13px;color:#e5484d;">密码错误</p>';

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // ---------- 3. 校验逻辑 ----------
  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  function checkLogin() {
    if (pwdEl.value === PASS) {
      overlay.style.display = 'none';   // 登录成功：隐藏（保留 DOM，避免重复创建）
    } else {
      msgEl.style.display = 'block';
      pwdEl.value = '';
      try { pwdEl.focus(); } catch (e) { /* 部分浏览器安全策略会拦截 focus，忽略 */ }
    }
  }

  btnEl.addEventListener('click', checkLogin);
  pwdEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkLogin();
  });

  // ---------- 4. 监听主题切换，实时换色 ----------
  // 你的主题开关改的是 html[data-theme]，这里监听属性变化
  if ('MutationObserver' in window) {
    new MutationObserver(function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      overlay.style.background = dark ? '#141518' : '#ffffff';
      dialog.style.background = dark ? '#171a21' : '#ffffff';
      dialog.style.color = dark ? '#e6e8ec' : '#1f2329';
      dialog.style.borderColor = dark ? '#262a33' : '#e5e7eb';
      dialog.style.boxShadow = dark
        ? '0 20px 60px rgba(0,0,0,0.6)'
        : '0 20px 60px rgba(0,0,0,0.25)';
      pwdEl.style.color = dark ? '#e6e8ec' : '#1f2329';
      pwdEl.style.background = dark ? '#1b1f27' : '#ffffff';
      pwdEl.style.borderColor = dark ? '#262a33' : '#d1d5db';
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
})();