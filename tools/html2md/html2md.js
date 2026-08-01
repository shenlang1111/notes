/**
 * HTML → Markdown 转换脚本
 * 将 knowledge-base/domains/ 下的页面转成 Markdown 源文件（供 AI 调用）
 * 用法: node html2md.js
 */
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const DOMAINS_DIR = path.join(__dirname, "..", "..", "knowledge-base", "domains");
const OUT_DIR = path.join(__dirname, "..", "..", "knowledge-base", "markdown");

// 页面 → 元数据（领域、标签）
const META = {
  fundamentals: { domain: "表面活性剂", tags: ["基础", "胶束", "CPP", "必读"], desc: "表面张力、Gibbs吸附、胶束理论、CPP堆积参数、四大分类体系" },
  anionic: { domain: "表面活性剂", tags: ["阴离子", "氨基酸表活", "AES"], desc: "磺酸盐、硫酸酯盐、羧酸盐、甲基牛磺酸" },
  cationic: { domain: "表面活性剂", tags: ["阳离子", "季铵盐", "聚季铵盐"], desc: "季铵盐、聚季铵盐、PQ-7改性" },
  amphoteric: { domain: "表面活性剂", tags: ["两性", "甜菜碱", "氧化胺"], desc: "甜菜碱型、咪唑啉、氧化胺、磺基甜菜碱" },
  nonionic: { domain: "表面活性剂", tags: ["非离子", "AEO", "APG"], desc: "AEO、Span/Tween、6501/CDEA、APG" },
  properties: { domain: "表面活性剂", tags: ["CMC", "HLB", "Krafft点"], desc: "CMC、HLB、Krafft点、浊点" },
  synthesis: { domain: "表面活性剂", tags: ["合成", "工艺", "路线"], desc: "10种合成路线详解" },
  applications: { domain: "表面活性剂", tags: ["乳化", "增溶", "泡沫", "复配"], desc: "乳化、增溶、洗涤、泡沫、复配" },
  products: { domain: "表面活性剂", tags: ["天赐", "产品对照", "选型"], desc: "教材知识点与天赐产品映射" },
  advanced: { domain: "表面活性剂", tags: ["Gemini", "生物表活", "检测"], desc: "新型表活与检测标准" },
  troubleshooting: { domain: "表面活性剂", tags: ["诊断", "问题", "解决方案"], desc: "客户常见问题诊断" },
  formulation: { domain: "日化原料与配方", tags: ["配方", "洁面膏", "婴童"], desc: "配方体系架构" },
  market: { domain: "销售与市场", tags: ["市场", "趋势", "竞争"], desc: "市场格局与竞争定位" },
  sales: { domain: "销售与市场", tags: ["话术", "选型指南", "术语"], desc: "销售话术体系" },
};

// 处理行内元素：strong/em/mark/br
function inline($, el) {
  let out = "";
  el.contents().each(function () {
    const node = this;
    if (node.type === "text") {
      out += node.data.replace(/\s+/g, " ").trim() || "";
    } else if (node.type === "tag") {
      const tag = node.name;
      if (tag === "strong" || tag === "b") {
        out += "**" + $(node).text().replace(/\s+/g, " ").trim() + "**";
      } else if (tag === "em" || tag === "i") {
        out += "*" + $(node).text().trim() + "*";
      } else if (tag === "mark") {
        out += "**" + $(node).text().trim() + "**";
      } else if (tag === "br") {
        out += "\n";
      } else if (tag === "a") {
        out += $(node).text().trim();
      } else if (tag === "code") {
        out += "`" + $(node).text() + "`";
      } else if (tag === "span" || tag === "div") {
        out += inline($, $(node));
      } else if (tag === "sub" || tag === "sup") {
        out += $(node).text();
      } else {
        out += $(node).text().trim();
      }
    } else if (node.type === "comment") {
      // skip
    }
  });
  return out.replace(/\s*\n\s*/g, "\n").trim();
}

// 转换表格
function tableToMd($, el) {
  const rows = [];
  el.find("tr").each(function () {
    const row = [];
    $(this).find("th, td").each(function () {
      row.push(inline($, $(this)).replace(/\|/g, "\\|").replace(/\n/g, " "));
    });
    rows.push(row);
  });
  if (rows.length === 0) return "";
  let md = "| " + rows[0].join(" | ") + " |\n";
  md += "| " + rows[0].map(() => "---").join(" | ") + " |\n";
  for (let i = 1; i < rows.length; i++) {
    md += "| " + rows[i].join(" | ") + " |\n";
  }
  return md;
}

// 转换主内容
function convertContent($, root) {
  let md = "";
  const process = (el, depth) => {
    el.children().each(function () {
      const node = this;
      if (node.type !== "tag") return;
      const tag = node.name;
      const $node = $(node);
      const cls = $node.attr("class") || "";

      if (tag === "h1") { md += `\n# ${$node.text().trim()}\n`; return; }
      if (tag === "h2") { md += `\n## ${$node.text().trim()}\n`; return; }
      if (tag === "h3") { md += `\n### ${$node.text().trim()}\n`; return; }
      if (tag === "h4") { md += `\n#### ${$node.text().trim()}\n`; return; }

      if (tag === "p") {
        const txt = inline($, $node);
        if (txt) md += `\n${txt}\n`;
        return;
      }

      if (tag === "ul" || tag === "ol") {
        $node.find("> li").each(function () {
          const liText = inline($, $(this));
          md += `\n- ${liText}\n`;
        });
        return;
      }

      if (tag === "table") {
        md += "\n" + tableToMd($, $node) + "\n";
        return;
      }

      if (tag === "div") {
        // 卡片/提示/概念网格/统计卡
        if (cls.includes("card") || cls.includes("callout")) {
          const accent = cls.includes("accent2") ? "accent2" : cls.includes("accent3") ? "accent3" : cls.includes("accent4") ? "accent4" : cls.includes("warning") ? "warning" : "accent";
          const title = $node.find("h4").first();
          let body = "";
          if (title.length) {
            body += `**${title.text().trim()}**  \n`;
            title.remove();
          }
          // 遍历所有子节点：元素用 convertNode，文本节点直接收集（不加换行，保持行内连接）
          $node.contents().each(function () {
            if (this.type === "text") {
              const t = $(this).text().replace(/\s+/g, " ").trim();
              if (t) body += t;
            } else if (this.type === "tag") {
              const inner = convertNode($, $(this));
              if (inner) body += inner;
            }
          });
          md += `\n> **[${accent}]**\n> ${body.trim().replace(/\n/g, "\n> ")}\n`;
          return;
        }
        if (cls.includes("concept-grid") || cls.includes("concept-card")) {
          $node.find(".concept-card").each(function () {
            const t = $(this).find("h4").first();
            const tTitle = t.length ? t.text().trim() : "";
            const body = inline($, $(this));
            if (tTitle) md += `\n### ${tTitle}\n`;
            md += `\n${body.replace(tTitle, "")}\n`;
          });
          return;
        }
        if (cls.includes("stat-grid") || cls.includes("stat-card")) {
          $node.find(".stat-card").each(function () {
            const num = $(this).find(".stat-num").text().trim();
            const label = $(this).find(".stat-label").text().trim();
            md += `\n- **${num}** — ${label}\n`;
          });
          return;
        }
        if (cls.includes("table-wrap")) {
          const tbl = $node.find("table").first();
          if (tbl.length) md += "\n" + tableToMd($, tbl) + "\n";
          return;
        }
        if (cls.includes("diagram") || cls.includes("process-flow") || cls.includes("struct-diagram") || cls.includes("reaction-box") || cls.includes("formula-box") || cls.includes("hlb-scale")) {
          const txt = $node.text().replace(/\s+/g, " ").trim();
          if (txt) md += `\n> 📐 ${txt}\n`;
          return;
        }
        // 普通 div：递归
        process($node, depth + 1);
        return;
      }

      if (tag === "section") { process($node, depth + 1); return; }
    });
  };

  const convertNode = ($, el) => {
    let out = "";
    const tag = el.get(0) ? el.get(0).name : "";
    const cls = el.attr("class") || "";
    if (tag === "p") return inline($, el) ? `\n${inline($, el)}\n` : "";
    if (tag === "h3") return `\n### ${el.text().trim()}\n`;
    if (tag === "h4") return `\n#### ${el.text().trim()}\n`;
    if (tag === "ul") {
      let s = "";
      el.find("> li").each(function () { s += `\n- ${inline($, $(this))}\n`; });
      return s;
    }
    if (tag === "table") return "\n" + tableToMd($, el) + "\n";
    if (tag === "div") {
      if (cls.includes("table-wrap")) {
        const tbl = el.find("table").first();
        return tbl.length ? "\n" + tableToMd($, tbl) + "\n" : "";
      }
      return inline($, el) ? `\n${inline($, el)}\n` : "";
    }
    // 行内元素（strong/mark/em/a/span等）：直接取整段文本加标记
    if (tag === "strong" || tag === "b") return "**" + el.text().replace(/\s+/g, " ").trim() + "**";
    if (tag === "mark") return "**" + el.text().trim() + "**";
    if (tag === "em" || tag === "i") return "*" + el.text().trim() + "*";
    return inline($, el);
  };

  process(root, 0);
  return md;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;

  for (const [name, meta] of Object.entries(META)) {
    // 找源文件
    let srcPath = null;
    for (const dir of fs.readdirSync(DOMAINS_DIR)) {
      const candidate = path.join(DOMAINS_DIR, dir, `${name}.html`);
      if (fs.existsSync(candidate)) { srcPath = candidate; break; }
    }
    if (!srcPath) { console.log(`[跳过] ${name}`); continue; }

    const html = fs.readFileSync(srcPath, "utf-8");
    const $ = cheerio.load(html);
    const container = $("body .container").first();
    if (!container.length) { console.log(`[失败] ${name} 无 container`); continue; }

    // 提取页头
    let title = name;
    let desc = meta.desc;
    const heroH1 = container.find(".page-hero h1").first();
    if (heroH1.length) title = heroH1.text().trim();
    const heroDesc = container.find(".page-hero-desc").first();
    if (heroDesc.length) desc = heroDesc.text().trim();

    // 移除页头/导航/footer/script
    container.find(".page-hero").remove();

    const bodyMd = convertContent($, container);

    const frontMatter = `---\ntitle: "${title}"\ndomain: "${meta.domain}"\ntags: [${meta.tags.map(t => `"${t}"`).join(", ")}]\ndesc: "${desc}"\nsource: "${name}.html"\nupdated: 2026-08-01\n---\n\n`;
    const md = frontMatter + `# ${title}\n\n> ${desc}\n\n` + bodyMd;

    // 输出
    const outDir = path.join(OUT_DIR, meta.domain);
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, `${name}.md`);
    fs.writeFileSync(outFile, md, "utf-8");
    console.log(`[OK] ${name}.md (${(md.length / 1024).toFixed(1)} KB)`);
    ok++;
  }
  console.log(`\n完成：${ok}/${Object.keys(META).length} 个页面已转换`);
}

main();
