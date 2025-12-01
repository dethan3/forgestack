import { describe, it, expect } from 'vitest';
import {
  strictEqual,
  andShortCircuit,
  orDefault,
  nullishDefault,
  getUserCity,
  getGrade,
  mergeArrays,
  mergeObjects,
  getDisplayName,
} from './03-operators.js';

describe('03-operators: 运算符', () => {
  describe('练习 1: strictEqual', () => {
    it('相同类型相同值返回 true', () => {
      expect(strictEqual(5, 5)).toBe(true);
      expect(strictEqual('hello', 'hello')).toBe(true);
    });

    it('不同类型返回 false', () => {
      expect(strictEqual(5, '5')).toBe(false);
      expect(strictEqual(0, false)).toBe(false);
    });
  });

  describe('练习 2: andShortCircuit', () => {
    it('条件为真时返回 value', () => {
      expect(andShortCircuit(true, 'hello')).toBe('hello');
      expect(andShortCircuit(1, 42)).toBe(42);
    });

    it('条件为假时返回 null', () => {
      expect(andShortCircuit(false, 'hello')).toBe(null);
      expect(andShortCircuit(0, 42)).toBe(null);
    });
  });

  describe('练习 3: orDefault', () => {
    it('value 为真值时返回 value', () => {
      expect(orDefault('hello', 'default')).toBe('hello');
      expect(orDefault(42, 0)).toBe(42);
    });

    it('value 为假值时返回 defaultValue', () => {
      expect(orDefault('', 'default')).toBe('default');
      expect(orDefault(0, 10)).toBe(10);
      expect(orDefault(null, 'default')).toBe('default');
    });
  });

  describe('练习 4: nullishDefault', () => {
    it('value 为 null/undefined 时返回 defaultValue', () => {
      expect(nullishDefault(null, 'default')).toBe('default');
      expect(nullishDefault(undefined, 'default')).toBe('default');
    });

    it('value 为其他假值时返回 value', () => {
      expect(nullishDefault(0, 10)).toBe(0);
      expect(nullishDefault('', 'default')).toBe('');
      expect(nullishDefault(false, true)).toBe(false);
    });
  });

  describe('练习 5: getUserCity', () => {
    it('正确获取城市', () => {
      const user = { address: { city: 'Beijing' } };
      expect(getUserCity(user)).toBe('Beijing');
    });

    it('user 为 null 时返回 undefined', () => {
      expect(getUserCity(null)).toBe(undefined);
    });

    it('没有 address 时返回 undefined', () => {
      expect(getUserCity({})).toBe(undefined);
    });

    it('没有 city 时返回 undefined', () => {
      expect(getUserCity({ address: {} })).toBe(undefined);
    });
  });

  describe('练习 6: getGrade', () => {
    it('>= 60 返回 Pass', () => {
      expect(getGrade(60)).toBe('Pass');
      expect(getGrade(100)).toBe('Pass');
    });

    it('< 60 返回 Fail', () => {
      expect(getGrade(59)).toBe('Fail');
      expect(getGrade(0)).toBe('Fail');
    });
  });

  describe('练习 7: mergeArrays', () => {
    it('合并两个数组', () => {
      expect(mergeArrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });

    it('处理空数组', () => {
      expect(mergeArrays([], [1, 2])).toEqual([1, 2]);
      expect(mergeArrays([1, 2], [])).toEqual([1, 2]);
    });
  });

  describe('练习 8: mergeObjects', () => {
    it('合并两个对象', () => {
      expect(mergeObjects({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('后者覆盖前者', () => {
      expect(mergeObjects({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });
  });

  describe('练习 9: getDisplayName', () => {
    it('优先返回 displayName', () => {
      expect(getDisplayName({ displayName: 'Alice', name: 'Bob' })).toBe('Alice');
    });

    it('没有 displayName 时返回 name', () => {
      expect(getDisplayName({ name: 'Bob' })).toBe('Bob');
    });

    it('都没有时返回 Anonymous', () => {
      expect(getDisplayName({})).toBe('Anonymous');
    });

    it('空字符串视为无效', () => {
      expect(getDisplayName({ displayName: '', name: 'Bob' })).toBe('Bob');
      expect(getDisplayName({ displayName: '', name: '' })).toBe('Anonymous');
    });
  });
});
