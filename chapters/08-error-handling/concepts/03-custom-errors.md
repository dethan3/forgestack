# 自定义错误

## 为什么需要自定义错误

- 更精确的错误类型识别
- 携带额外的上下文信息
- 更好的错误处理流程
- 提高代码可读性

## 基本自定义错误

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

throw new ValidationError('Email is invalid');
```

## 完整的自定义错误类

```javascript
class AppError extends Error {
  constructor(message, options = {}) {
    super(message, { cause: options.cause });

    this.name = this.constructor.name;
    this.code = options.code || 'UNKNOWN_ERROR';
    this.statusCode = options.statusCode || 500;
    this.isOperational = options.isOperational ?? true;

    // 捕获正确的堆栈跟踪
    Error.captureStackTrace?.(this, this.constructor);
  }
}

// 使用
throw new AppError('User not found', {
  code: 'USER_NOT_FOUND',
  statusCode: 404
});
```

## 错误层级结构

```javascript
// 基础应用错误
class AppError extends Error {
  constructor(message, options = {}) {
    super(message, { cause: options.cause });
    this.name = this.constructor.name;
    this.code = options.code;
  }
}

// 验证错误
class ValidationError extends AppError {
  constructor(message, field) {
    super(message, { code: 'VALIDATION_ERROR' });
    this.field = field;
  }
}

// 数据库错误
class DatabaseError extends AppError {
  constructor(message, query) {
    super(message, { code: 'DATABASE_ERROR' });
    this.query = query;
  }
}

// HTTP 错误
class HttpError extends AppError {
  constructor(statusCode, message) {
    super(message, { code: `HTTP_${statusCode}` });
    this.statusCode = statusCode;
  }
}

class NotFoundError extends HttpError {
  constructor(resource) {
    super(404, `${resource} not found`);
    this.resource = resource;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}
```

## 使用自定义错误

```javascript
function findUser(id) {
  const user = db.find(id);
  if (!user) {
    throw new NotFoundError('User');
  }
  return user;
}

function validateEmail(email) {
  if (!email.includes('@')) {
    throw new ValidationError('Invalid email format', 'email');
  }
}

// 统一错误处理
function handleError(error) {
  if (error instanceof ValidationError) {
    return { status: 400, field: error.field, message: error.message };
  }

  if (error instanceof NotFoundError) {
    return { status: 404, message: error.message };
  }

  if (error instanceof UnauthorizedError) {
    return { status: 401, message: error.message };
  }

  // 未知错误
  console.error('Unexpected error:', error);
  return { status: 500, message: 'Internal server error' };
}
```

## 错误工厂

```javascript
const errors = {
  validation: (field, message) =>
    new ValidationError(message, field),

  notFound: (resource) =>
    new NotFoundError(resource),

  unauthorized: (message) =>
    new UnauthorizedError(message),

  database: (message, query) =>
    new DatabaseError(message, query)
};

// 使用
throw errors.validation('email', 'Invalid format');
throw errors.notFound('User');
```

## 错误代码枚举

```javascript
const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR'
};

class AppError extends Error {
  constructor(code, message, options = {}) {
    super(message);
    this.code = code;
    this.details = options.details;
  }

  static validation(message, details) {
    return new AppError(ErrorCodes.VALIDATION_ERROR, message, { details });
  }

  static notFound(message) {
    return new AppError(ErrorCodes.NOT_FOUND, message);
  }
}

// 使用
throw AppError.validation('Invalid input', { field: 'email' });
```

## 序列化错误

```javascript
class SerializableError extends Error {
  constructor(message, data = {}) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      data: this.data,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
    };
  }
}
```

## 错误断言

```javascript
function assert(condition, ErrorClass, ...args) {
  if (!condition) {
    throw new ErrorClass(...args);
  }
}

// 使用
assert(user, NotFoundError, 'User');
assert(user.isAdmin, UnauthorizedError, 'Admin access required');
```

---

继续学习 [04-async-errors.md](./04-async-errors.md) →
