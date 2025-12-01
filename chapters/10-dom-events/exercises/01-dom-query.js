/**
 * 练习 01：DOM 查询
 *
 * 学习目标：
 * - 使用各种选择器查询元素
 * - 遍历 DOM 树
 * - 获取元素属性
 *
 * 注意：这些函数接收一个 document 参数用于测试
 */

// ============================================
// 练习 1：基本查询
// ============================================

/**
 * 通过 ID 查询元素
 * @param {Document} doc
 * @param {string} id
 */
export function getElementById(doc, id) {
  // TODO: 实现
}

/**
 * 通过类名查询所有元素
 * @param {Document} doc
 * @param {string} className
 * @returns {Element[]}
 */
export function getElementsByClass(doc, className) {
  // TODO: 返回元素数组
}

/**
 * 通过 CSS 选择器查询第一个元素
 * @param {Document} doc
 * @param {string} selector
 */
export function querySelector(doc, selector) {
  // TODO: 实现
}

/**
 * 通过 CSS 选择器查询所有元素
 * @param {Document} doc
 * @param {string} selector
 * @returns {Element[]}
 */
export function querySelectorAll(doc, selector) {
  // TODO: 返回元素数组
}

// ============================================
// 练习 2：复杂选择器
// ============================================

/**
 * 查询带有指定 data 属性的元素
 * @param {Document} doc
 * @param {string} dataAttr - 如 'id' 对应 data-id
 * @param {string} value
 */
export function findByDataAttr(doc, dataAttr, value) {
  // TODO: 实现
}

/**
 * 查询表单中所有必填输入框
 * @param {Document} doc
 * @param {string} formSelector
 * @returns {Element[]}
 */
export function findRequiredInputs(doc, formSelector) {
  // TODO: 查询 input[required], select[required], textarea[required]
}

/**
 * 查询所有可见的元素（没有 hidden 类）
 * @param {Document} doc
 * @param {string} selector
 * @returns {Element[]}
 */
export function findVisible(doc, selector) {
  // TODO: 实现
}

// ============================================
// 练习 3：DOM 遍历
// ============================================

/**
 * 获取元素的所有父元素
 * @param {Element} element
 * @returns {Element[]}
 */
export function getParents(element) {
  // TODO: 从直接父元素到 body
}

/**
 * 获取元素的所有兄弟元素
 * @param {Element} element
 * @returns {Element[]}
 */
export function getSiblings(element) {
  // TODO: 不包含自己
}

/**
 * 查找最近的匹配祖先
 * @param {Element} element
 * @param {string} selector
 */
export function findClosest(element, selector) {
  // TODO: 使用 closest
}

// ============================================
// 练习 4：元素属性
// ============================================

/**
 * 获取元素的所有 data 属性
 * @param {Element} element
 * @returns {Object}
 */
export function getDataAttributes(element) {
  // TODO: 返回 { key: value } 对象
}

/**
 * 获取元素的类列表
 * @param {Element} element
 * @returns {string[]}
 */
export function getClassList(element) {
  // TODO: 返回类名数组
}

/**
 * 检查元素是否匹配选择器
 * @param {Element} element
 * @param {string} selector
 */
export function matchesSelector(element, selector) {
  // TODO: 使用 matches
}

// ============================================
// 练习 5：表单元素
// ============================================

/**
 * 获取表单所有字段值
 * @param {HTMLFormElement} form
 * @returns {Object}
 */
export function getFormValues(form) {
  // TODO: 返回 { fieldName: value } 对象
}

/**
 * 查找表单中值为空的字段
 * @param {HTMLFormElement} form
 * @returns {Element[]}
 */
export function findEmptyFields(form) {
  // TODO: 返回空字段元素数组
}
