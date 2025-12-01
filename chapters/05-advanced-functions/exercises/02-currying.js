/**
 * 练习 02：柯里化与部分应用
 *
 * 学习目标：
 * - 实现柯里化函数
 * - 理解部分应用
 */

// ============================================
// 练习 1：手动柯里化
// ============================================

/**
 * 柯里化的加法函数
 * curriedAdd(1)(2)(3) => 6
 */
export const curriedAdd = (a) => {
  // TODO: 返回接收 b 的函数，再返回接收 c 的函数
};

/**
 * 柯里化的字符串格式化
 * format(template)(value1)(value2)
 * format('Hello, {0}! You have {1} messages.')('Alice')(5)
 * => 'Hello, Alice! You have 5 messages.'
 */
export const format = (template) => {
  // TODO: 实现模板替换
};

// ============================================
// 练习 2：通用柯里化
// ============================================

/**
 * 实现通用的 curry 函数
 * 支持：curry(fn)(a)(b)(c) 和 curry(fn)(a, b)(c) 等形式
 */
export function curry(fn) {
  // TODO: 实现通用柯里化
}

// ============================================
// 练习 3：部分应用
// ============================================

/**
 * 实现部分应用函数
 * partial(fn, a, b)(c) 等价于 fn(a, b, c)
 */
export function partial(fn, ...presetArgs) {
  // TODO: 实现部分应用
}

/**
 * 实现带占位符的部分应用
 * 使用 partialWithPlaceholder._ 作为占位符
 * partialWithPlaceholder(fn, _, 2)(1) 等价于 fn(1, 2)
 */
export function partialWithPlaceholder(fn, ...presetArgs) {
  // TODO: 实现带占位符的部分应用
}
partialWithPlaceholder._ = Symbol('placeholder');

// ============================================
// 练习 4：实用柯里化函数
// ============================================

/**
 * 柯里化的数组操作
 */
export const map = (fn) => {
  // TODO: 返回接收数组的函数
};

export const filter = (predicate) => {
  // TODO: 返回接收数组的函数
};

export const reduce = (reducer) => (initial) => {
  // TODO: 返回接收数组的函数
};

/**
 * 柯里化的字符串操作
 */
export const split = (separator) => {
  // TODO: 返回接收字符串的函数
};

export const join = (separator) => {
  // TODO: 返回接收数组的函数
};

// ============================================
// 练习 5：组合使用
// ============================================

/**
 * 使用柯里化创建专用函数
 */

// 创建一个将数组元素加倍的函数
export const double = undefined; // TODO: 使用 map

// 创建一个筛选偶数的函数
export const filterEvens = undefined; // TODO: 使用 filter

// 创建一个求和函数
export const sum = undefined; // TODO: 使用 reduce

// 创建一个将句子转为单词数组的函数
export const words = undefined; // TODO: 使用 split

// 创建一个将单词数组用连字符连接的函数
export const hyphenate = undefined; // TODO: 使用 join
