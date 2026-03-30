import { describe, expect, it } from 'vitest'
import unionBy from '../src/unionBy'

describe('unionBy', () => {
  it('should union by function', () => {
    expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2])
  })

  it('should union by string key', () => {
    expect(unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')).toEqual([{ x: 1 }, { x: 2 }])
  })

  it('should union by arrow function', () => {
    expect(unionBy([1, 2], [2, 3], n => n)).toEqual([1, 2, 3])
  })

  it('should handle multiple arrays', () => {
    expect(unionBy([1], [2], [3], [1, 2], n => n)).toEqual([1, 2, 3])
  })

  it('should handle empty arrays', () => {
    expect(unionBy([], [], n => n)).toEqual([])
  })

  it('should handle single array', () => {
    expect(unionBy([1, 2, 1], n => n)).toEqual([1, 2])
  })

  it('should handle no iteratee (identity)', () => {
    expect(unionBy([1, 2], [2, 3])).toEqual([1, 2, 3])
  })

  it('should handle no arguments', () => {
    expect(unionBy()).toEqual([])
  })

  it('should handle non-array arguments', () => {
    expect(unionBy(null as any, [1, 2], n => n)).toEqual([1, 2])
  })
})
