# DOM Utilities

js-cool provides DOM manipulation utilities.

## Events

### addEvent

Add event listener (cross-browser compatible).

```js
import { addEvent } from 'js-cool'

const btn = document.getElementById('btn')
addEvent(btn, 'click', (e) => {
  console.log('Button clicked!')
})
```

### removeEvent

Remove event listener.

```js
import { removeEvent } from 'js-cool'

const btn = document.getElementById('btn')
const handler = (e) => console.log('clicked')
addEvent(btn, 'click', handler)
// Later...
removeEvent(btn, 'click', handler)
```

## Event Control

### stopDefault

Prevent default event behavior.

```js
import { stopDefault } from 'js-cool'

document.querySelector('form').addEventListener('submit', (e) => {
  stopDefault(e)
  console.log('Form submission prevented')
})
```

### stopBubble

Stop event bubbling.

```js
import { stopBubble } from 'js-cool'

document.getElementById('child').addEventListener('click', (e) => {
  stopBubble(e)
  console.log('Event won\'t bubble to parent')
})
```

## Clipboard

### copy

Copy text to clipboard.

```js
import { copy } from 'js-cool'

// Copy text
copy('Hello World') // true if successful

// Copy in button click
document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('content').textContent
  if (copy(text)) {
    alert('Copied!')
  }
})
```

## Scrolling

### getScrollPosition

Get current scroll position.

```js
import { getScrollPosition } from 'js-cool'

getScrollPosition()
// { x: 0, y: 100 }
```

## Window

### windowSize

Get window dimensions.

```js
import { windowSize } from 'js-cool'

windowSize()
// { width: 1920, height: 1080 }
```

## Dark Mode

### isDarkMode

Check if dark mode is enabled.

```js
import { isDarkMode } from 'js-cool'

isDarkMode() // true or false
```

## Browser Detection

### inBrowser

Check if running in browser environment.

```js
import { inBrowser } from 'js-cool'

inBrowser // true or false
```

### inNodeJs

Check if running in Node.js environment.

```js
import { inNodeJs } from 'js-cool'

inNodeJs // true or false
```

## Element Info

### isWindow

Check if value is a window object.

```js
import { isWindow } from 'js-cool'

isWindow(window) // true
isWindow(document) // false
```

## Loading

### preloader

Preload resources (images, scripts, etc.).

```js
import { preloader } from 'js-cool'

preloader([
  'image1.jpg',
  'image2.jpg',
  'script.js'
])
```

## See Also

- [DOM API Reference](/api/)
