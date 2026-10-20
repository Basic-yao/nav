/* ============================================================
 * login.js —— 后台登录校验（独立模块，零依赖）
 *
 * 关键实现要点（解决"登录后页面放大 / 内容上移 / 底部多出一块"）：
 *   1. 遮罩用 top/left/right/bottom:0 + width/height:100%，不用 inset:0
 *      （inset:0 在旧版 iOS Safari 上不被支持，会导致遮罩尺寸回退为 auto）
 *   2. 遮罩 position:fixed，但显式设置 transform:translateZ(0) 与 -webkit-transform
 *      把它提升为合成层，避免 iOS 把它计入 body 的滚动高度
 *   3. 登录成功后从 DOM 彻底移除遮罩，并恢复 body 的 overflow
 *   4. 登录成功后强制把 .main 的滚动位置归零，抵消 iOS 的负偏移
 *   5. 保留一个诊断按钮 #loginDiagBtn，方便在真机上定位到底是谁在撑高页面
 * ============================================================ */
(function () {
  'use strict';

  // ★ 在这里修改管理密码（改成你自己的密码，前后不要带空格）
  var PASS = '***';

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
    'top:0;' +
    'left:0;' +
    'right:0;' +
    'bottom:0;' +
    'width:100%;' +
    'height:100%;' +
    'display:flex;' +
    'align-items:center;' +
    'justify-content:center;' +
    'z-index:999999;' +
    'background:' + maskColor + ';' +
    'transform:translateZ(0);' +
    '-webkit-transform:translateZ(0);';

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
    'box-shadow:0 20px 60px rgba(0,0,0,' + (isDark ? '0.6' : '0.25') + ');' +
    'transform:translateZ(0);' +
    '-webkit-transform:translateZ(0);';

  dialog.innerHTML =
    '<h2 style="margin:0 0 15px;font-size:20px;font-weight:700;">管理登录</h2>' +
    '<input type="password" id="adminPwd" autocomplete="off" placeholder="请输入密码" ' +
      'style="width:100%;padding:10px;margin-bottom:15px;font-size:14px;' +
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
      // ★ 登录成功：从 DOM 彻底移除遮罩，避免残留撑高页面
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
     // 恢复登录前 body / html 的 overflow 设置
      document.body.style.overflow = previousBodyOverflow || '';
      document.documentElement.style.overflow = previousHtmlOverflow || '';
      // ★ 强制把 .main 的滚动位置归零，抵消 iOS 的负偏移
      var main = document.querySelector('.main');
      if (main) {
        main.scrollTop = 0;
        main.style.scrollTop = '0px';
      }
      // 双保险：下一帧再校一次（图片/字体渲染可能导致二次偏移）
      requestAnimationFrame(function () {
        if (main) {
          main.scrollTop = 0;
          main.style.scrollTop = '0px';
        }
        // 再校一次视口高度，防止 iOS 把地址栏高度算进 100vh
        if (document.documentElement.style.setProperty) {
          document.documentElement.style.setProperty(
            '--ios-vh',
            window.innerHeight * 0.01 + 'px'
          );
        }
      });
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

  // ---------- 4. 聚焦密码框 ----------
  // 用 rAF 延迟，避免被其它脚本的 focus 抢走
  requestAnimationFrame(function () {
    try { pwdEl.focus(); } catch (e) {}
  });

  // ---------- 5. 监听主题切换，实时换色 ----------
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

  // ---------- 6. 诊断按钮（真机定位用，定位完可整段删掉） ----------
  // 点一下会在页面右上角弹出当前几个关键元素的尺寸，截屏发给我即可定位
  var diagBtn = document.createElement('button');
  diagBtn.id = 'loginDiagBtn';
  diagBtn.textContent = '诊断';
  diagBtn.style.cssText =
    'position:fixed;' +
    'top:8px;' +
    'right:8px;' +
    'z-index:9999999;' +
    'padding:6px 10px;' +
    'font-size:12px;' +
    'color:#fff;' +
    'background:#e5484d;' +
    'border:none;' +
    'border-radius:6px;' +
    'opacity:0.85;';
  document.body.appendChild(diagBtn);

  diagBtn.addEventListener('click', function () {
    function info(sel) {
      var el = document.querySelector(sel);
      if (!el) return sel + '：未找到';
      var r = el.getBoundingClientRect();
      return sel + ' → ' +
        'offset=' + el.offsetWidth + '×' + el.offsetHeight +
        ' / client=' + Math.round(r.width) + '×' + Math.round(r.height) +
        ' / top=' + Math.round(r.top) +
        ' / scrollH=' + el.scrollHeight +
        ' / overflow=' + getComputedStyle(el).overflow +
        ' / position=' + getComputedStyle(el).position;
    }
    var msg = [
      '--- 登录后诊断 ---',
      'window.innerWidth = ' + window.innerWidth,
      'window.innerHeight = ' + window.innerHeight,
      'document.body.scrollWidth = ' + document.body.scrollWidth,
      'document.body.scrollHeight = ' + document.body.scrollHeight,
      'document.body.offsetWidth = ' + document.body.offsetWidth,
      'document.body.offsetHeight = ' + document.body.offsetHeight,
      'document.documentElement.scrollWidth = ' + document.documentElement.scrollWidth,
      'document.documentElement.clientHeight = ' + document.documentElement.clientHeight,
      info('.layout'),
      info('.main'),
      info('#content'),
      info('.sidebar'),
      'loginOverlay 是否存在：' + (!!document.getElementById('loginOverlay')),
      'body overflow：' + getComputedStyle(document.body).overflow,
      'html overflow：' + getComputedStyle(document.documentElement).overflow,
    ].join('\n');
    alert(msg);
    console.log(msg);
  });
})();
