# DOM 操作

## 创建元素

### createElement

```javascript
const div = document.createElement('div');
div.className = 'card';
div.id = 'card-1';
div.textContent = 'Hello';
```

### createTextNode

```javascript
const text = document.createTextNode('Hello World');
div.appendChild(text);
```

### createDocumentFragment

```javascript
// 批量添加元素，减少重排
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

list.appendChild(fragment); // 一次性添加
```

## 添加元素

### appendChild

```javascript
parent.appendChild(child);
// child 成为 parent 的最后一个子元素
```

### insertBefore

```javascript
parent.insertBefore(newNode, referenceNode);
// 在 referenceNode 之前插入
```

### append / prepend（现代方法）

```javascript
// 可以添加多个节点或文本
parent.append(child1, child2, 'text');
parent.prepend(child); // 添加到开头
```

### before / after

```javascript
element.before(newElement);  // 在元素之前
element.after(newElement);   // 在元素之后
```

### insertAdjacentHTML

```javascript
element.insertAdjacentHTML('beforebegin', '<div>Before</div>');
element.insertAdjacentHTML('afterbegin', '<div>First child</div>');
element.insertAdjacentHTML('beforeend', '<div>Last child</div>');
element.insertAdjacentHTML('afterend', '<div>After</div>');
```

## 移除元素

### remove

```javascript
element.remove(); // 移除自身
```

### removeChild

```javascript
parent.removeChild(child);
```

## 替换元素

### replaceChild

```javascript
parent.replaceChild(newChild, oldChild);
```

### replaceWith

```javascript
oldElement.replaceWith(newElement);
// 或
oldElement.replaceWith('text', element1, element2);
```

## 克隆元素

```javascript
// 浅克隆（不含子节点）
const clone = element.cloneNode(false);

// 深克隆（含子节点）
const deepClone = element.cloneNode(true);
```

## 样式操作

### style 属性

```javascript
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '16px';
element.style.cssText = 'color: red; font-size: 16px;';
```

### getComputedStyle

```javascript
const styles = getComputedStyle(element);
const color = styles.color;
const fontSize = styles.fontSize;
```

### CSS 类操作

```javascript
// 推荐：使用 classList
element.classList.add('active', 'visible');
element.classList.remove('hidden');
element.classList.toggle('open');
element.classList.replace('old', 'new');
```

## 表单操作

### 获取值

```javascript
// input, textarea
const value = input.value;

// select
const selected = select.value;
const selectedOption = select.options[select.selectedIndex];

// checkbox, radio
const checked = checkbox.checked;

// 多选
const selectedValues = [...select.selectedOptions].map(o => o.value);
```

### 设置值

```javascript
input.value = 'new value';
textarea.value = 'text content';
select.value = 'option2';
checkbox.checked = true;
```

### 表单数据

```javascript
const form = document.querySelector('form');
const formData = new FormData(form);

// 获取值
const name = formData.get('name');

// 遍历
for (const [key, value] of formData) {
  console.log(key, value);
}

// 转对象
const data = Object.fromEntries(formData);
```

## 性能优化

### 减少重排重绘

```javascript
// 差：多次操作导致多次重排
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// 好：一次性设置
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// 或使用 class
element.classList.add('box-style');
```

### 使用 DocumentFragment

```javascript
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});
list.appendChild(fragment);
```

### 离线操作

```javascript
// 先移除，修改后再添加
const parent = element.parentNode;
const next = element.nextSibling;
parent.removeChild(element);

// 大量修改
// ...

parent.insertBefore(element, next);
```

---

继续学习 [03-events.md](./03-events.md) →
