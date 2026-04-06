# 2025 算力之魂：code-interpreter 快速上手指南


## 📦 什么是 code-interpreter？


`code-interpreter`（代码解释器）是 AI 从“语言生成”跨越到“逻辑逻辑计算”的核心技能。它允许 AI 在一个安全、隔离的沙箱环境中编写并执行 **Python** 代码。无论是复杂的数学推导、大规模数据清洗，还是自动生成图表，它都能通过真实的脚本运行来确保结果的**严谨性**与**准确性**。


## ⚙️ 如何安装？


为了确保安全，推荐在隔离的沙箱或 Docker 环境中运行：


### 1. 容器化部署 (推荐)
使用 OpenSkills 提供的安全沙箱镜像：
```bash
# 启动具备执行权限的 Python 沙箱
docker run -it --name ai-sandbox -v $(pwd):/workspace python:3.11-slim
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步执行器逻辑：
```bash
npx openskills install google/code-interpreter --universal && npx openskills sync
```


### 3. 本地环境搭建 (直接运行)
1. 确保本地已安装 Python 3.10+。
2. 安装核心依赖：`pip install pandas matplotlib numpy pillow`。
3. 在 AI 设置中开启“允许执行本地脚本”权限。


---


## 💬 如何通过对话使用？


调用 `code-interpreter` 的核心在于：**定义复杂的计算逻辑或数据处理流程**。你只需描述任务，AI 会通过编写脚本来交付最终结果。


### 万能对话公式
> **[输入数据源]** + **[逻辑处理需求]** + **[期望的交付物格式]**


---


### 📊 自动化数据清洗与可视化 (Data Viz)

从杂乱的 CSV 中提取洞察：

```markdown
请读取项目中的 `sales_data.csv`。使用 **code-interpreter** 清洗缺失值，并根据销售额生成一张“年度趋势折线图”，将图表保存为 `trend.png`。
```


### 📷 批量图像处理 (Image Logic)

无需打开 Photoshop 的自动化修图：

```markdown
请遍历当前文件夹下的所有 `.jpg` 图片。使用 Python 脚本将它们统一裁剪为 800x800 正方形，并自动添加 20% 的高度模糊滤镜，最后在右下角打上“Draft”水印。
```


### 🧮 复杂科学计算 (Math & Physics)

解决大模型易出错的数学难题：

```markdown
请计算一个 500kg 的物体在 20 度倾角的摩擦力环境下，从 100 米高处滑落到地面的最终速度。请编写 Python 脚本进行物理建模运算，并输出每步的推导过程。
```


### 📑 PDF 文档深度解析 (Doc Processing)

跨越格式限制的信息提取：

```markdown
请读取这份 100 页的财报 PDF。使用代码扫描所有包含“利润”关键词的表格，并将其中的数字汇总成一份新的 Excel 报表，确保货币单位统一为人民币。
```


### 🧪 动态模拟实验 (Simulation)

实时生成动态交互数据：

```markdown
请编写一段 Python 模拟逻辑，模拟 10,000 次蒙特卡洛实验来预测我这套投资组合的爆仓概率。请输出正态分布热力图，并标出 95% 置信区间。
```


---


`code-interpreter` 把 AI 变成了真实的“超级计算器”。**现在就配齐你的 Python 环境，让 AI 用真实的逻辑为你服务。** 🚀
