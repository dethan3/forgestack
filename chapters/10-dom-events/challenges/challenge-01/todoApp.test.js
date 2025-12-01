/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { TodoApp, createTodoApp } from './todoApp.js';

describe('综合挑战 01: Todo 应用', () => {
  let container;
  let app;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    app = new TodoApp(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('基本功能', () => {
    it('添加 Todo', () => {
      app.addTodo('Learn JavaScript');
      expect(app.todos.length).toBe(1);
      expect(app.todos[0].text).toBe('Learn JavaScript');
      expect(app.todos[0].completed).toBe(false);
    });

    it('添加多个 Todo', () => {
      app.addTodo('Task 1');
      app.addTodo('Task 2');
      app.addTodo('Task 3');
      expect(app.todos.length).toBe(3);
    });

    it('切换完成状态', () => {
      app.addTodo('Test todo');
      const id = app.todos[0].id;
      
      app.toggleTodo(id);
      expect(app.todos[0].completed).toBe(true);
      
      app.toggleTodo(id);
      expect(app.todos[0].completed).toBe(false);
    });

    it('删除 Todo', () => {
      app.addTodo('To delete');
      const id = app.todos[0].id;
      
      app.deleteTodo(id);
      expect(app.todos.length).toBe(0);
    });
  });

  describe('筛选功能', () => {
    beforeEach(() => {
      app.addTodo('Active 1');
      app.addTodo('Completed 1');
      app.addTodo('Active 2');
      app.toggleTodo(app.todos[1].id);
    });

    it('筛选全部', () => {
      app.setFilter('all');
      expect(app.getFilteredTodos().length).toBe(3);
    });

    it('筛选进行中', () => {
      app.setFilter('active');
      expect(app.getFilteredTodos().length).toBe(2);
    });

    it('筛选已完成', () => {
      app.setFilter('completed');
      expect(app.getFilteredTodos().length).toBe(1);
    });
  });

  describe('统计功能', () => {
    it('获取未完成数量', () => {
      app.addTodo('Task 1');
      app.addTodo('Task 2');
      app.addTodo('Task 3');
      app.toggleTodo(app.todos[0].id);
      
      expect(app.getActiveCount()).toBe(2);
    });

    it('清除已完成', () => {
      app.addTodo('Active');
      app.addTodo('Completed 1');
      app.addTodo('Completed 2');
      app.toggleTodo(app.todos[1].id);
      app.toggleTodo(app.todos[2].id);
      
      app.clearCompleted();
      expect(app.todos.length).toBe(1);
      expect(app.todos[0].text).toBe('Active');
    });
  });

  describe('渲染功能', () => {
    it('createTodoItem 创建元素', () => {
      const todo = { id: 1, text: 'Test', completed: false };
      const item = app.createTodoItem(todo);
      
      expect(item).toBeInstanceOf(HTMLElement);
      expect(item.dataset.id).toBe('1');
    });

    it('createTodoItem 已完成样式', () => {
      const todo = { id: 1, text: 'Test', completed: true };
      const item = app.createTodoItem(todo);
      
      expect(item.classList.contains('completed')).toBe(true);
    });
  });

  describe('工厂函数', () => {
    it('createTodoApp', () => {
      const app = createTodoApp(container);
      expect(app).toBeInstanceOf(TodoApp);
    });
  });
});
