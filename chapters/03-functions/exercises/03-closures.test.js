import { describe, it, expect, vi } from 'vitest';
import {
  createCounter,
  createAdder,
  createStore,
  createRangeChecker,
  createFormatter,
  memoize,
  debounce,
  throttle,
  once,
  createStack,
  partial,
} from './03-closures.js';

describe('03-closures: 闭包', () => {
  describe('练习 1: createCounter & createAdder', () => {
    it('createCounter 返回递增数字', () => {
      const counter = createCounter(5);
      expect(counter()).toBe(5);
      expect(counter()).toBe(6);
      expect(counter()).toBe(7);
    });

    it('createAdder 累加数字', () => {
      const adder = createAdder();
      expect(adder(5)).toBe(5);
      expect(adder(3)).toBe(8);
      expect(adder(2)).toBe(10);
    });
  });

  describe('练习 2: createStore', () => {
    it('存储和获取值', () => {
      const store = createStore();
      store.set('name', 'Alice');
      expect(store.get('name')).toBe('Alice');
      expect(store.has('name')).toBe(true);
      expect(store.has('age')).toBe(false);
    });

    it('删除值', () => {
      const store = createStore();
      store.set('key', 'value');
      store.delete('key');
      expect(store.has('key')).toBe(false);
    });
  });

  describe('练习 3: 函数工厂', () => {
    it('createRangeChecker', () => {
      const isTeenager = createRangeChecker(13, 19);
      expect(isTeenager(15)).toBe(true);
      expect(isTeenager(12)).toBe(false);
      expect(isTeenager(20)).toBe(false);
    });

    it('createFormatter', () => {
      const formatCurrency = createFormatter('$', 2);
      expect(formatCurrency(1234.5)).toBe('$1234.50');
      expect(formatCurrency(100)).toBe('$100.00');
    });
  });

  describe('练习 4: memoize', () => {
    it('缓存计算结果', () => {
      let callCount = 0;
      const expensive = (n) => {
        callCount++;
        return n * 2;
      };
      const memoized = memoize(expensive);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(callCount).toBe(1);

      expect(memoized(3)).toBe(6);
      expect(callCount).toBe(2);
    });
  });

  describe('练习 5: debounce & throttle', () => {
    it('debounce 延迟执行', async () => {
      let count = 0;
      const fn = debounce(() => count++, 50);

      fn();
      fn();
      fn();
      expect(count).toBe(0);

      await new Promise((r) => setTimeout(r, 100));
      expect(count).toBe(1);
    });

    it('throttle 限制频率', async () => {
      let count = 0;
      const fn = throttle(() => count++, 50);

      fn();
      fn();
      fn();
      expect(count).toBe(1);

      await new Promise((r) => setTimeout(r, 60));
      fn();
      expect(count).toBe(2);
    });
  });

  describe('练习 6: once', () => {
    it('只执行一次', () => {
      let count = 0;
      const increment = once(() => ++count);

      expect(increment()).toBe(1);
      expect(increment()).toBe(1);
      expect(increment()).toBe(1);
      expect(count).toBe(1);
    });
  });

  describe('练习 7: createStack', () => {
    it('栈操作', () => {
      const stack = createStack();
      expect(stack.isEmpty()).toBe(true);

      stack.push(1);
      stack.push(2);
      expect(stack.size()).toBe(2);
      expect(stack.peek()).toBe(2);

      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('练习 8: partial', () => {
    it('预设部分参数', () => {
      const add = (a, b, c) => a + b + c;
      const add5 = partial(add, 5);
      expect(add5(3, 2)).toBe(10);

      const add5and3 = partial(add, 5, 3);
      expect(add5and3(2)).toBe(10);
    });
  });
});
