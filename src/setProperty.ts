/**
 * 根据路径字符串设置数组、对象属性值
 *
 * @example
 * ```js
 * const target = {
 *      a: 1,
 *      b: [{
 *          c: 2
 *      }]
 * }
 * setProperty(target, 'a') // 1
 * setProperty(target, 'b[0].c') // 2
 * setProperty(target, () => 'a') // 1
 * ```
 * @param target - 目标数组、对象
 * @param prop - 设置目标，可传function，'a' | 'a[1].c'
 * @returns 返回对应的值
 */
function setProperty(
    target: any,
    prop: string | { (): string },
    value: any
): any {
    if (!target) throw new Error('请传入target')
    if (!prop) throw new Error('请传入prop')
    if (prop instanceof Function) prop = prop()
    const arr = prop.split('.')
    let _target = target

    arr.forEach((p, i) => {
        let index = -1
        // p = p.replace(/\[(\d+)\]$/, (str, num) => ((index = parseInt(num)), ''))
        p = p.replace(/\[(\d+)\]$/, (str, num) => {
            index = parseInt(num)
            return ''
        })
        if (i !== arr.length - 1) {
            if (p) {
                _target[p] ??= {}
                _target = _target[p]
            }
            if (index !== -1 && _target) {
                _target[index] ??= []
                _target = _target[index]
            }
        } else {
            if (index !== -1) {
                if (p) {
                    _target[p] ??= []
                    _target = _target[p]
                }
                _target[index] = value
            } else if (p) {
                _target[p] = value
            }
        }
    })
    return target
}

export default setProperty
