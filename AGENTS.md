# AGENTS.md — flagtextile.cn

单页纯静态站，无框架、无构建、无测试、无包管理。文件只有 `index.html`、`styles.css`、`script.js`、`images/`、`favicon.ico`、`CNAME`、`sitemap.xml`、`robots.txt`。

页面顺序：`#home` hero → `#products`（4 个 tab：fabrics/accessories/footwear/plush-toys）→ `#about`（简介 + 4 步流程）→ `#contact`（3 卡片 + Google Maps 嵌入）。

## 预览 / 部署

- 无构建，仓库根目录 `python -m http.server` 后打开 `index.html` 即可。无 lint/typecheck/test。
- 推 `main` 即触发 GitHub Pages（`origin git@github.com:bob1118/flagtextile.cn.git`）。勿删 `CNAME`（内容 `flagtextile.cn`），否则自定义域名失效。

## 易错约定

- **改 CSS/JS 必升 `index.html` 里的 `?v=N`**（当前 `styles.css?v=11`、`script.js?v=9`）。浏览器缓存很顽固，不升版本用户看到的还是旧样式。注意 `index.html` 自身无版本号，改了 HTML 结构后必须硬刷新（Ctrl+F5）或等缓存过期，否则旧 HTML 配新 JS 会缺节点。
- **i18n 以 `script.js` 顶部 `languages` 为准，HTML 中文只是 fallback。** 新增 `data-lang="<key>"` 必须 zh/en 双字典齐全；`switchLanguage()` 会用 `textContent` 全量覆盖。`data-lang` 只挂叶子节点（无子标签）。`{year}` 运行时替换为当年年份。hero `h1` 拆成 `home-title-pre/flag/post` 三个 span，三段拼接必须等于 `home-title`（同时用于 `document.title`）。
- **语言检测顺序：** `localStorage.lang` → `navigator.language` 以 `zh` 开头则中文 → 否则英文。切换语言不重置当前产品 tab；切语言后 `alt` 会从 `h3` 同步重写。
- **中英严格隔离：** zh 字典不出现拉丁产品词，en 字典不出现 CJK（`Google Maps` 专有名词例外）。产品名 zh 用中文名，en 用目录 kebab-case 名（如 `brim` = 冰花）。
- **公司名逐字保留：** `浙江弗蘭戈進出口有限公司` / `ZHEJIANG FLAG IMPORT & EXPORT CO., LIMITED`（hero、about、footer 三处）。
- **联系方式勿改：** `ivr@foxmail.com`（`mailto:`）、`tel:+8619285759256`、地址卡片锚到 `#map`（走 smooth-scroll）。footer 复用 `contact-email/phone-label` key，已无 Quick Links。
- **产品图与卡片一一对应：** hero 轮播是 3 个 `.hero-slide` 叠层交叉淡入（1s `opacity` 过渡、`setInterval` 3 秒、三图全 `preload`，`visibilitychange` 切后台暂停、`prefers-reduced-motion` 下静止只显示首图；找不到 `.hero-slide` 时回退直绘 `#home` 背景（防旧 HTML 缓存））；`fabrics/trending` 8 图 + 5 个丝绒面料目录各 `01..04.jpg` + `embroidery`/`mesh-embroidery` 各 `01..02.jpg` + `mesh-embroidery-bead-tube` 的 `01..03.jpg`；`accessories/footwear/plush-toys` 下各 3 个子目录各 `01..03.jpg`；另有 `logo.jpg`。英文目录名 kebab-case，卡片 `data-images` 为 JSON 数组，首图即 `thumb img`。
- **画廊卡片结构：** `count-badge`（`count-8/4/3/2` key）+ 可选硬编码克重 `spec-chip`（280/300/400gsm，无 chip 则 modal 内 `#modal-spec` 隐藏）+ `.card-desc`。点击开 modal：控件全是原生 `button`（`.close` 自动聚焦），prev/next + 计数器 + 标题 + spec + desc，支持 ESC/左右箭头键/背景点击/40px 触摸滑动；打开时记录 `modalCard`，`switchLanguage()` 会经 `refreshModalText()` 重译 modal 文本。仅面料首卡挂 `new-badge`（新品/New）。
- **Tab 不是堆叠：** 4 个 `.category-panel`（`#cat-fabrics/accessories/footwear/plush-toys`）由 `switchTab()` 切换，按钮带 `data-cat-tab` + ARIA（`aria-selected`/`tabIndex` 联动），`.cat-tabs` 上有左右箭头键导航（切 tab 并 focus）。
- **样式禁区：** `:root` 调色 `--primary #9a3f1f`、`--primary-dark #7c3218`、`--secondary #c98a2d`、`--ink #3d2c23`、`--bg #faf6ef`、`--line #e7ddc9`，`#products/#about/#contact` 全在 `#f1eadd` 底带上。卡片统一 `1px solid var(--line)` + 10px 圆角、hover 只变 `secondary` 边框、无阴影（`header`/`back-to-top` 的阴影除外，勿扩散）。`linear-gradient` 仅 hero 遮罩、新品 shimmer、hero 英文渐变字三处，勿新增。
- **动效禁区：** reveal 动画用独立 `translate` 属性，绝不用 `transform`（会覆盖 hover 上浮）；`prefers-reduced-motion` 必须关闭所有动画。面板 `panel-fade`、modal `modal-in`。`#back-to-top` 600px 后显示。产品缩略图 4:3，网格 `minmax(300px,1fr)`（移动端 200px）。
- **行为选择器抄准：** `section` 带 `scroll-margin-top: 60px`（对冲 fixed header，勿删）；smooth-scroll 仅 `nav a, .products-cta a, a[href="#map"], .hero-actions a`，点击顺手关移动汉堡菜单（`header.nav-open`，≤768px）。Scrollspy 用 `rootMargin '-40% 0px -55% 0px'` 高亮 nav。`html[lang="en"]` 的移动端 h1 另有字号。
- **SEO 是静态中文：** `meta description` + OG 标签写死中文（`switchLanguage` 只重写 `document.title`），og:image 指 `https://flagtextile.cn/images/1.jpg`。
- **网络现实：** Google Fonts（Inter + Noto Sans SC）在大陆被墙，`font-family` 的系统栈 fallback 必须保留；无 key 的 Google Maps `output=embed` + `loading="lazy"` 在大陆同样不可见，面向中东/北美无碍，勿加 key。
