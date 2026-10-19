(function () {
  'use strict';

  // 管理密码
  var PASS = '1233';

  var overlay = document.getElementById('loginOverlay');
  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  // 如果页面没有静态写入登录弹窗结构，直接退出，不执行任何操作
  if (!overlay || !pwdEl || !btnEl) return;

  // 登录弹窗初始显示状态由 admin.html 控制，
  // 例如默认显示遮罩，或绑定某个按钮后再显示。
  // 这里不做任何 display 改动，避免误操作。

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

  // 兜底：输入框失焦（键盘收起）后，强制恢复滚动位置，
  // 防止 iOS Safari 偶尔卡在偏移状态。
  document.addEventListener('focusout', function () {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY);
    }, 100);
  });
})();