/**
 * 练习 02：解构赋值
 *
 * 学习目标：
 * - 熟练使用对象和数组解构
 * - 掌握嵌套解构和默认值
 */

// ============================================
// 练习 1：基本对象解构
// ============================================

/**
 * 从用户对象中提取 name 和 age
 * 返回格式化字符串: "Name: xxx, Age: xxx"
 */
export function formatUser(user) {
  // TODO: 使用解构提取 name 和 age
}

/**
 * 从对象中提取 x 和 y，并重命名为 left 和 top
 * getPosition({ x: 10, y: 20 }) => { left: 10, top: 20 }
 */
export function getPosition(coords) {
  // TODO: 解构并重命名
}

// ============================================
// 练习 2：默认值
// ============================================

/**
 * 创建配置对象，为缺失的选项提供默认值
 * 默认值: { theme: 'light', lang: 'en', fontSize: 14 }
 */
export function createConfig(options = {}) {
  // TODO: 使用解构和默认值
}

// ============================================
// 练习 3：嵌套解构
// ============================================

/**
 * 从订单中提取客户城市
 * 如果城市不存在，返回 'Unknown'
 */
export function getCustomerCity(order) {
  // TODO: 嵌套解构 order.customer.address.city
}

/**
 * 提取第一个用户的名字和剩余用户数量
 * getFirstAndCount([{name:'A'}, {name:'B'}, {name:'C'}])
 * => { firstName: 'A', restCount: 2 }
 */
export function getFirstAndCount(users) {
  // TODO: 数组解构 + 剩余元素
}

// ============================================
// 练习 4：函数参数解构
// ============================================

/**
 * 计算矩形面积
 * 接收 { width, height } 对象
 */
export function calculateArea({ width, height }) {
  // TODO: 计算并返回面积
}

/**
 * 格式化地址
 * 接收 { street, city, country = 'China', zip } 对象
 * 返回格式: "street, city, country zip"
 */
export function formatAddress({ street, city, country = 'China', zip }) {
  // TODO: 使用解构参数和默认值
}

// ============================================
// 练习 5：数组解构
// ============================================

/**
 * 交换数组的第一个和最后一个元素
 * swapFirstLast([1, 2, 3, 4]) => [4, 2, 3, 1]
 */
export function swapFirstLast(arr) {
  // TODO: 使用解构交换
}

/**
 * 将 RGB 数组转换为对象
 * rgbToObject([255, 128, 0]) => { r: 255, g: 128, b: 0 }
 */
export function rgbToObject(rgb) {
  // TODO: 数组解构
}

// ============================================
// 练习 6：剩余属性
// ============================================

/**
 * 分离对象的第一个属性和其余属性
 * separateFirst({ a: 1, b: 2, c: 3 }) => { first: ['a', 1], rest: { b: 2, c: 3 } }
 */
export function separateFirst(obj) {
  // TODO: 使用 Object.entries 和解构
}

/**
 * 从用户对象中移除敏感信息
 * 移除 password 和 token 字段
 */
export function removeSensitive(user) {
  // TODO: 使用解构和剩余属性
}

// ============================================
// 练习 7：混合解构
// ============================================

/**
 * 处理 API 响应
 * 提取 data.items 的第一个和最后一个，以及 meta.total
 */
export function processResponse(response) {
  // TODO: 混合对象和数组解构
  // 返回 { first, last, total }
}

/**
 * 合并用户设置
 * 从 defaults 和 userSettings 中解构并合并
 */
export function mergeSettings(defaults, userSettings) {
  // TODO: 解构两个对象并返回合并结果
  // userSettings 覆盖 defaults
}
