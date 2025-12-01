# 错误处理最佳实践

## 1. 区分操作错误和程序错误

### 操作错误

预期可能发生的运行时问题：

```javascript
// 网络失败、文件不存在、用户输入无效
class OperationalError extends Error {
  constructor(message) {
    super(message);
    this.isOperational = true;
  }
}
```

### 程序错误

代码 bug，应该修复而非处理：

```javascript
// null 引用、类型错误、断言失败
// 这些应该导致程序崩溃并修复
```

## 2. 使用有意义的错误消息

```javascript
// 不好
throw new Error('Error');
throw new Error('Failed');

// 好
throw new Error('Failed to connect to database: connection timeout after 30s');
throw new Error(`User ${userId} not found in database`);
```

## 3. 包含上下文信息

```javascript
class ApiError extends Error {
  constructor(message, context) {
    super(message);
    this.name = 'ApiError';
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

throw new ApiError('Request failed', {
  url: '/api/users',
  method: 'POST',
  statusCode: 500,
  requestId: 'abc123'
});
```

## 4. 使用错误链

```javascript
async function getUser(id) {
  try {
    return await database.findUser(id);
  } catch (error) {
    throw new Error(`Failed to get user ${id}`, { cause: error });
  }
}

// 处理时可以访问完整链
try {
  await getUser(123);
} catch (error) {
  console.log(error.message);        // 'Failed to get user 123'
  console.log(error.cause?.message); // 原始数据库错误
}
```

## 5. 集中错误处理

```javascript
// 错误处理中间件（Express 示例）
function errorHandler(error, req, res, next) {
  // 记录错误
  logger.error({
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  // 确定状态码
  const statusCode = error.statusCode || 500;

  // 发送响应
  res.status(statusCode).json({
    error: {
      message: error.isOperational ? error.message : 'Internal server error',
      code: error.code
    }
  });
}

app.use(errorHandler);
```

## 6. 不要吞掉错误

```javascript
// 不好 - 错误被吞掉
try {
  riskyOperation();
} catch (error) {
  // 什么都不做
}

// 好 - 至少记录
try {
  riskyOperation();
} catch (error) {
  logger.error('Operation failed:', error);
  // 或重新抛出
  throw error;
}
```

## 7. 使用断言进行早期失败

```javascript
function processOrder(order) {
  // 前置条件检查
  if (!order) throw new Error('Order is required');
  if (!order.items?.length) throw new Error('Order must have items');
  if (order.total < 0) throw new Error('Order total cannot be negative');

  // 业务逻辑...
}
```

## 8. 优雅降级

```javascript
async function getConfig() {
  try {
    return await fetchRemoteConfig();
  } catch (error) {
    logger.warn('Using default config:', error.message);
    return defaultConfig;
  }
}
```

## 9. 错误边界

```javascript
class ErrorBoundary {
  constructor(fallback) {
    this.fallback = fallback;
  }

  async run(fn) {
    try {
      return await fn();
    } catch (error) {
      this.handleError(error);
      return this.fallback;
    }
  }

  handleError(error) {
    // 记录、报告等
    console.error('ErrorBoundary caught:', error);
  }
}

const boundary = new ErrorBoundary({ data: [] });
const result = await boundary.run(() => fetchData());
```

## 10. 清理资源

```javascript
async function processFile(path) {
  const file = await openFile(path);
  try {
    await processContent(file);
  } finally {
    await file.close();  // 确保关闭
  }
}

// 使用 using 声明（Stage 3 提案）
async function processFile(path) {
  await using file = await openFile(path);
  await processContent(file);
  // 自动清理
}
```

## 11. 错误监控和报告

```javascript
function reportError(error, context = {}) {
  // 发送到错误追踪服务
  errorTracker.captureException(error, {
    extra: context,
    tags: {
      environment: process.env.NODE_ENV,
      version: process.env.APP_VERSION
    }
  });
}

window.onerror = (message, source, line, column, error) => {
  reportError(error, { source, line, column });
};
```

## 12. 测试错误处理

```javascript
describe('UserService', () => {
  it('should throw NotFoundError when user does not exist', async () => {
    await expect(userService.getUser('invalid-id'))
      .rejects.toThrow(NotFoundError);
  });

  it('should include user id in error message', async () => {
    await expect(userService.getUser('123'))
      .rejects.toThrow('User 123 not found');
  });
});
```

---

完成概念学习后，前往 `exercises/` 目录完成练习。
