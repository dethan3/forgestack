/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  createElement,
  createLink,
  createList,
  appendAll,
  prepend,
  insertAfter,
  insertHTML,
  toggleClass,
  setStyles,
  setAttributes,
  setDataAttributes,
  moveTo,
  swap,
  removeChildren,
  replace,
  createElements,
  cloneAndModify,
} from './02-dom-manipulation.js';

describe('02-dom-manipulation: DOM 操作', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <div id="first" class="item">First</div>
        <div id="second" class="item">Second</div>
        <div id="third" class="item">Third</div>
      </div>
      <div id="target"></div>
    `;
  });

  describe('练习 1: 创建元素', () => {
    it('createElement', () => {
      const el = createElement('div', 'card', 'Hello');
      expect(el.tagName).toBe('DIV');
      expect(el.className).toBe('card');
      expect(el.textContent).toBe('Hello');
    });

    it('createLink', () => {
      const link = createLink('https://example.com', 'Click', true);
      expect(link.href).toBe('https://example.com/');
      expect(link.textContent).toBe('Click');
      expect(link.target).toBe('_blank');
    });

    it('createList ordered', () => {
      const list = createList(['A', 'B', 'C'], true);
      expect(list.tagName).toBe('OL');
      expect(list.children.length).toBe(3);
    });

    it('createList unordered', () => {
      const list = createList(['X', 'Y']);
      expect(list.tagName).toBe('UL');
    });
  });

  describe('练习 2: 添加元素', () => {
    it('appendAll', () => {
      const container = document.getElementById('target');
      const elements = [
        document.createElement('span'),
        document.createElement('span')
      ];
      appendAll(container, elements);
      expect(container.children.length).toBe(2);
    });

    it('prepend', () => {
      const container = document.getElementById('container');
      const newEl = document.createElement('div');
      newEl.id = 'new';
      prepend(container, newEl);
      expect(container.firstElementChild.id).toBe('new');
    });

    it('insertAfter', () => {
      const first = document.getElementById('first');
      const newEl = document.createElement('div');
      newEl.id = 'inserted';
      insertAfter(first, newEl);
      expect(first.nextElementSibling.id).toBe('inserted');
    });

    it('insertHTML', () => {
      const el = document.getElementById('first');
      insertHTML(el, '<span class="badge">New</span>', 'afterbegin');
      expect(el.firstElementChild.className).toBe('badge');
    });
  });

  describe('练习 3: 修改元素', () => {
    it('toggleClass', () => {
      const el = document.getElementById('first');
      const result = toggleClass(el, 'active');
      expect(result).toBe(true);
      expect(el.classList.contains('active')).toBe(true);
      
      toggleClass(el, 'active', false);
      expect(el.classList.contains('active')).toBe(false);
    });

    it('setStyles', () => {
      const el = document.getElementById('first');
      setStyles(el, { color: 'red', fontSize: '16px' });
      expect(el.style.color).toBe('red');
      expect(el.style.fontSize).toBe('16px');
    });

    it('setAttributes', () => {
      const el = document.getElementById('first');
      setAttributes(el, { title: 'Hello', 'aria-label': 'First item' });
      expect(el.getAttribute('title')).toBe('Hello');
      expect(el.getAttribute('aria-label')).toBe('First item');
    });

    it('setDataAttributes', () => {
      const el = document.getElementById('first');
      setDataAttributes(el, { id: '123', type: 'card' });
      expect(el.dataset.id).toBe('123');
      expect(el.dataset.type).toBe('card');
    });
  });

  describe('练习 4: 移动和删除', () => {
    it('moveTo', () => {
      const first = document.getElementById('first');
      const target = document.getElementById('target');
      moveTo(first, target);
      expect(target.contains(first)).toBe(true);
    });

    it('swap', () => {
      const first = document.getElementById('first');
      const third = document.getElementById('third');
      const container = document.getElementById('container');
      
      swap(first, third);
      
      const items = container.querySelectorAll('.item');
      expect(items[0].id).toBe('third');
      expect(items[2].id).toBe('first');
    });

    it('removeChildren', () => {
      const container = document.getElementById('container');
      removeChildren(container);
      expect(container.children.length).toBe(0);
    });

    it('replace', () => {
      const first = document.getElementById('first');
      const newEl = document.createElement('div');
      newEl.id = 'replaced';
      replace(first, newEl);
      expect(document.getElementById('replaced')).not.toBeNull();
      expect(document.getElementById('first')).toBeNull();
    });
  });

  describe('练习 5: 批量操作', () => {
    it('createElements', () => {
      const fragment = createElements([
        { tag: 'div', className: 'a', text: 'A' },
        { tag: 'span', className: 'b', text: 'B' }
      ]);
      expect(fragment.childNodes.length).toBe(2);
    });

    it('cloneAndModify', () => {
      const original = document.getElementById('first');
      original.dataset.id = '1';
      
      const clone = cloneAndModify(original, {
        className: 'cloned',
        text: 'Cloned',
        attributes: { id: 'clone-1' }
      });
      
      expect(clone.className).toBe('cloned');
      expect(clone.textContent).toBe('Cloned');
      expect(clone.id).toBe('clone-1');
    });
  });
});
