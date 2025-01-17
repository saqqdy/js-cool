/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
	out: 'docs',
	entryPoints: ['./src'],
	json: 'docs/out.json',
	name: 'JS-COOL DOCS',
	includeVersion: true,
	readme: 'README.md',
	sort: ['source-order'],
	categorizeByGroup: false,
	searchCategoryBoosts: {
		Component: 2,
		Model: 1.2
	},
	searchGroupBoosts: {
		Classes: 1.5
	},
	hostedBaseUrl: 'https://www.saqqdy.com/js-cool/',
	navigationLinks: {
		Docs: 'https://www.saqqdy.com/js-cool/',
		GitHub: 'https://github.com/saqqdy/js-cool',
		CHANGELOG: 'https://github.com/saqqdy/js-cool/blob/master/CHANGELOG.md'
	},
	// highlightLanguages: ['typescript', 'tsx', 'css', 'json', 'jsonc', 'python', 'yaml', 'markdown'],
	markdownItOptions: {
		html: true
	},
	suppressCommentWarningsInDeclarationFiles: true
	// emit: true,
	// exclude: '',
	// externalPattern: '',
	// excludeExternals: ''
}

module.exports = config
