import { describe, expect, it } from 'vitest'
import partition from '../src/partition'

describe('partition', () => {
  it('should partition by function predicate', () => {
    const result = partition([1, 2, 3, 4], n => n % 2 === 0)
    expect(result).toEqual([[2, 4], [1, 3]])
  })

  it('should partition by string predicate', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true },
    ]
    const result = partition(users, 'active')
    expect(result[0]).toHaveLength(2)
    expect(result[1]).toHaveLength(1)
  })

  it('should partition by array predicate', () => {
    const data = [{ a: 1 }, { a: 2 }, { a: 1 }]
    const result = partition(data, ['a', 1])
    expect(result).toEqual([[{ a: 1 }, { a: 1 }], [{ a: 2 }]])
  })

  it('should handle empty array', () => {
    expect(partition([], n => n)).toEqual([[], []])
  })

  it('should handle null predicate (truthy check)', () => {
    expect(partition([0, 1, false, true], null)).toEqual([[1, true], [0, false]])
  })

  it('should handle non-array input', () => {
    expect(partition(null as any, n => n)).toEqual([[], []])
  })
})
