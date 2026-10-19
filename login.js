(function () {
  'use strict';

  // ★ 在这里修改管理密码
  var PASS = '1233';

  var overlay = document.getElementById('loginOverlay');
  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  // 页面里没有登录弹窗结构就直接退出，不做任何 DOM 操作
  if (!overlay || !pwdEl || !btnEl) return;

  // 注意：不强制设置 display，保持 HTML 里的初始状态（默认显示）

  function submit() {
    if (pwdEl.value === PASS) {
      overlay.style.display = 'none';
      pwdEl.blur();                 // 收起键盘，避免 iOS 卡在偏移状态
    } else {
      msgEl.style.display = 'block';
      pwdEl.value = '';
    }
  }

  btnEl.addEventListener('click', submit);
  pwdEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });

  // iOS 修复：键盘收起后强制恢复滚动位置
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', function () {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      var isInputFocused = (tag === 'INPUT' || tag === 'TEXTAREA');
      if (!isInputFocused) {
        setTimeout(function () { window.scrollTo(0, window.scrollY); }, 100);
      }
    });
  }
 if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && 'visualViewport' in window) {
  var overlay = document.getElementById('loginOverlay');
  var vv = window.visualViewport;
  function adjustOverlay() {
    overlay.style.height = vv.height + 'px';
  }
  vv.addEventListener('resize', adjustOverlay);
  adjustOverlay();
}
  // 兜底：输入框失焦后恢复滚动位置
  pwdEl.addEventListener('blur', function () {
    setTimeout(function () { window.scrollTo(0, window.scrollY); }, 100);
  });

  // 页面切到后台（切 App / 切标签）时强制失焦，解决 iOS 卡在半空的 Bug
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      var el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) el.blur();
    }
  });
})();