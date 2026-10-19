(function () {
  'use strict';

  var PASS = '1233';

  var overlay = document.getElementById('loginOverlay');
  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  if (!overlay || !pwdEl || !btnEl) return;

  // ★ 只在桌面端（精确指针设备）自动聚焦
  var isDesktop = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isDesktop) {
    // 页面加载完成后聚焦
    window.addEventListener('load', function () {
      pwdEl.focus();
      // 保险：延迟 100ms 再聚焦一次，确保渲染完成
      setTimeout(function () {
        pwdEl.focus();
      }, 100);
    });
  }

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