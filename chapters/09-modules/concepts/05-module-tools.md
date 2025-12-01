# 模块工具

## 打包工具

### Webpack

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
};
```

### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html'
      }
    }
  }
});
```

### Rollup

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'  // 'cjs', 'umd', 'iife'
  }
};
```

## Tree Shaking

移除未使用的代码：

```javascript
// utils.js
export function used() { return 'used'; }
export function unused() { return 'unused'; }

// main.js
import { used } from './utils.js';
console.log(used());
// unused 函数会被移除
```

### 确保 Tree Shaking 生效

```javascript
// 好：使用命名导出
export { add, subtract };

// 差：默认导出对象
export default { add, subtract };  // 整个对象都会被保留

// 好：直接导入需要的
import { add } from './math.js';

// 差：导入全部
import * as math from './math.js';  // 可能无法 tree shake
```

### sideEffects 配置

```json
// package.json
{
  "sideEffects": false,  // 标记整个包无副作用
  // 或指定有副作用的文件
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}
```

## 代码分割

### 入口分割

```javascript
// webpack.config.js
module.exports = {
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js'
  }
};
```

### 动态分割

```javascript
// 自动创建新 chunk
const module = await import('./heavy-module.js');
```

### 共享依赖

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    }
  }
};
```

## 模块格式

### ES Modules (ESM)

```javascript
// 现代浏览器和 Node.js 14+
export const name = 'esm';
import { name } from './module.js';
```

### CommonJS (CJS)

```javascript
// Node.js 传统格式
module.exports = { name: 'cjs' };
const { name } = require('./module');
```

### UMD (Universal Module Definition)

```javascript
// 兼容多种环境
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.MyModule = factory();
  }
}(this, function() {
  return { name: 'umd' };
}));
```

## 发布模块

### package.json 配置

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",      // CommonJS 入口
  "module": "dist/index.esm.js",     // ES Module 入口
  "types": "dist/index.d.ts",        // TypeScript 类型
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    },
    "./utils": {
      "import": "./dist/utils.esm.js",
      "require": "./dist/utils.cjs.js"
    }
  },
  "files": ["dist"]
}
```

### 双模式包

```javascript
// 同时支持 ESM 和 CJS
// src/index.js (源码使用 ESM)
export function greet() {}

// 构建输出 ESM
// dist/index.esm.js
export { greet } from './greet.js';

// 构建输出 CJS
// dist/index.cjs.js
module.exports = require('./greet.js');
```

## 模块解析

### Node.js 解析算法

```
import 'package'
1. 检查核心模块
2. 检查 node_modules/package
3. 检查 node_modules/package/package.json 的 main/module/exports
4. 默认 node_modules/package/index.js
```

### 路径别名

```javascript
// vite.config.js
export default {
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  }
};

// 使用
import Button from '@components/Button';
```

## Import Maps（浏览器）

```html
<script type="importmap">
{
  "imports": {
    "lodash": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js",
    "@/": "./src/"
  }
}
</script>

<script type="module">
  import _ from 'lodash';
  import utils from '@/utils.js';
</script>
```

---

完成概念学习后，前往 `exercises/` 目录完成练习。
