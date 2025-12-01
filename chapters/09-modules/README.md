# 第九章：模块化

## 📖 本章概述

掌握 JavaScript 模块系统，学习如何组织和复用代码。

## 🎯 学习目标

完成本章后，你将能够：

- 理解 ES Modules 工作原理
- 熟练使用 import/export 语法
- 掌握动态导入和代码分割
- 理解模块作用域和循环依赖
- 设计良好的模块结构

## 📂 章节内容

```
09-modules/
├── concepts/                     # 概念文档
│   ├── 01-module-basics.md       # 模块基础
│   ├── 02-export-import.md       # 导出与导入
│   ├── 03-dynamic-import.md      # 动态导入
│   ├── 04-module-patterns.md     # 模块模式
│   └── 05-module-tools.md        # 模块工具
│
├── exercises/                    # 练习题
│   ├── 01-exports.js
│   ├── 02-imports.js
│   └── 03-patterns.js
│
└── challenges/                   # 综合挑战
    └── challenge-01/
```

## ⏱️ 预计时间

- 概念阅读：2 小时
- 练习题：2 小时
- 综合挑战：1 小时

总计约 **5 小时**

## 🚀 开始学习

1. 从 `concepts/01-module-basics.md` 开始阅读
2. 完成对应的练习题
3. 运行测试：`pnpm test:09`
4. 完成综合挑战

## 🔑 核心 ES6+ 特性

| 特性 | 说明 |
|------|------|
| export | 命名导出 |
| export default | 默认导出 |
| import | 静态导入 |
| import() | 动态导入 |
| import.meta | 模块元信息 |

---

准备好了吗？开始阅读 [concepts/01-module-basics.md](./concepts/01-module-basics.md) →
