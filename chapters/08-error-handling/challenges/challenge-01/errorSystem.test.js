import { describe, it, expect, vi } from 'vitest';
import {
  AppError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  ErrorManager,
  ErrorCollector,
  AsyncErrorBoundary,
  createErrorReport,
  isRecoverable,
} from './errorSystem.js';

describe('综合挑战 01: 错误处理系统', () => {
  describe('错误类层级', () => {
    it('AppError 基本属性', () => {
      const error = new AppError('Test', { code: 'TEST', context: { userId: 1 } });
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test');
      expect(error.code).toBe('TEST');
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.context).toEqual({ userId: 1 });
    });

    it('NetworkError', () => {
      const error = new NetworkError('Failed', { statusCode: 500, url: '/api' });
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(500);
      expect(error.url).toBe('/api');
    });

    it('ValidationError', () => {
      const errors = [{ field: 'email', message: 'Invalid' }];
      const error = new ValidationError('Validation failed', errors);
      expect(error).toBeInstanceOf(AppError);
      expect(error.errors).toEqual(errors);
    });

    it('AuthenticationError', () => {
      const error = new AuthenticationError();
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Authentication required');
    });

    it('AuthorizationError', () => {
      const error = new AuthorizationError();
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Permission denied');
    });
  });

  describe('ErrorManager', () => {
    it('注册和处理错误', () => {
      const manager = new ErrorManager();

      manager.register(ValidationError, (error) => ({
        status: 400,
        message: error.message
      }));

      const result = manager.handle(new ValidationError('Invalid input'));
      expect(result.status).toBe(400);
    });

    it('处理子类错误', () => {
      const manager = new ErrorManager();

      manager.register(AppError, (error) => ({
        status: 500,
        message: 'App error'
      }));

      // NetworkError 是 AppError 的子类
      const result = manager.handle(new NetworkError('Network failed'));
      expect(result.status).toBe(500);
    });

    it('默认处理器', () => {
      const manager = new ErrorManager();

      manager.setDefaultHandler((error) => ({
        status: 500,
        message: 'Unknown error'
      }));

      const result = manager.handle(new Error('Unknown'));
      expect(result.status).toBe(500);
    });

    it('wrap 包装函数', async () => {
      const manager = new ErrorManager();
      manager.register(ValidationError, () => ({ handled: true }));

      const wrapped = manager.wrap(async () => {
        throw new ValidationError('Invalid');
      });

      const result = await wrapped();
      expect(result.handled).toBe(true);
    });
  });

  describe('ErrorCollector', () => {
    it('捕获错误', () => {
      const collector = new ErrorCollector();

      collector.capture(new Error('Error 1'), { source: 'test' });
      collector.capture(new Error('Error 2'));

      const errors = collector.getErrors();
      expect(errors.length).toBe(2);
      expect(errors[0].metadata.source).toBe('test');
    });

    it('按类型获取', () => {
      const collector = new ErrorCollector();

      collector.capture(new ValidationError('Validation'));
      collector.capture(new NetworkError('Network'));
      collector.capture(new ValidationError('Validation 2'));

      const validationErrors = collector.getErrorsByType(ValidationError);
      expect(validationErrors.length).toBe(2);
    });

    it('限制大小', () => {
      const collector = new ErrorCollector({ maxSize: 2 });

      collector.capture(new Error('1'));
      collector.capture(new Error('2'));
      collector.capture(new Error('3'));

      expect(collector.getErrors().length).toBe(2);
    });

    it('统计', () => {
      const collector = new ErrorCollector();

      collector.capture(new ValidationError('1'));
      collector.capture(new NetworkError('2'));
      collector.capture(new ValidationError('3'));

      const stats = collector.getStats();
      expect(stats.total).toBe(3);
      expect(stats.byType.ValidationError).toBe(2);
    });

    it('清空', () => {
      const collector = new ErrorCollector();
      collector.capture(new Error('test'));
      collector.clear();
      expect(collector.getErrors().length).toBe(0);
    });
  });

  describe('AsyncErrorBoundary', () => {
    it('正常执行', async () => {
      const boundary = new AsyncErrorBoundary();
      const result = await boundary.run(async () => 'success');
      expect(result).toBe('success');
    });

    it('错误时返回 fallback', async () => {
      const boundary = new AsyncErrorBoundary({ fallback: 'default' });
      const result = await boundary.run(async () => {
        throw new Error('fail');
      });
      expect(result).toBe('default');
    });

    it('调用 onError', async () => {
      const onError = vi.fn();
      const boundary = new AsyncErrorBoundary({ onError });

      await boundary.run(async () => { throw new Error('test'); });
      expect(onError).toHaveBeenCalled();
    });

    it('重试', async () => {
      let attempts = 0;
      const boundary = new AsyncErrorBoundary({ retries: 2 });

      const result = await boundary.run(async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      });

      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    it('createSafe 创建安全函数', async () => {
      const boundary = new AsyncErrorBoundary({ fallback: null });
      const safeFn = boundary.createSafe(async () => {
        throw new Error('fail');
      });

      const result = await safeFn();
      expect(result).toBe(null);
    });
  });

  describe('辅助函数', () => {
    it('createErrorReport', () => {
      const error = new AppError('Test', { code: 'TEST' });
      const report = createErrorReport(error);

      expect(report.name).toBe('AppError');
      expect(report.message).toBe('Test');
      expect(report.code).toBe('TEST');
      expect(report.timestamp).toBeDefined();
    });

    it('isRecoverable', () => {
      expect(isRecoverable(new NetworkError('fail'))).toBe(true);
      expect(isRecoverable(new ValidationError('fail'))).toBe(true);
      expect(isRecoverable(new AuthenticationError())).toBe(false);
      expect(isRecoverable(new AuthorizationError())).toBe(false);
    });
  });
});
