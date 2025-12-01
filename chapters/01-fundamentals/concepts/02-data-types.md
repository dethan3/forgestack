# 数据类型

## 核心概念

JavaScript 有 8 种数据类型，分为**原始类型**和**引用类型**。

## 原始类型（Primitive Types）

### 1. Number（数字）

```javascript
const integer = 42;
const float = 3.14;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;

// 特殊值检测
Number.isNaN(NaN);        // true
Number.isFinite(100);     // true
Number.isInteger(42);     // true
```

### 2. String（字符串）

```javascript
const single = 'Hello';
const double = "World";
const template = `Hello, ${name}!`;

// 常用方法
'hello'.length;           // 5
'hello'.toUpperCase();    // 'HELLO'
'hello'.includes('ell');  // true
```

### 3. Boolean（布尔值）

```javascript
const isTrue = true;
const isFalse = false;

// 假值（Falsy）
false, 0, '', null, undefined, NaN

// 真值（Truthy）
true, 1, 'hello', [], {}, function() {}
```

### 4. undefined

```javascript
let x;
console.log(x); // undefined

function noReturn() {}
console.log(noReturn()); // undefined
```

### 5. null

```javascript
const empty = null;

// 注意：typeof null 是 'object'（历史遗留 bug）
typeof null; // 'object'
```

### 6. Symbol（ES6+）

```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');
sym1 === sym2; // false（每个 Symbol 都是唯一的）
```

### 7. BigInt（ES2020+）

```javascript
const big = 9007199254740991n;
const alsoBig = BigInt('9007199254740991');
```

## 引用类型（Reference Types）

### Object（对象）

```javascript
const user = {
  name: 'Alice',
  age: 25
};

// 数组也是对象
const arr = [1, 2, 3];
typeof arr; // 'object'

// 函数也是对象
const fn = function() {};
typeof fn; // 'function'
```

## 类型检测

### typeof 操作符

```javascript
typeof 42;          // 'number'
typeof 'hello';     // 'string'
typeof true;        // 'boolean'
typeof undefined;   // 'undefined'
typeof null;        // 'object' ⚠️ 历史 bug
typeof Symbol();    // 'symbol'
typeof 42n;         // 'bigint'
typeof {};          // 'object'
typeof [];          // 'object'
typeof function(){}; // 'function'
```

### 更精确的类型检测

```javascript
// 检测数组
Array.isArray([1, 2, 3]); // true
Array.isArray('hello');   // false

// 检测 null
value === null;

// 检测 NaN
Number.isNaN(NaN); // true

// Object.prototype.toString（最精确）
Object.prototype.toString.call([]);     // '[object Array]'
Object.prototype.toString.call(null);   // '[object Null]'
Object.prototype.toString.call(/regex/); // '[object RegExp]'
```

## 类型转换

### 显式转换

```javascript
// 转数字
Number('42');     // 42
Number('hello');  // NaN
parseInt('42px'); // 42
parseFloat('3.14'); // 3.14

// 转字符串
String(42);       // '42'
(42).toString();  // '42'

// 转布尔
Boolean(1);       // true
Boolean(0);       // false
Boolean('');      // false
Boolean('hello'); // true
```

### 隐式转换

```javascript
// 字符串拼接
'3' + 2;          // '32'
3 + '2';          // '32'

// 数学运算
'3' - 2;          // 1
'3' * 2;          // 6

// 布尔上下文
if ('hello') {}   // 'hello' 转为 true
!!'hello';        // true（双重否定转布尔）
```

## 值类型 vs 引用类型

### 值类型（原始类型）

```javascript
let a = 1;
let b = a;
b = 2;
console.log(a); // 1（a 不受影响）
```

### 引用类型

```javascript
let obj1 = { name: 'Alice' };
let obj2 = obj1;
obj2.name = 'Bob';
console.log(obj1.name); // 'Bob'（obj1 也被修改了）
```

## 常见陷阱

### 1. 浮点数精度

```javascript
0.1 + 0.2 === 0.3; // false
0.1 + 0.2;         // 0.30000000000000004

// 解决方案
Math.abs(0.1 + 0.2 - 0.3) < 0.0001; // true
```

### 2. NaN 的特殊性

```javascript
NaN === NaN; // false
Number.isNaN(NaN); // true（推荐使用）
```

### 3. typeof null

```javascript
typeof null === 'object'; // true（历史 bug）
// 正确检测 null
value === null;
```

---

## 练习预告

完成阅读后，请前往 `exercises/02-data-types.js` 完成练习题。
