# 高阶函数

## 核心概念

高阶函数（Higher-Order Function）是指满足以下条件之一的函数：
- 接收一个或多个函数作为参数
- 返回一个函数作为结果

## 函数作为参数

### 数组方法

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: 转换每个元素
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter: 筛选元素
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce: 累积计算
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// find: 查找元素
const firstEven = numbers.find(n => n % 2 === 0);
// 2

// every/some: 条件检查
numbers.every(n => n > 0);  // true
numbers.some(n => n > 4);   // true
```

### 自定义高阶函数

```javascript
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// 0
// 1
// 2

function unless(condition, then) {
  if (!condition) then();
}

unless(false, () => console.log('执行了'));
// '执行了'
```

## 函数作为返回值

### 函数工厂

```javascript
function greeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greeter('Hello');
const sayHi = greeter('Hi');

sayHello('Alice');  // 'Hello, Alice!'
sayHi('Bob');       // 'Hi, Bob!'
```

### 乘法器

```javascript
function multiplier(factor) {
  return n => n * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

double(5);   // 10
triple(5);   // 15

// 组合使用
[1, 2, 3].map(double);  // [2, 4, 6]
```

## 实用高阶函数

### 函数包装器

```javascript
function logged(fn) {
  return function(...args) {
    console.log(`调用 ${fn.name}，参数:`, args);
    const result = fn(...args);
    console.log(`返回:`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = logged(add);

loggedAdd(2, 3);
// 调用 add，参数: [2, 3]
// 返回: 5
```

### once（只执行一次）

```javascript
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('初始化');
  return { ready: true };
});

initialize();  // '初始化'，返回 { ready: true }
initialize();  // 不执行，返回 { ready: true }
```

### after（N次后执行）

```javascript
function after(n, fn) {
  let count = 0;
  return function(...args) {
    count++;
    if (count >= n) {
      return fn(...args);
    }
  };
}

const logAfter3 = after(3, () => console.log('第三次了！'));

logAfter3();  // 无输出
logAfter3();  // 无输出
logAfter3();  // '第三次了！'
```

## 链式调用

```javascript
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)    // [2, 4, 6, 8, 10]
  .map(n => n * n)              // [4, 16, 36, 64, 100]
  .reduce((a, b) => a + b, 0);  // 220
```

## 闭包与高阶函数

```javascript
function counter(start = 0) {
  let count = start;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
    reset: () => { count = start; }
  };
}

const c = counter(10);
c.increment();  // 11
c.increment();  // 12
c.get();        // 12
c.reset();
c.get();        // 10
```

---

## 练习预告

继续学习 [02-currying.md](./02-currying.md) →
