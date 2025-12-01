# 运算符

## 核心概念

运算符用于执行各种操作：算术、比较、逻辑、赋值等。

## 算术运算符

```javascript
// 基本运算
5 + 3;   // 8  加法
5 - 3;   // 2  减法
5 * 3;   // 15 乘法
5 / 3;   // 1.6666... 除法
5 % 3;   // 2  取余
5 ** 3;  // 125 幂运算（ES2016+）

// 自增自减
let a = 5;
a++;     // 后置：返回 5，然后 a 变成 6
++a;     // 前置：a 先变成 7，然后返回 7
a--;     // 后置
--a;     // 前置
```

## 比较运算符

### 相等性比较

```javascript
// == 宽松相等（会类型转换）
5 == '5';     // true ⚠️
null == undefined; // true

// === 严格相等（推荐）
5 === '5';    // false ✅
null === undefined; // false

// != 和 !==
5 != '5';     // false（宽松）
5 !== '5';    // true（严格）
```

### 关系比较

```javascript
5 > 3;   // true
5 < 3;   // false
5 >= 5;  // true
5 <= 4;  // false

// 字符串比较（按 Unicode 码点）
'a' < 'b';     // true
'10' < '9';    // true ⚠️ 字符串比较
10 < 9;        // false
```

## 逻辑运算符

### 基本用法

```javascript
// && 逻辑与
true && true;   // true
true && false;  // false

// || 逻辑或
true || false;  // true
false || false; // false

// ! 逻辑非
!true;   // false
!false;  // true
!!value; // 转布尔
```

### 短路求值

```javascript
// && 返回第一个假值，或最后一个值
0 && 'hello';      // 0
'hello' && 'world'; // 'world'

// || 返回第一个真值，或最后一个值
'' || 'default';   // 'default'
'hello' || 'world'; // 'hello'
```

### 空值合并运算符（ES2020+）

```javascript
// ?? 只在 null/undefined 时使用默认值
null ?? 'default';     // 'default'
undefined ?? 'default'; // 'default'
0 ?? 'default';        // 0（与 || 不同）
'' ?? 'default';       // ''（与 || 不同）
```

### 可选链运算符（ES2020+）

```javascript
const user = { profile: { name: 'Alice' } };

// 传统方式
const name = user && user.profile && user.profile.name;

// 可选链
const name = user?.profile?.name;

// 方法调用
user.greet?.();

// 数组访问
arr?.[0];
```

## 赋值运算符

```javascript
let x = 10;

x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x %= 4;   // x = x % 4  → 2
x **= 3;  // x = x ** 3 → 8

// 逻辑赋值（ES2021+）
x ||= 5;  // x = x || 5
x &&= 5;  // x = x && 5
x ??= 5;  // x = x ?? 5
```

## 三元运算符

```javascript
const age = 20;
const status = age >= 18 ? '成年' : '未成年';

// 可以嵌套（但不推荐过度嵌套）
const grade = score >= 90 ? 'A'
            : score >= 80 ? 'B'
            : score >= 70 ? 'C'
            : 'D';
```

## 展开运算符（ES6+）

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 函数参数
Math.max(...[1, 2, 3]); // 3
```

## 运算符优先级

```javascript
// 从高到低（部分）
// 1. () 括号
// 2. ++ -- 自增自减
// 3. ! 逻辑非
// 4. ** 幂
// 5. * / % 乘除取余
// 6. + - 加减
// 7. < > <= >= 比较
// 8. == === != !== 相等
// 9. && 逻辑与
// 10. || 逻辑或
// 11. ?? 空值合并
// 12. ?: 三元
// 13. = += -= 赋值

// 建议：不确定时使用括号
const result = (a + b) * c;
```

## 最佳实践

### 1. 始终使用 === 和 !==

```javascript
// ❌ 避免
if (x == null) {}

// ✅ 推荐
if (x === null || x === undefined) {}
// 或
if (x == null) {} // 这是唯一可接受的 == 用法
```

### 2. 使用 ?? 代替 || 处理默认值

```javascript
// ❌ 0 和 '' 会被误判
const count = input || 10;

// ✅ 只有 null/undefined 才用默认值
const count = input ?? 10;
```

### 3. 使用可选链避免冗长的判断

```javascript
// ❌ 冗长
const name = user && user.profile && user.profile.name;

// ✅ 简洁
const name = user?.profile?.name;
```

---

## 练习预告

完成阅读后，请前往 `exercises/03-operators.js` 完成练习题。
