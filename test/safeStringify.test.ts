import { describe, expect, it } from 'vitest'
import safeStringify from '../src/safeStringify'

describe('safeStringify', () => {
  it('should stringify simple number', () => {
    expect(safeStringify(100)).toBe('100')
  })

  it('should stringify simple object', () => {
    expect(safeStringify({ a: 1, b: 2 })).toBe('{"a":1,"b":2}')
  })

  it('should convert undefined to string by default', () => {
    expect(safeStringify(undefined)).toBe('"undefined"')
  })

  it('should convert NaN to string by default', () => {
    expect(safeStringify(NaN)).toBe('"NaN"')
  })

  it('should convert Infinity to string by default', () => {
    expect(safeStringify(Infinity)).toBe('"Infinity"')
    expect(safeStringify(-Infinity)).toBe('"-Infinity"')
  })

  it('should convert BigInt to string', () => {
    expect(safeStringify(9007199254740993n)).toBe('"9007199254740993"')
  })

  it('should handle object with special values', () => {
    const result = safeStringify({ a: undefined, b: NaN, c: Infinity })
    expect(result).toContain('"a":"undefined"')
    expect(result).toContain('"b":"NaN"')
    expect(result).toContain('"c":"Infinity"')
  })

  it('should handle unsafe integers', () => {
    // Numbers beyond MAX_SAFE_INTEGER are converted to BigInt strings
    const bigNum = BigInt(Number.MAX_SAFE_INTEGER) + 2n
    const result = safeStringify({ num: bigNum })
    expect(result).toContain('"num":"')
  })

  it('should not convert special values when covert is false', () => {
    // Note: JSON.stringify will convert undefined to nothing in object
    expect(safeStringify(NaN, false)).toBe('null')
    expect(safeStringify(Infinity, false)).toBe('null')
  })

  it('should stringify array', () => {
    expect(safeStringify([1, 2, 3])).toBe('[1,2,3]')
  })

  it('should stringify nested objects', () => {
    expect(safeStringify({ outer: { inner: 1 } })).toBe('{"outer":{"inner":1}}')
  })
})
