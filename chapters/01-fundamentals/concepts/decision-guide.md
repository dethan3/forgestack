# 决策指南

## 变量声明选择

```
需要声明变量？
    │
    ▼
值会变化吗？
    │
    ├─ 是 → 使用 let
    │
    └─ 否 → 使用 const（推荐默认使用）
```

## 循环方式选择

```
需要遍历？
    │
    ▼
遍历什么？
    │
    ├─ 数组的值 → for...of
    │
    ├─ 对象的键 → for...in 或 Object.keys()
    │
    ├─ 需要索引 → for 循环 或 entries()
    │
    └─ 需要 break → for 或 for...of（不能用 forEach）
```

## 条件语句选择

```
需要条件判断？
    │
    ▼
几个分支？
    │
    ├─ 2 个简单分支 → 三元运算符
    │
    ├─ 2-3 个分支 → if...else
    │
    ├─ 多个固定值匹配 → switch 或对象映射
    │
    └─ 复杂条件 → if...else if...else
```

## 相等比较选择

```
需要比较相等？
    │
    ▼
始终使用 ===（严格相等）

例外：检查 null/undefined
    value == null  // 同时匹配 null 和 undefined
```

## 默认值选择

```
需要默认值？
    │
    ▼
0 和 '' 是有效值吗？
    │
    ├─ 是 → 使用 ??（空值合并）
    │
    └─ 否 → 使用 ||（逻辑或）
```

## 类型检测选择

| 检测目标 | 推荐方法 |
|---------|---------|
| 基本类型 | `typeof value` |
| 数组 | `Array.isArray(value)` |
| null | `value === null` |
| NaN | `Number.isNaN(value)` |
| 对象（非 null） | `typeof value === 'object' && value !== null` |

## 快速参考表

| 场景 | 推荐写法 |
|------|---------|
| 声明不变的值 | `const x = 1` |
| 声明会变的值 | `let x = 1` |
| 遍历数组 | `for (const item of arr)` |
| 遍历对象 | `for (const key in obj)` |
| 简单条件赋值 | `const x = condition ? a : b` |
| 默认值（允许 0/''） | `value ?? defaultValue` |
| 默认值（排除假值） | `value \|\| defaultValue` |
| 安全访问属性 | `obj?.prop?.nested` |
