import { describe, it, expect } from 'vitest';
import {
  getPI,
  sumToN,
  blockScope,
  modifyObject,
  namingConventions,
  destructuringBasics,
} from './01-variables.js';

describe('01-variables: 变量声明', () => {
  describe('练习 1: getPI', () => {
    it('应该返回 3.14159', () => {
      expect(getPI()).toBe(3.14159);
    });
  });

  describe('练习 2: sumToN', () => {
    it('sumToN(5) 应该返回 15', () => {
      expect(sumToN(5)).toBe(15);
    });

    it('sumToN(10) 应该返回 55', () => {
      expect(sumToN(10)).toBe(55);
    });

    it('sumToN(1) 应该返回 1', () => {
      expect(sumToN(1)).toBe(1);
    });

    it('sumToN(0) 应该返回 0', () => {
      expect(sumToN(0)).toBe(0);
    });
  });

  describe('练习 3: blockScope', () => {
    it('应该返回 "outer"', () => {
      expect(blockScope()).toBe('outer');
    });
  });

  describe('练习 4: modifyObject', () => {
    it('应该返回修改后的对象', () => {
      const result = modifyObject();
      expect(result).toEqual({ name: 'Bob' });
    });

    it('返回的对象应该有 name 属性为 "Bob"', () => {
      const result = modifyObject();
      expect(result.name).toBe('Bob');
    });
  });

  describe('练习 5: namingConventions', () => {
    it('应该返回包含正确属性的对象', () => {
      const result = namingConventions();
      expect(result.userName).toBe('John');
      expect(result.MAX_COUNT).toBe(100);
      expect(result.isActive).toBe(true);
    });
  });

  describe('练习 6: destructuringBasics', () => {
    it('应该返回正确的字符串', () => {
      expect(destructuringBasics()).toBe('Alice is 25 years old');
    });
  });
});
