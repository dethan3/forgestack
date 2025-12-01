# 函数基础

## 核心概念

函数是 JavaScript 的一等公民（first-class citizen），可以像其他值一样传递和赋值。

## 函数声明

### 函数声明（Function Declaration）

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

greet('Alice');  // 'Hello, Alice!'
```

**特点**：
- 会被提升（hoisting）到作用域顶部
- 可以在声明之前调用

### 函数表达式（Function Expression）

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};

greet('Bob');  // 'Hello, Bob!'
```

**特点**：
- 不会被提升
- 可以是匿名函数

### 命名函数表达式

```javascript
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);  // 内部可用 fact
};

factorial(5);  // 120
// fact(5);    // ReferenceError（外部不可用）
```

## 函数提升

```javascript
// 函数声明会被提升
sayHello();  // ✅ 可以调用

function sayHello() {
  console.log('Hello!');
}

// 函数表达式不会提升
sayBye();  // ❌ TypeError

const sayBye = function() {
  console.log('Bye!');
};
```

## 返回值

### 显式返回

```javascript
function add(a, b) {
  return a + b;
}
```

### 隐式返回 undefined

```javascript
function noReturn() {
  console.log('No return');
}

noReturn();  // undefined
```

### 提前返回

```javascript
function divide(a, b) {
  if (b === 0) {
    return null;  // 提前返回
  }
  return a / b;
}
```

## 函数作为值

### 赋值给变量

```javascript
const myFunc = function() { return 42; };
```

### 作为参数传递

```javascript
function execute(fn) {
  return fn();
}

execute(() => 'Hello');  // 'Hello'
```

### 作为返回值

```javascript
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHi = createGreeter('Hi');
sayHi('Alice');  // 'Hi, Alice!'
```

### 存储在对象/数组中

```javascript
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

operations.add(5, 3);  // 8
```

## 立即执行函数（IIFE）

```javascript
// 立即执行并返回结果
const result = (function() {
  const private = 'secret';
  return private.toUpperCase();
})();

// result = 'SECRET'
// private 不可访问

// 带参数的 IIFE
(function(x, y) {
  console.log(x + y);
})(3, 4);  // 7
```

## 回调函数

```javascript
// 数组方法中的回调
[1, 2, 3].map(function(n) {
  return n * 2;
});

// 事件处理回调
button.addEventListener('click', function(event) {
  console.log('Clicked!');
});

// 异步回调
setTimeout(function() {
  console.log('1 second later');
}, 1000);
```

## 递归函数

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

factorial(5);  // 120

// 尾递归优化（部分环境支持）
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
}
```

## 最佳实践

### 1. 函数应该做一件事

```javascript
// ❌ 做了太多事
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
}

// ✅ 单一职责
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function notifyUser(user) { /* ... */ }
```

### 2. 使用描述性的函数名

```javascript
// ❌ 不清晰
function proc(d) { /* ... */ }

// ✅ 清晰
function processUserData(userData) { /* ... */ }
```

### 3. 限制参数数量

```javascript
// ❌ 参数过多
function createUser(name, age, email, phone, address) {}

// ✅ 使用对象参数
function createUser({ name, age, email, phone, address }) {}
```

---

## 练习预告

继续学习 [02-arrow-functions.md](./02-arrow-functions.md) →
