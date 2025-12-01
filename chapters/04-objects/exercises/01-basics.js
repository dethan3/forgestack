/**
 * 练习 01：对象基础
 *
 * 学习目标：
 * - 掌握对象的创建和操作
 * - 熟练使用属性简写和计算属性名
 */

// ============================================
// 练习 1：创建对象
// ============================================

/**
 * 使用属性简写创建用户对象
 * createUser('Alice', 25) => { name: 'Alice', age: 25 }
 */
export function createUser(name, age) {
  // TODO: 使用属性简写
}

/**
 * 使用计算属性名创建对象
 * createDynamic('foo', 'bar') => { foo: 'bar' }
 */
export function createDynamic(key, value) {
  // TODO: 使用计算属性名
}

// ============================================
// 练习 2：访问属性
// ============================================

/**
 * 安全获取嵌套属性（使用可选链）
 * 如果路径不存在，返回 defaultValue
 */
export function safeGet(obj, path, defaultValue = undefined) {
  // TODO: 解析路径字符串，使用可选链访问
  // path 格式: 'a.b.c'
}

/**
 * 检查对象是否有指定的所有属性
 * hasAllKeys({ a: 1, b: 2 }, ['a', 'b']) => true
 * hasAllKeys({ a: 1 }, ['a', 'b']) => false
 */
export function hasAllKeys(obj, keys) {
  // TODO: 检查所有键是否存在
}

// ============================================
// 练习 3：遍历对象
// ============================================

/**
 * 将对象的值转换为大写（只处理字符串值）
 * toUpperValues({ a: 'hello', b: 123 }) => { a: 'HELLO', b: 123 }
 */
export function toUpperValues(obj) {
  // TODO: 遍历并转换字符串值
}

/**
 * 翻转对象的键值
 * flipObject({ a: 1, b: 2 }) => { 1: 'a', 2: 'b' }
 */
export function flipObject(obj) {
  // TODO: 键变值，值变键
}

// ============================================
// 练习 4：浅拷贝
// ============================================

/**
 * 浅拷贝对象
 */
export function shallowCopy(obj) {
  // TODO: 使用展开运算符
}

/**
 * 合并多个对象
 * merge({ a: 1 }, { b: 2 }, { c: 3 }) => { a: 1, b: 2, c: 3 }
 */
export function merge(...objects) {
  // TODO: 合并所有对象
}

// ============================================
// 练习 5：对象操作
// ============================================

/**
 * 从对象中选择指定的属性
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) => { a: 1, c: 3 }
 */
export function pick(obj, keys) {
  // TODO: 选择指定属性
}

/**
 * 从对象中排除指定的属性
 * omit({ a: 1, b: 2, c: 3 }, ['b']) => { a: 1, c: 3 }
 */
export function omit(obj, keys) {
  // TODO: 排除指定属性
}

// ============================================
// 练习 6：深度操作
// ============================================

/**
 * 设置嵌套属性值（创建不存在的路径）
 * setNested({}, 'a.b.c', 1) => { a: { b: { c: 1 } } }
 */
export function setNested(obj, path, value) {
  // TODO: 解析路径并设置值
}

/**
 * 扁平化对象
 * flatten({ a: { b: 1, c: { d: 2 } } }) => { 'a.b': 1, 'a.c.d': 2 }
 */
export function flatten(obj, prefix = '') {
  // TODO: 递归扁平化
}
