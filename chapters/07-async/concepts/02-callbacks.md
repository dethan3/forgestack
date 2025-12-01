# 回调函数

## 核心概念

回调函数是传递给另一个函数的函数，在异步操作完成后被调用。

## 基本回调

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: 'Alice', age: 25 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data);  // { name: 'Alice', age: 25 }
});
```

## 错误优先回调

Node.js 风格的错误处理约定：

```javascript
function readFile(path, callback) {
  setTimeout(() => {
    if (path === 'invalid') {
      callback(new Error('File not found'), null);
    } else {
      callback(null, 'File content');
    }
  }, 100);
}

readFile('data.txt', (err, data) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log('Data:', data);
});
```

## 回调地狱

嵌套回调导致代码难以维护：

```javascript
// 回调地狱示例
getUser(userId, (err, user) => {
  if (err) {
    handleError(err);
    return;
  }
  
  getPosts(user.id, (err, posts) => {
    if (err) {
      handleError(err);
      return;
    }
    
    getComments(posts[0].id, (err, comments) => {
      if (err) {
        handleError(err);
        return;
      }
      
      // 更多嵌套...
      console.log(comments);
    });
  });
});
```

## 改善回调地狱

### 命名函数

```javascript
function handleUser(err, user) {
  if (err) return handleError(err);
  getPosts(user.id, handlePosts);
}

function handlePosts(err, posts) {
  if (err) return handleError(err);
  getComments(posts[0].id, handleComments);
}

function handleComments(err, comments) {
  if (err) return handleError(err);
  console.log(comments);
}

getUser(userId, handleUser);
```

### 模块化

```javascript
// 将每个步骤拆分为独立函数
const steps = {
  getUser: (userId) => new Promise((resolve, reject) => {
    // ...
  }),
  getPosts: (user) => new Promise((resolve, reject) => {
    // ...
  }),
  getComments: (posts) => new Promise((resolve, reject) => {
    // ...
  })
};
```

## 常见回调模式

### 事件监听器

```javascript
button.addEventListener('click', (event) => {
  console.log('Clicked!', event);
});
```

### 数组方法

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => console.log(num));
numbers.map((num) => num * 2);
numbers.filter((num) => num > 2);
```

### 定时器

```javascript
// 一次性
setTimeout(() => {
  console.log('Delayed');
}, 1000);

// 重复
const intervalId = setInterval(() => {
  console.log('Repeated');
}, 1000);

// 清除
clearInterval(intervalId);
```

## 回调的问题

### 1. 控制反转

```javascript
// 你无法控制回调何时、如何被调用
thirdPartyLib.doSomething((result) => {
  // 这个回调可能被调用多次？
  // 可能永远不被调用？
  // 可能同步调用？
});
```

### 2. 错误处理困难

```javascript
try {
  fetchData((data) => {
    // 这里的错误不会被外层 catch 捕获
    throw new Error('Inner error');
  });
} catch (e) {
  // 捕获不到异步错误
}
```

### 3. 组合困难

```javascript
// 并行执行多个异步操作很复杂
let completed = 0;
const results = [];

function checkDone() {
  if (completed === 3) {
    console.log(results);
  }
}

fetchA((a) => { results[0] = a; completed++; checkDone(); });
fetchB((b) => { results[1] = b; completed++; checkDone(); });
fetchC((c) => { results[2] = c; completed++; checkDone(); });
```

## 将回调转为 Promise

```javascript
// 原始回调函数
function callbackFn(arg, callback) {
  setTimeout(() => {
    callback(null, arg * 2);
  }, 100);
}

// 手动包装
function promiseFn(arg) {
  return new Promise((resolve, reject) => {
    callbackFn(arg, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// 使用 util.promisify（Node.js）
const util = require('util');
const promiseFn = util.promisify(callbackFn);
```

---

## 练习预告

继续学习 [03-promises.md](./03-promises.md) →
