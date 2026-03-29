# Semver 功能增强方案

## 现有问题

### 1. `compareVersion` 问题

#### 问题 A：未知标签优先级逻辑不稳定

```typescript
// 当前：未知标签按数值比较
compareVersion('1.11.0-release.10', '1.11.0-tag.1') // => 1
```

两个不同的未知标签比较时不稳定，因为它们的优先级相同（都是 1），但按后面的数值比较。这可能导致 `release.10 > tag.1`，不符合语义化版本规范。

**建议**：未知标签之间应该按字母序比较，或者考虑只支持 semver 规范的预发布标签。

#### 问题 B：不支持 build metadata

semver 支持 `1.0.0+build.123` 格式，当前实现未处理。

---

### 2. `nextVersion` 问题

#### 问题 A：`stringifyVersion` 可能生成无效版本

```typescript
// 当 release=undefined 但 preid 有值时
stringifyVersion({ major: 1, minor: 0, patch: 0, preid: 'alpha', release: undefined })
// => '1.0.0-alpha.'  (末尾有点)
```

#### 问题 B：`parseVersion` 对边界情况处理不当

```typescript
parseVersion('1.2.3-alpha') // => preid='', release=NaN
parseVersion('1.2.3-.1') // => 可能产生意外结果
```

`+subVer` 当 `subVer` 为空字符串时会得到 `0`，而不是 `undefined`。

#### 问题 C：缺少输入验证

没有校验版本格式是否合法，如 `x.y.z` 其中 x, y, z 应该是非负整数。

---

## 功能增强建议

### 1. 缺少常用 semver 方法

| 方法                              | 描述                             | 示例                                          |
| --------------------------------- | -------------------------------- | --------------------------------------------- |
| `isValidVersion()`                | 验证版本格式是否合法             | `isValidVersion('1.2.3') // true`             |
| `parseVersion()`                  | 解析版本为对象（导出供外部使用） | `parseVersion('1.2.3-beta.1')`                |
| `satisfies()`                     | 检查版本是否满足范围             | `satisfies('1.2.3', '^1.0.0')`                |
| `diff()`                          | 获取版本差异类型                 | `diff('1.0.0', '2.0.0') // 'major'`           |
| `major()` / `minor()` / `patch()` | 快速提取版本号                   | `major('1.2.3') // 1`                         |
| `prerelease()`                    | 获取预发布信息                   | `prerelease('1.0.0-alpha.1') // ['alpha', 1]` |
| `coerce()`                        | 从字符串提取版本                 | `coerce('v1.2.3') // '1.2.3'`                 |
| `clean()`                         | 清理版本字符串                   | `clean('=v1.2.3') // '1.2.3'`                 |

---

### 2. 支持版本范围

```typescript
// 当前只支持精确比较，建议增加范围支持
satisfies('1.2.3', '^1.0.0') // true
satisfies('2.0.0', '>=1.0.0 <2.0.0') // false
satisfies('1.5.0', '1.x') // true
satisfies('1.2.3', '~1.2.0') // true
```

---

### 3. 排序工具

```typescript
// 版本排序
sortVersions(['1.2.3', '1.0.0', '2.0.0-beta.1', '1.0.0-alpha.1'])
// => ['1.0.0-alpha.1', '1.0.0', '1.2.3', '2.0.0-beta.1']

// 获取最大/最小版本
maxVersion(['1.0.0', '2.0.0', '1.5.0']) // '2.0.0'
minVersion(['1.0.0', '2.0.0', '1.5.0']) // '1.0.0'
```

---

### 4. 版本范围比较

```typescript
// 检查版本是否在范围内
isInRange('1.2.3', '1.0.0', '2.0.0') // true

// 获取下一个满足条件的版本
nextSatisfying('1.2.3', '^1.0.0', 'minor') // '1.3.0'
```

---

### 5. 构建元数据支持

```typescript
// semver 支持 build metadata
parseVersion('1.0.0+build.123')
// => { major: 1, minor: 0, patch: 0, preid: '', release: undefined, build: 'build.123' }
```

---

### 6. 比较运算符

```typescript
// 更直观的比较 API
gt('1.2.3', '1.2.2') // true (greater than)
gte('1.2.3', '1.2.3') // true (greater than or equal)
lt('1.2.3', '1.2.4') // true (less than)
lte('1.2.3', '1.2.3') // true (less than or equal)
eq('1.2.3', '1.2.3') // true (equal)
neq('1.2.3', '1.2.4') // true (not equal)
```

---

## 建议的 API 设计

```typescript
// 导出一个统一的 semver 模块
export {
  // 核心方法
  compareVersion,
  nextVersion,

  // 解析
  parseVersion,
  stringifyVersion,
  isValidVersion,
  clean,
  coerce,

  // 提取
  major,
  minor,
  patch,
  prerelease,

  // 比较
  gt,
  gte,
  lt,
  lte,
  eq,
  neq,

  // 范围
  satisfies,

  // 排序
  sortVersions,
  maxVersion,
  minVersion,

  // 差异
  diff,

  // 类型
  type Version,
  type VersionRange,
}
```

---

## 实现优先级

### 高优先级（修复现有问题）

1. 修复 `stringifyVersion` 边界情况
2. 修复 `parseVersion` 对无效输入的处理
3. 添加 `isValidVersion` 验证函数
4. 导出 `parseVersion` 和 `stringifyVersion`

### 中优先级（常用功能）

1. 添加 `major/minor/patch/prerelease` 提取函数
2. 添加 `gt/gte/lt/lte/eq/neq` 比较函数
3. 添加 `sortVersions/maxVersion/minVersion` 排序函数
4. 添加 `diff` 差异检测函数

### 低优先级（高级功能）

1. 添加 `satisfies` 范围匹配
2. 添加 `clean/coerce` 清理函数
3. 支持 build metadata
