-- ============================================
-- 博客文章插入脚本：一天学会 AI Skill-Creator
-- 执行前请确保已创建 blog 数据库和相关表
-- ============================================

USE blog;

-- 1. 插入用户（如果不存在）
INSERT IGNORE INTO users (id, username, password, email) VALUES
(1, 'alex', '$2a$10$placeholder', 'alex@example.com');

-- 2. 插入分类（如果不存在）
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'AI 技术', '人工智能相关技术文章'),
(2, '前端开发', '前端框架与工程化实践'),
(3, '后端开发', '后端架构与服务设计'),
(4, '工具效率', '开发工具与效率提升');

-- 3. 插入标签（如果不存在）
INSERT IGNORE INTO tags (id, name) VALUES
(1, 'AI'),
(2, 'Claude'),
(3, 'Anthropic'),
(4, 'Skills'),
(5, 'Prompt Engineering'),
(6, '自动化'),
(7, 'React'),
(8, 'Spring Boot'),
(9, 'TypeScript'),
(10, 'Python');

-- 4. 插入文章
INSERT INTO articles (id, author_id, category_id, title, content, status, views, published_at, created_at, updated_at) VALUES
(1, 1, 1, '一天学会 AI Skills：用 Skill-Creator 打造你的专属 Claude 技能',
'# 一天学会 AI Skills：用 Skill-Creator 打造你的专属 Claude 技能

> 从零到一，完整掌握 Anthropic 官方技能创建框架

如果你用过 Claude，一定感受过它的强大。但你有没有想过——可以给 Claude 写一份"标准操作手册"，让它在特定场景下精准执行你想要的操作？这就是 **Skill（技能）** 的意义。而今天我们要学的 **Skill-Creator**，是一个"造技能的技能"——帮你从 0 到 1 创建、测试、迭代、优化你自己的 Claude 技能。

📦 **项目地址**：[anthropics/skills - skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
⭐ **仓库热度**：110k Stars | 12.3k Forks

---

## 1. 什么是 Skill？为什么需要 Skill-Creator？

### Skill 的本质

一个 Skill 就是一套 **Markdown 指令文档 + 辅助资源**，让 Claude 在特定场景下按照你定义的方式工作。

打个比方：如果 Claude 是一个全能员工，Skill 就是你给他写的 **"标准操作手册（SOP）"**。没有 SOP，他凭经验发挥，结果不可控；有了 SOP，他精准执行，产出稳定。

### Skill-Creator 的定位

Skill-Creator 是 Anthropic 官方提供的一个"元技能"——**一个专门用来创建新技能的技能**。它能帮你：

- ✅ 从零构思并编写一个新的 Skill
- ✅ 创建测试用例，自动运行对照实验
- ✅ 可视化评审结果，收集反馈
- ✅ 基于反馈迭代优化
- ✅ 优化技能的触发描述（类似 SEO）
- ✅ 打包成 `.skill` 文件分发

### 适用人群

Skill-Creator 的一个亮点是它对用户水平的适配。文档中特别提到：

> 现在有一个趋势——Claude 的强大正在激励水管工打开终端，父母和祖父母去 Google "如何安装 npm"。

所以它会**根据上下文线索调整沟通方式**，对非技术用户避免使用 JSON、assertion 等术语，对技术用户则直接切入。

### 解决什么痛点？

| 痛点 | Skill 如何解决 |
|------|---------------|
| 重复性工作 | 一次编写，无限复用 |
| 输出不稳定 | 精确的指令让行为可预测 |
| 团队知识流失 | 将最佳实践固化为可分享资产 |

---

## 2. Skill 的目录结构与三层加载架构

### 标准目录结构

一个完整的 Skill 长这样：

```
skill-name/
├── SKILL.md          ← 核心指令文件（必须）
│   ├── YAML frontmatter (name, description)
│   └── Markdown 正文指令
├── scripts/          ← 可执行脚本（可选）
├── references/       ← 参考文档（按需加载）
└── assets/           ← 模板、图标等静态资源
```

其中只有 `SKILL.md` 是必须的，其他都是可选的辅助资源。

### 三层渐进式加载（Progressive Disclosure）

这是架构设计中最精妙的部分。Skill 不是一股脑全加载进上下文的，而是分三层按需加载：

| 层级 | 内容 | 加载时机 | 大小建议 |
|------|------|----------|----------|
| **Level 1** | `name` + `description` | 始终在上下文中 | ~100 词 |
| **Level 2** | SKILL.md 正文 | 技能被触发时加载 | < 500 行 |
| **Level 3** | scripts / references | 执行时按需读取 | 无限制 |

### 为什么这样设计？

答案是 **Token 经济学**。Claude 的上下文窗口是有限的。如果所有技能的完整内容都塞进去，会浪费大量 Token。三层加载做到了：

- Level 1 只花 ~100 词就能让 Claude 判断"要不要用这个技能"
- Level 2 只在需要时加载，避免无关技能占用上下文
- Level 3 的脚本甚至可以不加载就直接执行

### 领域组织模式

当一个 Skill 支持多个变体时，推荐按领域拆分参考文档：

```
cloud-deploy/
├── SKILL.md (流程 + 选择逻辑)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

Claude 只会读取与当前任务相关的那一份参考文档，进一步节省 Token。

---

## 3. 核心工作流：从想法到成品的完整闭环

这是 Skill-Creator 最核心的部分——一个**"构思 → 编写 → 测试 → 评审 → 改进"的迭代循环**。

```
捕获意图 → 访谈调研 → 编写 SKILL.md → 创建测试用例
     ↑                                         ↓
     └── 用户反馈 ← 结果评审 ← 运行测试 ──────┘
              （迭代直到满意）
```

### Step 1：捕获意图（Capture Intent）

一切从理解需求开始。Skill-Creator 会引导你回答 4 个关键问题：

1. **这个技能要让 Claude 做什么？**
2. **什么时候应该触发它？**（哪些用户短语/上下文）
3. **期望的输出格式是什么？**
4. **需要设置测试用例吗？**

> 💡 **实用提示**：你也可以在和 Claude 对话的过程中说"把这个变成一个 skill"，Skill-Creator 会从对话历史中提取步骤、工具和修正，自动生成草稿。

### Step 2：访谈调研（Interview & Research）

在动手写之前，Skill-Creator 会主动追问：

- 边界情况是什么？
- 输入输出的格式要求？
- 有没有示例文件？
- 成功的标准是什么？
- 依赖什么工具或环境？

如果有 MCP（Model Context Protocol）可用，它还会并行调研文档、搜索类似技能、查阅最佳实践。

### Step 3：编写 SKILL.md

基于访谈结果，开始编写技能文件。核心组成：

```yaml
---
name: my-awesome-skill
description: 当用户需要XXX时使用。支持YYY和ZZZ场景...
---
```

`description` 的编写至关重要——它是 Claude 决定是否使用这个技能的**唯一依据**。

### Step 4：测试 → 评审 → 改进循环

这是最有价值的部分：

1. **创建 2~3 个真实测试用例**——是真实用户会说的话，不是抽象的描述
2. **同时启动对照实验**——"有 Skill" vs "无 Skill" 并行运行
3. **在等待期间起草量化评估标准**
4. **用 eval-viewer 可视化结果**，让你逐个审查
5. **提交反馈 → 改进 Skill → 下一轮迭代**

---

## 4. SKILL.md 编写指南与最佳实践

### 写作风格四原则

**原则 1：解释 Why，而非堆砌 Must**

```markdown
❌ 不推荐：
You MUST ALWAYS use JSON format. NEVER use plain text.

✅ 推荐：
使用 JSON 格式输出，因为下游系统需要结构化数据来自动处理。
如果输出纯文本，管道会断掉，用户需要手动修复。
```

Skill-Creator 的文档原话是：

> 如果你发现自己在写全大写的 ALWAYS 或 NEVER，或使用超级僵硬的结构，那是一个黄色信号。

**原则 2：利用 LLM 的心智理论**

今天的 LLM 很聪明。与其给死板的规则，不如让模型理解意图：

```markdown
❌ 不推荐：
Step 1: Read file. Step 2: Extract column C. Step 3: Calculate sum.

✅ 推荐：
目标是帮用户快速得到数据摘要。用户通常是非技术人员，
他们关心的是"我的销售额是多少"，而不是技术细节。
请用简洁的自然语言呈现结果。
```

**原则 3：从反馈泛化，避免过度拟合**

> 这里你和用户只在几个示例上反复迭代，因为这样更快。但如果你创造的技能只对这几个示例有效，那它就没用了。

**原则 4：保持精简，移除无用的指令**

读测试运行的完整记录（不只是最终输出），看看技能是否让模型在无效步骤上浪费时间。如果是，删掉那些部分。

### 输出格式定义

使用 exact template 模式：

```markdown
## 报告结构
始终使用以下模板：
# [标题]
## 摘要
## 关键发现
## 建议
```

### 示例模式

```markdown
## 提交信息格式
**示例 1：**
Input: 添加了基于 JWT 的用户认证
Output: feat(auth): implement JWT-based authentication
```

### 体量控制

- SKILL.md 控制在 **500 行以内**
- 超出的内容放到 `references/` 目录
- 大型参考文件（> 300 行）加上目录导航

---

## 5. 评测体系：从定性到定量的完整评估

Skill-Creator 最精巧的部分是内置了一套完整的评测系统。

### 工作空间结构

```
skill-workspace/
├── iteration-1/
│   ├── eval-descriptive-name/
│   │   ├── with_skill/outputs/     ← 使用技能的输出
│   │   ├── without_skill/outputs/  ← 不使用技能的输出（基线）
│   │   ├── eval_metadata.json      ← 评测元数据
│   │   ├── grading.json            ← 打分结果
│   │   └── timing.json             ← 耗时和 Token 数据
│   ├── benchmark.json
│   └── benchmark.md
└── iteration-2/
    └── ...（下一轮迭代）
```

### 五步评测流程

| 步骤 | 内容 | 要点 |
|------|------|------|
| **1. 并行启动** | 同时启动 with-skill 和 baseline 运行 | 不要先跑一组再跑另一组 |
| **2. 起草断言** | 在等待期间编写量化评估标准 | 好的断言有描述性名称 |
| **3. 捕获计时** | 记录 total_tokens 和 duration_ms | 这些数据只在通知中出现一次 |
| **4. 打分聚合** | grader → aggregate_benchmark → eval-viewer | 能用脚本验证的断言不要人工审 |
| **5. 读取反馈** | 解析 feedback.json | 空反馈 = 用户觉得没问题 |

### Eval Viewer 界面

Skill-Creator 自带一个 Web 查看器，有两个标签页：

**📊 Outputs 标签页：**
- 逐个查看每个测试用例
- 并排对比"有 Skill"和"无 Skill"的输出
- 支持内联渲染文件
- 自动保存的反馈输入框
- 迭代 2+ 时显示上一轮的输出和反馈

**📈 Benchmark 标签页：**
- 通过率（pass_rate）对比
- 耗时对比（含 mean ± stddev）
- Token 使用量对比
- 逐个评测的详细分解

### 进阶：盲比（Blind Comparison）

对于需要更严格比较的场景，可以使用盲比系统：

1. 把两个输出匿名提交给独立的 Agent
2. 它不知道哪个是"新版"哪个是"旧版"
3. 纯粹基于质量打分
4. 再分析获胜者为什么赢了

---

## 6. 描述优化（Description Optimization）

### 为什么这件事这么重要？

`description` 字段是 Claude 决定是否调用技能的**唯一信号**。它就像搜索引擎里的 SEO——写得好，技能被精准触发；写得差，技能形同虚设。

### 触发机制的工作原理

Claude 看到一个用户请求后：
1. 检查 `available_skills` 列表中所有技能的 name + description
2. 判断"这个请求需要某个技能帮忙吗？"
3. 如果需要，加载对应 SKILL.md

**关键洞察**：简单任务不会触发技能。Claude 觉得自己能搞定的事（比如"读一下这个文件"），即使 description 完美匹配也不会触发。所以测试查询要足够复杂。

### 优化四步法

**Step 1：生成 20 个评测查询**

- 10 个应该触发的（should-trigger）
- 10 个不应该触发的（should-not-trigger）

关键是**负面案例要"近似但不同"**，不能太明显：

```
❌ 差的负面用例（对 PDF 技能）：
"写一个斐波那契函数"  ← 太明显不相关

✅ 好的负面用例（对 PDF 技能）：
"帮我把这个 Word 文档转成 PDF" ← 看起来相关，但其实需要的是格式转换技能
```

好的测试查询要像真实用户说话：

```
✅ "我老板刚发了个 xlsx 文件（在我下载文件夹里，
叫 Q4 sales final FINAL v2.xlsx），她要我加一列利润率。
收入在 C 列，成本在 D 列吧好像"
```

**Step 2：让用户审核**

通过 HTML 模板让用户在浏览器中交互式地编辑、添加、删除评测查询。

**Step 3：运行优化循环**

```bash
python -m scripts.run_loop \\
  --eval-set trigger-eval.json \\
  --skill-path ./my-skill \\
  --max-iterations 5
```

自动完成：60% 训练 + 40% 测试，每个查询跑 3 次，最多迭代 5 轮。

**Step 4：应用最佳描述**

取 `best_description` 更新 SKILL.md 的 frontmatter。

### Description 编写技巧

文档特别强调——description 要"稍微推销"（a little bit "pushy"）：

```
❌ 平淡：
如何构建一个简单的仪表板来显示内部数据。

✅ 推销：
如何构建一个简单的仪表板来显示内部数据。
当用户提到仪表板、数据可视化、内部指标，
或想展示任何类型的公司数据时，请确保使用此技能，
即使他们没有明确要求"仪表板"。
```

---

## 7. 实战演练：创建一个 Git 提交信息规范化 Skill

让我们用一个完整的例子走一遍全流程。

### 7.1 确定需求

我想创建一个技能，让 Claude 在我提交代码时自动生成符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范的提交信息。

### 7.2 编写 SKILL.md

```yaml
---
name: conventional-commit
description: 根据代码变更生成符合 Conventional Commits 规范的提交信息。
  当用户要求生成 commit message、提交信息，或在 git commit
  相关操作中需要帮助时使用此技能。
---
```

```markdown
# Conventional Commit 生成器

根据暂存的代码变更，生成规范的提交信息。

## 提交格式
<type>(<scope>): <description>

[可选的正文]

[可选的脚注]

## 类型映射
- feat: 新功能
- fix: 修复 Bug
- docs: 文档变更
- style: 格式调整（不影响代码逻辑）
- refactor: 重构
- test: 测试相关
- chore: 构建/工具/依赖变更

## 示例
**示例 1：**
Input: 在用户模块添加了邮箱验证功能
Output: feat(user): add email verification

**示例 2：**
Input: 修复了购物车价格计算的浮点精度问题
Output: fix(cart): resolve floating-point precision in price calculation

## 执行步骤
1. 读取 `git diff --staged` 的输出
2. 分析变更涉及的模块和意图
3. 选择最合适的 type
4. 生成简洁但信息充分的 description（英文，< 72 字符）
5. 如果变更复杂，在正文中补充说明
```

### 7.3 创建测试用例

```json
{
  "skill_name": "conventional-commit",
  "evals": [
    {
      "id": 1,
      "prompt": "帮我看看我改了什么，生成一个 commit message",
      "expected_output": "符合 conventional commits 格式的提交信息"
    },
    {
      "id": 2,
      "prompt": "我刚重构了认证模块，帮我写提交信息",
      "expected_output": "以 refactor(auth): 开头的提交信息"
    },
    {
      "id": 3,
      "prompt": "这几个文件改了一堆东西，总结一下变更写个 commit",
      "expected_output": "准确概括多文件变更的提交信息"
    }
  ]
}
```

### 7.4 迭代优化

运行测试 → 审查结果 → 发现问题（如：scope 选取不够精准）→ 改进 SKILL.md → 再测试。

### 7.5 打包分发

```bash
python -m scripts.package_skill ./conventional-commit
```

生成 `conventional-commit.skill` 文件，可以分享给任何人安装使用。

---

## 总结

Skill-Creator 不只是一个工具，它代表了一种**"人机协作开发 AI 行为"** 的范式：

| 维度 | 传统 Prompt | Skill |
|------|------------|-------|
| 复用性 | 一次性 | 永久复用 |
| 可测试性 | 无法测试 | 内置评测体系 |
| 可迭代性 | 从头来过 | 版本迭代 |
| 可分享性 | 复制粘贴 | .skill 文件分发 |
| 触发方式 | 手动粘贴 | 自动识别场景 |

掌握 Skill-Creator，你就拥有了**给 AI 编程的能力**——不是用 Python 或 JavaScript，而是用自然语言。

---

**📚 参考资料：**
- [Anthropic Skills 仓库](https://github.com/anthropics/skills)
- [Skill-Creator 源码](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- [Conventional Commits 规范](https://www.conventionalcommits.org/)',
1, 0, '2026-04-03 16:00:00', '2026-04-03 16:00:00', '2026-04-03 16:00:00');

-- 5. 插入文章-标签关联
INSERT IGNORE INTO article_tags (article_id, tag_id) VALUES
(1, 1),  -- AI
(1, 2),  -- Claude
(1, 3),  -- Anthropic
(1, 4),  -- Skills
(1, 5);  -- Prompt Engineering
