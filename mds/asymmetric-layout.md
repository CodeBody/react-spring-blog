# 非对称布局：asymmetric-layout 快速上手指南


## 📦 什么是 asymmetric-layout？


`asymmetric-layout`（非对称布局）是打破平庸设计的终极武器。它并非随意堆砌，而是通过 **数学上的视觉平衡 (Visual Weight Balance)**、**有意的对齐错位** 以及 **大面积的负空间对比**，创造出一种动感且具有张力的页面结构。它让用户在不寻常的比例中感受到强烈的**品牌个性与设计深度**。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中实现“动态平衡”：


### 1. CSS Grid 偏移量方案 (推荐)
这是最精确、最符合现代标准的方案：
```bash
# 利用 grid-column 和 grid-row 的起止点偏移
grid-column: 1 / 8; /* 占据非对称的大部分 */
grid-column: 9 / 13; /* 占据剩余的小部分 */
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步非对称布局范式：
```bash
npx openskills install frontend/asymmetric --universal && npx openskills sync
```


### 3. Tailwind 任意比例网格
在全局配置文件中定义非标准的分栏系统：
```js
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        'asym-hero': 'minmax(0, 7fr) minmax(0, 5fr)',
      }
    }
  }
}
```


---


## 💬 如何通过对话使用？


调用 `asymmetric-layout` 的关键在于：**定义视觉重心与引导流**。


### 万能对话公式
> **[核心视觉元素层级]** + **[负空间占比]** + **[非平衡对齐的数学比例]**


---


### 🏡 高端建筑事务所主页 (Architectural Hero)

利用极端的空隙增加品牌的高级感：

```markdown
请使用 asymmetric-layout 设计主视觉区。要求：左侧 60% 保持完全真空，右侧 40% 放置一张 4/3 比例的项目大图，并让标题横跨中心线。
```


### 🗞 杂志风格专题阅读 (Editorial Feature)

在文本与图片的相互穿插中创造节奏感：

```markdown
请为我的长文页面设计一个非对称模板。风格要求：奇数段落文字向左偏移 10%，偶数段落右对齐，且大张配图以 6:4 的比例与文字发生局部重叠。
```


### 🎨 创意工作室案例展示 (Studio Portfolio)

通过布局的不可预测性展现审美自信：

```markdown
请使用 asymmetric-layout 展示我的近期作品。要求：采用三栏网格，但每一行卡片的高度和宽度都随机错开（1x1, 1x2, 2x1），并确保整体视觉重心位于页面的黄金分割点。
```


### 🏛 精品奢侈品画廊 (Luxury Gallery)

让商品本身成为唯一的装饰中心：

```markdown
请设计一个腕表展示页。要求：背景采用单色深灰，手表偏置于页面右下角 1/3 处，品牌的价值观文案则悬浮在左上角的真空区域。
```


### 🛠 系统仪表盘核心看板 (Admin Focal)

通过非对称引导用户优先关注核心指标：

```markdown
请为仪表盘重构布局。要求：最重要的“用户留存率”实时看板占据页面左侧 70%，剩余 30% 用于堆叠 4 个微型辅助指标，颜色对比度设为高。
```


---


`asymmetric-layout` 让你的设计不再沉闷。**现在就大胆地打破那些平庸的正方形，尝试用错位的比例去吸引你的第一波用户。** 🚀
