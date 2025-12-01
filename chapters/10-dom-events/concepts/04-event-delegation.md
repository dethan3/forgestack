# 事件委托

## 什么是事件委托

利用事件冒泡，在父元素上监听子元素的事件。

## 为什么使用事件委托

- **性能**：一个监听器代替多个
- **动态元素**：自动处理新添加的元素
- **内存**：减少事件处理器数量

## 基本实现

```javascript
// 差：为每个按钮绑定事件
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// 好：使用事件委托
document.querySelector('.btn-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    handleClick(e);
  }
});
```

## 匹配目标元素

### matches 方法

```javascript
container.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    deleteItem(e.target);
  }
  
  if (e.target.matches('.edit-btn')) {
    editItem(e.target);
  }
});
```

### closest 方法

```javascript
// 处理嵌套结构
// <li class="item"><span class="icon"></span><span class="text">Item</span></li>

list.addEventListener('click', (e) => {
  // 点击 span 时也能找到 li
  const item = e.target.closest('.item');
  if (item) {
    handleItemClick(item);
  }
});
```

## 实际应用

### Todo 列表

```html
<ul id="todo-list">
  <li data-id="1">
    <span class="text">Task 1</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  </li>
  <!-- 更多项目... -->
</ul>
```

```javascript
const todoList = document.getElementById('todo-list');

todoList.addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (!item) return;
  
  const id = item.dataset.id;
  
  if (e.target.matches('.delete')) {
    deleteTodo(id);
    item.remove();
  }
  
  if (e.target.matches('.edit')) {
    editTodo(id);
  }
  
  if (e.target.matches('.text')) {
    toggleComplete(id);
  }
});
```

### 表格操作

```javascript
table.addEventListener('click', (e) => {
  const cell = e.target.closest('td');
  const row = e.target.closest('tr');
  
  if (!row) return;
  
  // 行点击
  if (cell?.classList.contains('selectable')) {
    row.classList.toggle('selected');
  }
  
  // 操作按钮
  if (e.target.matches('[data-action]')) {
    const action = e.target.dataset.action;
    const rowId = row.dataset.id;
    handleAction(action, rowId);
  }
});
```

### 表单验证

```javascript
form.addEventListener('input', (e) => {
  const field = e.target;
  
  if (field.matches('[data-validate]')) {
    const rules = field.dataset.validate.split(',');
    validateField(field, rules);
  }
});

form.addEventListener('blur', (e) => {
  if (e.target.matches('input, select, textarea')) {
    showFieldError(e.target);
  }
}, true); // 使用捕获
```

## 通用委托函数

```javascript
function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e, target);
    }
  });
}

// 使用
delegate(document.body, '.btn', 'click', function(e, btn) {
  console.log('Button clicked:', btn.textContent);
});
```

## 带命名空间的委托

```javascript
class EventDelegator {
  constructor(root) {
    this.root = root;
    this.handlers = new Map();
  }

  on(selector, event, handler) {
    const key = `${event}:${selector}`;
    this.handlers.set(key, handler);
    
    this.root.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target && this.root.contains(target)) {
        handler.call(target, e);
      }
    });
    
    return this;
  }

  off(selector, event) {
    const key = `${event}:${selector}`;
    this.handlers.delete(key);
    return this;
  }
}

// 使用
const delegator = new EventDelegator(document.body);
delegator
  .on('.btn', 'click', handleClick)
  .on('.link', 'click', handleLink);
```

## 注意事项

### 不冒泡的事件

```javascript
// focus/blur 不冒泡，使用 focusin/focusout
container.addEventListener('focusin', (e) => {
  e.target.classList.add('focused');
});

container.addEventListener('focusout', (e) => {
  e.target.classList.remove('focused');
});

// 或使用捕获阶段
container.addEventListener('focus', handler, true);
```

### 性能考虑

```javascript
// 避免在高频事件中使用复杂选择器
// 使用节流/防抖
let ticking = false;
container.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleMove(e);
      ticking = false;
    });
    ticking = true;
  }
});
```

---

继续学习 [05-best-practices.md](./05-best-practices.md) →
