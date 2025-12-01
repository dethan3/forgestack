import { describe, it, expect, vi } from 'vitest';
import {
  configManager,
  createLogger,
  createStorage,
  validators,
  validate,
  createPluginSystem,
  createService,
  createLazyModule,
} from './03-patterns.js';

describe('03-patterns: 模块模式', () => {
  describe('练习 1: 单例模式', () => {
    it('configManager 设置和获取', () => {
      configManager.set('apiUrl', 'https://api.example.com');
      expect(configManager.get('apiUrl')).toBe('https://api.example.com');
    });

    it('configManager 获取全部', () => {
      configManager.set('timeout', 5000);
      const all = configManager.getAll();
      expect(all).toHaveProperty('timeout', 5000);
    });
  });

  describe('练习 2: 工厂模式', () => {
    it('createLogger', () => {
      const logger = createLogger('APP');
      const consoleSpy = vi.spyOn(console, 'log');
      
      logger.log('test message');
      expect(consoleSpy).toHaveBeenCalledWith('[APP]', 'test message');
      
      consoleSpy.mockRestore();
    });

    it('createStorage', () => {
      const storage = createStorage('user');
      const mockStorage = new Map();
      
      // 模拟 localStorage
      vi.stubGlobal('localStorage', {
        getItem: (k) => mockStorage.get(k),
        setItem: (k, v) => mockStorage.set(k, v),
        removeItem: (k) => mockStorage.delete(k),
        clear: () => mockStorage.clear()
      });

      storage.set('name', 'Alice');
      expect(storage.get('name')).toBe('Alice');
      
      vi.unstubAllGlobals();
    });
  });

  describe('练习 3: 策略模式', () => {
    it('validators.required', () => {
      expect(validators.required('value')).toBe(true);
      expect(validators.required('')).toBe(false);
      expect(validators.required(null)).toBe(false);
    });

    it('validators.email', () => {
      expect(validators.email('test@example.com')).toBe(true);
      expect(validators.email('invalid')).toBe(false);
    });

    it('validators.minLength', () => {
      expect(validators.minLength(3)('abc')).toBe(true);
      expect(validators.minLength(3)('ab')).toBe(false);
    });

    it('validators.maxLength', () => {
      expect(validators.maxLength(5)('abc')).toBe(true);
      expect(validators.maxLength(5)('abcdef')).toBe(false);
    });

    it('validate 函数', () => {
      const result = validate('test@example.com', [
        'required',
        'email'
      ]);
      expect(result.valid).toBe(true);

      const result2 = validate('', ['required']);
      expect(result2.valid).toBe(false);
      expect(result2.errors.length).toBeGreaterThan(0);
    });
  });

  describe('练习 4: 插件系统', () => {
    it('注册和使用插件', () => {
      const system = createPluginSystem();
      
      system.register('logger', {
        name: 'Logger Plugin',
        execute: (msg) => `Logged: ${msg}`
      });

      expect(system.use('logger').name).toBe('Logger Plugin');
      expect(system.list()).toContain('logger');
    });

    it('执行插件', () => {
      const system = createPluginSystem();
      
      system.register('formatter', {
        execute: (text) => text.toUpperCase()
      });

      expect(system.execute('formatter', 'hello')).toBe('HELLO');
    });
  });

  describe('练习 5: 模块初始化', () => {
    it('createService 初始化流程', async () => {
      const service = createService();
      expect(service.initialized).toBe(false);
      
      await service.init({ url: 'http://api.test' });
      expect(service.initialized).toBe(true);
      
      expect(() => service.getData()).not.toThrow();
      
      service.destroy();
      expect(service.initialized).toBe(false);
    });

    it('createService 未初始化时抛错', () => {
      const service = createService();
      expect(() => service.getData()).toThrow();
    });

    it('createLazyModule', async () => {
      const loader = vi.fn().mockResolvedValue({ value: 42 });
      const lazy = createLazyModule(loader);

      expect(lazy.loaded).toBe(false);
      
      await lazy.load();
      expect(lazy.loaded).toBe(true);
      expect(loader).toHaveBeenCalledTimes(1);
      
      expect(lazy.get().value).toBe(42);
      
      // 再次加载不应重复调用
      await lazy.load();
      expect(loader).toHaveBeenCalledTimes(1);
    });
  });
});
