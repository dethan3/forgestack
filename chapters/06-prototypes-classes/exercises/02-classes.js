/**
 * 练习 02：类基础
 *
 * 学习目标：
 * - 掌握 ES6 class 语法
 * - 使用 getter/setter
 * - 使用静态方法
 */

// ============================================
// 练习 1：基本类
// ============================================

/**
 * 创建 Rectangle 类
 * - constructor(width, height)
 * - get area() 返回面积
 * - get perimeter() 返回周长
 * - scale(factor) 方法，按比例缩放
 */
export class Rectangle {
  // TODO: 实现类
}

/**
 * 创建 Circle 类
 * - constructor(radius)
 * - get area() 返回面积
 * - get circumference() 返回周长
 * - static fromDiameter(diameter) 从直径创建
 */
export class Circle {
  // TODO: 实现类
}

// ============================================
// 练习 2：Getter 和 Setter
// ============================================

/**
 * 创建 Temperature 类
 * - constructor(celsius)
 * - get celsius / set celsius
 * - get fahrenheit / set fahrenheit
 * - get kelvin / set kelvin
 * - 转换公式：
 *   F = C * 9/5 + 32
 *   K = C + 273.15
 */
export class Temperature {
  // TODO: 实现类
}

/**
 * 创建 BoundedValue 类
 * - constructor(value, min, max)
 * - get/set value（自动限制在 min-max 范围内）
 */
export class BoundedValue {
  // TODO: 实现类
}

// ============================================
// 练习 3：静态方法和属性
// ============================================

/**
 * 创建 Counter 类
 * - 静态属性 count 记录创建的实例数
 * - constructor() 增加 count
 * - 实例属性 id 为创建顺序
 * - static getCount() 返回总数
 * - static reset() 重置计数
 */
export class Counter {
  // TODO: 实现类
}

/**
 * 创建 MathHelper 类（纯静态工具类）
 * - static PI = 3.14159
 * - static clamp(value, min, max)
 * - static lerp(start, end, t) 线性插值
 * - static random(min, max) 范围随机数
 */
export class MathHelper {
  // TODO: 实现类
}

// ============================================
// 练习 4：私有字段
// ============================================

/**
 * 创建 BankAccount 类
 * - 私有字段 #balance
 * - constructor(initialBalance)
 * - deposit(amount)
 * - withdraw(amount) 返回是否成功
 * - get balance()
 */
export class BankAccount {
  // TODO: 实现类
}

/**
 * 创建 User 类
 * - 私有字段 #password
 * - constructor(username, password)
 * - setPassword(oldPassword, newPassword)
 * - checkPassword(password)
 */
export class User {
  // TODO: 实现类
}

// ============================================
// 练习 5：链式调用
// ============================================

/**
 * 创建 StringBuilder 类
 * - constructor(initial = '')
 * - append(str) 返回 this
 * - prepend(str) 返回 this
 * - toUpperCase() 返回 this
 * - toLowerCase() 返回 this
 * - toString() 返回结果字符串
 */
export class StringBuilder {
  // TODO: 实现类
}
