# 全新 AI 审美技能：frontend-design 快速上手指南


## 📦 什么是 frontend-design？


`frontend-design` 是由 **Anthropic** 官方开发的一项 AI 技能。它能让 AI 跨越平庸的“模板代码”，直接生成具备**生产级审美**、**视觉逻辑严密**的前端界面。它本质上是为 AI 注入了一套专业的“设计师决策逻辑”。


## ⚙️ 如何安装？


你可以根据你的环境，选择以下任意一种方式进行部署：


### 1. 命令行安装 (推荐)
使用 **OpenSkills** 工具一键同步：
```bash
# 安装并同步
npx openskills install anthropics/skills --universal && npx openskills sync
```


### 2. Git 仓库克隆
直接将源码同步至本地技能目录：
```bash
# 在项目根目录下执行
git clone https://github.com/anthropics/skills.git .agent/skills/anthropics
npx openskills sync
```


### 3. 手动下载安装
适合内网或离线环境：
1. 从 [官方仓库](https://github.com/anthropics/skills) 下载 ZIP 压缩包。
2. 解压并将 `frontend-design` 文件夹放入项目的 `.agent/skills/` 目录下。
3. 运行 `npx openskills sync` 激活技能。


---


## 💬 如何通过对话使用？


调用该技能的关键在于：**给 AI 一个极端的、明确的审美方向。** 拒绝模糊的“帮我做个好看的界面”。


### 🎨 高端艺术家作品集 (Minimalist)

追求极致的留白与比例平衡，适合展示个人品牌：

```markdown
使用 frontend-design 为我重构作品集首页。风格定位：极简主义 (Minimalism)。视觉要求：采用超大留白 (Negative Space)、非对称排版，并确保文字层级极其鲜明，使用大号优雅的衬线字体作为标题。
```


### 🌌 赛博朋克数据大盘 (Cyberpunk/Dark)

高对比度、工业感极强的暗色监控界面：

```markdown
调用 frontend-design 为我开发数据监控面板。风格定位：硬核赛博 (Cyberpunk/Industrial)。视觉要求：采用深色背景与霓虹强调色、多层网格背景，并注入噪点扫描线纹理，组件使用透明毛玻璃 (Glassmorphism) 效果。
```


### 💎 高端奢侈品电商页 (Luxury/Refined)

利用动态效果揭示商品精致度的沉浸式设计：

```markdown
使用 frontend-design 设计商品详情页。风格定位：精致现代 (Luxury/Refined)。视觉要求：采用沉浸式全屏布局、磁吸式内容对齐，并注入优雅的页面加载交替揭示 (Staggered Reveal) 动画。
```


### 📐 包豪斯风格管理后台 (Bauhaus/Geometric)

强烈的几何秩序感，适合复杂的业务逻辑展示：

```markdown
使用 frontend-design 重新设计这个表单。风格定位：包豪斯 (Bauhaus)。视觉要求：强调强烈的几何感、高对比度的红黄蓝三原色微调，并确保极高信息密度的模块化布局。
```


### 🎞 复古未来主义落地页 (Retro-futuristic)

模拟信号时代的色彩美学与物理边框感：

```markdown
使用 frontend-design 为我生成产品落地页。风格定位：复古未来 (Retro-futuristic)。视觉要求：采用模拟信号时代的色彩失真 (Chromatic Aberration) 效果、类 CRT 的扫描线背景，以及圆润且具有厚重感的物理边框。
```


### 🌿 自然有机风格康养 App (Organic/Natural)

柔和、呼吸感极强的治愈系交互：

```markdown
使用 frontend-design 开发冥想应用界面。风格定位：自然有机 (Organic/Natural)。视觉要求：采用非各向同性的流体形状、柔和的泥土色系 (Earthy Tones)，并注入微小的磨砂玻璃质感与缓慢的呼吸感动画。
```


### ⛓ 粗野主义新闻门户 (Brutalist)

打破常规、极具视觉冲击力的原始排版：

```markdown
使用 frontend-design 重构新闻列表页。风格定位：粗野主义 (Brutalist)。视觉要求：采用原始的、未加工的排版逻辑，粗大的黑色边框 (Border-width: 4px)，以及高对比度的纯色块背景，打破常规的视觉层级。
```


---


`frontend-design` 不只是让网页变美，它是在代码与设计之间建立的专业桥梁。**此刻就开始，让你的 AI 惊艳你一次。** 🚀
