# 无障碍审计：a11y-audit-expert 快速上手指南


## 📦 什么是 a11y-audit-expert？


`a11y-audit-expert`（无障碍审计）是 Web 开发的道德基石与法务保障。它专注于确保所有用户（包括视力受限、听力受限或运动受限的用户）都能平等地访问 Web 内容。通过 **WCAG 2.1 指南对标**、**屏幕阅读器 (Screen Reader) 兼容性** 以及 **键盘导航 (Focus Management)**，它确保网页不仅仅是好看，更是普适的。它是对**包容性设计 (Inclusive Design)** 的最高维定义。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“无障碍自动体检”：


### 1. Axe-core 官方扫描引擎 (推荐)
这是行业标准、最权威的自动化无障碍审计方案：
```bash
# 在现有 Playwright 或 Jest 环境中集成 axe
npm install @axe-core/playwright
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步无障碍规范语义：
```bash
npx openskills install frontend/a11y-audit --universal && npx openskills sync
```


### 3. Chrome DevTools 无障碍面板
利用浏览器自带的 Inspect 面板实时查看 DOM 树的 Accessibility Tree 映射。


---


## 💬 如何通过对话使用？


调用 `a11y-audit-expert` 的关键在于：**定义语义的缺失补全与焦点流动的合理性。**


### 万能对话公式
> **[待审计的 UI 模块 (如表单/列表)]** + **[色彩对比度最低阈值]** + **[ARIA 标签的角色映射规则]**


---


### 📰 高频资讯流中的图像替代文案 (Image Alt)

确保盲人用户也能“听”懂页面的核心视觉：

```markdown
请使用 a11y-audit-expert 扫描首页。要求：找出所有缺失 `alt` 属性的图片，并基于 AI 描述自动补齐具有语义价值的描述文字。
```


### 📊 后台复杂图表的屏幕阅读器适配 (Chart Data A11y)

使不可见的数据可视化也能通过声音传递重点：

```markdown
请为我的“销售看板”添加 ARIA 支持。风格要求：为 SVG 容器添加 `aria-label` 描述核心趋势，并将关键数据点映射为隐藏的表格 (Visual Hidden) 供阅读器读取。
```


### 🛒 支付流程的键盘焦点路径优化 (Focus Logic)

确保没有鼠标也能顺畅地完成下单、结账动作：

```markdown
请审计“购物车导航”。要求：确保每一个 `tab` 切换都能有明显的视觉焦点 (outline)，且弹窗开启后焦点自动限制 (Trap) 在弹窗内部。
```


### 💼 低对比度 UI 的自动对比修复 (Contrast Fix)

在不破坏品牌美学的前提下，提升文字的可读性：

```markdown
请使用 a11y-audit-expert 优化品牌色系。要求：将所有灰階背景下的浅蓝文字通过 HSL 调整至符合 WCAG AA 标准 (4.5:1) 的最低对比度。
```


### 🛠 系统级自动语义化 HTML 映射建议 (Semantic HTML)

将无聊的 `div` 堆砌重构成富有逻辑的语义骨架：

```markdown
请扫描我的侧边项设置。风格要求：将通配符 `div` 分别重构为 `nav`, `section`, `header` 和 `label` 标签，提升搜索引擎与阅读器的感知深度。
```


---


`a11y-audit-expert` 让你的应用更人性。**现在就开启你的无障碍审计，尝试用每一处语义的完善去赢得更广阔的用户尊重。** 🚀
