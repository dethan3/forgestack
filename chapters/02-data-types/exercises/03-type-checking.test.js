import { describe, it, expect } from 'vitest';
import {
  getType,
  isEmpty,
  toNumber,
  deepEqual,
  ensureArray,
  get,
  deepClone,
  deepMerge,
} from './03-type-checking.js';

describe('03-type-checking: 类型检测与转换', () => {
  describe('练习 1: getType', () => {
    it('检测原始类型', () => {
      expect(getType(42)).toBe('number');
      expect(getType('hello')).toBe('string');
      expect(getType(true)).toBe('boolean');
      expect(getType(undefined)).toBe('undefined');
      expect(getType(Symbol())).toBe('symbol');
      expect(getType(123n)).toBe('bigint');
    });

    it('检测特殊类型', () => {
      expect(getType(null)).toBe('null');
      expect(getType([1, 2])).toBe('array');
      expect(getType({ a: 1 })).toBe('object');
      expect(getType(() => {})).toBe('function');
    });
  });

  describe('练习 2: isEmpty', () => {
    it('空值返回 true', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('非空值返回 false', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe('练习 3: toNumber', () => {
    it('成功转换', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('3.14')).toBe(3.14);
      expect(toNumber(true)).toBe(1);
    });

    it('失败时返回默认值', () => {
      expect(toNumber('hello')).toBe(0);
      expect(toNumber('hello', -1)).toBe(-1);
      expect(toNumber(undefined, 10)).toBe(10);
    });
  });

  describe('练习 4: deepEqual', () => {
    it('比较原始值', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual('a', 'a')).toBe(true);
    });

    it('比较数组', () => {
      expect(deepEqual([1, 2], [1, 2])).toBe(true);
      expect(deepEqual([1, 2], [1, 3])).toBe(false);
    });

    it('比较对象', () => {
      expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe('练习 5: ensureArray', () => {
    it('非数组包装成数组', () => {
      expect(ensureArray(1)).toEqual([1]);
      expect(ensureArray('hello')).toEqual(['hello']);
    });

    it('数组直接返回', () => {
      expect(ensureArray([1, 2])).toEqual([1, 2]);
    });

    it('null/undefined 返回空数组', () => {
      expect(ensureArray(null)).toEqual([]);
      expect(ensureArray(undefined)).toEqual([]);
    });
  });

  describe('练习 6: get', () => {
    it('获取嵌套属性', () => {
      expect(get({ a: { b: 1 } }, 'a.b')).toBe(1);
      expect(get({ a: { b: { c: 2 } } }, 'a.b.c')).toBe(2);
    });

    it('路径不存在返回默认值', () => {
      expect(get({ a: 1 }, 'a.b.c')).toBe(undefined);
      expect(get({ a: 1 }, 'a.b.c', 'default')).toBe('default');
    });
  });

  describe('练习 7: deepClone', () => {
    it('克隆对象', () => {
      const obj = { a: { b: 1 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.a).not.toBe(obj.a);
    });

    it('克隆数组', () => {
      const arr = [1, [2, 3]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned[1]).not.toBe(arr[1]);
    });
  });

  describe('练习 8: deepMerge', () => {
    it('合并对象', () => {
      expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('深度合并', () => {
      expect(deepMerge({ a: { x: 1 } }, { a: { y: 2 } }))
        .toEqual({ a: { x: 1, y: 2 } });
    });

    it('后者覆盖前者', () => {
      expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });
  });
});
