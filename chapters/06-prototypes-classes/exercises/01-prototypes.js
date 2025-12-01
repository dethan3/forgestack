/**
 * 练习 01：原型基础
 *
 * 学习目标：
 * - 理解原型机制
 * - 掌握原型操作方法
 */

// ============================================
// 练习 1：原型操作
// ============================================

/**
 * 获取对象的原型链（数组形式）
 * getPrototypeChain({}) => [Object.prototype, null]
 */
export function getPrototypeChain(obj) {
  // TODO: 返回从对象到 null 的原型链
}

/**
 * 检查对象是否有指定的自有属性（非继承）
 */
export function hasOwnProp(obj, prop) {
  // TODO: 使用 Object.hasOwn 或 hasOwnProperty
}

// ============================================
// 练习 2：构造函数和原型
// ============================================

/**
 * 创建一个 Person 构造函数
 * - 接收 name 和 age 参数
 * - 原型上有 greet 方法，返回 "Hello, I'm {name}"
 * - 原型上有 getAge 方法，返回 age
 */
export function Person(name, age) {
  // TODO: 实现构造函数
}
// TODO: 在 Person.prototype 上添加方法

/**
 * 创建一个 Animal 构造函数
 * - 接收 name 参数
 * - 原型上有 speak 方法，返回 "{name} makes a sound"
 */
export function Animal(name) {
  // TODO: 实现构造函数
}
// TODO: 添加原型方法

// ============================================
// 练习 3：原型继承
// ============================================

/**
 * 创建 Dog 构造函数，继承自 Animal
 * - 接收 name 和 breed 参数
 * - 重写 speak 方法，返回 "{name} barks"
 * - 添加 fetch 方法，返回 "{name} fetches the ball"
 */
export function Dog(name, breed) {
  // TODO: 调用父构造函数，设置 breed
}
// TODO: 设置原型链

// ============================================
// 练习 4：Object.create
// ============================================

/**
 * 使用 Object.create 创建对象
 * 原型上有 greet 方法
 */
export function createPerson(name) {
  // TODO: 使用 Object.create 创建带原型的对象
}

/**
 * 创建无原型对象
 */
export function createPureObject() {
  // TODO: 创建 Object.create(null)
}

// ============================================
// 练习 5：检查原型关系
// ============================================

/**
 * 检查 child 是否是 Parent 的实例（通过原型链）
 */
export function isInstanceOf(obj, Constructor) {
  // TODO: 不使用 instanceof，手动检查原型链
}

/**
 * 获取对象的构造函数名称
 */
export function getConstructorName(obj) {
  // TODO: 返回构造函数的名称
}
