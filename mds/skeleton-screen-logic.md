# 骨架屏加载：skeleton-screen-logic 快速上手指南


## 📦 什么是 skeleton-screen-logic？


`skeleton-screen-logic`（骨架屏加载逻辑）是现代高阶 Web 应用优化“体感渲染速度 (Perceived Performance)”的核心技术。它不再使用单一的旋转进度条，而是通过 **模拟内容的真实排版占位符**，预先渲染出页面的结构轮廓。它不仅是视觉补丁，更是一套**加载优先级与视觉心理学**的平衡方案。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中快速部署骨架加载系统：


### 1. Tailwind 动画占位符 (推荐)
这是最符合现代组件化开发且开箱即用的方案：
```bash
# 利用 Tailwind 内置的 animate-pulse 实用类
<div className="animate-pulse bg-muted rounded h-4 w-3/4"></div>
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步加载占位符语义：
```bash
npx openskills install frontend/skeleton --universal && npx openskills sync
```


### 3. 全局 CSS 骨架样式
在全局 CSS 中添加细腻的骨架闪烁核心样式：
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```


---


## 💬 如何通过对话使用？


调用 `skeleton-screen-logic` 的关键在于：**定义真实内容的形状匹配度**。


### 万能对话公式
> **[待加载页面/组件名]** + **[骨架块的比例分布]** + **[动画的平滑程度指标]**


---


### 📰 文章列表页预加载 (Feed Skeleton)

模拟新闻列表的真实层级，减少用户焦虑：

```markdown
请使用 skeleton-screen-logic 设计文章列表。要求：顶部是 1:1 的头像圆形位，右侧是 3 行等长的标题占位符，底部是 150px 高的大图占位符，并使用柔和的脉冲脉动效果。
```


### 💳 金融资产看板 (Finance Dashboard)

精准匹配数字和图表的轮廓：

```markdown
请为我的“资产概览”设计骨架屏。风格要求：左侧是一个半径 80px 的圆环图占位符，右侧是三个高度为 48px 的水平条，确保背景色使用低对比度的深灰色调。
```


### 🛍 复杂的电商商品详情 (E-commerce Details)

多层级信息的渐进式加载呈现：

```markdown
请使用 skeleton-screen-logic 设计详情页。要求：核心主图位占 50% 宽度，价格区使用加宽的 24px 骨架块，并模拟商品各色块标签的错位分布。
```


### 🖼 图片画廊瀑布流 (Gallery Masonry)

异步加载中的视觉结构保持：

```markdown
请为瀑布流画廊开发骨架屏。要求：格子高度采用随机生成的 200px-450px，模拟真实布局，并确保动画周期交替进行，避免视觉上的机械同步感。
```


### 🛠 系统设置侧边栏 (Setup Sidebar)

导航层级的预览感：

```markdown
请设计一个侧边栏骨架。风格要求：采用极简主义，仅通过一条 2px 的垂直虚线和 5 个高度为 12px 的矩形条，模拟菜单项的排布，颜色为浅蓝白渐变。
```


---


`skeleton-screen-logic` 让用户等待不再漫长。**现在就放弃死板的 Loading 动画，尝试用真实的轮廓去安抚你的每一位用户。** 🚀
