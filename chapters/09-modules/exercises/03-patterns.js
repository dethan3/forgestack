/**
 * 练习 03：模块模式
 *
 * 学习目标：
 * - 单例模式
 * - 工厂模式
 * - 桶文件模式
 * - 模块初始化
 */

// ============================================
// 练习 1：单例模式
// ============================================

/**
 * 创建一个配置管理单例
 * 导出已实例化的对象
 */
class ConfigManager {
  constructor() {
    // TODO: 初始化
    // this.config = {}
  }

  set(key, value) {
    // TODO: 实现
  }

  get(key) {
    // TODO: 实现
  }

  getAll() {
    // TODO: 实现
  }
}

// TODO: export const configManager = new ConfigManager();

// ============================================
// 练习 2：工厂模式
// ============================================

/**
 * 创建日志记录器工厂
 * @param {string} prefix - 日志前缀
 */
export function createLogger(prefix) {
  // TODO: 返回包含 log, warn, error 方法的对象
  // 每个方法输出格式: [prefix] message
}

/**
 * 创建存储适配器工厂
 * @param {string} namespace - 存储命名空间
 */
export function createStorage(namespace) {
  // TODO: 返回包含 get, set, remove, clear 方法的对象
  // 键名格式: namespace:key
}

// ============================================
// 练习 3：策略模式
// ============================================

/**
 * 验证策略集合
 */
export const validators = {
  // TODO: 实现以下验证器
  // required: (value) => boolean
  // email: (value) => boolean
  // minLength: (min) => (value) => boolean
  // maxLength: (max) => (value) => boolean
  // pattern: (regex) => (value) => boolean
};

/**
 * 使用验证策略验证值
 * @param {*} value
 * @param {Array<string | { type: string, param: any }>} rules
 */
export function validate(value, rules) {
  // TODO: 实现
  // 返回 { valid: boolean, errors: string[] }
}

// ============================================
// 练习 4：插件系统
// ============================================

/**
 * 创建插件系统
 */
export function createPluginSystem() {
  // TODO: 返回对象包含:
  // - register(name, plugin): 注册插件
  // - use(name): 获取插件
  // - list(): 列出所有插件名称
  // - execute(name, ...args): 执行插件的 execute 方法
}

// ============================================
// 练习 5：模块初始化
// ============================================

/**
 * 创建可初始化的服务
 */
export function createService() {
  // TODO: 返回对象包含:
  // - initialized: boolean
  // - init(config): Promise<void> - 初始化服务
  // - getData(): 获取数据（必须先初始化）
  // - destroy(): 销毁服务
}

/**
 * 创建懒加载模块
 * @param {Function} loader - 返回 Promise 的加载函数
 */
export function createLazyModule(loader) {
  // TODO: 返回对象包含:
  // - loaded: boolean
  // - load(): Promise - 加载模块
  // - get(): 获取模块（必须先加载）
}
