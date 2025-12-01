/**
 * 练习 03：异步错误处理
 *
 * 学习目标：
 * - 处理 Promise 错误
 * - async/await 错误处理
 * - 实现重试和超时
 */

// ============================================
// 练习 1：Promise 错误处理
// ============================================

/**
 * 安全执行 Promise
 * @param {Promise} promise
 * @returns {Promise<[data, null] | [null, error]>}
 */
export async function safePromise(promise) {
  // TODO: 实现
  // 成功返回 [result, null]
  // 失败返回 [null, error]
}

/**
 * 带默认值的 Promise
 * @param {Promise} promise
 * @param {*} defaultValue
 */
export async function promiseWithDefault(promise, defaultValue) {
  // TODO: 实现
}

/**
 * 并行执行并收集结果和错误
 * @param {Promise[]} promises
 * @returns {Promise<{ results: any[], errors: Error[] }>}
 */
export async function collectResults(promises) {
  // TODO: 使用 Promise.allSettled
}

// ============================================
// 练习 2：超时处理
// ============================================

/**
 * 带超时的 Promise
 * @param {Promise} promise
 * @param {number} ms
 * @param {string} message - 超时错误消息
 */
export async function withTimeout(promise, ms, message = 'Operation timed out') {
  // TODO: 实现
  // 超时抛出 Error(message)
}

/**
 * 带超时的 fetch
 * @param {string} url
 * @param {Function} fetchFn - 模拟 fetch
 * @param {number} timeout
 */
export async function fetchWithTimeout(url, fetchFn, timeout = 5000) {
  // TODO: 实现
}

// ============================================
// 练习 3：重试机制
// ============================================

/**
 * 带重试的异步操作
 * @param {Function} fn - 异步函数
 * @param {Object} options
 * @param {number} options.retries - 重试次数
 * @param {number} options.delay - 重试间隔(ms)
 * @param {Function} options.onRetry - 重试回调
 */
export async function withRetry(fn, options = {}) {
  // TODO: 实现
  const { retries = 3, delay = 1000, onRetry } = options;
}

/**
 * 指数退避重试
 * @param {Function} fn
 * @param {Object} options
 * @param {number} options.retries
 * @param {number} options.baseDelay - 基础延迟
 * @param {number} options.maxDelay - 最大延迟
 */
export async function withExponentialBackoff(fn, options = {}) {
  // TODO: 实现
  // delay = min(baseDelay * 2^attempt, maxDelay)
}

// ============================================
// 练习 4：错误边界
// ============================================

/**
 * 创建错误边界
 * @param {Function} errorHandler - 错误处理函数
 */
export function createErrorBoundary(errorHandler) {
  // TODO: 返回一个包装函数
  // 包装函数接收异步函数，执行并处理错误
}

/**
 * 批量执行，部分失败不影响整体
 * @param {Function[]} tasks
 * @param {Function} onError - 单个任务失败时调用
 */
export async function runAllSettled(tasks, onError) {
  // TODO: 实现
  // 返回成功的结果数组
}

// ============================================
// 练习 5：错误恢复
// ============================================

/**
 * 带备选方案的异步操作
 * @param {Function} primary - 主要操作
 * @param {Function} fallback - 备选操作
 */
export async function withFallback(primary, fallback) {
  // TODO: 实现
}

/**
 * 依次尝试多个数据源
 * @param {Function[]} sources - 数据源函数数组
 */
export async function tryMultiple(sources) {
  // TODO: 实现
  // 返回第一个成功的结果
  // 全部失败则抛出最后一个错误
}

/**
 * 竞态取消：只要有一个成功就取消其他
 * @param {Function[]} tasks - 返回 { promise, cancel } 的函数
 */
export async function raceWithCancel(tasks) {
  // TODO: 实现
  // 使用 Promise.race
  // 成功后取消其他任务
}
