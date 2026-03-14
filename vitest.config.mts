import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['test/**/*.test.ts'],
		setupFiles: ['./test/setup.ts'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.ts'],
			exclude: ['src/types.ts', 'src/all.ts', 'src/index.ts']
		}
	}
})
