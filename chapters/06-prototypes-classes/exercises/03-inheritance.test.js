import { describe, it, expect } from 'vitest';
import {
  Shape,
  Rectangle,
  Circle,
  Vehicle,
  Car,
  ElectricCar,
  AbstractEmployee,
  Manager,
  Developer,
  ExtendedArray,
  TypedMap,
  Product,
} from './03-inheritance.js';

describe('03-inheritance: 继承', () => {
  describe('练习 1: 基本继承', () => {
    it('Shape 基类', () => {
      const shape = new Shape('red');
      expect(shape.getColor()).toBe('red');
      expect(shape.describe()).toBe('A red shape');
    });

    it('Rectangle 继承 Shape', () => {
      const rect = new Rectangle('blue', 10, 5);
      expect(rect.getColor()).toBe('blue');
      expect(rect.getArea()).toBe(50);
      expect(rect.describe()).toBe('A blue rectangle with area 50');
      expect(rect instanceof Shape).toBe(true);
    });

    it('Circle 继承 Shape', () => {
      const circle = new Circle('green', 5);
      expect(circle.getColor()).toBe('green');
      expect(circle.getArea()).toBeCloseTo(78.54, 1);
      expect(circle instanceof Shape).toBe(true);
    });
  });

  describe('练习 2: 多层继承', () => {
    it('Vehicle 基类', () => {
      const vehicle = new Vehicle('Generic');
      expect(vehicle.start()).toBe('Generic is starting');
    });

    it('Car 继承 Vehicle', () => {
      const car = new Car('Toyota', 'Camry');
      expect(car.brand).toBe('Toyota');
      expect(car.model).toBe('Camry');
      expect(car.start()).toContain('Toyota is starting');
      expect(car.start()).toContain('Vroom!');
    });

    it('ElectricCar 继承 Car', () => {
      const tesla = new ElectricCar('Tesla', 'Model 3', 75);
      expect(tesla.start()).toContain('Silently');
      expect(tesla.charge()).toBe('Charging 75kWh battery');
      expect(tesla instanceof Car).toBe(true);
      expect(tesla instanceof Vehicle).toBe(true);
    });
  });

  describe('练习 3: 抽象类模式', () => {
    it('AbstractEmployee 不能直接实例化', () => {
      expect(() => new AbstractEmployee('Test', 1000)).toThrow();
    });

    it('Manager 实现 calculateBonus', () => {
      const manager = new Manager('Alice', 5000, 10);
      expect(manager.calculateBonus()).toBe(10000);
      expect(manager.getTotalPay()).toBe(15000);
    });

    it('Developer 实现 calculateBonus', () => {
      const dev = new Developer('Bob', 4000, 5);
      expect(dev.calculateBonus()).toBe(2500);
      expect(dev.getTotalPay()).toBe(6500);
    });
  });

  describe('练习 4: 继承内置类', () => {
    it('ExtendedArray 扩展 Array', () => {
      const arr = new ExtendedArray(1, 2, 3, 4, 5);
      expect(arr.first()).toBe(1);
      expect(arr.last()).toBe(5);
      expect(arr.sum()).toBe(15);
      expect(arr.average()).toBe(3);
    });

    it('ExtendedArray 保留 Array 方法', () => {
      const arr = new ExtendedArray(1, 2, 3);
      const mapped = arr.map((x) => x * 2);
      expect(mapped instanceof ExtendedArray).toBe(true);
      expect(mapped.first()).toBe(2);
    });

    it('TypedMap 类型验证', () => {
      const map = new TypedMap('string', 'number');
      map.set('a', 1);
      expect(map.get('a')).toBe(1);

      expect(() => map.set(1, 1)).toThrow(TypeError);
      expect(() => map.set('b', 'x')).toThrow(TypeError);
    });
  });

  describe('练习 5: Mixin 模式', () => {
    it('Product 可序列化', () => {
      const product = new Product('Laptop', 999);
      const json = product.toJSON();
      expect(typeof json).toBe('string');
      expect(json).toContain('Laptop');
    });
  });
});
