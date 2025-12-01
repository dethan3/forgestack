# 原型基础

## 核心概念

JavaScript 是基于原型的语言，每个对象都有一个内部链接指向另一个对象（原型）。

## 理解原型

### `__proto__` 和 `prototype`

```javascript
// 构造函数
function Person(name) {
  this.name = name;
}

// prototype 是函数的属性
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const alice = new Person('Alice');

// __proto__ 是实例的属性，指向构造函数的 prototype
alice.__proto__ === Person.prototype;  // true

// 推荐使用 Object.getPrototypeOf
Object.getPrototypeOf(alice) === Person.prototype;  // true
```

### 原型关系图

```
alice                    Person.prototype          Object.prototype
┌──────────────┐         ┌──────────────┐          ┌──────────────┐
│ name: 'Alice'│  ──→    │ greet()      │   ──→    │ toString()   │  ──→ null
│ __proto__    │         │ __proto__    │          │ __proto__    │
└──────────────┘         └──────────────┘          └──────────────┘
```

## 添加原型方法

```javascript
function Animal(name) {
  this.name = name;
}

// 在原型上添加方法（所有实例共享）
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

Animal.prototype.sleep = function() {
  return `${this.name} is sleeping`;
};

const dog = new Animal('Dog');
const cat = new Animal('Cat');

dog.speak();  // 'Dog makes a sound'
cat.speak();  // 'Cat makes a sound'

// 方法是共享的
dog.speak === cat.speak;  // true
```

## 检查原型

### instanceof

```javascript
function Dog() {}

const buddy = new Dog();

buddy instanceof Dog;     // true
buddy instanceof Object;  // true
```

### isPrototypeOf

```javascript
Dog.prototype.isPrototypeOf(buddy);     // true
Object.prototype.isPrototypeOf(buddy);  // true
```

### hasOwnProperty

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {};

const alice = new Person('Alice');

alice.hasOwnProperty('name');   // true（自有属性）
alice.hasOwnProperty('greet');  // false（原型上的）
```

## 属性查找

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.type = 'human';

const alice = new Person('Alice');

// 查找顺序：实例 → 原型 → 原型的原型 → ... → null

alice.name;        // 'Alice'（实例属性）
alice.type;        // 'human'（原型属性）
alice.toString();  // '[object Object]'（Object.prototype）
alice.unknown;     // undefined（未找到）
```

## 属性遮蔽

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.role = 'guest';

const alice = new Person('Alice');

alice.role;  // 'guest'（从原型获取）

alice.role = 'admin';  // 在实例上创建属性

alice.role;  // 'admin'（实例属性遮蔽原型属性）

delete alice.role;

alice.role;  // 'guest'（又从原型获取）
```

## Object.create

```javascript
// 创建带指定原型的对象
const personProto = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const alice = Object.create(personProto);
alice.name = 'Alice';
alice.greet();  // "Hello, I'm Alice"

// 创建无原型对象
const pureObject = Object.create(null);
pureObject.toString;  // undefined（无继承方法）
```

## 设置原型

```javascript
const proto = { greet() { return 'Hello'; } };
const obj = { name: 'Alice' };

// 设置原型（不推荐，性能差）
Object.setPrototypeOf(obj, proto);

obj.greet();  // 'Hello'

// 推荐：创建时指定
const obj2 = Object.create(proto);
obj2.name = 'Bob';
```

---

## 练习预告

继续学习 [02-prototype-chain.md](./02-prototype-chain.md) →
