import { describe, it, expect } from 'vitest';
import {
  createUser,
  createDynamic,
  safeGet,
  hasAllKeys,
  toUpperValues,
  flipObject,
  shallowCopy,
  merge,
  pick,
  omit,
  setNested,
  flatten,
} from './01-basics.js';

describe('01-basics: 对象基础', () => {
  describe('练习 1: 创建对象', () => {
    it('createUser 使用属性简写', () => {
      expect(createUser('Alice', 25)).toEqual({ name: 'Alice', age: 25 });
    });

    it('createDynamic 使用计算属性名', () => {
      expect(createDynamic('foo', 'bar')).toEqual({ foo: 'bar' });
      expect(createDynamic('key', 123)).toEqual({ key: 123 });
    });
  });

  describe('练习 2: 访问属性', () => {
    it('safeGet 安全获取嵌套属性', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(safeGet(obj, 'a.b.c')).toBe(1);
      expect(safeGet(obj, 'a.b.d')).toBe(undefined);
      expect(safeGet(obj, 'x.y.z', 'default')).toBe('default');
    });

    it('hasAllKeys 检查所有键', () => {
      expect(hasAllKeys({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toBe(true);
      expect(hasAllKeys({ a: 1 }, ['a', 'b'])).toBe(false);
    });
  });

  describe('练习 3: 遍历对象', () => {
    it('toUpperValues 转换字符串值', () => {
      expect(toUpperValues({ a: 'hello', b: 123 })).toEqual({
        a: 'HELLO',
        b: 123,
      });
    });

    it('flipObject 翻转键值', () => {
      expect(flipObject({ a: 1, b: 2 })).toEqual({ 1: 'a', 2: 'b' });
    });
  });

  describe('练习 4: 拷贝与合并', () => {
    it('shallowCopy 浅拷贝', () => {
      const original = { a: 1, b: 2 };
      const copy = shallowCopy(original);
      expect(copy).toEqual(original);
      expect(copy).not.toBe(original);
    });

    it('merge 合并对象', () => {
      expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
      expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });
  });

  describe('练习 5: pick & omit', () => {
    it('pick 选择属性', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('omit 排除属性', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
    });
  });

  describe('练习 6: 深度操作', () => {
    it('setNested 设置嵌套属性', () => {
      expect(setNested({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
      expect(setNested({ a: { x: 1 } }, 'a.b', 2)).toEqual({
        a: { x: 1, b: 2 },
      });
    });

    it('flatten 扁平化对象', () => {
      expect(flatten({ a: { b: 1, c: { d: 2 } } })).toEqual({
        'a.b': 1,
        'a.c.d': 2,
      });
    });
  });
});
