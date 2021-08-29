/**
 * 获取目录形式URL参数
 *
 * @param url - 传入url地址
 * @returns 返回参数对象
 */
declare function getDirParam(url: string): {
    [prop: string]: any;
};
export default getDirParam;
