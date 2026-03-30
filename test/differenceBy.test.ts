import { describe, expect, it } from 'vitest'
import differenceBy from '../src/differenceBy'

describe('differenceBy', () => {
  it('should difference by function', () => {
    expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2])
  })

  it('should difference by string key', () => {
    expect(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x')).toEqual([{ x: 2 }])
  })

  it('should handle empty array', () => {
    expect(differenceBy([], [1, 2], n => n)).toEqual([])
  })

  it('should handle empty values', () => {
    expect(differenceBy([1, 2, 3], [], n => n)).toEqual([1, 2, 3])
  })

  it('should handle non-array input', () => {
    expect(differenceBy(null as any, [1], n => n)).toEqual([])
  })
})
