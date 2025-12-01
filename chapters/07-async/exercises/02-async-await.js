/**
 * 练习 02：async/await
 *
 * 学习目标：
 * - 使用 async/await 语法
 * - 处理错误
 * - 理解执行顺序
 */

// ============================================
// 练习 1：基本 async/await
// ============================================

/**
 * 异步获取用户信息
 * @param {number} id - 用户 ID
 * @param {Function} fetchFn - 模拟 fetch 函数
 */
export async function getUser(id, fetchFn) {
  // TODO: 使用 await 调用 fetchFn
}

/**
 * 异步获取用户及其帖子
 * @param {number} userId
 * @param {Function} getUserFn - (id) => Promise<User>
 * @param {Function} getPostsFn - (userId) => Promise<Post[]>
 */
export async function getUserWithPosts(userId, getUserFn, getPostsFn) {
  // TODO: 先获取用户，再获取帖子，返回 { user, posts }
}

// ============================================
// 练习 2：错误处理
// ============================================

/**
 * 安全获取数据，失败返回 null
 * @param {Function} fn - 异步函数
 */
export async function safeAsync(fn) {
  // TODO: 使用 try/catch
}

/**
 * 带详细错误信息的请求
 * @param {string} url
 * @param {Function} fetchFn
 */
export async function fetchWithError(url, fetchFn) {
  // TODO: 捕获错误并添加更多上下文
  // 抛出 new Error(`Failed to fetch ${url}: ${原始错误}`)
}

/**
 * 多重错误处理
 * 依次尝试多个数据源，全部失败才抛出错误
 * @param {Function[]} sources - 异步函数数组
 */
export async function tryMultipleSources(sources) {
  // TODO: 实现
}

// ============================================
// 练习 3：并行 vs 串行
// ============================================

/**
 * 串行执行所有任务
 * @param {Function[]} tasks - 异步函数数组
 */
export async function runSerial(tasks) {
  // TODO: 依次执行，返回结果数组
}

/**
 * 并行执行所有任务
 * @param {Function[]} tasks - 异步函数数组
 */
export async function runParallel(tasks) {
  // TODO: 并行执行，返回结果数组
}

/**
 * 并行执行但按顺序返回结果
 * @param {Function[]} tasks
 */
export async function runParallelOrdered(tasks) {
  // TODO: 并行执行，结果按任务顺序排列
}

// ============================================
// 练习 4：循环中的 async
// ============================================

/**
 * 串行处理数组元素
 * @param {any[]} items
 * @param {Function} asyncFn
 */
export async function mapSerial(items, asyncFn) {
  // TODO: 使用 for...of
}

/**
 * 并行处理数组元素
 * @param {any[]} items
 * @param {Function} asyncFn
 */
export async function mapParallel(items, asyncFn) {
  // TODO: 使用 Promise.all
}

/**
 * 过滤数组（异步谓词）
 * @param {any[]} items
 * @param {Function} asyncPredicate - (item) => Promise<boolean>
 */
export async function filterAsync(items, asyncPredicate) {
  // TODO: 实现
}

// ============================================
// 练习 5：实用模式
// ============================================

/**
 * 带超时的异步操作
 * @param {Function} asyncFn
 * @param {number} ms
 */
export async function withAsyncTimeout(asyncFn, ms) {
  // TODO: 实现
}

/**
 * 带重试的异步操作
 * @param {Function} asyncFn
 * @param {number} retries
 * @param {number} delayMs - 重试间隔
 */
export async function withRetry(asyncFn, retries, delayMs = 0) {
  // TODO: 实现
}

/**
 * 防抖异步函数
 * @param {Function} asyncFn
 * @param {number} delay
 */
export function debounceAsync(asyncFn, delay) {
  // TODO: 返回防抖后的异步函数
}
