<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NSpace, NInputNumber, NTag, NCode, NButton } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import {
	shuffle,
	unique,
	intersect,
	union,
	minus,
	complement,
	contains,
	all,
	any,
	chunk,
	flatten,
	groupBy,
	sample,
	sampleSize,
	sortPinyin,
	sorter,
	keyBy,
	countBy,
	differenceBy,
	drop,
	dropRight,
	findIndex,
	findLastIndex,
	intersectionBy,
	partition,
	take,
	takeRight,
	unionBy,
	unzip,
	zip,
} from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const shuffleInput = ref([1, 2, 3, 4, 5])
const shuffleSize = ref<number | undefined>(undefined)
const shuffleResult = ref<number[]>([])
const doShuffle = () => {
	shuffleResult.value = shuffle([...shuffleInput.value], shuffleSize.value)
}

const sampleResult = ref<number | undefined>()
const doSample = () => {
	sampleResult.value = sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
}

const sampleSizeCount = ref(3)
const sampleSizeResult = ref<number[]>([])
const doSampleSize = () => {
	sampleSizeResult.value = sampleSize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], sampleSizeCount.value)
}

const chunkInput = ref([1, 2, 3, 4, 5, 6, 7, 8])
const chunkSize = ref(3)
const setA = ref([1, 2, 3])
const setB = ref([2, 3, 4])
const pinyinInput = ref(['张三', '李四', '王五', '赵六'])

// keyBy demo
const keyByInput = ref([
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
	{ id: 3, name: 'Charlie' },
])

// findIndex demo
const findIndexUsers = ref([
	{ user: 'barney', active: false },
	{ user: 'fred', active: false },
	{ user: 'pebbles', active: true },
])

// partition demo
const partitionUsers = ref([
	{ user: 'barney', age: 36, active: true },
	{ user: 'fred', age: 40, active: false },
	{ user: 'pebbles', age: 1, active: true },
])

// zip demo
const zipResult = zip(['a', 'b', 'c'], [1, 2, 3])
const unzipResult = unzip([['a', 1], ['b', 2], ['c', 3]])

</script>

<template>
	<div>
		<n-h1>Array</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Array }}</p>

		<FunctionCard
			title="unique"
			:description="t.array.uniqueDesc"
			since="1.0.0"
			:result="JSON.stringify(unique([1, 2, 2, 3, 3, 3, 4, 5]))"
			:code="`unique([1, 2, 2, 3, 3, 3, 4, 5]) // [1, 2, 3, 4, 5]`"
		/>

		<FunctionCard
			title="shuffle"
			:description="t.array.shuffleDesc"
			since="1.0.0"
			:code="`shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
shuffle([1, 2, 3, 4, 5], 3) // [4, 1, 5] (3 elements)
shuffle('hello') // 'lleho'
shuffle('hello', 3) // 'leh'`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-tag>{{ JSON.stringify(shuffleInput) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">size:</code>
						<n-input-number
							v-model:value="shuffleSize"
							:min="1"
							:max="shuffleInput.length"
							style="width: 80px"
							placeholder="all"
							clearable
						/>
						<n-button size="small" @click="doShuffle">Shuffle</n-button>
					</n-space>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-tag type="info">{{
						JSON.stringify(
							shuffleResult.length ? shuffleResult : shuffle([...shuffleInput])
						)
					}}</n-tag>
					<n-space align="center">
						<code class="code-inline">shuffle('hello')</code>
						<n-tag size="small">{{ shuffle('hello') }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">shuffle('hello', 3)</code>
						<n-tag size="small">{{ shuffle('hello', 3) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="chunk"
			:description="t.array.chunkDesc"
			since="1.0.0"
			:code="`chunk([1, 2, 3, 4, 5, 6, 7, 8], ${chunkSize}) // ${JSON.stringify(chunk(chunkInput, chunkSize))}`"
		>
			<template #input>
				<n-space>
					<n-tag>{{ JSON.stringify(chunkInput) }}</n-tag>
					<n-input-number v-model:value="chunkSize" :min="1" style="width: 60px" />
					<span style="color: #999">→</span>
					<n-tag type="info">{{ JSON.stringify(chunk(chunkInput, chunkSize)) }}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="flatten"
			:description="t.array.flattenDesc"
			since="2.0.0"
			:result="JSON.stringify(flatten([1, [2, 3], [4, [5, 6]]]))"
			:code="`flatten([1, [2, 3], [4, [5, 6]]]) // [1, 2, 3, 4, 5, 6]`"
		/>

		<FunctionCard
			title="sample / sampleSize"
			:description="t.array.sampleDesc"
			since="2.0.0"
			:code="`sample([1, 2, 3, 4, 5]) // 3 (single random element)
sampleSize([1, 2, 3, 4, 5], 2) // [3, 1] (2 random elements)`"
		>
			<template #input>
				<n-space vertical>
					<n-space align="center">
						<n-tag>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</n-tag>
					</n-space>
					<n-space align="center">
						<n-button size="small" @click="doSample">{{ t.array.sampleOne }}</n-button>
						<n-tag type="info" size="small">{{ sampleResult }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-input-number
							v-model:value="sampleSizeCount"
							:min="1"
							:max="10"
							style="width: 70px"
						/>
						<n-button size="small" @click="doSampleSize">{{
							t.array.sampleSize
						}}</n-button>
						<n-tag type="info" size="small">{{
							JSON.stringify(sampleSizeResult)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="Set Operations"
			:description="t.array.setOpsDesc"
			since="2.0.0"
			:tags="[t.set]"
			:code="`intersect([1, 2, 3], [2, 3, 4]) // [2, 3]\nunion([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]`"
		>
			<template #input>
				<n-space>
					<n-tag>A: {{ JSON.stringify(setA) }}</n-tag>
					<n-tag>B: {{ JSON.stringify(setB) }}</n-tag>
				</n-space>
			</template>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="intersect" language="javascript" />
						<n-tag type="info">{{ JSON.stringify(intersect(setA, setB)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="union" language="javascript" />
						<n-tag type="info">{{ JSON.stringify(union(setA, setB)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="minus" language="javascript" />
						<n-tag type="info">{{ JSON.stringify(minus(setA, setB)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="complement" language="javascript" />
						<n-tag type="info">{{ JSON.stringify(complement(setA, setB)) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="contains / all / any"
			:description="t.array.checkDesc"
			since="1.0.0"
			:tags="[t.predicate]"
			:code="`contains([1, 2, 3], 2) // true\nall([1, 2, 3], x => x > 0) // true`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<n-code code="contains([1,2,3], 2)" language="javascript" />
						<n-tag type="info">{{ contains([1, 2, 3], 2) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="all([1,2,3], x => x > 0)" language="javascript" />
						<n-tag type="info">{{ all([1, 2, 3], x => x > 0) }}</n-tag>
					</n-space>
					<n-space align="center">
						<n-code code="any([1,2,3], x => x > 2)" language="javascript" />
						<n-tag type="info">{{ any([1, 2, 3], x => x > 2) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<FunctionCard
			title="groupBy"
			:description="t.array.groupByDesc"
			since="2.0.0"
			:code="`groupBy([{ name: 'a', val: 1 }, { name: 'b', val: 2 }, { name: 'a', val: 3 }], 'name')`"
		>
			<template #result>
				<n-code
					:code="
						JSON.stringify(
							groupBy(
								[
									{ name: 'a', val: 1 },
									{ name: 'b', val: 2 },
									{ name: 'a', val: 3 },
								],
								'name'
							),
							null,
							2
						)
					"
					language="json"
				/>
			</template>
		</FunctionCard>

		<FunctionCard
			title="sortPinyin"
			:description="t.array.sortPinyinDesc"
			since="1.0.0"
			:code="`['张三', '李四', '王五'].sort(sortPinyin) // ['李四', '王五', '张三']`"
		>
			<template #input>
				<n-space>
					<n-tag>{{ JSON.stringify(pinyinInput) }}</n-tag>
					<span style="color: #999">→</span>
					<n-tag type="info">{{
						JSON.stringify([...pinyinInput].sort(sortPinyin))
					}}</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- sorter -->
		<FunctionCard
			title="sorter"
			:description="t.array.sorterDesc || 'Create sort function for locale-aware string sorting'"
			since="5.14.0"
			:code="`const items = ['b', 'a', 'c']
items.sort(sorter('en'))  // ['a', 'b', 'c']

// Chinese sorting
['啊我', '波拉', '阿吧'].sort(sorter('zh-Hans-CN'))

// Numeric sorting
['10', '2', '1'].sort(sorter('en', { numeric: true }))  // ['1', '2', '10']`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">['b', 'a', 'c'].sort(sorter('en'))</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(['b', 'a', 'c'].sort(sorter('en')))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">['10', '2', '1'].sort(sorter('en', { numeric: true }))</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(['10', '2', '1'].sort(sorter('en', { numeric: true })))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">['啊我', '波拉', '阿吧'].sort(sorter('zh-Hans-CN'))</code>
						<n-tag type="info" size="small" :bordered="false">{{
							JSON.stringify(['啊我', '波拉', '阿吧'].sort(sorter('zh-Hans-CN')))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- keyBy -->
		<FunctionCard
			title="keyBy"
			:description="t.array.keyByDesc || 'Convert array to object keyed by property'"
			since="6.0.0"
			:code="`const data = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
keyBy(data, 'id')
// { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }`"
		>
			<template #result>
				<n-space vertical>
					<code class="code-inline">keyBy(data, 'id')</code>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(keyBy(keyByInput, 'id'), null, 2)
					}}</pre>
				</n-space>
			</template>
		</FunctionCard>

		<!-- countBy -->
		<FunctionCard
			title="countBy"
			:description="t.array.countByDesc || 'Count occurrences by iteratee'"
			since="6.0.0"
			:code="`countBy([6.1, 4.2, 6.3], Math.floor) // { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length') // { '3': 2, '5': 1 }
countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type') // { 'a': 2, 'b': 1 }`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">countBy([6.1, 4.2, 6.3], Math.floor)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(countBy([6.1, 4.2, 6.3], Math.floor))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">countBy(['one', 'two', 'three'], 'length')</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(countBy(['one', 'two', 'three'], 'length'))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">countBy([{type:'a'}, {type:'b'}, {type:'a'}], 'type')</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type'))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- partition -->
		<FunctionCard
			title="partition"
			:description="t.array.partitionDesc || 'Split array into two groups by predicate'"
			since="6.0.0"
			:code="`const users = [{ user: 'barney', age: 36, active: true }, { user: 'fred', age: 40, active: false }]
partition(users, ({ active }) => active)
// [[{ user: 'barney', active: true }], [{ user: 'fred', active: false }]]
partition([1, 2, 3, 4], n => n % 2 === 0) // [[2, 4], [1, 3]]`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">partition(users, ({ active }) => active)</code>
					</n-space>
					<pre class="code-block" style="font-size: 11px">{{
						JSON.stringify(partition(partitionUsers, ({ active }) => active), null, 2)
					}}</pre>
					<n-space align="center">
						<code class="code-inline">partition([1, 2, 3, 4], n => n % 2 === 0)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(partition([1, 2, 3, 4], n => n % 2 === 0))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- findIndex / findLastIndex -->
		<FunctionCard
			title="findIndex / findLastIndex"
			:description="t.array.findIndexDesc || 'Find first or last index matching predicate'"
			since="6.0.0"
			:code="`const users = [{ user: 'barney', active: false }, { user: 'fred', active: false }, { user: 'pebbles', active: true }]
findIndex(users, ({ active }) => active) // 2
findIndex(users, { user: 'fred' }) // 1
findIndex(users, ['user', 'barney']) // 0
findLastIndex([1, 2, 3, 4], n => n > 2) // 3`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">findIndex(users, ({ active }) => active)</code>
						<n-tag type="info" size="small">{{
							findIndex(findIndexUsers, ({ active }) => active)
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">findIndex(users, { user: 'fred' })</code>
						<n-tag type="info" size="small">{{
							findIndex(findIndexUsers, { user: 'fred' })
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">findIndex(users, ['user', 'barney'])</code>
						<n-tag type="info" size="small">{{
							findIndex(findIndexUsers, ['user', 'barney'])
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">findLastIndex([1, 2, 3, 4], n => n > 2)</code>
						<n-tag type="info" size="small">{{
							findLastIndex([1, 2, 3, 4], n => n > 2)
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- drop / dropRight / take / takeRight -->
		<FunctionCard
			title="drop / dropRight / take / takeRight"
			:description="t.array.dropTakeDesc || 'Drop or take elements from start or end'"
			since="6.0.0"
			:code="`drop([1, 2, 3, 4, 5], 2) // [3, 4, 5]
dropRight([1, 2, 3, 4, 5], 2) // [1, 2, 3]
take([1, 2, 3, 4, 5], 2) // [1, 2]
takeRight([1, 2, 3, 4, 5], 2) // [4, 5]`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">drop([1, 2, 3, 4, 5], 2)</code>
						<n-tag type="info" size="small">{{ JSON.stringify(drop([1, 2, 3, 4, 5], 2)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">dropRight([1, 2, 3, 4, 5], 2)</code>
						<n-tag type="info" size="small">{{ JSON.stringify(dropRight([1, 2, 3, 4, 5], 2)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">take([1, 2, 3, 4, 5], 2)</code>
						<n-tag type="info" size="small">{{ JSON.stringify(take([1, 2, 3, 4, 5], 2)) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">takeRight([1, 2, 3, 4, 5], 2)</code>
						<n-tag type="info" size="small">{{ JSON.stringify(takeRight([1, 2, 3, 4, 5], 2)) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- differenceBy / intersectionBy / unionBy -->
		<FunctionCard
			title="differenceBy / intersectionBy / unionBy"
			:description="t.array.iterateeOpsDesc || 'Set operations with iteratee function'"
			since="6.0.0"
			:code="`differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [1.2]
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [2.1]
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x') // [{ x: 1 }, { x: 2 }]`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor))
						}}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')</code>
						<n-tag type="info" size="small">{{
							JSON.stringify(unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x'))
						}}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>

		<!-- zip / unzip -->
		<FunctionCard
			title="zip / unzip"
			:description="t.array.zipDesc || 'Combine or separate arrays element-wise'"
			since="6.0.0"
			:code="`zip(['a', 'b', 'c'], [1, 2, 3]) // [['a', 1], ['b', 2], ['c', 3]]
unzip([['a', 1], ['b', 2], ['c', 3]]) // [['a', 'b', 'c'], [1, 2, 3]]`"
		>
			<template #result>
				<n-space vertical>
					<n-space align="center">
						<code class="code-inline">zip(['a', 'b', 'c'], [1, 2, 3])</code>
						<n-tag type="info" size="small">{{ JSON.stringify(zipResult) }}</n-tag>
					</n-space>
					<n-space align="center">
						<code class="code-inline">unzip([['a', 1], ['b', 2], ['c', 3]])</code>
						<n-tag type="info" size="small">{{ JSON.stringify(unzipResult) }}</n-tag>
					</n-space>
				</n-space>
			</template>
		</FunctionCard>
	</div>
</template>
