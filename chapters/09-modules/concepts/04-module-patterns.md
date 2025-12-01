# 模块模式

## 单例模式

```javascript
// database.js
class Database {
  constructor() {
    this.connection = null;
  }

  connect() {
    if (!this.connection) {
      this.connection = createConnection();
    }
    return this.connection;
  }
}

// 导出单例实例
export default new Database();

// 使用（所有导入者共享同一实例）
import db from './database.js';
db.connect();
```

## 工厂模式

```javascript
// logger.js
export function createLogger(prefix) {
  return {
    log: (msg) => console.log(`[${prefix}] ${msg}`),
    error: (msg) => console.error(`[${prefix}] ERROR: ${msg}`),
    warn: (msg) => console.warn(`[${prefix}] WARN: ${msg}`)
  };
}

// 使用
import { createLogger } from './logger.js';
const userLogger = createLogger('USER');
const apiLogger = createLogger('API');
```

## 外观模式

```javascript
// api/index.js - 统一 API 入口
import { fetchUser, updateUser, deleteUser } from './user.js';
import { fetchPosts, createPost } from './post.js';
import { login, logout, register } from './auth.js';

export const api = {
  user: { fetch: fetchUser, update: updateUser, delete: deleteUser },
  post: { fetch: fetchPosts, create: createPost },
  auth: { login, logout, register }
};

// 使用
import { api } from './api';
api.user.fetch(123);
api.auth.login(credentials);
```

## 适配器模式

```javascript
// storage-adapter.js
export function createStorageAdapter(storage) {
  return {
    get(key) {
      const value = storage.getItem(key);
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    },
    set(key, value) {
      storage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      storage.removeItem(key);
    }
  };
}

export const localStorage = createStorageAdapter(window.localStorage);
export const sessionStorage = createStorageAdapter(window.sessionStorage);
```

## 策略模式

```javascript
// validators/index.js
export const validators = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^\d{10,11}$/.test(value),
  required: (value) => value != null && value !== '',
  minLength: (min) => (value) => value.length >= min
};

// 使用
import { validators } from './validators';

function validate(value, rules) {
  return rules.every(rule => {
    const validator = validators[rule.type];
    return validator(rule.param)(value);
  });
}
```

## 插件模式

```javascript
// plugin-system.js
class PluginSystem {
  constructor() {
    this.plugins = new Map();
  }

  register(name, plugin) {
    if (typeof plugin.install === 'function') {
      plugin.install(this);
    }
    this.plugins.set(name, plugin);
  }

  get(name) {
    return this.plugins.get(name);
  }
}

export default new PluginSystem();

// auth-plugin.js
export default {
  install(system) {
    system.authenticate = (user) => { /* ... */ };
  }
};
```

## 桶文件模式

```javascript
// utils/index.js
export { debounce, throttle } from './timing.js';
export { deepClone, merge } from './object.js';
export { formatDate, parseDate } from './date.js';
export { default as EventEmitter } from './EventEmitter.js';

// 使用
import { debounce, deepClone, formatDate } from './utils';
```

## 循环依赖处理

### 问题

```javascript
// a.js
import { b } from './b.js';
export const a = 'A' + b;

// b.js
import { a } from './a.js';
export const b = 'B' + a;  // a 此时是 undefined
```

### 解决方案：延迟访问

```javascript
// a.js
import * as bModule from './b.js';
export const a = 'A';
export function getAB() {
  return a + bModule.b;
}

// b.js
import * as aModule from './a.js';
export const b = 'B';
export function getBA() {
  return b + aModule.a;
}
```

### 解决方案：重构

```javascript
// shared.js（提取共享部分）
export const shared = 'shared';

// a.js
import { shared } from './shared.js';
export const a = 'A' + shared;

// b.js
import { shared } from './shared.js';
export const b = 'B' + shared;
```

## 模块初始化

```javascript
// config.js
let config = null;

export async function initConfig() {
  if (config) return config;
  
  const response = await fetch('/api/config');
  config = await response.json();
  return config;
}

export function getConfig() {
  if (!config) {
    throw new Error('Config not initialized');
  }
  return config;
}

// main.js
import { initConfig, getConfig } from './config.js';

await initConfig();
console.log(getConfig());
```

---

继续学习 [05-module-tools.md](./05-module-tools.md) →
