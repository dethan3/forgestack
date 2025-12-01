/**
 * 综合挑战 01：函数式工具库
 *
 * 实现一个完整的函数式编程工具库
 */

// ============================================
// 1. 函数组合
// ============================================

/**
 * 从右向左组合函数
 * @param {...Function} fns - 要组合的函数
 * @returns {Function} 组合后的函数
 */
export function compose(...fns) {
  // TODO: 实现 compose
}

/**
 * 从左向右组合函数
 * @param {...Function} fns - 要组合的函数
 * @returns {Function} 组合后的函数
 */
export function pipe(...fns) {
  // TODO: 实现 pipe
}

// ============================================
// 2. 柯里化
// ============================================

/**
 * 通用柯里化函数
 * 支持多种调用方式：curry(fn)(a)(b)(c) 或 curry(fn)(a, b)(c)
 * @param {Function} fn - 要柯里化的函数
 * @returns {Function} 柯里化后的函数
 */
export function curry(fn) {
  // TODO: 实现通用柯里化
}

// ============================================
// 3. 记忆化
// ============================================

/**
 * 带选项的记忆化
 * @param {Function} fn - 要记忆的函数
 * @param {Object} options - 选项
 * @param {number} options.maxSize - 最大缓存数量（LRU）
 * @param {number} options.ttl - 缓存有效期（毫秒）
 * @param {Function} options.keyResolver - 自定义缓存键生成器
 * @returns {Function} 记忆化后的函数
 */
export function memoize(fn, options = {}) {
  // TODO: 实现带选项的记忆化
  // 支持 maxSize（LRU 淘汰）和 ttl（过期时间）
}

// ============================================
// 4. 防抖
// ============================================

/**
 * 完整的防抖实现
 * @param {Function} fn - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {Object} options - 选项
 * @param {boolean} options.leading - 是否在开始时执行
 * @param {boolean} options.trailing - 是否在结束时执行
 * @returns {Function} 防抖后的函数（带 cancel 和 flush 方法）
 */
export function debounce(fn, wait, options = {}) {
  // TODO: 实现完整的防抖
  // 返回的函数需要有 cancel() 和 flush() 方法
}

// ============================================
// 5. 节流
// ============================================

/**
 * 完整的节流实现
 * @param {Function} fn - 要节流的函数
 * @param {number} wait - 间隔时间（毫秒）
 * @param {Object} options - 选项
 * @param {boolean} options.leading - 是否在开始时执行
 * @param {boolean} options.trailing - 是否在结束时执行
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, wait, options = {}) {
  // TODO: 实现完整的节流
}
