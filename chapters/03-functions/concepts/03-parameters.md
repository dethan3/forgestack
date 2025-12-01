# 参数处理

## 核心概念

ES6+ 提供了强大的参数处理特性：默认参数、剩余参数、解构参数。

## 默认参数（Default Parameters）

### 基本用法

```javascript
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

greet('Alice');  // 'Hello, Alice!'
greet();         // 'Hello, Guest!'
greet(undefined); // 'Hello, Guest!'（undefined 触发默认值）
greet(null);     // 'Hello, null!'（null 不触发）
```

### 表达式作为默认值

```javascript
function createId(prefix = 'id', timestamp = Date.now()) {
  return `${prefix}_${timestamp}`;
}

// 每次调用时计算默认值
createId();  // 'id_1637836800000'
```

### 前面参数作为后面参数的默认值

```javascript
function createRange(start, end = start + 10) {
  return { start, end };
}

createRange(5);    // { start: 5, end: 15 }
createRange(5, 20); // { start: 5, end: 20 }
```

### 与解构结合

```javascript
function drawCircle({ x = 0, y = 0, radius = 10 } = {}) {
  console.log(`Circle at (${x}, ${y}) with radius ${radius}`);
}

drawCircle({ x: 5 });  // Circle at (5, 0) with radius 10
drawCircle();          // Circle at (0, 0) with radius 10
```

## 剩余参数（Rest Parameters）

### 基本用法

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);     // 6
sum(1, 2, 3, 4, 5); // 15
```

### 与其他参数结合

```javascript
function log(level, ...messages) {
  console.log(`[${level}]`, ...messages);
}

log('INFO', 'User', 'logged in');
// [INFO] User logged in
```

### 剩余参数必须是最后一个

```javascript
// ❌ 错误
function bad(...rest, last) {}  // SyntaxError

// ✅ 正确
function good(first, ...rest) {}
```

### 替代 arguments

```javascript
// 旧方式
function oldSum() {
  return Array.prototype.slice.call(arguments)
    .reduce((a, b) => a + b, 0);
}

// 新方式
function newSum(...args) {
  return args.reduce((a, b) => a + b, 0);
}
```

## 解构参数（Destructuring Parameters）

### 对象解构

```javascript
function createUser({ name, age, email = '' }) {
  return { name, age, email, createdAt: Date.now() };
}

createUser({ name: 'Alice', age: 25 });
```

### 数组解构

```javascript
function getFirstAndRest([first, ...rest]) {
  return { first, rest };
}

getFirstAndRest([1, 2, 3, 4]);
// { first: 1, rest: [2, 3, 4] }
```

### 嵌套解构

```javascript
function processUser({ 
  name, 
  address: { city, country = 'Unknown' } 
}) {
  return `${name} from ${city}, ${country}`;
}

processUser({
  name: 'Alice',
  address: { city: 'Beijing' }
});
// 'Alice from Beijing, Unknown'
```

### 重命名

```javascript
function process({ name: userName, id: oderId }) {
  console.log(userName, oderId);
}

process({ name: 'Alice', id: 123 });
```

## 展开运算符传参

```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
add(...numbers);  // 6

// 与其他参数结合
add(0, ...numbers.slice(0, 2));  // 3
```

## 参数验证

### 必需参数检查

```javascript
function required(name) {
  throw new Error(`Missing parameter: ${name}`);
}

function greet(name = required('name')) {
  return `Hello, ${name}!`;
}

greet();  // Error: Missing parameter: name
```

### 类型检查

```javascript
function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  return a * b;
}
```

## 实用模式

### 配置对象模式

```javascript
function createServer(options = {}) {
  const {
    port = 3000,
    host = 'localhost',
    timeout = 5000,
    ...rest
  } = options;

  return { port, host, timeout, ...rest };
}

createServer({ port: 8080, ssl: true });
// { port: 8080, host: 'localhost', timeout: 5000, ssl: true }
```

### 可选回调模式

```javascript
function fetchData(url, callback = () => {}) {
  // ... fetch logic
  callback(data);
}

fetchData('/api/users');  // 不传回调也不会报错
```

---

## 练习预告

继续学习 [04-scope-closure.md](./04-scope-closure.md) →
