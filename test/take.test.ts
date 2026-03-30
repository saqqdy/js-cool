import { describe, expect, it } from 'vitest'
import drop from '../src/drop'
import dropRight from '../src/dropRight'
import take from '../src/take'
import takeRight from '../src/takeRight'

describe('take', () => {
  it('should take first n elements', () => {
    expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
  })

  it('should take first element by default', () => {
    expect(take([1, 2, 3])).toEqual([1])
  })

  it('should return empty array for n <= 0', () => {
    expect(take([1, 2, 3], 0)).toEqual([])
    expect(take([1, 2, 3], -1)).toEqual([])
  })

  it('should return all elements if n > length', () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3])
  })

  it('should return empty array for empty input', () => {
    expect(take([], 3)).toEqual([])
  })

  it('should handle non-array input', () => {
    expect(take(null as any, 3)).toEqual([])
    expect(take(undefined as any, 3)).toEqual([])
  })
})

describe('takeRight', () => {
  it('should take last n elements', () => {
    expect(takeRight([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5])
  })

  it('should take last element by default', () => {
    expect(takeRight([1, 2, 3])).toEqual([3])
  })

  it('should return empty array for n <= 0', () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([])
    expect(takeRight([1, 2, 3], -1)).toEqual([])
  })

  it('should return all elements if n > length', () => {
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3])
  })

  it('should return empty array for empty input', () => {
    expect(takeRight([], 3)).toEqual([])
  })
})

describe('drop', () => {
  it('should drop first n elements', () => {
    expect(drop([1, 2, 3, 4, 5], 3)).toEqual([4, 5])
  })

  it('should drop first element by default', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3])
  })

  it('should return all elements for n <= 0', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3])
    expect(drop([1, 2, 3], -1)).toEqual([1, 2, 3])
  })

  it('should return empty array if n > length', () => {
    expect(drop([1, 2, 3], 5)).toEqual([])
  })

  it('should return empty array for empty input', () => {
    expect(drop([], 3)).toEqual([])
  })
})

describe('dropRight', () => {
  it('should drop last n elements', () => {
    expect(dropRight([1, 2, 3, 4, 5], 3)).toEqual([1, 2])
  })

  it('should drop last element by default', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2])
  })

  it('should return all elements for n <= 0', () => {
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3])
    expect(dropRight([1, 2, 3], -1)).toEqual([1, 2, 3])
  })

  it('should return empty array if n > length', () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([])
  })

  it('should return empty array for empty input', () => {
    expect(dropRight([], 3)).toEqual([])
  })
})
