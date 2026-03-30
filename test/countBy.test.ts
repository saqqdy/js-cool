import { describe, expect, it } from 'vitest'
import countBy from '../src/countBy'

describe('countBy', () => {
  it('should count by function', () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': 1, '6': 2 })
  })

  it('should count by string key', () => {
    expect(countBy(['one', 'two', 'three'], 'length')).toEqual({ '3': 2, '5': 1 })
  })

  it('should count by object property', () => {
    expect(countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')).toEqual({ a: 2, b: 1 })
  })

  it('should count by arrow function', () => {
    expect(countBy(['apple', 'banana', 'apricot'], item => item[0])).toEqual({ a: 2, b: 1 })
  })

  it('should handle empty array', () => {
    expect(countBy([], Math.floor)).toEqual({})
  })

  it('should handle null iteratee (identity)', () => {
    expect(countBy([1, 2, 1, 3, 1], null)).toEqual({ '1': 3, '2': 1, '3': 1 })
  })

  it('should handle undefined iteratee (identity)', () => {
    expect(countBy(['a', 'b', 'a'], undefined)).toEqual({ a: 2, b: 1 })
  })

  it('should handle non-array input', () => {
    expect(countBy(null as any, n => n)).toEqual({})
    expect(countBy(undefined as any, n => n)).toEqual({})
  })
})
