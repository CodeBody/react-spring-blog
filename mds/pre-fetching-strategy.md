# 预读取策略：pre-fetching-strategy 快速上手指南


## 📦 什么是 pre-fetching-strategy？


`pre-fetching-strategy`（预读取策略）是实现“瞬时页面切换”的黑特性。它不再等到用户点击才开始下载资源，而是利用浏览器的 **空闲时间 (Idle Time)**，提前将用户**极有可能访问的下一个页面或资源**静默下载到本地。通过 **`<link rel="prefetch">`**、**Guess.js 智能预测** 以及 **悬停触发 (Hover-pre-fetch)**，它能在用户点击的一瞬间，实现“零延迟”的内容展示。它是对**感知加载速度 (Perceived Performance)** 的极速定义。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中引入“先发制人”的预加载逻辑：


### 1. Next.js Link 组件内置方案 (推荐)
这是目前最智能且无需配置的生产级分包预取方案：
```bash
# 不需要额外安装，Next.js 的 <Link> 默认开启 prefetch
import Link from 'next/link';
<Link href="/dashboard">Go to Dashboard</Link>
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步预取策略规范：
```bash
npx openskills install frontend/pre-fetch --universal && npx openskills sync
```


### 3. Quicklink 轻量级库集成
自动检测视口内的链接并静默预取：
```bash
npm install quicklink # 谷歌推出的零配置分包预取方案
```


---


## 💬 如何通过对话使用？


调用 `pre-fetching-strategy` 的关键在于：**平衡带宽消耗与页面切换速度。**


### 万能对话公式
> **[高概率跳转链接]** + **[触发预取的条件 (Visible/Hover/Idle)]** + **[目标资源的包大小限制]**


---


### 📰 高频资讯流后续页预加载 (Pre-fetch Post)

让用户在阅读列表时，对应的详情页数据已在后台就绪：

```markdown
请使用 pre-fetching-strategy 优化文章列表。要求：当文章标题进入视口 50% 时，自动预取详情页的 JS 包和核心文章数据。
```


### 🖼 幻灯片导航的静默预加载 (Next Slide)

消除切换图片或幻灯片时的瞬间黑屏：

```markdown
请为我的“产品轮播图”设计预取。要求：当用户停留在当前幻灯片 2s 以上，自动下载下一张高分辨率大图的缓存。
```


### 🌌 基于鼠标悬停的即时预取 (Hover-to-fetch)

利用用户点击前的 100-300ms 黄金间隔：

```markdown
请为一个“个人中心按钮”实现悬停预取。风格要求：当用户鼠标悬停超过 50ms，立即开始预解析 API 请求，实现极速的转场响应。
```


### 💼 搜索结果的智能深度预读 (Search Pre-fetch)

让搜索体验真正做到“所见即所得”：

```markdown
请使用 pre-fetching-strategy 优化搜索结果。要求：将搜索排名第一的结果自动标记为预取，显著降低用户的点击跳出率。
```


### 🛠 系统级低功耗模式适配 (Network Aware)

在移动端或弱网环境下自动禁用昂贵的预取：

```markdown
请编写一段预取控制逻辑。要求：通过 `navigator.connection` 监测网络，如果是 3G 或开启了数据节省模式，则自动关闭所有的预取操作。
```


---


`pre-fetching-strategy` 让你的应用快人一步。**现在就开启你的后台预取，尝试用空闲时间去换取用户每一次转场的惊喜。** 🚀
