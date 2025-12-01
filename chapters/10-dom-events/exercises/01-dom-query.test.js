/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getElementById,
  getElementsByClass,
  querySelector,
  querySelectorAll,
  findByDataAttr,
  findRequiredInputs,
  findVisible,
  getParents,
  getSiblings,
  findClosest,
  getDataAttributes,
  getClassList,
  matchesSelector,
  getFormValues,
  findEmptyFields,
} from './01-dom-query.js';

describe('01-dom-query: DOM 查询', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app" class="container">
        <header class="header">
          <h1 id="title">Title</h1>
        </header>
        <main class="main">
          <div class="card" data-id="1" data-type="article">
            <span class="card-title">Card 1</span>
          </div>
          <div class="card hidden" data-id="2" data-type="video">
            <span class="card-title">Card 2</span>
          </div>
          <div class="card" data-id="3" data-type="article">
            <span class="card-title">Card 3</span>
          </div>
        </main>
        <form id="myForm">
          <input name="username" type="text" required value="john">
          <input name="email" type="email" required value="">
          <select name="role" required>
            <option value="">Select</option>
            <option value="admin">Admin</option>
          </select>
          <textarea name="bio"></textarea>
        </form>
      </div>
    `;
  });

  describe('练习 1: 基本查询', () => {
    it('getElementById', () => {
      const el = getElementById(document, 'title');
      expect(el.textContent).toBe('Title');
    });

    it('getElementsByClass', () => {
      const els = getElementsByClass(document, 'card');
      expect(els.length).toBe(3);
    });

    it('querySelector', () => {
      const el = querySelector(document, '.card-title');
      expect(el.textContent).toBe('Card 1');
    });

    it('querySelectorAll', () => {
      const els = querySelectorAll(document, '.card-title');
      expect(els.length).toBe(3);
    });
  });

  describe('练习 2: 复杂选择器', () => {
    it('findByDataAttr', () => {
      const el = findByDataAttr(document, 'id', '2');
      expect(el.querySelector('.card-title').textContent).toBe('Card 2');
    });

    it('findRequiredInputs', () => {
      const inputs = findRequiredInputs(document, '#myForm');
      expect(inputs.length).toBe(3);
    });

    it('findVisible', () => {
      const visible = findVisible(document, '.card');
      expect(visible.length).toBe(2);
    });
  });

  describe('练习 3: DOM 遍历', () => {
    it('getParents', () => {
      const title = document.querySelector('.card-title');
      const parents = getParents(title);
      expect(parents.some(p => p.classList.contains('card'))).toBe(true);
      expect(parents.some(p => p.classList.contains('main'))).toBe(true);
    });

    it('getSiblings', () => {
      const card = document.querySelector('.card');
      const siblings = getSiblings(card);
      expect(siblings.length).toBe(2);
    });

    it('findClosest', () => {
      const title = document.querySelector('.card-title');
      const container = findClosest(title, '.container');
      expect(container.id).toBe('app');
    });
  });

  describe('练习 4: 元素属性', () => {
    it('getDataAttributes', () => {
      const card = document.querySelector('.card');
      const data = getDataAttributes(card);
      expect(data.id).toBe('1');
      expect(data.type).toBe('article');
    });

    it('getClassList', () => {
      const card = document.querySelector('.card.hidden');
      const classes = getClassList(card);
      expect(classes).toContain('card');
      expect(classes).toContain('hidden');
    });

    it('matchesSelector', () => {
      const card = document.querySelector('.card');
      expect(matchesSelector(card, '.card')).toBe(true);
      expect(matchesSelector(card, '.hidden')).toBe(false);
    });
  });

  describe('练习 5: 表单元素', () => {
    it('getFormValues', () => {
      const form = document.getElementById('myForm');
      const values = getFormValues(form);
      expect(values.username).toBe('john');
      expect(values.email).toBe('');
    });

    it('findEmptyFields', () => {
      const form = document.getElementById('myForm');
      const empty = findEmptyFields(form);
      expect(empty.length).toBeGreaterThan(0);
      expect(empty.some(f => f.name === 'email')).toBe(true);
    });
  });
});
