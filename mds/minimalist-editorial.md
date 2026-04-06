# 报刊式极简主义：minimalist-editorial 快速上手指南


## 📦 什么是 minimalist-editorial？


`minimalist-editorial`（报刊式极简主义）是一种从高端纸媒和建筑设计中汲取灵感的视觉流派。它不仅仅是“少即是多”，而是通过 **严谨的字体比例系统 (Typography Scale)**、**极致的大幅留白 (Negative Space)** 以及 **非对称的网格平衡**，在屏幕上营造出一种画廊般的质感。它是对**排版权威感 (Authored Design)** 的终极追求。


## ⚙️ 如何安装？


你可以通过以下几种方式为你的项目注入这种“文字即力量”的审美：


### 1. 字体比例系统配置 (推荐)
这是最核心、最有力的生产级方案：
```bash
# 在全局 CSS 中定义基于 Golden Ratio 的字体档位
--text-xs: 0.75rem;
--text-base: 1rem;
--text-xl: 1.5rem;
--text-4xl: 3.375rem; /* 巨大的标题 */
```


### 2. 通过 OpenSkills 动态开启
在 Agent 框架下一键同步编排逻辑：
```bash
npx openskills install frontend/minimalist --universal && npx openskills sync
```


### 3. Tailwind 极简排版配置
在全局配置文件中禁用冗余装饰，专注间距与比例：
```js
module.exports = {
  theme: {
    fontFamily: {
      'display': ['Outfit', 'sans-serif'],
      'body': ['Inter', 'sans-serif'],
    },
    extend: {
      letterSpacing: {
        'tightest': '-.05em',
      }
    }
  }
}
```


---


## 💬 如何通过对话使用？


调用 `minimalist-editorial` 的关键在于：**定义留白比例与信息密度**。


### 万能对话公式
> **[主要导航/内容区]** + **[文字权重比]** + **[负空间 (Negative Space) 深度]**


---


### 🏡 高端建筑事务所主页 (Architectural Firm)

利用大幅留白凸清影像与文字的张力：

```markdown
请使用 minimalist-editorial 为我重构“项目案例页”。要求：页面顶部留出 40vh 的空白，项目标题采用巨大的 Serif 字体，正文使用 Inter 并设置 2.0 倍行间距。
```


### 🗞 独立媒体深度阅读页 (Reading Portal)

追求纯粹、无干扰的文字沉浸体验：

```markdown
请为我的博客设计一个阅读界面。风格要求：单色黑白美学，正文宽度限制在 680px，侧边栏完全留白或仅放置一个极细的日期标识，背景色为纯白 (#ffffff)。
```


### 🎨 艺术家个人品牌简历 (Curated Portfolio)

通过排版的错位感彰显极强的审美自信：

```markdown
请使用 minimalist-editorial 重构我的简历。风格要求：采用非对称的一栏半布局，关键日期使用超大字号浅灰色填充，所有链接文字仅在悬停时出现极细的底线。
```


### 🏛 精品品牌愿景展台 (Brand Identity)

传递品牌的核心价值与权威感：

```markdown
请设计一个“关于我们”页面。要求：文字块高度集聚在页面左下角，右上角留白占比 60% 以上，品牌口号使用极细的字母间距 (tracking-tightest)，色彩方案仅限灰阶。
```


### 🛠 系统性文档导航手册 (System Manual)

让技术文档具备书籍般的可扫描性：

```markdown
请使用 minimalist-editorial 设计侧边导航。风格要求：移除所有阴影和背景块，仅通过加粗和缩进来区分层级，每一个菜单项之间保持 32px 的垂直间隙。
```


---


`minimalist-editorial` 让排版本身成为主角。**现在就大胆地把间隙调大，把文字作为唯一的装饰，给你的内容应有的尊重。** 🚀
