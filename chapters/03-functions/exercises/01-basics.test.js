import { describe, it, expect } from 'vitest';
import {
  add,
  subtract,
  greet,
  sum,
  max,
  mapArray,
  filterArray,
  createMultiplier,
  createPrefixer,
  compose,
  curriedAdd,
  fibonacci,
} from './01-basics.js';

describe('01-basics: 函数基础', () => {
  describe('练习 1: add & subtract', () => {
    it('add 返回两数之和', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-1, 1)).toBe(0);
    });

    it('subtract 返回两数之差', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('练习 2: greet', () => {
    it('有参数时使用参数', () => {
      expect(greet('Alice')).toBe('Hello, Alice!');
    });

    it('无参数时使用默认值', () => {
      expect(greet()).toBe('Hello, Guest!');
    });
  });

  describe('练习 3: sum & max', () => {
    it('sum 返回所有参数的和', () => {
      expect(sum(1, 2, 3)).toBe(6);
      expect(sum(1, 2, 3, 4, 5)).toBe(15);
    });

    it('sum 无参数返回 0', () => {
      expect(sum()).toBe(0);
    });

    it('max 返回最大值', () => {
      expect(max(1, 5, 3)).toBe(5);
      expect(max(-1, -5, -3)).toBe(-1);
    });

    it('max 无参数返回 undefined', () => {
      expect(max()).toBe(undefined);
    });
  });

  describe('练习 4: mapArray & filterArray', () => {
    it('mapArray 转换数组', () => {
      expect(mapArray([1, 2, 3], n => n * 2)).toEqual([2, 4, 6]);
      expect(mapArray(['a', 'b'], s => s.toUpperCase())).toEqual(['A', 'B']);
    });

    it('filterArray 过滤数组', () => {
      expect(filterArray([1, 2, 3, 4], n => n > 2)).toEqual([3, 4]);
      expect(filterArray([1, 2, 3], n => n > 10)).toEqual([]);
    });
  });

  describe('练习 5: createMultiplier & createPrefixer', () => {
    it('createMultiplier 创建乘法器', () => {
      const double = createMultiplier(2);
      const triple = createMultiplier(3);
      expect(double(5)).toBe(10);
      expect(triple(5)).toBe(15);
    });

    it('createPrefixer 创建前缀添加器', () => {
      const addHello = createPrefixer('Hello, ');
      expect(addHello('World')).toBe('Hello, World');
      expect(addHello('Alice')).toBe('Hello, Alice');
    });
  });

  describe('练习 6: compose', () => {
    it('组合两个函数', () => {
      const addOne = x => x + 1;
      const double = x => x * 2;
      expect(compose(double, addOne)(3)).toBe(8);  // double(addOne(3))
      expect(compose(addOne, double)(3)).toBe(7);  // addOne(double(3))
    });
  });

  describe('练习 7: curriedAdd', () => {
    it('支持多种调用方式', () => {
      expect(curriedAdd(1, 2, 3)).toBe(6);
      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
    });
  });

  describe('练习 8: fibonacci', () => {
    it('计算斐波那契数列', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(6)).toBe(8);
      expect(fibonacci(10)).toBe(55);
    });
  });
});
