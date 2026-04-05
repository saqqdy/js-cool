<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NSpace, NInput, NInputNumber, NTag, NCode, NSwitch, NSelect } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	camel2Dash,
	dash2Camel,
	upperFirst,
	lowerFirst,
	capitalize,
	kebabCase,
	snakeCase,
	truncate,
	clearHtml,
	clearAttr,
	escape,
	unescape,
	getCHSLength,
	cutCHSString,
	words,
	template,
	changeCase,
	constantCase,
	dotCase,
	pascalCase,
	titleCase,
	swapCase,
	reverse,
	count,
	type CaseType,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const camelInput = ref('backgroundColor')
const dashInput = ref('background-color')
const upperInput = ref('hello')
const lowerInput = ref('FRED')
const capitalizeInput = ref('FRED')
const truncateInput = ref('This is a long string that needs to be truncated')
const truncateLen = ref(20)
const htmlInput = ref('<div id="test">Hello <b>World</b></div>')
const escapeInput = ref('<div>test & "quote"</div>')
const chsInput = ref('hello世界')
const chsLen = ref(6)

// words function
const wordsInput = ref('camelCaseHTML')
const wordsPattern = ref('')

// template function
const templateInput2 = ref('Hello, {{ name }}!')
const templateData2 = ref('{ "name": "World" }')

// Template advanced examples
const templateAdvancedInput = ref('{{ user.name }} is {{ user.age }} years old.')
const templateAdvancedData = ref('{ "user": { "name": "John", "age": 30 } }')
const templateEscapeInput = ref('{{ content }}')
const templateEscapeData = ref('{ "content": "<b>bold</b>" }')
const templateRawInput = ref('{{{ html }}}')
const templateRawData = ref('{ "html": "<strong>bold</strong>" }')
const templateCustomInput = ref('Hello, ${ name }!')
const templateCustomData = ref('{ "name": "World" }')

// changeCase - unified case conversion
const changeCaseInput = ref('helloWorld')
const changeCaseType = ref<CaseType>('kebab')
const caseTypes: { label: string; value: CaseType }[] = [
	{ label: 'camel (camelCase)', value: 'camel' },
	{ label: 'kebab (kebab-case)', value: 'kebab' },
	{ label: 'snake (snake_case)', value: 'snake' },
	{ label: 'pascal (PascalCase)', value: 'pascal' },
	{ label: 'constant (CONSTANT_CASE)', value: 'constant' },
	{ label: 'dot (dot.case)', value: 'dot' },
	{ label: 'title (Title Case)', value: 'title' },
	{ label: 'swap (sWAP cASE)', value: 'swap' },
	{ label: 'upper (UPPER)', value: 'upper' },
	{ label: 'lower (lower)', value: 'lower' },
	{ label: 'upperFirst (UpperFirst)', value: 'upperFirst' },
	{ label: 'lowerFirst (lowerFirst)', value: 'lowerFirst' },
]

// Individual case converters
const caseConverterInput = ref('hello world example')

// reverse function
const reverseInput = ref('Hello 世界 👋')

// count function
const countInput = ref('hello hello hello')
const countSubstring = ref('hello')
const countOverlapping = ref(false)
const countCaseSensitive = ref(true)

// Helper to safely parse JSON
const safeParse = (str: string) => {
	try {
		return JSON.parse(str || '{}')
	} catch {
		return {}
	}
}
</script>

<template>
	<div>
		<n-h1>String</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.String }}</p>

		<!-- changeCase - Unified Case Conversion API -->
		<FunctionCard
			title="changeCase"
			:description="t.string.changeCaseDesc || 'Unified case conversion API supporting all common naming conventions'"
			since="6.0.0"
			:tags="[t.convert, 'NEW']"
			:code="`changeCase('helloWorld', 'kebab')     // 'hello-world'
changeCase('foo-bar', 'camel')      // 'fooBar'
changeCase('foo_bar', 'pascal')     // 'FooBar'
changeCase('fooBar', 'snake')       // 'foo_bar'
changeCase('fooBar', 'constant')    // 'FOO_BAR'
changeCase('fooBar', 'dot')         // 'foo.bar'
changeCase('foo bar', 'title')      // 'Foo Bar'
changeCase('Hello', 'swap')         // 'hELLO'
changeCase('hello', 'upper')        // 'HELLO'
changeCase('HELLO', 'lower')        // 'hello'
changeCase('hello', 'upperFirst')   // 'Hello'
changeCase('Hello', 'lowerFirst')   // 'hello'`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="changeCaseInput" style="width: 200px" placeholder="Enter string" />
						<n-select v-model:value="changeCaseType" :options="caseTypes" style="width: 200px" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">changeCase('{{ changeCaseInput }}', '{{ changeCaseType }}')</code>
						<n-tag type="info">{{ changeCase(changeCaseInput, changeCaseType) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- Individual Case Converters -->
		<FunctionCard
			title="constantCase / dotCase / pascalCase / titleCase / swapCase"
			:description="t.string.individualCaseDesc || 'Individual case conversion functions for specific formats'"
			since="6.0.0"
			:tags="[t.convert, 'NEW']"
			:code="`constantCase('foo-bar')   // 'FOO_BAR'
dotCase('fooBar')        // 'foo.bar'
pascalCase('foo_bar')    // 'FooBar'
titleCase('hello world') // 'Hello World'
swapCase('Hello World')  // 'hELLO wORLD'`"
		>
			<template #input>
				<n-input v-model:value="caseConverterInput" style="width: 300px" placeholder="Enter string" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">constantCase</code>
						<n-tag type="info">{{ constantCase(caseConverterInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">dotCase</code>
						<n-tag type="info">{{ dotCase(caseConverterInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">pascalCase</code>
						<n-tag type="info">{{ pascalCase(caseConverterInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">titleCase</code>
						<n-tag type="info">{{ titleCase(caseConverterInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">swapCase</code>
						<n-tag type="info">{{ swapCase(caseConverterInput) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- reverse - Reverse string (Unicode aware) -->
		<FunctionCard
			title="reverse"
			:description="t.string.reverseDesc || 'Reverse string with proper Unicode handling (emoji, combining characters, surrogate pairs)'"
			since="6.0.0"
			:tags="[t.convert, 'NEW']"
			:code="`reverse('hello')     // 'olleh'
reverse('你好世界')   // '界世好你'
reverse('Hello 世界') // '界世 olleH'
reverse('👋🏻')        // '👋🏻' (emoji preserved)`"
		>
			<template #input>
				<n-input v-model:value="reverseInput" style="width: 300px" placeholder="Enter string to reverse" />
			</template>
			<template #result>
				<n-space align="center">
					<code class="code-inline">reverse('{{ reverseInput }}')</code>
					<n-tag type="info">{{ reverse(reverseInput) }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- count - Count substring occurrences -->
		<FunctionCard
			title="count"
			:description="t.string.countDesc || 'Count occurrences of a substring with overlapping and case-sensitive options'"
			since="6.0.0"
			:tags="['NEW']"
			:code="`count('hello hello hello', 'hello')  // 3
count('aaa', 'aa')                  // 1 (non-overlapping)
count('aaa', 'aa', { overlapping: true })  // 2
count('Hello World', 'hello', { caseSensitive: false })  // 1`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="countInput" style="width: 300px" placeholder="String to search" />
					<n-space align="center">
						<n-input v-model:value="countSubstring" style="width: 150px" placeholder="Substring" />
						<n-space>
							<span style="font-size: 12px; color: #666">overlapping:</span>
							<n-switch v-model:value="countOverlapping" size="small" />
						</n-space>
						<n-space>
							<span style="font-size: 12px; color: #666">caseSensitive:</span>
							<n-switch v-model:value="countCaseSensitive" size="small" />
						</n-space>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">count('{{ countInput }}', '{{ countSubstring }}')</code>
						<n-tag type="info">{{ count(countInput, countSubstring) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px">with options</code>
						<n-tag type="info">{{ count(countInput, countSubstring, { overlapping: countOverlapping, caseSensitive: countCaseSensitive }) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="camel2Dash / dash2Camel"
			:description="t.string.camel2DashDesc"
			since="1.0.0"
			:tags="[t.convert]"
			:code="`camel2Dash('backgroundColor') // '${camel2Dash(camelInput)}'\ndash2Camel('background-color') // '${dash2Camel(dashInput)}'`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input
							v-model:value="camelInput"
							style="width: 200px"
							placeholder="camelCase"
						/>
						<span style="color: #999">→</span>
						<n-tag type="info">{{ camel2Dash(camelInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-input
							v-model:value="dashInput"
							style="width: 200px"
							placeholder="kebab-case"
						/>
						<span style="color: #999">→</span>
						<n-tag type="info">{{ dash2Camel(dashInput) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="upperFirst"
			:description="t.string.upperFirstDesc"
			since="1.0.0"
			:result="upperFirst(upperInput)"
			:code="`upperFirst('${upperInput}') // '${upperFirst(upperInput)}'`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="upperInput" style="width: 200px" />
					<span style="color: #999">→</span>
					<n-tag type="info">{{ upperFirst(upperInput) }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="lowerFirst"
			:description="t.string.lowerFirstDesc || 'Convert first character to lowercase'"
			since="6.0.0"
			:result="lowerFirst(lowerInput)"
			:code="`lowerFirst('Fred') // 'fred'
lowerFirst('FRED') // 'fRED'`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="lowerInput" style="width: 200px" />
					<span style="color: #999">→</span>
					<n-tag type="info">{{ lowerFirst(lowerInput) }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="capitalize"
			:description="t.string.capitalizeDesc || 'Capitalize first letter (rest lowercase)'"
			since="6.0.0"
			:result="capitalize(capitalizeInput)"
			:code="`capitalize('FRED') // 'Fred'
capitalize('hello world') // 'Hello world'`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="capitalizeInput" style="width: 200px" />
					<span style="color: #999">→</span>
					<n-tag type="info">{{ capitalize(capitalizeInput) }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="kebabCase / snakeCase"
			:description="t.string.kebabSnakeDesc"
			since="1.0.0"
			:tags="[t.convert]"
			:code="`kebabCase('helloWorld') // '${kebabCase('helloWorld')}'\nsnakeCase('helloWorld') // '${snakeCase('helloWorld')}'`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="kebabCase('helloWorld')" language="javascript" />
						<n-tag type="info">{{ kebabCase('helloWorld') }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="snakeCase('helloWorld')" language="javascript" />
						<n-tag type="info">{{ snakeCase('helloWorld') }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="truncate"
			:description="t.string.truncateDesc"
			since="1.0.0"
			:code="`truncate('hi-diddly-ho there, neighborino')
		// 'hi-diddly-ho there, neighbo...'

truncate('hi-diddly-ho there, neighborino', { separator: ' ' })
		// 'hi-diddly-ho there,...'`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="truncateInput" style="width: 300px" />
					<n-space align="center">
						<code class="code-inline">length:</code>
						<n-input-number v-model:value="truncateLen" :min="1" style="width: 80px" />
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px"
							>{ length: {{ truncateLen }} }</code
						>
						<n-tag type="info" size="small">{{
							truncate(truncateInput, { length: truncateLen })
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px"
							>{ length: {{ truncateLen }}, omission: '…' }</code
						>
						<n-tag type="info" size="small">{{
							truncate(truncateInput, { length: truncateLen, omission: '…' })
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline" style="font-size: 11px"
							>{ length: {{ truncateLen }}, separator: ' ' }</code
						>
						<n-tag type="info" size="small">{{
							truncate(truncateInput, { length: truncateLen, separator: ' ' })
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="clearHtml / clearAttr"
			:description="t.string.clearHtmlDesc"
			since="1.0.0"
			:tags="[t.html]"
			:code="`clearHtml('${htmlInput}') // '${clearHtml(htmlInput)}'\nclearAttr('${htmlInput}') // '${clearAttr(htmlInput)}'`"
		>
			<template #input>
				<n-input v-model:value="htmlInput" style="width: 100%" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="clearHtml" language="javascript" />
						<n-tag type="info">{{ clearHtml(htmlInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="clearAttr" language="javascript" />
						<n-tag type="info">{{ clearAttr(htmlInput) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="escape / unescape"
			:description="t.string.escapeDesc"
			since="5.5.0"
			:tags="[t.html]"
			:code="`escape('${escapeInput}') // '${escape(escapeInput)}'`"
		>
			<template #input>
				<n-input v-model:value="escapeInput" style="width: 100%" />
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="escape" language="javascript" />
						<n-tag type="info">{{ escape(escapeInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="unescape" language="javascript" />
						<n-tag type="info">{{ unescape(escape(escapeInput)) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="getCHSLength / cutCHSString"
			:description="t.string.chsDesc"
			since="1.0.0"
			:tags="[t.chinese]"
			:code="`getCHSLength('${chsInput}') // ${getCHSLength(chsInput)} (full-width chars = 2 bytes)
getCHSLength('🎉') // 2 (emoji is full-width)
cutCHSString('${chsInput}', ${chsLen}) // '${cutCHSString(chsInput, chsLen)}'`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="chsInput" style="width: 200px" />
						<n-tag type="info">length: {{ getCHSLength(chsInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-input-number v-model:value="chsLen" :min="1" style="width: 80px" />
						<span style="color: #999">{{ t.string.bytes }}</span>
					</n-space>
					<n-space align="center">
						<code class="code-inline">getCHSLength('🎉')</code>
						<n-tag type="info" size="small">{{ getCHSLength('🎉') }} (emoji)</n-tag>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space>
						<n-tag type="info">{{ cutCHSString(chsInput, chsLen) }}</n-tag>
						<n-tag type="info">{{ cutCHSString(chsInput, chsLen, true) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="words"
			:description="t.string.wordsDesc || 'Split string into an array of words'"
			since="6.0.0"
			:tags="[t.convert]"
			:code="`words('fred, barney, & pebbles') // ['fred', 'barney', 'pebbles']
words('camelCaseHTML') // ['camel', 'Case', 'HTML']
words('camelCaseHTML', /[A-Z]{2,}/g) // ['HTML']
words('hello world', /\\w+/g) // ['hello', 'world']`"
		>
			<template #input>
				<n-space vertical>
					<n-input v-model:value="wordsInput" style="width: 100%" placeholder="Enter string to split" />
					<n-input v-model:value="wordsPattern" style="width: 200px" placeholder="Custom pattern (optional)" />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">words('fred, barney, & pebbles')</code>
						<n-tag type="info" size="small">{{ words('fred, barney, & pebbles') }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">words(input)</code>
						<n-tag type="info" size="small">{{ words(wordsInput) }}</n-tag>
					</n-space>
					<n-space align="center" v-if="wordsPattern">
						<code class="code-inline">words(input, pattern)</code>
						<n-tag type="info" size="small">{{ words(wordsInput, wordsPattern) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="template"
			:description="t.string.templateDesc || 'Template string interpolation with custom delimiters, nested properties, and HTML escaping'"
			since="6.0.0"
			:tags="[t.convert]"
			:code="`const compiled = template('Hello, {{ name }}!')
compiled({ name: 'World' }) // 'Hello, World!'

// HTML escaping (default)
template('{{ content }}')({ content: '<b>bold</b>' })
// '&lt;b&gt;bold&lt;/b&gt;'

// Raw output (triple braces)
template('{{{ html }}}')({ html: '<b>bold</b>' })
// '<b>bold</b>'

// Custom delimiters
template('Hello, $\{ name \}!', { open: '\${', close: '}' })
// 'Hello, World!'

// Nested properties
template('{{ user.name }} is {{ user.age }} years old.')
// 'John is 30 years old.'`"
		>
			<template #input>
				<n-space vertical style="width: 100%">
					<n-input v-model:value="templateInput2" style="width: 100%" placeholder="Template string with \{\{ var \}\}" />
					<n-input v-model:value="templateData2" style="width: 100%" placeholder='JSON data: { "key": "value" }' />
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">template(input)(data)</code>
						<n-tag type="info" size="small">{{ template(templateInput2)(safeParse(templateData2)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Nested: \{\{ user.name \}\}</code>
						<n-tag type="info" size="small">{{ template(templateAdvancedInput)(safeParse(templateAdvancedData)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">HTML escaped \{\{ \}\}</code>
						<n-tag type="info" size="small">{{ template(templateEscapeInput)(safeParse(templateEscapeData)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Raw output \{\{\{ \}\}\}</code>
						<n-tag type="info" size="small">{{ template(templateRawInput)(safeParse(templateRawData)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">Custom delimiters \$\{ \}</code>
						<n-tag type="info" size="small">{{ template(templateCustomInput, { open: '${', close: '}' })(safeParse(templateCustomData)) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
