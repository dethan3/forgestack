/**
 * 综合挑战 01：对象工具库
 *
 * 实现一组实用的对象处理工具函数
 */

// ============================================
// 1. 安全获取嵌套属性
// ============================================

/**
 * 安全获取嵌套属性
 * @param {Object} obj - 目标对象
 * @param {string} path - 属性路径，如 'a.b.c'
 * @param {*} defaultValue - 默认值
 * @returns {*} 属性值或默认值
 */
export function get(obj, path, defaultValue = undefined) {
  // TODO: 实现安全获取
}

// ============================================
// 2. 设置嵌套属性
// ============================================

/**
 * 设置嵌套属性，自动创建不存在的路径
 * @param {Object} obj - 目标对象
 * @param {string} path - 属性路径
 * @param {*} value - 要设置的值
 * @returns {Object} 修改后的对象
 */
export function set(obj, path, value) {
  // TODO: 实现设置嵌套属性
}

// ============================================
// 3. 深度克隆
// ============================================

/**
 * 深度克隆对象
 * @param {*} value - 要克隆的值
 * @returns {*} 克隆后的值
 */
export function deepClone(value) {
  // TODO: 实现深度克隆
  // 处理：null, 原始类型, 数组, 对象, Date
}

// ============================================
// 4. 深度比较
// ============================================

/**
 * 深度比较两个值是否相等
 * @param {*} value1 - 第一个值
 * @param {*} value2 - 第二个值
 * @returns {boolean} 是否相等
 */
export function isEqual(value1, value2) {
  // TODO: 实现深度比较
  // 处理：原始类型, 数组, 对象
}

// ============================================
// 5. 深度合并
// ============================================

/**
 * 深度合并多个对象
 * @param {Object} target - 目标对象
 * @param {...Object} sources - 源对象
 * @returns {Object} 合并后的对象
 */
export function merge(target, ...sources) {
  // TODO: 实现深度合并
  // 后面的对象属性覆盖前面的
}
