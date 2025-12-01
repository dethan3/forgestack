# 原型链

## 核心概念

原型链是 JavaScript 实现继承的机制，通过对象的原型链接形成链式结构。

## 原型链结构

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 建立原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const buddy = new Dog('Buddy', 'Labrador');

buddy.bark();  // 'Buddy barks!'（Dog.prototype）
buddy.eat();   // 'Buddy is eating'（Animal.prototype）
buddy.toString(); // '[object Object]'（Object.prototype）
```

## 原型链图示

```
buddy
  │
  └──→ Dog.prototype        { bark(), constructor: Dog }
          │
          └──→ Animal.prototype   { eat(), constructor: Animal }
                  │
                  └──→ Object.prototype  { toString(), hasOwnProperty(), ... }
                          │
                          └──→ null
```

## 内置对象的原型链

```javascript
// 数组
const arr = [1, 2, 3];
arr.__proto__ === Array.prototype;           // true
Array.prototype.__proto__ === Object.prototype; // true

// 函数
function fn() {}
fn.__proto__ === Function.prototype;          // true
Function.prototype.__proto__ === Object.prototype; // true

// 字符串
const str = 'hello';
str.__proto__ === String.prototype;           // true（自动装箱）
```

## 原型继承实现

### 经典方式

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);  // 调用父构造函数
}

// 继承原型
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 重写方法
Dog.prototype.speak = function() {
  return `${this.name} barks`;
};

const dog = new Dog('Buddy');
dog.speak();  // 'Buddy barks'
```

### 检查继承关系

```javascript
dog instanceof Dog;     // true
dog instanceof Animal;  // true
dog instanceof Object;  // true

Dog.prototype.isPrototypeOf(dog);    // true
Animal.prototype.isPrototypeOf(dog); // true
```

## 混入（Mixin）

```javascript
// 定义混入对象
const canSwim = {
  swim() {
    return `${this.name} is swimming`;
  }
};

const canFly = {
  fly() {
    return `${this.name} is flying`;
  }
};

function Duck(name) {
  this.name = name;
}

// 混入多个能力
Object.assign(Duck.prototype, canSwim, canFly);

const duck = new Duck('Donald');
duck.swim();  // 'Donald is swimming'
duck.fly();   // 'Donald is flying'
```

## 原型链的问题

### 共享引用类型

```javascript
function Parent() {
  this.colors = ['red', 'blue'];
}

function Child() {}
Child.prototype = new Parent();

const c1 = new Child();
const c2 = new Child();

c1.colors.push('green');

console.log(c2.colors);  // ['red', 'blue', 'green']（被影响！）
```

### 解决方案

```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

function Child(name) {
  Parent.call(this, name);  // 每个实例都有自己的 colors
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const c1 = new Child('Alice');
const c2 = new Child('Bob');

c1.colors.push('green');

console.log(c1.colors);  // ['red', 'blue', 'green']
console.log(c2.colors);  // ['red', 'blue']（不受影响）
```

## 获取原型链

```javascript
function getPrototypeChain(obj) {
  const chain = [];
  let current = obj;
  
  while (current) {
    chain.push(current);
    current = Object.getPrototypeOf(current);
  }
  
  return chain;
}

const arr = [1, 2, 3];
getPrototypeChain(arr);
// [Array(3), Array.prototype, Object.prototype, null]
```

---

## 练习预告

继续学习 [03-class-basics.md](./03-class-basics.md) →
