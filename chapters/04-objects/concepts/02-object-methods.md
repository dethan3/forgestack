# 对象方法

## 核心概念

JavaScript 提供了丰富的 Object 静态方法来操作对象。

## 创建与转换

### Object.create

```javascript
// 创建带指定原型的对象
const proto = { greet() { return 'Hello'; } };
const obj = Object.create(proto);

obj.greet();  // 'Hello'

// 创建无原型对象
const pureObj = Object.create(null);
pureObj.toString;  // undefined（无继承方法）
```

### Object.fromEntries（ES2019）

```javascript
// 从键值对数组创建对象
const entries = [['name', 'Alice'], ['age', 25]];
const obj = Object.fromEntries(entries);
// { name: 'Alice', age: 25 }

// 结合 Map
const map = new Map([['a', 1], ['b', 2]]);
const fromMap = Object.fromEntries(map);
// { a: 1, b: 2 }

// 实用：转换对象
const original = { a: 1, b: 2, c: 3 };
const doubled = Object.fromEntries(
  Object.entries(original).map(([k, v]) => [k, v * 2])
);
// { a: 2, b: 4, c: 6 }
```

## 合并与复制

### Object.assign

```javascript
// 合并对象（浅拷贝）
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
// target = { a: 1, b: 2, c: 3 }

// 创建新对象
const merged = Object.assign({}, source1, source2);

// 后者覆盖前者
Object.assign({}, { a: 1 }, { a: 2 });  // { a: 2 }
```

### 展开运算符（推荐）

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// 合并
const merged = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const updated = { ...obj1, b: 99 };
// { a: 1, b: 99 }

// 添加新属性
const extended = { ...obj1, e: 5 };
// { a: 1, b: 2, e: 5 }
```

## 获取信息

### Object.keys / values / entries

```javascript
const user = { name: 'Alice', age: 25 };

Object.keys(user);    // ['name', 'age']
Object.values(user);  // ['Alice', 25]
Object.entries(user); // [['name', 'Alice'], ['age', 25]]
```

### Object.getOwnPropertyNames

```javascript
const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2, enumerable: false });

Object.keys(obj);                  // ['a']（只有可枚举属性）
Object.getOwnPropertyNames(obj);   // ['a', 'b']（所有自有属性）
```

## 冻结与封印

### Object.freeze

```javascript
const frozen = Object.freeze({ name: 'Alice' });

frozen.name = 'Bob';   // 无效（严格模式下报错）
frozen.age = 25;       // 无效
delete frozen.name;    // 无效

Object.isFrozen(frozen);  // true

// 注意：浅冻结
const obj = Object.freeze({ nested: { x: 1 } });
obj.nested.x = 99;  // 仍然可以修改嵌套对象
```

### Object.seal

```javascript
const sealed = Object.seal({ name: 'Alice' });

sealed.name = 'Bob';   // ✅ 可以修改现有属性
sealed.age = 25;       // ❌ 不能添加新属性
delete sealed.name;    // ❌ 不能删除属性

Object.isSealed(sealed);  // true
```

### Object.preventExtensions

```javascript
const obj = Object.preventExtensions({ name: 'Alice' });

obj.name = 'Bob';   // ✅ 可以修改
obj.age = 25;       // ❌ 不能添加
delete obj.name;    // ✅ 可以删除

Object.isExtensible(obj);  // false
```

## 比较

### Object.is（ES6）

```javascript
// 类似 ===，但处理特殊情况更精确

Object.is(NaN, NaN);    // true（=== 返回 false）
Object.is(0, -0);       // false（=== 返回 true）
Object.is(1, 1);        // true
Object.is({}, {});      // false（不同对象）
```

## 实用模式

### 对象转换

```javascript
// 过滤对象属性
const user = { name: 'Alice', age: 25, password: 'secret' };

const publicUser = Object.fromEntries(
  Object.entries(user).filter(([key]) => key !== 'password')
);
// { name: 'Alice', age: 25 }
```

### 对象映射

```javascript
// 转换所有值
const prices = { apple: 1, banana: 2 };

const doubled = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 2])
);
// { apple: 2, banana: 4 }
```

### 默认值合并

```javascript
const defaults = { theme: 'light', lang: 'en', size: 'medium' };
const userPrefs = { theme: 'dark' };

const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', lang: 'en', size: 'medium' }
```

---

## 练习预告

继续学习 [03-destructuring.md](./03-destructuring.md) →
