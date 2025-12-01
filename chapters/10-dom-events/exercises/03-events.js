/**
 * 练习 03：事件处理
 *
 * 学习目标：
 * - 添加和移除事件监听
 * - 事件委托
 * - 自定义事件
 */

// ============================================
// 练习 1：基本事件
// ============================================

/**
 * 为元素添加点击事件
 * @param {Element} element
 * @param {Function} handler
 */
export function onClick(element, handler) {
  // TODO: 实现
}

/**
 * 为元素添加一次性点击事件
 * @param {Element} element
 * @param {Function} handler
 */
export function onClickOnce(element, handler) {
  // TODO: 使用 once 选项
}

/**
 * 创建可移除的事件监听器
 * @param {Element} element
 * @param {string} event
 * @param {Function} handler
 * @returns {Function} 移除函数
 */
export function addRemovableListener(element, event, handler) {
  // TODO: 返回移除监听器的函数
}

// ============================================
// 练习 2：事件委托
// ============================================

/**
 * 实现事件委托
 * @param {Element} parent
 * @param {string} selector - 目标元素选择器
 * @param {string} eventType
 * @param {Function} handler
 */
export function delegate(parent, selector, eventType, handler) {
  // TODO: 实现事件委托
}

/**
 * 创建委托管理器
 * @param {Element} root
 */
export function createDelegator(root) {
  // TODO: 返回对象包含:
  // - on(selector, event, handler): 添加委托
  // - off(selector, event): 移除委托
  // - destroy(): 移除所有监听
}

// ============================================
// 练习 3：表单事件
// ============================================

/**
 * 监听输入变化（带防抖）
 * @param {HTMLInputElement} input
 * @param {Function} handler
 * @param {number} delay
 */
export function onInputDebounced(input, handler, delay = 300) {
  // TODO: 实现
}

/**
 * 监听表单提交
 * @param {HTMLFormElement} form
 * @param {Function} handler - 接收表单数据对象
 */
export function onSubmit(form, handler) {
  // TODO: 阻止默认行为，传递 FormData
}

/**
 * 监听表单字段变化
 * @param {HTMLFormElement} form
 * @param {Function} handler - 接收 { name, value, element }
 */
export function onFieldChange(form, handler) {
  // TODO: 监听所有字段的 change 事件
}

// ============================================
// 练习 4：自定义事件
// ============================================

/**
 * 创建并触发自定义事件
 * @param {Element} element
 * @param {string} eventName
 * @param {Object} detail
 */
export function emitEvent(element, eventName, detail = {}) {
  // TODO: 创建 CustomEvent 并 dispatch
}

/**
 * 创建事件发射器
 */
export function createEventEmitter() {
  // TODO: 返回对象包含:
  // - on(event, handler): 监听事件
  // - off(event, handler): 移除监听
  // - emit(event, data): 触发事件
  // - once(event, handler): 一次性监听
}

// ============================================
// 练习 5：高级事件处理
// ============================================

/**
 * 节流函数
 * @param {Function} fn
 * @param {number} limit
 */
export function throttle(fn, limit) {
  // TODO: 实现
}

/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay) {
  // TODO: 实现
}

/**
 * 创建键盘快捷键处理器
 * @param {Object} shortcuts - { 'ctrl+s': handler, 'alt+n': handler }
 */
export function createShortcuts(shortcuts) {
  // TODO: 返回可以添加到 document 的事件处理函数
  // 匹配快捷键时调用对应 handler 并阻止默认行为
}
