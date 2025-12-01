# 展开与剩余运算符

## 核心概念

展开运算符（Spread）和剩余运算符（Rest）都使用 `...` 语法，但用途相反：
- **展开**：将数组/对象"展开"为独立元素
- **剩余**：将多个元素"收集"为数组/对象

## 数组展开

### 复制数组

```javascript
const original = [1, 2, 3];

// 浅拷贝
const copy = [...original];

copy.push(4);
console.log(original);  // [1, 2, 3]（未被修改）
```

### 合并数组

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const merged = [...arr1, ...arr2, ...arr3];
// [1, 2, 3, 4, 5, 6]

// 在中间插入
const inserted = [...arr1, 99, ...arr2];
// [1, 2, 99, 3, 4]
```

### 函数调用

```javascript
const numbers = [1, 5, 3, 9, 2];

// 展开为参数
Math.max(...numbers);  // 9
Math.min(...numbers);  // 1

// 等价于
Math.max(1, 5, 3, 9, 2);
```

### 字符串转数组

```javascript
const str = 'hello';
const chars = [...str];
// ['h', 'e', 'l', 'l', 'o']
```

## 对象展开

### 复制对象

```javascript
const original = { a: 1, b: 2 };

const copy = { ...original };

copy.c = 3;
console.log(original);  // { a: 1, b: 2 }
```

### 合并对象

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const merged = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3, d: 4 }
```

### 覆盖属性

```javascript
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };

// 后面的覆盖前面的
const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', lang: 'en' }

// 添加/覆盖特定属性
const updated = { ...defaults, theme: 'dark', size: 'large' };
// { theme: 'dark', lang: 'en', size: 'large' }
```

### 条件属性

```javascript
const includeAge = true;

const user = {
  name: 'Alice',
  ...(includeAge && { age: 25 })
};
// { name: 'Alice', age: 25 }

const user2 = {
  name: 'Bob',
  ...(false && { age: 30 })
};
// { name: 'Bob' }
```

## 剩余参数

### 函数参数

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5);  // 15
```

### 与普通参数结合

```javascript
function log(level, ...messages) {
  console.log(`[${level}]`, ...messages);
}

log('INFO', 'User', 'logged in', 'successfully');
// [INFO] User logged in successfully
```

### 解构中的剩余

```javascript
// 数组
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]

// 对象
const { a, ...others } = { a: 1, b: 2, c: 3 };
// a = 1, others = { b: 2, c: 3 }
```

## 浅拷贝注意事项

```javascript
const original = {
  name: 'Alice',
  address: { city: 'Beijing' }
};

const copy = { ...original };

// 修改顶层属性
copy.name = 'Bob';
console.log(original.name);  // 'Alice' ✅

// 修改嵌套对象
copy.address.city = 'Shanghai';
console.log(original.address.city);  // 'Shanghai' ❌（被影响）
```

### 深拷贝方案

```javascript
// 方法 1：JSON（有限制）
const deepCopy1 = JSON.parse(JSON.stringify(original));

// 方法 2：structuredClone（现代浏览器）
const deepCopy2 = structuredClone(original);

// 方法 3：递归实现
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}
```

## 实用模式

### 不可变更新

```javascript
const state = { count: 0, name: 'Alice' };

// 创建新状态（不修改原状态）
const newState = { ...state, count: state.count + 1 };
// { count: 1, name: 'Alice' }
```

### 移除对象属性

```javascript
const user = { id: 1, name: 'Alice', password: 'secret' };

// 解构 + 剩余 = 移除属性
const { password, ...safeUser } = user;
// safeUser = { id: 1, name: 'Alice' }
```

### 数组去重

```javascript
const arr = [1, 2, 2, 3, 3, 3];

const unique = [...new Set(arr)];
// [1, 2, 3]
```

---

## 练习预告

继续学习 [05-property-descriptors.md](./05-property-descriptors.md) →
