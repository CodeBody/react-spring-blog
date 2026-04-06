# 滚动驱动动画：scroll-driven-animation 快速上手指南


## 📦 什么是 scroll-driven-animation？


`scroll-driven-animation`（滚动驱动动画）是现代 Web 动画的巅峰之作。它彻底摆脱了繁琐的 JavaScript 滚动监听，直接在 **CSS 层面将动画进度与滚动进度 (Scroll Progress)** 进行绑定。这意味着动画的节奏完全由用户的滚动速度控制，且由于运行在浏览器的合成器线程，它具备传统方案无法比拟的**纯净性能**与**交互流畅度**。


## ⚙️ 如何安装？


这是浏览器原生的新特性，无需额外库，仅需配置现代浏览器兼容上下文：


### 1. 原生 CSS 时间轴定义 (推荐)
这是最纯粹、性能最高的生产级方案：
```bash
# 定义滚动时间轴
@keyframes reveal {
  from { opacity: 0; transform: translateY(100px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal-item {
  animation: reveal linear both;
  animation-timeline: view(); /* 绑定视野范围时间轴 */
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步滚动交互语义：
```bash
npx openskills install frontend/scroll-anim --universal && npx openskills sync
```


### 3. Polyfill 兼容层
针对旧版浏览器，注入滚动驱动的兼容性逻辑：
```bash
npm install scroll-timeline-polyfill
```


---


## 💬 如何通过对话使用？


调用 `scroll-driven-animation` 的关键在于：**定义动画的触发视野与进程映射**。


### 万能对话公式
> **[动画主体元素]** + **[滚动追踪源 (scroll/view)]** + **[关键帧映射区间]**


---


### 📜 沉浸式阅读进度条 (Reading Progress)

让用户清晰感知文章消耗进度：

```markdown
请使用 scroll-driven-animation 为顶部导航栏添加进度条。要求：背景色使用品牌渐变，宽度随 body 滚动从 0% 映射到 100%，使用 animation-timeline: scroll() 实现。
```


### 🖼 图片画廊渐进式揭示 (Image Reveal)

在用户滚入视野时优雅地浮现内容：

```markdown
请为我的“项目案例图片”设计滚入动画。要求：当图片进入视野 20% 时开始透明度渐变和缩放恢复，并在离开视野时保持状态，使用 view() 时间轴。
```


### 🌌 视差背景元素位移 (Parallax Depth)

创造多层次的深邃空间感：

```markdown
请为背景装饰方块添加滚动驱位移。要求：定义三个不同层级的方块，随着页面滚动，它们以 0.2, 0.5, 0.8 的不同速率向上平移，模拟真实的物理视差。
```


### 🎞 品牌 Logo 动态缩小吸顶 (Logo Shrink)

在滚动过程中微妙地切换导航逻辑：

```markdown
请设计一个 Logo 缩小动效。要求：当用户向下滚动 100px 后，Logo 的 scale 从 1.0 线性过渡到 0.6，并改变其滤镜颜色，绑定全局滚动轴。
```


### 🛠 系统状态节点路径绘制 (Path Drawing)

通过滚动“画出”复杂的逻辑连线：

```markdown
请使用 scroll-driven-animation 为我的架构图设计 SVG 路径动画。要求：随着用户滚动，SVG 的 stroke-dashoffset 逐渐减少，实现“滚动即生长”的动态导流效果。
```


---


`scroll-driven-animation` 让页面像胶片一样随心转动。**现在就放弃那些卡顿的 JS 事件监听，尝试用 CSS 原生逻辑去捕捉用户的每一次滚动。** 🚀
