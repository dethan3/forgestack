# 对象基础

## 核心概念

对象是 JavaScript 中最重要的数据结构，用于存储键值对集合。

## 创建对象

### 对象字面量

```javascript
const user = {
  name: 'Alice',
  age: 25,
  isActive: true
};
```

### 属性简写（ES6+）

```javascript
const name = 'Alice';
const age = 25;

// ES5
const user1 = { name: name, age: age };

// ES6+ 简写
const user2 = { name, age };
```

### 计算属性名（ES6+）

```javascript
const key = 'dynamicKey';

const obj = {
  [key]: 'value',
  ['prop_' + 1]: 'one',
  [`item_${2}`]: 'two'
};

// { dynamicKey: 'value', prop_1: 'one', item_2: 'two' }
```

### 方法简写（ES6+）

```javascript
// ES5
const obj1 = {
  greet: function() {
    return 'Hello';
  }
};

// ES6+
const obj2 = {
  greet() {
    return 'Hello';
  }
};
```

## 访问属性

### 点语法

```javascript
const user = { name: 'Alice', age: 25 };

user.name;  // 'Alice'
user.age;   // 25
```

### 方括号语法

```javascript
const user = { name: 'Alice', 'first-name': 'Alice' };

user['name'];       // 'Alice'
user['first-name']; // 'Alice'（特殊字符必须用方括号）

const key = 'name';
user[key];          // 'Alice'（动态访问）
```

### 可选链（ES2020）

```javascript
const user = { 
  profile: { 
    address: { city: 'Beijing' } 
  } 
};

// 传统方式
const city = user.profile && user.profile.address && user.profile.address.city;

// 可选链
const city2 = user.profile?.address?.city;  // 'Beijing'
const zip = user.profile?.address?.zip;     // undefined（不报错）

// 可选方法调用
user.greet?.();  // undefined（如果 greet 不存在）
```

## 修改对象

### 添加/修改属性

```javascript
const user = { name: 'Alice' };

user.age = 25;           // 添加
user.name = 'Bob';       // 修改
user['email'] = 'a@b.c'; // 方括号添加
```

### 删除属性

```javascript
const user = { name: 'Alice', age: 25 };

delete user.age;
console.log(user);  // { name: 'Alice' }
```

## 检查属性

### in 操作符

```javascript
const user = { name: 'Alice' };

'name' in user;    // true
'age' in user;     // false
'toString' in user; // true（继承的属性）
```

### hasOwnProperty

```javascript
const user = { name: 'Alice' };

user.hasOwnProperty('name');     // true
user.hasOwnProperty('toString'); // false（只检查自有属性）

// 更安全的方式
Object.hasOwn(user, 'name');     // true（ES2022）
```

## 遍历对象

### for...in

```javascript
const user = { name: 'Alice', age: 25 };

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
// name: Alice
// age: 25
```

### Object.keys / values / entries

```javascript
const user = { name: 'Alice', age: 25 };

Object.keys(user);    // ['name', 'age']
Object.values(user);  // ['Alice', 25]
Object.entries(user); // [['name', 'Alice'], ['age', 25]]

// 遍历
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## 对象引用

```javascript
// 对象是引用类型
const obj1 = { name: 'Alice' };
const obj2 = obj1;

obj2.name = 'Bob';
console.log(obj1.name);  // 'Bob'（同一个对象）

// 比较引用
const a = { x: 1 };
const b = { x: 1 };
const c = a;

a === b;  // false（不同对象）
a === c;  // true（同一引用）
```

## 浅拷贝

```javascript
const original = { name: 'Alice', nested: { x: 1 } };

// 方法 1：展开运算符
const copy1 = { ...original };

// 方法 2：Object.assign
const copy2 = Object.assign({}, original);

// 浅拷贝的问题
copy1.name = 'Bob';
copy1.nested.x = 99;

console.log(original.name);     // 'Alice'（未影响）
console.log(original.nested.x); // 99（被影响！嵌套对象是共享的）
```

---

## 练习预告

继续学习 [02-object-methods.md](./02-object-methods.md) →
