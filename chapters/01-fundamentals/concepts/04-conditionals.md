# 条件语句

## 核心概念

条件语句根据不同条件执行不同的代码分支。

## if 语句

### 基本形式

```javascript
if (condition) {
  // 条件为真时执行
}
```

### if...else

```javascript
const age = 20;

if (age >= 18) {
  console.log('成年人');
} else {
  console.log('未成年人');
}
```

### if...else if...else

```javascript
const score = 85;

if (score >= 90) {
  console.log('优秀');
} else if (score >= 80) {
  console.log('良好');
} else if (score >= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}
```

## switch 语句

```javascript
const day = 'Monday';

switch (day) {
  case 'Monday':
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
  case 'Friday':
    console.log('工作日');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('周末');
    break;
  default:
    console.log('无效的日期');
}
```

### switch 注意事项

```javascript
// 1. 使用严格相等 ===
switch (value) {
  case '1':  // 不会匹配数字 1
    break;
}

// 2. 不要忘记 break
switch (x) {
  case 1:
    doSomething();
    // 没有 break，会继续执行下一个 case（fall-through）
  case 2:
    doSomethingElse();
    break;
}

// 3. default 可以放在任意位置，但建议放最后
```

## 三元运算符

```javascript
// 简单条件
const status = age >= 18 ? '成年' : '未成年';

// 等价于
let status;
if (age >= 18) {
  status = '成年';
} else {
  status = '未成年';
}
```

### 适用场景

```javascript
// ✅ 简单的二选一
const message = isLoggedIn ? '欢迎回来' : '请登录';

// ✅ 函数参数
greet(isMorning ? '早上好' : '你好');

// ❌ 避免嵌套过深
const result = a ? b ? c : d : e; // 难以阅读
```

## 真值和假值

### 假值（Falsy）

```javascript
// 以下值在布尔上下文中为 false
false
0
-0
0n        // BigInt 零
''        // 空字符串
null
undefined
NaN
```

### 真值（Truthy）

```javascript
// 除假值外的所有值都是真值
true
1
'hello'
[]        // 空数组也是真值！
{}        // 空对象也是真值！
function() {}
```

### 实际应用

```javascript
// 检查字符串是否非空
if (username) {
  console.log(`Hello, ${username}`);
}

// 检查数组是否有元素
if (items.length) {
  processItems(items);
}

// 提供默认值
const name = inputName || 'Anonymous';
```

## 逻辑运算符的条件用法

### && 短路执行

```javascript
// 条件执行
isLoggedIn && showDashboard();

// 等价于
if (isLoggedIn) {
  showDashboard();
}
```

### || 默认值

```javascript
// 提供默认值
const name = userName || 'Guest';

// 注意：0 和 '' 也会触发默认值
const count = inputCount || 10; // 如果 inputCount 是 0，会变成 10
```

### ?? 空值合并

```javascript
// 只在 null/undefined 时使用默认值
const count = inputCount ?? 10; // 如果 inputCount 是 0，保持 0
```

## 条件语句最佳实践

### 1. 提前返回，减少嵌套

```javascript
// ❌ 嵌套过深
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // 处理逻辑
      }
    }
  }
}

// ✅ 提前返回
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;
  
  // 处理逻辑
}
```

### 2. 使用对象映射代替长 switch

```javascript
// ❌ 冗长的 switch
function getStatusText(status) {
  switch (status) {
    case 'pending': return '待处理';
    case 'approved': return '已批准';
    case 'rejected': return '已拒绝';
    default: return '未知';
  }
}

// ✅ 对象映射
const statusMap = {
  pending: '待处理',
  approved: '已批准',
  rejected: '已拒绝'
};

function getStatusText(status) {
  return statusMap[status] ?? '未知';
}
```

### 3. 避免 Yoda 条件

```javascript
// ❌ Yoda 风格
if ('admin' === role) {}

// ✅ 正常顺序
if (role === 'admin') {}
```

### 4. 使用描述性变量

```javascript
// ❌ 难以理解
if (user.age >= 18 && user.country === 'CN' && user.verified) {}

// ✅ 使用描述性变量
const isAdult = user.age >= 18;
const isFromChina = user.country === 'CN';
const isVerified = user.verified;

if (isAdult && isFromChina && isVerified) {}
```

## 常见错误

### 1. 赋值 vs 比较

```javascript
// ❌ 错误：这是赋值，不是比较
if (x = 5) {} // 总是为真

// ✅ 正确
if (x === 5) {}
```

### 2. 忘记 break

```javascript
switch (x) {
  case 1:
    doA();
    // 忘记 break，会继续执行 case 2
  case 2:
    doB();
    break;
}
```

### 3. 空数组/对象是真值

```javascript
// ❌ 这个条件总是为真
if ([]) {
  console.log('空数组是真值！');
}

// ✅ 检查长度
if (arr.length) {
  console.log('数组有元素');
}
```

---

## 练习预告

完成阅读后，请前往 `exercises/04-conditionals.js` 完成练习题。
