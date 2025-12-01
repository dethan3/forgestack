# 综合挑战 01：函数式工具库

## 🎯 挑战目标

实现一个函数式编程工具库，包含常用的高级函数工具。

## 📋 需求说明

实现 `fpUtils.js` 中的所有函数：

### 1. `compose(...fns)`
函数组合（从右向左）

```javascript
const f = compose(add1, double, square);
f(3); // square(3)=9 -> double(9)=18 -> add1(18)=19
```

### 2. `pipe(...fns)`
管道操作（从左向右）

```javascript
const f = pipe(square, double, add1);
f(3); // square(3)=9 -> double(9)=18 -> add1(18)=19
```

### 3. `curry(fn)`
通用柯里化

```javascript
const add = curry((a, b, c) => a + b + c);
add(1)(2)(3); // 6
add(1, 2)(3); // 6
```

### 4. `memoize(fn, options)`
带选项的记忆化

```javascript
const cached = memoize(expensiveFn, { maxSize: 100, ttl: 60000 });
```

### 5. `debounce(fn, wait, options)`
完整的防抖实现

```javascript
const search = debounce(fetchResults, 300, { leading: true });
search.cancel(); // 取消
search.flush();  // 立即执行
```

## ⏱️ 预计时间

60-90 分钟

## 🚀 开始挑战

1. 编辑 `fpUtils.js` 实现功能
2. 运行测试：`pnpm test chapters/05-advanced-functions/challenges`
3. 所有测试通过即为完成

## 💡 提示

- curry 需要递归收集参数
- memoize 的 LRU 可以用 Map 实现
- debounce 要支持 cancel 和 flush
