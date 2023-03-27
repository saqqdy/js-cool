module.exports = {
	extends: '@eslint-sets/ts',
	rules: {
		semi: [2, 'never'],
		camelcase: 0
	},
	globals: {
		ActiveXObject: 'readonly'
	}
}
