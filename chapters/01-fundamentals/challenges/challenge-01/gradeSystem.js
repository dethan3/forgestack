/**
 * 综合挑战 01：成绩管理系统
 *
 * 运用本章所学，实现以下功能
 */

// ============================================
// 1. 添加学生
// ============================================

/**
 * 添加学生到学生列表
 * @param {Array} students - 学生列表
 * @param {string} name - 学生姓名
 * @param {number[]} scores - 分数数组
 * @returns {Array} 更新后的学生列表
 */
export function addStudent(students, name, scores) {
  // TODO: 创建学生对象 { name, scores }
  // TODO: 添加到 students 数组
  // TODO: 返回更新后的数组
}

// ============================================
// 2. 计算平均分
// ============================================

/**
 * 计算学生的平均分
 * @param {Object} student - 学生对象
 * @returns {number} 平均分（保留两位小数）
 */
export function getAverage(student) {
  // TODO: 计算 student.scores 的平均值
  // TODO: 使用 toFixed(2) 保留两位小数，然后转回数字
}

// ============================================
// 3. 获取等级
// ============================================

/**
 * 根据平均分返回等级
 * @param {number} average - 平均分
 * @returns {string} 等级 A/B/C/D/F
 */
export function getGrade(average) {
  // TODO: 90+: 'A', 80+: 'B', 70+: 'C', 60+: 'D', <60: 'F'
}

// ============================================
// 4. 获取最高分学生
// ============================================

/**
 * 返回平均分最高的学生
 * @param {Array} students - 学生列表
 * @returns {Object|null} 最高分学生，列表为空返回 null
 */
export function getTopStudent(students) {
  // TODO: 遍历学生，找出平均分最高的
  // TODO: 列表为空返回 null
}

// ============================================
// 5. 统计信息
// ============================================

/**
 * 返回班级统计信息
 * @param {Array} students - 学生列表
 * @returns {Object} { total, average, highest, lowest }
 */
export function getStatistics(students) {
  // TODO: 计算并返回统计信息
  // - total: 学生总数
  // - average: 全班平均分（保留两位小数）
  // - highest: 最高平均分
  // - lowest: 最低平均分
  // 如果列表为空，average/highest/lowest 都为 0
}
