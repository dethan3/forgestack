# 动态计算器 - Day 3-4 项目

## 📋 项目概述

这是 JavaScript & TypeScript 全栈开发学习计划中 Day 3-4 的实战项目，重点练习 **DOM 操作与事件处理**。

## 🎯 学习目标

- ✅ 掌握 DOM API 的使用
- ✅ 练习事件监听和事件处理
- ✅ 学习表单处理和用户交互
- ✅ 实现动态界面更新
- ✅ 练习 ES6+ 语法（类、箭头函数、模板字符串等）

## ✨ 功能特性

### 🧮 基础计算功能
- 四则运算（加减乘除）
- 小数点计算
- 连续运算
- 清除功能（C/CE）
- 删除功能（退格）

### 🎨 用户体验
- 现代化 UI 设计
- 深色/浅色主题切换
- 按钮点击反馈动画
- 计算历史显示
- 错误处理和提示

### ⌨️ 交互方式
- 鼠标点击操作
- 完整键盘支持
- 响应式设计（移动端适配）

## 🛠️ 技术实现

### HTML 结构
```html
- 语义化标签使用
- 数据属性（data-*）进行事件绑定
- 响应式布局设计
```

### CSS 样式
```css
- CSS 变量实现主题切换
- Flexbox 和 Grid 布局
- 动画和过渡效果
- 移动端响应式设计
```

### JavaScript 功能
```javascript
- ES6 类（Class）语法
- DOM 查询和操作
- 事件监听器绑定
- 本地存储（localStorage）
- 键盘事件处理
```

## 🚀 快速开始

1. **克隆或下载项目**
   ```bash
   cd phase1/day3-4-interactive-calculator
   ```

2. **打开项目**
   - 直接在浏览器中打开 `index.html`
   - 或使用 Live Server 扩展

3. **开始使用**
   - 点击数字和运算符按钮进行计算
   - 使用键盘进行快速操作
   - 点击主题切换按钮体验深色模式

## ⌨️ 键盘快捷键

| 按键 | 功能 |
|------|------|
| `0-9` | 输入数字 |
| `+` `-` `*` `/` | 运算符 |
| `.` | 小数点 |
| `Enter` 或 `=` | 计算结果 |
| `Backspace` | 删除最后一位 |
| `Escape` | 清除所有 |

## 📱 响应式支持

- **桌面端**: 完整功能体验
- **平板端**: 适配中等屏幕
- **手机端**: 优化触摸操作

## 🎨 主题切换

支持深色和浅色两种主题：
- 点击右上角主题按钮切换
- 自动保存用户偏好设置
- 平滑的主题切换动画

## 🔧 核心代码亮点

### 1. DOM 操作练习
```javascript
// 动态更新显示屏
updateDisplay() {
    const formattedNumber = this.formatNumber(this.currentInput);
    this.displayElement.textContent = formattedNumber;
    
    // 添加动画效果
    this.displayElement.style.transform = 'scale(1.02)';
    setTimeout(() => {
        this.displayElement.style.transform = 'scale(1)';
    }, 100);
}
```

### 2. 事件处理练习
```javascript
// 批量绑定事件监听器
bindEvents() {
    const numberButtons = document.querySelectorAll('[data-number]');
    numberButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            this.inputNumber(e.target.dataset.number);
        });
    });
}
```

### 3. 键盘事件处理
```javascript
// 完整的键盘支持
handleKeyboard(event) {
    const key = event.key;
    
    if ('0123456789'.includes(key)) {
        this.inputNumber(key);
    } else if ('+-*/'.includes(key)) {
        this.inputOperator(key);
    }
    // ... 更多键盘处理逻辑
}
```

## 📚 学习收获

通过这个项目，你将掌握：

1. **DOM 操作**
   - `querySelector` 和 `querySelectorAll` 的使用
   - 元素属性和内容的动态修改
   - CSS 类的添加和移除

2. **事件处理**
   - `addEventListener` 的使用
   - 事件对象的处理
   - 事件委托的概念

3. **用户交互**
   - 表单数据的处理
   - 用户输入的验证
   - 反馈和错误处理

4. **现代 JavaScript**
   - ES6 类的使用
   - 箭头函数
   - 模板字符串
   - 解构赋值

## 🎯 下一步学习

完成这个项目后，建议：

1. **代码优化**
   - 重构代码，提高可读性
   - 添加更多注释
   - 优化性能

2. **功能扩展**
   - 添加更多数学函数（平方根、百分比等）
   - 实现计算历史记录
   - 添加快捷键提示

3. **技术提升**
   - 学习单元测试
   - 了解模块化开发
   - 探索 Web Components

## 📝 项目总结

这个动态计算器项目是学习前端开发的重要里程碑，通过实际操作掌握了：

- ✅ DOM 操作的核心技能
- ✅ 事件驱动编程的思维
- ✅ 用户界面的交互设计
- ✅ 现代 JavaScript 的实际应用

继续保持学习热情，向下一个项目进发！🚀
