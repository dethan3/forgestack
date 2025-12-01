import { describe, it, expect } from 'vitest';
import {
  square,
  abs,
  getEvens,
  getLengths,
  allPositive,
  doubleObject,
  createPerson,
  createCounter,
  processNumbers,
  delay,
  sortByProp,
} from './02-arrow-functions.js';

describe('02-arrow-functions: 箭头函数', () => {
  describe('练习 1: square & abs', () => {
    it('square 返回平方', () => {
      expect(square(3)).toBe(9);
      expect(square(-4)).toBe(16);
    });

    it('abs 返回绝对值', () => {
      expect(abs(5)).toBe(5);
      expect(abs(-5)).toBe(5);
      expect(abs(0)).toBe(0);
    });
  });

  describe('练习 2: 数组方法', () => {
    it('getEvens 返回偶数', () => {
      expect(getEvens([1, 2, 3, 4, 5])).toEqual([2, 4]);
    });

    it('getLengths 返回长度', () => {
      expect(getLengths(['hello', 'world'])).toEqual([5, 5]);
      expect(getLengths(['a', 'bb', 'ccc'])).toEqual([1, 2, 3]);
    });

    it('allPositive 检查正数', () => {
      expect(allPositive([1, 2, 3])).toBe(true);
      expect(allPositive([1, -2, 3])).toBe(false);
      expect(allPositive([])).toBe(true);
    });
  });

  describe('练习 3: 隐式返回', () => {
    it('doubleObject 返回对象', () => {
      expect(doubleObject(5)).toEqual({ doubled: 10 });
    });

    it('createPerson 返回对象', () => {
      expect(createPerson('Alice', 'Smith')).toEqual({
        first: 'Alice',
        last: 'Smith',
      });
    });
  });

  describe('练习 4: createCounter', () => {
    it('创建计数器', () => {
      const counter = createCounter(10);
      expect(counter.getCount()).toBe(10);
      counter.increment();
      expect(counter.getCount()).toBe(11);
      counter.decrement();
      expect(counter.getCount()).toBe(10);
    });

    it('方法可以独立调用', () => {
      const counter = createCounter(0);
      const { increment, getCount } = counter;
      increment();
      increment();
      expect(getCount()).toBe(2);
    });
  });

  describe('练习 5: processNumbers', () => {
    it('过滤、转换、排序', () => {
      expect(processNumbers([3, -1, 2, -4, 1])).toEqual([2, 4, 6]);
    });

    it('空数组返回空', () => {
      expect(processNumbers([])).toEqual([]);
    });
  });

  describe('练习 6: delay & sortByProp', () => {
    it('delay 返回 Promise', async () => {
      const start = Date.now();
      await delay(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(45);
    });

    it('sortByProp 按属性排序', () => {
      const arr = [{ name: 'Bob' }, { name: 'Alice' }, { name: 'Charlie' }];
      expect(sortByProp(arr, 'name')[0].name).toBe('Alice');
    });
  });
});
