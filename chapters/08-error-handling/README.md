# 第八章：错误处理

## 📖 本章概述

学习 JavaScript 错误处理的最佳实践，从基础语法到高级模式。

## 🎯 学习目标

完成本章后，你将能够：

- 掌握 try/catch/finally 语法
- 理解内置错误类型
- 创建自定义错误类
- 处理同步和异步错误
- 实现错误边界和全局处理

## 📂 章节内容

```
08-error-handling/
├── concepts/                     # 概念文档
│   ├── 01-try-catch.md           # try/catch/finally
│   ├── 02-error-types.md         # 错误类型
│   ├── 03-custom-errors.md       # 自定义错误
│   ├── 04-async-errors.md        # 异步错误处理
│   └── 05-best-practices.md      # 最佳实践
│
├── exercises/                    # 练习题
│   ├── 01-basics.js
│   ├── 02-custom-errors.js
│   └── 03-async-errors.js
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

1. 从 `concepts/01-try-catch.md` 开始阅读
2. 完成对应的练习题
3. 运行测试：`pnpm test:08`
4. 完成综合挑战

## 🔑 核心概念

| 概念 | 说明 |
|------|------|
| try/catch | 同步错误捕获 |
| finally | 清理代码 |
| Error 类型 | 内置错误类 |
| 自定义错误 | extends Error |
| 错误链 | cause 属性 |

---

准备好了吗？开始阅读 [concepts/01-try-catch.md](./concepts/01-try-catch.md) →
