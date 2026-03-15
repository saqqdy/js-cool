import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	ignores: ['examples/**'],
	languageOptions: {
		globals: {
			ActiveXObject: 'readonly',
		},
	},
	markdown: false,
	rules: {
		camelcase: 'off',
		'n/no-unsupported-features/es-syntax': 'off',
		'n/no-unsupported-features/node-builtins': 'off',
	},
	stylistic: false,
	type: 'lib',
	typescript: true,
})
