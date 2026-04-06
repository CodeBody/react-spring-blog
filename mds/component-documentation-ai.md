# 组件自动化文档：component-documentation-ai 快速上手指南


## 📦 什么是 component-documentation-ai？


`component-documentation-ai`（组件自动化文档）是设计系统落地的“布道师”。它不再需要开发者手动撰写枯燥的 Markdown 描述，而是通过 **TypeScript 源码解析**、**JSDoc 注解提取** 以及 **AI 自动生成交互式示例**，将业务组件转化为对产品经理、设计师和新加入开发者极度友好的活文档。它不仅包含 API 参数，还提供 **可实时编辑预览 (Live Playground)** 与 **多状态视觉演练**。它是实现**团队协作效率 (Internal Developer Experience)** 的核心资产。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中接入“自愈式文档系统”：


### 1. Storybook 自动文档渲染 (推荐)
这是目前最健全、最现代的组件化文档生产级方案：
```bash
# 在现有 React 项目中快速启用 Storybook
npx storybook@latest init
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步组件文档规范：
```bash
npx openskills install react/component-docs --universal && npx openskills sync
```


### 3. Docusaurus 静态文档站系统
针对大型设计系统，结合源码提取插件生成全格式的在线手册。


---


## 💬 如何通过对话使用？


调用 `component-documentation-ai` 的关键在于：**定义 Props 的类型限制与多场景的代码示例。**


### 万能对话公式
> **[待撰写文档的 React 源码]** + **[必须展示的核心交互状态]** + **[面向非技术人员的业务说明]**


---


### 📰 原子按钮库的多状态文档 (Atom Docs)

自动输出所有 Props 的类型详情与对应视觉快照：

```markdown
请使用 component-documentation-ai 为 `Button` 编写文档。要求：自动解析 `variant`、`size` 和 `loading` 属性，并生成每种组合下的 Live 代码块。
```


### 📊 复杂表格组件的数据注入文档 (Molecule Mapping)

直观展示复杂 JSON 如何转化为可视化的数据行：

```markdown
请为“数据报表表格”编写说明。风格要求：提供一个随机生成 10 条数据的示例代码块，并在文档中注明每一个字段的可选项及其业务逻辑含义。
```


### 🏙 针对设计师的 UI 规范映射 (Design Sync)

将代码中的间距、颜色令牌与 Figma 中的设计规范自动对齐：

```markdown
请在 Storybook 文档中开启 `Controls` 侧边栏。风格要求：将代码中的 HSL 变量映射为色彩选择器，让设计师能在文档站中直接实时调色。
```


### 💼 CI/CD 自动生成的发布变更日志 (Changelog Auto)

在代码合并后，根据组件的差异自动输出版本说明：

```markdown
请编写一个 GitHub Action。要求：当有 `packages/ui` 变动时，自动抓取最新的 Commit 记录并生成一份可读性强的组件变更日志文档。
```


### 🛠 系统级常用交互模式的最佳实践手册 (Best Practices)

超越组件本身的 API 描述，提供“何时使用”的设计决策建议：

```markdown
请为“全屏加载 Modal”编写使用指南。要求：不仅包含组件 API，还要明确说明在何种交互时机应使用该组件而非 Inline Loading，并给出正误对比示例。
```


---


`component-documentation-ai` 让代码自己会说话。**现在就开启你的自动化文档，尝试用交互式的阅读去替代沉重的手动维护。** 🚀
