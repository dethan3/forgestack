import { describe, it, expect } from 'vitest';
import { get, set, deepClone, isEqual, merge } from './objectUtils.js';

describe('综合挑战 01: 对象工具库', () => {
  describe('get', () => {
    it('获取嵌套属性', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(get(obj, 'a.b.c')).toBe(1);
      expect(get(obj, 'a.b')).toEqual({ c: 1 });
    });

    it('路径不存在返回默认值', () => {
      const obj = { a: 1 };
      expect(get(obj, 'a.b.c')).toBe(undefined);
      expect(get(obj, 'a.b.c', 'default')).toBe('default');
    });

    it('处理顶层属性', () => {
      expect(get({ a: 1 }, 'a')).toBe(1);
    });
  });

  describe('set', () => {
    it('设置嵌套属性', () => {
      expect(set({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
    });

    it('保留现有属性', () => {
      expect(set({ a: { x: 1 } }, 'a.b', 2)).toEqual({ a: { x: 1, b: 2 } });
    });

    it('覆盖现有值', () => {
      expect(set({ a: { b: 1 } }, 'a.b', 2)).toEqual({ a: { b: 2 } });
    });
  });

  describe('deepClone', () => {
    it('克隆对象', () => {
      const obj = { a: { b: 1 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.a).not.toBe(obj.a);
    });

    it('克隆数组', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned[1]).not.toBe(arr[1]);
      expect(cloned[2]).not.toBe(arr[2]);
    });

    it('克隆原始值', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBe(null);
    });

    it('克隆 Date', () => {
      const date = new Date('2023-01-01');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });
  });

  describe('isEqual', () => {
    it('比较原始值', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual(1, 2)).toBe(false);
      expect(isEqual('a', 'a')).toBe(true);
      expect(isEqual(null, null)).toBe(true);
    });

    it('比较数组', () => {
      expect(isEqual([1, 2], [1, 2])).toBe(true);
      expect(isEqual([1, 2], [1, 3])).toBe(false);
      expect(isEqual([1, [2]], [1, [2]])).toBe(true);
    });

    it('比较对象', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('不同类型返回 false', () => {
      expect(isEqual(1, '1')).toBe(false);
      expect(isEqual([], {})).toBe(false);
    });
  });

  describe('merge', () => {
    it('合并对象', () => {
      expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('深度合并', () => {
      expect(merge({ a: { x: 1 } }, { a: { y: 2 } })).toEqual({
        a: { x: 1, y: 2 },
      });
    });

    it('后者覆盖前者', () => {
      expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    it('合并多个对象', () => {
      expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    });
  });
});
