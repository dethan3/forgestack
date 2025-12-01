# this 绑定

## 核心概念

JavaScript 中的 `this` 是动态绑定的，取决于函数的调用方式，而非定义位置。

## 四种绑定规则

### 1. 默认绑定

独立函数调用时，`this` 指向全局对象（严格模式下为 `undefined`）。

```javascript
function showThis() {
  console.log(this);
}

showThis();  // window（浏览器）或 global（Node.js）

// 严格模式
'use strict';
function strictThis() {
  console.log(this);
}
strictThis();  // undefined
```

### 2. 隐式绑定

作为对象方法调用时，`this` 指向该对象。

```javascript
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};

user.greet();  // 'Hello, Alice'

// 注意：方法被提取后会丢失绑定
const greet = user.greet;
greet();  // 'Hello, undefined'
```

### 3. 显式绑定

使用 `call`、`apply`、`bind` 明确指定 `this`。

```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const user = { name: 'Alice' };

// call：逐个传参
greet.call(user, 'Hello');  // 'Hello, Alice'

// apply：数组传参
greet.apply(user, ['Hi']);  // 'Hi, Alice'

// bind：返回新函数
const boundGreet = greet.bind(user);
boundGreet('Hey');  // 'Hey, Alice'
```

### 4. new 绑定

使用 `new` 调用构造函数时，`this` 指向新创建的对象。

```javascript
function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');
console.log(alice.name);  // 'Alice'
```

## 绑定优先级

**new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定**

```javascript
function foo() {
  console.log(this.a);
}

const obj1 = { a: 1, foo };
const obj2 = { a: 2 };

// 隐式绑定
obj1.foo();  // 1

// 显式绑定优先于隐式
obj1.foo.call(obj2);  // 2

// new 绑定优先于显式
const boundFoo = foo.bind(obj1);
const instance = new boundFoo();
console.log(instance.a);  // undefined（新对象没有 a）
```

## 箭头函数的 this

箭头函数没有自己的 `this`，继承自定义时的外层作用域。

```javascript
const obj = {
  name: 'Alice',
  
  // 普通方法
  regularMethod() {
    console.log(this.name);  // 'Alice'
    
    // 内部普通函数
    const inner = function() {
      console.log(this.name);  // undefined
    };
    inner();
    
    // 内部箭头函数
    const innerArrow = () => {
      console.log(this.name);  // 'Alice'（继承外层）
    };
    innerArrow();
  },
  
  // 箭头函数方法
  arrowMethod: () => {
    console.log(this.name);  // undefined（继承全局）
  }
};
```

## 常见场景

### 事件处理器

```javascript
class Button {
  constructor(label) {
    this.label = label;
  }
  
  // ❌ 普通方法：this 丢失
  handleClick() {
    console.log(this.label);  // undefined
  }
  
  // ✅ 解决方案 1：bind
  bindClick = this.handleClick.bind(this);
  
  // ✅ 解决方案 2：箭头函数属性
  arrowClick = () => {
    console.log(this.label);  // 正确
  };
}

const btn = new Button('Submit');
document.querySelector('button')
  .addEventListener('click', btn.arrowClick);
```

### 回调函数

```javascript
const user = {
  name: 'Alice',
  friends: ['Bob', 'Charlie'],
  
  // ❌ 普通函数回调
  showFriends1() {
    this.friends.forEach(function(friend) {
      console.log(`${this.name} knows ${friend}`);  // this.name 是 undefined
    });
  },
  
  // ✅ 箭头函数回调
  showFriends2() {
    this.friends.forEach((friend) => {
      console.log(`${this.name} knows ${friend}`);  // 正确
    });
  }
};
```

### 类方法

```javascript
class Counter {
  count = 0;
  
  // 普通方法（需要绑定）
  increment() {
    this.count++;
  }
  
  // 箭头函数方法（自动绑定）
  decrement = () => {
    this.count--;
  };
}

const counter = new Counter();
const inc = counter.increment;
const dec = counter.decrement;

dec();  // ✅ 正常工作
inc();  // ❌ TypeError: Cannot read property 'count' of undefined
```

## 快速判断 this

1. 箭头函数？→ 继承外层 this
2. `new` 调用？→ 新创建的对象
3. `call/apply/bind`？→ 指定的对象
4. 对象方法调用？→ 该对象
5. 其他 → 全局对象（严格模式下 undefined）

---

## 练习预告

完成概念学习后，前往 `exercises/` 目录完成练习。
