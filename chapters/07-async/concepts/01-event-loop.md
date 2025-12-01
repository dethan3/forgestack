# 事件循环

## 核心概念

JavaScript 是单线程语言，通过事件循环（Event Loop）实现非阻塞异步操作。

## 执行模型

```
┌───────────────────────────────┐
│         Call Stack            │  ← 执行同步代码
└───────────────────────────────┘
              ↓
┌───────────────────────────────┐
│         Web APIs              │  ← 处理异步操作
│  (setTimeout, fetch, etc.)    │
└───────────────────────────────┘
              ↓
┌───────────────────────────────┐
│      Callback Queue           │  ← 宏任务队列
│   (Macro Task Queue)          │
└───────────────────────────────┘
              ↓
┌───────────────────────────────┐
│     Microtask Queue           │  ← 微任务队列
│  (Promise, queueMicrotask)    │
└───────────────────────────────┘
```

## 宏任务与微任务

### 宏任务（Macro Task）

- `setTimeout`
- `setInterval`
- `setImmediate`（Node.js）
- I/O 操作
- UI 渲染

### 微任务（Micro Task）

- `Promise.then/catch/finally`
- `queueMicrotask`
- `MutationObserver`
- `process.nextTick`（Node.js）

## 执行顺序

```javascript
console.log('1');  // 同步

setTimeout(() => {
  console.log('2');  // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3');  // 微任务
});

console.log('4');  // 同步

// 输出顺序: 1, 4, 3, 2
```

## 详细执行流程

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => {
    console.log('Promise in Timeout');
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');
  });

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

console.log('End');

// 输出:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Promise in Timeout
// Timeout 2
```

## 事件循环步骤

1. 执行同步代码（调用栈）
2. 调用栈清空后，检查微任务队列
3. 执行所有微任务
4. 执行一个宏任务
5. 重复步骤 2-4

```javascript
// 可视化
function eventLoop() {
  while (true) {
    // 1. 执行同步代码
    executeCallStack();
    
    // 2. 执行所有微任务
    while (microtaskQueue.length > 0) {
      executeMicrotask(microtaskQueue.shift());
    }
    
    // 3. 执行一个宏任务
    if (macrotaskQueue.length > 0) {
      executeMacrotask(macrotaskQueue.shift());
    }
    
    // 4. 渲染更新（浏览器）
    renderIfNeeded();
  }
}
```

## 常见陷阱

### setTimeout 不精确

```javascript
const start = Date.now();

setTimeout(() => {
  console.log(Date.now() - start);  // 可能 > 0
}, 0);

// 执行大量同步代码会延迟回调
for (let i = 0; i < 1000000000; i++) {}
```

### 微任务嵌套

```javascript
// 警告：这会阻塞事件循环！
function infiniteMicrotasks() {
  Promise.resolve().then(infiniteMicrotasks);
}
// infiniteMicrotasks();  // 不要运行！
```

## 实际应用

### 确保 DOM 更新后执行

```javascript
element.textContent = 'Updated';

// 使用微任务确保在渲染前执行
queueMicrotask(() => {
  console.log('DOM updated, before render');
});

// 使用宏任务确保在渲染后执行
setTimeout(() => {
  console.log('After render');
}, 0);
```

### 分解长任务

```javascript
function processLargeArray(array) {
  const chunkSize = 1000;
  let index = 0;
  
  function processChunk() {
    const end = Math.min(index + chunkSize, array.length);
    
    for (; index < end; index++) {
      // 处理元素
    }
    
    if (index < array.length) {
      // 让出主线程，处理其他任务
      setTimeout(processChunk, 0);
    }
  }
  
  processChunk();
}
```

---

## 练习预告

继续学习 [02-callbacks.md](./02-callbacks.md) →
