# 模块基础

## 什么是模块

模块是独立的代码单元，具有自己的作用域，通过导出和导入与其他模块交互。

## 为什么需要模块

- **代码组织**：将代码分割成逻辑单元
- **封装**：隐藏内部实现细节
- **复用**：在多处使用相同代码
- **依赖管理**：明确代码依赖关系
- **命名空间**：避免全局变量污染

## ES Modules vs CommonJS

### ES Modules（ESM）

```javascript
// 导出
export const name = 'module';
export function greet() {}
export default class User {}

// 导入
import User, { name, greet } from './module.js';
```

### CommonJS（CJS）

```javascript
// 导出
module.exports = { name, greet };
// 或
exports.name = 'module';

// 导入
const { name, greet } = require('./module');
```

## 主要区别

| 特性 | ES Modules | CommonJS |
|------|------------|----------|
| 加载时机 | 编译时（静态） | 运行时（动态） |
| 顶层 this | undefined | module.exports |
| 导入值 | 只读绑定 | 值的拷贝 |
| 循环依赖 | 支持 | 部分支持 |
| 异步加载 | 支持 | 不支持 |

## 模块作用域

每个模块都有自己的作用域：

```javascript
// module-a.js
const privateVar = 'private';  // 只在本模块可见
export const publicVar = 'public';

// module-b.js
import { publicVar } from './module-a.js';
console.log(publicVar);  // 'public'
console.log(privateVar); // ReferenceError
```

## 模块执行

### 单次执行

模块代码只在首次导入时执行一次：

```javascript
// counter.js
console.log('Module loaded');
export let count = 0;
export function increment() { count++; }

// main.js
import { count } from './counter.js';  // 打印 'Module loaded'
import { increment } from './counter.js';  // 不再打印
```

### 实时绑定

导入的值是实时绑定，不是拷贝：

```javascript
// counter.js
export let count = 0;
export function increment() { count++; }

// main.js
import { count, increment } from './counter.js';
console.log(count);  // 0
increment();
console.log(count);  // 1（实时更新）
```

## 在浏览器中使用

```html
<!-- 添加 type="module" -->
<script type="module" src="main.js"></script>

<!-- 内联模块 -->
<script type="module">
  import { greet } from './utils.js';
  greet();
</script>
```

### 模块特性

- 自动启用严格模式
- 默认延迟执行（defer）
- 同源策略限制

## 在 Node.js 中使用

### 方式一：.mjs 扩展名

```javascript
// utils.mjs
export function greet() {}

// main.mjs
import { greet } from './utils.mjs';
```

### 方式二：package.json 配置

```json
{
  "type": "module"
}
```

```javascript
// utils.js（当作 ESM 处理）
export function greet() {}
```

## 模块解析

### 相对路径

```javascript
import { foo } from './utils.js';      // 同目录
import { bar } from '../lib/bar.js';   // 上级目录
import { baz } from './sub/baz.js';    // 子目录
```

### 绝对路径

```javascript
import { config } from '/config.js';   // 从根目录
```

### 裸模块标识符

```javascript
import React from 'react';             // node_modules
import { useState } from 'react';
```

---

继续学习 [02-export-import.md](./02-export-import.md) →
