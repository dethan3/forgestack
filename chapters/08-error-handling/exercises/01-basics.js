/**
 * 练习 01：错误处理基础
 *
 * 学习目标：
 * - 使用 try/catch/finally
 * - 抛出和捕获错误
 * - 理解错误属性
 */

// ============================================
// 练习 1：基本 try/catch
// ============================================

/**
 * 安全解析 JSON
 * @param {string} str - JSON 字符串
 * @param {*} fallback - 解析失败时的默认值
 */
export function safeJsonParse(str, fallback = null) {
  // TODO: 实现
}

/**
 * 安全访问嵌套属性
 * @param {Object} obj - 对象
 * @param {string} path - 属性路径，如 'a.b.c'
 * @param {*} defaultValue - 默认值
 */
export function safeGet(obj, path, defaultValue = undefined) {
  // TODO: 实现
}

/**
 * 安全执行函数
 * @param {Function} fn - 要执行的函数
 * @param {*} fallback - 出错时的默认值
 */
export function safeExecute(fn, fallback = null) {
  // TODO: 实现
}

// ============================================
// 练习 2：抛出错误
// ============================================

/**
 * 验证必填字段
 * 如果 value 为 null/undefined/空字符串，抛出 Error
 * @param {*} value - 要验证的值
 * @param {string} fieldName - 字段名
 */
export function requireField(value, fieldName) {
  // TODO: 实现
  // 抛出 Error(`${fieldName} is required`)
}

/**
 * 验证数字范围
 * @param {number} value - 数字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 */
export function validateRange(value, min, max) {
  // TODO: 实现
  // 不是数字抛出 TypeError
  // 超出范围抛出 RangeError
}

/**
 * 验证数组不为空
 * @param {Array} arr - 数组
 * @param {string} name - 数组名称
 */
export function requireNonEmpty(arr, name = 'Array') {
  // TODO: 实现
  // 不是数组抛出 TypeError
  // 空数组抛出 Error
}

// ============================================
// 练习 3：finally 块
// ============================================

/**
 * 模拟资源管理
 * @param {Function} useFn - 使用资源的函数
 */
export function withResource(useFn) {
  // TODO: 实现
  // 1. 创建资源对象 { isOpen: true, data: [] }
  // 2. 调用 useFn(resource)
  // 3. finally 中设置 isOpen = false
  // 4. 返回资源对象
}

/**
 * 计时执行
 * @param {Function} fn - 要执行的函数
 * @returns {{ result: *, duration: number, error: Error|null }}
 */
export function timedExecution(fn) {
  // TODO: 实现
  // 使用 finally 确保总是记录时间
}

// ============================================
// 练习 4：错误类型检查
// ============================================

/**
 * 根据错误类型返回不同的错误码
 * @param {Error} error
 * @returns {string} 错误码
 */
export function getErrorCode(error) {
  // TODO: 实现
  // SyntaxError -> 'SYNTAX_ERROR'
  // TypeError -> 'TYPE_ERROR'
  // RangeError -> 'RANGE_ERROR'
  // ReferenceError -> 'REFERENCE_ERROR'
  // 其他 -> 'UNKNOWN_ERROR'
}

/**
 * 判断是否可以重试
 * @param {Error} error
 * @returns {boolean}
 */
export function isRetryable(error) {
  // TODO: 实现
  // 网络错误（message 包含 'network' 或 'timeout'）可重试
  // 其他错误不可重试
}

// ============================================
// 练习 5：错误转换
// ============================================

/**
 * 将错误转换为用户友好的消息
 * @param {Error} error
 * @returns {string}
 */
export function toUserMessage(error) {
  // TODO: 实现
  // SyntaxError -> '数据格式错误'
  // TypeError -> '操作类型错误'
  // RangeError -> '数值超出范围'
  // 包含 'network' -> '网络连接失败'
  // 包含 'timeout' -> '请求超时'
  // 其他 -> '发生未知错误'
}

/**
 * 将错误序列化为对象
 * @param {Error} error
 * @returns {Object}
 */
export function serializeError(error) {
  // TODO: 实现
  // 返回 { name, message, stack, code? }
}
