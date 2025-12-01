# 变量声明

## 核心概念

JavaScript 有三种声明变量的方式：`var`、`let`、`const`。在现代 JavaScript 中，推荐使用 `let` 和 `const`。

## var vs let vs const

### var（避免使用）

```javascript
var name = 'Alice';
var name = 'Bob'; // 允许重复声明
name = 'Charlie'; // 允许重新赋值
```

**问题**：
- 函数作用域，而非块级作用域
- 存在变量提升（hoisting）
- 可以重复声明

### let（可变变量）

```javascript
let count = 0;
count = 1; // ✅ 允许重新赋值

let count = 2; // ❌ 不允许重复声明
```

**特点**：
- 块级作用域
- 不能重复声明
- 可以重新赋值

### const（常量）

```javascript
const PI = 3.14159;
PI = 3; // ❌ 不允许重新赋值

const user = { name: 'Alice' };
user.name = 'Bob'; // ✅ 对象属性可以修改
user = {}; // ❌ 不能重新赋值
```

**特点**：
- 块级作用域
- 声明时必须初始化
- 不能重新赋值（但对象/数组的内容可以修改）

## 块级作用域

```javascript
if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}

console.log(a); // 1（var 泄漏到外部）
console.log(b); // ReferenceError
console.log(c); // ReferenceError
```

## 变量提升（Hoisting）

```javascript
// var 的提升
console.log(x); // undefined（不报错，但值是 undefined）
var x = 5;

// let/const 的暂时性死区（TDZ）
console.log(y); // ReferenceError
let y = 5;
```

## 最佳实践

### 1. 默认使用 const

```javascript
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const user = { name: 'Alice' };
```

### 2. 需要重新赋值时使用 let

```javascript
let count = 0;
for (let i = 0; i < 10; i++) {
  count += i;
}
```

### 3. 永远不要使用 var

```javascript
// ❌ 避免
var oldStyle = 'bad';

// ✅ 推荐
const newStyle = 'good';
```

## 命名规范

```javascript
// 普通变量：camelCase
const userName = 'Alice';
let itemCount = 0;

// 常量（真正不变的值）：UPPER_SNAKE_CASE
const MAX_SIZE = 100;
const API_KEY = 'xxx';

// 布尔值：is/has/can 前缀
const isActive = true;
const hasPermission = false;
const canEdit = true;
```

## 常见错误

### 1. 在声明前使用变量

```javascript
console.log(name); // ReferenceError
const name = 'Alice';
```

### 2. 重复声明

```javascript
let x = 1;
let x = 2; // SyntaxError
```

### 3. 给 const 重新赋值

```javascript
const PI = 3.14;
PI = 3; // TypeError
```

### 4. const 声明不初始化

```javascript
const x; // SyntaxError: Missing initializer
```

---

## 练习预告

完成阅读后，请前往 `exercises/01-variables.js` 完成练习题。

运行测试：
```bash
pnpm test:01
```
