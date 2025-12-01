# 循环

## 核心概念

循环用于重复执行代码块，直到满足特定条件。

## for 循环

### 基本语法

```javascript
for (初始化; 条件; 更新) {
  // 循环体
}

// 示例
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

### 遍历数组

```javascript
const fruits = ['apple', 'banana', 'orange'];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

## for...of 循环（ES6+）

遍历可迭代对象（数组、字符串、Map、Set 等）的**值**。

```javascript
const fruits = ['apple', 'banana', 'orange'];

for (const fruit of fruits) {
  console.log(fruit);
}

// 遍历字符串
for (const char of 'hello') {
  console.log(char); // h, e, l, l, o
}

// 获取索引
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
```

## for...in 循环

遍历对象的**可枚举属性名**。

```javascript
const user = { name: 'Alice', age: 25 };

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
// name: Alice
// age: 25
```

### ⚠️ 注意事项

```javascript
// 不推荐用于数组
const arr = ['a', 'b', 'c'];
for (const index in arr) {
  console.log(typeof index); // 'string'，不是数字！
}

// 会遍历原型链上的属性
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    // 只处理自身属性
  }
}
```

## while 循环

```javascript
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
```

## do...while 循环

至少执行一次循环体。

```javascript
let count = 0;

do {
  console.log(count);
  count++;
} while (count < 5);

// 即使条件一开始就是 false，也会执行一次
let x = 10;
do {
  console.log(x); // 输出 10
} while (x < 5);
```

## 循环控制

### break

立即退出循环。

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}
```

### continue

跳过当前迭代，继续下一次。

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}
```

### 标签语句

用于嵌套循环的控制。

```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer; // 跳出外层循环
    }
    console.log(i, j);
  }
}
```

## 数组方法 vs 循环

### forEach

```javascript
const nums = [1, 2, 3];

nums.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// 注意：forEach 不能 break
```

### map

```javascript
const doubled = nums.map(n => n * 2);
// [2, 4, 6]
```

### filter

```javascript
const evens = nums.filter(n => n % 2 === 0);
// [2]
```

### reduce

```javascript
const sum = nums.reduce((acc, n) => acc + n, 0);
// 6
```

## 选择指南

| 场景 | 推荐方式 |
|------|----------|
| 遍历数组 | `for...of` 或 `forEach` |
| 需要索引 | `for` 或 `entries()` |
| 遍历对象属性 | `for...in` 或 `Object.keys()` |
| 需要 break | `for` 或 `for...of` |
| 转换数组 | `map` |
| 过滤数组 | `filter` |
| 累加/聚合 | `reduce` |

## 常见错误

### 1. 无限循环

```javascript
// ❌ 忘记更新条件
let i = 0;
while (i < 5) {
  console.log(i);
  // 忘记 i++
}
```

### 2. 边界错误

```javascript
const arr = [1, 2, 3];

// ❌ 越界
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // 最后一次是 undefined
}

// ✅ 正确
for (let i = 0; i < arr.length; i++) {}
```

### 3. 在 forEach 中使用 break

```javascript
// ❌ 不起作用
[1, 2, 3].forEach(n => {
  if (n === 2) break; // SyntaxError
});

// ✅ 使用 for...of
for (const n of [1, 2, 3]) {
  if (n === 2) break;
}
```

---

## 练习预告

完成阅读后，请前往 `exercises/05-loops.js` 完成练习题。
