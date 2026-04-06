# 全自动端到端测试：playwright-e2e-auto 快速上手指南


## 📦 什么是 playwright-e2e-auto？


`playwright-e2e-auto`（全自动端到端测试）是确保 Web 应用“发布即稳定”的最强防线。它不再需要手动编写冗长、脆弱的测试脚本，而是通过 **录制生成 (Codegen)**、**智能选择器优先** 以及 **多浏览器并行执行**，真实模拟用户在 Chrome、Firefox 和 Safari 上的每一个点击和输入动作。它是实现**持续交付 (Continuous Delivery)** 与 **零零退化 (No Regression)** 的核心工程化技能。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“全自动 UI 审计”：


### 1. Playwright 官方极速初始化 (推荐)
这是目前最健全、最现代的 E2E 测试生产级方案：
```bash
# 在现有项目中一键初始化测试环境
npm init playwright@latest
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步测试用例语义：
```bash
npx openskills install frontend/e2e-auto --universal && npx openskills sync
```


### 3. VS Code 背景插件实时录制
无需离开 IDE，通过 Playwright 官方插件开启交互式测试脚本生成。


---


## 💬 如何通过对话使用？


调用 `playwright-e2e-auto` 的关键在于：**定义用户的核心交互路径与关键断点。**


### 万能对话公式
> **[起始页面 URL]** + **[用户的交互步骤序列]** + **[必须通过的视觉/数据断言]**


---


### 📰 用户注册与登录流程验证 (Auth Flow)

确保最核心的用户入口永远畅通：

```markdown
请使用 playwright-e2e-auto 编写测试脚本。要求：模拟用户在 `/register` 填写信息、点击提交、跳转到 `/dashboard` 并验证页面是否包含“欢迎回来”的文字。
```


### 🛒 复杂的电商购物车闭环测试 (Cart Logic)

验证从添加商品到结算成功的全链路逻辑：

```markdown
请为一个“下单流程”设计端到端测试。风格要求：点击首屏第一个商品，进入详情页点击“加入购物车”，在购物车页面修改数量为 2，并断言总价计算无误。
```


### 🏙 跨浏览器兼容性深度巡检 (Multi-browser Audit)

一次编写，自动在所有主流内核中运行验证：

```markdown
请使用 playwright-e2e-auto 检查全站导航。要求：并行开启 Chromium, Webkit 和 Firefox，确保所有菜单在 1280px 和 375px 分辨率下均能正常悬浮显示。
```


### 💼 CI/CD 自动生成的测试报告 (Report Automation)

在代码合并前自动输出带截图的测试详情：

```markdown
请编写一段 GitHub Action 配置。要求：每当有代码 Pus 到 main 分支，自动运行所有 Playwright 测试，并在测试失败时自动上传运行过程的录屏视频。
```


### 🛠 系统层级的 API 请求拦截测试 (Network Interception)

模拟网络超时或后端报错情况下的 UI 表现：

```markdown
请设计一个测试用例。要求：通过 Playwright 拦截 `/api/data` 请求并强制返回 500 状态码，验证页面是否能正确展示 `ErrorBoundary` 降级 UI。
```


---


`playwright-e2e-auto` 让你的代码更健壮。**现在就开启你的全自动测试，尝试用真实的机器模拟去替代低效的手动回归。** 🚀
