/**
 * 练习 02：DOM 操作
 *
 * 学习目标：
 * - 创建和添加元素
 * - 修改元素属性和样式
 * - 移动和删除元素
 */

// ============================================
// 练习 1：创建元素
// ============================================

/**
 * 创建一个带类名和文本的元素
 * @param {string} tag - 标签名
 * @param {string} className - 类名
 * @param {string} text - 文本内容
 */
export function createElement(tag, className, text) {
  // TODO: 实现
}

/**
 * 创建一个链接元素
 * @param {string} href
 * @param {string} text
 * @param {boolean} newTab - 是否新窗口打开
 */
export function createLink(href, text, newTab = false) {
  // TODO: 实现
}

/**
 * 创建一个列表
 * @param {string[]} items - 列表项文本
 * @param {boolean} ordered - 是否有序列表
 */
export function createList(items, ordered = false) {
  // TODO: 返回 ul 或 ol 元素
}

// ============================================
// 练习 2：添加元素
// ============================================

/**
 * 在容器末尾添加多个元素
 * @param {Element} container
 * @param {Element[]} elements
 */
export function appendAll(container, elements) {
  // TODO: 实现
}

/**
 * 在容器开头添加元素
 * @param {Element} container
 * @param {Element} element
 */
export function prepend(container, element) {
  // TODO: 实现
}

/**
 * 在指定元素之后插入新元素
 * @param {Element} reference
 * @param {Element} newElement
 */
export function insertAfter(reference, newElement) {
  // TODO: 实现
}

/**
 * 使用 HTML 字符串添加内容
 * @param {Element} element
 * @param {string} html
 * @param {'beforebegin'|'afterbegin'|'beforeend'|'afterend'} position
 */
export function insertHTML(element, html, position) {
  // TODO: 使用 insertAdjacentHTML
}

// ============================================
// 练习 3：修改元素
// ============================================

/**
 * 切换元素的类
 * @param {Element} element
 * @param {string} className
 * @param {boolean} force - 可选，强制添加或删除
 */
export function toggleClass(element, className, force) {
  // TODO: 返回切换后的状态
}

/**
 * 设置元素的多个样式
 * @param {Element} element
 * @param {Object} styles - { property: value }
 */
export function setStyles(element, styles) {
  // TODO: 实现
}

/**
 * 设置元素的多个属性
 * @param {Element} element
 * @param {Object} attrs - { name: value }
 */
export function setAttributes(element, attrs) {
  // TODO: 实现
}

/**
 * 更新元素的 data 属性
 * @param {Element} element
 * @param {Object} data - { key: value }
 */
export function setDataAttributes(element, data) {
  // TODO: 实现
}

// ============================================
// 练习 4：移动和删除
// ============================================

/**
 * 移动元素到新的父元素
 * @param {Element} element
 * @param {Element} newParent
 */
export function moveTo(element, newParent) {
  // TODO: 实现
}

/**
 * 交换两个元素的位置
 * @param {Element} el1
 * @param {Element} el2
 */
export function swap(el1, el2) {
  // TODO: 实现
}

/**
 * 移除元素的所有子元素
 * @param {Element} element
 */
export function removeChildren(element) {
  // TODO: 实现
}

/**
 * 替换元素
 * @param {Element} oldEl
 * @param {Element} newEl
 */
export function replace(oldEl, newEl) {
  // TODO: 实现
}

// ============================================
// 练习 5：批量操作
// ============================================

/**
 * 批量创建元素（使用 DocumentFragment）
 * @param {Array<{tag: string, className: string, text: string}>} items
 */
export function createElements(items) {
  // TODO: 返回 DocumentFragment
}

/**
 * 克隆元素并修改
 * @param {Element} element
 * @param {Object} modifications - { className, text, attributes }
 */
export function cloneAndModify(element, modifications) {
  // TODO: 深克隆并应用修改
}
