# MCP CSS 专家：mcp-css-expert 快速上手指南


## 📦 什么是 mcp-css-expert？


`mcp-css-expert`（MCP CSS 专家）是目前最前沿的 **样式上下文同步协议**。它彻底解决了 AI 在编写 CSS 时“不知道最新库规范”或“样式冲突”的难题。通过 **Model Context Protocol (MCP)** 服务，它能实时将 **Tailwind 官方文档**、**你的本地设计规范** 以及 **第三方 UI 库 (如 Shadcn/Radix) 的最佳实践** 以标准化的方式喂给 AI。它是实现**像素级精准 AI 编程 (Precision AI CSS)** 与 **规范强制执行** 的基石方案。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的 AI 编辑器 (如 Cursor/Claude Desktop) 中开启这一能力：


### 1. 官方推荐 MCP 服务方案 (推荐)
这是目前最健全、最现代的生产级样式上下文同步方案：
```bash
# 在 Claude Desktop 配置文件中注入 CSS 知识库服务
"css-expert-mcp": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-css-docs"]
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步样式索引规范：
```bash
npx openskills install frontend/mcp-css --universal && npx openskills sync
```


### 3. 本地样式指南注入器
针对企业私有的设计系统，利用 MCP 建立本地样式字典的实时映射。


---


## 💬 如何通过对话使用？


调用 `mcp-css-expert` 的关键在于：**定义样式库的版本约束与核心视觉基调。**


### 万能对话公式
> **[目标 UI 库 (Tailwind/Shadcn)]** + **[MCP 引导的实时文档查询]** + **[当前业务组件的视觉层级]**


---


### 📰 高阶自适应卡片重构 (Fluid Component)

利用最新的 Tailwind 容器查询和 Modern CSS 特性：

```markdown
请查阅 @TailwindDocs。要求：使用 `container-queries` 重构我的业务卡片，并确保样式符合 Vercel 最新的“磨砂玻璃”设计参考。
```


### 📊 针对 Shadcn UI 源码的精确补齐 (Shadcn Fix)

针对现有 UI 库的底层样式进行零副作用的扩展：

```markdown
请调用 @ShadcnMCP。风格要求：基于现有的 `Dialog` 组件逻辑，为其注入一个带有 1px 细微光泽渐变的背景遮罩，严禁破坏原始的功能逻辑。
```


### 🏙 跨框架样式规则的一致性搬迁 (Universal CSS)

将 React 项目中的成熟样式逻辑平滑搬迁到 Vue 或原生 Web Components：

```markdown
请查阅 @CSSStandardMCP。风格要求：将当前 `.module.css` 中的动画贝塞尔曲线转换为一套全局可复用的设计令牌，并生成对应的 HSL 变量说明文档。
```


### 💼 针对企业私有设计令牌的强制约束 (Theme Compliance)

确保 AI 生成的所有 CSS 都不超出预定的设计规范红线：

```markdown
请参考 @CorporateStyleSheet。要求：为我的“财务看板”生成样式代码，所有间距必须符合 8px 系统，主色调必须严格遵循变量库中的 `--color-fin-brand`。
```


### 🛠 系统级 CSS 检测与冗余清理建议 (Visual Audit)

利用 AI 对全站样式进行全量的语意扫描与合并：

```markdown
请通过 MCP 扫描我的全站 CSS。风格要求：找出所有超过三次的硬编码 HEX 颜色值，并自动生成一份重构清单，建议将其统一抽象为设计令牌。
```


---


`mcp-css-expert` 让 AI 拥有了样式上帝视角。**现在就开启你的 MCP 全球样式库映射，尝试用专业级的上下文去武装你的每一个像素。** 🚀
