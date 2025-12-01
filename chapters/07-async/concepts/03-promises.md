# Promise

## 核心概念

Promise 是表示异步操作最终完成或失败的对象。

## Promise 状态

- **pending**: 初始状态，既不是成功也不是失败
- **fulfilled**: 操作成功完成
- **rejected**: 操作失败

```javascript
// 状态转换是单向的，不可逆
pending → fulfilled
pending → rejected
```

## 创建 Promise

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve('Success!');  // fulfilled
    } else {
      reject(new Error('Failed!'));  // rejected
    }
  }, 1000);
});
```

## 使用 Promise

### then / catch / finally

```javascript
promise
  .then((result) => {
    console.log(result);  // 成功时执行
    return result.toUpperCase();
  })
  .then((upperResult) => {
    console.log(upperResult);  // 链式调用
  })
  .catch((error) => {
    console.error(error);  // 任何错误都会被捕获
  })
  .finally(() => {
    console.log('Done');  // 无论成功失败都执行
  });
```

### 链式调用

```javascript
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## 静态方法

### Promise.resolve / reject

```javascript
// 创建已完成的 Promise
Promise.resolve('value');
Promise.resolve({ data: 123 });

// 创建已拒绝的 Promise
Promise.reject(new Error('error'));
```

### Promise.all

并行执行，全部成功才成功：

```javascript
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(([users, posts, comments]) => {
    // 所有请求都完成
  })
  .catch((error) => {
    // 任一请求失败
  });
```

### Promise.allSettled

等待所有完成，无论成功失败：

```javascript
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]).then((results) => {
  // results:
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 3 }
  // ]
});
```

### Promise.race

返回最先完成的：

```javascript
Promise.race([
  fetchWithTimeout('/api/data', 5000),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
]);
```

### Promise.any

返回第一个成功的：

```javascript
Promise.any([
  fetch('/api/mirror1'),
  fetch('/api/mirror2'),
  fetch('/api/mirror3')
]).then((fastestResult) => {
  console.log('First success:', fastestResult);
});
```

## 错误处理

### 捕获链中的错误

```javascript
doStep1()
  .then(doStep2)
  .then(doStep3)
  .catch((error) => {
    // 捕获上述任何步骤的错误
    console.error('Error:', error);
  });
```

### 错误恢复

```javascript
fetchData()
  .catch((error) => {
    console.warn('Using default value');
    return defaultValue;  // 返回默认值继续链
  })
  .then((data) => {
    console.log(data);
  });
```

### 重新抛出

```javascript
fetchData()
  .catch((error) => {
    if (error.code === 'NETWORK') {
      return retryFetch();  // 重试
    }
    throw error;  // 其他错误继续传播
  });
```

## 常见模式

### 延迟

```javascript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

delay(1000).then(() => console.log('1 second later'));
```

### 超时

```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

timeout(fetch('/api/data'), 5000);
```

### 重试

```javascript
async function retry(fn, times = 3, delay = 1000) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === times - 1) throw error;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

### 并发限制

```javascript
async function limitConcurrency(tasks, limit) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const p = Promise.resolve().then(task);
    results.push(p);
    
    if (tasks.length >= limit) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}
```

---

## 练习预告

继续学习 [04-async-await.md](./04-async-await.md) →
