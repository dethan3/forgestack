# 柯里化

## 核心概念

柯里化（Currying）是将接受多个参数的函数转换为一系列接受单个参数的函数的技术。

```javascript
// 普通函数
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3);  // 6

// 柯里化版本
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3);  // 6
```

## 箭头函数简化

```javascript
const add = a => b => c => a + b + c;

add(1)(2)(3);  // 6

// 部分应用
const add1 = add(1);
const add1and2 = add1(2);
add1and2(3);  // 6
```

## 通用柯里化函数

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// 使用
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

curriedSum(1, 2, 3);   // 6
curriedSum(1)(2)(3);   // 6
curriedSum(1, 2)(3);   // 6
curriedSum(1)(2, 3);   // 6
```

## 部分应用

部分应用（Partial Application）是固定函数的部分参数，返回接受剩余参数的新函数。

```javascript
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, 'Hello');
sayHello('Alice', '!');  // 'Hello, Alice!'

const sayHelloToAlice = partial(greet, 'Hello', 'Alice');
sayHelloToAlice('?');    // 'Hello, Alice?'
```

## 实用示例

### 配置化函数

```javascript
const fetchData = curry((baseUrl, endpoint, id) => {
  return fetch(`${baseUrl}${endpoint}/${id}`);
});

// 创建专用的 API 函数
const api = fetchData('https://api.example.com');
const getUser = api('/users');
const getPost = api('/posts');

getUser(1);  // fetch https://api.example.com/users/1
getPost(42); // fetch https://api.example.com/posts/42
```

### 事件处理

```javascript
const handleEvent = curry((handler, eventType, element) => {
  element.addEventListener(eventType, handler);
});

const logClick = handleEvent(e => console.log('Clicked!'), 'click');

// 批量绑定
document.querySelectorAll('button').forEach(logClick);
```

### 格式化

```javascript
const formatCurrency = curry((symbol, decimals, amount) => {
  return `${symbol}${amount.toFixed(decimals)}`;
});

const formatUSD = formatCurrency('$', 2);
const formatJPY = formatCurrency('¥', 0);

formatUSD(99.99);   // '$99.99'
formatJPY(1000);    // '¥1000'
```

## 柯里化 vs 部分应用

```javascript
// 柯里化：每次只传一个参数
const curriedAdd = a => b => c => a + b + c;
curriedAdd(1)(2)(3);

// 部分应用：可以一次传多个参数
const add = (a, b, c) => a + b + c;
const add1 = partial(add, 1);
add1(2, 3);  // 6
```

## 带占位符的部分应用

```javascript
const _ = Symbol('placeholder');

function partialWithPlaceholder(fn, ...presetArgs) {
  return function(...laterArgs) {
    let laterIndex = 0;
    const args = presetArgs.map(arg => 
      arg === _ ? laterArgs[laterIndex++] : arg
    );
    return fn(...args, ...laterArgs.slice(laterIndex));
  };
}

const div = (a, b) => a / b;
const divBy = partialWithPlaceholder(div, _, 2);
divBy(10);  // 5
```

---

## 练习预告

继续学习 [03-composition.md](./03-composition.md) →
