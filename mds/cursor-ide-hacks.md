# Cursor 效率黑客：cursor-ide-hacks 快速上手指南


## 📦 什么是 cursor-ide-hacks？


`cursor-ide-hacks`（Cursor 效率黑客）是现代前端工程师的“外挂级”开发体验。它不再仅仅是一个带有聊天窗口的编辑器，而是通过 **Composer (多文件协同编程)**、**代码库全文索引 (Index-based Context)** 以及 **实时代码预测 (Copilot++)**，将整个项目的上下文喂给 AI，实现跨文件的逻辑重构与功能实现。它是实现**十倍开发速度 (10x Developer Velocity)** 与 **无痛工程化管理** 的终极武器。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的工作流中启用 Cursor 的“黑客模式”：


### 1. 官方离线安装 (推荐)
这是目前最健全、最现代的 AI 编程生产级方案：
```bash
# 从官方网站下载并覆盖 VS Code 插件
# 确保在设置中开启 "Index Your Project" 以获得全局上下文
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步 Cursor 开发范式：
```bash
npx openskills install frontend/cursor-hacks --universal && npx openskills sync
```


### 3. Composer 模式激活
在 IDE 中通过 `Cmd + I` 唤起 Composer，开始跨文件、跨模块的原子化并行开发。


---


## 💬 如何通过对话使用？


调用 `cursor-ide-hacks` 的关键在于：**定义项目的上下文边界与执行指令的确定性。**


### 万能对话公式
> **[@Codebase / @Files]** + **[跨文件的重构逻辑]** + **[单一入口点的执行确认]**


---


### 📰 基于全项目上下文的 UI 复刻 (Visual Clone)

通过截图或文字描述，让 Cursor 自动查找并复用现有的设计令牌：

```markdown
请参考 `@theme.css`。要求：在 `apps/web` 下为我创建一个全新的“关于我们”页面，必须复用项目中已有的 `PrimaryButton` 和 `GlassCard` 组件。
```


### 📊 后台 API 数据上报逻辑的全局接入 (Log Injection)

在全站数百个事件中，全自动注入统一的监控埋点：

```markdown
请使用 Composer 扫描所有 `onClick` 事件。风格要求：在文件头部引入 `Logger`，并在所有的核心点击动作中注入 `Logger.track()`，确保携带组件名。
```


### 🏙 复杂目录结构向 Monorepo 的平滑迁移 (Mono-migrator)

将凌乱的单体项目逻辑自动拆解并映射到新架构：

```markdown
请参考 `@packages/ui`。要求：将当前项目中的所有 `lib/utils` 逻辑移动到共享包中，并全自动修复全站几百处 `import` 地址。
```


### 💼 针对旧代码库的 TypeScript 全量补全 (TS Injection)

为数万行 JS “屎山”代码自动生成精准的类型定义：

```markdown
请使用 @Codebase 索引扫描整个 `src/legacy`。风格要求：根据实际的运行时数据结构，自动将所有 `.js` 文件后缀改为 `.tsx` 并生成严密的接口定义。
```


### 🛠 系统级自动化性能优化补丁安装 (Perf Patcher)

一言之间完成全站图片的懒加载与预读优化：

```markdown
请通过 Composer。要求：扫描项目中所有的 `<img>` 标签，统一添加 `loading="lazy"` 和 `fetchpriority="low"`，并针对 Hero 图进行例外处理。
```


---


`cursor-ide-hacks` 让你的键盘起火。**现在就开启你的 Cursor 全局索引，尝试用跨文件的上帝视角去重构你的每一个前端梦想。** 🚀
