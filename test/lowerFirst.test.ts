import { describe, expect, it } from 'vitest'
import lowerFirst from '../src/lowerFirst'

describe('lowerFirst', () => {
  it('should lowercase first character', () => {
    expect(lowerFirst('Fred')).toBe('fred')
    expect(lowerFirst('FRED')).toBe('fRED')
  })

  it('should handle already lowercase first character', () => {
    expect(lowerFirst('hello')).toBe('hello')
  })

  it('should handle single character', () => {
    expect(lowerFirst('A')).toBe('a')
    expect(lowerFirst('a')).toBe('a')
  })

  it('should handle empty string', () => {
    expect(lowerFirst('')).toBe('')
  })

  it('should handle non-string input', () => {
    expect(lowerFirst(null as any)).toBe('')
    expect(lowerFirst(undefined as any)).toBe('')
  })

  it('should handle string starting with number', () => {
    expect(lowerFirst('1abc')).toBe('1abc')
  })

  it('should handle string starting with special character', () => {
    expect(lowerFirst('@hello')).toBe('@hello')
  })
})
