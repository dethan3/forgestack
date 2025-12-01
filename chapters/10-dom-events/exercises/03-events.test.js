/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  onClick,
  onClickOnce,
  addRemovableListener,
  delegate,
  createDelegator,
  onInputDebounced,
  onSubmit,
  onFieldChange,
  emitEvent,
  createEventEmitter,
  throttle,
  debounce,
  createShortcuts,
} from './03-events.js';

describe('03-events: 事件处理', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <button class="btn" data-id="1">Button 1</button>
        <button class="btn" data-id="2">Button 2</button>
      </div>
      <form id="myForm">
        <input name="username" type="text">
        <input name="email" type="email">
        <button type="submit">Submit</button>
      </form>
    `;
  });

  describe('练习 1: 基本事件', () => {
    it('onClick', () => {
      const btn = document.querySelector('.btn');
      const handler = vi.fn();
      onClick(btn, handler);
      btn.click();
      expect(handler).toHaveBeenCalled();
    });

    it('onClickOnce', () => {
      const btn = document.querySelector('.btn');
      const handler = vi.fn();
      onClickOnce(btn, handler);
      btn.click();
      btn.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('addRemovableListener', () => {
      const btn = document.querySelector('.btn');
      const handler = vi.fn();
      const remove = addRemovableListener(btn, 'click', handler);
      
      btn.click();
      expect(handler).toHaveBeenCalledTimes(1);
      
      remove();
      btn.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('练习 2: 事件委托', () => {
    it('delegate', () => {
      const container = document.getElementById('container');
      const handler = vi.fn();
      
      delegate(container, '.btn', 'click', handler);
      
      document.querySelector('[data-id="1"]').click();
      expect(handler).toHaveBeenCalled();
    });

    it('createDelegator', () => {
      const container = document.getElementById('container');
      const delegator = createDelegator(container);
      const handler = vi.fn();
      
      delegator.on('.btn', 'click', handler);
      document.querySelector('.btn').click();
      expect(handler).toHaveBeenCalled();
      
      delegator.destroy();
    });
  });

  describe('练习 3: 表单事件', () => {
    it('onInputDebounced', async () => {
      const input = document.querySelector('[name="username"]');
      const handler = vi.fn();
      
      onInputDebounced(input, handler, 50);
      
      input.value = 'a';
      input.dispatchEvent(new Event('input'));
      input.value = 'ab';
      input.dispatchEvent(new Event('input'));
      
      await new Promise(r => setTimeout(r, 100));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('onSubmit', () => {
      const form = document.getElementById('myForm');
      const handler = vi.fn();
      
      onSubmit(form, handler);
      
      const input = form.querySelector('[name="username"]');
      input.value = 'john';
      
      form.dispatchEvent(new Event('submit'));
      expect(handler).toHaveBeenCalled();
    });

    it('onFieldChange', () => {
      const form = document.getElementById('myForm');
      const handler = vi.fn();
      
      onFieldChange(form, handler);
      
      const input = form.querySelector('[name="email"]');
      input.value = 'test@test.com';
      input.dispatchEvent(new Event('change', { bubbles: true }));
      
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'email' })
      );
    });
  });

  describe('练习 4: 自定义事件', () => {
    it('emitEvent', () => {
      const el = document.createElement('div');
      const handler = vi.fn();
      el.addEventListener('custom', handler);
      
      emitEvent(el, 'custom', { message: 'hello' });
      
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.message).toBe('hello');
    });

    it('createEventEmitter', () => {
      const emitter = createEventEmitter();
      const handler = vi.fn();
      
      emitter.on('test', handler);
      emitter.emit('test', { data: 1 });
      
      expect(handler).toHaveBeenCalledWith({ data: 1 });
      
      emitter.off('test', handler);
      emitter.emit('test', { data: 2 });
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('createEventEmitter once', () => {
      const emitter = createEventEmitter();
      const handler = vi.fn();
      
      emitter.once('test', handler);
      emitter.emit('test');
      emitter.emit('test');
      
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('练习 5: 高级事件处理', () => {
    it('throttle', async () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 50);
      
      throttled();
      throttled();
      throttled();
      
      expect(fn).toHaveBeenCalledTimes(1);
      
      await new Promise(r => setTimeout(r, 60));
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('debounce', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);
      
      debounced();
      debounced();
      debounced();
      
      expect(fn).not.toHaveBeenCalled();
      
      await new Promise(r => setTimeout(r, 60));
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('createShortcuts', () => {
      const handler = vi.fn();
      const shortcutHandler = createShortcuts({
        'ctrl+s': handler
      });
      
      const event = new KeyboardEvent('keydown', {
        key: 's',
        ctrlKey: true
      });
      
      shortcutHandler(event);
      expect(handler).toHaveBeenCalled();
    });
  });
});
