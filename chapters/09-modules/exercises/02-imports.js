/**
 * 练习 02：导入
 *
 * 学习目标：
 * - 命名导入
 * - 默认导入
 * - 重命名导入
 * - 命名空间导入
 */

// ============================================
// 练习 1：使用导入的值
// ============================================

// TODO: 从 './01-exports.js' 导入 PI, add, subtract

/**
 * 计算圆的面积
 * 使用导入的 PI
 * @param {number} radius
 */
export function circleArea(radius) {
  // TODO: 使用 PI 计算 π * r²
}

/**
 * 计算两数之和的两倍
 * 使用导入的 add
 * @param {number} a
 * @param {number} b
 */
export function doubleSum(a, b) {
  // TODO: 使用 add 函数
}

/**
 * 计算差的绝对值
 * 使用导入的 subtract
 * @param {number} a
 * @param {number} b
 */
export function absoluteDiff(a, b) {
  // TODO: 使用 subtract 函数
}

// ============================================
// 练习 2：使用导入的类
// ============================================

// TODO: 从 './01-exports.js' 导入 Calculator, Counter

/**
 * 创建并使用 Calculator
 * @param {number} a
 * @param {number} b
 * @returns {{ sum: number, diff: number, product: number, quotient: number }}
 */
export function calculate(a, b) {
  // TODO: 使用 Calculator 类
}

/**
 * 创建 Counter 并执行指定次数的增加
 * @param {number} times
 * @returns {number} 最终计数
 */
export function countUp(times) {
  // TODO: 使用 Counter 类
}

// ============================================
// 练习 3：使用默认导入
// ============================================

// TODO: 从 './01-exports.js' 导入默认导出为 MathUtils

/**
 * 使用默认导入的对象计算
 * @param {number} a
 * @param {number} b
 */
export function useMathUtils(a, b) {
  // TODO: 使用 MathUtils 对象
  // 返回 { sum, diff, product, quotient, pi }
}

// ============================================
// 练习 4：命名空间导入
// ============================================

// TODO: 从 './01-exports.js' 导入全部为 math

/**
 * 使用命名空间访问
 * @param {number} radius
 */
export function circleCircumference(radius) {
  // TODO: 使用 math.PI 计算周长 2 * π * r
}

// ============================================
// 练习 5：重命名导入
// ============================================

// TODO: 从 './01-exports.js' 导入 add 重命名为 sum

/**
 * 使用重命名的导入
 * @param {number[]} numbers
 */
export function sumAll(numbers) {
  // TODO: 使用 sum 函数累加
}
