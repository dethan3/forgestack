# 原始类型深入

## 核心概念

JavaScript 有 7 种原始类型（Primitive Types），它们是**不可变**的值。

## 原始类型列表

| 类型 | 示例 | typeof 结果 |
|------|------|-------------|
| Number | `42`, `3.14`, `NaN` | `'number'` |
| String | `'hello'`, `"world"` | `'string'` |
| Boolean | `true`, `false` | `'boolean'` |
| undefined | `undefined` | `'undefined'` |
| null | `null` | `'object'` ⚠️ |
| Symbol | `Symbol('id')` | `'symbol'` |
| BigInt | `123n` | `'bigint'` |

## 原始类型 vs 引用类型

### 原始类型：按值传递

```javascript
let a = 10;
let b = a;    // 复制值
b = 20;
console.log(a); // 10（a 不受影响）
```

### 引用类型：按引用传递

```javascript
let obj1 = { value: 10 };
let obj2 = obj1;  // 复制引用
obj2.value = 20;
console.log(obj1.value); // 20（obj1 也被修改）
```

## 不可变性（Immutability）

原始类型的值不可修改，只能替换：

```javascript
let str = 'hello';
str[0] = 'H';       // 无效！
console.log(str);   // 'hello'

str = 'Hello';      // 这是替换，不是修改
console.log(str);   // 'Hello'
```

## Number 类型详解

### 特殊值

```javascript
Infinity          // 正无穷
-Infinity         // 负无穷
NaN               // Not a Number

// 检测方法
Number.isFinite(100);     // true
Number.isNaN(NaN);        // true
Number.isInteger(42);     // true
```

### 精度问题

```javascript
0.1 + 0.2 === 0.3;  // false！
0.1 + 0.2;          // 0.30000000000000004

// 解决方案
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
```

### 安全整数范围

```javascript
Number.MAX_SAFE_INTEGER;  // 9007199254740991
Number.MIN_SAFE_INTEGER;  // -9007199254740991

Number.isSafeInteger(9007199254740991);  // true
Number.isSafeInteger(9007199254740992);  // false
```

## null vs undefined

### undefined

```javascript
// 变量声明但未赋值
let x;
console.log(x); // undefined

// 函数没有返回值
function noReturn() {}
console.log(noReturn()); // undefined

// 对象属性不存在
const obj = {};
console.log(obj.name); // undefined
```

### null

```javascript
// 显式表示"空值"
let user = null;

// 清空引用
let data = { value: 1 };
data = null; // 释放对象引用
```

### 比较

```javascript
null == undefined;   // true（宽松相等）
null === undefined;  // false（严格相等）

typeof null;         // 'object' ⚠️ 历史 bug
typeof undefined;    // 'undefined'
```

## 包装对象

原始类型可以临时"包装"为对象来调用方法：

```javascript
const str = 'hello';
str.toUpperCase();  // 'HELLO'

// 背后发生了什么：
// 1. 创建临时 String 对象
// 2. 调用方法
// 3. 销毁临时对象

// 注意：不要使用 new 创建包装对象
const bad = new String('hello');  // ❌ 不推荐
const good = 'hello';             // ✅ 推荐
```

## 类型检测最佳实践

```javascript
// 检测原始类型
typeof value === 'number'
typeof value === 'string'
typeof value === 'boolean'
typeof value === 'undefined'
typeof value === 'symbol'
typeof value === 'bigint'

// 检测 null（特殊处理）
value === null

// 检测 NaN
Number.isNaN(value)

// 检测数组（引用类型）
Array.isArray(value)
```

---

## 练习预告

理解原始类型后，继续学习 [02-strings.md](./02-strings.md) →
