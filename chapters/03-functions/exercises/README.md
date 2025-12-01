# 练习题

## 📋 练习列表

| 文件 | 主题 | 难度 |
|------|------|------|
| 01-basics.js | 函数基础与高阶函数 | ⭐⭐ |
| 02-arrow-functions.js | 箭头函数 | ⭐⭐ |
| 03-closures.js | 闭包应用 | ⭐⭐⭐ |

## 🚀 如何完成练习

1. 阅读对应的 `concepts/` 文档
2. 打开练习文件，阅读每个函数的注释要求
3. 在 `// TODO` 处编写代码
4. 运行测试验证

## 🧪 运行测试

```bash
# 运行第三章所有测试
pnpm test:03

# 监听模式
pnpm test:watch chapters/03-functions
```

## 💡 提示

- 箭头函数的 this 继承自外层作用域
- 闭包可以访问定义时的作用域变量
- 高阶函数接收或返回函数

## ✅ 完成标准

所有测试通过即为完成：

```
✓ 01-basics.js
✓ 02-arrow-functions.js
✓ 03-closures.js
```
