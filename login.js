// 在脚本最开头注入 CSS 兜底，防止任何输入框因继承导致字号小于 16px
var style = document.createElement('style');
style.innerHTML = 'input, textarea, select { font-size: 16px !important; }';
document.head.appendChild(style);

// --- 以下是你原有的登录逻辑（已移除自动聚焦） ---
(function () {
  var PASS = '1233'; // 请保留你的实际密码变量
  
  // 防止重复创建
  if (document.getElementById('adminLoginOverlay')) return;

  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  var overlay = document.createElement('div');
  overlay.id = 'adminLoginOverlay';
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;' +
    'background:' + (isDark ? 'rgba(20,21,24,0.85)' : 'rgba(255,255,255,0.85)') + ';' +
    'backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);';

  var dialog = document.createElement('div');
  dialog.style.cssText =
    'width:320px;padding:30px;text-align:center;' +
    'background:' + (isDark ? '#171a21' : '#ffffff') + ';' +
    'color:' + (isDark ? '#e6e8ec' : '#1f2329') + ';' +
    'border:1px solid ' + (isDark ? '#262a33' : '#e5e7eb') + ';' +
    'border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,' + (isDark ? '0.6' : '0.25') + ');';

  dialog.innerHTML =
    '<h2 style="margin:0 0 15px;font-size:20px;font-weight:700;">管理登录</h2>' +
    '<input type="password" id="adminPwd" autocomplete="off" placeholder="请输入密码" ' +
      'style="width:100%;padding:10px;margin-bottom:15px;font-size:16px;' +
      'color:' + (isDark ? '#e6e8ec' : '#1f2329') + ';' +
      'background:' + (isDark ? '#1b1f27' : '#ffffff') + ';' +
      'border:1px solid ' + (isDark ? '#262a33' : '#d1d5db') + ';' +
      'border-radius:6px;box-sizing:border-box;outline:none;font-family:inherit;">' +
    '<button id="loginBtn" ' +
      'style="width:100%;padding:10px;font-size:16px;font-weight:600;' +
      'color:#fff;background:#1677ff;border:none;border-radius:6px;cursor:pointer;">' +
      '登录</button>' +
    '<p id="loginMsg" style="display:none;margin-top:10px;font-size:13px;color:#e5484d;">密码错误</p>';

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  var pwdEl = document.getElementById('adminPwd');
  var msgEl = document.getElementById('loginMsg');
  var btnEl = document.getElementById('loginBtn');

  function checkLogin() {
    if (pwdEl.value === PASS) {
      overlay.style.display = 'none';
      // 关键：登录成功后，强制重置页面缩放比例
      document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    } else {
      msgEl.style.display = 'block';
      pwdEl.value = '';
      // 移除了自动聚焦，改为手动聚焦（或完全移除）
      // try { pwdEl.focus(); } catch (e) {}
    }
  }

  btnEl.addEventListener('click', checkLogin);
  pwdEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkLogin();
  });

  // 主题切换逻辑保留
  if ('MutationObserver' in window) {
    new MutationObserver(function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      overlay.style.background = dark ? 'rgba(20,21,24,0.85)' : 'rgba(255,255,255,0.85)';
      dialog.style.background = dark ? '#171a21' : '#ffffff';
      dialog.style.color = dark ? '#e6e8ec' : '#1f2329';
      dialog.style.borderColor = dark ? '#262a33' : '#e5e7eb';
      pwdEl.style.color = dark ? '#e6e8ec' : '#1f2329';
      pwdEl.style.background = dark ? '#1b1f27' : '#ffffff';
      pwdEl.style.borderColor = dark ? '#262a33' : '#d1d5db';
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
})();