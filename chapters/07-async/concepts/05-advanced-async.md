# 高级异步模式

## 生成器（Generator）

### 基本语法

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next();  // { value: 1, done: false }
gen.next();  // { value: 2, done: false }
gen.next();  // { value: 3, done: false }
gen.next();  // { value: undefined, done: true }
```

### 可迭代

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num);  // 1, 2, 3, 4, 5
}

[...range(1, 5)];  // [1, 2, 3, 4, 5]
```

### 双向通信

```javascript
function* conversation() {
  const name = yield 'What is your name?';
  const hobby = yield `Hello ${name}! What is your hobby?`;
  return `${name} likes ${hobby}`;
}

const conv = conversation();
conv.next();        // { value: 'What is your name?', done: false }
conv.next('Alice'); // { value: 'Hello Alice! What is your hobby?', done: false }
conv.next('coding'); // { value: 'Alice likes coding', done: true }
```

## 异步迭代器

### for await...of

```javascript
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await delay(100);
    yield i;
  }
}

async function main() {
  for await (const num of asyncRange(1, 5)) {
    console.log(num);
  }
}
```

### 处理流数据

```javascript
async function* readLines(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        if (buffer) yield buffer;
        return;
      }
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      
      for (const line of lines) {
        yield line;
      }
    }
  } finally {
    reader.releaseLock();
  }
}
```

## 并发控制

### 信号量

```javascript
class Semaphore {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }
  
  async acquire() {
    if (this.count < this.max) {
      this.count++;
      return;
    }
    
    await new Promise(resolve => this.queue.push(resolve));
    this.count++;
  }
  
  release() {
    this.count--;
    if (this.queue.length > 0) {
      this.queue.shift()();
    }
  }
  
  async use(fn) {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

// 使用
const semaphore = new Semaphore(3);

async function limitedFetch(url) {
  return semaphore.use(() => fetch(url));
}
```

### 任务队列

```javascript
class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  push(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
    
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}
```

## 取消机制

### AbortController

```javascript
async function fetchWithCancel(url) {
  const controller = new AbortController();
  
  const fetchPromise = fetch(url, {
    signal: controller.signal
  });
  
  return {
    promise: fetchPromise,
    cancel: () => controller.abort()
  };
}

// 使用
const { promise, cancel } = fetchWithCancel('/api/data');

// 5秒后取消
setTimeout(cancel, 5000);

try {
  const response = await promise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}
```

### 可取消的 Promise

```javascript
function cancellable(promise) {
  let isCancelled = false;
  
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => isCancelled ? reject({ cancelled: true }) : resolve(value),
      error => isCancelled ? reject({ cancelled: true }) : reject(error)
    );
  });
  
  return {
    promise: wrappedPromise,
    cancel() { isCancelled = true; }
  };
}
```

## 异步状态管理

### 加载状态

```javascript
function useAsync(asyncFn) {
  let state = {
    loading: false,
    error: null,
    data: null
  };
  
  async function execute(...args) {
    state = { loading: true, error: null, data: null };
    
    try {
      const data = await asyncFn(...args);
      state = { loading: false, error: null, data };
      return data;
    } catch (error) {
      state = { loading: false, error, data: null };
      throw error;
    }
  }
  
  return { state, execute };
}
```

### 防抖异步

```javascript
function debounceAsync(fn, delay) {
  let timeoutId = null;
  let pendingPromise = null;
  
  return function(...args) {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
```

## 错误边界

```javascript
async function withErrorBoundary(fn, fallback) {
  try {
    return await fn();
  } catch (error) {
    console.error('Error caught:', error);
    return typeof fallback === 'function' ? fallback(error) : fallback;
  }
}

// 使用
const data = await withErrorBoundary(
  () => fetchData(),
  { default: 'value' }
);
```

---

## 练习预告

完成概念学习后，前往 `exercises/` 目录完成练习。
