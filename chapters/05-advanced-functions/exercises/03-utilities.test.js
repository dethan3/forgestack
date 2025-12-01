import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  compose,
  pipe,
  memoize,
  memoizeWithTTL,
  debounce,
  debounceImmediate,
  throttle,
  delay,
  retry,
  timeout,
  batch,
} from './03-utilities.js';

describe('03-utilities: 实用工具函数', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('练习 1: 函数组合', () => {
    it('compose 从右向左组合', () => {
      const add1 = (x) => x + 1;
      const double = (x) => x * 2;
      const square = (x) => x * x;

      const composed = compose(add1, double, square);
      expect(composed(3)).toBe(19); // 3^2=9, 9*2=18, 18+1=19
    });

    it('pipe 从左向右组合', () => {
      const add1 = (x) => x + 1;
      const double = (x) => x * 2;
      const square = (x) => x * x;

      const piped = pipe(add1, double, square);
      expect(piped(3)).toBe(64); // 3+1=4, 4*2=8, 8^2=64
    });
  });

  describe('练习 2: 记忆化', () => {
    it('memoize 缓存结果', () => {
      const fn = vi.fn((x) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoized(3)).toBe(6);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('memoizeWithTTL 带过期时间', () => {
      const fn = vi.fn(() => Date.now());
      const memoized = memoizeWithTTL(fn, 1000);

      const result1 = memoized();
      vi.advanceTimersByTime(500);
      const result2 = memoized();
      expect(result1).toBe(result2);

      vi.advanceTimersByTime(600);
      const result3 = memoized();
      expect(result3).not.toBe(result1);
    });
  });

  describe('练习 3: 防抖', () => {
    it('debounce 延迟执行', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('debounceImmediate 立即执行', () => {
      const fn = vi.fn();
      const debounced = debounceImmediate(fn, 100, true);

      debounced();
      expect(fn).toHaveBeenCalledTimes(1);

      debounced();
      debounced();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(100);
      debounced();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('练习 4: 节流', () => {
    it('throttle 限制频率', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('练习 5: 其他工具', () => {
    it('delay 延迟执行', async () => {
      const promise = delay(100);
      vi.advanceTimersByTime(100);
      await expect(promise).resolves.toBeUndefined();
    });

    it('retry 自动重试', async () => {
      vi.useRealTimers();

      let attempts = 0;
      const fn = vi.fn(async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      });

      const result = await retry(fn, 5, 10);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('timeout 超时拒绝', async () => {
      const slowFn = async () => {
        await new Promise((r) => setTimeout(r, 200));
        return 'done';
      };

      const timedFn = timeout(slowFn, 100);
      vi.advanceTimersByTime(100);

      await expect(timedFn()).rejects.toThrow();
    });

    it('batch 批量执行', async () => {
      vi.useRealTimers();

      const results = [];
      const fn = vi.fn((items) => {
        results.push(items);
      });

      const batched = batch(fn, 3, 50);

      batched(1);
      batched(2);
      batched(3);
      batched(4);

      await new Promise((r) => setTimeout(r, 100));

      expect(results).toContainEqual([1, 2, 3]);
    });
  });
});
