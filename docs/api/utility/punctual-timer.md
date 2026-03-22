# punctualTimer <Badge type="info" text="since v5.18.0" />

Punctual setInterval - a timer that compensates for drift to maintain accurate timing.

## Usage

```js
import { punctualTimer } from 'js-cool'
```

## Signature

```typescript
interface PunctualTimerReturns {
  clear: () => void
  count: number
  timer: number | null
}

function punctualTimer<TArgs extends any[]>(
  handler: (...args: TArgs) => void,
  delay: number,
  ...args: TArgs
): PunctualTimerReturns
```

## Parameters

| Parameter | Type       | Description                                                                                    |
| --------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `handler` | `function` | A function to be executed after the timer expires                                              |
| `delay`   | `number`   | The time, in milliseconds that the timer should wait before the specified function is executed |
| `...args` | `any[]`    | Additional arguments which are passed through to the function specified by handler             |

## Returns

`PunctualTimerReturns` - Object with timer control properties.

| Property | Type       | Description                                   |
| -------- | ---------- | --------------------------------------------- |
| `clear`  | `function` | Clear the timer                               |
| `count`  | `number`   | Number of times the handler has been executed |
| `timer`  | `number`   | The timer ID (can be used with clearTimeout)  |

## Examples

```js
const printDate = () => console.log(new Date())
const timer = punctualTimer(printDate, 1000)
console.log(timer.count) // 10

// Clear the timer
timer.clear()

// Or use clearTimeout
clearTimeout(timer.timer)
```

## Related

- [delay](/api/utility/delay) - Delay execution for a specified time
- [waiting](/api/utility/waiting) - Promise-based waiting
