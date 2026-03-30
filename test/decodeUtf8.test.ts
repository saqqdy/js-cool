import { describe, expect, it } from 'vitest'
import decodeUtf8 from '../src/decodeUtf8'

describe('decodeUtf8', () => {
  it('should decode basic ASCII string', () => {
    expect(decodeUtf8('Hello World')).toBe('Hello World')
  })

  it('should decode empty string', () => {
    expect(decodeUtf8('')).toBe('')
  })

  it('should decode two-byte UTF-8 characters', () => {
    // 'ä' (U+00E4) - two-byte UTF-8 sequence
    const decoded = decodeUtf8('\xC3\xA4')
    expect(decoded.length).toBe(1)
  })

  it('should decode three-byte UTF-8 characters', () => {
    // '好' (U+597D) - three-byte UTF-8 sequence
    const decoded = decodeUtf8('\xE5\xA5\xBD')
    expect(decoded.length).toBe(1)
  })

  it('should handle special characters', () => {
    expect(decodeUtf8('Test@123')).toBe('Test@123')
  })

  it('should handle numbers in string', () => {
    expect(decodeUtf8('12345')).toBe('12345')
  })

  it('should handle string with spaces', () => {
    expect(decodeUtf8('  spaces  ')).toBe('  spaces  ')
  })
})
