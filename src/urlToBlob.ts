/**
 * url to blob
 *
 * @since 5.13.0
 * @param input - url
 * @returns - blob
 */
function urlToBlob(input: string): Promise<Blob | null> {
	return new Promise((resolve, reject) => {
		if (!fetch) {
			const xhr = new XMLHttpRequest()
			xhr.open('get', input, true)
			xhr.responseType = 'blob'
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(xhr.response)
				}
			}
			xhr.onerror = reject
			xhr.send()
		} else {
			fetch(input)
				.then(res => {
					resolve(res.blob())
				})
				.catch(reject)
		}
	})
}

export default urlToBlob
