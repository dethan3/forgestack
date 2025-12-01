import { describe, it, expect } from 'vitest';
import {
  getType,
  isArray,
  isNaN,
  toNumber,
  toBoolean,
  isFalsy,
  safeGet,
  shallowClone,
} from './02-data-types.js';

describe('02-data-types: 数据类型', () => {
  describe('练习 1: getType', () => {
    it('数字返回 "number"', () => {
      expect(getType(42)).toBe('number');
      expect(getType(3.14)).toBe('number');
    });

    it('字符串返回 "string"', () => {
      expect(getType('hello')).toBe('string');
    });

    it('布尔值返回 "boolean"', () => {
      expect(getType(true)).toBe('boolean');
    });

    it('undefined 返回 "undefined"', () => {
      expect(getType(undefined)).toBe('undefined');
    });

    it('null 返回 "null"（特殊处理）', () => {
      expect(getType(null)).toBe('null');
    });

    it('数组返回 "array"（特殊处理）', () => {
      expect(getType([1, 2, 3])).toBe('array');
    });

    it('对象返回 "object"', () => {
      expect(getType({ a: 1 })).toBe('object');
    });

    it('函数返回 "function"', () => {
      expect(getType(() => {})).toBe('function');
    });
  });

  describe('练习 2: isArray', () => {
    it('数组返回 true', () => {
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray([])).toBe(true);
    });

    it('非数组返回 false', () => {
      expect(isArray('hello')).toBe(false);
      expect(isArray({ length: 0 })).toBe(false);
    });
  });

  describe('练习 3: isNaN', () => {
    it('NaN 返回 true', () => {
      expect(isNaN(NaN)).toBe(true);
    });

    it('非 NaN 返回 false', () => {
      expect(isNaN(123)).toBe(false);
      expect(isNaN('hello')).toBe(false);
      expect(isNaN(undefined)).toBe(false);
    });
  });

  describe('练习 4: toNumber', () => {
    it('字符串数字转换正确', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('3.14')).toBe(3.14);
    });

    it('无法转换时返回 0', () => {
      expect(toNumber('hello')).toBe(0);
      expect(toNumber(undefined)).toBe(0);
    });

    it('布尔值转换正确', () => {
      expect(toNumber(true)).toBe(1);
      expect(toNumber(false)).toBe(0);
    });
  });

  describe('练习 5: toBoolean', () => {
    it('真值转换为 true', () => {
      expect(toBoolean(1)).toBe(true);
      expect(toBoolean('hello')).toBe(true);
      expect(toBoolean([])).toBe(true);
    });

    it('假值转换为 false', () => {
      expect(toBoolean(0)).toBe(false);
      expect(toBoolean('')).toBe(false);
      expect(toBoolean(null)).toBe(false);
    });
  });

  describe('练习 6: isFalsy', () => {
    it('假值返回 true', () => {
      expect(isFalsy(false)).toBe(true);
      expect(isFalsy(0)).toBe(true);
      expect(isFalsy('')).toBe(true);
      expect(isFalsy(null)).toBe(true);
      expect(isFalsy(undefined)).toBe(true);
      expect(isFalsy(NaN)).toBe(true);
    });

    it('真值返回 false', () => {
      expect(isFalsy(1)).toBe(false);
      expect(isFalsy('hello')).toBe(false);
      expect(isFalsy([])).toBe(false);
    });
  });

  describe('练习 7: safeGet', () => {
    it('正确获取嵌套属性', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(safeGet(obj, 'a.b.c')).toBe(1);
    });

    it('路径不存在返回 undefined', () => {
      const obj = { a: 1 };
      expect(safeGet(obj, 'a.b.c')).toBe(undefined);
    });

    it('处理空对象', () => {
      expect(safeGet({}, 'a.b')).toBe(undefined);
    });
  });

  describe('练习 8: shallowClone', () => {
    it('克隆对象', () => {
      const original = { a: 1, b: 2 };
      const cloned = shallowClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('修改克隆不影响原对象', () => {
      const original = { a: 1 };
      const cloned = shallowClone(original);
      cloned.a = 2;
      expect(original.a).toBe(1);
    });
  });
});
