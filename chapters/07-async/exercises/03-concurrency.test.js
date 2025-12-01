import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  limitConcurrency,
  batchProcess,
  createQueue,
  createPriorityQueue,
  createCancellableFetch,
  createLatestOnly,
  throttleAsync,
  debounceAsyncWithCancel,
  Semaphore,
  ReadWriteLock,
  asyncPool,
} from './03-concurrency.js';

describe('03-concurrency: 并发控制', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('练习 1: 并发限制', () => {
    it('limitConcurrency 限制并发', async () => {
      vi.useRealTimers();
      let concurrent = 0;
      let maxConcurrent = 0;

      const tasks = Array(10).fill().map(() => async () => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await new Promise(r => setTimeout(r, 50));
        concurrent--;
        return 'done';
      });

      const results = await limitConcurrency(tasks, 3);
      expect(results.length).toBe(10);
      expect(maxConcurrent).toBeLessThanOrEqual(3);
    });

    it('batchProcess 批量处理', async () => {
      vi.useRealTimers();
      const items = [1, 2, 3, 4, 5];
      const asyncFn = async (x) => x * 2;
      const results = await batchProcess(items, asyncFn, 2);
      expect(results).toEqual([2, 4, 6, 8, 10]);
    });
  });

  describe('练习 2: 任务队列', () => {
    it('createQueue 基本功能', async () => {
      vi.useRealTimers();
      const queue = createQueue(2);

      const results = [];
      queue.push(async () => { results.push(1); return 1; });
      queue.push(async () => { results.push(2); return 2; });
      queue.push(async () => { results.push(3); return 3; });

      await new Promise(r => setTimeout(r, 100));
      expect(results).toEqual([1, 2, 3]);
    });

    it('createPriorityQueue 优先级', async () => {
      vi.useRealTimers();
      const queue = createPriorityQueue(1);
      const results = [];

      queue.push(async () => { 
        await new Promise(r => setTimeout(r, 10));
        results.push('low');
      }, 1);
      queue.push(async () => { 
        results.push('high');
      }, 10);

      await new Promise(r => setTimeout(r, 100));
      expect(results[1]).toBe('low'); // 高优先级先执行
    });
  });

  describe('练习 3: 竞态和取消', () => {
    it('createCancellableFetch 取消', async () => {
      vi.useRealTimers();
      const fetchFn = () => new Promise(r => setTimeout(() => r('data'), 100));
      const { promise, cancel } = createCancellableFetch('/api', fetchFn);

      setTimeout(cancel, 50);
      await expect(promise).rejects.toHaveProperty('cancelled', true);
    });

    it('createLatestOnly 只返回最后结果', async () => {
      vi.useRealTimers();
      const latestOnly = createLatestOnly();

      const fn = (x, delay) => new Promise(r => setTimeout(() => r(x), delay));

      const p1 = latestOnly(() => fn('first', 100));
      const p2 = latestOnly(() => fn('second', 50));

      const [r1, r2] = await Promise.allSettled([p1, p2]);
      expect(r2.value).toBe('second');
    });
  });

  describe('练习 4: 节流和防抖', () => {
    it('throttleAsync 节流', async () => {
      vi.useRealTimers();
      const fn = vi.fn(async () => 'done');
      const throttled = throttleAsync(fn, 100);

      throttled();
      throttled();
      throttled();

      await new Promise(r => setTimeout(r, 150));
      expect(fn).toHaveBeenCalledTimes(1);

      throttled();
      await new Promise(r => setTimeout(r, 150));
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('debounceAsyncWithCancel 防抖带取消', async () => {
      vi.useRealTimers();
      const fn = vi.fn(async (x) => x);
      const debounced = debounceAsyncWithCancel(fn, 50);

      debounced(1);
      debounced(2);
      const result = await debounced(3);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(3);
    });
  });

  describe('练习 5: 高级模式', () => {
    it('Semaphore 信号量', async () => {
      vi.useRealTimers();
      const sem = new Semaphore(2);
      let concurrent = 0;
      let maxConcurrent = 0;

      const tasks = Array(5).fill().map(() => sem.use(async () => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await new Promise(r => setTimeout(r, 50));
        concurrent--;
      }));

      await Promise.all(tasks);
      expect(maxConcurrent).toBeLessThanOrEqual(2);
    });

    it('asyncPool 异步池', async () => {
      vi.useRealTimers();
      let concurrent = 0;
      let maxConcurrent = 0;

      const items = [1, 2, 3, 4, 5];
      const results = await asyncPool(2, items, async (item) => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await new Promise(r => setTimeout(r, 50));
        concurrent--;
        return item * 2;
      });

      expect(results).toEqual([2, 4, 6, 8, 10]);
      expect(maxConcurrent).toBeLessThanOrEqual(2);
    });
  });
});
