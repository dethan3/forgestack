# 防抖与节流

## 核心概念

防抖（Debounce）和节流（Throttle）用于控制函数的执行频率，优化性能。

| 技术 | 原理 | 场景 |
|------|------|------|
| 防抖 | 延迟执行，重复触发重置计时 | 搜索输入、窗口调整 |
| 节流 | 固定间隔执行一次 | 滚动、鼠标移动 |

## 防抖 (Debounce)

等待一段时间后执行，如果期间再次触发则重新计时。

### 基本实现

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用
const search = debounce((query) => {
  console.log('搜索:', query);
}, 300);

// 快速输入时只会执行最后一次
search('a');
search('ab');
search('abc');
// 300ms 后输出: '搜索: abc'
```

### 带立即执行选项

```javascript
function debounce(fn, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      fn.apply(this, args);
    }
  };
}

// 立即执行，之后的调用被防抖
const submit = debounce(handleSubmit, 1000, true);
```

### 带取消功能

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  }
  
  debounced.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
  };
  
  return debounced;
}

const search = debounce(doSearch, 300);
search('query');
search.cancel();  // 取消待执行的搜索
```

## 节流 (Throttle)

固定时间间隔内只执行一次。

### 基本实现（时间戳版）

```javascript
function throttle(fn, interval) {
  let lastTime = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);
```

### 定时器版

```javascript
function throttle(fn, interval) {
  let pending = false;
  
  return function(...args) {
    if (pending) return;
    
    pending = true;
    fn.apply(this, args);
    
    setTimeout(() => {
      pending = false;
    }, interval);
  };
}
```

### 完整版（首尾都执行）

```javascript
function throttle(fn, interval, options = {}) {
  const { leading = true, trailing = true } = options;
  let lastTime = 0;
  let timeoutId = null;
  
  return function(...args) {
    const now = Date.now();
    
    if (!lastTime && !leading) {
      lastTime = now;
    }
    
    const remaining = interval - (now - lastTime);
    
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timeoutId = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
```

## 实际应用

### 搜索建议

```javascript
const searchInput = document.getElementById('search');

const fetchSuggestions = debounce(async (query) => {
  if (query.length < 2) return;
  
  const results = await fetch(`/api/search?q=${query}`);
  displayResults(await results.json());
}, 300);

searchInput.addEventListener('input', (e) => {
  fetchSuggestions(e.target.value);
});
```

### 窗口调整

```javascript
const handleResize = debounce(() => {
  console.log('窗口大小:', window.innerWidth, window.innerHeight);
  recalculateLayout();
}, 200);

window.addEventListener('resize', handleResize);
```

### 滚动加载

```javascript
const loadMore = throttle(() => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchNextPage();
  }
}, 200);

window.addEventListener('scroll', loadMore);
```

### 按钮防重复点击

```javascript
const submitButton = document.getElementById('submit');

const handleSubmit = debounce(async () => {
  submitButton.disabled = true;
  try {
    await submitForm();
  } finally {
    submitButton.disabled = false;
  }
}, 1000, true);  // 立即执行

submitButton.addEventListener('click', handleSubmit);
```

## 对比总结

```javascript
// 防抖：等待停止触发后执行
// 适用：搜索输入、表单验证、窗口调整
const debounced = debounce(fn, 300);

// 节流：固定间隔执行
// 适用：滚动监听、鼠标移动、游戏循环
const throttled = throttle(fn, 100);
```

---

## 练习预告

完成概念学习后，前往 `exercises/` 目录完成练习。
