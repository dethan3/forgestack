# 解构赋值

## 核心概念

解构赋值是 ES6 引入的语法，可以从对象或数组中提取数据到独立变量。

## 对象解构

### 基本语法

```javascript
const user = { name: 'Alice', age: 25 };

// 解构
const { name, age } = user;

console.log(name);  // 'Alice'
console.log(age);   // 25
```

### 重命名

```javascript
const user = { name: 'Alice', age: 25 };

// 解构并重命名
const { name: userName, age: userAge } = user;

console.log(userName);  // 'Alice'
console.log(userAge);   // 25
// console.log(name);   // ReferenceError
```

### 默认值

```javascript
const user = { name: 'Alice' };

const { name, age = 18 } = user;

console.log(name);  // 'Alice'
console.log(age);   // 18（使用默认值）

// 重命名 + 默认值
const { name: n, age: a = 18 } = user;
```

### 嵌套解构

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'Beijing',
    zip: '100000'
  }
};

// 嵌套解构
const { name, address: { city, zip } } = user;

console.log(city);  // 'Beijing'
// console.log(address);  // ReferenceError

// 同时保留父对象
const { name: n, address, address: { city: c } } = user;
```

### 剩余属性

```javascript
const user = { name: 'Alice', age: 25, email: 'a@b.c' };

const { name, ...rest } = user;

console.log(name);  // 'Alice'
console.log(rest);  // { age: 25, email: 'a@b.c' }
```

## 数组解构

### 基本语法

```javascript
const colors = ['red', 'green', 'blue'];

const [first, second, third] = colors;

console.log(first);   // 'red'
console.log(second);  // 'green'
```

### 跳过元素

```javascript
const colors = ['red', 'green', 'blue'];

const [, , third] = colors;
console.log(third);  // 'blue'

const [first, , last] = colors;
console.log(first, last);  // 'red', 'blue'
```

### 默认值

```javascript
const arr = [1];

const [a, b = 2] = arr;

console.log(a);  // 1
console.log(b);  // 2
```

### 剩余元素

```javascript
const numbers = [1, 2, 3, 4, 5];

const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(rest);   // [3, 4, 5]
```

### 交换变量

```javascript
let a = 1;
let b = 2;

// 传统方式
// const temp = a; a = b; b = temp;

// 解构交换
[a, b] = [b, a];

console.log(a);  // 2
console.log(b);  // 1
```

## 函数参数解构

### 对象参数

```javascript
// 传统方式
function greet(options) {
  const name = options.name;
  const greeting = options.greeting || 'Hello';
  return `${greeting}, ${name}!`;
}

// 解构参数
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}

greet({ name: 'Alice' });  // 'Hello, Alice!'
greet({ name: 'Bob', greeting: 'Hi' });  // 'Hi, Bob!'
```

### 带默认对象

```javascript
// 防止不传参数时报错
function greet({ name = 'Guest', greeting = 'Hello' } = {}) {
  return `${greeting}, ${name}!`;
}

greet();  // 'Hello, Guest!'
```

### 数组参数

```javascript
function sum([a, b]) {
  return a + b;
}

sum([1, 2]);  // 3
```

## 实用模式

### 提取对象部分属性

```javascript
const user = { id: 1, name: 'Alice', age: 25, email: 'a@b.c' };

// 只提取需要的
const { name, email } = user;
const publicInfo = { name, email };
```

### 函数返回多个值

```javascript
function getMinMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}

const { min, max } = getMinMax([1, 5, 3, 9, 2]);
console.log(min, max);  // 1, 9
```

### 导入模块

```javascript
// 解构导入
import { useState, useEffect } from 'react';

// 等价于
import React from 'react';
const { useState, useEffect } = React;
```

### 循环中解构

```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

for (const { name, age } of users) {
  console.log(`${name} is ${age}`);
}

// 或使用 forEach
users.forEach(({ name, age }) => {
  console.log(`${name} is ${age}`);
});
```

---

## 练习预告

继续学习 [04-spread-rest.md](./04-spread-rest.md) →
