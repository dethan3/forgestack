# 字符串方法

## 核心概念

字符串是不可变的，所有方法都返回新字符串，不修改原字符串。

## 常用属性和方法

### length 属性

```javascript
'hello'.length;  // 5
'你好'.length;   // 2
```

## 查找方法

### includes() / startsWith() / endsWith()

```javascript
const str = 'Hello, World!';

str.includes('World');     // true
str.startsWith('Hello');   // true
str.endsWith('!');         // true

// 可指定起始位置
str.includes('World', 8);  // false
```

### indexOf() / lastIndexOf()

```javascript
const str = 'hello world hello';

str.indexOf('hello');      // 0
str.lastIndexOf('hello');  // 12
str.indexOf('xyz');        // -1（未找到）
```

## 提取方法

### slice()

```javascript
const str = 'Hello, World!';

str.slice(0, 5);    // 'Hello'
str.slice(7);       // 'World!'
str.slice(-6);      // 'World!'
str.slice(-6, -1);  // 'World'
```

### substring()

```javascript
const str = 'Hello, World!';

str.substring(0, 5);  // 'Hello'
str.substring(7);     // 'World!'
// 不支持负数索引
```

### substr()（已废弃，避免使用）

## 转换方法

### toUpperCase() / toLowerCase()

```javascript
'Hello'.toUpperCase();  // 'HELLO'
'Hello'.toLowerCase();  // 'hello'
```

### trim() / trimStart() / trimEnd()

```javascript
'  hello  '.trim();       // 'hello'
'  hello  '.trimStart();  // 'hello  '
'  hello  '.trimEnd();    // '  hello'
```

### padStart() / padEnd()

```javascript
'5'.padStart(3, '0');   // '005'
'5'.padEnd(3, '0');     // '500'
'hello'.padStart(10);   // '     hello'
```

### repeat()

```javascript
'ab'.repeat(3);  // 'ababab'
'-'.repeat(10);  // '----------'
```

## 分割和连接

### split()

```javascript
'a,b,c'.split(',');       // ['a', 'b', 'c']
'hello'.split('');        // ['h', 'e', 'l', 'l', 'o']
'a-b-c'.split('-', 2);    // ['a', 'b']（限制数量）
```

### 数组的 join()

```javascript
['a', 'b', 'c'].join('-');  // 'a-b-c'
['a', 'b', 'c'].join('');   // 'abc'
```

## 替换方法

### replace() / replaceAll()

```javascript
'hello world'.replace('world', 'JS');     // 'hello JS'
'aaa'.replace('a', 'b');                  // 'baa'（只替换第一个）
'aaa'.replaceAll('a', 'b');               // 'bbb'（替换全部）

// 使用正则表达式
'aaa'.replace(/a/g, 'b');                 // 'bbb'
```

## 模板字符串

### 基本用法

```javascript
const name = 'Alice';
const age = 25;

// 模板字符串
const msg = `${name} is ${age} years old`;

// 多行字符串
const html = `
  <div>
    <p>${name}</p>
  </div>
`;
```

### 表达式

```javascript
const a = 10, b = 20;
`Sum: ${a + b}`;           // 'Sum: 30'
`Status: ${a > b ? 'A' : 'B'}`;  // 'Status: B'
```

## 实用技巧

### 字符串转数组处理

```javascript
// 反转字符串
'hello'.split('').reverse().join('');  // 'olleh'

// 统计字符
'hello'.split('').filter(c => c === 'l').length;  // 2
```

### 首字母大写

```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
capitalize('hello');  // 'Hello'
```

---

## 练习预告

继续学习 [03-arrays.md](./03-arrays.md) →
