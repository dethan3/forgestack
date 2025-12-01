# 记忆化

## 核心概念

记忆化（Memoization）是一种优化技术，通过缓存函数的计算结果来避免重复计算。

## 基本实现

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## 使用示例

### 斐波那契数列

```javascript
// 未优化版本 - O(2^n)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

fib(40);  // 非常慢

// 记忆化版本 - O(n)
const memoFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});

memoFib(40);  // 快速返回
```

### 阶乘

```javascript
const factorial = memoize(function(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

factorial(100);  // 快速计算
factorial(50);   // 已缓存，直接返回
```

## 自定义缓存键

```javascript
function memoize(fn, keyResolver) {
  const cache = new Map();
  
  return function(...args) {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用
const getUser = memoize(
  async (id) => fetch(`/api/users/${id}`).then(r => r.json()),
  (id) => `user_${id}`  // 自定义缓存键
);
```

## 带过期时间的缓存

```javascript
function memoizeWithTTL(fn, ttl = 60000) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.time < ttl) {
      return cached.value;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value: result, time: Date.now() });
    return result;
  };
}

// 5秒后过期
const getWeather = memoizeWithTTL(
  async (city) => fetch(`/api/weather/${city}`).then(r => r.json()),
  5000
);
```

## 带最大缓存限制

```javascript
function memoizeWithLimit(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // 移到末尾（最近使用）
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn.apply(this, args);
    
    if (cache.size >= maxSize) {
      // 删除最旧的
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}
```

## 异步记忆化

```javascript
function memoizeAsync(fn) {
  const cache = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = fn.apply(this, args);
    cache.set(key, promise);
    
    try {
      return await promise;
    } catch (error) {
      cache.delete(key);  // 失败时清除缓存
      throw error;
    }
  };
}

const fetchUser = memoizeAsync(async (id) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});

// 并发调用只会发一次请求
await Promise.all([
  fetchUser(1),
  fetchUser(1),
  fetchUser(1)
]);
```

## 选择性缓存

```javascript
function memoizeIf(fn, shouldCache) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    
    if (shouldCache(result, args)) {
      cache.set(key, result);
    }
    
    return result;
  };
}

// 只缓存成功的结果
const fetchData = memoizeIf(
  async (url) => fetch(url).then(r => r.json()),
  (result) => result && !result.error
);
```

## 注意事项

```javascript
// ❌ 不适合记忆化：有副作用的函数
function logAndReturn(x) {
  console.log(x);  // 副作用
  return x;
}

// ❌ 不适合记忆化：依赖外部状态
let count = 0;
function getCount() {
  return ++count;  // 每次调用结果不同
}

// ✅ 适合记忆化：纯函数
function calculate(a, b) {
  return a * b + a / b;  // 相同输入始终相同输出
}
```

---

## 练习预告

继续学习 [05-debounce-throttle.md](./05-debounce-throttle.md) →
