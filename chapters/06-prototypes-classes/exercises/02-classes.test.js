import { describe, it, expect, beforeEach } from 'vitest';
import {
  Rectangle,
  Circle,
  Temperature,
  BoundedValue,
  Counter,
  MathHelper,
  BankAccount,
  User,
  StringBuilder,
} from './02-classes.js';

describe('02-classes: 类基础', () => {
  describe('练习 1: 基本类', () => {
    it('Rectangle 基本功能', () => {
      const rect = new Rectangle(10, 5);
      expect(rect.width).toBe(10);
      expect(rect.height).toBe(5);
      expect(rect.area).toBe(50);
      expect(rect.perimeter).toBe(30);
    });

    it('Rectangle scale 方法', () => {
      const rect = new Rectangle(10, 5);
      rect.scale(2);
      expect(rect.width).toBe(20);
      expect(rect.height).toBe(10);
    });

    it('Circle 基本功能', () => {
      const circle = new Circle(5);
      expect(circle.radius).toBe(5);
      expect(circle.area).toBeCloseTo(78.54, 1);
      expect(circle.circumference).toBeCloseTo(31.42, 1);
    });

    it('Circle 静态工厂方法', () => {
      const circle = Circle.fromDiameter(10);
      expect(circle.radius).toBe(5);
    });
  });

  describe('练习 2: Getter 和 Setter', () => {
    it('Temperature 摄氏度', () => {
      const temp = new Temperature(0);
      expect(temp.celsius).toBe(0);
      expect(temp.fahrenheit).toBe(32);
      expect(temp.kelvin).toBeCloseTo(273.15);
    });

    it('Temperature 设置华氏度', () => {
      const temp = new Temperature(0);
      temp.fahrenheit = 212;
      expect(temp.celsius).toBe(100);
    });

    it('BoundedValue 限制范围', () => {
      const bounded = new BoundedValue(5, 0, 10);
      expect(bounded.value).toBe(5);

      bounded.value = 15;
      expect(bounded.value).toBe(10);

      bounded.value = -5;
      expect(bounded.value).toBe(0);
    });
  });

  describe('练习 3: 静态方法', () => {
    beforeEach(() => {
      Counter.reset?.();
    });

    it('Counter 计数实例', () => {
      const c1 = new Counter();
      const c2 = new Counter();
      expect(c1.id).toBe(1);
      expect(c2.id).toBe(2);
      expect(Counter.getCount()).toBe(2);
    });

    it('MathHelper 工具方法', () => {
      expect(MathHelper.PI).toBeCloseTo(3.14159);
      expect(MathHelper.clamp(5, 0, 10)).toBe(5);
      expect(MathHelper.clamp(15, 0, 10)).toBe(10);
      expect(MathHelper.lerp(0, 10, 0.5)).toBe(5);
    });
  });

  describe('练习 4: 私有字段', () => {
    it('BankAccount 基本操作', () => {
      const account = new BankAccount(100);
      expect(account.balance).toBe(100);

      account.deposit(50);
      expect(account.balance).toBe(150);

      expect(account.withdraw(50)).toBe(true);
      expect(account.balance).toBe(100);

      expect(account.withdraw(200)).toBe(false);
      expect(account.balance).toBe(100);
    });

    it('User 密码管理', () => {
      const user = new User('alice', 'password123');
      expect(user.checkPassword('password123')).toBe(true);
      expect(user.checkPassword('wrong')).toBe(false);

      expect(user.setPassword('password123', 'newpass')).toBe(true);
      expect(user.checkPassword('newpass')).toBe(true);
    });
  });

  describe('练习 5: 链式调用', () => {
    it('StringBuilder 链式操作', () => {
      const sb = new StringBuilder('Hello');
      const result = sb.append(' World').toUpperCase().toString();
      expect(result).toBe('HELLO WORLD');
    });

    it('StringBuilder prepend', () => {
      const sb = new StringBuilder('World');
      const result = sb.prepend('Hello ').toString();
      expect(result).toBe('Hello World');
    });
  });
});
