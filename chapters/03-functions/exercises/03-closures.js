/**
 * 练习 03：闭包
 *
 * 学习目标：
 * - 理解闭包的概念
 * - 掌握闭包的实际应用
 */

// ============================================
// 练习 1：基本闭包
// ============================================

/**
 * 创建一个计数器
 * 每次调用返回递增的数字
 */
export function createCounter(start = 0) {
  // TODO: 使用闭包保存状态
}

/**
 * 创建一个累加器
 * const adder = createAdder()
 * adder(5)  => 5
 * adder(3)  => 8
 * adder(2)  => 10
 */
export function createAdder() {
  // TODO: 使用闭包保存总和
}

// ============================================
// 练习 2：数据封装
// ============================================

/**
 * 创建一个私有变量存储器
 * const store = createStore()
 * store.set('key', 'value')
 * store.get('key') => 'value'
 * store.has('key') => true
 * store.delete('key')
 */
export function createStore() {
  // TODO: 使用闭包封装私有对象
}

// ============================================
// 练习 3：函数工厂
// ============================================

/**
 * 创建范围检查函数
 * const isTeenager = createRangeChecker(13, 19)
 * isTeenager(15) => true
 * isTeenager(25) => false
 */
export function createRangeChecker(min, max) {
  // TODO: 返回检查函数
}

/**
 * 创建格式化函数
 * const formatCurrency = createFormatter('$', 2)
 * formatCurrency(1234.5) => '$1234.50'
 */
export function createFormatter(prefix, decimals) {
  // TODO: 返回格式化函数
}

// ============================================
// 练习 4：记忆化
// ============================================

/**
 * 创建带缓存的函数
 * 相同参数只计算一次
 */
export function memoize(fn) {
  // TODO: 使用闭包保存缓存
}

// ============================================
// 练习 5：节流和防抖
// ============================================

/**
 * 创建防抖函数
 * 连续调用只在最后一次调用后执行
 */
export function debounce(fn, delay) {
  // TODO: 使用闭包保存定时器
}

/**
 * 创建节流函数
 * 在指定时间内只执行一次
 */
export function throttle(fn, limit) {
  // TODO: 使用闭包保存状态
}

// ============================================
// 练习 6：once 函数
// ============================================

/**
 * 创建只执行一次的函数
 * 后续调用返回第一次的结果
 */
export function once(fn) {
  // TODO: 使用闭包保存执行状态和结果
}

// ============================================
// 练习 7：私有方法模式
// ============================================

/**
 * 创建一个栈数据结构
 * 内部数组对外不可见
 */
export function createStack() {
  // TODO: 返回 { push, pop, peek, isEmpty, size }
}

// ============================================
// 练习 8：偏函数应用
// ============================================

/**
 * 创建偏函数
 * const add = (a, b, c) => a + b + c
 * const add5 = partial(add, 5)
 * add5(3, 2) => 10
 */
export function partial(fn, ...presetArgs) {
  // TODO: 返回预设部分参数的新函数
}
