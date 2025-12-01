# 综合挑战 01：错误处理系统

## 🎯 挑战目标

实现一个完整的错误处理系统。

## 📋 需求说明

实现 `errorSystem.js` 中的各个类和函数：

### 1. 错误层级

```javascript
class AppError extends Error { }
class NetworkError extends AppError { }
class ValidationError extends AppError { }
class AuthenticationError extends AppError { }
class AuthorizationError extends AppError { }
```

### 2. 错误管理器

```javascript
const manager = new ErrorManager();

// 注册错误处理器
manager.register(ValidationError, (error) => ({
  status: 400,
  message: error.message
}));

// 处理错误
const response = manager.handle(error);
```

### 3. 全局错误收集器

```javascript
const collector = new ErrorCollector();

collector.capture(error, { context: 'user-service' });
collector.getErrors();  // 获取所有错误
collector.getErrorsByType(ValidationError);
collector.clear();
```

### 4. 异步错误边界

```javascript
const boundary = new AsyncErrorBoundary({
  onError: (error) => console.error(error),
  fallback: defaultValue
});

const result = await boundary.run(async () => {
  // 可能出错的代码
});
```

## ⏱️ 预计时间

60-90 分钟

## 🚀 开始挑战

1. 编辑 `errorSystem.js` 实现功能
2. 运行测试：`pnpm test chapters/08-error-handling/challenges`
3. 所有测试通过即为完成

## 💡 提示

- 使用 Map 存储错误处理器
- instanceof 检查错误类型
- 考虑错误类的继承关系
