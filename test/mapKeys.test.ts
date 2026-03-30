import { describe, expect, it } from 'vitest'
import mapKeys from '../src/mapKeys'

describe('mapKeys', () => {
  it('should map keys with function', () => {
    expect(mapKeys({ a: 1, b: 2 }, (value, key) => key + value)).toEqual({ a1: 1, b2: 2 })
  })

  it('should handle empty object', () => {
    expect(mapKeys({}, (v, k) => k)).toEqual({})
  })

  it('should handle non-object input', () => {
    expect(mapKeys(null as any, (v, k) => k)).toEqual({})
    expect(mapKeys(undefined as any, (v, k) => k)).toEqual({})
  })
})
