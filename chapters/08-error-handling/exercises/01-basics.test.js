import { describe, it, expect } from 'vitest';
import {
  safeJsonParse,
  safeGet,
  safeExecute,
  requireField,
  validateRange,
  requireNonEmpty,
  withResource,
  timedExecution,
  getErrorCode,
  isRetryable,
  toUserMessage,
  serializeError,
} from './01-basics.js';

describe('01-basics: 错误处理基础', () => {
  describe('练习 1: 基本 try/catch', () => {
    it('safeJsonParse 解析有效 JSON', () => {
      expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
      expect(safeJsonParse('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('safeJsonParse 返回默认值', () => {
      expect(safeJsonParse('invalid')).toBe(null);
      expect(safeJsonParse('invalid', {})).toEqual({});
    });

    it('safeGet 获取嵌套属性', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(safeGet(obj, 'a.b.c')).toBe(42);
      expect(safeGet(obj, 'a.b')).toEqual({ c: 42 });
    });

    it('safeGet 返回默认值', () => {
      expect(safeGet({}, 'a.b.c', 'default')).toBe('default');
      expect(safeGet(null, 'a', 'default')).toBe('default');
    });

    it('safeExecute 执行成功', () => {
      expect(safeExecute(() => 42)).toBe(42);
    });

    it('safeExecute 返回默认值', () => {
      expect(safeExecute(() => { throw new Error(); })).toBe(null);
      expect(safeExecute(() => { throw new Error(); }, 'fallback')).toBe('fallback');
    });
  });

  describe('练习 2: 抛出错误', () => {
    it('requireField 验证必填', () => {
      expect(() => requireField(null, 'name')).toThrow('name is required');
      expect(() => requireField(undefined, 'email')).toThrow('email is required');
      expect(() => requireField('', 'title')).toThrow('title is required');
      expect(() => requireField('value', 'field')).not.toThrow();
    });

    it('validateRange 验证范围', () => {
      expect(() => validateRange('abc', 0, 10)).toThrow(TypeError);
      expect(() => validateRange(-1, 0, 10)).toThrow(RangeError);
      expect(() => validateRange(11, 0, 10)).toThrow(RangeError);
      expect(() => validateRange(5, 0, 10)).not.toThrow();
    });

    it('requireNonEmpty 验证非空数组', () => {
      expect(() => requireNonEmpty('string')).toThrow(TypeError);
      expect(() => requireNonEmpty([])).toThrow(Error);
      expect(() => requireNonEmpty([1, 2])).not.toThrow();
    });
  });

  describe('练习 3: finally 块', () => {
    it('withResource 确保资源关闭', () => {
      const resource = withResource((r) => {
        r.data.push(1);
      });
      expect(resource.isOpen).toBe(false);
      expect(resource.data).toEqual([1]);
    });

    it('withResource 出错时也关闭', () => {
      const resource = withResource((r) => {
        r.data.push(1);
        throw new Error('test');
      });
      expect(resource.isOpen).toBe(false);
    });

    it('timedExecution 记录执行时间', () => {
      const { result, duration, error } = timedExecution(() => 42);
      expect(result).toBe(42);
      expect(duration).toBeGreaterThanOrEqual(0);
      expect(error).toBe(null);
    });

    it('timedExecution 记录错误', () => {
      const { result, duration, error } = timedExecution(() => {
        throw new Error('test');
      });
      expect(result).toBe(null);
      expect(duration).toBeGreaterThanOrEqual(0);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('练习 4: 错误类型检查', () => {
    it('getErrorCode 返回正确的错误码', () => {
      expect(getErrorCode(new SyntaxError())).toBe('SYNTAX_ERROR');
      expect(getErrorCode(new TypeError())).toBe('TYPE_ERROR');
      expect(getErrorCode(new RangeError())).toBe('RANGE_ERROR');
      expect(getErrorCode(new ReferenceError())).toBe('REFERENCE_ERROR');
      expect(getErrorCode(new Error())).toBe('UNKNOWN_ERROR');
    });

    it('isRetryable 判断可重试', () => {
      expect(isRetryable(new Error('network error'))).toBe(true);
      expect(isRetryable(new Error('timeout'))).toBe(true);
      expect(isRetryable(new Error('validation failed'))).toBe(false);
    });
  });

  describe('练习 5: 错误转换', () => {
    it('toUserMessage 返回友好消息', () => {
      expect(toUserMessage(new SyntaxError())).toBe('数据格式错误');
      expect(toUserMessage(new TypeError())).toBe('操作类型错误');
      expect(toUserMessage(new Error('network'))).toBe('网络连接失败');
      expect(toUserMessage(new Error('timeout'))).toBe('请求超时');
    });

    it('serializeError 序列化错误', () => {
      const error = new TypeError('test message');
      const serialized = serializeError(error);
      expect(serialized.name).toBe('TypeError');
      expect(serialized.message).toBe('test message');
      expect(serialized.stack).toBeDefined();
    });
  });
});
