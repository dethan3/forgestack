import { describe, it, expect } from 'vitest';
import {
  parseCSV,
  filterByField,
  sortByField,
  groupByField,
  summarize,
} from './dataProcessor.js';

describe('综合挑战 01: 数据处理器', () => {
  describe('parseCSV', () => {
    it('解析 CSV 字符串', () => {
      const csv = 'name,age\nAlice,25\nBob,30';
      expect(parseCSV(csv)).toEqual([
        { name: 'Alice', age: '25' },
        { name: 'Bob', age: '30' },
      ]);
    });

    it('处理空 CSV', () => {
      expect(parseCSV('name,age')).toEqual([]);
    });

    it('处理多列', () => {
      const csv = 'a,b,c\n1,2,3';
      expect(parseCSV(csv)).toEqual([{ a: '1', b: '2', c: '3' }]);
    });
  });

  describe('filterByField', () => {
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 25 },
    ];

    it('筛选匹配项', () => {
      expect(filterByField(data, 'age', 25)).toEqual([
        { name: 'Alice', age: 25 },
        { name: 'Charlie', age: 25 },
      ]);
    });

    it('无匹配项返回空数组', () => {
      expect(filterByField(data, 'age', 100)).toEqual([]);
    });
  });

  describe('sortByField', () => {
    const data = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    it('升序排序', () => {
      const result = sortByField(data, 'age', 'asc');
      expect(result[0].name).toBe('Alice');
      expect(result[2].name).toBe('Bob');
    });

    it('降序排序', () => {
      const result = sortByField(data, 'age', 'desc');
      expect(result[0].name).toBe('Bob');
      expect(result[2].name).toBe('Alice');
    });

    it('字符串排序', () => {
      const result = sortByField(data, 'name', 'asc');
      expect(result[0].name).toBe('Alice');
    });

    it('不修改原数组', () => {
      sortByField(data, 'age', 'asc');
      expect(data[0].name).toBe('Charlie');
    });
  });

  describe('groupByField', () => {
    const data = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 },
    ];

    it('按字段分组', () => {
      const result = groupByField(data, 'type');
      expect(result.a.length).toBe(2);
      expect(result.b.length).toBe(1);
    });

    it('空数组返回空对象', () => {
      expect(groupByField([], 'type')).toEqual({});
    });
  });

  describe('summarize', () => {
    const data = [
      { name: 'A', score: 80 },
      { name: 'B', score: 90 },
      { name: 'C', score: 70 },
    ];

    it('计算统计值', () => {
      const result = summarize(data, 'score');
      expect(result.count).toBe(3);
      expect(result.sum).toBe(240);
      expect(result.avg).toBe(80);
      expect(result.min).toBe(70);
      expect(result.max).toBe(90);
    });

    it('空数组返回零值', () => {
      const result = summarize([], 'score');
      expect(result.count).toBe(0);
      expect(result.sum).toBe(0);
      expect(result.avg).toBe(0);
    });
  });
});
