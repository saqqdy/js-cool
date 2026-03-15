module.exports = {
	extends: '@eslint-sets/ts',
	ignorePatterns: ['**/*.md'],
	rules: {
		semi: [2, 'never'],
		camelcase: 0,
		'no-only-tests/no-only-tests': 'off'
	},
	globals: {
		ActiveXObject: 'readonly'
	}
}
