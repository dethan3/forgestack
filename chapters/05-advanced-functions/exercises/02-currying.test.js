import { describe, it, expect } from 'vitest';
import {
  curriedAdd,
  format,
  curry,
  partial,
  partialWithPlaceholder,
  map,
  filter,
  reduce,
  split,
  join,
  double,
  filterEvens,
  sum,
  words,
  hyphenate,
} from './02-currying.js';

describe('02-currying: 柯里化与部分应用', () => {
  describe('练习 1: 手动柯里化', () => {
    it('curriedAdd 柯里化加法', () => {
      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(0)(0)(0)).toBe(0);
    });

    it('format 模板格式化', () => {
      const template = 'Hello, {0}! You have {1} messages.';
      expect(format(template)('Alice')(5)).toBe(
        'Hello, Alice! You have 5 messages.'
      );
    });
  });

  describe('练习 2: 通用柯里化', () => {
    it('curry 支持多种调用方式', () => {
      const add = (a, b, c) => a + b + c;
      const curriedAdd = curry(add);

      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });
  });

  describe('练习 3: 部分应用', () => {
    it('partial 固定部分参数', () => {
      const greet = (greeting, name, punct) => `${greeting}, ${name}${punct}`;
      const sayHello = partial(greet, 'Hello');

      expect(sayHello('Alice', '!')).toBe('Hello, Alice!');
    });

    it('partialWithPlaceholder 带占位符', () => {
      const _ = partialWithPlaceholder._;
      const div = (a, b) => a / b;
      const divBy2 = partialWithPlaceholder(div, _, 2);

      expect(divBy2(10)).toBe(5);
    });
  });

  describe('练习 4: 柯里化工具', () => {
    it('map 柯里化映射', () => {
      const double = map((x) => x * 2);
      expect(double([1, 2, 3])).toEqual([2, 4, 6]);
    });

    it('filter 柯里化过滤', () => {
      const evens = filter((x) => x % 2 === 0);
      expect(evens([1, 2, 3, 4])).toEqual([2, 4]);
    });

    it('reduce 柯里化累积', () => {
      const sum = reduce((a, b) => a + b)(0);
      expect(sum([1, 2, 3, 4])).toBe(10);
    });

    it('split 柯里化分割', () => {
      const bySpace = split(' ');
      expect(bySpace('hello world')).toEqual(['hello', 'world']);
    });

    it('join 柯里化连接', () => {
      const withDash = join('-');
      expect(withDash(['a', 'b', 'c'])).toBe('a-b-c');
    });
  });

  describe('练习 5: 组合使用', () => {
    it('double 加倍数组', () => {
      expect(double([1, 2, 3])).toEqual([2, 4, 6]);
    });

    it('filterEvens 筛选偶数', () => {
      expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
    });

    it('sum 求和', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });

    it('words 分割单词', () => {
      expect(words('hello world')).toEqual(['hello', 'world']);
    });

    it('hyphenate 连字符连接', () => {
      expect(hyphenate(['hello', 'world'])).toBe('hello-world');
    });
  });
});
