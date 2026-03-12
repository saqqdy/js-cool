import { describe, expect, it } from 'vitest'
import getFileType from '../src/getFileType'

describe('getFileType', () => {
	it('should identify image type', () => {
		expect(getFileType('/name.png')).toEqual({ suffix: 'png', type: 'image' })
		expect(getFileType('/name.jpg')).toEqual({ suffix: 'jpg', type: 'image' })
		expect(getFileType('/name.jpeg')).toEqual({ suffix: 'jpeg', type: 'image' })
	})

	it('should identify pdf type', () => {
		expect(getFileType('/name.PDF')).toEqual({ suffix: 'pdf', type: 'pdf' })
	})

	it('should identify video type', () => {
		expect(getFileType('/name.mp4')).toEqual({ suffix: 'mp4', type: 'video' })
	})

	it('should identify audio type', () => {
		expect(getFileType('/name.mp3')).toEqual({ suffix: 'mp3', type: 'audio' })
	})

	it('should identify other type', () => {
		expect(getFileType('/name.xyz')).toEqual({ suffix: 'xyz', type: 'other' })
	})

	it('should throw error for empty url', () => {
		expect(() => getFileType('')).toThrow()
	})

	it('should identify word type', () => {
		expect(getFileType('/name.docx')).toEqual({ suffix: 'docx', type: 'word' })
	})

	it('should identify excel type', () => {
		expect(getFileType('/name.xlsx')).toEqual({ suffix: 'xlsx', type: 'excel' })
	})
})
