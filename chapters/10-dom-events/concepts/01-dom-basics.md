# DOM 基础

## 什么是 DOM

DOM（Document Object Model）是 HTML 文档的编程接口，将文档表示为节点树。

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── div
            ├── p
            └── span
```

## 节点类型

| 类型 | nodeType | 示例 |
|------|----------|------|
| 元素节点 | 1 | `<div>`, `<p>` |
| 属性节点 | 2 | `class="..."` |
| 文本节点 | 3 | 文本内容 |
| 注释节点 | 8 | `<!-- 注释 -->` |
| 文档节点 | 9 | document |

## 查询元素

### getElementById

```javascript
const element = document.getElementById('myId');
```

### getElementsByClassName

```javascript
const elements = document.getElementsByClassName('myClass');
// 返回 HTMLCollection（实时集合）
```

### getElementsByTagName

```javascript
const divs = document.getElementsByTagName('div');
```

### querySelector（推荐）

```javascript
// 返回第一个匹配元素
const element = document.querySelector('.myClass');
const nested = document.querySelector('div > p.intro');
const byAttr = document.querySelector('[data-id="123"]');
```

### querySelectorAll（推荐）

```javascript
// 返回 NodeList（静态集合）
const elements = document.querySelectorAll('.item');
elements.forEach(el => console.log(el));
```

## 集合类型比较

```javascript
// HTMLCollection（实时）
const live = document.getElementsByClassName('item');

// NodeList（静态，来自 querySelectorAll）
const static = document.querySelectorAll('.item');

// 添加新元素后
document.body.appendChild(newItem);
live.length;   // 增加
static.length; // 不变
```

## 遍历 DOM

### 父节点

```javascript
element.parentNode;      // 父节点
element.parentElement;   // 父元素
element.closest('.container'); // 最近的匹配祖先
```

### 子节点

```javascript
element.childNodes;      // 所有子节点（含文本）
element.children;        // 子元素（HTMLCollection）
element.firstChild;      // 第一个子节点
element.firstElementChild; // 第一个子元素
element.lastChild;
element.lastElementChild;
```

### 兄弟节点

```javascript
element.nextSibling;        // 下一个兄弟节点
element.nextElementSibling; // 下一个兄弟元素
element.previousSibling;
element.previousElementSibling;
```

## 元素属性

### 标准属性

```javascript
element.id = 'newId';
element.className = 'class1 class2';
element.href = 'https://example.com';
element.src = 'image.png';
```

### classList

```javascript
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('open');
element.classList.contains('active'); // true/false
element.classList.replace('old', 'new');
```

### getAttribute/setAttribute

```javascript
element.getAttribute('data-id');
element.setAttribute('data-id', '123');
element.removeAttribute('disabled');
element.hasAttribute('disabled');
```

### dataset

```javascript
// <div data-user-id="123" data-role="admin">
element.dataset.userId;  // '123'
element.dataset.role;    // 'admin'
element.dataset.newProp = 'value';
```

## 元素内容

### textContent

```javascript
// 获取/设置纯文本
element.textContent = 'Hello World';
const text = element.textContent;
```

### innerHTML

```javascript
// 获取/设置 HTML
element.innerHTML = '<strong>Bold</strong>';
const html = element.innerHTML;
```

### innerText

```javascript
// 考虑 CSS 样式的文本
element.innerText = 'Visible text';
```

### outerHTML

```javascript
// 包含元素本身的 HTML
element.outerHTML = '<div class="new">New content</div>';
```

## 元素尺寸和位置

### 尺寸

```javascript
element.clientWidth;  // 内容 + padding
element.clientHeight;
element.offsetWidth;  // 内容 + padding + border
element.offsetHeight;
element.scrollWidth;  // 完整内容宽度
element.scrollHeight;
```

### 位置

```javascript
element.offsetTop;    // 相对于 offsetParent
element.offsetLeft;
element.scrollTop;    // 滚动偏移
element.scrollLeft;

// 相对于视口
const rect = element.getBoundingClientRect();
rect.top, rect.right, rect.bottom, rect.left;
rect.width, rect.height;
```

---

继续学习 [02-dom-manipulation.md](./02-dom-manipulation.md) →
