# 类型转换

## 核心概念

JavaScript 会在需要时自动转换类型（隐式转换），也可以手动转换（显式转换）。

## 显式转换

### 转数字

```javascript
Number('42');        // 42
Number('3.14');      // 3.14
Number('');          // 0
Number('hello');     // NaN
Number(true);        // 1
Number(false);       // 0
Number(null);        // 0
Number(undefined);   // NaN

// parseInt / parseFloat
parseInt('42px');    // 42
parseInt('3.14');    // 3
parseFloat('3.14');  // 3.14
parseInt('abc');     // NaN
```

### 转字符串

```javascript
String(42);          // '42'
String(true);        // 'true'
String(null);        // 'null'
String(undefined);   // 'undefined'
String([1, 2, 3]);   // '1,2,3'
String({});          // '[object Object]'

// toString()
(42).toString();     // '42'
(255).toString(16);  // 'ff'（十六进制）
```

### 转布尔

```javascript
Boolean(1);          // true
Boolean(0);          // false
Boolean('hello');    // true
Boolean('');         // false
Boolean([]);         // true  ⚠️ 空数组是真值
Boolean({});         // true  ⚠️ 空对象是真值
Boolean(null);       // false
Boolean(undefined);  // false

// 双重否定（简写）
!!'hello';           // true
!!0;                 // false
```

## 假值列表

只有这 6 个值是假值：

```javascript
false
0 (以及 -0, 0n)
'' (空字符串)
null
undefined
NaN
```

其他所有值都是真值，包括：
- `[]` 空数组
- `{}` 空对象
- `'0'` 字符串零
- `'false'` 字符串 false

## 隐式转换

### 字符串拼接

```javascript
'3' + 2;             // '32'（数字转字符串）
2 + '3';             // '23'
'1' + '2';           // '12'

// 对象转字符串
'Value: ' + {};      // 'Value: [object Object]'
'Items: ' + [1,2];   // 'Items: 1,2'
```

### 数学运算

```javascript
'6' - 2;             // 4（字符串转数字）
'6' * 2;             // 12
'6' / 2;             // 3
'6' - 'a';           // NaN

// 一元加号转数字
+'42';               // 42
+true;               // 1
+null;               // 0
```

### 比较运算

```javascript
// == 宽松相等（会类型转换）
5 == '5';            // true
0 == false;          // true
null == undefined;   // true
'' == 0;             // true

// === 严格相等（推荐）
5 === '5';           // false
0 === false;         // false
```

## 对象转原始值

### valueOf() 和 toString()

```javascript
const obj = {
  valueOf() { return 42; },
  toString() { return 'hello'; }
};

+obj;                // 42（数字运算优先 valueOf）
`${obj}`;            // 'hello'（字符串运算优先 toString）
```

### Symbol.toPrimitive

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42;
    if (hint === 'string') return 'hello';
    return true;  // default
  }
};

+obj;      // 42
`${obj}`;  // 'hello'
obj + '';  // 'true'
```

## 常见陷阱

### + 运算符的歧义

```javascript
1 + 2 + '3';         // '33'（先算 1+2=3，再拼接）
'1' + 2 + 3;         // '123'（从左到右都拼接）
```

### 数组的隐式转换

```javascript
[1] + [2];           // '12'（都转字符串再拼接）
[1] - [2];           // -1（都转数字再运算）
[] + {};             // '[object Object]'
{} + [];             // 0（{} 被解析为空代码块）
```

### null 和 undefined

```javascript
null + 1;            // 1（null → 0）
undefined + 1;       // NaN（undefined → NaN）
null == 0;           // false ⚠️
null >= 0;           // true ⚠️
```

## 最佳实践

### 1. 始终使用 === 和 !==

```javascript
// ❌ 避免
if (x == null) {}

// ✅ 推荐（除非你明确需要同时检查 null 和 undefined）
if (x === null || x === undefined) {}
```

### 2. 显式转换优于隐式

```javascript
// ❌ 隐式转换
const num = +inputValue;
const str = '' + value;

// ✅ 显式转换（更清晰）
const num = Number(inputValue);
const str = String(value);
```

### 3. 使用 Number.isNaN()

```javascript
// ❌ 全局 isNaN 会先转换
isNaN('hello');      // true（'hello' → NaN → true）

// ✅ Number.isNaN 更精确
Number.isNaN('hello'); // false
Number.isNaN(NaN);     // true
```

---

## 练习预告

继续学习 [05-symbol-bigint.md](./05-symbol-bigint.md) →
