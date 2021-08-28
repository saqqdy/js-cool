export interface SearchkeySet {
    childName: string;
    keyName: string;
    [prop: string]: any;
}
/**
 * tree对象深度查找
 *
 * @param tree - 树形对象
 * @param expression - 必填 查询方式
 * @param keySet - 选填 默认的子类名称、查询name
 * @param number - 选填 查找个数，不传则查询全部
 * @returns 返回查询到的数组
 */
declare function searchTreeObject(tree: object | any[], expression: any, keySet: SearchkeySet, number?: number): any[];
export default searchTreeObject;
