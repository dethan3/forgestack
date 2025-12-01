# 综合挑战 01：模块化工具库

## 🎯 挑战目标

设计并实现一个模块化的工具库。

## 📋 需求说明

创建一个包含多个子模块的工具库：

### 目录结构

```
lib/
├── index.js          # 主入口（桶文件）
├── string/
│   └── index.js      # 字符串工具
├── array/
│   └── index.js      # 数组工具
├── object/
│   └── index.js      # 对象工具
└── async/
    └── index.js      # 异步工具
```

### 功能要求

#### 字符串工具 (string)

```javascript
capitalize(str)      // 首字母大写
camelCase(str)       // 转驼峰
kebabCase(str)       // 转短横线
truncate(str, len)   // 截断
```

#### 数组工具 (array)

```javascript
unique(arr)          // 去重
flatten(arr)         // 扁平化
chunk(arr, size)     // 分块
shuffle(arr)         // 打乱
```

#### 对象工具 (object)

```javascript
pick(obj, keys)      // 选取属性
omit(obj, keys)      // 排除属性
deepClone(obj)       // 深拷贝
merge(target, source) // 深合并
```

#### 异步工具 (async)

```javascript
delay(ms)            // 延迟
retry(fn, times)     // 重试
timeout(promise, ms) // 超时
parallel(tasks, limit) // 并发限制
```

### 使用方式

```javascript
// 完整导入
import utils from './lib';
utils.string.capitalize('hello');

// 按需导入
import { capitalize } from './lib/string';
import { unique } from './lib/array';

// 命名空间导入
import * as stringUtils from './lib/string';
```

## ⏱️ 预计时间

60-90 分钟

## 🚀 开始挑战

1. 在 `lib/` 目录下创建子模块
2. 实现各个工具函数
3. 创建桶文件导出
4. 运行测试：`pnpm test chapters/09-modules/challenges`

## 💡 提示

- 每个子模块都应该有 index.js 作为入口
- 使用命名导出便于 tree-shaking
- 主入口重新导出所有子模块
