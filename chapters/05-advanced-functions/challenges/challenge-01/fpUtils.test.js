import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { compose, pipe, curry, memoize, debounce, throttle } from './fpUtils.js';

describe('综合挑战 01: 函数式工具库', () => {
  describe('compose', () => {
    it('从右向左组合函数', () => {
      const add1 = (x) => x + 1;
      const double = (x) => x * 2;
      const f = compose(add1, double);
      expect(f(3)).toBe(7); // 3*2=6, 6+1=7
    });

    it('处理单个函数', () => {
      const add1 = (x) => x + 1;
      expect(compose(add1)(5)).toBe(6);
    });

    it('处理空函数列表', () => {
      expect(compose()(5)).toBe(5);
    });
  });

  describe('pipe', () => {
    it('从左向右组合函数', () => {
      const add1 = (x) => x + 1;
      const double = (x) => x * 2;
      const f = pipe(add1, double);
      expect(f(3)).toBe(8); // 3+1=4, 4*2=8
    });
  });

  describe('curry', () => {
    it('支持逐个参数调用', () => {
      const add = (a, b, c) => a + b + c;
      const curried = curry(add);
      expect(curried(1)(2)(3)).toBe(6);
    });

    it('支持多参数调用', () => {
      const add = (a, b, c) => a + b + c;
      const curried = curry(add);
      expect(curried(1, 2)(3)).toBe(6);
      expect(curried(1)(2, 3)).toBe(6);
      expect(curried(1, 2, 3)).toBe(6);
    });
  });

  describe('memoize', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('缓存结果', () => {
      const fn = vi.fn((x) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('支持 maxSize 选项', () => {
      const fn = vi.fn((x) => x * 2);
      const memoized = memoize(fn, { maxSize: 2 });

      memoized(1); // 缓存: [1]
      memoized(2); // 缓存: [1, 2]
      memoized(3); // 缓存: [2, 3]（1 被淘汰）

      expect(fn).toHaveBeenCalledTimes(3);

      memoized(1); // 重新计算
      expect(fn).toHaveBeenCalledTimes(4);
    });

    it('支持 ttl 选项', () => {
      const fn = vi.fn(() => Date.now());
      const memoized = memoize(fn, { ttl: 1000 });

      const result1 = memoized();
      vi.advanceTimersByTime(500);
      expect(memoized()).toBe(result1);

      vi.advanceTimersByTime(600);
      expect(memoized()).not.toBe(result1);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('延迟执行', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('支持 leading 选项', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100, { leading: true, trailing: false });

      debounced();
      expect(fn).toHaveBeenCalledTimes(1);

      debounced();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('支持 cancel 方法', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced.cancel();
      vi.advanceTimersByTime(100);

      expect(fn).not.toHaveBeenCalled();
    });

    it('支持 flush 方法', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced.flush();

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('限制执行频率', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('支持 trailing 选项', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100, { trailing: true });

      throttled();
      throttled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2); // leading + trailing
    });
  });
});
