import { describe, it, expect } from 'vitest';
import {
  unique,
  max,
  flatten,
  countOccurrences,
  chunk,
  intersection,
  sortBy,
  sumNested,
} from './02-arrays.js';

describe('02-arrays: 数组方法', () => {
  describe('练习 1: unique', () => {
    it('去除重复元素', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    it('空数组返回空数组', () => {
      expect(unique([])).toEqual([]);
    });
  });

  describe('练习 2: max', () => {
    it('返回最大值', () => {
      expect(max([1, 5, 3, 9, 2])).toBe(9);
      expect(max([-1, -5, -3])).toBe(-1);
    });

    it('空数组返回 undefined', () => {
      expect(max([])).toBe(undefined);
    });
  });

  describe('练习 3: flatten', () => {
    it('扁平化嵌套数组', () => {
      expect(flatten([[1, 2], [3, [4, 5]]])).toEqual([1, 2, 3, 4, 5]);
      expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    });

    it('已扁平数组不变', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('练习 4: countOccurrences', () => {
    it('统计出现次数', () => {
      expect(countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']))
        .toEqual({ a: 3, b: 2, c: 1 });
    });

    it('空数组返回空对象', () => {
      expect(countOccurrences([])).toEqual({});
    });
  });

  describe('练习 5: chunk', () => {
    it('分割成指定大小', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });

    it('size 大于数组长度', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('练习 6: intersection', () => {
    it('返回交集', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    it('无交集返回空数组', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });
  });

  describe('练习 7: sortBy', () => {
    it('按属性排序', () => {
      const arr = [{ name: 'Bob' }, { name: 'Alice' }, { name: 'Charlie' }];
      expect(sortBy(arr, 'name')).toEqual([
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' },
      ]);
    });

    it('不修改原数组', () => {
      const arr = [{ id: 2 }, { id: 1 }];
      sortBy(arr, 'id');
      expect(arr[0].id).toBe(2);
    });
  });

  describe('练习 8: sumNested', () => {
    it('计算嵌套数组的和', () => {
      expect(sumNested([1, [2, 3], [[4]]])).toBe(10);
      expect(sumNested([[1, 2], [3, 4]])).toBe(10);
    });

    it('普通数组求和', () => {
      expect(sumNested([1, 2, 3])).toBe(6);
    });
  });
});
