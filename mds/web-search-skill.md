# 2025 实时知识桥梁：web-search 快速上手指南


## 📦 什么是 web-search？


`web-search` 是赋予 AI 实时获取互联网信息的核心技能。它直接打破了 AI 大模型的“知识截止时间 (Knowledge Cutoff)”限制，使 AI 能够通过 **Google, Tavily, Bing** 等搜索引擎，在毫秒级内检索并分析当下的**新闻、财报、文档或竞品动态**。它是 AI 从“复读机”进化为“分析师”的关键。


## ⚙️ 如何安装？


你可以通过以下几种主流 API 服务，快速为你的 AI 助手开启联网能力：


### 1. Tavily AI 极速接入 (推荐)
Tavily 是目前最适配 AI Agent 的垂直搜索引擎：
```bash
# 安装 Tavily 客户端
pip install tavily-python

# 配置 API Key
export TAVILY_API_KEY=your_key_here
```


### 2. Google Search API 集成
适合深度依赖谷歌生态的企业级方案：
1. 在 [Google Cloud Console](https://console.cloud.google.com/) 启用 Custom Search API。
2. 获取 API Key 和搜索引擎 ID (CX)。
3. 在你的 AI 配置文件中注入核心秘钥。


### 3. OpenSkills 动态开启
在标准化 Agent 框架下一键同步：
```bash
npx openskills install google/search --universal && npx openskills sync
```


---


## 💬 如何通过对话使用？


调用 `web-search` 的核心在于：**定义检索的时效性与深度**。你应该明确告诉 AI “查什么”以及“怎么对比”。


### 万能对话公式
> **[检索的具体关键词]** + **[时间跨度限制]** + **[多源对比/汇总报告的要求]**


---


### 📊 市场竞品实时分析 (Market Intel)

获取第一手行业情报：

```markdown
请检索过去 24 小时内关于“OpenAI Sora”和“Google Lumiere”的所有最新技术评测。对比两者的动态生成一致性，并整理出一份竞品差距分析报告。
```


### 📖 极速文档查漏补缺 (Doc Sync)

告别过时的 API 文档：

```markdown
请连接网络查看 React 19 的最新 `useActionState` 官方文档。对比我当前项目中的旧代码，指出哪些 Hooks 已经过时，并给出符合 React 19 标准的重构方案。
```


### 📈 金融数据实时监控 (Stock & Crypto)

捕捉瞬息万变的市场机遇：

```markdown
请检索 Nvidia (NVDA) 在此轮财报发布后的全网舆情表现。重点分析 Reddit 和 X 上的散户情绪，并结合华尔街前五大投行的分析师评价，给出明天的波动预测。
```


### 🔎 事实核查与真伪鉴定 (Fact Checking)

在虚假信息泛滥时代保持冷静：

```markdown
互联网传闻“某主流大模型已实现 AGI”，请检索多家主流权威媒体（如 Reuters, Bloomberg, The Verge）的深度报道，核查其真实性并给出事实依据。
```


### 🛠 全球开源周报汇总 (Github Trending)

保持开发者触觉的最高频搜索：

```markdown
请查下本周 GitHub Trending 榜单上前 5 名的 AI 项目。分别说明它们的核心痛点是什么，为什么它们会在本周突然爆火。
```


---


`web-search` 让 AI 不再是盲目预演，而是时刻与世界同步。**现在就激活你的 Tavily Key，让你的 AI 睁开眼睛看世界。** 🚀
