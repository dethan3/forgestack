/**
 * 练习 03：并发控制
 *
 * 学习目标：
 * - 控制并发数量
 * - 实现任务队列
 * - 处理复杂并发场景
 */

// ============================================
// 练习 1：并发限制
// ============================================

/**
 * 限制并发数量执行任务
 * @param {Function[]} tasks - 异步任务数组
 * @param {number} limit - 最大并发数
 */
export async function limitConcurrency(tasks, limit) {
  // TODO: 实现
}

/**
 * 批量执行任务
 * @param {any[]} items - 要处理的项
 * @param {Function} asyncFn - 异步处理函数
 * @param {number} batchSize - 每批数量
 */
export async function batchProcess(items, asyncFn, batchSize) {
  // TODO: 分批执行
}

// ============================================
// 练习 2：任务队列
// ============================================

/**
 * 创建一个异步任务队列
 * @param {number} concurrency - 并发数
 */
export function createQueue(concurrency = 1) {
  // TODO: 返回队列对象
  // queue.push(task) - 添加任务，返回 Promise
  // queue.size - 当前队列长度
  // queue.running - 正在运行的任务数
}

/**
 * 创建优先级队列
 * @param {number} concurrency
 */
export function createPriorityQueue(concurrency = 1) {
  // TODO: 返回优先级队列
  // queue.push(task, priority) - 优先级越高越先执行
}

// ============================================
// 练习 3：竞态和取消
// ============================================

/**
 * 创建可取消的 fetch
 * @param {string} url
 * @param {Function} fetchFn
 */
export function createCancellableFetch(url, fetchFn) {
  // TODO: 返回 { promise, cancel }
}

/**
 * 竞态条件处理
 * 只返回最后一次调用的结果
 */
export function createLatestOnly() {
  // TODO: 返回一个包装函数
  // 多次调用时，只有最后一次的结果会被返回
}

// ============================================
// 练习 4：节流和防抖
// ============================================

/**
 * 创建节流的异步函数
 * @param {Function} asyncFn
 * @param {number} interval
 */
export function throttleAsync(asyncFn, interval) {
  // TODO: 实现
}

/**
 * 创建防抖的异步函数，支持取消前一个请求
 * @param {Function} asyncFn
 * @param {number} delay
 */
export function debounceAsyncWithCancel(asyncFn, delay) {
  // TODO: 实现
}

// ============================================
// 练习 5：高级模式
// ============================================

/**
 * 实现信号量
 */
export class Semaphore {
  constructor(max) {
    // TODO: 实现
    // acquire() - 获取许可
    // release() - 释放许可
    // use(fn) - 在许可内执行函数
  }
}

/**
 * 实现读写锁
 */
export class ReadWriteLock {
  constructor() {
    // TODO: 实现
    // readLock() - 获取读锁（多个读可以并行）
    // writeLock() - 获取写锁（独占）
    // readUnlock() - 释放读锁
    // writeUnlock() - 释放写锁
  }
}

/**
 * 实现异步池
 * @param {number} poolSize
 * @param {any[]} items
 * @param {Function} asyncFn
 */
export async function asyncPool(poolSize, items, asyncFn) {
  // TODO: 实现
  // 维护一个固定大小的"池"
  // 当池未满时，立即开始新任务
  // 当池满时，等待任一任务完成
}
