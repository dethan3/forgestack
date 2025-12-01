import { describe, it, expect, vi } from 'vitest';
import { pipe, curry, retry, timeout, batch } from './functionUtils.js';

describe('综合挑战 01: 函数工具库', () => {
  describe('pipe', () => {
    it('从左到右组合函数', () => {
      const addOne = (x) => x + 1;
      const double = (x) => x * 2;
      const square = (x) => x * x;

      const process = pipe(addOne, double, square);
      expect(process(2)).toBe(36); // ((2+1)*2)^2
    });

    it('单个函数', () => {
      const addOne = (x) => x + 1;
      expect(pipe(addOne)(5)).toBe(6);
    });

    it('无函数返回原值', () => {
      expect(pipe()(5)).toBe(5);
    });
  });

  describe('curry', () => {
    it('柯里化三参数函数', () => {
      const add = (a, b, c) => a + b + c;
      const curriedAdd = curry(add);

      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });

    it('柯里化两参数函数', () => {
      const multiply = (a, b) => a * b;
      const curriedMultiply = curry(multiply);

      expect(curriedMultiply(3)(4)).toBe(12);
      expect(curriedMultiply(3, 4)).toBe(12);
    });
  });

  describe('retry', () => {
    it('成功时直接返回', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const retryFn = retry(fn, 3);

      const result = await retryFn();
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('失败后重试', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      const retryFn = retry(fn, 3, 10);
      const result = await retryFn();

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('超过重试次数后失败', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('always fail'));
      const retryFn = retry(fn, 2, 10);

      await expect(retryFn()).rejects.toThrow('always fail');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('timeout', () => {
    it('在时间内完成', async () => {
      const fn = () => Promise.resolve('done');
      const timeoutFn = timeout(fn, 100);

      const result = await timeoutFn();
      expect(result).toBe('done');
    });

    it('超时则拒绝', async () => {
      const fn = () => new Promise((r) => setTimeout(() => r('done'), 200));
      const timeoutFn = timeout(fn, 50);

      await expect(timeoutFn()).rejects.toThrow();
    });
  });

  describe('batch', () => {
    it('分批处理数组', async () => {
      const results = [];
      const fn = (item) => {
        results.push(item);
        return item * 2;
      };

      const batchFn = batch(fn, 2);
      const output = await batchFn([1, 2, 3, 4, 5]);

      expect(results).toEqual([1, 2, 3, 4, 5]);
      expect(output).toEqual([2, 4, 6, 8, 10]);
    });

    it('处理空数组', async () => {
      const fn = (item) => item * 2;
      const batchFn = batch(fn, 2);

      const output = await batchFn([]);
      expect(output).toEqual([]);
    });
  });
});
