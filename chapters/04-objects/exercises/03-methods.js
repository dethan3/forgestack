/**
 * 练习 03：对象方法
 *
 * 学习目标：
 * - 熟练使用 Object 静态方法
 * - 掌握对象的转换和操作
 */

// ============================================
// 练习 1：Object.keys/values/entries
// ============================================

/**
 * 计算对象中所有数字值的和
 * sumValues({ a: 1, b: 2, c: 'x' }) => 3
 */
export function sumValues(obj) {
  // TODO: 使用 Object.values 和 filter
}

/**
 * 获取对象中值为指定类型的键
 * getKeysByType({ a: 1, b: 'x', c: 2 }, 'number') => ['a', 'c']
 */
export function getKeysByType(obj, type) {
  // TODO: 使用 Object.entries 和 filter
}

// ============================================
// 练习 2：Object.fromEntries
// ============================================

/**
 * 将对象的所有键转为大写
 * uppercaseKeys({ name: 'Alice' }) => { NAME: 'Alice' }
 */
export function uppercaseKeys(obj) {
  // TODO: 使用 entries + fromEntries
}

/**
 * 过滤对象，只保留值大于指定数的属性
 * filterByValue({ a: 1, b: 5, c: 3 }, 2) => { b: 5, c: 3 }
 */
export function filterByValue(obj, minValue) {
  // TODO: 使用 entries + filter + fromEntries
}

// ============================================
// 练习 3：Object.assign
// ============================================

/**
 * 深度合并两个对象
 * deepMerge({ a: { x: 1 } }, { a: { y: 2 } }) => { a: { x: 1, y: 2 } }
 */
export function deepMerge(target, source) {
  // TODO: 递归合并嵌套对象
}

// ============================================
// 练习 4：Object.freeze/seal
// ============================================

/**
 * 深度冻结对象（包括嵌套对象）
 */
export function deepFreeze(obj) {
  // TODO: 递归冻结所有嵌套对象
}

/**
 * 检查对象是否被完全冻结（包括嵌套）
 */
export function isDeepFrozen(obj) {
  // TODO: 递归检查
}

// ============================================
// 练习 5：对象比较
// ============================================

/**
 * 浅比较两个对象是否相等
 * 只比较第一层属性
 */
export function shallowEqual(obj1, obj2) {
  // TODO: 比较所有顶层属性
}

/**
 * 深度比较两个对象是否相等
 */
export function deepEqual(obj1, obj2) {
  // TODO: 递归比较
}

// ============================================
// 练习 6：对象差异
// ============================================

/**
 * 找出两个对象的差异
 * diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 })
 * => { changed: { b: 3 }, added: { c: 4 }, removed: [] }
 */
export function diff(oldObj, newObj) {
  // TODO: 比较并返回差异
}

// ============================================
// 练习 7：对象转换
// ============================================

/**
 * 将对象转换为查询字符串
 * toQueryString({ name: 'Alice', age: 25 }) => 'name=Alice&age=25'
 */
export function toQueryString(obj) {
  // TODO: 使用 entries 和 join
}

/**
 * 将查询字符串解析为对象
 * fromQueryString('name=Alice&age=25') => { name: 'Alice', age: '25' }
 */
export function fromQueryString(str) {
  // TODO: 解析查询字符串
}

// ============================================
// 练习 8：对象映射
// ============================================

/**
 * 对对象的所有值应用函数
 * mapValues({ a: 1, b: 2 }, x => x * 2) => { a: 2, b: 4 }
 */
export function mapValues(obj, fn) {
  // TODO: 映射所有值
}

/**
 * 对对象的所有键应用函数
 * mapKeys({ a: 1, b: 2 }, k => k.toUpperCase()) => { A: 1, B: 2 }
 */
export function mapKeys(obj, fn) {
  // TODO: 映射所有键
}
