# 代码分割策略：code-splitting-strategy 快速上手指南


## 📦 什么是 code-splitting-strategy？


`code-splitting-strategy`（代码分割策略）是解决现代 Web 应用“肥胖”问题的终极良方。它彻底告别了“一个巨大的 main.js 包”的原始时代。它通过 **动态导入 (Dynamic Imports)**、**路由级代码隔离** 以及 **组件级异步加载**，确保用户仅下载当前页面所必需的 JS 代码。这能极大地缩短 **可交互时间 (TTI)**，让你的应用在移动端也能体验到瞬时响应。它是对**资源精算 (Resource Precision)** 的最高阶实践。


## ⚙️ 如何安装？


代码分割是现代打包工具（如 Vite, Webpack）的核心能力，推荐在主流框架中启用：


### 1. React/Vite 动态导入方案 (推荐)
这是最平滑、最符合直觉的生产级分包方案：
```bash
# 使用 React.lazy 实现路由组件异步化
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步分包优化规范：
```bash
npx openskills install frontend/code-split --universal && npx openskills sync
```


### 3. Webpack 魔术注释
在低版本环境中使用注释引导打包器进行特定分块：
```js
import(/* webpackChunkName: "heavy-chart" */ './HeavyChart');
```


---


## 💬 如何通过对话使用？


调用 `code-splitting-strategy` 的关键在于：**定义非核心资源的延时加载优先级。**


### 万能对话公式
> **[目标大型组件/库]** + **[触发异步加载的时机]** + **[加载中的兜底 (Suspense) 视图]**


---


### 📰 复杂的交互式仪表盘分拆 (Admin Splits)

防止管理后台首屏加载过大导致白屏：

```markdown
请使用 code-splitting-strategy 重构“侧边栏路由”。要求：将所有的二级子页面全部改为动态导入，并共享一个 `LoadingSkeleton` 占位组件。
```


### 🖼 重型第三方可视化图表库按需引入 (Lazy Charts)

仅在用户滚动到可见区域时才下载昂贵的库：

```markdown
请优化 Echarts 组件。风格要求：仅当用户点击“查看趋势图”按钮后，才异步下载并执行图表渲染代码，避免阻塞首页关键路径。
```


### 🌌 复杂动画交互资源的动态揭示 (Animation Split)

不让非关键动效拖慢产品落地页：

```markdown
请使用代码分割处理“背景粒子动画”。要求：主文本渲染完成后，再后台静默加载粒子引擎，直到 2s 后再开启粒子效果。
```


### 💼 配置式模态框与弹窗系统的优化 (Modal Strategy)

将不常用且巨大的功能弹窗彻底隔离：

```markdown
请为“用户偏好设置弹窗”添加异步分割。要求：将其独立打包成子 Chunk，只有当用户点击设置按钮时才发起网络请求。
```


### 🛠 系统级自动资源预加载 (Pre-fetch Logic)

在后台预先下载用户极有可能访问的下一个资源：

```markdown
请使用代码分割并结合 `webpackPrefetch: true`。要求：当用户鼠标悬停在“个人中心”按钮上时，提前在浏览器空闲时间下载对应的 JS 包。
```


---


`code-splitting-strategy` 让你的应用更“苗条”。**现在就放弃那些臃肿的静态导入，尝试用按需加载逻辑去重塑你的每一条分包曲线。** 🚀
