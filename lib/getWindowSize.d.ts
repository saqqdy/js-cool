/**
 * getWindowSize获取窗口大小
 * @returns 返回宽高
 */
export interface WindowSizeObj {
    width: number;
    height: number;
}
declare function getWindowSize(): WindowSizeObj;
export default getWindowSize;
