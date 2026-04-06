# 包体积审计：bundle-size-auditor 快速上手指南


## 📦 什么是 bundle-size-auditor？


`bundle-size-auditor`（包体积审计）是 Web 应用瘦身的“外科手术刀”。它不再是通过盲目的猜测，而是利用 **Webpack Bundle Analyzer**、**Rollup Visualizer** 以及 **Treeshaking (摇树优化)**，精准定位构建输出中的每一个字节来源。它能帮你识别出那些被误引入的厚重依赖（如 moment.js 或 lodash 的全量引入），并提供极简的替代方案。它是实现**极致传输效率 (Transmission Efficiency Control)** 的核心手段。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“包体积透视眼”：


### 1. Vite Visualizer 集成方案 (推荐)
这是目前最直观、最现代的构建输出可视化方案：
```bash
# 安装可视化插件
npm install -D rollup-plugin-visualizer

# 在 vite.config.ts 中启用
import { visualizer } from "rollup-plugin-visualizer";
plugins: [visualizer({ open: true })]
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步包体积审计规范：
```bash
npx openskills install frontend/bundle-audit --universal && npx openskills sync
```


### 3. Webpack 静态资源分析器
针对后端较重的项目生成静态 HTML 分包报告：
```bash
npm install --save-dev webpack-bundle-analyzer
```


---


## 💬 如何通过对话使用？


调用 `bundle-size-auditor` 的关键在于：**定义审计的目标文件与异常体积阈值。**


### 万能对话公式
> **[构建输出的单文件 (Chunks)]** + **[允许的最大体积 (Budget)]** + **[对第三方库的按需替换要求]**


---


### 📰 重型时间处理库的替换审计 (Legacy Library)

将 500KB 的旧库替换为 5KB 的现代方案：

```markdown
请使用 bundle-size-auditor 检查项目依赖。发现 `moment.js` 占用过大，请给出将其全量替换为 `dayjs` 的重构方案及体积对比报告。
```


### 🖼 数据可视化库的动态分拆审计 (Chart Audit)

找出阻塞首屏加载的最大元凶：

```markdown
请审计我的 `vendors` 分包。要求：找出占位超过 100KB 的非核心 UI 库，并自动将其标记为动态导入 (Dynamic Import)。
```


### 🌌 图标系统的按需加载清理 (Icon Stripping)

防止引入数千个未使用的 SVG 图标：

```markdown
请检查 @lucide-react 的引入情况。要求：开启 Treeshaking 审核，确保没有未使用的图标被打包进核心包，并输出清理后的体积减量。
```


### 💼 CI/CD 的包体积预算守卫 (Size Budgeting)

防止代码合并导致包体积野蛮生长：

```markdown
请编写一段性能预算配置。要求：如果主包 (Initial JS) 超过 200KB，则在 Github Action 中抛出警告，并输出体积增加的差异 Diff。
```


### 🛠 系统级自动依赖清理建议 (Dependency Cleanup)

找出那些早已弃用但依然在 `package.json` 中的“幽灵”依赖：

```markdown
请使用 bundle-size-auditor 扫描所有引用。要求：输出所有未被实际 import 的生产环境依赖，并给出 `npm uninstall` 清理指令。
```


---


`bundle-size-auditor` 让每一位字节都物尽其用。**现在就开启你的包分析报告，尝试用每一次“减负”去换取用户极速的加载惊喜。** 🚀
