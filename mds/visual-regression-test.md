# 视觉回归测试：visual-regression-test 快速上手指南


## 📦 什么是 visual-regression-test？


`visual-regression-test`（视觉回归测试）是 UI 开发的“像素级护卫”。它不再依靠肉眼去对比页面是否“变样”，而是通过 **全量截图快照 (Snapshots Comparison)**、**像素差值高亮** 以及 **跨设备栅格对比**，在代码变更后自动检测每一个组件的视觉一致性。它能精准捕捉到那些因为 CSS 污染、字体渲染差异或布局偏移造成的 1px 误差。它是实现**像素级完美 (Pixel Perfect)** 与 **大规模样式重构** 的核心底气。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“视觉防爆盾”：


### 1. Playwright Screenshots 插件 (推荐)
这是目前最直接、性能最高且与 E2E 完美契合的生产级方案：
```bash
# 在 Playwright 测试中启用快照断言
expect(page).toHaveScreenshot();
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步视觉对比规范：
```bash
npx openskills install frontend/visual-test --universal && npx openskills sync
```


### 3. Storybook Chromatic 云端托管
针对大型组件库，利用 Chromatic 的云端渲染能力实现跨浏览器的全量快照比对。


---


## 💬 如何通过对话使用？


调用 `visual-regression-test` 的关键在于：**定义截图的覆盖范围与像素容差 (Threshold)。**


### 万能对话公式
> **[待对比的组件/整页]** + **[快照更新的基础环境 (Platform)]** + **[允许的像素差异百分比]**


---


### 📰 文章详情页的跨设备一致性 (Page Snapshot)

确保不管在 iPhone 还是桌面端，排版始终如一：

```markdown
请为“项目案例页”编写视觉测试。要求：分别在 375px 和 1440px 视口下截图，并与 `main` 分支的基准快照进行 99% 的重合度比对。
```


### 📊 后台复杂图表的颜色还原度测试 (Chart Visuals)

防止数据更新过程中图表的配色或图例发生意外偏移：

```markdown
请检查“销售趋势图”的视觉回归。风格要求：忽略动态变化的数字区域，仅对比坐标轴、图例颜色和背景网格的几何位置。
```


### 🏙 全站通用按钮的圆角与投影的一致性 (Component Audit)

在大规模 CSS 重构后，验证所有原子级组件是否完好：

```markdown
请扫描并对比 `Button` 组件。要求：验证所有 Variant（Primary, Ghost）在不同状态（Hover, Active）下的阴影层级是否符合设计规范。
```


### 💼 CI/CD 的视觉破坏告警流程 (Visual Guard)

在合并 PR 前自动高亮显示 UI 的任何细微变化：

```markdown
请编写一段 GitHub Action 代码。要求：构建失败后自动生成一张差异对比图 (Differential Map)，将变动点标红并上传至 Artifacts 以供审核。
```


### 🛠 系统级不同字体渲染内核的对比 (Font Rendering)

捕获那些非由于代码引起，而是由于浏览器渲染引擎差异造成的样式错乱：

```markdown
请使用 visual-regression-test 对比 Chromium 和 Webkit 内核。风格要求：强制要求文字渲染达到像素对齐，输出一份详细的内核间视觉差异报告。
```


---


`visual-regression-test` 让你的像素更有尊严。**现在就开启你的 UI 快照比对，尝试用数据的力量去保卫你的每一个设计决策。** 🚀
