# 类基础

## 核心概念

ES6 的 `class` 是原型继承的语法糖，提供更清晰的面向对象语法。

## 类声明

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  getAge() {
    return this.age;
  }
}

const alice = new Person('Alice', 25);
alice.greet();  // "Hello, I'm Alice"
```

## 类表达式

```javascript
// 匿名类表达式
const Person = class {
  constructor(name) {
    this.name = name;
  }
};

// 命名类表达式
const Animal = class AnimalClass {
  constructor(name) {
    this.name = name;
  }
};

// AnimalClass 只在类内部可用
```

## 构造函数

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  get area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);
rect.area;  // 50

// 必须使用 new
Rectangle(10, 5);  // TypeError
```

## 实例方法

```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  
  add(n) {
    this.value += n;
    return this;  // 返回 this 支持链式调用
  }
  
  subtract(n) {
    this.value -= n;
    return this;
  }
  
  multiply(n) {
    this.value *= n;
    return this;
  }
  
  getResult() {
    return this.value;
  }
}

const calc = new Calculator(10);
calc.add(5).multiply(2).subtract(3).getResult();  // 27
```

## Getter 和 Setter

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  
  // Getter
  get radius() {
    return this._radius;
  }
  
  // Setter
  set radius(value) {
    if (value < 0) {
      throw new Error('Radius cannot be negative');
    }
    this._radius = value;
  }
  
  // 计算属性
  get diameter() {
    return this._radius * 2;
  }
  
  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
circle.radius;    // 5
circle.diameter;  // 10
circle.area;      // 78.54...

circle.radius = 10;
circle.diameter;  // 20

circle.radius = -1;  // Error: Radius cannot be negative
```

## 类字段（ES2022）

```javascript
class Counter {
  // 公有字段
  count = 0;
  name = 'Counter';
  
  // 私有字段
  #secret = 'hidden';
  
  increment() {
    this.count++;
  }
  
  getSecret() {
    return this.#secret;
  }
}

const counter = new Counter();
counter.count;      // 0
counter.name;       // 'Counter'
counter.#secret;    // SyntaxError（私有字段不可访问）
counter.getSecret(); // 'hidden'
```

## 类 vs 构造函数

```javascript
// ES5 构造函数
function PersonES5(name) {
  this.name = name;
}
PersonES5.prototype.greet = function() {
  return `Hello, ${this.name}`;
};

// ES6 类
class PersonES6 {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}`;
  }
}

// 本质上是一样的
typeof PersonES5;  // 'function'
typeof PersonES6;  // 'function'

// 但类有更严格的行为
PersonES5('Alice');  // 可以不用 new（但会出问题）
PersonES6('Alice');  // TypeError: 必须用 new
```

## 类的特性

```javascript
class Example {
  constructor() {}
  method() {}
}

// 类不会提升（暂时性死区）
// new Foo();  // ReferenceError
// class Foo {}

// 类体内部始终是严格模式
// 类方法不可枚举
Object.keys(Example.prototype);  // []
```

---

## 练习预告

继续学习 [04-inheritance.md](./04-inheritance.md) →
