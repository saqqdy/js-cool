export interface WindowSizeObj {
    width: number;
    height: number;
}
/**
 * getWindowSize获取窗口大小
 *
 * @returns 返回宽高
 */
declare function getWindowSize(): WindowSizeObj;
export default getWindowSize;
