import { describe, it, expect, vi } from 'vitest';
import {
  multiplier,
  inRange,
  myMap,
  myFilter,
  myReduce,
  once,
  after,
  before,
  logged,
  timed,
  negate,
  prop,
  invoke,
  mapObject,
} from './01-higher-order.js';

describe('01-higher-order: 高阶函数', () => {
  describe('练习 1: 函数作为返回值', () => {
    it('multiplier 创建乘法器', () => {
      const triple = multiplier(3);
      expect(triple(4)).toBe(12);
      expect(triple(5)).toBe(15);
    });

    it('inRange 创建范围检查器', () => {
      const check = inRange(1, 10);
      expect(check(5)).toBe(true);
      expect(check(0)).toBe(false);
      expect(check(10)).toBe(true);
    });
  });

  describe('练习 2: 函数作为参数', () => {
    it('myMap 映射数组', () => {
      expect(myMap([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
    });

    it('myFilter 过滤数组', () => {
      expect(myFilter([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4]);
    });

    it('myReduce 累积计算', () => {
      expect(myReduce([1, 2, 3, 4], (a, b) => a + b, 0)).toBe(10);
      expect(myReduce([1, 2, 3], (a, b) => a * b, 1)).toBe(6);
    });
  });

  describe('练习 3: 函数包装器', () => {
    it('once 只执行一次', () => {
      const fn = vi.fn(() => 'result');
      const onceFn = once(fn);

      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('after 在 n 次后执行', () => {
      const fn = vi.fn(() => 'done');
      const afterFn = after(3, fn);

      expect(afterFn()).toBe(undefined);
      expect(afterFn()).toBe(undefined);
      expect(afterFn()).toBe('done');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('before 最多执行 n 次', () => {
      const fn = vi.fn((x) => x * 2);
      const beforeFn = before(3, fn);

      expect(beforeFn(1)).toBe(2);
      expect(beforeFn(2)).toBe(4);
      expect(beforeFn(3)).toBe(6);
      expect(beforeFn(4)).toBe(6); // 返回最后一次结果
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('练习 4: 函数增强', () => {
    it('logged 记录调用', () => {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {});
      const add = (a, b) => a + b;
      const loggedAdd = logged(add);

      expect(loggedAdd(1, 2)).toBe(3);
      expect(log).toHaveBeenCalled();

      log.mockRestore();
    });

    it('timed 计时执行', () => {
      const fn = () => 'result';
      const timedFn = timed(fn);
      const { result, time } = timedFn();

      expect(result).toBe('result');
      expect(typeof time).toBe('number');
      expect(time).toBeGreaterThanOrEqual(0);
    });

    it('negate 否定谓词', () => {
      const isEven = (n) => n % 2 === 0;
      const isOdd = negate(isEven);

      expect(isOdd(3)).toBe(true);
      expect(isOdd(4)).toBe(false);
    });
  });

  describe('练习 5: 组合应用', () => {
    it('prop 提取属性', () => {
      const getName = prop('name');
      expect(getName({ name: 'Alice' })).toBe('Alice');
    });

    it('invoke 调用方法', () => {
      const upper = invoke('toUpperCase');
      expect(upper('hello')).toBe('HELLO');

      const slice = invoke('slice', 1, 3);
      expect(slice('hello')).toBe('el');
    });

    it('mapObject 映射对象值', () => {
      expect(mapObject({ a: 1, b: 2 }, (x) => x * 2)).toEqual({ a: 2, b: 4 });
    });
  });
});
