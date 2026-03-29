import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	type: 'lib',
	ignores: ['examples/**'],
	languageOptions: {
		globals: {
			ActiveXObject: 'readonly',
		},
	},
	markdown: false,
	rules: {
		camelcase: 'off',
		'no-restricted-globals': 'off',
		'perfectionist/sort-exports': 'off',
		'unicorn/no-new-array': 'off',
		'unicorn/prefer-includes': 'off',
		'jsonc/sort-keys': 'off',
	},
	stylistic: false,
	typescript: true,
})
