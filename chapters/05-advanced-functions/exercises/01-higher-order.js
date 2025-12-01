/**
 * 练习 01：高阶函数
 *
 * 学习目标：
 * - 理解高阶函数概念
 * - 实现常用的高阶函数
 */

// ============================================
// 练习 1：函数作为返回值
// ============================================

/**
 * 创建一个乘法器函数
 * multiplier(3)(4) => 12
 */
export function multiplier(factor) {
  // TODO: 返回一个接收数字并乘以 factor 的函数
}

/**
 * 创建一个范围检查器
 * inRange(1, 10)(5) => true
 * inRange(1, 10)(15) => false
 */
export function inRange(min, max) {
  // TODO: 返回一个检查数字是否在范围内的函数
}

// ============================================
// 练习 2：函数作为参数
// ============================================

/**
 * 对数组的每个元素执行函数，返回新数组
 * 实现自己的 map
 */
export function myMap(arr, fn) {
  // TODO: 不使用 Array.prototype.map
}

/**
 * 过滤数组，返回满足条件的元素
 * 实现自己的 filter
 */
export function myFilter(arr, predicate) {
  // TODO: 不使用 Array.prototype.filter
}

/**
 * 累积计算
 * 实现自己的 reduce
 */
export function myReduce(arr, reducer, initialValue) {
  // TODO: 不使用 Array.prototype.reduce
}

// ============================================
// 练习 3：函数包装器
// ============================================

/**
 * 创建一个只执行一次的函数
 * 后续调用返回第一次的结果
 */
export function once(fn) {
  // TODO: 实现 once
}

/**
 * 创建一个在 n 次调用后才执行的函数
 * after(3, fn) - fn 在第 3 次调用时才执行
 */
export function after(n, fn) {
  // TODO: 实现 after
}

/**
 * 创建一个最多执行 n 次的函数
 * before(3, fn) - fn 最多执行 3 次
 */
export function before(n, fn) {
  // TODO: 实现 before
}

// ============================================
// 练习 4：函数增强
// ============================================

/**
 * 创建一个带日志的函数
 * 调用时打印参数和返回值
 */
export function logged(fn) {
  // TODO: 返回包装后的函数
  // 打印格式: `Calling ${fn.name} with [args]`
  //          `${fn.name} returned ${result}`
}

/**
 * 创建一个计时函数
 * 返回 { result, time } 对象
 */
export function timed(fn) {
  // TODO: 返回包装后的函数，记录执行时间
}

/**
 * 否定一个谓词函数
 * negate(isEven)(3) => true
 */
export function negate(predicate) {
  // TODO: 返回结果取反的函数
}

// ============================================
// 练习 5：组合应用
// ============================================

/**
 * 创建一个属性提取器
 * prop('name')({ name: 'Alice' }) => 'Alice'
 */
export function prop(key) {
  // TODO: 返回提取属性的函数
}

/**
 * 创建一个方法调用器
 * invoke('toUpperCase')('hello') => 'HELLO'
 */
export function invoke(method, ...args) {
  // TODO: 返回调用方法的函数
}

/**
 * 使用提供的函数转换对象的所有值
 * mapObject({ a: 1, b: 2 }, x => x * 2) => { a: 2, b: 4 }
 */
export function mapObject(obj, fn) {
  // TODO: 对每个值应用函数
}
