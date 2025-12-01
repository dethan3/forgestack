# 错误类型

## Error 基类

```javascript
const error = new Error('Something went wrong');

error.name;     // 'Error'
error.message;  // 'Something went wrong'
error.stack;    // 调用栈信息
```

## 内置错误类型

### SyntaxError

语法错误，通常在解析时发生：

```javascript
JSON.parse('{invalid}');  // SyntaxError
eval('if(');              // SyntaxError
```

### TypeError

类型错误，操作的值类型不正确：

```javascript
null.foo;           // TypeError: Cannot read property 'foo' of null
undefined();        // TypeError: undefined is not a function
const x = 1; x();   // TypeError: x is not a function
```

### ReferenceError

引用错误，访问不存在的变量：

```javascript
console.log(undeclaredVar);  // ReferenceError
```

### RangeError

范围错误，数值超出范围：

```javascript
new Array(-1);              // RangeError
(1).toFixed(101);           // RangeError
function f() { f(); } f();  // RangeError: Maximum call stack
```

### URIError

URI 处理错误：

```javascript
decodeURIComponent('%');  // URIError
```

### EvalError

eval 相关错误（现代 JS 很少遇到）

### AggregateError（ES2021）

多个错误的聚合：

```javascript
Promise.any([
  Promise.reject(new Error('Error 1')),
  Promise.reject(new Error('Error 2'))
]).catch(error => {
  console.log(error instanceof AggregateError);  // true
  console.log(error.errors);  // [Error: Error 1, Error: Error 2]
});
```

## 错误属性

### 标准属性

```javascript
const error = new Error('message');

error.name;     // 错误类型名称
error.message;  // 错误描述
error.stack;    // 调用栈（非标准但广泛支持）
```

### cause 属性（ES2022）

```javascript
try {
  readFile();
} catch (error) {
  throw new Error('Failed to initialize', { cause: error });
}

// 捕获时可以访问原始错误
try {
  initialize();
} catch (error) {
  console.log(error.message);        // 'Failed to initialize'
  console.log(error.cause.message);  // 原始错误信息
}
```

## 错误类型检查

### instanceof

```javascript
try {
  JSON.parse('{invalid}');
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log('Invalid JSON');
  } else if (error instanceof TypeError) {
    console.log('Type error');
  } else {
    throw error;  // 未知错误重新抛出
  }
}
```

### name 属性

```javascript
try {
  riskyOperation();
} catch (error) {
  switch (error.name) {
    case 'TypeError':
      handleTypeError(error);
      break;
    case 'RangeError':
      handleRangeError(error);
      break;
    default:
      throw error;
  }
}
```

## 错误继承关系

```
Error
├── SyntaxError
├── TypeError
├── ReferenceError
├── RangeError
├── URIError
├── EvalError
└── AggregateError
```

## 创建错误而不抛出

```javascript
function validate(value) {
  if (!value) {
    // 创建但不抛出，用于记录
    const error = new Error('Validation failed');
    console.warn(error.stack);
    return false;
  }
  return true;
}
```

## 捕获特定错误

```javascript
function handleError(error) {
  // 网络错误
  if (error.name === 'NetworkError' || error.message.includes('network')) {
    return retryOperation();
  }

  // 验证错误
  if (error instanceof ValidationError) {
    return showValidationMessage(error);
  }

  // 未知错误
  reportToService(error);
  throw error;
}
```

---

继续学习 [03-custom-errors.md](./03-custom-errors.md) →
