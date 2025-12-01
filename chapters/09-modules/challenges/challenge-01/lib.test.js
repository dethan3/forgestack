import { describe, it, expect, vi } from 'vitest';

// 测试桶文件导入
import utils from './lib/index.js';

// 测试直接导入子模块
import { capitalize, camelCase, kebabCase, truncate } from './lib/string/index.js';
import { unique, flatten, chunk, shuffle } from './lib/array/index.js';
import { pick, omit, deepClone, merge } from './lib/object/index.js';
import { delay, retry, timeout, parallel } from './lib/async/index.js';

describe('综合挑战 01: 模块化工具库', () => {
  describe('字符串工具', () => {
    it('capitalize', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('WORLD');
      expect(capitalize('')).toBe('');
    });

    it('camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
      expect(camelCase('HelloWorld')).toBe('helloWorld');
    });

    it('kebabCase', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('HelloWorld')).toBe('hello-world');
    });

    it('truncate', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hi', 10)).toBe('Hi');
      expect(truncate('Hello', 5, '!')).toBe('Hello!');
    });
  });

  describe('数组工具', () => {
    it('unique', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    it('flatten', () => {
      expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
      expect(flatten([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
    });

    it('chunk', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    it('shuffle', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).toHaveLength(5);
      expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
      expect(shuffled).not.toBe(arr); // 返回新数组
    });
  });

  describe('对象工具', () => {
    it('pick', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('omit', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('deepClone', () => {
      const obj = { a: { b: { c: 1 } }, d: [1, 2, 3] };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.a).not.toBe(obj.a);
    });

    it('merge', () => {
      const target = { a: 1, b: { c: 2 } };
      const source = { b: { d: 3 }, e: 4 };
      expect(merge(target, source)).toEqual({
        a: 1,
        b: { c: 2, d: 3 },
        e: 4
      });
    });
  });

  describe('异步工具', () => {
    it('delay', async () => {
      const start = Date.now();
      await delay(50);
      expect(Date.now() - start).toBeGreaterThanOrEqual(40);
    });

    it('retry 成功', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };

      const result = await retry(fn, 5);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    it('timeout 成功', async () => {
      const result = await timeout(Promise.resolve('ok'), 100);
      expect(result).toBe('ok');
    });

    it('timeout 超时', async () => {
      await expect(
        timeout(new Promise(r => setTimeout(r, 200)), 50)
      ).rejects.toThrow();
    });

    it('parallel 限制并发', async () => {
      let concurrent = 0;
      let maxConcurrent = 0;

      const tasks = Array(5).fill().map(() => async () => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await delay(50);
        concurrent--;
        return 'done';
      });

      const results = await parallel(tasks, 2);
      expect(results).toHaveLength(5);
      expect(maxConcurrent).toBeLessThanOrEqual(2);
    });
  });

  describe('桶文件导出', () => {
    it('通过默认导出访问', () => {
      expect(utils.string.capitalize).toBeDefined();
      expect(utils.array.unique).toBeDefined();
      expect(utils.object.pick).toBeDefined();
      expect(utils.async.delay).toBeDefined();
    });
  });
});
