/**
 * 练习 02：自定义错误
 *
 * 学习目标：
 * - 创建自定义错误类
 * - 实现错误层级
 * - 添加额外属性
 */

// ============================================
// 练习 1：基础自定义错误
// ============================================

/**
 * 应用程序基础错误类
 * - name: 'AppError'
 * - code: 错误码
 * - isOperational: 是否为操作错误（默认 true）
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN') {
    // TODO: 实现
  }
}

/**
 * 验证错误
 * - name: 'ValidationError'
 * - code: 'VALIDATION_ERROR'
 * - field: 验证失败的字段名
 */
export class ValidationError extends AppError {
  constructor(message, field) {
    // TODO: 实现
  }
}

/**
 * 未找到错误
 * - name: 'NotFoundError'
 * - code: 'NOT_FOUND'
 * - resource: 未找到的资源名
 */
export class NotFoundError extends AppError {
  constructor(resource) {
    // TODO: 实现
    // message: `${resource} not found`
  }
}

// ============================================
// 练习 2：HTTP 错误
// ============================================

/**
 * HTTP 错误基类
 * - statusCode: HTTP 状态码
 * - code: `HTTP_${statusCode}`
 */
export class HttpError extends AppError {
  constructor(statusCode, message) {
    // TODO: 实现
  }
}

/**
 * 400 Bad Request
 */
export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    // TODO: 实现
  }
}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    // TODO: 实现
  }
}

/**
 * 403 Forbidden
 */
export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    // TODO: 实现
  }
}

/**
 * 404 Not Found
 */
export class HttpNotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    // TODO: 实现
  }
}

// ============================================
// 练习 3：错误工厂
// ============================================

/**
 * 创建错误工厂
 * @returns {Object} 包含各种创建错误的方法
 */
export function createErrorFactory() {
  // TODO: 实现
  // 返回对象包含:
  // - validation(field, message) -> ValidationError
  // - notFound(resource) -> NotFoundError
  // - unauthorized(message) -> UnauthorizedError
  // - badRequest(message) -> BadRequestError
}

// ============================================
// 练习 4：错误处理器
// ============================================

/**
 * 错误处理器
 * 根据错误类型返回适当的响应对象
 * @param {Error} error
 * @returns {{ status: number, code: string, message: string }}
 */
export function handleError(error) {
  // TODO: 实现
  // HttpError -> { status: statusCode, code, message }
  // ValidationError -> { status: 400, code, message, field }
  // NotFoundError -> { status: 404, code, message }
  // AppError -> { status: 500, code, message }
  // 其他 -> { status: 500, code: 'INTERNAL_ERROR', message: 'Internal Server Error' }
}

// ============================================
// 练习 5：断言函数
// ============================================

/**
 * 断言条件为真，否则抛出错误
 * @param {boolean} condition
 * @param {typeof Error} ErrorClass - 错误类
 * @param {...any} args - 传给错误类的参数
 */
export function assert(condition, ErrorClass, ...args) {
  // TODO: 实现
}

/**
 * 断言值存在（非 null/undefined）
 * @param {*} value
 * @param {string} name - 值的名称
 * @returns {*} 返回原值（类型断言）
 */
export function assertExists(value, name) {
  // TODO: 实现
  // 不存在时抛出 NotFoundError
}

/**
 * 断言值的类型
 * @param {*} value
 * @param {string} expectedType - 'string' | 'number' | 'boolean' | 'object' | 'function'
 * @param {string} name
 */
export function assertType(value, expectedType, name) {
  // TODO: 实现
  // 类型不匹配抛出 TypeError
}
