# 前端流水线：ci-cd-front-pipeline 快速上手指南


## 📦 什么是 ci-cd-front-pipeline？


`ci-cd-front-pipeline`（前端流水线）是实现“极速迭代”的底层引擎。它彻底摆脱了“手动 build、手动 FTP 上传”的刀耕火种时代。它通过 **GitHub Actions**、**Vercel/Netlify** 以及 **Docker**，在每一次代码推送时自动触发 **Lint 校验**、**单元测试**、**生产包构建** 以及 **即时预览环境生成的发布**。它是实现**持续部署 (Continuous Deployment)** 与 **极致发布信心** 的核心基石。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中接入自动化分发能力：


### 1. Vercel 一键关联方案 (推荐)
这是目前最智能、最适合前端应用的生产级流水线方案：
```bash
# 不需要编写配置文件，直接在 Vercel 后台关联 GitHub 仓库
# 每次 Push 都会自动触发 Preview Deployment
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步流水线配置语义：
```bash
npx openskills install frontend/ci-cd --universal && npx openskills sync
```


### 3. GitHub Actions 手动配置 (YAML)
在仓库根目录定义自定义的构建流：
```bash
mkdir -p .github/workflows && touch .github/workflows/deploy.yml
```


---


## 💬 如何通过对话使用？


调用 `ci-cd-front-pipeline` 的关键在于：**定义工作流的准入条件与构建节点的顺序逻辑。**


### 万能对话公式
> **[代码推送的分支 (Branch)]** + **[必须通过的测试/Lint 步骤]** + **[目标部署服务器或 CDN 路径]**


---


### 📰 代码推送触发的自动 Lint 扫描 (Lint Flow)

确保每一行合并到主分支的代码都符合核心规范：

```markdown
请使用 ci-cd-front-pipeline 编写一个 `.yml` 工作流。要求：当有 PR 提交到 `main` 分支时，自动运行 `npm run lint`，如果失败则不允许合并。
```


### 📊 生产构建后的自动包体积对比 (Size Audit)

在流水线中直接反馈代码变更对包体积的影响：

```markdown
请为一个“产品落地页”设计构建流。要求：除了构建生产包外，还要对比新旧版本的大小差距，并在 GitHub PR 评论区自动回复一份分析报告。
```


### 🏙 多环境 Preview 即时预览链接 (Preview Deploy)

让产品经理和设计师在代码上线前即可查看真实渲染：

```markdown
请使用 Vercel 配置分环境部署。风格要求：每当有非 `main` 分支的代码更新，自动生成一个带有随机后缀的临时预览 URL 并发送至 Slack 频道。
```


### 💼 CI/CD 流程中的端到端集成测试 (E2E Integration)

在正式发布前确保最核心的用户交易路径依然畅通：

```markdown
请编写一段 GitHub Action 自动化流水线。要求：生产包构建完成后，在容器中启动服务并全量运行一次 Playwright 测试，全部 Pass 后才开启生产部署。
```


### 🛠 系统级 Docker 容器化分发与镜像管理 (Containerized Flow)

针对私有化部署场景的标准化交付：

```markdown
请使用 ci-cd-front-pipeline 生成 Dockerfile 构建流。风格要求：采用多阶段构建，将最终的 Nginx 静态文件打包成镜像推送到公司私有的镜像仓库。
```


---


`ci-cd-front-pipeline` 让你的发布从此“优雅”。**现在就开启你的自动化流水线，尝试用可靠的流程去承载你的每一个创意。** 🚀
