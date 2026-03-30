import { describe, expect, it } from 'vitest'
import takeRight from '../src/takeRight'

describe('takeRight', () => {
  it('should take n elements from the end', () => {
    expect(takeRight([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5])
  })

  it('should take 1 element by default', () => {
    expect(takeRight([1, 2, 3])).toEqual([3])
  })

  it('should return all elements when n >= array length', () => {
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3])
  })

  it('should return empty array when n is 0', () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([])
  })

  it('should return empty array when n is negative', () => {
    expect(takeRight([1, 2, 3], -1)).toEqual([])
  })

  it('should handle empty array', () => {
    expect(takeRight([], 3)).toEqual([])
  })

  it('should handle non-array input', () => {
    expect(takeRight(null as any, 3)).toEqual([])
    expect(takeRight(undefined as any, 3)).toEqual([])
  })

  it('should preserve array element types', () => {
    expect(takeRight(['a', 'b', 'c'], 2)).toEqual(['b', 'c'])
  })
})
