import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  NotFoundError,
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  HttpNotFoundError,
  createErrorFactory,
  handleError,
  assert,
  assertExists,
  assertType,
} from './02-custom-errors.js';

describe('02-custom-errors: 自定义错误', () => {
  describe('练习 1: 基础自定义错误', () => {
    it('AppError 基本属性', () => {
      const error = new AppError('Test error', 'TEST_CODE');
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('AppError');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.isOperational).toBe(true);
    });

    it('ValidationError', () => {
      const error = new ValidationError('Invalid email', 'email');
      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe('ValidationError');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.field).toBe('email');
    });

    it('NotFoundError', () => {
      const error = new NotFoundError('User');
      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe('NotFoundError');
      expect(error.message).toBe('User not found');
      expect(error.resource).toBe('User');
    });
  });

  describe('练习 2: HTTP 错误', () => {
    it('HttpError 基本属性', () => {
      const error = new HttpError(500, 'Server Error');
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('HTTP_500');
    });

    it('BadRequestError', () => {
      const error = new BadRequestError('Invalid input');
      expect(error.statusCode).toBe(400);
    });

    it('UnauthorizedError', () => {
      const error = new UnauthorizedError();
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Unauthorized');
    });

    it('ForbiddenError', () => {
      const error = new ForbiddenError();
      expect(error.statusCode).toBe(403);
    });

    it('HttpNotFoundError', () => {
      const error = new HttpNotFoundError();
      expect(error.statusCode).toBe(404);
    });
  });

  describe('练习 3: 错误工厂', () => {
    it('createErrorFactory 创建各种错误', () => {
      const errors = createErrorFactory();

      const validation = errors.validation('email', 'Invalid');
      expect(validation).toBeInstanceOf(ValidationError);

      const notFound = errors.notFound('User');
      expect(notFound).toBeInstanceOf(NotFoundError);

      const unauthorized = errors.unauthorized('Token expired');
      expect(unauthorized).toBeInstanceOf(UnauthorizedError);

      const badRequest = errors.badRequest('Invalid data');
      expect(badRequest).toBeInstanceOf(BadRequestError);
    });
  });

  describe('练习 4: 错误处理器', () => {
    it('处理 HttpError', () => {
      const result = handleError(new HttpError(500, 'Server Error'));
      expect(result.status).toBe(500);
      expect(result.code).toBe('HTTP_500');
    });

    it('处理 ValidationError', () => {
      const result = handleError(new ValidationError('Invalid', 'email'));
      expect(result.status).toBe(400);
      expect(result.field).toBe('email');
    });

    it('处理 NotFoundError', () => {
      const result = handleError(new NotFoundError('User'));
      expect(result.status).toBe(404);
    });

    it('处理未知错误', () => {
      const result = handleError(new Error('Unknown'));
      expect(result.status).toBe(500);
      expect(result.code).toBe('INTERNAL_ERROR');
    });
  });

  describe('练习 5: 断言函数', () => {
    it('assert 条件为真', () => {
      expect(() => assert(true, Error, 'message')).not.toThrow();
      expect(() => assert(false, ValidationError, 'Invalid', 'field'))
        .toThrow(ValidationError);
    });

    it('assertExists', () => {
      expect(assertExists('value', 'name')).toBe('value');
      expect(() => assertExists(null, 'User')).toThrow(NotFoundError);
      expect(() => assertExists(undefined, 'User')).toThrow(NotFoundError);
    });

    it('assertType', () => {
      expect(() => assertType('str', 'string', 'name')).not.toThrow();
      expect(() => assertType(123, 'string', 'name')).toThrow(TypeError);
      expect(() => assertType(null, 'object', 'data')).toThrow(TypeError);
    });
  });
});
