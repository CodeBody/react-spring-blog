# 复杂网格系统：css-grid-mastery 快速上手指南


## 📦 什么是 css-grid-mastery？


`css-grid-mastery`（复杂网格系统）是 Web 布局的终极主宰。它不仅仅是简单的分栏，而是通过 **二维坐标控制 (Rows & Columns)**、**命名区域布局 (Named Areas)** 以及 **自动填充与自适应 (Auto-fill & Auto-fit)**，在单一声明中实现极度复杂且响应式极强的页面结构。它是对**二维排版逻辑 (Syntactic Grids)** 的最高效抽象。


## ⚙️ 如何安装？


网格系统是浏览器原生的超能力，你只需要在项目中启用现代属性即可：


### 1. 原生 CSS 定义 (推荐)
这是最纯粹、最强大的生产级方案：
```bash
# 激活容器网格上下文
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步网格布局范式：
```bash
npx openskills install frontend/grid-mastery --universal && npx openskills sync
```


### 3. Tailwind Grid 组合
利用 Tailwind 的原子化类名快速构建网格原型：
```bash
# 在 HTML 标签中直接应用网格类
<div className="grid grid-cols-12 gap-6 grid-flow-row-dense"></div>
```


---


## 💬 如何通过对话使用？


调用 `css-grid-mastery` 的关键在于：**定义单元格的流动性与权重**。


### 万能对话公式
> **[总容器分栏设定]** + **[子项的跨度 (Span) 规则]** + **[响应式重排策略]**


---


### 📰 复杂杂志拼贴布局 (Magazine Collage)

多尺寸图片与文本的高级层叠：

```markdown
请使用 css-grid-mastery 设计拼贴区。要求：定义 12 列网格，第一张大图占据 8 列 2 行，侧边栏占据 4 列全高，其余小图自动填补空隙 (grid-auto-flow: dense)。
```


### 📊 交互式数据分析大盘 (BI Dashboard)

在极窄空间内实现多维指标的灵活对齐：

```markdown
请为我的“业务监控盘”设计网格。要求：使用 grid-template-areas 命名区域：Header, Stats, Sidebar, Main, Footer。在移动端降级为单列布局，桌面端 Stats 区横跨 4 个单元格。
```


### 🎨 错位视差相册 (Parallax Gallery)

利用网格间距与位置偏移创造深度感：

```markdown
请使用 css-grid-mastery 开发视差画廊。风格要求：网格间距设为 40px，奇数图片容器向下偏移 20px，偶数图片向上偏移 20px，背景网格始终保持 10% 的透明度。
```


### 💼 定制化日历视图 (Custom Calendar)

实现精确到每一天的规则排布：

```markdown
请设计一个“交互式日历”。要求：固定 7 列布局，首行显示周一至周日，内容区通过 grid-column-start 根据每月起始日动态对齐，卡片悬停时发生 Z 轴轻微隆起。
```


### 🛠 系统状态节点流 (System Node Flow)

可视化展示复杂的逻辑拓扑：

```markdown
请使用 css-grid-mastery 设计“节点拓扑图”。要求：网格固定 60px 边长，节点放置在命名好的网格点上，路径线通过空网格单元格的边框进行模拟展示。
```


---


`css-grid-mastery` 让布局不再是计算题。**现在就放弃那些繁琐的 Margin 堆叠，尝试用二维网格去统治你的每一个像素。** 🚀
