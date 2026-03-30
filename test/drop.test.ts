import { describe, expect, it } from 'vitest'
import drop from '../src/drop'

describe('drop', () => {
  it('should drop n elements from the beginning', () => {
    expect(drop([1, 2, 3, 4, 5], 3)).toEqual([4, 5])
  })

  it('should drop 1 element by default', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3])
  })

  it('should return empty array when n >= array length', () => {
    expect(drop([1, 2, 3], 5)).toEqual([])
  })

  it('should return all elements when n is 0', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3])
  })

  it('should return all elements when n is negative', () => {
    expect(drop([1, 2, 3], -1)).toEqual([1, 2, 3])
  })

  it('should handle empty array', () => {
    expect(drop([], 3)).toEqual([])
  })

  it('should handle non-array input', () => {
    expect(drop(null as any, 3)).toEqual([])
    expect(drop(undefined as any, 3)).toEqual([])
  })

  it('should preserve array element types', () => {
    expect(drop(['a', 'b', 'c'], 1)).toEqual(['b', 'c'])
  })
})
