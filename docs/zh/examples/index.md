# 示例

js-cool 在实际场景中的应用示例。

## 表单数据处理

```js
import { cleanData, extend, clone } from 'js-cool'

// 提取表单字段
const formData = {
  username: 'john',
  password: '123456',
  confirmPassword: '123456',
  email: 'john@example.com',
  remember: true,
}

// 只发送必要字段到 API
const apiData = cleanData(formData, ['username', 'password', 'email'])

// 与默认值合并
const finalData = extend(
  {
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  apiData
)
```

## URL 参数解析

```js
import { getUrlParams, parseUrlParam, spliceUrlParam } from 'js-cool'

// 获取所有参数
const params = getUrlParams('https://example.com/search?q=js&page=1')
// { q: 'js', page: '1' }

// 解析并转换类型
const typedParams = parseUrlParam('?active=true&count=10&price=99.99', true)
// { active: true, count: 10, price: 99.99 }

// 构建带参数的 URL
const url = spliceUrlParam('https://api.example.com/users', { page: 1, limit: 20 })
// 'https://api.example.com/users?page=1&limit=20'
```

## 数组操作

```js
import { unique, shuffle, intersect, union } from 'js-cool'

// 去重
const ids = [1, 2, 2, 3, 3, 4, 5, 5]
const uniqueIds = unique(ids) // [1, 2, 3, 4, 5]

// 随机排序展示
const items = ['a', 'b', 'c', 'd', 'e']
const randomItems = shuffle(items) // 随机顺序

// 查找共同元素
const arr1 = [1, 2, 3, 4]
const arr2 = [3, 4, 5, 6]
const common = intersect(arr1, arr2) // [3, 4]

// 合并不重复
const combined = union(arr1, arr2) // [1, 2, 3, 4, 5, 6]
```

## 带过期时间的存储

```js
import { setCache, getCache, setSession, getSession } from 'js-cool'

// 缓存 API 响应 5 分钟
async function fetchUser(id) {
  const cached = getCache(`user_${id}`)
  if (cached) return cached

  const response = await fetch(`/api/users/${id}`)
  const user = await response.json()

  setCache(`user_${id}`, user, 300) // 5 分钟
  return user
}

// 临时数据存储在 session
function setFormStep(step) {
  setSession('form_step', step, 1800) // 30 分钟
}

function getFormStep() {
  return getSession('form_step') || 1
}
```

## 字符串工具

```js
import { camel2Dash, dash2Camel, encodeBase64, decodeBase64 } from 'js-cool'

// CSS 属性转换
const cssProps = {
  fontSize: '16px',
  backgroundColor: '#fff',
  marginTop: '20px',
}

const kebabProps = Object.fromEntries(
  Object.entries(cssProps).map(([key, value]) => [camel2Dash(key), value])
)
// { 'font-size': '16px', 'background-color': '#fff', 'margin-top': '20px' }

// Base64 编码用于数据传输
const data = { name: 'John', role: 'admin' }
const encoded = encodeBase64(JSON.stringify(data))
// 传输或存储编码字符串
const decoded = JSON.parse(decodeBase64(encoded))
```

## 事件处理

```js
import { addEvent, removeEvent, stopDefault, stopBubble } from 'js-cool'

// 添加事件并支持清理
const handlers = new Map()

function setupEvents(element) {
  const clickHandler = e => {
    stopBubble(e)
    console.log('元素被点击')
  }

  const submitHandler = e => {
    stopDefault(e)
    // 处理表单提交
  }

  addEvent(element, 'click', clickHandler)
  addEvent(element, 'submit', submitHandler)

  handlers.set(element, { clickHandler, submitHandler })
}

function cleanupEvents(element) {
  const { clickHandler, submitHandler } = handlers.get(element)
  removeEvent(element, 'click', clickHandler)
  removeEvent(element, 'submit', submitHandler)
  handlers.delete(element)
}
```

## 对象操作

```js
import { clone, extend, isEqual, getProperty, setProperty } from 'js-cool'

// 不可变状态更新
function updateState(state, path, value) {
  const newState = clone(state)
  setProperty(newState, path, value)
  return newState
}

// 安全访问嵌套属性
const config = {
  api: {
    endpoints: {
      users: '/api/users',
    },
  },
}

const usersEndpoint = getProperty(config, 'api.endpoints.users', '/default')
const missingEndpoint = getProperty(config, 'api.endpoints.posts', '/default')

// 深度比较检测变化
const prevState = { user: { name: 'John', settings: { theme: 'dark' } } }
const newState = { user: { name: 'John', settings: { theme: 'light' } } }

if (!isEqual(prevState, newState)) {
  console.log('状态已改变！')
}
```
