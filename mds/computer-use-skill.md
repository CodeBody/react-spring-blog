# 2025 自动化之神：computer-use 快速上手指南


## 📦 什么是 computer-use？


`computer-use` 是由 **Anthropic** 推出的划时代 AI 技能。它赋予了 AI 像人类一样操作计算机的能力：**查看屏幕、移动光标、点击按钮以及键入文本**。它不再仅仅是“写代码”，而是成为了一个能够跨软件、跨窗口执行复杂任务的**数字化代理 (Agent)**。


## ⚙️ 如何安装？


由于该技能涉及底层系统权限，推荐使用官方的 Docker 镜像进行隔离化部署：


### 1. Docker 极速部署 (推荐)
这是最安全且最快的方式：
```bash
# 拉取并启动官方镜像
docker run -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -p 8080:8080 -p 5900:5900 \
    -it anthropic/computer-use-demo:latest
```


### 2. 通过 OpenSkills 动态激活
在支持的环境中一键同步：
```bash
npx openskills install anthropics/computer-use --universal && npx openskills sync
```


### 3. 本地源码部署
1. 克隆 [GitHub 官方 Demo 仓库](https://github.com/anthropics/anthropic-quickstarts)。
2. 安装 Python 依赖：`pip install -r computer-use-demo/requirements.txt`。
3. 启动 Streamlit 控制台进行本地交互。


---


## 💬 如何通过对话使用？


调用 `computer-use` 的核心在于：**定义清晰的任务终态 (Goal)**。你不需要告诉 AI “先点哪里”，只需要告诉它“做完什么”。


### 万能对话公式
> **[明确的最终目标]** + **[涉及的应用程序/网站]** + **[数据的处理规则]**


---


### 📊 自动化报表整理 (Excel + Web)

跨浏览器检索并汇总数据到本地表格：

```markdown
请打开 Chrome 浏览器，搜索近三天的“全球 AI 行业融资新闻”，将新闻标题和融资金额提取出来，并填入桌面上的 'AI_Report.xlsx' 表格中。完成后保存并关闭文件。
```


### 🎨 零代码 UI 测试 (Figma + Browser)

自动化视觉回归测试：

```markdown
请打开我的 Figma 设计稿链接 [Link]，对比它与本地运行的网页 http://localhost:5173 的视觉差异，如果发现间距不一致，请直接在代码编辑器中修正 CSS 属性。
```


### 💼 自动订票与日程同步 (Mail + Calendar)

处理繁琐的行政事务：

```markdown
请查收我的 Outlook 邮箱，找到来自“携程”的机票确认邮件，将航班号和起抵时间提取出来，并自动添加到我的 Google 日历中，提醒设为提前 2 小时。
```


### 🛠 环境自动化配置 (Terminal + IDE)

全自动开发环境搭建：

```markdown
请打开终端，安装项目所需的全部依赖。如果遇到环境报错，请通过搜索引擎寻找解决方案并直接执行修复补丁，直到 npm run dev 成功运行。
```


### 🧪 动态数据抓取 (Advanced Scraping)

绕过传统爬虫限制的交互式抓取：

```markdown
请登录我的 LinkedIn 账号，在搜索栏输入“前沿 AI 开发者”，翻看前 5 页结果，并将其中的个人简介和工作经历汇总成一份 PDF 文档保存到下载文件夹。
```


---


`computer-use` 的出现标志着 AI 从“会聊天”进化到了“会办事”。**现在就启动你的 Docker，体验真正的自动化自由。** 🚀
