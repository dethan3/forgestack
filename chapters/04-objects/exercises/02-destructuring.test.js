import { describe, it, expect } from 'vitest';
import {
  formatUser,
  getPosition,
  createConfig,
  getCustomerCity,
  getFirstAndCount,
  calculateArea,
  formatAddress,
  swapFirstLast,
  rgbToObject,
  separateFirst,
  removeSensitive,
  processResponse,
  mergeSettings,
} from './02-destructuring.js';

describe('02-destructuring: 解构赋值', () => {
  describe('练习 1: 基本对象解构', () => {
    it('formatUser 格式化用户', () => {
      expect(formatUser({ name: 'Alice', age: 25 })).toBe(
        'Name: Alice, Age: 25'
      );
    });

    it('getPosition 重命名属性', () => {
      expect(getPosition({ x: 10, y: 20 })).toEqual({ left: 10, top: 20 });
    });
  });

  describe('练习 2: 默认值', () => {
    it('createConfig 使用默认值', () => {
      expect(createConfig()).toEqual({
        theme: 'light',
        lang: 'en',
        fontSize: 14,
      });
      expect(createConfig({ theme: 'dark' })).toEqual({
        theme: 'dark',
        lang: 'en',
        fontSize: 14,
      });
    });
  });

  describe('练习 3: 嵌套解构', () => {
    it('getCustomerCity 提取嵌套属性', () => {
      const order = {
        customer: { address: { city: 'Beijing' } },
      };
      expect(getCustomerCity(order)).toBe('Beijing');
      expect(getCustomerCity({ customer: {} })).toBe('Unknown');
    });

    it('getFirstAndCount 数组解构', () => {
      const users = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
      expect(getFirstAndCount(users)).toEqual({ firstName: 'A', restCount: 2 });
    });
  });

  describe('练习 4: 函数参数解构', () => {
    it('calculateArea 计算面积', () => {
      expect(calculateArea({ width: 10, height: 5 })).toBe(50);
    });

    it('formatAddress 格式化地址', () => {
      expect(
        formatAddress({ street: '123 Main St', city: 'Beijing', zip: '100000' })
      ).toBe('123 Main St, Beijing, China 100000');
    });
  });

  describe('练习 5: 数组解构', () => {
    it('swapFirstLast 交换首尾', () => {
      expect(swapFirstLast([1, 2, 3, 4])).toEqual([4, 2, 3, 1]);
    });

    it('rgbToObject 转换 RGB', () => {
      expect(rgbToObject([255, 128, 0])).toEqual({ r: 255, g: 128, b: 0 });
    });
  });

  describe('练习 6: 剩余属性', () => {
    it('separateFirst 分离第一个属性', () => {
      const result = separateFirst({ a: 1, b: 2, c: 3 });
      expect(result.first).toEqual(['a', 1]);
      expect(result.rest).toEqual({ b: 2, c: 3 });
    });

    it('removeSensitive 移除敏感信息', () => {
      const user = { name: 'Alice', password: '123', token: 'abc' };
      expect(removeSensitive(user)).toEqual({ name: 'Alice' });
    });
  });

  describe('练习 7: 混合解构', () => {
    it('processResponse 处理响应', () => {
      const response = {
        data: { items: ['a', 'b', 'c'] },
        meta: { total: 100 },
      };
      expect(processResponse(response)).toEqual({
        first: 'a',
        last: 'c',
        total: 100,
      });
    });

    it('mergeSettings 合并设置', () => {
      const defaults = { a: 1, b: 2 };
      const userSettings = { b: 3, c: 4 };
      expect(mergeSettings(defaults, userSettings)).toEqual({
        a: 1,
        b: 3,
        c: 4,
      });
    });
  });
});
