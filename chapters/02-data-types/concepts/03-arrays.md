# 数组方法

## 核心概念

数组是有序的数据集合，JavaScript 提供了丰富的内置方法。

## 创建数组

```javascript
const arr1 = [1, 2, 3];
const arr2 = new Array(3);        // [empty × 3]
const arr3 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arr4 = Array.of(1, 2, 3);   // [1, 2, 3]
```

## 访问元素

```javascript
const arr = ['a', 'b', 'c', 'd'];

arr[0];           // 'a'
arr[arr.length - 1]; // 'd'
arr.at(-1);       // 'd'（ES2022）
arr.at(-2);       // 'c'
```

## 添加和删除

### push() / pop()（尾部操作）

```javascript
const arr = [1, 2];
arr.push(3);      // 返回 3（新长度），arr = [1, 2, 3]
arr.pop();        // 返回 3，arr = [1, 2]
```

### unshift() / shift()（头部操作）

```javascript
const arr = [1, 2];
arr.unshift(0);   // 返回 3（新长度），arr = [0, 1, 2]
arr.shift();      // 返回 0，arr = [1, 2]
```

### splice()（任意位置）

```javascript
const arr = [1, 2, 3, 4, 5];

// splice(起始索引, 删除数量, ...插入元素)
arr.splice(2, 1);         // 删除 arr[2]，返回 [3]
arr.splice(2, 0, 'a');    // 在索引2处插入 'a'
arr.splice(1, 2, 'x', 'y'); // 替换
```

## 查找方法

### indexOf() / lastIndexOf() / includes()

```javascript
const arr = [1, 2, 3, 2, 1];

arr.indexOf(2);       // 1
arr.lastIndexOf(2);   // 3
arr.includes(2);      // true
arr.indexOf(99);      // -1
```

### find() / findIndex()

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

users.find(u => u.id === 2);       // { id: 2, name: 'Bob' }
users.findIndex(u => u.id === 2);  // 1
users.find(u => u.id === 99);      // undefined
```

## 遍历方法

### forEach()

```javascript
[1, 2, 3].forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
// 注意：forEach 不能 break，不返回值
```

### map()

```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
// doubled = [2, 4, 6]
// nums 不变
```

### filter()

```javascript
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);
// evens = [2, 4]
```

### reduce()

```javascript
const nums = [1, 2, 3, 4, 5];

// 求和
const sum = nums.reduce((acc, n) => acc + n, 0);
// sum = 15

// 求最大值
const max = nums.reduce((a, b) => a > b ? a : b);
// max = 5
```

## 判断方法

### every() / some()

```javascript
const nums = [2, 4, 6];

nums.every(n => n % 2 === 0);  // true（全部满足）
nums.some(n => n > 5);         // true（至少一个满足）
```

## 排序方法

### sort()

```javascript
// 字符串排序
['c', 'a', 'b'].sort();  // ['a', 'b', 'c']

// 数字排序（需要比较函数）
[10, 2, 5].sort();              // [10, 2, 5] ❌ 按字符串排序
[10, 2, 5].sort((a, b) => a - b); // [2, 5, 10] ✅
[10, 2, 5].sort((a, b) => b - a); // [10, 5, 2] 降序
```

### reverse()

```javascript
[1, 2, 3].reverse();  // [3, 2, 1]（修改原数组）
```

## 合并和展平

### concat()

```javascript
[1, 2].concat([3, 4]);     // [1, 2, 3, 4]
[1, 2].concat(3, 4);       // [1, 2, 3, 4]
```

### flat() / flatMap()

```javascript
[1, [2, [3]]].flat();      // [1, 2, [3]]
[1, [2, [3]]].flat(2);     // [1, 2, 3]
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]

[1, 2].flatMap(x => [x, x * 2]); // [1, 2, 2, 4]
```

## 展开运算符

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];  // [1, 2, 3, 4]
const copy = [...arr1];             // 浅拷贝
```

## 方法分类

| 修改原数组 | 返回新数组 |
|-----------|-----------|
| push, pop, shift, unshift | map, filter, concat |
| splice, sort, reverse | slice, flat, flatMap |
| fill | |

---

## 练习预告

继续学习 [04-type-coercion.md](./04-type-coercion.md) →
