/**
 * Cloudflare Worker - Favicon 代理
 * 用法：https://<你的worker>.workers.dev/?u=https://github.com
 * 部署：复制到 Cloudflare Workers 编辑器即可
 */

const CACHE_TTL = 60 * 60 * 24 * 7;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get('u') || url.searchParams.get('url');
    if (!target) return new Response('Missing ?u=', { status: 400 });

    let hostname;
    try { hostname = new URL(target).hostname; }
    catch (e) { return new Response('Invalid URL', { status: 400 }); }

    const blocked = ['localhost', '127.0.0.1', '0.0.0.0', self.location.hostname];
    if (blocked.includes(hostname)) return new Response('Blocked', { status: 403 });

    const cache = caches.default;
    const cacheKey = new Request(request.url, request);
    let resp = await cache.match(cacheKey);
    if (resp) return resp;

    const candidates = [
      `https://${hostname}/favicon.ico`,
      `https://${hostname}/favicon.png`,
      `https://${hostname}/apple-touch-icon.png`,
    ];

    for (const candidate of candidates) {
      try {
        const r = await fetch(candidate, {
          redirect: 'follow',
          headers: { 'User-Agent': 'Mozilla/5.0' },
        });
        const ct = r.headers.get('Content-Type') || '';
        if (r.ok && ct.startsWith('image/') && ct !== 'image/svg+xml') {
          const body = await r.arrayBuffer();
          resp = new Response(body, {
            headers: {
              'Content-Type': ct,
              'Cache-Control': `public, max-age=${CACHE_TTL}`,
              'Access-Control-Allow-Origin': '*',
            },
          });
          request.waitUntil?.(cache.put(cacheKey, resp.clone()));
          return resp;
        }
      } catch (e) { /* try next */ }
    }

    // 兜底透明图
    const gif = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return new Response(atob(gif), {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
