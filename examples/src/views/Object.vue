<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NSpace, NInput, NTag, NCode } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	clone,
	extend,
	getProperty,
	setProperty,
	omit,
	pick,
	safeParse,
	safeStringify,
	isEqual,
	cleanData,
	searchObject,
	invert,
	mapKeys,
	mapValues,
	mergeWith,
	transform,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const objInput = ref({ a: { b: { c: 1 } } })
const pathInput = ref('a.b.c')
const sourceObj = ref({ a: 1, b: 2, c: 3, d: 4 })

const testJson = '{"a":1}'
const testObj = { a: BigInt(9007199254740993n), b: () => {} }

// cleanData demo
const dirtyObj = ref({
	name: 'John',
	age: 25,
	password: 'secret',
	confirmPassword: 'secret',
	undefined: undefined,
	nullValue: null,
	emptyString: '',
})

// searchObject demo
const searchTarget = ref({
	user: {
		name: 'John',
		email: 'john@example.com',
		address: {
			city: 'New York',
			zip: '10001',
		},
	},
	orders: [
		{ id: 1, product: 'Laptop' },
		{ id: 2, product: 'Phone' },
	],
})
const searchKeyword = ref('john')
const searchResult = ref<any>(null)

const doSearch = () => {
	searchResult.value = searchObject(searchTarget.value, searchKeyword.value, { childName: 'children', keyName: 'name' })
}
</script>

<template>
	<div>
		<n-h1>Object</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Object }}</p>

		<FunctionCard
			title="clone"
			description="Deep clone object"
			since="1.0.0"
			:code="`clone({ a: { b: 1 } }) // { a: { b: 1 } }`"
		>
			<template #result>
				<n-space align="center">
					<n-code code="clone({ a: { b: 1 } })" language="javascript" />
					<n-tag type="info">{{ JSON.stringify(clone({ a: { b: 1 } })) }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="extend"
			description="Deep merge objects (pass true as first arg for deep merge)"
			since="1.0.0"
			:code="`// Shallow merge
extend({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// Deep merge
extend(true, {}, { a: { x: 1 } }, { a: { y: 2 } })
// { a: { x: 1, y: 2 } }`"
		>
			<template #result>
				<n-space vertical>
					<div>
						<n-code
							code="extend({ a: { x: 1 } }, { a: { y: 2 } })"
							language="javascript"
						/>
						<n-tag type="info" size="small" style="margin-top: 4px">{{
							JSON.stringify(extend({ a: { x: 1 } }, { a: { y: 2 } }), null, 2)
						}}</n-tag>
					</div>
					<div>
						<n-code
							code="extend(true, {}, { a: { x: 1 } }, { a: { y: 2 } })"
							language="javascript"
						/>
						<n-tag type="info" size="small" style="margin-top: 4px">{{
							JSON.stringify(
								extend(true, {}, { a: { x: 1 } }, { a: { y: 2 } }),
								null,
								2
							)
						}}</n-tag>
					</div>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="getProperty / setProperty"
			description="Get/set nested property by path"
			since="2.0.0"
			:code="`getProperty({ a: { b: { c: 1 } } }, 'a.b.c') // 1
setProperty(obj, 'a.b.c', 100) // sets nested value`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<span style="color: #999; font-size: 12px">obj:</span>
						<n-tag type="info" size="small">{{ JSON.stringify(objInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-input v-model:value="pathInput" style="width: 120px" />
						<span style="color: #999">→</span>
						<n-tag type="info">{{
							JSON.stringify(getProperty(objInput, pathInput))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space align="center">
					<n-code code="setProperty({}, 'a.b.c', 1)" language="javascript" />
					<n-tag type="info" size="small">{{
						JSON.stringify(setProperty({}, 'a.b.c', 1))
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="omit / pick"
			description="Filter object properties"
			since="2.0.0"
			:tags="['filter']"
			:code="`omit({ a: 1, b: 2, c: 3 }, ['b', 'c']) // { a: 1 }\npick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }`"
		>
			<template #input>
				<n-space align="center">
					<span style="color: #999; font-size: 12px">source:</span>
					<n-tag type="info" size="small">{{ JSON.stringify(sourceObj) }}</n-tag>
				</n-space>
			</template>
			<template #result>
				<n-space>
					<n-space align="center">
						<n-code code="omit(['b','c'])" language="javascript" />
						<n-tag type="info" size="small">{{
							JSON.stringify(omit(sourceObj, ['b', 'c']))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="pick(['a','b'])" language="javascript" />
						<n-tag type="info" size="small">{{
							JSON.stringify(pick(sourceObj, ['a', 'b']))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="safeParse / safeStringify"
			description="Safe JSON operations that never throw (handles BigInt, functions, circular refs)"
			:tags="['json']"
			:code="`safeParse('{&quot;a&quot;:1}') // { a: 1 }
safeParse('invalid') // null (no error!)
safeStringify({ a: BigInt(1n) }) // handles BigInt`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code :code="`safeParse('${testJson}')`" language="javascript" />
						<n-tag type="info">{{ JSON.stringify(safeParse(testJson)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="safeParse('invalid')" language="javascript" />
						<n-tag type="info">{{ JSON.stringify(safeParse('invalid')) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code :code="`safeStringify(testObj)`" language="javascript" />
						<n-tag type="info" size="small">{{ safeStringify(testObj) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="isEqual"
			description="Deep equality comparison"
			since="2.0.0"
			:code="`isEqual({ a: 1 }, { a: 1 }) // true\nisEqual(NaN, NaN) // true`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="isEqual({ a: 1 }, { a: 1 })" language="javascript" />
						<n-tag type="info">{{ isEqual({ a: 1 }, { a: 1 }) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isEqual({ a: 1 }, { a: 2 })" language="javascript" />
						<n-tag type="info">{{ isEqual({ a: 1 }, { a: 2 }) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="isEqual(NaN, NaN)" language="javascript" />
						<n-tag type="info">{{ isEqual(NaN, NaN) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="cleanData"
			description="Remove undefined, null, empty strings and specified keys from object"
			since="2.0.0"
			:code="`cleanData(obj, ['password']) // Remove password + falsy values
cleanData(obj, [], { removeNull: true, removeEmpty: true })`"
		>
			<template #input>
				<n-space vertical>
					<span style="font-size: 12px; color: #666">Input object:</span>
					<pre class="code-block" style="font-size: 11px">{{ JSON.stringify(dirtyObj, null, 2) }}</pre>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">cleanData(obj, ['password', 'confirmPassword'])</code>
					</n-space>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(cleanData(dirtyObj, ['password', 'confirmPassword']), null, 2)
					}}</pre>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="searchObject"
			description="Deep search object for matching keys or values"
			since="2.0.0"
			:code="`searchObject(obj, 'john', { childName: 'children', keyName: 'name' }) // Find all matches
searchObject(obj, node => node.name.includes('john'), { childName: 'children', keyName: 'name' })`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-input v-model:value="searchKeyword" style="width: 200px" placeholder="Search keyword" />
						<n-tag size="small" @click="doSearch" style="cursor: pointer">Search</n-tag>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<pre class="code-block" style="font-size: 11px">{{ JSON.stringify(searchResult || searchObject(searchTarget, searchKeyword, { childName: 'children', keyName: 'name' }), null, 2) }}</pre>
				</n-space>
			</template>
		</FunctionCard>

		<!-- invert -->
		<FunctionCard
			title="invert"
			description="Invert object keys and values"
			since="6.0.0"
			:code="`invert({ a: '1', b: '2', c: '3' }) // { '1': 'a', '2': 'b', '3': 'c' }
invert({ a: 1, b: 2, c: 1 }) // { '1': 'c', '2': 'b' }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">invert({ a: '1', b: '2', c: '3' })</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(invert({ a: '1', b: '2', c: '3' }))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">invert({ a: 1, b: 2, c: 1 })</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(invert({ a: 1, b: 2, c: 1 }))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- mapKeys / mapValues -->
		<FunctionCard
			title="mapKeys / mapValues"
			description="Transform object keys or values"
			since="6.0.0"
			:code="`mapKeys({ a: 1, b: 2 }, (v, k) => k + v) // { a1: 1, b2: 2 }
mapValues({ a: 1, b: 2 }, n => n * 2) // { a: 2, b: 4 }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">mapKeys({ a: 1, b: 2 }, (v, k) => k + v)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(mapKeys({ a: 1, b: 2 }, (v, k) => k + v))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">mapValues({ a: 1, b: 2 }, n => n * 2)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(mapValues({ a: 1, b: 2 }, n => n * 2))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">mapValues({ a: { x: 1 }, b: { x: 2 } }, 'x')</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(mapValues({ a: { x: 1 }, b: { x: 2 } }, 'x'))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- mergeWith -->
		<FunctionCard
			title="mergeWith"
			description="Merge objects with custom strategy function"
			since="6.0.0"
			:code="`// Custom array merge (concat instead of replace)
mergeWith({ a: [1, 2] }, { a: [3, 4] }, (obj, src) => {
  if (Array.isArray(obj)) return obj.concat(src)
})
// { a: [1, 2, 3, 4] }

// Skip certain properties
mergeWith({ a: 1, b: 2 }, { a: 10, b: 20 }, (obj, src, key) => {
  if (key === 'b') return obj // keep original
})
// { a: 10, b: 2 }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">mergeWith({ a: [1, 2] }, { a: [3, 4] }, concat arrays)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(mergeWith({ a: [1, 2] } as any, { a: [3, 4] }, (objValue, srcValue) => {
								if (Array.isArray(objValue)) return objValue.concat(srcValue)
							}))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">mergeWith({ a: 1, b: 2 }, { a: 10, b: 20 }, keep 'b')</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(mergeWith({ a: 1, b: 2 }, { a: 10, b: 20, c: 30 }, (objValue, _srcValue, key) => {
								if (key === 'b') return objValue
							}))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">mergeWith({ a: 1 }, { b: 2 }, { c: 3 }, merge all)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(mergeWith({ a: 1 }, { b: 2 }, { c: 3 }, (objValue, srcValue) => srcValue ?? objValue))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- transform -->
		<FunctionCard
			title="transform"
			description="Transform object to new accumulator with iteratee"
			since="6.0.0"
			:code="`// Transform object to array
transform({ a: 1, b: 2 }, (result, value, key) => {
  result.push({ key, value })
  return result
}, [])
// [{ key: 'a', value: 1 }, { key: 'b', value: 2 }]

// Filter and transform
transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
  if (value > 1) result[key] = value * 2
}, {})
// { b: 4, c: 6 }

// Early exit by returning false
transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
  result[key] = value
  if (key === 'b') return false
}, {})
// { a: 1, b: 2 }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">transform to array</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(transform({ a: 1, b: 2, c: 3 }, (result: any[], value, key) => {
								result.push({ key, value })
								return result
							}, []))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">filter even & double</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(transform({ a: 1, b: 2, c: 3, d: 4 }, (result: any, value, key) => {
								if (value % 2 === 0) result[key] = value * 2
							}, {}))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">early exit at 'b'</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(transform({ a: 1, b: 2, c: 3 }, (result: any, value, key) => {
								result[key] = value
								if (key === 'b') return false
							}, {}))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">array to object</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(transform(['a', 'b', 'c'], (result: any, value, index) => {
								result[value] = index
							}, {}))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
