# Examples

Real-world examples of using js-cool.

## Form Data Handling

```js
import { cleanData, extend, clone } from 'js-cool'

// Extract form fields
const formData = {
  username: 'john',
  password: '123456',
  confirmPassword: '123456',
  email: 'john@example.com',
  remember: true,
}

// Only send necessary fields to API
const apiData = cleanData(formData, ['username', 'password', 'email'])

// Merge with defaults
const finalData = extend(
  {
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  apiData
)
```

## URL Parameter Parsing

```js
import { getUrlParams, parseUrlParam, spliceUrlParam } from 'js-cool'

// Get all params
const params = getUrlParams('https://example.com/search?q=js&page=1')
// { q: 'js', page: '1' }

// Parse with type conversion
const typedParams = parseUrlParam('?active=true&count=10&price=99.99', true)
// { active: true, count: 10, price: 99.99 }

// Build URL with params
const url = spliceUrlParam('https://api.example.com/users', { page: 1, limit: 20 })
// 'https://api.example.com/users?page=1&limit=20'
```

## Array Operations

```js
import { unique, shuffle, intersect, union } from 'js-cool'

// Remove duplicates
const ids = [1, 2, 2, 3, 3, 4, 5, 5]
const uniqueIds = unique(ids) // [1, 2, 3, 4, 5]

// Shuffle for random display
const items = ['a', 'b', 'c', 'd', 'e']
const randomItems = shuffle(items) // Random order

// Find common elements
const arr1 = [1, 2, 3, 4]
const arr2 = [3, 4, 5, 6]
const common = intersect(arr1, arr2) // [3, 4]

// Combine without duplicates
const combined = union(arr1, arr2) // [1, 2, 3, 4, 5, 6]
```

## Storage with Expiration

```js
import { setCache, getCache, setSession, getSession } from 'js-cool'

// Cache API response for 5 minutes
async function fetchUser(id) {
  const cached = getCache(`user_${id}`)
  if (cached) return cached

  const response = await fetch(`/api/users/${id}`)
  const user = await response.json()

  setCache(`user_${id}`, user, 300) // 5 minutes
  return user
}

// Session storage for temporary data
function setFormStep(step) {
  setSession('form_step', step, 1800) // 30 minutes
}

function getFormStep() {
  return getSession('form_step') || 1
}
```

## String Utilities

```js
import { camel2Dash, dash2Camel, encodeBase64, decodeBase64 } from 'js-cool'

// CSS property conversion
const cssProps = {
  fontSize: '16px',
  backgroundColor: '#fff',
  marginTop: '20px',
}

const kebabProps = Object.fromEntries(
  Object.entries(cssProps).map(([key, value]) => [camel2Dash(key), value])
)
// { 'font-size': '16px', 'background-color': '#fff', 'margin-top': '20px' }

// Base64 encoding for data transfer
const data = { name: 'John', role: 'admin' }
const encoded = encodeBase64(JSON.stringify(data))
// Transfer or store encoded string
const decoded = JSON.parse(decodeBase64(encoded))
```

## Event Handling

```js
import { addEvent, removeEvent, stopDefault, stopBubble } from 'js-cool'

// Add event with cleanup
const handlers = new Map()

function setupEvents(element) {
  const clickHandler = e => {
    stopBubble(e)
    console.log('Element clicked')
  }

  const submitHandler = e => {
    stopDefault(e)
    // Handle form submission
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

## Scroll Utilities

```js
import {
  getPosition,
  getProgress,
  createDirectionTracker,
  isInViewport,
  scrollTo,
  lockScroll,
  unlockScroll,
} from 'js-cool'

// Infinite scroll
const container = document.getElementById('list')
window.addEventListener('scroll', async () => {
  const pos = getPosition()
  if (pos === 'bottom') {
    await loadMoreItems()
  }
})

// Scroll progress indicator
window.addEventListener('scroll', () => {
  const progress = getProgress()
  progressBar.style.width = `${progress}%`
})

// Hide/show header on scroll
const tracker = createDirectionTracker()
window.addEventListener('scroll', () => {
  const dir = tracker()
  if (dir === 'down') {
    header.classList.add('hidden')
  } else if (dir === 'up') {
    header.classList.remove('hidden')
  }
})

// Lazy load images
const images = document.querySelectorAll('img[data-src]')
function checkImages() {
  images.forEach(img => {
    if (isInViewport(img, { fully: false })) {
      img.src = img.dataset.src
    }
  })
}
window.addEventListener('scroll', checkImages)

// Scroll to section
document.querySelector('.nav-link').addEventListener('click', () => {
  scrollTo('#section-2', { offset: -80 })
})

// Lock scroll when modal opens
function openModal() {
  lockScroll()
  modal.classList.add('visible')
}

function closeModal() {
  unlockScroll()
  modal.classList.remove('visible')
}
```

## Object Manipulation

```js
import { clone, extend, isEqual, getProperty, setProperty } from 'js-cool'

// Immutable state update
function updateState(state, path, value) {
  const newState = clone(state)
  setProperty(newState, path, value)
  return newState
}

// Safe nested property access
const config = {
  api: {
    endpoints: {
      users: '/api/users',
    },
  },
}

const usersEndpoint = getProperty(config, 'api.endpoints.users', '/default')
const missingEndpoint = getProperty(config, 'api.endpoints.posts', '/default')

// Deep comparison for change detection
const prevState = { user: { name: 'John', settings: { theme: 'dark' } } }
const newState = { user: { name: 'John', settings: { theme: 'light' } } }

if (!isEqual(prevState, newState)) {
  console.log('State changed!')
}
```
