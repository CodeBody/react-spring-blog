# 组件 AI 重构：component-refactor-ai 快速上手指南


## 📦 什么是 component-refactor-ai？


`component-refactor-ai`（组件 AI 重构）是处理“技术债”的现代化手术。它专门应对那些 **逻辑臃肿、样式过时、缺乏类型定义的旧组件**。通过 **AI 对上下文的理解力**、**模式重构算法** 以及 **Tailwind/TS 自动迁移**，它能将上千行的大杂烩文件重组为多个原子化、高度可维护的现代组件。它是实现**代码仓库焕新 (Codebase Revitalizing)** 与 **技术栈平滑升级** 的工业级方案。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“代码重生”计划：


### 1. Cursor Composer 批量重构 (推荐)
这是目前最智能且能处理多文件引用的生产级重构方案：
```bash
# 在 Composer 模式下输入重构指令
# 参考 @Component 提取所有的内联样式到外部变量
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步重构规范：
```bash
npx openskills install react/refactor-ai --universal && npx openskills sync
```


### 3. Codemods 官方迁移套件
针对 Next.js 或 React 的大版本升级，利用官方提供的脚本进行自动化转换。


---


## 💬 如何通过对话使用？


调用 `component-refactor-ai` 的关键在于：**定义目标架构的纯净度与重构过程中的零副作用保证。**


### 万能对话公式
> **[老旧臃肿的源代码]** + **[目标框架标准 (如 Tailwind/TS/RSC)]** + **[保持现状的功能契约断言]**


---


### 📰 将巨型类组件转换为函数式 Hooks (Class to Hooks)

在不改变业务逻辑的前提下，拥抱现代 React 架构：

```markdown
请使用 component-refactor-ai 重构 `AdminPanel.jsx`。要求：将其转换为 Function Component，利用 `useReducer` 管理复杂状态，并确保所有的 API 请求保持原样。
```


### 📊 混杂内联颜色的 Tailwind 自动化迁移 (CSS Cleanup)

将散落在代码遍地的硬编码样式统一抽离为设计令牌：

```markdown
请扫描并重构“导航栏”样式。风格要求：将所有的内联 `style={{ color: '#xxx' }}` 全部替换为 Tailwind 的原子类，并自动在配置中记录新的颜色令牌。
```


### 🏙 缺乏类型的 JS 业务逻辑的 TS 强加 (JS to TS)

为遗留代码瞬间提供精准的类型守卫：

```markdown
请为 `/services/api.js` 进行 AI 重构。要求：将其重命名为 `.ts`，自动分析所有的函数输入输出并生成精确的 `Interface` 定义。
```


### 💼 业务逻辑与 UI 层级的彻底剥离 (Logic Extraction)

将臃肿的组件体改造成极简的 UI 与自定义 Hooks 的组合：

```markdown
请重构“结算表单”。风格要求：将所有的校验和状态变动逻辑提取到 `useCheckoutForm` 钩子中，使 UI 组件仅负责渲染，代码行数减少 50% 以上。
```


### 🛠 系统级组件层级与目录结构的重新编排 (Structure Reorg)

将杂乱的单文件拆解为原子化目录的标准结构：

```markdown
请分析 `OldUserPage.tsx`。风格要求：将其拆分为 `UserHeader`, `UserList` 和 `UserActions` 三个独立文件，并建立统一的 `index.ts` 导出入口。
```


---


`component-refactor-ai` 让你的代码重获新生。**现在就开启你的 AI 重构流程，尝试用更高的维度去统治你的每一个遗留模块。** 🚀
