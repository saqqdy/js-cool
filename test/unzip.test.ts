import { describe, expect, it } from 'vitest'
import unzip from '../src/unzip'

describe('unzip', () => {
  it('should unzip pairs', () => {
    expect(unzip([['a', 1], ['b', 2]])).toEqual([['a', 'b'], [1, 2]])
  })

  it('should unzip triplets', () => {
    expect(unzip([['a', 1, true], ['b', 2, false]])).toEqual([['a', 'b'], [1, 2], [true, false]])
  })

  it('should unzip to regroup elements', () => {
    expect(unzip([[1, 4], [2, 5], [3, 6]])).toEqual([[1, 2, 3], [4, 5, 6]])
  })

  it('should handle empty array', () => {
    expect(unzip([])).toEqual([])
  })

  it('should handle non-array input', () => {
    expect(unzip(null as any)).toEqual([])
    expect(unzip(undefined as any)).toEqual([])
  })

  it('should handle arrays of different lengths', () => {
    expect(unzip([[1, 2], [3]])).toEqual([[1, 3], [2, undefined]])
  })

  it('should handle single array', () => {
    expect(unzip([[1, 2, 3]])).toEqual([[1], [2], [3]])
  })

  it('should handle non-array elements', () => {
    expect(unzip([1, 2, 3] as any)).toEqual([])
  })
})
