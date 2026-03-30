import { describe, expect, it } from 'vitest'
import intersectionBy from '../src/intersectionBy'

describe('intersectionBy', () => {
  it('should intersect by function', () => {
    expect(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1])
  })

  it('should intersect by string key', () => {
    expect(intersectionBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x')).toEqual([{ x: 1 }])
  })

  it('should intersect by arrow function', () => {
    expect(intersectionBy([1, 2, 3], [2, 3, 4], n => n)).toEqual([2, 3])
  })

  it('should return empty array when no intersection', () => {
    expect(intersectionBy([1, 2], [3, 4], n => n)).toEqual([])
  })

  it('should handle empty first array', () => {
    expect(intersectionBy([], [1, 2], n => n)).toEqual([])
  })

  it('should handle empty second array', () => {
    expect(intersectionBy([1, 2], [], n => n)).toEqual([])
  })

  it('should handle null iteratee (identity)', () => {
    expect(intersectionBy([1, 2, 3], [2, 3, 4], null)).toEqual([2, 3])
  })

  it('should handle undefined iteratee (identity)', () => {
    expect(intersectionBy([1, 2, 3], [2, 3, 4], undefined)).toEqual([2, 3])
  })

  it('should handle non-array input', () => {
    expect(intersectionBy(null as any, [1, 2], n => n)).toEqual([])
    expect(intersectionBy([1, 2], null as any, n => n)).toEqual([])
  })
})
