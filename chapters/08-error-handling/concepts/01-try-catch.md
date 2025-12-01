# try/catch/finally

## 基本语法

```javascript
try {
  // 可能抛出错误的代码
  riskyOperation();
} catch (error) {
  // 错误处理
  console.error('Error:', error.message);
} finally {
  // 总是执行（可选）
  cleanup();
}
```

## try 块

```javascript
try {
  const data = JSON.parse(invalidJson);
  processData(data);
}
```

- 包含可能抛出错误的代码
- 错误发生时立即跳转到 catch
- 后续代码不会执行

## catch 块

```javascript
try {
  // ...
} catch (error) {
  // error 是 Error 对象
  console.log(error.name);     // 'TypeError'
  console.log(error.message);  // 错误描述
  console.log(error.stack);    // 调用栈
}
```

### 可选的错误变量（ES2019）

```javascript
try {
  doSomething();
} catch {
  // 不需要错误对象时可以省略
  console.log('An error occurred');
}
```

## finally 块

```javascript
function readFile(path) {
  let file;
  try {
    file = openFile(path);
    return processFile(file);
  } catch (error) {
    throw new Error(`Failed to read ${path}`);
  } finally {
    // 无论成功失败都会执行
    if (file) {
      file.close();
    }
  }
}
```

### finally 的特性

```javascript
function example() {
  try {
    return 'try';
  } finally {
    console.log('finally runs');  // 会执行
  }
}
// 输出 'finally runs'，返回 'try'

function example2() {
  try {
    return 'try';
  } finally {
    return 'finally';  // 会覆盖 try 的返回值
  }
}
// 返回 'finally'
```

## 抛出错误

### throw 语句

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}
```

### 可以抛出任何值

```javascript
throw 'Error message';           // 字符串
throw 42;                        // 数字
throw { code: 'ERR', msg: '' }; // 对象
throw new Error('message');      // Error 对象（推荐）
```

## 错误传播

```javascript
function level1() {
  throw new Error('Error from level1');
}

function level2() {
  level1();  // 错误向上传播
}

function level3() {
  try {
    level2();
  } catch (error) {
    console.log(error.message);  // 'Error from level1'
  }
}
```

## 重新抛出

```javascript
function process() {
  try {
    riskyOperation();
  } catch (error) {
    if (error instanceof ValidationError) {
      // 处理验证错误
      console.log('Validation failed');
    } else {
      // 其他错误重新抛出
      throw error;
    }
  }
}
```

## 嵌套 try/catch

```javascript
try {
  try {
    throw new Error('Inner error');
  } catch (innerError) {
    // 处理内部错误
    throw new Error('Wrapped: ' + innerError.message);
  }
} catch (outerError) {
  console.log(outerError.message);  // 'Wrapped: Inner error'
}
```

## 常见模式

### 安全的 JSON 解析

```javascript
function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
```

### 资源清理

```javascript
async function withConnection(fn) {
  const conn = await getConnection();
  try {
    return await fn(conn);
  } finally {
    await conn.close();
  }
}
```

### 错误收集

```javascript
function processAll(items) {
  const errors = [];
  const results = [];

  for (const item of items) {
    try {
      results.push(processItem(item));
    } catch (error) {
      errors.push({ item, error });
    }
  }

  if (errors.length > 0) {
    console.warn(`${errors.length} items failed`);
  }

  return { results, errors };
}
```

---

继续学习 [02-error-types.md](./02-error-types.md) →
