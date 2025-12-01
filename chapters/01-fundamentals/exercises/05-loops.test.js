import { describe, it, expect } from 'vitest';
import {
  range,
  sum,
  getKeys,
  factorial,
  findFirstNegativeIndex,
  sumPositive,
  multiplicationTable,
  withIndex,
} from './05-loops.js';

describe('05-loops: 循环', () => {
  describe('练习 1: range', () => {
    it('生成 1 到 n 的数组', () => {
      expect(range(5)).toEqual([1, 2, 3, 4, 5]);
      expect(range(3)).toEqual([1, 2, 3]);
    });

    it('n 为 0 返回空数组', () => {
      expect(range(0)).toEqual([]);
    });
  });

  describe('练习 2: sum', () => {
    it('计算数组元素的和', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([10, 20, 30])).toBe(60);
    });

    it('空数组返回 0', () => {
      expect(sum([])).toBe(0);
    });
  });

  describe('练习 3: getKeys', () => {
    it('返回对象的键数组', () => {
      expect(getKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
    });

    it('空对象返回空数组', () => {
      expect(getKeys({})).toEqual([]);
    });
  });

  describe('练习 4: factorial', () => {
    it('计算阶乘', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(3)).toBe(6);
    });

    it('0! = 1', () => {
      expect(factorial(0)).toBe(1);
    });

    it('1! = 1', () => {
      expect(factorial(1)).toBe(1);
    });
  });

  describe('练习 5: findFirstNegativeIndex', () => {
    it('找到第一个负数的索引', () => {
      expect(findFirstNegativeIndex([1, 2, -3, 4])).toBe(2);
      expect(findFirstNegativeIndex([-1, 2, 3])).toBe(0);
    });

    it('没有负数返回 -1', () => {
      expect(findFirstNegativeIndex([1, 2, 3])).toBe(-1);
      expect(findFirstNegativeIndex([])).toBe(-1);
    });
  });

  describe('练习 6: sumPositive', () => {
    it('只计算正数的和', () => {
      expect(sumPositive([1, -2, 3, -4, 5])).toBe(9);
      expect(sumPositive([-1, -2, -3])).toBe(0);
    });

    it('包含零时不计入', () => {
      expect(sumPositive([0, 1, 2])).toBe(3);
    });
  });

  describe('练习 7: multiplicationTable', () => {
    it('生成 9x9 乘法表', () => {
      const table = multiplicationTable();
      expect(table.length).toBe(9);
      expect(table[0].length).toBe(9);
      expect(table[0][0]).toBe(1);  // 1 * 1
      expect(table[1][2]).toBe(6);  // 2 * 3
      expect(table[8][8]).toBe(81); // 9 * 9
    });
  });

  describe('练习 8: withIndex', () => {
    it('返回带索引的对象数组', () => {
      expect(withIndex(['a', 'b', 'c'])).toEqual([
        { index: 0, value: 'a' },
        { index: 1, value: 'b' },
        { index: 2, value: 'c' },
      ]);
    });

    it('空数组返回空数组', () => {
      expect(withIndex([])).toEqual([]);
    });
  });
});
