<script setup lang="ts">
import { ref } from 'vue'
import { NH1, NInput, NTag, NSpace } from 'naive-ui'
import FunctionCard from '@/components/FunctionCard.vue'
import { isEmail, isPhone, isURL, isIDCard, isCreditCard, validation } from 'js-cool'
import { useI18n } from '@/locales'

const { t } = useI18n()

const emailInput = ref('test@example.com')
const phoneInput = ref('13800138000')
const urlInput = ref('https://example.com')
const idCardInput = ref('11010519491231002X')
const creditCardInput = ref('4111111111111111')

const patternResults = [
	{ name: 'email', test: 'test@example.com', result: validation.email.test('test@example.com') },
	{ name: 'mobile (CN)', test: '13800138000', result: validation.mobile.test('13800138000') },
	{
		name: 'url',
		test: 'https://example.com',
		result: validation.url.test('https://example.com'),
	},
	{ name: 'number', test: '123.45', result: validation.number.test('123.45') },
	{ name: 'chinese', test: '中', result: validation.chinese.test('中') },
	{ name: 'qq', test: '123456789', result: validation.qq.test('123456789') },
	{ name: 'ipv4', test: '192.168.1.1', result: validation.ipv4.test('192.168.1.1') },
	{ name: 'ipv6', test: '2001:db8::1', result: validation.ipv6.test('2001:db8::1') },
	{
		name: 'ipv4Private',
		test: '192.168.1.1',
		result: validation.ipv4Private.test('192.168.1.1'),
	},
	{ name: 'mac', test: '00:1A:2B:3C:4D:5E', result: validation.mac.test('00:1A:2B:3C:4D:5E') },
	{ name: 'postcode', test: '100000', result: validation.postcode.test('100000') },
	{ name: 'username', test: 'user_name-123', result: validation.username.test('user_name-123') },
	{ name: 'password', test: 'abc123XYZ', result: validation.password.test('abc123XYZ') },
	{
		name: 'idCard',
		test: '11010519491231002X',
		result: validation.idCard.test('11010519491231002X'),
	},
	{ name: 'hexColor', test: '#ffffff', result: validation.hexColor.test('#ffffff') },
	{ name: 'uuid', test: '550e8400-e29b-41d4-a716-446655440000', result: validation.uuid.test('550e8400-e29b-41d4-a716-446655440000') },
	{ name: 'semver', test: '1.2.3-beta.1', result: validation.semver.test('1.2.3-beta.1') },
	{ name: 'base64', test: 'SGVsbG8gV29ybGQ=', result: validation.base64.test('SGVsbG8gV29ybGQ=') },
	{ name: 'slug', test: 'hello-world-123', result: validation.slug.test('hello-world-123') },
	{ name: 'bankCard', test: '6222021234567890', result: validation.bankCard.test('6222021234567890') },
	{ name: 'creditCard', test: '4111111111111111', result: validation.creditCard.test('4111111111111111') },
	{ name: 'date', test: '2024-01-15', result: validation.date.test('2024-01-15') },
	{ name: 'time', test: '23:59:59', result: validation.time.test('23:59:59') },
	{ name: 'datetime', test: '2024-01-15 12:30:00', result: validation.datetime.test('2024-01-15 12:30:00') },
]
</script>

<template>
	<div>
		<n-h1>Validate</n-h1>
		<p style="color: #666; margin-bottom: 24px">{{ t.categoriesDesc.Validate }}</p>

		<!-- isEmail -->
		<FunctionCard
			title="isEmail"
			description="Validate email address"
			since="6.0.0"
			:code="`isEmail('test@example.com') // true
isEmail('invalid-email') // false`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="emailInput" style="width: 300px" />
					<n-tag :type="isEmail(emailInput) ? 'success' : 'error'" size="small">
						{{ isEmail(emailInput) ? 'Valid' : 'Invalid' }}
					</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isPhone -->
		<FunctionCard
			title="isPhone"
			description="Validate Chinese mobile phone number"
			since="6.0.0"
			:code="`isPhone('13800138000') // true
isPhone('12345678901') // false`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="phoneInput" style="width: 300px" />
					<n-tag :type="isPhone(phoneInput) ? 'success' : 'error'" size="small">
						{{ isPhone(phoneInput) ? 'Valid' : 'Invalid' }}
					</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isURL -->
		<FunctionCard
			title="isURL"
			description="Validate URL"
			since="6.0.0"
			:code="`isURL('https://example.com') // true
isURL('invalid-url') // false`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="urlInput" style="width: 300px" />
					<n-tag :type="isURL(urlInput) ? 'success' : 'error'" size="small">
						{{ isURL(urlInput) ? 'Valid' : 'Invalid' }}
					</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isIDCard -->
		<FunctionCard
			title="isIDCard"
			description="Validate Chinese ID card number"
			since="6.0.0"
			:code="`isIDCard('11010519491231002X') // true`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="idCardInput" style="width: 300px" />
					<n-tag :type="isIDCard(idCardInput) ? 'success' : 'error'" size="small">
						{{ isIDCard(idCardInput) ? 'Valid' : 'Invalid' }}
					</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- isCreditCard -->
		<FunctionCard
			title="isCreditCard"
			description="Validate credit card number"
			since="6.0.0"
			:code="`isCreditCard('4111111111111111') // true`"
		>
			<template #input>
				<n-space align="center">
					<n-input v-model:value="creditCardInput" style="width: 300px" />
					<n-tag :type="isCreditCard(creditCardInput) ? 'success' : 'error'" size="small">
						{{ isCreditCard(creditCardInput) ? 'Valid' : 'Invalid' }}
					</n-tag>
				</n-space>
			</template>
		</FunctionCard>

		<!-- validation -->
		<FunctionCard
			title="validation"
			description="Validation regex patterns collection (NEW in v6.0.0)"
			since="6.0.0"
			:code="`import { validation } from 'js-cool'

validation.email.test('test@example.com') // true
validation.mobile.test('13800138000') // true
validation.url.test('https://example.com') // true
validation.ipv4.test('192.168.1.1') // true
validation.idCard.test('11010519491231002X') // true`"
		>
			<template #result>
				<div style="overflow-x: auto">
					<table style="width: 100%; font-size: 14px; border-collapse: collapse">
						<thead>
							<tr style="border-bottom: 1px solid #ddd">
								<th style="text-align: left; padding: 8px">Pattern</th>
								<th style="text-align: left; padding: 8px">Test Value</th>
								<th style="text-align: center; padding: 8px">Result</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="item in patternResults"
								:key="item.name"
								style="border-bottom: 1px solid #eee"
							>
								<td style="padding: 8px">
									<code>validation.{{ item.name }}</code>
								</td>
								<td style="padding: 8px">
									<code>{{ item.test }}</code>
								</td>
								<td style="text-align: center; padding: 8px">
									<n-tag :type="item.result ? 'success' : 'error'" size="small">{{
										item.result
									}}</n-tag>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</template>
		</FunctionCard>
	</div>
</template>
