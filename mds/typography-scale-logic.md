# 字体比例系统：typography-scale-logic 快速上手指南


## 📦 什么是 typography-scale-logic？


`typography-scale-logic`（字体比例系统）是 Web 排版的数学灵魂。它不再是随意的像素大小，而是通过 **等比基准 (Base Ratio, 如黄金比例 1.618)**、**流动式自适应 (Fluid Typography)** 以及 **视觉权重级联**，在全端建立起一套严丝合缝的阅读节奏感。它是实现**设计专业度 (Authored Aesthetics)** 与 **跨端一致性** 的核心逻辑。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中构建“会跳舞”的文字：


### 1. CSS 变量与 clamp() 方案 (推荐)
这是最平滑、最符合现代标准的线性缩放方案：
```bash
# 在 :root 中定义流动式字阶
--text-xl: clamp(1.25rem, 5vw, 2.5rem);
--text-title: clamp(2rem, 10vw, 5rem); /* 主标题跨度 */
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步编排比例语义：
```bash
npx openskills install frontend/typography --universal && npx openskills sync
```


### 3. Tailwind Typography 插件配置
在配置文件中注入基于比例的档位：
```js
module.exports = {
  theme: {
    fontSize: {
      'xs': '.75rem',
      'base': '1rem',
      'hero': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
    }
  }
}
```


---


## 💬 如何通过对话使用？


调用 `typography-scale-logic` 的关键在于：**定义层级跨度与负空间对比度。**


### 万能对话公式
> **[基础字号 (Base Size)]** + **[比例乘数 (Multiplier)]** + **[适应性的流动区间]**


---


### 🏡 高端建筑设计博客 (Minimalist Editorial)

利用极端的字阶对比塑造品牌的高级感：

```markdown
请使用 typography-scale-logic 设计文章页。风格要求：主标题采用 1.618 的黄金比例步进，H1 与正文对比度设为 1:8，并确保中文字体行高设为 1.8 倍。
```


### 🗞 杂志风格大标题封面 (Hero Banner)

在全屏排版中实现文字的视觉压迫感：

```markdown
请为一个“产品愿景”页面设计流动字阶。要求：标题在移动端 1080px 时充满全屏宽度，使用非常紧致的负间距 (tracking-tight)，并确保字重为 900+。
```


### 🎨 灵感画廊的微型注释 (Captions Logic)

在极小尺寸下依然保持字型的锐利度：

```markdown
请使用 typography-scale-logic 重构图片注释。风格要求：字体采用 10px-12px 的 Outfit 半透明分档，字母间距增加 0.1em，确保即使在深色背景下也有极高的透气感。
```


### 🏛 多语种混排平衡 (Internationalization)

解决中文与西文字体在视觉中心上的不匹配：

```markdown
请定义一套中英混排比例。要求：中文正文使用 `Noto Serif SC` 16px，对应英文副标题使用 `Inter` 粗体缩放至 0.95 倍权重，实现视觉上的完美平衡。
```


### 🛠 系统设置菜单的快速扫描性 (UI Consistency)

让技术文档的分级结构一目了然：

```markdown
请使用 typography-scale-logic 设计导航侧边栏。风格要求：导航项设为 14px 细体，当前选中项加粗并微调 letter-spacing，建立三级递减的排版灰阶。
```


---


`typography-scale-logic` 让文字有了音节律动。**现在就放弃那些随机的 px 数值，尝试用数学比例去丈量你的每一行内容。** 🚀
