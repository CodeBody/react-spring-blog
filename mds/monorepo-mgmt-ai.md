# 单体大仓库管理：monorepo-mgmt-ai 快速上手指南


## 📦 什么是 monorepo-mgmt-ai？


`monorepo-mgmt-ai`（单体大仓库管理）是解决中大型前端项目膨胀的终极利器。它彻底拆解了“多个分散项目”的维护僵局。它通过 **Turborepo**、**Nx** 以及 **Pnpm Workspaces**，在同一个仓库中管理多个应用与共享组件库。它的核心在于 **极速构建缓存 (Remote Caching)**、**依赖拓扑自动分析** 以及 **跨项目的原子级代码复用**。它是实现**组织级开发效率 (Organizational Velocity)** 与 **基础设施一致性** 的标准方案。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中部署这套“高效并进”的开发架构：


### 1. Turborepo 官方一键构建 (推荐)
这是目前最快、配置最简单的单体仓库方案：
```bash
# 全局初始化单体仓库基础结构
npx create-turbo@latest ./
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步单体仓库管理范式：
```bash
npx openskills install frontend/monorepo --universal && npx openskills sync
```


### 3. Pnpm Workspaces 全量模式 (手动)
利用 Pnpm 极高性能的符号链接能力，配置 `pnpm-workspace.yaml`。


---


## 💬 如何通过对话使用？


调用 `monorepo-mgmt-ai` 的关键在于：**定义公共库的导出协议与跨项目的依赖隔离。**


### 万能对话公式
> **[共享包的名称与目录]** + **[消费端应用的部署逻辑]** + **[构建流水线的缓存设置]**


---


### 📰 设计系统组件库的跨项目共享 (UI Shared)

确保公司旗下的所有应用都使用同一套原子 UI：

```markdown
请使用 monorepo-mgmt-ai 创建一个 `packages/ui`。要求：使用 Tailwind 配置共享化方案，并让 `apps/web` 和 `apps/admin` 同时消费它。
```


### 📊 全局类型定义的精确同步 (Typing Sync)

在前后端共用的仓库中维护唯一的 Truth Source：

```markdown
请设计一个 `packages/types`。风格要求：定义后端 API 的响应模型接口，并配置 TypeScript Project References 实现秒级的跨项目类型检查。
```


### 🏙 多应用并行构建的云端缓存加速 (Turbo Cache)

将原本 10 分钟的编译时间缩减至 10 秒：

```markdown
请编写 `turbo.json` 任务流。风格要求：开启远程缓存，配置 `build` 依赖于 `lint` 和 `test`，并排除所有的日志生成干扰。
```


### 💼 复用型工具函数的模块化抽离 (Utils Extraction)

将常用的正则校验、日期处理算法从单项目库中“提离”：

```markdown
请使用 monorepo-mgmt-ai 重构代码。要求：将项目中散落的 `utils/date.ts` 合并到 `packages/helpers`，并实现按需导出。
```


### 🛠 系统级多项目统一 Lint 与格式化校验 (Project Quality)

确保大仓库下的代码每一行都符合团队风格公约：

```markdown
请编写一个根目录级别的 `ESLint` 配置。风格要求：通过继承模式让所有 `apps/` 目录下的项目共享基础规则，并允许针对特定应用进行小范围覆盖。
```


---


`monorepo-mgmt-ai` 让开发不再孤军奋战。**现在就开启你的单体大仓库之行，尝试用共享的力量去武装你的每一个前端应用。** 🚀
