import { describe, expect, it } from 'vitest'
import capitalize from '../src/capitalize'

describe('capitalize', () => {
  it('should capitalize first character and lowercase rest', () => {
    expect(capitalize('FRED')).toBe('Fred')
    expect(capitalize('HELLO WORLD')).toBe('Hello world')
  })

  it('should handle already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello')
  })

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
  })

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle non-string input', () => {
    expect(capitalize(null as any)).toBe('')
    expect(capitalize(undefined as any)).toBe('')
  })
})
