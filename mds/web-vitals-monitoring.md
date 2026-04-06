# 核心网页指标监控：web-vitals-monitoring 快速上手指南


## 📦 什么是 web-vitals-monitoring？


`web-vitals-monitoring`（核心网页指标监控）是维护网站健康的“心电图”。它不再是事后在 Lighthouse 中运行审计，而是实时通过 **真实用户的设备交互 (RUM, Real User Monitoring)** 来收集 **LCP (最大内容绘制)**、**FID (首次输入延迟)** 和 **CLS (累积布局偏移)**。通过 **web-vitals 库** 与 **上报系统**，它能帮你精准发现不同带宽、不同机型在生产环境中的真实性能瓶颈。它是对**真实用户体验 (Real UX Fidelity)** 的全天候守护。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“全天候性能监控”：


### 1. 官方 Web Vitals 库集成 (推荐)
这是最标准、最轻量级的生产级性能衡量方案：
```bash
# 安装核心测量工具
npm install web-vitals
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步性能监控语义：
```bash
npx openskills install frontend/web-vitals --universal && npx openskills sync
```


### 3. Vercel / Google Analytics 零侵入监控
利用云平台自带的性能分析面板，直接在设置中通过环境变量开启。


---


## 💬 如何通过对话使用？


调用 `web-vitals-monitoring` 的关键在于：**定义上报的阈值与数据聚合维度。**


### 万能对话公式
> **[核心监控的三大指标]** + **[实时上报的埋点逻辑]** + **[性能异常的阈值告警点]**


---


### 📊 全站 LCP 实时负载看板 (LCP Monitor)

在真实业务环境中监控首屏加载性能：

```markdown
请使用 web-vitals-monitoring 监控全站。要求：当 LCP 超过 2.5s 时，将当前的页面 URL 和用户信息异步上报到后端 Log 接口。
```


### 🖼 用户交互 FID 延迟统计 (FID Audit)

找出哪些繁重的 JS 脚本阻塞了用户的点击动作：

```markdown
请审计我的交互响应速度。风格要求：利用 `onFID` 捕获所有的延迟超过 100ms 的交互，并输出造成阻塞的长任务 (Long Task) 列表及名称。
```


### 🌌 动态布局 CLS 稳定性巡检 (CLS Tracker)

追踪不同分辨率下页面的视觉稳定性差异：

```markdown
请监控 `onCLS` 指标。要求：记录单次会话中最大的偏移分值，如果 CLS 超过 0.1，自动截取当前的 viewport 尺寸并上报给管理台。
```


### 💼 CI/CD 的性能退化守卫 (Vitals Guard)

防止新上线的功能拉低网站的整体健康分：

```markdown
请编写一段监控阈值配置。要求：如果全站平均加载得分 (FCP) 在过去一小时内下降超过 20%，立即触发钉钉/飞书告警提醒运维负责人。
```


### 🛠 系统级多渠道性能看板聚合 (Unified Dashboard)

集成多种服务平台的实时监控数据：

```markdown
请使用 web-vitals-monitoring 配合 Google Analytics。要求：将所有的 Vital 性能指标作为自定义事件发送，按地理位置和设备网络速度进行分层聚合。
```


---


`web-vitals-monitoring` 让性能变得可以被衡量。**现在就开启你的实时监控，尝试用真实的生产数据去指导你的每一次技术迭代。** 🚀
