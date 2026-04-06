# 懒加载大师：lazy-load-mastery 快速上手指南


## 📦 什么是 lazy-load-mastery？


`lazy-load-mastery`（懒加载大师）是现代 Web 性能优化的核心策略。它彻底打破了“一次性加载所有内容”的陈旧思维。它通过 **Intersection Observer API**、**Native Lazy Loading** 以及 **按需占位图**，确保只有当用户即将滚动到目标位置时，才触发资源的下载。这能极大地节省用户的带宽并缩短 **首屏渲染时间**。它是实现**极致包体积控制 (Extreme Bundle Efficiency)** 的重要手段。


## ⚙️ 如何安装？


懒加载已成为浏览器原生的内置能力，推荐在各个层级中启用：


### 1. 原生 HTML 懒加载属性 (推荐)
这是最简单、最可靠的生产级方案：
```bash
# 在 <img> 或 <iframe> 标签中直接添加 loading 属性
<img src="/photo.jpg" loading="lazy" alt="Photo" />
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步加载策略规范：
```bash
npx openskills install frontend/lazy-load --universal && npx openskills sync
```


### 3. 高级 Intersection Observer 逻辑封装 (React/Vue)
实现更精细的按需加载控制逻辑：
```bash
# 在 React 指令中使用库
npm install react-intersection-observer
```


---


## 💬 如何通过对话使用？


调用 `lazy-load-mastery` 的关键在于：**定义触发加载的视口阈值 (Threshold) 与兜底占位。**


### 万能对话公式
> **[待懒加载的组件/资源]** + **[视口相交 (Intersection) 的感知距离]** + **[加载前后的过渡占位 (Placeholder)]**


---


### 📰 文章列表图片的批量懒加载 (Feed Lazy)

处理包含数百张图片的长列表而不造成带宽浪费：

```markdown
请使用 lazy-load-mastery 优化首页列表。要求：所有缩略图启用 Native Lazy Loading，并在加载完成前显示一个与主色调一致的低饱和度占位块。
```


### 🖼 重型富媒体视频的按需播放 (Video Lazy)

防止后台自动加载视频资源导致的内存占用：

```markdown
请为我的“案例视频区”设计懒加载逻辑。风格要求：仅当用户滚动到视频上方 200px 时，才开始预取 (preload: metadata) 并在可见时自动播放。
```


### 🌌 复杂图表组件的动态挂载 (Component Lazy)

延迟执行昂贵的 JS 数据可视化渲染：

```markdown
请为一个“年度财务图表”组件添加懒加载。风格要求：使用 React.lazy 配合 Intersection Observer，确保图表仅在可见时才进行数据抓取与渲染。
```


### 💼 社交分享与第三方地图脚本加载 (SDK Lazy)

阻止非核心 SDK 拖慢页面初始化速度：

```markdown
请为 Google Maps 小窗添加延迟加载。要求：仅当用户点击“查看位置”按钮后，才异步加载 Map SDK，并在此之前显示一个静态封面图占位。
```


### 🛠 全局滚动列表的虚拟分层加载 (Virtual Scroll)

处理无限滚动列表的极致性能优化方案：

```markdown
请使用 lazy-load-mastery 并结合虚拟列表逻辑。要求：仅渲染当前可见的 10 个数据行，其余上下缓冲区各保留 5 行，彻底解决万级数据的渲染卡顿。
```


---


`lazy-load-mastery` 让你的应用更轻盈。**现在就放弃那些盲目的全量加载，尝试用按需加载逻辑去优化你的每一个字节。** 🚀
