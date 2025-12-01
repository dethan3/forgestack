import { describe, it, expect } from 'vitest';
import {
  sumValues,
  getKeysByType,
  uppercaseKeys,
  filterByValue,
  deepMerge,
  deepFreeze,
  isDeepFrozen,
  shallowEqual,
  deepEqual,
  diff,
  toQueryString,
  fromQueryString,
  mapValues,
  mapKeys,
} from './03-methods.js';

describe('03-methods: 对象方法', () => {
  describe('练习 1: keys/values/entries', () => {
    it('sumValues 求和数字值', () => {
      expect(sumValues({ a: 1, b: 2, c: 'x' })).toBe(3);
      expect(sumValues({ a: 'x', b: 'y' })).toBe(0);
    });

    it('getKeysByType 按类型获取键', () => {
      expect(getKeysByType({ a: 1, b: 'x', c: 2 }, 'number')).toEqual([
        'a',
        'c',
      ]);
      expect(getKeysByType({ a: 1, b: 'x' }, 'string')).toEqual(['b']);
    });
  });

  describe('练习 2: fromEntries', () => {
    it('uppercaseKeys 转换键为大写', () => {
      expect(uppercaseKeys({ name: 'Alice', age: 25 })).toEqual({
        NAME: 'Alice',
        AGE: 25,
      });
    });

    it('filterByValue 按值过滤', () => {
      expect(filterByValue({ a: 1, b: 5, c: 3 }, 2)).toEqual({ b: 5, c: 3 });
    });
  });

  describe('练习 3: deepMerge', () => {
    it('深度合并对象', () => {
      expect(deepMerge({ a: { x: 1 } }, { a: { y: 2 } })).toEqual({
        a: { x: 1, y: 2 },
      });
      expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
  });

  describe('练习 4: freeze', () => {
    it('deepFreeze 深度冻结', () => {
      const obj = deepFreeze({ a: { b: 1 } });
      expect(Object.isFrozen(obj)).toBe(true);
      expect(Object.isFrozen(obj.a)).toBe(true);
    });

    it('isDeepFrozen 检查深度冻结', () => {
      const frozen = deepFreeze({ a: { b: 1 } });
      expect(isDeepFrozen(frozen)).toBe(true);

      const partial = Object.freeze({ a: { b: 1 } });
      expect(isDeepFrozen(partial)).toBe(false);
    });
  });

  describe('练习 5: 对象比较', () => {
    it('shallowEqual 浅比较', () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(shallowEqual({ a: { x: 1 } }, { a: { x: 1 } })).toBe(false);
    });

    it('deepEqual 深比较', () => {
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
      expect(deepEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe('练习 6: diff', () => {
    it('找出对象差异', () => {
      const result = diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
      expect(result.changed).toEqual({ b: 3 });
      expect(result.added).toEqual({ c: 4 });
      expect(result.removed).toEqual(['b']);
    });
  });

  describe('练习 7: 查询字符串', () => {
    it('toQueryString 转换为查询字符串', () => {
      expect(toQueryString({ name: 'Alice', age: 25 })).toBe(
        'name=Alice&age=25'
      );
    });

    it('fromQueryString 解析查询字符串', () => {
      expect(fromQueryString('name=Alice&age=25')).toEqual({
        name: 'Alice',
        age: '25',
      });
    });
  });

  describe('练习 8: 映射', () => {
    it('mapValues 映射值', () => {
      expect(mapValues({ a: 1, b: 2 }, (x) => x * 2)).toEqual({ a: 2, b: 4 });
    });

    it('mapKeys 映射键', () => {
      expect(mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase())).toEqual({
        A: 1,
        B: 2,
      });
    });
  });
});
