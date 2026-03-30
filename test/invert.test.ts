import { describe, expect, it } from 'vitest'
import invert from '../src/invert'

describe('invert', () => {
  it('should invert object keys and values', () => {
    expect(invert({ a: '1', b: '2', c: '3' })).toEqual({ '1': 'a', '2': 'b', '3': 'c' })
  })

  it('should handle duplicate values (last wins)', () => {
    expect(invert({ a: 1, b: 2, c: 1 })).toEqual({ '1': 'c', '2': 'b' })
  })

  it('should invert string values', () => {
    expect(invert({ x: 'apple', y: 'banana' })).toEqual({ apple: 'x', banana: 'y' })
  })

  it('should handle empty object', () => {
    expect(invert({})).toEqual({})
  })

  it('should handle non-object input', () => {
    expect(invert(null as any)).toEqual({})
    expect(invert(undefined as any)).toEqual({})
  })

  it('should handle numeric values', () => {
    expect(invert({ a: 100, b: 200 })).toEqual({ '100': 'a', '200': 'b' })
  })
})
