/**
 * 删除localStorage
 *
 * @param name - 名称
 */
export function delCache(name: string) {
	localStorage.removeItem(name)
}

export default delCache
