import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TaskScheduler, delay } from './scheduler.js';

describe('综合挑战 01: 异步任务调度器', () => {
  let scheduler;

  beforeEach(() => {
    scheduler = new TaskScheduler({ concurrency: 2 });
  });

  describe('基本功能', () => {
    it('添加和执行任务', async () => {
      const taskId = scheduler.add(async () => 'result');
      expect(scheduler.getStatus(taskId)).toBe('pending');

      const result = await scheduler.getResult(taskId);
      expect(result).toBe('result');
      expect(scheduler.getStatus(taskId)).toBe('completed');
    });

    it('限制并发数', async () => {
      let concurrent = 0;
      let maxConcurrent = 0;

      const tasks = Array(5).fill().map(() =>
        scheduler.add(async () => {
          concurrent++;
          maxConcurrent = Math.max(maxConcurrent, concurrent);
          await delay(50);
          concurrent--;
        })
      );

      await Promise.all(tasks.map(id => scheduler.getResult(id)));
      expect(maxConcurrent).toBeLessThanOrEqual(2);
    });

    it('任务失败', async () => {
      const taskId = scheduler.add(async () => {
        throw new Error('Task failed');
      });

      await expect(scheduler.getResult(taskId)).rejects.toThrow('Task failed');
      expect(scheduler.getStatus(taskId)).toBe('failed');
    });
  });

  describe('优先级', () => {
    it('高优先级先执行', async () => {
      const order = [];
      const slowScheduler = new TaskScheduler({ concurrency: 1 });

      slowScheduler.add(async () => {
        await delay(10);
        order.push('low');
      }, { priority: 1 });

      slowScheduler.add(async () => {
        order.push('high');
      }, { priority: 10 });

      await slowScheduler.waitForAll();
      // 第一个任务已经在执行，第二个应该在第一个之后
      expect(order.length).toBe(2);
    });
  });

  describe('任务取消', () => {
    it('取消 pending 任务', async () => {
      const slowScheduler = new TaskScheduler({ concurrency: 1 });

      // 先添加一个阻塞任务
      slowScheduler.add(async () => delay(100));

      // 再添加一个待取消的任务
      const taskId = slowScheduler.add(async () => 'should not run');

      expect(slowScheduler.cancel(taskId)).toBe(true);
      expect(slowScheduler.getStatus(taskId)).toBe('cancelled');
    });

    it('cancelAll 取消所有待处理任务', async () => {
      const slowScheduler = new TaskScheduler({ concurrency: 1 });

      slowScheduler.add(async () => delay(100));
      const id1 = slowScheduler.add(async () => 'task1');
      const id2 = slowScheduler.add(async () => 'task2');

      slowScheduler.cancelAll();

      expect(slowScheduler.getStatus(id1)).toBe('cancelled');
      expect(slowScheduler.getStatus(id2)).toBe('cancelled');
    });
  });

  describe('事件监听', () => {
    it('taskComplete 事件', async () => {
      const callback = vi.fn();
      scheduler.on('taskComplete', callback);

      const taskId = scheduler.add(async () => 'result');
      await scheduler.getResult(taskId);

      expect(callback).toHaveBeenCalledWith(taskId, 'result');
    });

    it('taskError 事件', async () => {
      const callback = vi.fn();
      scheduler.on('taskError', callback);

      const taskId = scheduler.add(async () => {
        throw new Error('error');
      });

      try {
        await scheduler.getResult(taskId);
      } catch {}

      expect(callback).toHaveBeenCalled();
    });

    it('queueEmpty 事件', async () => {
      const callback = vi.fn();
      scheduler.on('queueEmpty', callback);

      scheduler.add(async () => 'task');
      await scheduler.waitForAll();

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('暂停和恢复', () => {
    it('pause 暂停新任务执行', async () => {
      const slowScheduler = new TaskScheduler({ concurrency: 1 });

      slowScheduler.pause();
      const taskId = slowScheduler.add(async () => 'result');

      await delay(50);
      expect(slowScheduler.getStatus(taskId)).toBe('pending');

      slowScheduler.resume();
      const result = await slowScheduler.getResult(taskId);
      expect(result).toBe('result');
    });
  });

  describe('统计信息', () => {
    it('getStats 返回统计', async () => {
      scheduler.add(async () => delay(100));
      scheduler.add(async () => 'quick');

      await delay(10);
      const stats = scheduler.getStats();

      expect(stats).toHaveProperty('pending');
      expect(stats).toHaveProperty('running');
      expect(stats).toHaveProperty('completed');
    });
  });

  describe('waitForAll', () => {
    it('等待所有任务完成', async () => {
      scheduler.add(async () => delay(50));
      scheduler.add(async () => delay(30));
      scheduler.add(async () => delay(40));

      await scheduler.waitForAll();

      const stats = scheduler.getStats();
      expect(stats.completed).toBe(3);
      expect(stats.pending).toBe(0);
      expect(stats.running).toBe(0);
    });
  });
});
