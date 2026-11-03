# 东京，读不懂的空气（Tokyo Quest）

一款零基础日语互动故事游戏。你扮演刚到东京的中国 AI 工程师小光，一句日语都不会，却要靠"开口说日语"在这个读不懂空气的城市里活下去、证明自己。

- **类型**：互动故事 / 视觉小说（浏览器端，无需安装）
- **语言**：日语原文 + 罗马字注音 + 中文翻译，三层对照
- **面向**：纯零基础日语学习者
- **体量**：EP01 共 74 个剧情节点、10 个场景，约 8-10 分钟

## 在线玩

👉 https://peace-prevails.github.io/japanese-quest/

## 本地运行

游戏是纯静态文件，需要本地静态服务器（不能直接双击 index.html）：

```bash
git clone https://github.com/Peace-prevails/japanese-quest.git
cd japanese-quest
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 怎么玩

核心机制：**语言能力 = 剧情推进力**。选一句日语"说"出去，剧情就往下走；说错不惩罚，NPC 会放慢语速、用更简单的词重说。你选的每句话都会自动用男声朗读（读完才推进）。

- **Auto voice**：默认开启，每句台词自动朗读，顶栏可开关
- **▶ Listen**：每句台词旁手动重听
- **Hints**：中文翻译和罗马字注音开关
- **Notebook**：回顾故事和遇到的表达

## 本集重点表达

| 表达 | 罗马音 | 意思 |
|------|--------|------|
| すみません | sumimasen | 对不起 / 不好意思 |
| ありがとうございます | arigatō gozaimasu | 谢谢 |
| はい | hai | 是 / 好的 |
| わかりません | wakarimasen | 我听不懂 |
| わかりました | wakarimashita | 好的 / 明白了 |
| はじめまして | hajimemashite | 初次见面 |
| よろしくお願いします | yoroshiku onegai shimasu | 请多关照 |
| お疲れさまです | otsukaresama desu | 辛苦了 |

## 文档

- [如何玩.md](./如何玩.md) — 完整玩法说明
- [SOP.md](./SOP.md) — 制作"互动故事 × 语言教学"游戏的通用流程 SOP

## 技术栈

纯静态前端（无后端）。数据模型：日语原文 / 中文翻译 / 罗马字注音，内嵌在剧情 JSON。素材：53 张 AI 生成场景图/立绘 + 116 句配音（5 个声线）。
