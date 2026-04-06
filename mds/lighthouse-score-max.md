# 满分网速性能：lighthouse-score-max 快速上手指南


## 📦 什么是 lighthouse-score-max？


`lighthouse-score-max`（满分网速性能）是 Web 性能优化的黄金标尺。它不再仅仅是看网页跑得快不快，而是通过 **Core Web Vitals (核心网页指标)**、**可访问性 (A11y)**、**最佳实践 (Best Practices)** 以及 **SEO** 四个维座对网页进行全方位体检。它关注的是如何消灭屏闪、减少主线程阻塞以及提供零延迟的交互体验。它是追求**极致用户体验 (Extreme UX)** 的技术灯塔。


## ⚙️ 如何安装？


你可以通过以下几种方式在开发流程中嵌入性能审计：


### 1. Chrome DevTools 实时诊断 (推荐)
这是最直接、最易用的官方性能体检方案：
```bash
# 不需要安装，直接使用 F12 开发者工具中的 Lighthouse 面板
# 勾选 "Performance" 并点击 "Analyze page load"
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步性能审计规范：
```bash
npx openskills install frontend/lighthouse --universal && npx openskills sync
```


### 3. Lighthouse CLI 自动化套件
在 CI/CD 中集成自动化的性能回归测试：
```bash
npm install -g lighthouse # 工业级命令行审计工具
```


---


## 💬 如何通过对话使用？


调用 `lighthouse-score-max` 的关键在于：**定义具体的性能瓶颈优先优化级。**


### 万能对话公式
> **[待审计的 URL]** + **[重点突破的核心指标 (LCP/TBT/CLS)]** + **[期望的优化分值]**


---


### 🚀 首屏渲染 LCP 极限优化 (LCP Max)

消除主视觉图片加载延迟：

```markdown
请使用 lighthouse-score-max 审计 Landing 页面。要求：针对 LCP 指标提供 5 条优化建议，包括字体预加载 (Preload) 以及英雄图的 Fetch Priority 设置。
```


### 📊 减少长任务 TBT 动态交互优化 (TBT Reduction)

提升复杂仪表盘的点击响应速度：

```markdown
请分析仪表盘的交互延时。风格要求：提供一个减少 Total Blocking Time 的清单，特别是针对第三方 SDK（如 Google Analytics）的延时加载策略。
```


### 🎨 零屏闪 CLS 稳定性检查 (CLS Expert)

防止页面在加载过程中发生不悦的跳动：

```markdown
请使用 lighthouse-score-max 检查详情页面的累积布局偏移。风格要求：查找所有未指定 `aspect-ratio` 的图片和动态插入的广告位，并给出 CSS 修复代码。
```


### 💼 针对搜索引擎的高阶 SEO 审计 (SEO Mastery)

确保元数据与语意结构完美契合爬虫喜好：

```markdown
请为一个“企业介绍页”进行整站 SEO 体验检查。要求：输出所有缺失的 meta 标签提示、Canonical URL 校验状态，并检查 H1 标签的唯一性。
```


### 🛠 系统级自动化回归测试流程 (Auto Audit)

在每次代码合并前自动生成性能报告：

```markdown
请编写一段 GitHub Action。要求：当 main 分支有更新时，自动运行 Lighthouse CLI，如果性能得分低于 90，则自动 Block 合并请求并发送告警。
```


---


`lighthouse-score-max` 让优化的成果数据化。**现在就开启你的审计报告，尝试用每一个分值的提升去证明你的技术统治力。** 🚀
