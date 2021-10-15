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
export declare function getFileType(url: string): string;
export default getFileType;
