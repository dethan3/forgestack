/**
 * 练习 02：箭头函数
 *
 * 学习目标：
 * - 掌握箭头函数语法
 * - 理解箭头函数的 this 绑定
 */

// ============================================
// 练习 1：基本转换
// ============================================

/**
 * 将普通函数转换为箭头函数
 * 返回数字的平方
 */
export const square = (n) => {
  // TODO: 实现
};

/**
 * 返回数字的绝对值
 */
export const abs = (n) => {
  // TODO: 使用三元运算符
};

// ============================================
// 练习 2：数组方法中使用箭头函数
// ============================================

/**
 * 返回数组中所有偶数
 */
export function getEvens(arr) {
  // TODO: 使用 filter 和箭头函数
}

/**
 * 返回数组中所有字符串的长度
 * ['hello', 'world'] => [5, 5]
 */
export function getLengths(arr) {
  // TODO: 使用 map 和箭头函数
}

/**
 * 检查数组中是否所有数字都是正数
 */
export function allPositive(arr) {
  // TODO: 使用 every 和箭头函数
}

// ============================================
// 练习 3：隐式返回
// ============================================

/**
 * 返回一个对象 { doubled: n * 2 }
 */
export const doubleObject = (n) => {
  // TODO: 使用隐式返回（注意对象字面量需要括号）
};

/**
 * 返回一个包含 first 和 last 属性的对象
 */
export const createPerson = (first, last) => {
  // TODO: 隐式返回对象
};

// ============================================
// 练习 4：this 绑定
// ============================================

/**
 * 创建一个计数器对象
 * 使用箭头函数确保 this 正确绑定
 */
export function createCounter(start = 0) {
  return {
    count: start,
    // TODO: 实现 increment 方法（使用箭头函数）
    increment: null,
    // TODO: 实现 decrement 方法（使用箭头函数）
    decrement: null,
    // TODO: 实现 getCount 方法
    getCount: null,
  };
}

// ============================================
// 练习 5：链式调用
// ============================================

/**
 * 处理数据：过滤、转换、排序
 * 1. 过滤出正数
 * 2. 每个数字乘以 2
 * 3. 升序排序
 */
export function processNumbers(arr) {
  // TODO: 使用链式调用和箭头函数
}

// ============================================
// 练习 6：简化回调
// ============================================

/**
 * 延迟执行函数
 * 返回一个 Promise，在指定毫秒后 resolve
 */
export function delay(ms) {
  // TODO: 使用箭头函数作为 Promise 参数
  return new Promise((resolve) => {
    // TODO: 使用 setTimeout
  });
}

/**
 * 按属性值对对象数组排序
 */
export function sortByProp(arr, prop) {
  // TODO: 使用箭头函数作为 sort 的比较函数
}
