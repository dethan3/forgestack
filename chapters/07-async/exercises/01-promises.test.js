import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  delay,
  delayedValue,
  randomPromise,
  chainSteps,
  multiplyChain,
  fetchAll,
  firstSuccess,
  getAllResults,
  withTimeout,
  tryOrDefault,
  retry,
  promisify,
  cancellable,
} from './01-promises.js';

describe('01-promises: Promise 基础', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('练习 1: 创建 Promise', () => {
    it('delay 延迟执行', async () => {
      const start = Date.now();
      const promise = delay(100);
      vi.advanceTimersByTime(100);
      await promise;
    });

    it('delayedValue 延迟返回值', async () => {
      const promise = delayedValue('hello', 100);
      vi.advanceTimersByTime(100);
      await expect(promise).resolves.toBe('hello');
    });

    it('randomPromise 随机成功或失败', async () => {
      vi.useRealTimers();
      // 多次运行验证两种结果都可能出现
      const results = await Promise.allSettled(
        Array(10).fill().map(() => randomPromise())
      );
      const statuses = results.map(r => r.status);
      // 至少应该有一些成功或失败（概率极小全是一种）
      expect(statuses.length).toBe(10);
    });
  });

  describe('练习 2: Promise 链', () => {
    it('chainSteps 链式执行', async () => {
      vi.useRealTimers();
      const steps = [
        (x) => Promise.resolve(x + 1),
        (x) => Promise.resolve(x * 2),
        (x) => Promise.resolve(x + 3)
      ];
      const result = await chainSteps(1, steps);
      expect(result).toBe(7); // ((1+1)*2)+3 = 7
    });

    it('multiplyChain 连续乘 2', async () => {
      const promise = multiplyChain(2, 3);
      vi.advanceTimersByTime(300);
      await expect(promise).resolves.toBe(16); // 2*2*2*2 = 16
    });
  });

  describe('练习 3: Promise 静态方法', () => {
    it('fetchAll 并行获取', async () => {
      vi.useRealTimers();
      const fetchFn = (url) => Promise.resolve(`data from ${url}`);
      const urls = ['/a', '/b', '/c'];
      const results = await fetchAll(urls, fetchFn);
      expect(results).toEqual([
        'data from /a',
        'data from /b',
        'data from /c'
      ]);
    });

    it('firstSuccess 第一个成功', async () => {
      vi.useRealTimers();
      const promises = [
        Promise.reject('error1'),
        Promise.resolve('success'),
        Promise.reject('error2')
      ];
      await expect(firstSuccess(promises)).resolves.toBe('success');
    });

    it('getAllResults 收集所有结果', async () => {
      vi.useRealTimers();
      const promises = [
        Promise.resolve(1),
        Promise.reject('error'),
        Promise.resolve(3)
      ];
      const { successes, failures } = await getAllResults(promises);
      expect(successes).toEqual([1, 3]);
      expect(failures).toEqual(['error']);
    });

    it('withTimeout 超时', async () => {
      const slowPromise = new Promise(r => setTimeout(() => r('done'), 200));
      const promise = withTimeout(slowPromise, 100);
      vi.advanceTimersByTime(100);
      await expect(promise).rejects.toThrow();
    });

    it('withTimeout 成功', async () => {
      const fastPromise = new Promise(r => setTimeout(() => r('done'), 50));
      const promise = withTimeout(fastPromise, 100);
      vi.advanceTimersByTime(50);
      await expect(promise).resolves.toBe('done');
    });
  });

  describe('练习 4: 错误处理', () => {
    it('tryOrDefault 返回默认值', async () => {
      vi.useRealTimers();
      const fn = () => Promise.reject(new Error('fail'));
      const result = await tryOrDefault(fn, 'default');
      expect(result).toBe('default');
    });

    it('tryOrDefault 成功时返回结果', async () => {
      vi.useRealTimers();
      const fn = () => Promise.resolve('success');
      const result = await tryOrDefault(fn, 'default');
      expect(result).toBe('success');
    });

    it('retry 重试成功', async () => {
      vi.useRealTimers();
      let attempts = 0;
      const fn = () => {
        attempts++;
        if (attempts < 3) return Promise.reject(new Error('fail'));
        return Promise.resolve('success');
      };
      const result = await retry(fn, 5);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });
  });

  describe('练习 5: 实用函数', () => {
    it('promisify 转换回调函数', async () => {
      vi.useRealTimers();
      const callbackFn = (x, cb) => {
        setTimeout(() => cb(null, x * 2), 10);
      };
      const promiseFn = promisify(callbackFn);
      const result = await promiseFn(5);
      expect(result).toBe(10);
    });

    it('cancellable 取消 Promise', async () => {
      vi.useRealTimers();
      const { promise, cancel } = cancellable(
        new Promise(r => setTimeout(() => r('done'), 100))
      );
      cancel();
      await expect(promise).rejects.toHaveProperty('cancelled', true);
    });
  });
});
