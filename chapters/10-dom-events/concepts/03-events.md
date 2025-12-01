# 事件机制

## 事件流

```
┌────────────────────────────────────┐
│           Document                  │
│   ┌───────────────────────────┐    │
│   │         Body              │    │ 捕获阶段
│   │   ┌─────────────────┐    │    │    ↓
│   │   │     Div         │    │    │
│   │   │   ┌────────┐    │    │    │
│   │   │   │ Button │ ← 目标    │    │
│   │   │   └────────┘    │    │    │
│   │   └─────────────────┘    │    │    ↑
│   └───────────────────────────┘    │ 冒泡阶段
└────────────────────────────────────┘
```

1. **捕获阶段**：从 window 到目标元素
2. **目标阶段**：到达目标元素
3. **冒泡阶段**：从目标元素回到 window

## addEventListener

```javascript
element.addEventListener(type, handler, options);

// 基本用法
button.addEventListener('click', function(event) {
  console.log('Clicked!');
});

// 箭头函数
button.addEventListener('click', (e) => {
  console.log(e.target);
});

// 选项
element.addEventListener('click', handler, {
  capture: false,  // 捕获阶段触发
  once: true,      // 只执行一次
  passive: true    // 不会调用 preventDefault
});
```

## 移除事件

```javascript
// 必须使用相同的函数引用
function handleClick() {
  console.log('clicked');
}

element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// 使用 once 选项
element.addEventListener('click', handleClick, { once: true });
```

## 事件对象

```javascript
element.addEventListener('click', (event) => {
  // 目标元素
  event.target;         // 实际触发事件的元素
  event.currentTarget;  // 绑定事件的元素（this）
  
  // 事件类型
  event.type;           // 'click'
  
  // 阻止默认行为
  event.preventDefault();
  
  // 阻止冒泡
  event.stopPropagation();
  
  // 阻止同元素其他处理器
  event.stopImmediatePropagation();
  
  // 事件阶段
  event.eventPhase;     // 1: 捕获, 2: 目标, 3: 冒泡
});
```

## 鼠标事件

```javascript
// 常用事件
'click'        // 点击
'dblclick'     // 双击
'mousedown'    // 按下
'mouseup'      // 释放
'mousemove'    // 移动
'mouseenter'   // 进入（不冒泡）
'mouseleave'   // 离开（不冒泡）
'mouseover'    // 进入（冒泡）
'mouseout'     // 离开（冒泡）
'contextmenu'  // 右键菜单

// 鼠标事件属性
event.clientX, event.clientY;  // 相对视口
event.pageX, event.pageY;      // 相对文档
event.offsetX, event.offsetY;  // 相对目标元素
event.button;                  // 0: 左键, 1: 中键, 2: 右键
event.buttons;                 // 按下的按钮
event.altKey, event.ctrlKey, event.shiftKey, event.metaKey;
```

## 键盘事件

```javascript
'keydown'   // 按下
'keyup'     // 释放
'keypress'  // 已废弃

document.addEventListener('keydown', (event) => {
  event.key;       // 'a', 'Enter', 'ArrowUp'
  event.code;      // 'KeyA', 'Enter', 'ArrowUp'
  event.keyCode;   // 已废弃
  
  // 修饰键
  event.altKey;
  event.ctrlKey;
  event.shiftKey;
  event.metaKey;   // Mac: Cmd, Windows: Win
  
  // 常见组合键
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    save();
  }
});
```

## 表单事件

```javascript
'submit'    // 表单提交
'reset'     // 表单重置
'input'     // 输入变化（实时）
'change'    // 值改变（失焦后）
'focus'     // 获得焦点
'blur'      // 失去焦点
'focusin'   // 获得焦点（冒泡）
'focusout'  // 失去焦点（冒泡）

// 表单提交
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  // 处理数据
});

// 输入验证
input.addEventListener('input', (event) => {
  const value = event.target.value;
  validateInput(value);
});
```

## 滚动和窗口事件

```javascript
// 滚动
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
});

// 窗口大小
window.addEventListener('resize', () => {
  console.log(window.innerWidth, window.innerHeight);
});

// 页面加载
window.addEventListener('DOMContentLoaded', () => {
  // DOM 加载完成
});

window.addEventListener('load', () => {
  // 所有资源加载完成
});

// 页面卸载
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = ''; // 显示确认对话框
});
```

## 自定义事件

```javascript
// 创建自定义事件
const event = new CustomEvent('myEvent', {
  detail: { message: 'Hello' },
  bubbles: true,
  cancelable: true
});

// 监听
element.addEventListener('myEvent', (e) => {
  console.log(e.detail.message);
});

// 触发
element.dispatchEvent(event);
```

---

继续学习 [04-event-delegation.md](./04-event-delegation.md) →
