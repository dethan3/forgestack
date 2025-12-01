/**
 * 练习 03：实用工具函数
 *
 * 学习目标：
 * - 实现函数组合
 * - 实现记忆化
 * - 实现防抖和节流
 */

// ============================================
// 练习 1：函数组合
// ============================================

/**
 * 实现 compose（从右向左执行）
 * compose(f, g, h)(x) = f(g(h(x)))
 */
export function compose(...fns) {
  // TODO: 从右向左组合函数
}

/**
 * 实现 pipe（从左向右执行）
 * pipe(f, g, h)(x) = h(g(f(x)))
 */
export function pipe(...fns) {
  // TODO: 从左向右组合函数
}

// ============================================
// 练习 2：记忆化
// ============================================

/**
 * 实现基本记忆化
 */
export function memoize(fn) {
  // TODO: 缓存计算结果
}

/**
 * 实现带 TTL 的记忆化
 * @param {Function} fn - 要记忆的函数
 * @param {number} ttl - 缓存有效期（毫秒）
 */
export function memoizeWithTTL(fn, ttl) {
  // TODO: 带过期时间的缓存
}

// ============================================
// 练习 3：防抖
// ============================================

/**
 * 实现防抖函数
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 */
export function debounce(fn, delay) {
  // TODO: 实现防抖
}

/**
 * 实现带立即执行选项的防抖
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 */
export function debounceImmediate(fn, delay, immediate = false) {
  // TODO: 实现带立即执行的防抖
}

// ============================================
// 练习 4：节流
// ============================================

/**
 * 实现节流函数
 * @param {Function} fn - 要节流的函数
 * @param {number} interval - 间隔时间（毫秒）
 */
export function throttle(fn, interval) {
  // TODO: 实现节流
}

// ============================================
// 练习 5：其他工具
// ============================================

/**
 * 延迟执行函数
 * @param {number} ms - 延迟毫秒数
 */
export function delay(ms) {
  // TODO: 返回 Promise
}

/**
 * 重试函数
 * @param {Function} fn - 要重试的异步函数
 * @param {number} times - 最大重试次数
 * @param {number} delayMs - 重试间隔
 */
export async function retry(fn, times, delayMs = 0) {
  // TODO: 失败时自动重试
}

/**
 * 超时包装
 * @param {Function} fn - 异步函数
 * @param {number} ms - 超时时间
 */
export function timeout(fn, ms) {
  // TODO: 超时则拒绝 Promise
}

/**
 * 批量执行
 * @param {Function} fn - 要批量执行的函数
 * @param {number} batchSize - 批量大小
 * @param {number} delayMs - 批次间延迟
 */
export function batch(fn, batchSize, delayMs = 0) {
  // TODO: 返回一个收集调用并批量执行的函数
}
