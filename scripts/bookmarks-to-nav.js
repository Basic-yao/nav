#!/usr/bin/env node

/**
 * 浏览器书签 HTML → nav.json 转换器
 *
 * 用法：
 *   node scripts/bookmarks-to-nav.js bookmarks.html > data/nav.json
 *   node scripts/bookmarks-to-nav.js bookmarks.html --output data/nav.json
 *
 * 浏览器导出格式：
 *   <DT><H3>文件夹名</H3>
 *   <DL><p>
 *     <DT><A HREF="url">标题</A>
 *     ...
 *   </DL><p>
 */

const fs = require("fs");
const path = require("path");

// 尝试用 jsdom，没有则用内置解析
let JSDOM = null;
try { JSDOM = require("jsdom").JSDOM; } catch (e) { JSDOM = null; }

const DEFAULT_ENGINES = {
  google: { label: "Google", url: "https://www.google.com/search?q=" },
  bing: { label: "Bing", url: "https://www.bing.com/search?q=" },
  duckduckgo: { label: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
  github: { label: "GitHub", url: "https://github.com/search?q=" },
  npm: { label: "npm", url: "https://www.npmjs.com/search?q=" },
};

function parseWithDOM(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const groups = [];
  const seenUrls = new Set();

  function parseFolder(dl, parentName) {
    const children = Array.from(dl.children);
    let currentGroup = null;
    let currentGroupName = parentName || "";

    for (const child of children) {
      if (child.tagName === "DT") {
        const h3 = child.querySelector(":scope > h3");
        const a = child.querySelector(":scope > a");

        if (h3) {
          currentGroupName = h3.textContent.trim();
          currentGroup = { name: currentGroupName, sites: [] };
          groups.push(currentGroup);
        } else if (a && a.href) {
          if (!currentGroup) {
            currentGroup = { name: "其他", sites: [] };
            groups.push(currentGroup);
          }
          const url = a.href;
          if (seenUrls.has(url)) continue;
          seenUrls.add(url);
          currentGroup.sites.push({
            title: a.textContent.trim(),
            url: url,
            desc: "",
          });
        }
      } else if (child.tagName === "DL") {
        parseFolder(child, currentGroupName);
      }
    }
  }

  const rootDL = doc.querySelector("dl");
  if (rootDL) parseFolder(rootDL);
  return groups;
}

// 无 jsdom 时的正则降级解析
function parseWithRegex(html) {
  const groups = [];
  const seenUrls = new Set();
  let currentGroup = { name: "其他", sites: [] };
  groups.push(currentGroup);

  const lines = html.split("\n");
  let inFolder = false;

  for (const line of lines) {
    const folderMatch = line.match(/<DT><H3[^>]*>(.*?)<\/H3>/i);
    const linkMatch = line.match(/<DT><A[^>]*HREF="([^"]+)"[^>]*>(.*?)<\/A>/i);

    if (folderMatch) {
      currentGroup = { name: folderMatch[1].trim(), sites: [] };
      groups.push(currentGroup);
      inFolder = true;
    } else if (linkMatch) {
      const url = linkMatch[1];
      const title = linkMatch[2].replace(/<[^>]+>/g, "").trim();
      if (seenUrls.has(url)) continue;
      seenUrls.add(url);
      currentGroup.sites.push({ title, url, desc: "" });
    }
  }

  return groups;
}

async function main() {
  const args = process.argv.slice(2);
  const outputIdx = args.indexOf("--output");
  let outputPath = null;
  if (outputIdx !== -1) {
    outputPath = args[outputIdx + 1];
    args.splice(outputIdx, 2);
  }

  const inputFile = args[0];
  if (!inputFile) {
    console.error("用法: node bookmarks-to-nav.js <bookmarks.html> [--output data/nav.json]");
    process.exit(1);
  }

  const html = fs.readFileSync(inputFile, "utf-8");
  const groups = JSDOM ? parseWithDOM(html) : parseWithRegex(html);

  // 过滤空分组 + 合并同名
  const merged = {};
  for (const g of groups) {
    if (!g.sites.length) continue;
    if (!merged[g.name]) merged[g.name] = { name: g.name, sites: [] };
    for (const s of g.sites) {
      if (!merged[g.name].sites.find((x) => x.url === s.url)) {
        merged[g.name].sites.push(s);
      }
    }
  }

  const finalGroups = Object.values(merged).filter((g) => g.sites.length > 0);
  const totalSites = finalGroups.reduce((n, g) => n + g.sites.length, 0);

  const result = {
    settings: { searchEngines: DEFAULT_ENGINES },
    groups: finalGroups,
  };

  const json = JSON.stringify(result, null, 2);

  if (outputPath) {
    fs.writeFileSync(path.resolve(outputPath), json, "utf-8");
    console.error(`✅ 已生成 ${outputPath}`);
    console.error(`   分组: ${finalGroups.length} 个`);
    console.error(`   站点: ${totalSites} 个`);
  } else {
    process.stdout.write(json);
  }
}

main().catch((err) => {
  console.error("❌ 错误:", err.message);
  process.exit(1);
});
