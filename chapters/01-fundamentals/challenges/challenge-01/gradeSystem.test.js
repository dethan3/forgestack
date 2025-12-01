import { describe, it, expect } from 'vitest';
import {
  addStudent,
  getAverage,
  getGrade,
  getTopStudent,
  getStatistics,
} from './gradeSystem.js';

describe('综合挑战 01: 成绩管理系统', () => {
  describe('addStudent', () => {
    it('添加学生到空列表', () => {
      const students = [];
      const result = addStudent(students, 'Alice', [90, 85, 88]);
      expect(result).toEqual([{ name: 'Alice', scores: [90, 85, 88] }]);
    });

    it('添加学生到现有列表', () => {
      const students = [{ name: 'Alice', scores: [90] }];
      const result = addStudent(students, 'Bob', [80, 85]);
      expect(result.length).toBe(2);
      expect(result[1].name).toBe('Bob');
    });
  });

  describe('getAverage', () => {
    it('计算平均分', () => {
      const student = { name: 'Alice', scores: [90, 80, 85] };
      expect(getAverage(student)).toBe(85);
    });

    it('保留两位小数', () => {
      const student = { name: 'Bob', scores: [90, 85, 88] };
      expect(getAverage(student)).toBe(87.67);
    });

    it('单个分数', () => {
      const student = { name: 'Charlie', scores: [100] };
      expect(getAverage(student)).toBe(100);
    });
  });

  describe('getGrade', () => {
    it('90+ 返回 A', () => {
      expect(getGrade(90)).toBe('A');
      expect(getGrade(100)).toBe('A');
    });

    it('80-89 返回 B', () => {
      expect(getGrade(80)).toBe('B');
      expect(getGrade(89.99)).toBe('B');
    });

    it('70-79 返回 C', () => {
      expect(getGrade(70)).toBe('C');
    });

    it('60-69 返回 D', () => {
      expect(getGrade(60)).toBe('D');
    });

    it('<60 返回 F', () => {
      expect(getGrade(59)).toBe('F');
      expect(getGrade(0)).toBe('F');
    });
  });

  describe('getTopStudent', () => {
    it('返回最高分学生', () => {
      const students = [
        { name: 'Alice', scores: [80, 80] },
        { name: 'Bob', scores: [90, 90] },
        { name: 'Charlie', scores: [70, 70] },
      ];
      const top = getTopStudent(students);
      expect(top.name).toBe('Bob');
    });

    it('空列表返回 null', () => {
      expect(getTopStudent([])).toBe(null);
    });
  });

  describe('getStatistics', () => {
    it('返回正确的统计信息', () => {
      const students = [
        { name: 'Alice', scores: [90, 90] },
        { name: 'Bob', scores: [80, 80] },
        { name: 'Charlie', scores: [70, 70] },
      ];
      const stats = getStatistics(students);
      expect(stats.total).toBe(3);
      expect(stats.average).toBe(80);
      expect(stats.highest).toBe(90);
      expect(stats.lowest).toBe(70);
    });

    it('空列表返回零值', () => {
      const stats = getStatistics([]);
      expect(stats.total).toBe(0);
      expect(stats.average).toBe(0);
      expect(stats.highest).toBe(0);
      expect(stats.lowest).toBe(0);
    });
  });
});
