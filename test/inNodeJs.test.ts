import { describe, expect, it } from 'vitest'
import inNodeJs from '../src/inNodeJs'

describe('inNodeJs', () => {
	it('should be true in Node.js environment', () => {
		expect(inNodeJs).toBeTruthy()
	})
})
