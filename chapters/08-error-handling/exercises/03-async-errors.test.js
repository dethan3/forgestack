import { describe, it, expect, vi } from 'vitest';
import {
  safePromise,
  promiseWithDefault,
  collectResults,
  withTimeout,
  fetchWithTimeout,
  withRetry,
  withExponentialBackoff,
  createErrorBoundary,
  runAllSettled,
  withFallback,
  tryMultiple,
  raceWithCancel,
} from './03-async-errors.js';

describe('03-async-errors: 异步错误处理', () => {
  describe('练习 1: Promise 错误处理', () => {
    it('safePromise 成功', async () => {
      const [data, error] = await safePromise(Promise.resolve('success'));
      expect(data).toBe('success');
      expect(error).toBe(null);
    });

    it('safePromise 失败', async () => {
      const [data, error] = await safePromise(Promise.reject(new Error('fail')));
      expect(data).toBe(null);
      expect(error).toBeInstanceOf(Error);
    });

    it('promiseWithDefault', async () => {
      const result1 = await promiseWithDefault(Promise.resolve('value'), 'default');
      expect(result1).toBe('value');

      const result2 = await promiseWithDefault(Promise.reject(), 'default');
      expect(result2).toBe('default');
    });

    it('collectResults', async () => {
      const { results, errors } = await collectResults([
        Promise.resolve(1),
        Promise.reject(new Error('err')),
        Promise.resolve(3)
      ]);
      expect(results).toEqual([1, 3]);
      expect(errors.length).toBe(1);
    });
  });

  describe('练习 2: 超时处理', () => {
    it('withTimeout 成功', async () => {
      const result = await withTimeout(
        new Promise(r => setTimeout(() => r('done'), 50)),
        100
      );
      expect(result).toBe('done');
    });

    it('withTimeout 超时', async () => {
      await expect(withTimeout(
        new Promise(r => setTimeout(() => r('done'), 200)),
        50,
        'Timeout!'
      )).rejects.toThrow('Timeout!');
    });

    it('fetchWithTimeout', async () => {
      const fastFetch = () => Promise.resolve({ data: 'ok' });
      const result = await fetchWithTimeout('/api', fastFetch, 100);
      expect(result).toEqual({ data: 'ok' });
    });
  });

  describe('练习 3: 重试机制', () => {
    it('withRetry 成功', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const result = await withRetry(fn, { retries: 5, delay: 10 });
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    it('withRetry 回调', async () => {
      const onRetry = vi.fn();
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 2) throw new Error('fail');
        return 'success';
      };

      await withRetry(fn, { retries: 3, delay: 10, onRetry });
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('withExponentialBackoff', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 2) throw new Error('fail');
        return 'success';
      };

      const result = await withExponentialBackoff(fn, {
        retries: 3,
        baseDelay: 10,
        maxDelay: 100
      });
      expect(result).toBe('success');
    });
  });

  describe('练习 4: 错误边界', () => {
    it('createErrorBoundary', async () => {
      const handler = vi.fn();
      const boundary = createErrorBoundary(handler);

      await boundary(async () => { throw new Error('test'); });
      expect(handler).toHaveBeenCalled();
    });

    it('runAllSettled', async () => {
      const onError = vi.fn();
      const tasks = [
        async () => 1,
        async () => { throw new Error('fail'); },
        async () => 3
      ];

      const results = await runAllSettled(tasks, onError);
      expect(results).toEqual([1, 3]);
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('练习 5: 错误恢复', () => {
    it('withFallback 主要成功', async () => {
      const result = await withFallback(
        async () => 'primary',
        async () => 'fallback'
      );
      expect(result).toBe('primary');
    });

    it('withFallback 使用备选', async () => {
      const result = await withFallback(
        async () => { throw new Error(); },
        async () => 'fallback'
      );
      expect(result).toBe('fallback');
    });

    it('tryMultiple', async () => {
      const sources = [
        async () => { throw new Error('1'); },
        async () => 'success',
        async () => { throw new Error('3'); }
      ];

      const result = await tryMultiple(sources);
      expect(result).toBe('success');
    });

    it('tryMultiple 全部失败', async () => {
      const sources = [
        async () => { throw new Error('1'); },
        async () => { throw new Error('2'); }
      ];

      await expect(tryMultiple(sources)).rejects.toThrow('2');
    });
  });
});
