/**
 * 练习 01：函数基础
 *
 * 学习目标：
 * - 理解函数声明和表达式的区别
 * - 掌握函数作为值的使用
 */

// ============================================
// 练习 1：基本函数
// ============================================

/**
 * 返回两个数的和
 */
export function add(a, b) {
  // TODO: 实现加法
}

/**
 * 返回两个数的差
 */
export function subtract(a, b) {
  // TODO: 实现减法
}

// ============================================
// 练习 2：默认参数
// ============================================

/**
 * 生成问候语
 * greet() => 'Hello, Guest!'
 * greet('Alice') => 'Hello, Alice!'
 */
export function greet(name = 'Guest') {
  // TODO: 使用模板字符串返回问候语
}

// ============================================
// 练习 3：剩余参数
// ============================================

/**
 * 返回所有参数的和
 * sum(1, 2, 3) => 6
 * sum() => 0
 */
export function sum(...numbers) {
  // TODO: 使用 reduce 求和
}

/**
 * 返回所有参数中的最大值
 * max(1, 5, 3) => 5
 * max() => undefined
 */
export function max(...numbers) {
  // TODO: 处理空参数的情况
}

// ============================================
// 练习 4：高阶函数 - 函数作为参数
// ============================================

/**
 * 对数组每个元素执行操作并返回新数组
 * mapArray([1, 2, 3], n => n * 2) => [2, 4, 6]
 */
export function mapArray(arr, fn) {
  // TODO: 不使用 Array.map，手动实现
}

/**
 * 过滤数组，返回满足条件的元素
 * filterArray([1, 2, 3, 4], n => n > 2) => [3, 4]
 */
export function filterArray(arr, predicate) {
  // TODO: 不使用 Array.filter，手动实现
}

// ============================================
// 练习 5：高阶函数 - 函数作为返回值
// ============================================

/**
 * 创建一个乘法器函数
 * const double = createMultiplier(2)
 * double(5) => 10
 */
export function createMultiplier(factor) {
  // TODO: 返回一个乘法函数
}

/**
 * 创建一个前缀添加器
 * const addHello = createPrefixer('Hello, ')
 * addHello('World') => 'Hello, World'
 */
export function createPrefixer(prefix) {
  // TODO: 返回一个添加前缀的函数
}

// ============================================
// 练习 6：函数组合
// ============================================

/**
 * 组合两个函数
 * const addOne = x => x + 1
 * const double = x => x * 2
 * compose(double, addOne)(3) => 8  // double(addOne(3))
 */
export function compose(f, g) {
  // TODO: 返回一个新函数，先执行 g，再执行 f
}

// ============================================
// 练习 7：柯里化
// ============================================

/**
 * 创建一个柯里化的加法函数
 * curriedAdd(1)(2)(3) => 6
 * curriedAdd(1, 2)(3) => 6
 * curriedAdd(1)(2, 3) => 6
 * curriedAdd(1, 2, 3) => 6
 */
export function curriedAdd(a, b, c) {
  // TODO: 实现柯里化
  // 提示：检查参数数量，返回函数或结果
}

// ============================================
// 练习 8：递归
// ============================================

/**
 * 计算斐波那契数列第 n 项
 * fibonacci(0) => 0
 * fibonacci(1) => 1
 * fibonacci(6) => 8
 */
export function fibonacci(n) {
  // TODO: 使用递归实现
}
