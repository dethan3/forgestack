# 综合挑战 01：函数工具库

## 🎯 挑战目标

实现一组实用的函数工具，综合运用函数、闭包和高阶函数。

## 📋 需求说明

实现 `functionUtils.js` 中的所有函数：

### 1. `pipe(...fns)`
函数管道，从左到右依次执行

```javascript
const process = pipe(addOne, double, square);
process(2);  // square(double(addOne(2))) = 36
```

### 2. `curry(fn)`
通用柯里化函数

```javascript
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3);  // 6
curriedAdd(1, 2)(3);  // 6
```

### 3. `retry(fn, times, delay)`
重试函数，失败后重试指定次数

### 4. `timeout(fn, ms)`
给函数添加超时限制

### 5. `batch(fn, size)`
批量处理函数

## ⏱️ 预计时间

45-60 分钟

## 🚀 开始挑战

1. 编辑 `functionUtils.js` 实现功能
2. 运行测试：`pnpm test chapters/03-functions/challenges`
3. 所有测试通过即为完成

## 💡 提示

- pipe 是 compose 的反向版本
- curry 需要跟踪已收集的参数
- retry 返回 Promise
