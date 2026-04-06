# HTML 语义化修复：semantic-html-fixer 快速上手指南


## 📦 什么是 semantic-html-fixer？


`semantic-html-fixer`（HTML 语义化修复）是 Web 结构开发的“脊梁”。它专注于将杂乱无章的 `div` 和 `span` 堆砌，重构为具有明确 **标签语义 (Tag Semantics)** 的现代 HTML5 结构。通过 **`<nav>`**、**`<main>`**、**`<article>`** 以及 **`<section>`**，它不仅提升了搜索引擎的 **SEO 收录效率**，更是为屏幕阅读器提供了清晰的导航地标。它是实现**结构化开发 (Structured Markup)** 与 **可访问性** 的核心。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“语意重访”：


### 1. HTML5 官方语义检测方案 (推荐)
这是最标准、最易于遵循的生产级审查习惯：
```bash
# 不需要安装，直接审查 DOM 树结构是否包含关键里程碑
# 使用 <header>, <main>, <footer> 等核心标签包裹页面
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步语意重构规范：
```bash
npx openskills install frontend/semantic-fix --universal && npx openskills sync
```


### 3. Lighthouse 辅助审计
利用 Lighthouse 的 A11y 评分机制，自动找出那些非语义化的表单元素。


---


## 💬 如何通过对话使用？


调用 `semantic-html-fixer` 的关键在于：**识别内容的角色 (Role) 与层叠关系。**


### 万能对话公式
> **[乱序的 HTML 代码片段]** + **[页面的逻辑分层]** + **[SEO 关键字的权重分配点]**


---


### 📰 高频资讯流的内容包裹 (Article Wrapper)

将平铺的卡片重构为搜索引擎可识别的独立内容体：

```markdown
请使用 semantic-html-fixer 优化我的文章列表。要求：将外层 `div` 改为 `section`，每一个卡片封装在 `article` 标签中，并将日期信息放入 `time` 标签。
```


### 📊 首页导航的语义化定义 (Navbar Hierarchy)

确保导航结构在屏幕阅读器中清晰可感知：

```markdown
请重构顶部导航条。风格要求：使用 `nav` 标签，目录项全部使用 `ul/li` 嵌套，并为当前活动项添加 `aria-current="page"`。
```


### 🏙 页脚信息的结构化治理 (Footer Logic)

建立清晰的数据源声明与版权信息层：

```markdown
请使用 semantic-html-fixer 设计页底。风格要求：使用 `footer` 标签，联系信息放入 `address` 标签，并采用 `dl/dt/dd` 定义描述列表。
```


### 💼 表单输入项的标签绑定 (Form Labels)

彻底消除点击 Label 无法聚焦 Input 的低级错误：

```markdown
请扫描并修复我的登录表单。要求：所有的 `input` 必须有对应的 `label`（带 `for` 属性），并使用 `fieldset` 和 `legend` 对表单进行逻辑分组。
```


### 🛠 系统级自动 SEO 架构重访 (SEO Skeleton)

为全站建立一套标准化的 H1-H6 标题系统：

```markdown
请为一个“产品特性页”编写语意骨架。风格要求：主标题仅有一个 `h1`，二级特性使用 `h2`，确保标题层级严格按照逻辑嵌套，不发生跨级。
```


---


`semantic-html-fixer` 让你的代码更有尊严。**现在就开启你的语意扫描，尝试用更客观的标签去重塑你对 Web 结构的认知。** 🚀
