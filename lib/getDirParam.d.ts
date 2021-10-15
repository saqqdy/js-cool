export interface DirParamType {
    path?: string[];
    host?: string;
}
/**
 * 获取目录形式URL参数
 *
 * @param url - 传入url地址
 * @returns 返回参数对象
 */
export declare function getDirParam(url: string): DirParamType;
export default getDirParam;
