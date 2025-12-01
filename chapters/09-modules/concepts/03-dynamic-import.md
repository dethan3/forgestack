# 动态导入

## 基本语法

```javascript
// import() 返回 Promise
const module = await import('./module.js');
```

## 为什么需要动态导入

- **按需加载**：只在需要时加载代码
- **条件加载**：根据条件加载不同模块
- **性能优化**：减少初始加载时间
- **代码分割**：将代码拆分成小块

## 基本用法

### async/await 方式

```javascript
async function loadModule() {
  const { default: User, createUser } = await import('./user.js');
  const user = new User();
}
```

### Promise 方式

```javascript
import('./user.js')
  .then(module => {
    const User = module.default;
    const user = new User();
  })
  .catch(error => {
    console.error('Failed to load module:', error);
  });
```

## 条件导入

```javascript
async function loadLocale(lang) {
  const translations = await import(`./locales/${lang}.js`);
  return translations.default;
}

// 根据环境加载
const config = await import(
  process.env.NODE_ENV === 'production'
    ? './config.prod.js'
    : './config.dev.js'
);
```

## 懒加载组件

```javascript
// React 示例
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 路由级代码分割

```javascript
const routes = {
  '/home': () => import('./pages/Home.js'),
  '/about': () => import('./pages/About.js'),
  '/contact': () => import('./pages/Contact.js')
};

async function navigate(path) {
  const pageModule = await routes[path]();
  const Page = pageModule.default;
  render(new Page());
}
```

## 按需加载功能

```javascript
// 只在需要时加载大型库
async function processImage(image) {
  const sharp = await import('sharp');
  return sharp.default(image).resize(300, 300);
}

// 按需加载图表库
async function renderChart(data) {
  const Chart = (await import('chart.js')).default;
  new Chart(canvas, { type: 'bar', data });
}
```

## 错误处理

```javascript
async function safeImport(modulePath, fallback = null) {
  try {
    return await import(modulePath);
  } catch (error) {
    console.error(`Failed to import ${modulePath}:`, error);
    return fallback;
  }
}

// 使用
const utils = await safeImport('./utils.js', { default: {} });
```

## 预加载模块

```javascript
// 提前加载，稍后使用
function preloadModule(path) {
  return import(path);
}

// 预加载关键模块
const userModulePromise = preloadModule('./user.js');

// 稍后使用
async function handleLogin() {
  const { default: User } = await userModulePromise;
  // ...
}
```

## import.meta

获取模块的元信息：

```javascript
// 获取当前模块的 URL
console.log(import.meta.url);
// file:///path/to/module.js 或 https://example.com/module.js

// 获取相对路径的绝对 URL
const imageUrl = new URL('./image.png', import.meta.url);
```

### 常见用途

```javascript
// 判断是否为主模块
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// 加载相邻文件
const configPath = new URL('./config.json', import.meta.url);
const config = await fetch(configPath).then(r => r.json());
```

## 批量动态导入

```javascript
// 导入多个模块
async function loadPlugins(pluginNames) {
  const plugins = await Promise.all(
    pluginNames.map(name => import(`./plugins/${name}.js`))
  );
  return plugins.map(m => m.default);
}

// 使用
const [auth, analytics, logger] = await loadPlugins([
  'auth',
  'analytics', 
  'logger'
]);
```

## 构建工具集成

### Webpack 魔术注释

```javascript
// 命名 chunk
import(/* webpackChunkName: "lodash" */ 'lodash');

// 预获取（空闲时加载）
import(/* webpackPrefetch: true */ './LoginModal');

// 预加载（与主 chunk 并行加载）
import(/* webpackPreload: true */ './CriticalComponent');
```

### Vite 动态导入

```javascript
// glob 导入
const modules = import.meta.glob('./modules/*.js');
// { './modules/a.js': () => import('./modules/a.js'), ... }

// 急切加载
const modules = import.meta.glob('./modules/*.js', { eager: true });
```

---

继续学习 [04-module-patterns.md](./04-module-patterns.md) →
