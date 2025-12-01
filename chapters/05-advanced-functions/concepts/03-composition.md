# 函数组合

## 核心概念

函数组合（Function Composition）是将多个函数组合成一个函数，每个函数的输出作为下一个函数的输入。

```javascript
// 数学表示: f(g(x))
const f = x => x + 1;
const g = x => x * 2;

// 手动组合
const composed = x => f(g(x));
composed(5);  // 11 (5 * 2 + 1)
```

## compose 函数

从右向左执行函数：

```javascript
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// 或者更简洁
const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x);

// 使用
const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const compute = compose(add1, double, square);
compute(3);  // 19: square(3)=9 -> double(9)=18 -> add1(18)=19
```

## pipe 函数

从左向右执行函数（更直观）：

```javascript
const pipe = (...fns) => x => 
  fns.reduce((acc, fn) => fn(acc), x);

// 使用
const compute = pipe(square, double, add1);
compute(3);  // 19: square(3)=9 -> double(9)=18 -> add1(18)=19

// 数据流更清晰
const processUser = pipe(
  validateInput,
  sanitizeData,
  saveToDatabase,
  sendNotification
);
```

## 实用示例

### 字符串处理

```javascript
const trim = s => s.trim();
const toLowerCase = s => s.toLowerCase();
const split = separator => s => s.split(separator);
const join = separator => arr => arr.join(separator);

const slugify = pipe(
  trim,
  toLowerCase,
  split(' '),
  join('-')
);

slugify('  Hello World  ');  // 'hello-world'
```

### 数据转换

```javascript
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

const prop = key => obj => obj[key];
const filter = pred => arr => arr.filter(pred);
const map = fn => arr => arr.map(fn);

const getActiveUserNames = pipe(
  filter(prop('active')),
  map(prop('name'))
);

getActiveUserNames(users);  // ['Alice', 'Charlie']
```

### 数值计算

```javascript
const add = a => b => a + b;
const multiply = a => b => a * b;
const subtract = a => b => b - a;

const calculate = pipe(
  add(10),      // x + 10
  multiply(2),  // * 2
  subtract(5)   // - 5
);

calculate(5);  // ((5 + 10) * 2) - 5 = 25
```

## 异步组合

### 异步 pipe

```javascript
const pipeAsync = (...fns) => x =>
  fns.reduce(
    (promise, fn) => promise.then(fn),
    Promise.resolve(x)
  );

// 使用
const fetchUser = async id => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
};

const processUser = user => ({
  ...user,
  processed: true
});

const saveUser = async user => {
  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  });
  return user;
};

const handleUser = pipeAsync(
  fetchUser,
  processUser,
  saveUser
);

handleUser(1);  // 返回 Promise
```

## 条件组合

```javascript
const when = (pred, fn) => x => pred(x) ? fn(x) : x;
const unless = (pred, fn) => x => pred(x) ? x : fn(x);

const isEven = n => n % 2 === 0;
const double = n => n * 2;

const doubleIfEven = when(isEven, double);

doubleIfEven(4);  // 8
doubleIfEven(3);  // 3
```

## 调试组合

```javascript
const tap = fn => x => {
  fn(x);
  return x;
};

const log = label => tap(x => console.log(`${label}:`, x));

const process = pipe(
  add(1),
  log('After add'),
  multiply(2),
  log('After multiply')
);

process(5);
// After add: 6
// After multiply: 12
```

## Point-free 风格

```javascript
// 有 point（参数）
const getNames = users => users.map(user => user.name);

// Point-free
const prop = key => obj => obj[key];
const map = fn => arr => arr.map(fn);
const getNames = map(prop('name'));

// 使用
getNames([{ name: 'Alice' }, { name: 'Bob' }]);
// ['Alice', 'Bob']
```

---

## 练习预告

继续学习 [04-memoization.md](./04-memoization.md) →
