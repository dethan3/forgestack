# 高级类特性

## 静态方法和属性

### 静态方法

```javascript
class MathUtils {
  static PI = 3.14159;
  
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static isEven(n) {
    return n % 2 === 0;
  }
}

// 通过类名调用
MathUtils.add(1, 2);     // 3
MathUtils.PI;            // 3.14159
MathUtils.isEven(4);     // true

// 不能通过实例调用
const utils = new MathUtils();
utils.add;  // undefined
```

### 工厂方法

```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  
  // 静态工厂方法
  static createAdmin(name) {
    return new User(name, 'admin');
  }
  
  static createGuest() {
    return new User('Guest', 'guest');
  }
  
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.role);
  }
}

const admin = User.createAdmin('Alice');
const guest = User.createGuest();
const user = User.fromJSON('{"name":"Bob","role":"user"}');
```

## 私有字段和方法

### 私有字段（ES2022）

```javascript
class BankAccount {
  #balance = 0;  // 私有字段
  #pin;
  
  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
  }
  
  // 公有方法访问私有字段
  getBalance(pin) {
    if (pin !== this.#pin) {
      throw new Error('Invalid PIN');
    }
    return this.#balance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  // 私有方法
  #validateAmount(amount) {
    return amount > 0 && amount <= this.#balance;
  }
  
  withdraw(amount, pin) {
    if (pin !== this.#pin) {
      throw new Error('Invalid PIN');
    }
    if (this.#validateAmount(amount)) {
      this.#balance -= amount;
      return amount;
    }
    throw new Error('Invalid amount');
  }
}

const account = new BankAccount(1000, '1234');
account.deposit(500);
account.getBalance('1234');  // 1500
account.#balance;  // SyntaxError: 私有字段
```

### 私有静态字段

```javascript
class Counter {
  static #count = 0;
  
  constructor() {
    Counter.#count++;
    this.id = Counter.#count;
  }
  
  static getCount() {
    return Counter.#count;
  }
}

new Counter();  // id: 1
new Counter();  // id: 2
Counter.getCount();  // 2
Counter.#count;  // SyntaxError
```

## 静态初始化块

```javascript
class Config {
  static settings;
  
  // 静态初始化块（ES2022）
  static {
    console.log('Initializing Config...');
    this.settings = {
      env: process.env.NODE_ENV || 'development',
      debug: true
    };
  }
}

// 类加载时执行静态块
Config.settings;  // { env: 'development', debug: true }
```

## 抽象类模式

```javascript
class AbstractShape {
  constructor() {
    if (new.target === AbstractShape) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
  
  // 抽象方法
  getArea() {
    throw new Error('Must implement getArea()');
  }
  
  getPerimeter() {
    throw new Error('Must implement getPerimeter()');
  }
  
  // 具体方法
  describe() {
    return `Area: ${this.getArea()}, Perimeter: ${this.getPerimeter()}`;
  }
}

class Circle extends AbstractShape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
  
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// new AbstractShape();  // Error
const circle = new Circle(5);
circle.describe();  // 'Area: 78.54..., Perimeter: 31.42...'
```

## 单例模式

```javascript
class Database {
  static #instance = null;
  
  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    Database.#instance = this;
    this.connection = 'Connected';
  }
  
  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
db1 === db2;  // true
```

## 类装饰器模式

```javascript
// 函数式装饰
function logged(Class) {
  return class extends Class {
    constructor(...args) {
      console.log(`Creating ${Class.name} with`, args);
      super(...args);
    }
  };
}

function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

// 使用（需要装饰器提案支持或 TypeScript）
// @logged
class Person {
  constructor(name) {
    this.name = name;
  }
}

// 手动应用
const LoggedPerson = logged(Person);
new LoggedPerson('Alice');  // Creating Person with ['Alice']
```

## Symbol 方法

```javascript
class Collection {
  #items = [];
  
  add(item) {
    this.#items.push(item);
  }
  
  // 使对象可迭代
  [Symbol.iterator]() {
    return this.#items[Symbol.iterator]();
  }
  
  // 自定义类型转换
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this.#items.length;
    }
    if (hint === 'string') {
      return `Collection(${this.#items.length})`;
    }
    return this.#items;
  }
}

const col = new Collection();
col.add(1);
col.add(2);

for (const item of col) {
  console.log(item);  // 1, 2
}

String(col);  // 'Collection(2)'
Number(col);  // 2
```

---

## 练习预告

完成概念学习后，前往 `exercises/` 目录完成练习。
