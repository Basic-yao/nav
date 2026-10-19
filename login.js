(function () {
  'use strict';

  // ★ 在这里修改管理密码
  var PASS = '1233';

  var overlay = document.getElementById('loginOverlay');
  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  // 如果静态结构不存在，直接退出，不做任何 DOM 操作
  if (!overlay || !pwdEl || !btnEl) return;

  function submit() {
    if (pwdEl.value === PASS) {
      overlay.style.display = 'none';
    } else {
      msgEl.style.display = 'block';
      pwdEl.value = '';
    }
  }

  btnEl.addEventListener('click', submit);
  pwdEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });
})();