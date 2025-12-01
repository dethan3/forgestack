# 异步错误处理

## 回调中的错误

### 错误优先回调

```javascript
function readFile(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}

// 使用
readFile('file.txt', (err, data) => {
  if (err) {
    console.error('Failed to read file:', err);
    return;
  }
  console.log(data);
});
```

### 回调中 try/catch 的局限

```javascript
// 这不会捕获异步错误！
try {
  setTimeout(() => {
    throw new Error('Async error');
  }, 100);
} catch (error) {
  // 永远不会执行
  console.log('Caught:', error);
}
```

## Promise 错误处理

### .catch() 方法

```javascript
fetchData()
  .then(processData)
  .then(saveData)
  .catch(error => {
    console.error('Error:', error);
  });
```

### 链中的错误捕获

```javascript
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => processData(data))
  .catch(error => {
    // 捕获上述任何步骤的错误
    handleError(error);
  });
```

### 错误恢复

```javascript
fetchFromPrimary()
  .catch(error => {
    console.warn('Primary failed, trying backup');
    return fetchFromBackup();
  })
  .then(data => {
    // 无论从哪里获取的数据
    processData(data);
  });
```

### 分段错误处理

```javascript
fetchData()
  .then(data => {
    return processData(data);
  })
  .catch(error => {
    // 只处理 fetchData 和 processData 的错误
    console.log('Data error:', error);
    return defaultData;
  })
  .then(data => {
    return saveData(data);
  })
  .catch(error => {
    // 只处理 saveData 的错误
    console.log('Save error:', error);
  });
```

## async/await 错误处理

### try/catch 包装

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### 统一错误处理

```javascript
async function handleRequest() {
  try {
    const user = await getUser();
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    if (error instanceof NetworkError) {
      return { error: 'Network unavailable' };
    }
    if (error instanceof NotFoundError) {
      return { error: 'Resource not found' };
    }
    throw error;
  }
}
```

### 并行请求的错误处理

```javascript
async function fetchAll() {
  try {
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts()
    ]);
    return { users, posts };
  } catch (error) {
    // 任一请求失败都会进入这里
    console.error('Fetch failed:', error);
    throw error;
  }
}
```

### 独立错误处理

```javascript
async function fetchAllSafe() {
  const results = await Promise.allSettled([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);

  const data = {};
  const errors = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      data[['users', 'posts', 'comments'][index]] = result.value;
    } else {
      errors.push(result.reason);
    }
  });

  return { data, errors };
}
```

## 未处理的 Promise 拒绝

### 全局处理（浏览器）

```javascript
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled rejection:', event.reason);
  event.preventDefault();  // 阻止默认行为
});
```

### 全局处理（Node.js）

```javascript
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
```

## 错误包装器

```javascript
// 通用异步错误包装器
async function tryCatch(asyncFn) {
  try {
    const result = await asyncFn();
    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

// 使用
const [user, error] = await tryCatch(() => fetchUser(id));
if (error) {
  console.error('Failed:', error);
  return;
}
console.log('User:', user);
```

## 带重试的错误处理

```javascript
async function withRetry(asyncFn, options = {}) {
  const { retries = 3, delay = 1000, onRetry } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      onRetry?.(error, attempt);
      await new Promise(r => setTimeout(r, delay * attempt));
    }
  }
}

// 使用
const data = await withRetry(
  () => fetchData(),
  {
    retries: 3,
    delay: 1000,
    onRetry: (error, attempt) => {
      console.log(`Attempt ${attempt} failed:`, error.message);
    }
  }
);
```

---

继续学习 [05-best-practices.md](./05-best-practices.md) →
