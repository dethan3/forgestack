/**
 * 练习 03：继承
 *
 * 学习目标：
 * - 掌握 extends 继承
 * - 使用 super 调用父类
 * - 理解方法重写
 */

// ============================================
// 练习 1：基本继承
// ============================================

/**
 * 创建 Shape 基类
 * - constructor(color)
 * - getColor() 返回颜色
 * - describe() 返回 "A {color} shape"
 */
export class Shape {
  // TODO: 实现基类
}

/**
 * 创建 Rectangle 继承自 Shape
 * - constructor(color, width, height)
 * - getArea() 返回面积
 * - describe() 重写，返回 "A {color} rectangle with area {area}"
 */
export class Rectangle extends Shape {
  // TODO: 实现子类
}

/**
 * 创建 Circle 继承自 Shape
 * - constructor(color, radius)
 * - getArea() 返回面积
 * - describe() 重写
 */
export class Circle extends Shape {
  // TODO: 实现子类
}

// ============================================
// 练习 2：多层继承
// ============================================

/**
 * 创建 Vehicle 基类
 * - constructor(brand)
 * - start() 返回 "{brand} is starting"
 */
export class Vehicle {
  // TODO: 实现
}

/**
 * 创建 Car 继承自 Vehicle
 * - constructor(brand, model)
 * - start() 重写，先调用父类，再加 "Vroom!"
 */
export class Car extends Vehicle {
  // TODO: 实现
}

/**
 * 创建 ElectricCar 继承自 Car
 * - constructor(brand, model, batteryCapacity)
 * - start() 重写，加 "Silently..."
 * - charge() 返回 "Charging {batteryCapacity}kWh battery"
 */
export class ElectricCar extends Car {
  // TODO: 实现
}

// ============================================
// 练习 3：抽象类模式
// ============================================

/**
 * 创建 AbstractEmployee 类
 * - constructor(name, baseSalary)
 * - 如果直接实例化，抛出错误
 * - calculateBonus() 抛出 "Must implement calculateBonus"
 * - getTotalPay() 返回 baseSalary + bonus
 */
export class AbstractEmployee {
  // TODO: 实现抽象类
}

/**
 * Manager 继承 AbstractEmployee
 * - constructor(name, baseSalary, teamSize)
 * - calculateBonus() 返回 teamSize * 1000
 */
export class Manager extends AbstractEmployee {
  // TODO: 实现
}

/**
 * Developer 继承 AbstractEmployee
 * - constructor(name, baseSalary, projectCount)
 * - calculateBonus() 返回 projectCount * 500
 */
export class Developer extends AbstractEmployee {
  // TODO: 实现
}

// ============================================
// 练习 4：继承内置类
// ============================================

/**
 * 创建 ExtendedArray 继承自 Array
 * - first() 返回第一个元素
 * - last() 返回最后一个元素
 * - sum() 返回数字元素之和
 * - average() 返回平均值
 */
export class ExtendedArray extends Array {
  // TODO: 实现
}

/**
 * 创建 TypedMap 继承自 Map
 * - constructor(keyType, valueType) 如 'string', 'number'
 * - set(key, value) 重写，验证类型
 * - 类型不匹配时抛出 TypeError
 */
export class TypedMap extends Map {
  // TODO: 实现
}

// ============================================
// 练习 5：Mixin 模式
// ============================================

/**
 * 创建可序列化 mixin
 */
export const Serializable = {
  // TODO: toJSON() 返回对象的 JSON 字符串
  // TODO: static fromJSON(json) 从 JSON 创建对象
};

/**
 * 创建可比较 mixin
 */
export const Comparable = {
  // TODO: equals(other) 比较两个对象
  // TODO: compareTo(other) 返回 -1, 0, 1
};

/**
 * 创建 Product 类，混入 Serializable
 * - constructor(name, price)
 */
export class Product {
  // TODO: 实现并应用 mixin
}
