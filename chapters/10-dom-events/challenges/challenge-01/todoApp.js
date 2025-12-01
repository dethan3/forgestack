/**
 * 综合挑战 01：交互式 Todo 应用
 *
 * 实现一个完整的 Todo 应用
 */

export class TodoApp {
  constructor(container) {
    this.container = container;
    this.todos = [];
    this.filter = 'all'; // 'all' | 'active' | 'completed'
    this.nextId = 1;

    // TODO: 初始化
    // this.init();
  }

  /**
   * 初始化应用
   */
  init() {
    // TODO: 渲染初始 HTML 结构
    // TODO: 绑定事件
  }

  /**
   * 添加 Todo
   * @param {string} text
   */
  addTodo(text) {
    // TODO: 添加新 todo 到数组
    // { id, text, completed: false }
    // 渲染更新
  }

  /**
   * 切换完成状态
   * @param {number} id
   */
  toggleTodo(id) {
    // TODO: 切换指定 todo 的 completed 状态
  }

  /**
   * 删除 Todo
   * @param {number} id
   */
  deleteTodo(id) {
    // TODO: 从数组中移除指定 todo
  }

  /**
   * 设置筛选条件
   * @param {'all' | 'active' | 'completed'} filter
   */
  setFilter(filter) {
    // TODO: 更新筛选条件并重新渲染
  }

  /**
   * 获取筛选后的 todos
   */
  getFilteredTodos() {
    // TODO: 根据 this.filter 返回筛选后的数组
  }

  /**
   * 清除已完成
   */
  clearCompleted() {
    // TODO: 移除所有 completed 为 true 的 todo
  }

  /**
   * 获取未完成数量
   */
  getActiveCount() {
    // TODO: 返回未完成的 todo 数量
  }

  /**
   * 渲染 Todo 列表
   */
  renderList() {
    // TODO: 渲染 todo 列表到 .todo-list
  }

  /**
   * 渲染统计信息
   */
  renderFooter() {
    // TODO: 更新 .todo-count 显示
    // TODO: 更新筛选按钮的 active 状态
  }

  /**
   * 完整渲染
   */
  render() {
    // TODO: 调用 renderList 和 renderFooter
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // TODO: 使用事件委托
    // - 输入框 Enter 键添加
    // - 列表项点击（切换/删除）
    // - 筛选按钮点击
    // - 清除已完成按钮点击
  }

  /**
   * 创建 Todo 项 HTML
   * @param {{ id: number, text: string, completed: boolean }} todo
   */
  createTodoItem(todo) {
    // TODO: 返回 li 元素
    // 结构：checkbox + label + delete button
  }
}

// 导出工厂函数
export function createTodoApp(container) {
  return new TodoApp(container);
}
