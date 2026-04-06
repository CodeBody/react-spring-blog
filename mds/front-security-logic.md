# 前端安全逻辑：front-security-logic 快速上手指南


## 📦 什么是 front-security-logic？


`front-security-logic`（前端安全逻辑）是现代 Web 应用的“护城河”。它不再仅仅依赖后端，而是通过 **内容安全策略 (CSP)**、**XSS 自动转义**、**CSRF 令牌管理** 以及 **敏感信息脱敏**，在浏览器端构建第一道安全闭环。它能有效防御恶意脚本注入、点击劫持以及由于不当的内容渲染导致的隐私泄露。它是实现**可信交付 (Trusted Delivery)** 与 **用户隐私保护** 的核心工程化技能。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中部署这套“安全防火墙”：


### 1. DOMPurify 官方净化方案 (推荐)
这是目前最权威、最可靠的 XSS 攻击生产级防御方案：
```bash
# 安装 DOM 净化核心
npm install dompurify
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步安全防护规范：
```bash
npx openskills install frontend/security --universal && npx openskills sync
```


### 3. Helmet & CSP Header 配置
在服务端 (Node.js/Next.js) 配置安全的 HTTP 头，限制外部脚本执行。


---


## 💬 如何通过对话使用？


调用 `front-security-logic` 的关键在于：**定义数据的不可信边界与执行权限的最小化。**


### 万能对话公式
> **[用户输入的原始数据]** + **[渲染场景的选择器]** + **[特定的安全防护等级]**


---


### 📰 高频动态内容的 HTML 渲染净化 (XSS Clean)

防止用户通过评论、简介等文本框注入恶意 `<script>`：

```markdown
请使用 front-security-logic 处理“用户评论区”。要求：使用 DOMPurify 对所有的 `dangerouslySetInnerHTML` 进行深度净化，仅保留 `b`, `i`, `img` 等白名单标签。
```


### 📊 金融级敏感账户号码的脱敏展示 (Data Masking)

在前端页面上只显示关键信息，防止视觉侧窥：

```markdown
请编写一个“账户脱敏组件”。风格要求：银行卡号仅保留首 4 位和尾 4 位，中间使用星号填充，且原始数据在 React 状态中仅保留 30s。
```


### 🏙 复杂表单的 CSRF 抗劫持令牌同步 (CSRF Guard)

确保每一个提交请求都是来自受信任的客户端页面：

```markdown
请为我的“重置密码表单”添加防护。风格要求：自动从 Cookie 中提取 `XSRF-TOKEN` 并将其注入到所有的异步请求头中。
```


### 💼 内容安全策略 (CSP) 的全站统一配置 (Header Policy)

通过 HTTP 指令彻底禁用不安全的内联脚本执行：

```markdown
请编写一个 `middleware.ts` 配置。要求：仅允许从 `*.vercel.app` 域下载静态资源，完全禁用 `eval()` 函数，并汇报所有的违规企图。
```


### 🛠 系统级本地存储敏感数据的加密保护 (Storage Encrypt)

防止恶意插件或 Console 嗅探窃取 localStorage 中的关键信息：

```markdown
请实现一个 `secureStorage` 封装。风格要求：所有的 `setItem` 自动进行 Base64+混淆处理，防止敏感业务标识以明文形式暴露在浏览器缓存中。
```


---


`front-security-logic` 让你的应用更稳固。**现在就开启你的安全漏洞审计，尝试用严谨的防护逻辑去保卫你的每一个用户资产。** 🚀
