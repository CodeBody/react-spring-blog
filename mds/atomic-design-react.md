# 原子化设计：atomic-design-react 快速上手指南


## 📦 什么是 atomic-design-react？


`atomic-design-react`（原子化设计）是 UI 组件化开发的工业标准。它借鉴了化学中的分子结构模型，将界面拆解为五个层级：**原子 (Atoms)**、**分子 (Molecules)**、**组织 (Organisms)**、**模板 (Templates)** 和 **页面 (Pages)**。这种严谨的层级划分能够极大地提升组件的**可复用性**与**可维护性**。它是构建**大规模设计系统 (Scalable Design Systems)** 的核心架构思维。


## ⚙️ 如何安装？


原子化设计是一种架构模式，不需要安装特定的依赖库，仅需遵循目录结构规范：


### 1. 标准的目录结构方案 (推荐)
这是最稳健、最清晰的生产级方案：
```bash
# src/components 下设立五个核心分层目录
src/components/
  ├── atoms/      # Button, Input, Icon
  ├── molecules/  # SearchBar, CardItem
  ├── organisms/  # GlobalNavbar, Footer
  ├── templates/  # MainLayout, DashboardLayout
  └── pages/      # 最终组合而成的业务页面
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步原子化组件定义方案：
```bash
npx openskills install react/atomic-design --universal && npx openskills sync
```


### 3. Storybook 组件仓库同步
配合 Storybook 实现原子化组件的隔离化开发。


---


## 💬 如何通过对话使用？


调用 `atomic-design-react` 的关键在于：**定义组件的颗粒度与边界。**


### 万能对话公式
> **[组件的核心功能]** + **[在原子化层级中的归属]** + **[父子层级的组合关系]**


---


### 🔘 品牌原子组件的定义 (Atom Definition)

打造最基础、高度可复用的单一功能砖块：

```markdown
请使用 atomic-design-react 设计“主操作按钮”。要求：将其归类为 Atom，具备 Primary, Secondary 两种状态，且不耦合任何具体的业务数据。
```


### 🔍 搜索功能的分子聚合 (Molecule Assembly)

由多个原子组件组合而成的独立功能单元：

```markdown
请为一个“社交搜索栏”组装分子。要求：由一个 Icon 原组件、一个 Input 原组件和一个 Button 原组件聚合而成，在 Molecular 目录下实现内部联动。
```


### 🏛 全局导航的组织化构建 (Organism Architecture)

处理复杂的业务模块，通常包含多个分子：

```markdown
请使用 atomic-design-react 设计“顶部全局导航”。要求：将其归类为 Organism，包含 Logo 分子、搜索分子和用户个人资料分子。
```


### 🏗 框架模板的布局布局方案 (Template Layout)

不带真实数据的页面结构骨架：

```markdown
请为一个“两栏内容管理页”设计 Template。要求：定义左侧导航占位符、中间主内容占位符及右侧辅助侧边栏占位符，仅在模板层处理 Grid 布局。
```


### 🖼 最终业务页面的拼装 (Page Composition)

注入真实数据，完成最后的组件装配：

```markdown
请在 Pages 层级组装“用户个人设置页”。要求：调用 `ProfileTemplate` 模板，向其对应的 Slot 中注入具体的组织 (Organisms) 与真实的用户数据流。
```


---


`atomic-design-react` 让代码像积木一样精准。**现在就放弃杂乱无章的目录结构，尝试用原子的视角去构建你的数字王国。** 🚀
