# 综合挑战 01：异步任务调度器

## 🎯 挑战目标

实现一个功能完整的异步任务调度器。

## 📋 需求说明

实现 `scheduler.js` 中的 `TaskScheduler` 类：

### 基本功能

```javascript
const scheduler = new TaskScheduler({ concurrency: 2 });

// 添加任务
const taskId = scheduler.add(async () => {
  await delay(100);
  return 'result';
});

// 获取任务状态
scheduler.getStatus(taskId);  // 'pending' | 'running' | 'completed' | 'failed'

// 获取任务结果
const result = await scheduler.getResult(taskId);
```

### 优先级支持

```javascript
scheduler.add(task1, { priority: 1 });  // 低优先级
scheduler.add(task2, { priority: 10 }); // 高优先级先执行
```

### 任务取消

```javascript
scheduler.cancel(taskId);
scheduler.cancelAll();
```

### 事件监听

```javascript
scheduler.on('taskComplete', (taskId, result) => {});
scheduler.on('taskError', (taskId, error) => {});
scheduler.on('queueEmpty', () => {});
```

### 暂停和恢复

```javascript
scheduler.pause();
scheduler.resume();
```

## ⏱️ 预计时间

90-120 分钟

## 🚀 开始挑战

1. 编辑 `scheduler.js` 实现功能
2. 运行测试：`pnpm test chapters/07-async/challenges`
3. 所有测试通过即为完成

## 💡 提示

- 使用 Map 存储任务状态
- 优先级队列可用数组排序实现
- 事件可用简单的回调数组
