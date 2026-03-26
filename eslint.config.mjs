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
		'n/no-unsupported-features/es-builtins': 'off',
		'perfectionist/sort-interfaces': 'off',
		'perfectionist/sort-named-exports': 'off',
		'perfectionist/sort-objects': 'off',
		'perfectionist/sort-imports': 'off',
		'perfectionist/sort-exports': 'off',
		'no-restricted-globals': 'off',
		'unicorn/prefer-includes': 'off',
		'unicorn/prefer-number-properties': 'off',
		'unicorn/no-new-array': 'off',
		'no-self-compare': 'off',
		'jsonc/sort-keys': 'off',
	},
	stylistic: false,
	type: 'lib',
	typescript: true,
})
