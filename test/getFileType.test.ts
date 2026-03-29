import { describe, expect, it } from 'vitest'
import getFileType from '../src/getFileType'

describe('getFileType', () => {
	it('should identify image type', () => {
		expect(getFileType('/name.png')).toEqual({ type: 'image', suffix: 'png' })
		expect(getFileType('/name.jpg')).toEqual({ type: 'image', suffix: 'jpg' })
		expect(getFileType('/name.jpeg')).toEqual({ type: 'image', suffix: 'jpeg' })
	})

	it('should identify pdf type', () => {
		expect(getFileType('/name.PDF')).toEqual({ type: 'pdf', suffix: 'pdf' })
	})

	it('should identify video type', () => {
		expect(getFileType('/name.mp4')).toEqual({ type: 'video', suffix: 'mp4' })
	})

	it('should identify audio type', () => {
		expect(getFileType('/name.mp3')).toEqual({ type: 'audio', suffix: 'mp3' })
	})

	it('should identify other type', () => {
		expect(getFileType('/name.xyz')).toEqual({ type: 'other', suffix: 'xyz' })
	})

	it('should throw error for empty url', () => {
		expect(() => getFileType('')).toThrow()
	})

	it('should identify word type', () => {
		expect(getFileType('/name.docx')).toEqual({ type: 'word', suffix: 'docx' })
	})

	it('should identify excel type', () => {
		expect(getFileType('/name.xlsx')).toEqual({ type: 'excel', suffix: 'xlsx' })
	})
})
