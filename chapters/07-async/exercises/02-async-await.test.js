import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getUser,
  getUserWithPosts,
  safeAsync,
  fetchWithError,
  tryMultipleSources,
  runSerial,
  runParallel,
  runParallelOrdered,
  mapSerial,
  mapParallel,
  filterAsync,
  withAsyncTimeout,
  withRetry,
  debounceAsync,
} from './02-async-await.js';

describe('02-async-await: async/await', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('练习 1: 基本 async/await', () => {
    it('getUser 获取用户', async () => {
      vi.useRealTimers();
      const fetchFn = (id) => Promise.resolve({ id, name: 'Alice' });
      const user = await getUser(1, fetchFn);
      expect(user).toEqual({ id: 1, name: 'Alice' });
    });

    it('getUserWithPosts 获取用户和帖子', async () => {
      vi.useRealTimers();
      const getUserFn = (id) => Promise.resolve({ id, name: 'Alice' });
      const getPostsFn = (userId) => Promise.resolve([{ id: 1, userId }]);

      const result = await getUserWithPosts(1, getUserFn, getPostsFn);
      expect(result.user).toEqual({ id: 1, name: 'Alice' });
      expect(result.posts).toEqual([{ id: 1, userId: 1 }]);
    });
  });

  describe('练习 2: 错误处理', () => {
    it('safeAsync 返回 null', async () => {
      vi.useRealTimers();
      const fn = () => Promise.reject(new Error('fail'));
      const result = await safeAsync(fn);
      expect(result).toBe(null);
    });

    it('safeAsync 返回结果', async () => {
      vi.useRealTimers();
      const fn = () => Promise.resolve('success');
      const result = await safeAsync(fn);
      expect(result).toBe('success');
    });

    it('fetchWithError 添加上下文', async () => {
      vi.useRealTimers();
      const fetchFn = () => Promise.reject(new Error('Network error'));
      await expect(fetchWithError('/api/data', fetchFn))
        .rejects.toThrow('Failed to fetch /api/data');
    });

    it('tryMultipleSources 尝试多个源', async () => {
      vi.useRealTimers();
      const sources = [
        () => Promise.reject('error1'),
        () => Promise.resolve('success'),
        () => Promise.reject('error2')
      ];
      const result = await tryMultipleSources(sources);
      expect(result).toBe('success');
    });
  });

  describe('练习 3: 并行 vs 串行', () => {
    it('runSerial 串行执行', async () => {
      vi.useRealTimers();
      const order = [];
      const tasks = [
        async () => { order.push(1); return 1; },
        async () => { order.push(2); return 2; },
        async () => { order.push(3); return 3; }
      ];
      const results = await runSerial(tasks);
      expect(results).toEqual([1, 2, 3]);
      expect(order).toEqual([1, 2, 3]);
    });

    it('runParallel 并行执行', async () => {
      vi.useRealTimers();
      const tasks = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
        () => Promise.resolve(3)
      ];
      const results = await runParallel(tasks);
      expect(results).toEqual([1, 2, 3]);
    });

    it('runParallelOrdered 并行但有序', async () => {
      vi.useRealTimers();
      const tasks = [
        () => new Promise(r => setTimeout(() => r(1), 30)),
        () => new Promise(r => setTimeout(() => r(2), 10)),
        () => new Promise(r => setTimeout(() => r(3), 20))
      ];
      const results = await runParallelOrdered(tasks);
      expect(results).toEqual([1, 2, 3]); // 按任务顺序，不是完成顺序
    });
  });

  describe('练习 4: 循环中的 async', () => {
    it('mapSerial 串行映射', async () => {
      vi.useRealTimers();
      const items = [1, 2, 3];
      const asyncFn = async (x) => x * 2;
      const results = await mapSerial(items, asyncFn);
      expect(results).toEqual([2, 4, 6]);
    });

    it('mapParallel 并行映射', async () => {
      vi.useRealTimers();
      const items = [1, 2, 3];
      const asyncFn = async (x) => x * 2;
      const results = await mapParallel(items, asyncFn);
      expect(results).toEqual([2, 4, 6]);
    });

    it('filterAsync 异步过滤', async () => {
      vi.useRealTimers();
      const items = [1, 2, 3, 4, 5];
      const asyncPredicate = async (x) => x % 2 === 0;
      const results = await filterAsync(items, asyncPredicate);
      expect(results).toEqual([2, 4]);
    });
  });

  describe('练习 5: 实用模式', () => {
    it('withAsyncTimeout 超时', async () => {
      const asyncFn = () => new Promise(r => setTimeout(() => r('done'), 200));
      const promise = withAsyncTimeout(asyncFn, 100);
      vi.advanceTimersByTime(100);
      await expect(promise).rejects.toThrow();
    });

    it('withRetry 重试成功', async () => {
      vi.useRealTimers();
      let attempts = 0;
      const asyncFn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };
      const result = await withRetry(asyncFn, 5, 10);
      expect(result).toBe('success');
    });

    it('debounceAsync 防抖', async () => {
      vi.useRealTimers();
      const fn = vi.fn(async (x) => x * 2);
      const debounced = debounceAsync(fn, 50);

      debounced(1);
      debounced(2);
      debounced(3);

      await new Promise(r => setTimeout(r, 100));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(3);
    });
  });
});
