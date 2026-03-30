import { describe, expect, it } from 'vitest'
import findIndex from '../src/findIndex'

describe('findIndex', () => {
  const users = [
    { user: 'barney', active: false },
    { user: 'fred', active: false },
    { user: 'pebbles', active: true },
  ]

  it('should find index with function predicate', () => {
    expect(findIndex(users, ({ active }) => active)).toBe(2)
  })

  it('should find index with object predicate', () => {
    expect(findIndex(users, { user: 'fred' })).toBe(1)
  })

  it('should find index with array predicate', () => {
    expect(findIndex(users, ['user', 'barney'])).toBe(0)
  })

  it('should find index with string predicate', () => {
    expect(findIndex(users, 'active')).toBe(2)
  })

  it('should return -1 when not found', () => {
    expect(findIndex(users, { user: 'unknown' })).toBe(-1)
  })

  it('should support fromIndex', () => {
    expect(findIndex([1, 2, 3, 2, 1], n => n === 2, 2)).toBe(3)
  })

  it('should handle negative fromIndex', () => {
    expect(findIndex([1, 2, 3, 4, 5], n => n > 2, -2)).toBe(3)
  })

  it('should handle empty array', () => {
    expect(findIndex([], n => n)).toBe(-1)
  })

  it('should handle null predicate (truthy check)', () => {
    expect(findIndex([0, false, null, 1], null)).toBe(3)
  })
})
