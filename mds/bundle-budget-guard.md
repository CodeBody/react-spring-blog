# 包体积预演守卫：bundle-budget-guard 快速上手指南


## 📦 什么是 bundle-budget-guard？


`bundle-budget-guard`（包体积预演守卫）是 Web 性能的“守门员”。它彻底终结了“功能上线后才发现包大了一倍”的悲剧。它通过 **构建时体积检测 (Build-time Diffing)**、**硬性性能预算 (Performance Budgets)** 以及 **自动分包建议**，在每一次代码提交时自动拦截超过预期的臃肿代码。它能精准识别出由于引入厚重第三方库而导致的 JS 包体积激增。它是实现**长期性能稳定性 (Sustainable Performance)** 与 **轻量化交付** 的核心机制。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中部署这套“防膨胀协议”：


### 1. Bundlesize 工具集成 (推荐)
这是目前最简洁且与 CI/CD 深度集成的生产级体积拦截方案：
```bash
# 为现有项目安装核心监控层
npm install bundlesize --save-dev
# 在 package.json 中定义预算阈值
"bundlesize": [{ "path": "./dist/*.js", "maxSize": "150kB" }]
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步包体积守卫规范：
```bash
npx openskills install frontend/bundle-guard --universal && npx openskills sync
```


### 3. Webpack/Vite 性能预算配置
在打包工具层面开启基础的体积告警提示。


---


## 💬 如何通过对话使用？


调用 `bundle-budget-guard` 的关键在于：**定义核心入口的体积红线与自动修复的库替换建议。**


### 万能对话公式
> **[目标产物路径 (Path)]** + **[最大允许体积 (Budget)]** + **[拦截失败后的降级方案]**


---


### 📰 高频更新的首页 JS 包守卫 (Initial JS Bundle)

确保首页的可交互时间不因新功能而退化：

```markdown
请使用 bundle-budget-guard 监控 `main.js`。要求：将硬性限制设为 180kB，如果代码 Push 导致体积超过限制，自动 Block 合并请求并输出详情。
```


### 📊 后台重型图表库的分包审计 (Dynamic Split Guard)

强制开发者对昂贵的库使用 Dynamic Import：

```markdown
请分析 `vendors` 包的大小变化。风格要求：如果单次构建中 `echarts` 或 `pdf.js` 没有被异步加载，则抛出性能优化建议并强制重写导入逻辑。
```


### 🏙 全站通用图标库的引入量检测 (Icon Tree-shaking)

防止全量引入庞大的图标库（如 FontAwesome）造成的浪费：

```markdown
请使用 bundle-budget-guard 审计图标引用。要求：断言生成的 SVG Chunk 大小不超过 30kB，否则提示开发者检查 `Tree-shaking` 是否正确配置。
```


### 💼 CI/CD 的体积退化可视化报告 (PR Stats Report)

在合并 PR 前，直观查看代码变更对包大小的影响百分比：

```markdown
请编写一段 GitHub Action 代码。要求：生成一份 `Bundle Size Diff` 表格，对体积增加超过 5% 的 Chunk 标红，并自动回复到当前的 PR 评论区。
```


### 🛠 系统级自动化“库替换”建议生成 (Auto-replacement AI)

针对那些由于体积过大被拦截的依赖，提供轻量级的替代品：

```markdown
请扫描并拦截所有超过 50kB 的第三方库。风格要求：针对被拦截的库（如 moment），自动推荐安装 `dayjs` 或 `date-fns` 并在文档站中展示安装指令。
```


---


`bundle-budget-guard` 让你的代码更轻盈。**现在就开启你的包体积守卫，尝试用严谨的性能预算去保卫你的每一个字节输出。** 🚀
