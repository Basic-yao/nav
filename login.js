(function () {
  'use strict';

  // 只对后台页生效，前台 index.html 完全不受影响
  if (!/admin\.html$/i.test(location.pathname)) {
    console.log('[login.js] not admin page, skip');
    return;
  }
  console.log('[login.js] loaded');

  var PASS = '***';

  // 1) 创建遮罩
  var overlay = document.createElement('div');
  overlay.id = 'loginOverlay';
  overlay.style.cssText =
    'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;' +
    'z-index:999999;background:#ffffff;';

  // 2) 创建登录框
  overlay.innerHTML =
    '<div style="background:#fff;padding:30px;border-radius:8px;' +
    'box-shadow:0 5px 15px rgba(0,0,0,0.3);text-align:center;width:320px;">' +
    '<h2 style="margin:0 0 15px;">管理登录</h2>' +
    '<input type="password" id="adminPwd" autofocus placeholder="请输入密码" ' +
    'style="width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;' +
    'border-radius:4px;box-sizing:border-box;">' +
    '<button id="loginBtn" style="width:100%;padding:10px;background:#1677ff;color:#fff;' +
    'border:none;border-radius:4px;cursor:pointer;">登录</button>' +
    '<p id="loginMsg" style="color:red;font-size:13px;margin-top:10px;display:none;">密码错误</p>' +
    '</div>';

  // 3) 挂载（等 body 存在再挂，避免 document.body 为 null）
  function mount() {
    document.body.appendChild(overlay);   // ← 第 62 行原本崩的就是这句
    focus();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // 4) 跟随主题
  function paint() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    overlay.style.background = dark ? '#141518' : '#ffffff';
    var dlg = overlay.querySelector('div');
    if (dlg) dlg.style.background = dark ? '#171a21' : '#fff';
    var input = overlay.querySelector('#adminPwd');
    if (input) input.style.color = dark ? '#e6e8ec' : '#333';
  }
  paint();
  var obs = new MutationObserver(paint);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // 5) 校验
  function check() {
    var pwd = document.getElementById('adminPwd');
    var msg = document.getElementById('loginMsg');
    if (pwd && pwd.value === PASS) {
      overlay.style.display = 'none';
      obs.disconnect();
    } else {
      if (msg) msg.style.display = 'block';
      if (pwd) { pwd.value = ''; focus(); }
    }
  }

  function focus() {
    var pwd = document.getElementById('adminPwd');
    if (pwd) requestAnimationFrame(function () { pwd.focus(); });
  }

  overlay.querySelector('#loginBtn').addEventListener('click', check);
  overlay.querySelector('#adminPwd').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') check();
  });
})();