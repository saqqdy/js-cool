<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NSpace, NAlert } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { arrayToCSV, CSVToArray, CSVToJSON, JSONToCSV } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

// CSV demos
const csvInput = ref('name,age,city\nJohn,25,New York\nAlice,30,Los Angeles\nBob,35,Chicago')
const jsonArrayInput = ref([
	{ name: 'John', age: 25, city: 'New York' },
	{ name: 'Alice', age: 30, city: 'Los Angeles' },
])
</script>

<template>
	<div>
		<n-h1>Convert</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Convert }}</p>

		<!-- Binary Module Link -->
		<n-alert type="info" style="margin-bottom: 24px" title="Binary Module">
			<template #default>
				<p>
					All binary data conversion functions have been unified into the
					<strong>binary</strong> module since v6.0.0.
				</p>
				<p style="margin-top: 8px">
					<router-link to="/binary">Go to Binary module →</router-link>
				</p>
			</template>
		</n-alert>

		<!-- CSVToArray / CSVToJSON -->
		<FunctionCard
			title="CSVToArray / CSVToJSON"
			description="Parse CSV to array or JSON"
			since="5.0.0"
			:code="`CSVToArray('a,b,c\\n1,2,3') // [['a','b','c'], ['1','2','3']]
CSVToJSON('name,age\\nJohn,25') // [{ name: 'John', age: '25' }]`"
		>
			<template #input>
				<n-space vertical>
					<n-input
						v-model:value="csvInput"
						type="textarea"
						style="width: 100%"
						:rows="4"
					/>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">CSVToArray</code>
					</n-space>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(CSVToArray(csvInput), null, 2)
					}}</pre>
					<n-space align="center">
						<code class="code-inline">CSVToJSON</code>
					</n-space>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(CSVToJSON(csvInput), null, 2)
					}}</pre>
				</n-space>
			</template>
		</FunctionCard>

		<!-- JSONToCSV / arrayToCSV -->
		<FunctionCard
			title="JSONToCSV / arrayToCSV"
			description="Convert JSON or array to CSV string"
			since="5.0.0"
			:code="`JSONToCSV([{ name: 'John', age: 25 }], ['name', 'age'])
arrayToCSV([['a','b'], ['1','2']])`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">JSONToCSV(jsonArray, ['name', 'age', 'city'])</code>
					</n-space>
					<n-tag type="info" size="small" :bordered="false">{{
						JSONToCSV(jsonArrayInput, ['name', 'age', 'city'])
					}}</n-tag>
					<n-space align="center">
						<code class="code-inline">arrayToCSV([['a','b'], ['1','2']])</code>
					</n-space>
					<n-tag type="info" size="small" :bordered="false">{{
						arrayToCSV([['a', 'b'], ['1', '2']])
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- CSV Summary -->
		<FunctionCard title="CSV Functions Summary" description="All CSV conversion utilities" since="5.0.0">
			<template #result>
				<pre class="code-block">// Parse CSV string to 2D array
CSVToArray(csvString)  // string[][]

// Parse CSV string to JSON objects
CSVToJSON(csvString)   // object[]

// Convert 2D array to CSV string
arrayToCSV(array)      // string

// Convert JSON array to CSV string
JSONToCSV(jsonArray, headers?)  // string

// Example usage
const csv = 'name,age\\nJohn,25\\nJane,30'

CSVToArray(csv)
// [['name', 'age'], ['John', '25'], ['Jane', '30']]

CSVToJSON(csv)
// [{ name: 'John', age: '25' }, { name: 'Jane', age: '30' }]

arrayToCSV([['a', 'b'], ['1', '2']])
// 'a,b\\n1,2'

JSONToCSV([{ name: 'John', age: 25 }], ['name', 'age'])
// 'name,age\\nJohn,25'</pre>
			</template>
		</FunctionCard>
	</div>
</template>

<style scoped>
.code-inline {
	background: rgba(0, 0, 0, 0.05);
	padding: 2px 6px;
	border-radius: 4px;
	font-family: monospace;
	font-size: 12px;
}

:global(.dark) .code-inline {
	background: rgba(255, 255, 255, 0.1);
}

.code-block {
	background: rgba(0, 0, 0, 0.05);
	padding: 12px;
	border-radius: 8px;
	overflow-x: auto;
	font-family: monospace;
}

:global(.dark) .code-block {
	background: rgba(255, 255, 255, 0.05);
}
</style>
