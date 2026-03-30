import { describe, expect, it } from 'vitest'
import findLastIndex from '../src/findLastIndex'

describe('findLastIndex', () => {
  const users = [
    { user: 'barney', active: true },
    { user: 'fred', active: false },
    { user: 'pebbles', active: false },
  ]

  it('should find index with function predicate', () => {
    expect(findLastIndex(users, ({ active }) => active)).toBe(0)
  })

  it('should find index with object predicate', () => {
    expect(findLastIndex(users, { user: 'fred' })).toBe(1)
  })

  it('should find index with array predicate', () => {
    expect(findLastIndex(users, ['user', 'pebbles'])).toBe(2)
  })

  it('should find index with string predicate (truthy check)', () => {
    expect(findLastIndex(users, 'active')).toBe(0)
  })

  it('should find last matching element with function', () => {
    expect(findLastIndex([1, 2, 3, 4], n => n > 2)).toBe(3)
  })

  it('should return -1 when not found', () => {
    expect(findLastIndex([1, 2, 3], n => n > 5)).toBe(-1)
  })

  it('should handle fromIndex', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], n => n > 2, 2)).toBe(2)
  })

  it('should handle negative fromIndex', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], n => n > 2, -2)).toBe(3)
  })

  it('should handle empty array', () => {
    expect(findLastIndex([], n => n)).toBe(-1)
  })

  it('should handle non-array input', () => {
    expect(findLastIndex(null as any, n => n)).toBe(-1)
  })

  it('should handle null predicate (truthy check)', () => {
    expect(findLastIndex([0, 1, 0, 2], null)).toBe(3)
  })
})
