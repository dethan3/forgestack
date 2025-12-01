# 综合挑战 01：交互式 Todo 应用

## 🎯 挑战目标

实现一个完整的 Todo 应用，运用所学的 DOM 和事件知识。

## 📋 需求说明

### 功能要求

1. **添加 Todo**
   - 输入框输入任务
   - 按 Enter 或点击按钮添加
   - 添加后清空输入框

2. **显示 Todo 列表**
   - 显示所有 Todo 项
   - 每项包含：复选框、文本、删除按钮
   - 使用事件委托处理点击

3. **完成 Todo**
   - 点击复选框标记完成
   - 完成的项添加删除线样式

4. **删除 Todo**
   - 点击删除按钮移除项
   - 可选：添加确认或动画

5. **筛选 Todo**
   - 全部 / 进行中 / 已完成
   - 切换筛选条件

6. **统计信息**
   - 显示剩余未完成数量
   - 清除所有已完成按钮

### 代码要求

```javascript
class TodoApp {
  constructor(container) {
    this.container = container;
    this.todos = [];
    this.filter = 'all'; // 'all' | 'active' | 'completed'
  }

  // 添加 Todo
  addTodo(text) {}

  // 切换完成状态
  toggleTodo(id) {}

  // 删除 Todo
  deleteTodo(id) {}

  // 设置筛选
  setFilter(filter) {}

  // 清除已完成
  clearCompleted() {}

  // 渲染
  render() {}

  // 绑定事件（使用事件委托）
  bindEvents() {}
}
```

### HTML 结构

```html
<div class="todo-app">
  <header class="todo-header">
    <h1>Todo</h1>
    <input class="todo-input" placeholder="What needs to be done?">
  </header>
  <main class="todo-main">
    <ul class="todo-list"></ul>
  </main>
  <footer class="todo-footer">
    <span class="todo-count"></span>
    <div class="todo-filters">
      <button data-filter="all" class="active">All</button>
      <button data-filter="active">Active</button>
      <button data-filter="completed">Completed</button>
    </div>
    <button class="clear-completed">Clear completed</button>
  </footer>
</div>
```

## ⏱️ 预计时间

90-120 分钟

## 🚀 开始挑战

1. 实现 `TodoApp` 类
2. 使用事件委托处理列表事件
3. 运行测试验证

## 💡 提示

- 使用 `data-id` 属性标识每个 Todo
- `closest` 方法查找父元素
- `classList.toggle` 切换样式
- 使用 `filter` 方法筛选数据
