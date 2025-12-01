/**
 * 综合挑战 01：数据处理器
 *
 * 实现一个数据处理工具库
 */

// ============================================
// 1. CSV 解析
// ============================================

/**
 * 解析 CSV 字符串为对象数组
 * @param {string} csvString - CSV 格式字符串
 * @returns {Array} 对象数组
 */
export function parseCSV(csvString) {
  // TODO: 解析 CSV
  // 提示：第一行是表头，后续行是数据
}

// ============================================
// 2. 字段筛选
// ============================================

/**
 * 筛选数组中指定字段等于指定值的项
 * @param {Array} data - 数据数组
 * @param {string} field - 字段名
 * @param {*} value - 筛选值
 * @returns {Array} 筛选结果
 */
export function filterByField(data, field, value) {
  // TODO: 使用 filter
}

// ============================================
// 3. 字段排序
// ============================================

/**
 * 按指定字段排序
 * @param {Array} data - 数据数组
 * @param {string} field - 排序字段
 * @param {string} order - 'asc' 或 'desc'
 * @returns {Array} 排序后的新数组
 */
export function sortByField(data, field, order = 'asc') {
  // TODO: 使用 sort（不要修改原数组）
  // 提示：需要判断是数字还是字符串
}

// ============================================
// 4. 字段分组
// ============================================

/**
 * 按指定字段分组
 * @param {Array} data - 数据数组
 * @param {string} field - 分组字段
 * @returns {Object} 分组结果
 */
export function groupByField(data, field) {
  // TODO: 使用 reduce 实现分组
}

// ============================================
// 5. 数字统计
// ============================================

/**
 * 统计数字字段
 * @param {Array} data - 数据数组
 * @param {string} field - 统计字段
 * @returns {Object} { count, sum, avg, min, max }
 */
export function summarize(data, field) {
  // TODO: 计算各项统计值
  // 如果数据为空，返回 { count: 0, sum: 0, avg: 0, min: 0, max: 0 }
}
