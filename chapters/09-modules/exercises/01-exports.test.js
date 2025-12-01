import { describe, it, expect } from 'vitest';

// 测试命名导出
import {
  PI,
  add,
  subtract,
  multiply,
  divide,
  Calculator,
  Counter,
  config,
  colors,
} from './01-exports.js';

// 测试默认导出
import MathUtils from './01-exports.js';

describe('01-exports: 导出', () => {
  describe('练习 1: 命名导出', () => {
    it('PI 常量', () => {
      expect(PI).toBe(3.14159);
    });

    it('add 函数', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-1, 1)).toBe(0);
    });

    it('subtract 函数', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(0, 5)).toBe(-5);
    });

    it('multiply 函数', () => {
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(-2, 3)).toBe(-6);
    });

    it('divide 函数', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(7, 2)).toBe(3.5);
    });
  });

  describe('练习 2: 类导出', () => {
    it('Calculator 类', () => {
      const calc = new Calculator();
      expect(calc.add(2, 3)).toBe(5);
      expect(calc.subtract(5, 2)).toBe(3);
      expect(calc.multiply(3, 4)).toBe(12);
      expect(calc.divide(10, 2)).toBe(5);
    });

    it('Counter 类', () => {
      const counter = new Counter();
      expect(counter.count).toBe(0);
      
      counter.increment();
      expect(counter.count).toBe(1);
      
      counter.increment();
      counter.increment();
      expect(counter.count).toBe(3);
      
      counter.decrement();
      expect(counter.count).toBe(2);
      
      counter.reset();
      expect(counter.count).toBe(0);
    });
  });

  describe('练习 3: 对象和数组导出', () => {
    it('config 对象', () => {
      expect(config).toHaveProperty('apiUrl');
      expect(config).toHaveProperty('timeout');
      expect(config).toHaveProperty('retries');
    });

    it('colors 数组', () => {
      expect(colors).toContain('red');
      expect(colors).toContain('green');
      expect(colors).toContain('blue');
    });
  });

  describe('练习 4: 默认导出', () => {
    it('MathUtils 对象', () => {
      expect(MathUtils.PI).toBe(3.14159);
      expect(MathUtils.add(2, 3)).toBe(5);
      expect(MathUtils.subtract(5, 2)).toBe(3);
      expect(MathUtils.multiply(3, 4)).toBe(12);
      expect(MathUtils.divide(10, 2)).toBe(5);
    });
  });
});
