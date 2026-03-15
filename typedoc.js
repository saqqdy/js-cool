/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
	categorizeByGroup: false,
	entryPoints: ['./src'],
	hostedBaseUrl: 'https://www.saqqdy.com/js-cool/',
	includeVersion: true,
	json: 'docs/out.json',
	// highlightLanguages: ['typescript', 'tsx', 'css', 'json', 'jsonc', 'python', 'yaml', 'markdown'],
	markdownItOptions: {
		html: true,
	},
	name: 'JS-COOL DOCS',
	navigationLinks: {
		CHANGELOG: 'https://github.com/saqqdy/js-cool/blob/master/CHANGELOG.md',
		Docs: 'https://www.saqqdy.com/js-cool/',
		GitHub: 'https://github.com/saqqdy/js-cool',
	},
	out: 'docs',
	readme: 'README.md',
	searchCategoryBoosts: {
		Component: 2,
		Model: 1.2,
	},
	searchGroupBoosts: {
		Classes: 1.5,
	},
	sort: ['source-order'],
	suppressCommentWarningsInDeclarationFiles: true,
	// emit: true,
	// exclude: '',
	// externalPattern: '',
	// excludeExternals: ''
}

module.exports = config
