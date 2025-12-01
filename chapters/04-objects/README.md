# 第四章：对象

## 📖 本章概述

深入理解 JavaScript 对象，掌握 ES6+ 的解构赋值和展开运算符。

## 🎯 学习目标

完成本章后，你将能够：

- 理解对象的创建、访问和操作
- 熟练使用解构赋值提取属性
- 掌握展开运算符合并和复制对象
- 理解对象的引用和深浅拷贝
- 了解属性描述符和对象方法

## 📂 章节内容

```
04-objects/
├── concepts/                      # 概念文档
│   ├── 01-object-basics.md        # 对象基础
│   ├── 02-object-methods.md       # 对象方法
│   ├── 03-destructuring.md        # 解构赋值
│   ├── 04-spread-rest.md          # 展开与剩余
│   └── 05-property-descriptors.md # 属性描述符
│
├── exercises/                     # 练习题
│   ├── 01-basics.js
│   ├── 02-destructuring.js
│   └── 03-methods.js
│
└── challenges/                    # 综合挑战
    └── challenge-01/
```

## ⏱️ 预计时间

- 概念阅读：2 小时
- 练习题：2.5 小时
- 综合挑战：1 小时

总计约 **5.5 小时**

## 🚀 开始学习

1. 从 `concepts/01-object-basics.md` 开始阅读
2. 完成对应的练习题
3. 运行测试：`pnpm test:04`
4. 完成综合挑战

## 🔑 核心 ES6+ 特性

| 特性 | 说明 |
|------|------|
| 解构赋值 | `const { a, b } = obj` |
| 展开运算符 | `{ ...obj }` |
| 属性简写 | `{ name, age }` |
| 计算属性名 | `{ [key]: value }` |
| Object.entries | 获取键值对数组 |
| Object.fromEntries | 从键值对创建对象 |

---

准备好了吗？开始阅读 [concepts/01-object-basics.md](./concepts/01-object-basics.md) →
