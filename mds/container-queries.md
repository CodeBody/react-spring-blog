# 容器查询：container-queries 快速上手指南


## 📦 什么是 container-queries？


`container-queries`（容器查询）是响应式设计的第二次革命。它彻底打破了以“浏览器视口 (Viewport)”为中心的布局思维。它允许组件根据其 **父级容器 (Parent Container) 的实时尺寸** 来改变自身的样式。这意味着同一个组件在侧边栏、主内容区或便当盒网格中，都能自动表现出最契合该空间的排版形态。它是**组件化响应式 (Component-Level Responsiveness)** 的终极方案。


## ⚙️ 如何安装？


这是浏览器原生的新特性，无需额外库，仅需开启现代样式上下文：


### 1. 原生 CSS 容器定义 (推荐)
这是最稳健、最高效的生产级方案：
```bash
# 在父级容器上声明命名容器
.card-container {
  container-type: inline-size;
  container-name: sidebar-card;
}
# 在子组件中进行局部查询
@container sidebar-card (width < 400px) {
  .card-content { flex-direction: column; }
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步容器布局语义：
```bash
npx openskills install frontend/container-queries --universal && npx openskills sync
```


### 3. Tailwind 容器查询插件
在 Tailwind 项目中安装官方插件以获得原子化类名支持：
```bash
npm install -D @tailwindcss/container-queries
```


---


## 💬 如何通过对话使用？


调用 `container-queries` 的关键在于：**定义组件在不同空间约束下的表现。**


### 万能对话公式
> **[外层容器名称与类型]** + **[关键尺寸断点 (Breakpoints)]** + **[内部元素的重排规则]**


---


### 📰 高度自适应的文章卡片 (Smart Card)

同一套组件在侧边栏和主列表里表现各异：

```markdown
请使用 container-queries 重构“新闻卡片”。要求：当容器宽度小于 380px 时隐藏图片并垂直排列文字，当大于 600px 时显示双栏布局且增大字号。
```


### 📊 后台侧边栏微型面板 (Sidebar Widgets)

在极小宽度下自动切换为图标展示：

```markdown
请为我的“统计面板”设计容器查询样式。风格要求：当父容器处于 sidebar 中且宽度低于 250px 时，将文字标签隐藏，仅保留 Lucide 图标。
```


### 🍱 便当盒网格内的局部响应 (Bento Grid Item)

在复杂的网格布局中保持审美的一致性：

```markdown
请使用 container-queries 处理便当盒插槽。风格要求：组件根据它所在的 grid-cell 尺寸自动调整 Padding，并让标题在 1x1 和 2x2 格位中呈现不同的视觉权重。
```


### 🛍 多样化商品展示瀑布流 (Dynamic Gallery)

处理不同尺寸瀑布流方格内部的对齐逻辑：

```markdown
请设计一个“变色龙”商品组件。要求：当容器高度大于宽度时采用沉浸式全图模式，高度较小时采用水平磁吸式列表展示，完全基于父级尺寸驱动。
```


### 🛠 系统设置项的可滚动状态 (Setting Row)

在弹出层或全屏页面中自适应切换排版：

```markdown
请使用 container-queries 为“设置项”添加样式。要求：在窄屏容器中将左侧标签与右侧开关堆叠，在宽屏容器中保持单行对齐，背景色在 400px 时产生细微明暗变化。
```


---


`container-queries` 让组件具备了真正的“自愈能力”。**现在就放弃那些繁琐的全局 Media Queries，尝试用容器逻辑去武装你的每一个 UI 组件。** 🚀
