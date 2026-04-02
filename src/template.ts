
/**
 * Template settings
 */
export interface TemplateSettings {
	/**
	 * The opening delimiter
	 * @default '\{\{'
	 */
	open?: string
	/**
	 * The closing delimiter
	 * @default '\}\}'
	 */
	close?: string
	/**
	 * Whether to escape HTML
	 * @default true
	 */
	escape?: boolean
}

/**
 * Template options
 */
export interface TemplateOptions extends TemplateSettings {
	/**
	 * Data to interpolate into the template
	 */
	data?: Record<string, unknown>
}

// HTML escape map
const ESCAPE_MAP: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'`': '&#96;',
}

/**
 * Escape HTML special characters
 */
function escapeHtml(string: string): string {
	return string.replace(/[&<>"'`]/g, (char) => ESCAPE_MAP[char] || char)
}

/**
 * Creates a template function that can interpolate data properties.
 *
 * @description
 * Supports two delimiter styles:
 * - `{{ property }}` - Interpolate with optional HTML escaping
 * - `{{{ property }}}` - Interpolate without escaping (raw)
 *
 * @example
 * ```js
 * // Basic usage
 * const compiled = template('Hello, {{ name }}!')
 * compiled({ name: 'World' })
 * // 'Hello, World!'
 *
 * // With HTML escaping (default)
 * const compiled = template('{{ content }}')
 * compiled({ content: '<script>alert("xss")</script>' })
 * // '&lt;script&gt;alert("xss")&lt;/script&gt;'
 *
 * // Raw output (triple braces)
 * const compiled = template('{{{ html }}}')
 * compiled({ html: '<strong>bold</strong>' })
 * // '<strong>bold</strong>'
 *
 * // With custom delimiters
 * const compiled = template('Hello, ${ name }!', { open: '${', close: '}' })
 * compiled({ name: 'World' })
 * // 'Hello, World!'
 *
 * // Direct call with data
 * template('Hello, {{ name }}!', { data: { name: 'World' } })
 * // 'Hello, World!'
 *
 * // Complex expressions
 * const compiled = template('{{ user.name }} is {{ user.age }} years old.')
 * compiled({ user: { name: 'John', age: 30 } })
 * // 'John is 30 years old.'
 * ```
 *
 * @since 6.0.0
 * @param templateString - The template string
 * @param options - Template settings or data object
 * @returns - A compiled template function or rendered string
 */
function template(
	templateString: string,
	options?: TemplateOptions,
): (data?: Record<string, unknown>) => string {
	if (!templateString || typeof templateString !== 'string') {
		return () => ''
	}

	const settings: TemplateSettings = {
		open: options?.open ?? '{{',
		close: options?.close ?? '}}',
		escape: options?.escape ?? true,
	}

	// Escape regex special characters
	const escapeRegex = (str: string): string =>
		str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

	/**
	 * Get a nested property from an object
	 */
	function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
		const keys = path.trim().split('.')
		let value: unknown = obj

		for (const key of keys) {
			if (value === null || value === undefined) return undefined
			if (typeof value !== 'object') return undefined
			value = (value as Record<string, unknown>)[key.trim()]
		}

		return value
	}

	/**
	 * Compile and render the template
	 */
	return function render(data?: Record<string, unknown>): string {
		const context = data ?? options?.data ?? {}

		let result = templateString

		// First, handle raw output (triple braces: {{{ variable }}})
		// Match pattern like {{{ var }}} or {{{var}}}
		const rawPattern = /\{\{\{\s*([\s\S]+?)\s*\}\}\}/g
		result = result.replace(rawPattern, (_, path: string) => {
			const value = getNestedValue(context, path)
			return value !== undefined && value !== null ? String(value) : ''
		})

		// Then, handle escaped output (double braces: {{ variable }})
		const openPattern = escapeRegex(settings.open!)
		const closePattern = escapeRegex(settings.close!)
		const escapePattern = new RegExp(
			`${openPattern}\\s*([\\s\\S]+?)\\s*${closePattern}`,
			'g',
		)

		if (settings.escape) {
			result = result.replace(escapePattern, (_, path: string) => {
				const value = getNestedValue(context, path)
				const stringValue = value !== undefined && value !== null ? String(value) : ''
				return escapeHtml(stringValue)
			})
		} else {
			result = result.replace(escapePattern, (_, path: string) => {
				const value = getNestedValue(context, path)
				return value !== undefined && value !== null ? String(value) : ''
			})
		}

		return result
	}
}

export default template
