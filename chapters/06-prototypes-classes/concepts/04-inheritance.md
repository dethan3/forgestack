# 继承

## 核心概念

ES6 使用 `extends` 关键字实现类继承，使用 `super` 调用父类。

## 基本继承

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // 必须先调用 super
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog('Buddy', 'Labrador');
dog.speak();  // 'Buddy barks'
dog.name;     // 'Buddy'
dog.breed;    // 'Labrador'
```

## super 关键字

### 在构造函数中

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    // 必须在使用 this 之前调用 super
    super(name);
    this.age = age;
  }
}
```

### 在方法中

```javascript
class Animal {
  speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  speak() {
    // 调用父类方法
    const parentSound = super.speak();
    return `${parentSound}... Woof!`;
  }
}

const dog = new Dog();
dog.speak();  // 'Some sound... Woof!'
```

## 方法重写

```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }
  
  draw() {
    return `Drawing a ${this.color} shape`;
  }
  
  getArea() {
    throw new Error('Must implement getArea()');
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }
  
  // 重写 draw
  draw() {
    return `Drawing a ${this.color} circle`;
  }
  
  // 实现抽象方法
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }
  
  draw() {
    return `Drawing a ${this.color} rectangle`;
  }
  
  getArea() {
    return this.width * this.height;
  }
}
```

## 继承内置类

```javascript
class MyArray extends Array {
  // 添加自定义方法
  first() {
    return this[0];
  }
  
  last() {
    return this[this.length - 1];
  }
  
  sum() {
    return this.reduce((a, b) => a + b, 0);
  }
}

const arr = new MyArray(1, 2, 3, 4, 5);
arr.first();  // 1
arr.last();   // 5
arr.sum();    // 15

// 继承的方法返回正确的类型
arr.map(x => x * 2);  // MyArray [2, 4, 6, 8, 10]
```

## 继承链

```javascript
class Animal {
  eat() { return 'eating'; }
}

class Mammal extends Animal {
  breathe() { return 'breathing'; }
}

class Dog extends Mammal {
  bark() { return 'barking'; }
}

const dog = new Dog();
dog.bark();     // 'barking'（Dog）
dog.breathe();  // 'breathing'（Mammal）
dog.eat();      // 'eating'（Animal）

dog instanceof Dog;     // true
dog instanceof Mammal;  // true
dog instanceof Animal;  // true
```

## 组合优于继承

```javascript
// 使用组合而不是深层继承
const canEat = {
  eat() { return `${this.name} is eating`; }
};

const canWalk = {
  walk() { return `${this.name} is walking`; }
};

const canSwim = {
  swim() { return `${this.name} is swimming`; }
};

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Duck extends Animal {
  constructor(name) {
    super(name);
    Object.assign(this, canEat, canWalk, canSwim);
  }
}

const duck = new Duck('Donald');
duck.eat();   // 'Donald is eating'
duck.walk();  // 'Donald is walking'
duck.swim();  // 'Donald is swimming'
```

## instanceof 和继承

```javascript
class A {}
class B extends A {}
class C extends B {}

const c = new C();

c instanceof C;  // true
c instanceof B;  // true
c instanceof A;  // true
c instanceof Object;  // true

// 检查直接构造函数
c.constructor === C;  // true
c.constructor === B;  // false
```

---

## 练习预告

继续学习 [05-advanced-class.md](./05-advanced-class.md) →
