import { describe, expect, it } from 'vitest'
import zip from '../src/zip'

describe('zip', () => {
  it('should zip two arrays', () => {
    expect(zip(['a', 'b', 'c'], [1, 2, 3])).toEqual([['a', 1], ['b', 2], ['c', 3]])
  })

  it('should zip multiple arrays', () => {
    expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([['a', 1, true], ['b', 2, false]])
  })

  it('should handle arrays of different lengths', () => {
    expect(zip([1, 2], [3, 4, 5])).toEqual([[1, 3], [2, 4]])
  })

  it('should handle single array', () => {
    expect(zip([1, 2, 3])).toEqual([[1], [2], [3]])
  })

  it('should handle empty arrays', () => {
    expect(zip()).toEqual([])
    expect(zip([], [])).toEqual([])
  })
})
