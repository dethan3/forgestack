/**
 * 练习 01：Promise 基础
 *
 * 学习目标：
 * - 创建和使用 Promise
 * - 使用 Promise 静态方法
 */

// ============================================
// 练习 1：创建 Promise
// ============================================

/**
 * 创建一个延迟指定毫秒后 resolve 的 Promise
 * @param {number} ms - 延迟毫秒数
 */
export function delay(ms) {
  // TODO: 返回 Promise
}

/**
 * 创建一个延迟后 resolve 指定值的 Promise
 * @param {*} value - 要 resolve 的值
 * @param {number} ms - 延迟毫秒数
 */
export function delayedValue(value, ms) {
  // TODO: 返回 Promise
}

/**
 * 创建一个随机成功或失败的 Promise
 * 50% 几率 resolve('success')
 * 50% 几率 reject(new Error('random failure'))
 */
export function randomPromise() {
  // TODO: 返回 Promise
}

// ============================================
// 练习 2：Promise 链
// ============================================

/**
 * 依次执行多个异步步骤
 * 每个步骤接收上一步的结果
 * @param {*} initial - 初始值
 * @param {Function[]} steps - 异步函数数组
 */
export function chainSteps(initial, steps) {
  // TODO: 使用 reduce 链式执行
}

/**
 * 将数字依次乘以 2，共 n 次
 * 每次操作延迟 100ms
 * @param {number} num - 初始数字
 * @param {number} n - 次数
 */
export function multiplyChain(num, n) {
  // TODO: 实现
}

// ============================================
// 练习 3：Promise 静态方法
// ============================================

/**
 * 并行获取多个 URL 的数据
 * 返回所有结果的数组
 * @param {string[]} urls
 * @param {Function} fetchFn - 模拟的 fetch 函数
 */
export function fetchAll(urls, fetchFn) {
  // TODO: 使用 Promise.all
}

/**
 * 获取第一个成功的结果
 * @param {Promise[]} promises
 */
export function firstSuccess(promises) {
  // TODO: 使用 Promise.any
}

/**
 * 获取所有结果，包括失败的
 * 返回 { successes: [], failures: [] }
 * @param {Promise[]} promises
 */
export function getAllResults(promises) {
  // TODO: 使用 Promise.allSettled
}

/**
 * 带超时的 Promise
 * @param {Promise} promise
 * @param {number} ms - 超时毫秒数
 */
export function withTimeout(promise, ms) {
  // TODO: 使用 Promise.race
}

// ============================================
// 练习 4：错误处理
// ============================================

/**
 * 尝试执行，失败时返回默认值
 * @param {Function} fn - 返回 Promise 的函数
 * @param {*} defaultValue - 默认值
 */
export function tryOrDefault(fn, defaultValue) {
  // TODO: 实现
}

/**
 * 重试函数
 * @param {Function} fn - 返回 Promise 的函数
 * @param {number} times - 最大重试次数
 */
export function retry(fn, times) {
  // TODO: 实现
}

// ============================================
// 练习 5：实用函数
// ============================================

/**
 * 将回调风格函数转换为 Promise
 * @param {Function} fn - 回调风格函数 (arg, callback) => void
 */
export function promisify(fn) {
  // TODO: 实现
}

/**
 * 创建可取消的 Promise
 * 返回 { promise, cancel }
 * @param {Promise} promise
 */
export function cancellable(promise) {
  // TODO: 实现
}
