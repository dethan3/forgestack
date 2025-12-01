import { describe, it, expect } from 'vitest';
import {
  containsIgnoreCase,
  getExtension,
  titleCase,
  formatGreeting,
  padNumber,
  countChar,
  reverseString,
  truncate,
} from './01-strings.js';

describe('01-strings: 字符串方法', () => {
  describe('练习 1: containsIgnoreCase', () => {
    it('包含时返回 true', () => {
      expect(containsIgnoreCase('Hello World', 'world')).toBe(true);
      expect(containsIgnoreCase('Hello World', 'HELLO')).toBe(true);
    });

    it('不包含时返回 false', () => {
      expect(containsIgnoreCase('Hello World', 'xyz')).toBe(false);
    });
  });

  describe('练习 2: getExtension', () => {
    it('提取扩展名', () => {
      expect(getExtension('photo.jpg')).toBe('jpg');
      expect(getExtension('document.pdf')).toBe('pdf');
      expect(getExtension('archive.tar.gz')).toBe('gz');
    });

    it('无扩展名返回空字符串', () => {
      expect(getExtension('README')).toBe('');
      expect(getExtension('.gitignore')).toBe('gitignore');
    });
  });

  describe('练习 3: titleCase', () => {
    it('每个单词首字母大写', () => {
      expect(titleCase('hello world')).toBe('Hello World');
      expect(titleCase('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    it('处理单个单词', () => {
      expect(titleCase('hello')).toBe('Hello');
    });
  });

  describe('练习 4: formatGreeting', () => {
    it('生成正确的问候语', () => {
      expect(formatGreeting('Alice', 25)).toBe('Hello, Alice! You are 25 years old.');
      expect(formatGreeting('Bob', 30)).toBe('Hello, Bob! You are 30 years old.');
    });
  });

  describe('练习 5: padNumber', () => {
    it('填充到指定长度', () => {
      expect(padNumber(5, 3)).toBe('005');
      expect(padNumber(42, 4)).toBe('0042');
    });

    it('超长不截断', () => {
      expect(padNumber(12345, 3)).toBe('12345');
    });
  });

  describe('练习 6: countChar', () => {
    it('统计字符次数', () => {
      expect(countChar('hello', 'l')).toBe(2);
      expect(countChar('banana', 'a')).toBe(3);
    });

    it('字符不存在返回 0', () => {
      expect(countChar('hello', 'z')).toBe(0);
    });
  });

  describe('练习 7: reverseString', () => {
    it('反转字符串', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('12345')).toBe('54321');
    });

    it('空字符串返回空', () => {
      expect(reverseString('')).toBe('');
    });
  });

  describe('练习 8: truncate', () => {
    it('超长时截断并添加...', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('JavaScript', 4)).toBe('Java...');
    });

    it('不超长时不截断', () => {
      expect(truncate('Hi', 5)).toBe('Hi');
      expect(truncate('Hello', 5)).toBe('Hello');
    });
  });
});
