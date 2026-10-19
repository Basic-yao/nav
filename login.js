(function () {
  'use strict';

  // ★ 在这里修改管理密码
  var PASS = '1233';

  var overlay = document.getElementById('loginOverlay');
  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  // 如果页面里没有登录弹窗结构，自动创建一个，但不会自动聚焦
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loginOverlay';
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:9999;display:flex;' +
      'align-items:center;justify-content:center;';
    overlay.innerHTML =
      '<div class="login-dialog">' +
        '<h2 class="login-title">管理登录</h2>' +
        '<input type="password" id="adminPwd" class="login-input" placeholder="请输入密码" autocomplete="off">' +
        '<button id="loginBtn" class="login-btn">登 录</button>' +
        '<p id="loginMsg" class="login-msg">密码错误</p>' +
      '</div>';
    document.body.appendChild(overlay);
    pwdEl = document.getElementById('adminPwd');
    msgEl = document.getElementById('loginMsg');
    btnEl = document.getElementById('loginBtn');
  }

  if (!overlay || !pwdEl || !btnEl) return;

  function submit() {
    if (pwdEl.value === PASS) {
      overlay.style.display = 'none';
      // 不做任何滚动、不改变视口，保持原样
    } else {
      msgEl.style.display = 'block';
      pwdEl.value = '';
      // 刻意不聚焦，避免 iOS 缩放和顶起
    }
  }

  btnEl.addEventListener('click', submit);
  pwdEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });
})();