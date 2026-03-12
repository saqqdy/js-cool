import { describe, expect, it } from 'vitest'
import searchObject from '../src/searchObject'

describe('searchObject', () => {
	const tree = [
		{
			name: 'parent',
			child: [
				{ name: 'child1', value: 1 },
				{ name: 'child2', value: 2 }
			]
		}
	]

	it('should search by expression object', () => {
		const result = searchObject(tree, { name: 'child1' }, { childName: 'child', keyName: 'name' })
		expect(result.length).toBe(1)
		expect(result[0].name).toBe('child1')
	})

	it('should search by expression function', () => {
		const result = searchObject(tree, (item: any) => item.value === 2, { childName: 'child', keyName: 'name' })
		expect(result.length).toBe(1)
		expect(result[0].name).toBe('child2')
	})

	it('should search by key name', () => {
		const result = searchObject(tree, 'parent', { childName: 'child', keyName: 'name' })
		expect(result.length).toBe(1)
		expect(result[0].name).toBe('parent')
	})

	it('should limit results with number parameter', () => {
		const result = searchObject(tree, { value: 1 }, { childName: 'child', keyName: 'name' }, 1)
		expect(result.length).toBeLessThanOrEqual(1)
	})

	it('should use default keySet when not provided', () => {
		const treeWithDefaultKeys = [{ name: 'test', child: [] }]
		const result = searchObject(treeWithDefaultKeys, 'test', { childName: 'child', keyName: 'name' })
		expect(result.length).toBe(1)
	})
})
