import { describe, expect, it } from 'vitest'
import mapValues from '../src/mapValues'

describe('mapValues', () => {
  it('should map values by function', () => {
    const users = {
      fred: { user: 'fred', age: 40 },
      pebbles: { user: 'pebbles', age: 1 },
    }
    expect(mapValues(users, ({ age }) => age)).toEqual({ fred: 40, pebbles: 1 })
  })

  it('should map values by function with simple object', () => {
    expect(mapValues({ a: 1, b: 2 }, n => n * 2)).toEqual({ a: 2, b: 4 })
  })

  it('should map values by string key', () => {
    expect(mapValues({ a: { x: 1 }, b: { x: 2 } }, 'x')).toEqual({ a: 1, b: 2 })
  })

  it('should handle empty object', () => {
    expect(mapValues({}, n => n)).toEqual({})
  })

  it('should handle non-object input', () => {
    expect(mapValues(null as any, n => n)).toEqual({})
    expect(mapValues(undefined as any, n => n)).toEqual({})
  })

  it('should pass key and object to iteratee', () => {
    const result = mapValues({ a: 1, b: 2 }, (val, key) => `${key}:${val}`)
    expect(result).toEqual({ a: 'a:1', b: 'b:2' })
  })
})
