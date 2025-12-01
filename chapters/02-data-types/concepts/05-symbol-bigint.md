# Symbol 和 BigInt

## Symbol（ES6+）

### 核心概念

Symbol 是一种**唯一**且**不可变**的原始类型，主要用于创建对象的唯一属性键。

### 创建 Symbol

```javascript
const sym1 = Symbol();
const sym2 = Symbol();
sym1 === sym2;  // false（每个 Symbol 都是唯一的）

// 带描述的 Symbol
const sym3 = Symbol('description');
sym3.description;  // 'description'
```

### 作为对象属性

```javascript
const ID = Symbol('id');

const user = {
  name: 'Alice',
  [ID]: 12345
};

user[ID];           // 12345
user.ID;            // undefined（不能用点语法）

// Symbol 属性不会出现在常规遍历中
Object.keys(user);  // ['name']
for (const key in user) {}  // 只遍历 'name'

// 获取 Symbol 属性
Object.getOwnPropertySymbols(user);  // [Symbol(id)]
```

### 全局 Symbol 注册表

```javascript
// 创建/获取全局 Symbol
const sym1 = Symbol.for('app.id');
const sym2 = Symbol.for('app.id');
sym1 === sym2;  // true（同一个 Symbol）

// 获取 Symbol 的键
Symbol.keyFor(sym1);  // 'app.id'

// 普通 Symbol 没有键
const local = Symbol('local');
Symbol.keyFor(local);  // undefined
```

### 内置 Symbol

```javascript
// Symbol.iterator - 定义迭代行为
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 
          ? { value: i++, done: false }
          : { done: true };
      }
    };
  }
};
[...iterable];  // [0, 1, 2]

// Symbol.toStringTag - 自定义类型标签
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}
Object.prototype.toString.call(new MyClass());
// '[object MyClass]'
```

### 使用场景

1. **避免属性名冲突**

```javascript
// 第三方库扩展对象时
const myLib = Symbol('myLib');
element[myLib] = { /* 私有数据 */ };
```

2. **定义"私有"属性**

```javascript
const _private = Symbol('private');

class Counter {
  constructor() {
    this[_private] = 0;
  }
  increment() {
    this[_private]++;
  }
}
```

3. **常量枚举**

```javascript
const Color = {
  RED: Symbol('red'),
  GREEN: Symbol('green'),
  BLUE: Symbol('blue')
};
// 不会与字符串/数字冲突
```

## BigInt（ES2020+）

### 核心概念

BigInt 用于表示**任意精度的整数**，解决 Number 的整数精度限制。

### 创建 BigInt

```javascript
const big1 = 123456789012345678901234567890n;  // n 后缀
const big2 = BigInt('123456789012345678901234567890');
const big3 = BigInt(123);  // 从数字创建
```

### 运算

```javascript
const a = 10n;
const b = 3n;

a + b;   // 13n
a - b;   // 7n
a * b;   // 30n
a / b;   // 3n（整数除法，向零取整）
a % b;   // 1n
a ** b;  // 1000n
```

### 限制

```javascript
// 不能与 Number 混合运算
10n + 5;   // TypeError!
10n + 5n;  // 15n ✅

// 需要显式转换
10n + BigInt(5);  // 15n
Number(10n) + 5;  // 15

// 不能使用 Math 方法
Math.sqrt(16n);  // TypeError!
```

### 比较

```javascript
10n == 10;   // true（宽松相等）
10n === 10;  // false（严格相等）

10n < 11;    // true（可以与 Number 比较）
10n > 9n;    // true
```

### 使用场景

1. **大整数计算**

```javascript
// Number 精度丢失
9007199254740992 === 9007199254740993;  // true ❌

// BigInt 精确计算
9007199254740992n === 9007199254740993n;  // false ✅
```

2. **时间戳（微秒/纳秒）**

```javascript
const timestamp = 1637836800000000000n;  // 纳秒级时间戳
```

3. **加密/哈希计算**

```javascript
const hash = 0x7f4ca2e8d1a3b5c9n;
```

### 类型检测

```javascript
typeof 123n;          // 'bigint'
typeof BigInt(123);   // 'bigint'

// 检测方法
function isBigInt(value) {
  return typeof value === 'bigint';
}
```

## 总结

| 特性 | Symbol | BigInt |
|------|--------|--------|
| 引入版本 | ES6 | ES2020 |
| 创建方式 | `Symbol()` | `123n` 或 `BigInt()` |
| 主要用途 | 唯一属性键 | 大整数运算 |
| typeof | `'symbol'` | `'bigint'` |

---

## 练习预告

完成概念学习后，前往 `exercises/` 目录完成练习。
