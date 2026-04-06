# 业务优先单元测试：unit-test-logic-first 快速上手指南


## 📦 什么是 unit-test-logic-first？


`unit-test-logic-first`（业务优先单元测试）是高质量代码的“逻辑监护人”。它不再是盲目追求 100% 的行覆盖率，而是专注于 **核心业务逻辑 (Pure Logic)**、**复杂状态机切换** 以及 **关键函数的数据流转换**。通过 **Vitest**、**Jest** 以及 **React Testing Library**，它确保你的每一个底层函数在任何边界条件下都能产出预期的结果。它是实现**稳定重构 (Fearless Refactoring)** 与 **逻辑自证明** 的核心基石。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中部署这套“逻辑侦测网”：


### 1. Vitest 现代测试运行器 (推荐)
这是目前最快、与 Vite 完美集成的生产级测试方案：
```bash
# 为 Vite 项目安装测试核心
npm install -D vitest @testing-library/react
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步测试用例范式：
```bash
npx openskills install frontend/unit-test --universal && npx openskills sync
```


### 3. Jest 经典测试框架
在传统的 Webpack 项目中启用最成熟的测试生态。


---


## 💬 如何通过对话使用？


调用 `unit-test-logic-first` 的关键在于：**定义输入的 Payload 样本与预期的响应 Model。**


### 万能对话公式
> **[核心算法/函数/Hook]** + **[边界条件 (Boundary Cases)]** + **[严格的 Output 断言逻辑]**


---


### 📰 复杂折扣计算器的逻辑覆盖 (Price Logic)

确保电商核心的价格计算在任何促销组合下都分毫不差：

```markdown
请使用 unit-test-logic-first 编写 `calculateFinalPrice`。要求：测试原价、满减、会员折扣三者叠加的情况，并覆盖负数价格等非法输入。
```


### 📊 状态机切换的完整路径验证 (State Machine)

测试复杂 UI（如多步骤表单）在状态转换过程中的一致性：

```markdown
请为“多步注册表单”的状态机编写测试。风格要求：模拟从 `Step1` 跳转到 `Step2` 的数据携带逻辑，并断言用户未填项时的 `Validation` 报错状态。
```


### 🏙 自定义 React Hook 的渲染测试 (Hook Testing)

在不需要渲染真实 UI 的情况下，验证逻辑钩子的响应式：

```markdown
请使用 `renderHook` 测试 `useAuth`。风格要求：模拟 API 返回成功的 Token 响应，验证钩子内部的 `isAuthenticated` 状态是否在 100ms 内变更为 True。
```


### 💼 针对 API 聚合层的 Mock 模拟测试 (API Layering)

在后端接口未就绪前，先行验证前端的数据提取能力：

```markdown
请测试“用户仪表盘数据适配器”。要求：利用 `msw` 拦截网络请求并返回模拟 JSON，验证适配器是否能正确剔除冗余字段并格式化日期。
```


### 🛠 系统级边缘情况的防错性测试 (Edge Case Protection)

捕捉那些 1% 的低概率错误引发的应用崩溃：

```markdown
请编写一组压力测试用例。风格要求：向“文件上传进度器”输入 0 字节和 10GB 两种极限情况，验证其 `UI Progress` 百分比是否依然保持在 0-100 区间。
```


---


`unit-test-logic-first` 让你的逻辑经得起推敲。**现在就开启你的自动化测试，尝试用代码去证明代码，给你的每一次重构应有的自信。** 🚀
