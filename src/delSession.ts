/**
 * 删除sessionStorage
 *
 * @param name - 名称
 */
function delSession(name: string) {
    sessionStorage.removeItem(name)
}

export default delSession
