/* ============================================================
   login.js —— 仅负责：弹出登录遮罩 / 校验密码 / 校验通过后移除遮罩
   不修改 body、html、.layout、.main 的任何样式，避免影响页面布局与滚动。
   ============================================================ */
(function () {
  'use strict';

  // ★ 改成你自己的密码
  var PASS = '***';

  // 已经创建过就不再重复创建
  if (document.getElementById('loginOverlay')) return;

  /* ---------- 1. 创建遮罩 ---------- */
  var overlay = document.createElement('div');
  overlay.id = 'loginOverlay';

  // 仅定位与背景，其余样式交给 styles.css
  overlay.style.cssText =
    'position:fixed;' +
    'top:0;left:0;right:0;bottom:0;' +
    'width:100%;height:100%;' +
    'display:flex;align-items:center;justify-content:center;' +
    'z-index:999999;';

  /* ---------- 2. 登录框 ---------- */
  var dialog = document.createElement('div');
  dialog.className = 'login-dialog';

  dialog.innerHTML =
    '<h2>管理登录</h2>' +
    '<p class="login-hint">请输入后台管理密码</p>' +
    '<input type="password" id="adminPwd" placeholder="密码" autocomplete="off" autofocus>' +
    '<button id="loginBtn">登录</button>' +
    '<p class="login-msg" id="loginMsg"></p>';

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  var pwdEl = dialog.querySelector('#adminPwd');
  var msgEl = dialog.querySelector('#loginMsg');

  function checkLogin() {
    if (pwdEl.value === PASS) {
      // 校验通过：直接从 DOM 移除遮罩，不做任何样式回写
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    } else {
      msgEl.textContent = '密码错误，请重试';
      pwdEl.value = '';
      pwdEl.focus();
    }
  }

  dialog.querySelector('#loginBtn').addEventListener('click', checkLogin);
  pwdEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkLogin();
  });
})();
