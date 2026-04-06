# 内容可见性优化：content-visibility-auto 快速上手指南


## 📦 什么是 content-visibility-auto？


`content-visibility-auto`（内容可见性优化）是现代 Web 渲染的“黑科技”。它类似于图片懒加载，但作用于 **DOM 的整个渲染与布局**。它告诉浏览器：如果这个元素不在视口内，请**跳过它的渲染与布局计算**。对于拥有成千上万个 DOM 节点的超长页面，它能将首屏渲染时间缩减 **50% 以上**。它是实现**渲染零开销 (Zero Rendering Cost)** 的终极手段。


## ⚙️ 如何安装？


这是浏览器原生的 CSS 属性，无需额外库，仅需针对旧版浏览器提供优雅降级：


### 1. 原生 CSS 可见性定义 (推荐)
这是最纯粹、性能最高的生产级方案：
```bash
# 在长列表或重型组件容器上启用自动可见性
.heavy-section {
  content-visibility: auto;
  contain-intrinsic-size: 1000px; /* 定义预估高度，防止滚动条跳动 */
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步渲染可见性规范：
```bash
npx openskills install frontend/content-visibility --universal && npx openskills sync
```


### 3. Resize Observer 联动方案
结合 JavaScript 对不支持该属性的浏览器进行动态高度补偿。


---


## 💬 如何通过对话使用？


调用 `content-visibility-auto` 的关键在于：**定义预估高度 (Intrinsic Size) 以防止 CLS。**


### 万能对话公式
> **[超长页面中的特定 Section]** + **[预估容器高度 (Contain-intrinsic-size)]** + **[包含关系 (Containment) 模式]**


---


### 📰 无限滚动的文章评论区 (Million Comments)

处理包含数千个复杂评论节点的列表性能：

```markdown
请使用 content-visibility-auto 优化“评论列表”。要求：每个评论卡片启用 auto 可见性，预估高度设为 120px，并配合 `contain: layout style` 以实现极致分块。
```


### 🖼 超大规模图片展示画廊 (Mega Gallery)

防止浏览器在页面初次渲染时计算所有图片的位置：

```markdown
请为画廊容器添加 content-visibility。风格要求：设置 `contain-intrinsic-size` 为 500px，确保随着用户滚动，只有可见的图片容器才参与浏览器布局计算。
```


### 🌌 长达万字的法律条款与文档 (Legal Scroll)

在极长文本中保持丝滑的滚动性能：

```markdown
请优化“用户协议”页面。要求：将冗长的协议条款划分为 10 个独立 Section，全部开启 `content-visibility: auto`，并设置 `contain: paint` 以隔离重绘。
```


### 💼 动态配置的复杂仪表盘模块 (Dynamic Widgets)

隐藏折叠面板中未显示的大量管理组件：

```markdown
请为“高级设置”折叠面板实现懒渲染。要求：在 CSS 中定义可见性，让处于 `.hidden` 状态的板块彻底从浏览器渲染流程中剥离，显著降低内存占用。
```


### 🛠 系统级加载性能深度对标 (A/B Audit)

通过该属性实现从 50 分到 90 分的 Lighthouse 跃迁：

```markdown
请重构 Landing 页面底部的“推荐产品”卡片阵列。风格要求：开启内容可见性，将 Initial Render 时间压缩在 1.5s 以内，防止庞大的 DOM 树拖慢 LCP。
```


---


`content-visibility-auto` 让你的页面“按需渲染”。**现在就放弃那些繁重的全量解析，尝试用可见性逻辑去解放浏览器的渲染主线程。** 🚀
