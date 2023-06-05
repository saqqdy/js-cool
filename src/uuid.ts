/**
 * Browser-side generation of uuid, using v4 method
 *
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
const uuid = (): string =>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
	)

export default uuid
