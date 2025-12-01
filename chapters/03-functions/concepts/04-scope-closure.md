# 作用域与闭包

## 作用域（Scope）

### 全局作用域

```javascript
const globalVar = 'I am global';

function test() {
  console.log(globalVar);  // 可访问
}
```

### 函数作用域

```javascript
function outer() {
  const outerVar = 'outer';
  
  function inner() {
    console.log(outerVar);  // 可访问外层变量
  }
  
  inner();
}

// console.log(outerVar);  // ReferenceError
```

### 块级作用域（let/const）

```javascript
if (true) {
  let blockVar = 'block';
  const blockConst = 'const';
}

// console.log(blockVar);  // ReferenceError
```

### 作用域链

```javascript
const a = 1;

function outer() {
  const b = 2;
  
  function inner() {
    const c = 3;
    console.log(a, b, c);  // 1, 2, 3
  }
  
  inner();
}
```

## 闭包（Closure）

### 什么是闭包

闭包是函数与其词法环境的组合。当函数在其定义作用域之外执行时，仍然可以访问定义时的作用域变量。

```javascript
function createCounter() {
  let count = 0;  // 私有变量
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter();  // 1
counter();  // 2
counter();  // 3
// count 对外部不可见，但函数可以访问
```

### 闭包的应用

#### 1. 数据封装

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);   // 150
account.withdraw(30);  // 120
// account.balance 无法直接访问
```

#### 2. 函数工厂

```javascript
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5);  // 10
triple(5);  // 15
```

#### 3. 记忆化（Memoization）

```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key] === undefined) {
      cache[key] = fn.apply(this, args);
    }
    
    return cache[key];
  };
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(5);  // Computing... 25
expensiveCalc(5);  // 25（从缓存返回）
```

#### 4. 延迟执行

```javascript
function delay(fn, ms) {
  return function(...args) {
    setTimeout(() => fn.apply(this, args), ms);
  };
}

const delayedLog = delay(console.log, 1000);
delayedLog('Hello');  // 1秒后输出 'Hello'
```

### 闭包陷阱

#### 循环中的闭包

```javascript
// ❌ 问题：所有回调共享同一个 i
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 3, 3, 3
  }, 100);
}

// ✅ 解决方案 1：使用 let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 0, 1, 2
  }, 100);
}

// ✅ 解决方案 2：IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);  // 0, 1, 2
    }, 100);
  })(i);
}
```

#### 内存泄漏

```javascript
// 可能导致内存泄漏
function createHandler() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    // largeData 被闭包引用，无法被垃圾回收
    console.log(largeData.length);
  };
}

// 解决：不需要时解除引用
let handler = createHandler();
// 使用完毕后
handler = null;
```

## 词法作用域 vs 动态作用域

JavaScript 使用**词法作用域**（静态作用域）：

```javascript
const x = 10;

function foo() {
  console.log(x);  // 在定义时确定，不是调用时
}

function bar() {
  const x = 20;
  foo();  // 输出 10，不是 20
}

bar();
```

---

## 练习预告

继续学习 [05-this-binding.md](./05-this-binding.md) →
