# async/await

## 核心概念

`async/await` 是 Promise 的语法糖，让异步代码看起来像同步代码。

## 基本语法

```javascript
// async 函数总是返回 Promise
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}

// 等价于
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json());
}
```

## async 函数

```javascript
// 函数声明
async function fn() {}

// 函数表达式
const fn = async function() {};

// 箭头函数
const fn = async () => {};

// 方法
const obj = {
  async method() {}
};

// 类方法
class MyClass {
  async method() {}
}
```

## await 关键字

```javascript
async function example() {
  // await 暂停执行，等待 Promise 完成
  const result = await somePromise;
  
  // await 可以用于任何 thenable
  const value = await Promise.resolve(42);
  
  // await 非 Promise 值直接返回
  const num = await 5;  // 5
}
```

## 错误处理

### try/catch

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;  // 重新抛出或返回默认值
  }
}
```

### 链式 catch

```javascript
async function fetchData() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(error => {
      console.error(error);
      return null;
    });
  
  return data;
}
```

## 并行执行

### 错误示例（串行）

```javascript
// 这是串行执行，效率低！
async function fetchAll() {
  const users = await fetchUsers();     // 等待完成
  const posts = await fetchPosts();     // 再等待完成
  const comments = await fetchComments(); // 再等待完成
  return { users, posts, comments };
}
```

### 正确示例（并行）

```javascript
// 使用 Promise.all 并行执行
async function fetchAll() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  return { users, posts, comments };
}

// 或者先发起请求，再 await
async function fetchAll() {
  const usersPromise = fetchUsers();
  const postsPromise = fetchPosts();
  const commentsPromise = fetchComments();
  
  const users = await usersPromise;
  const posts = await postsPromise;
  const comments = await commentsPromise;
  
  return { users, posts, comments };
}
```

## 循环中的 await

### 串行处理

```javascript
async function processItems(items) {
  const results = [];
  
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}
```

### 并行处理

```javascript
async function processItems(items) {
  const results = await Promise.all(
    items.map(item => processItem(item))
  );
  return results;
}
```

### 控制并发

```javascript
async function processWithLimit(items, limit = 3) {
  const results = [];
  
  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

## 常见模式

### 条件 await

```javascript
async function getData(useCache) {
  if (useCache) {
    return getCachedData();
  }
  return await fetchFreshData();
}
```

### 超时控制

```javascript
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
```

### 重试逻辑

```javascript
async function retryAsync(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}
```

## 顶层 await（ES2022）

```javascript
// 在模块顶层使用 await
const config = await fetch('/config.json').then(r => r.json());

export { config };
```

## 常见错误

### 忘记 await

```javascript
async function example() {
  // 错误：promise 不会被等待
  const data = fetch('/api/data');  // Promise, not data!
  
  // 正确
  const data = await fetch('/api/data');
}
```

### 不必要的 async

```javascript
// 不需要 async
async function example() {
  return Promise.resolve(42);
}

// 简化为
function example() {
  return Promise.resolve(42);
}
```

---

## 练习预告

继续学习 [05-advanced-async.md](./05-advanced-async.md) →
