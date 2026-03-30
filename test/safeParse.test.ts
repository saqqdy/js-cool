import { describe, expect, it } from 'vitest'
import safeParse from '../src/safeParse'

describe('safeParse', () => {
  it('should parse simple number string', () => {
    expect(safeParse('100')).toBe(100)
  })

  it('should parse JSON object', () => {
    expect(safeParse('{"a":1,"b":2}')).toEqual({ a: 1, b: 2 })
  })

  it('should convert special values by default', () => {
    const result = safeParse('{"a":"undefined","b":"NaN","c":"Infinity","d":"-Infinity"}')
    expect(result.a).toBeUndefined()
    expect(Number.isNaN(result.b)).toBe(true)
    expect(result.c).toBe(Infinity)
    expect(result.d).toBe(-Infinity)
  })

  it('should convert unsafe integers to BigInt', () => {
    const result = safeParse('{"num":"9007199254740993"}')
    expect(result.num).toBe(9007199254740993n)
  })

  it('should not convert when covert is false', () => {
    const result = safeParse('{"a":"NaN","b":"Infinity"}', false)
    expect(result.a).toBe('NaN')
    expect(result.b).toBe('Infinity')
  })

  it('should return null for invalid JSON', () => {
    expect(safeParse('invalid json')).toBeNull()
  })

  it('should handle empty string', () => {
    expect(safeParse('')).toBeNull()
  })

  it('should parse array', () => {
    expect(safeParse('[1,2,3]')).toEqual([1, 2, 3])
  })

  it('should parse nested objects', () => {
    expect(safeParse('{"outer":{"inner":1}}')).toEqual({ outer: { inner: 1 } })
  })
})
