import { describe, expect, it } from 'vitest'
import encodeUtf8 from '../src/encodeUtf8'

describe('encodeUtf8', () => {
  it('should encode ASCII string', () => {
    expect(encodeUtf8('hello')).toBe('hello')
  })

  it('should encode Chinese characters', () => {
    const result = encodeUtf8('测试')

    expect(typeof result).toBe('string')
  })

  it('should handle empty string', () => {
    expect(encodeUtf8('')).toBe('')
  })
})
