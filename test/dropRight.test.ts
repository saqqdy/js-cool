import { describe, expect, it } from 'vitest'
import dropRight from '../src/dropRight'

describe('dropRight', () => {
  it('should drop n elements from the end', () => {
    expect(dropRight([1, 2, 3, 4, 5], 3)).toEqual([1, 2])
  })

  it('should drop 1 element by default', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2])
  })

  it('should return empty array when n >= array length', () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([])
  })

  it('should return all elements when n is 0', () => {
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3])
  })

  it('should return all elements when n is negative', () => {
    expect(dropRight([1, 2, 3], -1)).toEqual([1, 2, 3])
  })

  it('should handle empty array', () => {
    expect(dropRight([], 3)).toEqual([])
  })

  it('should handle non-array input', () => {
    expect(dropRight(null as any, 3)).toEqual([])
    expect(dropRight(undefined as any, 3)).toEqual([])
  })

  it('should preserve array element types', () => {
    expect(dropRight(['a', 'b', 'c'], 1)).toEqual(['a', 'b'])
  })
})
