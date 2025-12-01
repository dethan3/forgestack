import { describe, it, expect } from 'vitest';
import {
  checkNumber,
  getLetterGrade,
  getDayType,
  isValidUser,
  average,
  getStatusText,
  canVote,
  getPermissionLevel,
} from './04-conditionals.js';

describe('04-conditionals: 条件语句', () => {
  describe('练习 1: checkNumber', () => {
    it('正数返回 positive', () => {
      expect(checkNumber(5)).toBe('positive');
      expect(checkNumber(0.1)).toBe('positive');
    });

    it('负数返回 negative', () => {
      expect(checkNumber(-5)).toBe('negative');
    });

    it('零返回 zero', () => {
      expect(checkNumber(0)).toBe('zero');
    });
  });

  describe('练习 2: getLetterGrade', () => {
    it('90+ 返回 A', () => {
      expect(getLetterGrade(90)).toBe('A');
      expect(getLetterGrade(100)).toBe('A');
    });

    it('80-89 返回 B', () => {
      expect(getLetterGrade(80)).toBe('B');
      expect(getLetterGrade(89)).toBe('B');
    });

    it('70-79 返回 C', () => {
      expect(getLetterGrade(70)).toBe('C');
    });

    it('60-69 返回 D', () => {
      expect(getLetterGrade(60)).toBe('D');
    });

    it('60 以下返回 F', () => {
      expect(getLetterGrade(59)).toBe('F');
      expect(getLetterGrade(0)).toBe('F');
    });
  });

  describe('练习 3: getDayType', () => {
    it('1-5 返回 weekday', () => {
      expect(getDayType(1)).toBe('weekday');
      expect(getDayType(5)).toBe('weekday');
    });

    it('6-7 返回 weekend', () => {
      expect(getDayType(6)).toBe('weekend');
      expect(getDayType(7)).toBe('weekend');
    });

    it('其他返回 invalid', () => {
      expect(getDayType(0)).toBe('invalid');
      expect(getDayType(8)).toBe('invalid');
    });
  });

  describe('练习 4: isValidUser', () => {
    it('有效用户返回 true', () => {
      expect(isValidUser({ name: 'Alice' })).toBe(true);
    });

    it('无用户返回 false', () => {
      expect(isValidUser(null)).toBe(false);
      expect(isValidUser(undefined)).toBe(false);
    });

    it('无名字返回 false', () => {
      expect(isValidUser({})).toBe(false);
      expect(isValidUser({ name: '' })).toBe(false);
    });
  });

  describe('练习 5: average', () => {
    it('计算平均值', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([10, 20])).toBe(15);
    });

    it('空数组返回 0', () => {
      expect(average([])).toBe(0);
    });

    it('非数组返回 0', () => {
      expect(average(null)).toBe(0);
      expect(average('hello')).toBe(0);
    });
  });

  describe('练习 6: getStatusText', () => {
    it('返回正确的状态文本', () => {
      expect(getStatusText(200)).toBe('OK');
      expect(getStatusText(201)).toBe('Created');
      expect(getStatusText(400)).toBe('Bad Request');
      expect(getStatusText(404)).toBe('Not Found');
      expect(getStatusText(500)).toBe('Internal Server Error');
    });

    it('未知状态码返回 Unknown', () => {
      expect(getStatusText(999)).toBe('Unknown');
    });
  });

  describe('练习 7: canVote', () => {
    it('成年公民可以投票', () => {
      expect(canVote(18, true)).toBe(true);
      expect(canVote(30, true)).toBe(true);
    });

    it('未成年不能投票', () => {
      expect(canVote(17, true)).toBe(false);
    });

    it('非公民不能投票', () => {
      expect(canVote(18, false)).toBe(false);
    });
  });

  describe('练习 8: getPermissionLevel', () => {
    it('无用户返回 none', () => {
      expect(getPermissionLevel(null)).toBe('none');
    });

    it('管理员返回 admin', () => {
      expect(getPermissionLevel({ isAdmin: true })).toBe('admin');
    });

    it('版主返回 moderator', () => {
      expect(getPermissionLevel({ isModerator: true })).toBe('moderator');
    });

    it('普通用户返回 user', () => {
      expect(getPermissionLevel({})).toBe('user');
    });
  });
});
