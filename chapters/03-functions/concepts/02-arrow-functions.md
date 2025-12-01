# 箭头函数

## 核心概念

箭头函数（Arrow Function）是 ES6 引入的简洁函数语法，具有特殊的 `this` 绑定行为。

## 基本语法

### 完整形式

```javascript
const add = (a, b) => {
  return a + b;
};
```

### 简写形式

```javascript
// 单个参数可省略括号
const double = n => n * 2;

// 单个表达式可省略 return 和大括号
const add = (a, b) => a + b;

// 无参数需要空括号
const greet = () => 'Hello!';
```

### 返回对象字面量

```javascript
// 需要用括号包裹
const createUser = (name) => ({ name, createdAt: Date.now() });

// 否则大括号会被解析为函数体
const wrong = (name) => { name };  // 返回 undefined
```

## 箭头函数 vs 普通函数

### 1. this 绑定

```javascript
// 普通函数：this 由调用方式决定
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(this.name);  // 'Alice'
  }
};

// 箭头函数：this 继承自外层作用域
const obj2 = {
  name: 'Bob',
  greet: () => {
    console.log(this.name);  // undefined（this 指向外层）
  }
};
```

### 2. 没有 arguments 对象

```javascript
// 普通函数有 arguments
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

// 箭头函数没有 arguments
const sum2 = () => {
  console.log(arguments);  // ReferenceError
};

// 使用剩余参数代替
const sum3 = (...args) => args.reduce((a, b) => a + b, 0);
```

### 3. 不能作为构造函数

```javascript
const Person = (name) => {
  this.name = name;
};

new Person('Alice');  // TypeError: Person is not a constructor
```

### 4. 没有 prototype 属性

```javascript
const fn = () => {};
console.log(fn.prototype);  // undefined
```

## 箭头函数的 this

### 词法作用域的 this

```javascript
const timer = {
  seconds: 0,
  start() {
    // 箭头函数继承 start 方法的 this
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
};

timer.start();  // 正常工作
```

### 对比普通函数

```javascript
const timer2 = {
  seconds: 0,
  start() {
    // 普通函数的 this 指向全局对象
    setInterval(function() {
      this.seconds++;  // ❌ this 不是 timer2
      console.log(this.seconds);
    }, 1000);
  }
};

// 传统解决方案
const timer3 = {
  seconds: 0,
  start() {
    const self = this;  // 保存 this
    setInterval(function() {
      self.seconds++;
      console.log(self.seconds);
    }, 1000);
  }
};
```

## 适用场景

### ✅ 适合使用箭头函数

```javascript
// 数组方法回调
const doubled = [1, 2, 3].map(n => n * 2);

// Promise 链
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));

// 需要保持外层 this 的回调
class Counter {
  count = 0;
  increment() {
    setTimeout(() => {
      this.count++;  // 正确指向实例
    }, 100);
  }
}
```

### ❌ 不适合使用箭头函数

```javascript
// 对象方法
const obj = {
  name: 'Alice',
  greet: () => {
    console.log(this.name);  // ❌ undefined
  }
};

// 原型方法
function Person(name) {
  this.name = name;
}
Person.prototype.greet = () => {
  console.log(this.name);  // ❌ undefined
};

// 事件处理器需要 this 指向元素时
button.addEventListener('click', () => {
  console.log(this);  // ❌ 不是 button 元素
});

// 需要 arguments 时
const fn = () => {
  console.log(arguments);  // ❌ ReferenceError
};
```

## 简洁语法的选择

```javascript
// 一行表达式
const square = x => x * x;

// 多行逻辑
const process = (data) => {
  const validated = validate(data);
  const transformed = transform(validated);
  return transformed;
};

// 立即返回对象
const createPoint = (x, y) => ({ x, y });

// 条件表达式
const abs = n => n >= 0 ? n : -n;
```

---

## 练习预告

继续学习 [03-parameters.md](./03-parameters.md) →
