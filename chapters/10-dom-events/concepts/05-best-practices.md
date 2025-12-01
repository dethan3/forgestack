# 最佳实践

## DOM 操作优化

### 缓存 DOM 引用

```javascript
// 差：每次都查询
function update() {
  document.querySelector('.title').textContent = 'New Title';
  document.querySelector('.title').classList.add('updated');
}

// 好：缓存引用
const title = document.querySelector('.title');
function update() {
  title.textContent = 'New Title';
  title.classList.add('updated');
}
```

### 批量操作

```javascript
// 差：多次 DOM 操作
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li); // 每次都触发重排
});

// 好：使用 DocumentFragment
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});
list.appendChild(fragment); // 只触发一次重排
```

### 避免强制同步布局

```javascript
// 差：强制同步布局
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px'; // 读取后写入
});

// 好：先读后写
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});
```

## 事件处理优化

### 使用事件委托

```javascript
// 差：为每个元素绑定
buttons.forEach(btn => {
  btn.addEventListener('click', handler);
});

// 好：事件委托
container.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handler(e);
  }
});
```

### 节流和防抖

```javascript
// 防抖：延迟执行
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流：限制频率
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用
input.addEventListener('input', debounce(search, 300));
window.addEventListener('scroll', throttle(handleScroll, 100));
```

### 被动监听器

```javascript
// 滚动事件使用 passive
window.addEventListener('scroll', handler, { passive: true });

// 触摸事件
element.addEventListener('touchstart', handler, { passive: true });
```

## 代码组织

### 模块化组件

```javascript
class Component {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    // 处理点击
  }

  render() {
    // 渲染
  }

  destroy() {
    this.element.removeEventListener('click', this.handleClick);
  }
}
```

### 状态管理

```javascript
class StatefulComponent {
  constructor(element) {
    this.element = element;
    this.state = {};
    this.init();
  }

  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.onStateChange(prevState, this.state);
    this.render();
  }

  onStateChange(prevState, newState) {
    // 状态变化回调
  }

  render() {
    // 根据 state 渲染
  }
}
```

## 无障碍性

### 键盘支持

```javascript
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
});
```

### 焦点管理

```javascript
// 打开模态框时聚焦
function openModal() {
  modal.style.display = 'block';
  modal.querySelector('[tabindex="-1"]').focus();
}

// 关闭时恢复焦点
let previousFocus;
function openModal() {
  previousFocus = document.activeElement;
  // ...
}

function closeModal() {
  previousFocus?.focus();
}
```

### ARIA 属性

```javascript
// 动态更新 ARIA
button.setAttribute('aria-expanded', isExpanded);
button.setAttribute('aria-pressed', isPressed);
menu.setAttribute('aria-hidden', !isVisible);
```

## 内存管理

### 清理事件监听器

```javascript
class Widget {
  constructor(element) {
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }

  handleClick() {
    // ...
  }

  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    this.element = null;
  }
}
```

### 使用 WeakMap

```javascript
// 存储元素关联数据，元素移除时自动清理
const elementData = new WeakMap();

function setData(element, data) {
  elementData.set(element, data);
}

function getData(element) {
  return elementData.get(element);
}
```

## 调试技巧

### 事件断点

```javascript
// Chrome DevTools: Elements > Event Listeners
// 或使用 monitorEvents
monitorEvents(element, 'click');
unmonitorEvents(element);
```

### 性能分析

```javascript
// 标记时间点
performance.mark('start');
// 执行操作
performance.mark('end');
performance.measure('operation', 'start', 'end');
console.log(performance.getEntriesByName('operation'));
```

---

完成概念学习后，前往 `exercises/` 目录完成练习。
