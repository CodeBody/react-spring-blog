# 新粗野主义 UI：neobrutalism-ui 快速上手指南


## 📦 什么是 neobrutalism-ui？


`neobrutalism-ui`（新粗野主义）是近两年在 Figma 和 Gumroad 等顶尖平台爆火的视觉流派。它通过 **大胆的粗黑边框 (Bold Strokes)**、**高饱和度且不调和的纯色** 以及 **硬边缘的硬朗阴影**，打破了传统 UI 的柔和平滑。它代表了一种**原始、直接且具有叛逆精神**的现代审美。


## ⚙️ 如何安装？


你可以通过以下几种方式为你的项目注入这种硬核视觉：


### 1. Tailwind 属性极速开发 (推荐)
这是最符合新粗野主义理念的生产级方案：
```bash
# 不需要额外插件，直接利用 Tailwind 的原子化能力
npm install -D tailwindcss
```


### 2. 通过 OpenSkills 动态开启
在 Agent 框架下一键同步视觉基调：
```bash
npx openskills install frontend/neobrutalism --universal && npx openskills sync
```


### 3. 全局 CSS 基础令牌
在全局 CSS 中添加新粗野主义核心样式：
```css
.brutalist-card {
  background: #facc15; /* 黄色 */
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px #000; /* 硬阴影 */
  padding: 24px;
}
```


---


## 💬 如何通过对话使用？


调用 `neobrutalism-ui` 的关键在于：**定义对比度与几何纯度**。


### 万能对话公式
> **[组件名称]** + **[硬朗边框宽度]** + **[高饱和色系对比度]** + **[偏置阴影逻辑]**


---


### 🛒 潮流电商详情页 (Concept Shop)

利用高对比度色彩吸引用户注意力：

```markdown
请使用 neobrutalism-ui 为我重新设计“商品详情页”。风格要求：背景使用鲜亮的荧光绿，边框统一设为 4px 纯黑，阴影向右下方偏置 8px 且不带模糊。
```


### 📰 硬核新闻报刊 (News Portal)

追求最原始、直白的信息传递效率：

```markdown
请将此新闻列表重构成新粗野主义风格。风格要求：采用超大的加粗无衬线字体，标题下方使用 5px 的黑线分隔，按钮采用粉色背景且带有反直觉的硬边阴影。
```


### 🎨 创意工作室主页 (Creative Portfolio)

彰显极强的个人风格与排版自信：

```markdown
请为我开发一个新粗野主义的作品集主页。风格要求：采用非对称的网格系统，每个项目卡片边缘都有明显的粗黑线条，背景色在用户滚动时在红、蓝、黄之间循环切换。
```


### 🛠 管理后台卡片 (Admin Kit)

打破沉闷，让数据不再无趣：

```markdown
请使用 neobrutalism-ui 设计数据统计仪表盘。风格要求：卡片采用高亮青色背景，数字采用巨大的字体，且所有的按钮在悬停时只需稍微平移 2px 而非缩放。
```


### ⌨️ 高频交互表单 (Input Forms)

通过强烈的几何感提升表单的指引性：

```markdown
请为登录页面设计一个新粗野主义表单。风格要求：输入框背景使用米白色，边框设为 3px 纯黑，提交按钮在点击时需产生“物理下沉”的视觉反馈效果。
```


---


`neobrutalism-ui` 是给那些有表达欲的前端工程师准备的。**现在就将你的 border-width 调大，迎接极简之外的一场色彩革命。** 🚀
