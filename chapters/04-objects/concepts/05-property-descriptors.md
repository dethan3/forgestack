# 属性描述符

## 核心概念

每个对象属性都有一个属性描述符，控制属性的行为特征。

## 描述符类型

### 数据描述符

```javascript
{
  value: any,        // 属性值
  writable: boolean, // 是否可修改
  enumerable: boolean, // 是否可枚举
  configurable: boolean // 是否可配置/删除
}
```

### 访问器描述符

```javascript
{
  get: function,      // getter
  set: function,      // setter
  enumerable: boolean,
  configurable: boolean
}
```

## 获取描述符

### Object.getOwnPropertyDescriptor

```javascript
const user = { name: 'Alice' };

Object.getOwnPropertyDescriptor(user, 'name');
// {
//   value: 'Alice',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

### Object.getOwnPropertyDescriptors

```javascript
const user = { name: 'Alice', age: 25 };

Object.getOwnPropertyDescriptors(user);
// {
//   name: { value: 'Alice', writable: true, ... },
//   age: { value: 25, writable: true, ... }
// }
```

## 定义属性

### Object.defineProperty

```javascript
const user = {};

Object.defineProperty(user, 'name', {
  value: 'Alice',
  writable: false,     // 不可修改
  enumerable: true,    // 可枚举
  configurable: false  // 不可配置
});

user.name = 'Bob';     // 无效（严格模式下报错）
console.log(user.name); // 'Alice'
```

### Object.defineProperties

```javascript
const user = {};

Object.defineProperties(user, {
  name: {
    value: 'Alice',
    writable: true
  },
  age: {
    value: 25,
    writable: false
  }
});
```

## Getter 和 Setter

### 对象字面量语法

```javascript
const user = {
  firstName: 'Alice',
  lastName: 'Smith',
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(value) {
    const [first, last] = value.split(' ');
    this.firstName = first;
    this.lastName = last;
  }
};

console.log(user.fullName);  // 'Alice Smith'

user.fullName = 'Bob Johnson';
console.log(user.firstName);  // 'Bob'
```

### defineProperty 语法

```javascript
const user = { firstName: 'Alice', lastName: 'Smith' };

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  },
  enumerable: true
});
```

## 属性特性

### writable

```javascript
const obj = {};

Object.defineProperty(obj, 'constant', {
  value: 42,
  writable: false
});

obj.constant = 100;  // 无效
console.log(obj.constant);  // 42
```

### enumerable

```javascript
const obj = { a: 1 };

Object.defineProperty(obj, 'hidden', {
  value: 2,
  enumerable: false
});

Object.keys(obj);     // ['a']（hidden 不出现）
JSON.stringify(obj);  // '{"a":1}'

// 但仍可直接访问
obj.hidden;  // 2
```

### configurable

```javascript
const obj = {};

Object.defineProperty(obj, 'fixed', {
  value: 1,
  configurable: false
});

// 无法重新定义
Object.defineProperty(obj, 'fixed', { value: 2 });  // TypeError

// 无法删除
delete obj.fixed;  // 无效
```

## 实用模式

### 只读属性

```javascript
function createReadOnly(obj) {
  const descriptors = {};
  
  for (const key of Object.keys(obj)) {
    descriptors[key] = {
      value: obj[key],
      writable: false,
      enumerable: true,
      configurable: false
    };
  }
  
  return Object.defineProperties({}, descriptors);
}

const config = createReadOnly({ apiUrl: 'https://api.example.com' });
config.apiUrl = 'hacked';  // 无效
```

### 计算属性

```javascript
const circle = {
  radius: 5,
  
  get diameter() {
    return this.radius * 2;
  },
  
  get area() {
    return Math.PI * this.radius ** 2;
  }
};

circle.diameter;  // 10
circle.area;      // 78.54...
```

### 数据验证

```javascript
const user = {
  _age: 0,
  
  get age() {
    return this._age;
  },
  
  set age(value) {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    this._age = value;
  }
};

user.age = 25;   // ✅
user.age = -5;   // ❌ Error: Invalid age
```

---

## 练习预告

完成概念学习后，前往 `exercises/` 目录完成练习。
