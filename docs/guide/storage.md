# Storage Utilities

js-cool provides browser storage utilities with expiration support.

## LocalStorage

### setCache

Set item in localStorage with expiration.

```js
import { setCache } from 'js-cool'

// Set with expiration (in seconds)
setCache('user', { name: 'John' }, 3600) // Expires in 1 hour
```

### getCache

Get item from localStorage.

```js
import { getCache } from 'js-cool'

getCache('user') // { name: 'John' }
// Returns null if expired or not found
```

### delCache

Delete item from localStorage.

```js
import { delCache } from 'js-cool'

delCache('user')
```

## SessionStorage

### setSession

Set item in sessionStorage with expiration.

```js
import { setSession } from 'js-cool'

setSession('token', 'abc123', 1800) // Expires in 30 minutes
```

### getSession

Get item from sessionStorage.

```js
import { getSession } from 'js-cool'

getSession('token') // 'abc123'
```

### delSession

Delete item from sessionStorage.

```js
import { delSession } from 'js-cool'

delSession('token')
```

## Cookie

### setCookie

Set a cookie.

```js
import { setCookie } from 'js-cool'

// Basic usage (expires in 1 day)
setCookie('token', 'xxxxxx')

// Custom expiration (in seconds)
setCookie('session', 'abc123', 20)

// With path
setCookie('token', 'xxxxxx', 86400, '/app')

// Disable SameSite (for cross-site requests)
setCookie('data', 'value', 86400, '/', false)
```

### getCookie

Get a cookie value.

```js
import { getCookie } from 'js-cool'

getCookie('token') // 'xxxxxx'
```

### getCookies

Get all cookies as an object.

```js
import { getCookies } from 'js-cool'

getCookies()
// { token: 'xxxxxx', session: 'abc123' }
```

### delCookie

Delete a cookie.

```js
import { delCookie } from 'js-cool'

delCookie('token')
```

## Best Practices

### When to Use What?

| Storage | Capacity | Expiration | Use Case |
|---------|----------|------------|----------|
| localStorage | ~5MB | Manual | User preferences, cached data |
| sessionStorage | ~5MB | Tab close | Temporary session data |
| Cookie | ~4KB | Custom | Authentication, tracking |

### Example: User Session

```js
import { setCache, getCache, delCache, setCookie, getCookie } from 'js-cool'

// Store user data in localStorage
setCache('userData', userObject, 86400)

// Store auth token in cookie
setCookie('authToken', token, 86400)

// Check if logged in
function isLoggedIn() {
  return !!getCookie('authToken') && !!getCache('userData')
}

// Logout
function logout() {
  delCache('userData')
  delCookie('authToken')
}
```

## See Also

- [Storage API Reference](/api/)
