/**
 * 异步工具模块
 */

/**
 * 延迟指定毫秒
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function delay(ms) {
  // TODO: 实现
}

/**
 * 重试异步函数
 * @param {Function} fn - 异步函数
 * @param {number} times - 重试次数
 * @param {number} delayMs - 重试间隔
 * @returns {Promise}
 */
export async function retry(fn, times = 3, delayMs = 0) {
  // TODO: 实现
}

/**
 * 带超时的 Promise
 * @param {Promise} promise
 * @param {number} ms
 * @returns {Promise}
 */
export function timeout(promise, ms) {
  // TODO: 实现
}

/**
 * 限制并发执行
 * @param {Function[]} tasks - 返回 Promise 的函数数组
 * @param {number} limit - 最大并发数
 * @returns {Promise<Array>}
 */
export async function parallel(tasks, limit) {
  // TODO: 实现
}
