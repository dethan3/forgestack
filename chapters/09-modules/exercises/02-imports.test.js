import { describe, it, expect } from 'vitest';
import {
  circleArea,
  doubleSum,
  absoluteDiff,
  calculate,
  countUp,
  useMathUtils,
  circleCircumference,
  sumAll,
} from './02-imports.js';

describe('02-imports: 导入', () => {
  describe('练习 1: 使用导入的值', () => {
    it('circleArea 计算圆面积', () => {
      expect(circleArea(1)).toBeCloseTo(3.14159);
      expect(circleArea(2)).toBeCloseTo(12.56636);
    });

    it('doubleSum 两数之和的两倍', () => {
      expect(doubleSum(2, 3)).toBe(10);
      expect(doubleSum(0, 5)).toBe(10);
    });

    it('absoluteDiff 差的绝对值', () => {
      expect(absoluteDiff(5, 3)).toBe(2);
      expect(absoluteDiff(3, 5)).toBe(2);
    });
  });

  describe('练习 2: 使用导入的类', () => {
    it('calculate 使用 Calculator', () => {
      const result = calculate(10, 2);
      expect(result.sum).toBe(12);
      expect(result.diff).toBe(8);
      expect(result.product).toBe(20);
      expect(result.quotient).toBe(5);
    });

    it('countUp 使用 Counter', () => {
      expect(countUp(5)).toBe(5);
      expect(countUp(0)).toBe(0);
      expect(countUp(10)).toBe(10);
    });
  });

  describe('练习 3: 使用默认导入', () => {
    it('useMathUtils', () => {
      const result = useMathUtils(10, 2);
      expect(result.sum).toBe(12);
      expect(result.diff).toBe(8);
      expect(result.product).toBe(20);
      expect(result.quotient).toBe(5);
      expect(result.pi).toBe(3.14159);
    });
  });

  describe('练习 4: 命名空间导入', () => {
    it('circleCircumference', () => {
      expect(circleCircumference(1)).toBeCloseTo(6.28318);
      expect(circleCircumference(2)).toBeCloseTo(12.56636);
    });
  });

  describe('练习 5: 重命名导入', () => {
    it('sumAll', () => {
      expect(sumAll([1, 2, 3, 4, 5])).toBe(15);
      expect(sumAll([10, 20, 30])).toBe(60);
      expect(sumAll([])).toBe(0);
    });
  });
});
