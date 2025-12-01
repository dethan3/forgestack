# 导出与导入

## 命名导出

### 声明时导出

```javascript
export const PI = 3.14159;
export let count = 0;
export function add(a, b) { return a + b; }
export class Calculator {}
```

### 声明后导出

```javascript
const PI = 3.14159;
let count = 0;
function add(a, b) { return a + b; }
class Calculator {}

export { PI, count, add, Calculator };
```

### 重命名导出

```javascript
const internalName = 'value';

export { internalName as publicName };
```

## 默认导出

每个模块只能有一个默认导出：

```javascript
// 导出函数
export default function greet() {}

// 导出类
export default class User {}

// 导出值
export default 42;

// 导出对象
export default {
  name: 'config',
  version: '1.0'
};
```

### 命名与默认混合

```javascript
export const version = '1.0';
export function helper() {}
export default class Main {}
```

## 导入语法

### 导入命名导出

```javascript
import { PI, add } from './math.js';
console.log(PI);      // 3.14159
console.log(add(1,2)); // 3
```

### 导入默认导出

```javascript
import User from './user.js';
const user = new User();
```

### 混合导入

```javascript
import Main, { version, helper } from './module.js';
```

### 重命名导入

```javascript
import { add as sum, PI as pi } from './math.js';
console.log(sum(1, 2));
console.log(pi);
```

### 导入全部

```javascript
import * as math from './math.js';
console.log(math.PI);
console.log(math.add(1, 2));
console.log(math.default);  // 默认导出
```

### 仅执行模块

```javascript
import './init.js';  // 只执行，不导入任何值
```

## 重新导出

### 转发导出

```javascript
// utils/index.js
export { add, subtract } from './math.js';
export { format } from './string.js';
export { default as User } from './user.js';
```

### 导出全部

```javascript
export * from './math.js';        // 转发所有命名导出
export * as math from './math.js'; // 作为命名空间导出
```

### 桶文件模式

```javascript
// components/index.js
export { Button } from './Button.js';
export { Input } from './Input.js';
export { Modal } from './Modal.js';

// 使用
import { Button, Input, Modal } from './components';
```

## 导入导出规则

### 导入是只读的

```javascript
import { count } from './counter.js';
count = 10;  // TypeError: Assignment to constant variable
```

### 导入提升

```javascript
greet();  // 可以在导入语句之前使用
import { greet } from './utils.js';
```

### 导入是静态的

```javascript
// 错误：不能动态导入
if (condition) {
  import { foo } from './foo.js';  // SyntaxError
}

// 正确：使用动态导入
if (condition) {
  const { foo } = await import('./foo.js');
}
```

## 常见模式

### 命名导出优先

```javascript
// 推荐：更明确，支持 tree-shaking
export function fetchUser() {}
export function fetchPost() {}

// 导入时能看到具体导入了什么
import { fetchUser } from './api.js';
```

### 默认导出用于主要功能

```javascript
// user.js - 主要是 User 类
export default class User {}
export function createUser() {}

// 导入
import User, { createUser } from './user.js';
```

### 常量集合

```javascript
// constants.js
export const API_URL = 'https://api.example.com';
export const MAX_RETRIES = 3;
export const TIMEOUT = 5000;

// 或作为对象
export default {
  API_URL: 'https://api.example.com',
  MAX_RETRIES: 3,
  TIMEOUT: 5000
};
```

---

继续学习 [03-dynamic-import.md](./03-dynamic-import.md) →
