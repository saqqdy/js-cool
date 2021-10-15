/**
 * 文件后缀名
 *
 * @example
 * ```js
 * getFileType('http://www.saqqdy.com/test.jpg'); // .jpg;
 * ```
 * @example
 * ```js
 * getFileType('http://www.saqqdy.com/test.JPEG'); // .jpeg;
 * ```
 * @param url - 文件名
 * @returns 返回文件后缀
 */
export function getFileType(url: string): string {
    if (typeof url != 'string' || url == '') {
        return ''
    }
    var type = /\.[^\.]+$/.exec(url) // [".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]
    return type ? type[0].toLowerCase() : ''
}

export default getFileType
