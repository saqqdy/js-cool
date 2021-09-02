/**
 * addEvent()事件委托，支持多次委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
export declare function addEvent(element: AnyObject, type: string, handler: AnyFunction): void;

export declare namespace addEvent {
    var guid: number;
}

/**
 * 如果所提供的谓词函数对一个集合中的所有元素都返回true，则返回true，否则返回false。
 *
 * @example
 * ```js
 * all([4, 2, 3], x => x > 1); // true
 * ```
 * @example
 * ```js
 * all([1, 2, 3]); // true
 * ```
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
export declare const all: (arr: any[], fn: AnyFunction) => boolean;

/**
 * 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
 *
 * @example
 * ```js
 * any([0, 1, 2, 0], x => x >= 2); // true
 * ```
 * @example
 * ```js
 * any([0, 0, 1, 0]); // true
 * ```
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
export declare const any: (arr: any[], fn: AnyFunction) => boolean;

export declare interface AnyFunction extends AnyObject {
    (...args: any[]): any
}

export declare interface AnyObject {
    [prop: string]: any
}

export declare type ArrayOneMore<T> = {
    0: T
} & Array<T>

/**
 * 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
 *
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
 * ```
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
 * ```
 * @example
 * ```js
 * arrayToCSV([['a', '"b" great'], ['c', 3.1415]]); // '"a","""b"" great"\n"c",3.1415'
 * ```
 * @param data - json数据
 * @param delimiter - 分隔符，默认','
 * @returns CSV数据
 */
export declare const arrayToCSV: (arr: any[], delimiter?: string) => string;

/**
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
export declare function camel2Dash(string: string): string;

/**
 * 数据清洗方法
 *
 * @param data - 要清洗的对象，必传
 * @param  map - 需要的数据队列，可传数组或者对象
 * @param map -
 * @param nullFix -
 * @param map -
 * @param nullFix -
 * @param nullFix - 选填，没有对应属性时返回的值，默认不返回该属性
 * @returns 返回清洗后的对象
 */
export declare function cleanData(data: any, map: any[] | AnyObject, nullFix?: any): any;

/**
 * 去除HTML标签所有属性
 *
 * @param string - 传入字符串
 * @returns newString
 */
export declare function clearAttr(string: string): string;

/**
 * 去除换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export declare function clearBr(string: string): string;

/**
 * 去除HTML标签
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export declare function clearHtml(string: string): string;

/**
 * 去除HTML标签保留空格、换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export declare function clearHtmlExpSN(string: string): string;

/**
 * 去除HTML标签及换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export declare function clearHtmlN(string: string): string;

/**
 * 去除HTML标签及空格、换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export declare function clearHtmlNS(string: string): string;

/**
 * 去除HTML标签及标签里面的文字
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
export declare function clearHtmlTag(string: string): string;

/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 *
 * @param name - 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param userAgent - 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
export declare const client: (name?: string, userAgent?: string) => boolean | {
    IE: boolean;
    GECKO: boolean;
    WEBKIT: boolean;
    OPERA: boolean;
    TRIDENT: boolean;
    MOBILE: boolean;
    IOS: boolean;
    ANDROID: boolean;
    IPHONE: boolean;
    IPAD: boolean;
    QQBROWSER: boolean;
    WEIXIN: boolean;
    QQ: boolean;
};

/**
 * 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
 *
 * @example
 * ```js
 * CSVToArray('a,b\\nc,d'); // `[['a','b'],['c','d']]`;
 * ```
 * @example
 * ```js
 * CSVToArray('a;b\\nc;d', ';'); // `[['a','b'],['c','d']]`;
 * ```
 * @example
 * ```js
 * CSVToArray('col1,col2\\na,b\\nc,d', ',', true); // `[['a','b'],['c','d']]`;
 * ```
 * @param data - csv数据
 * @param delimiter - 分隔符，默认','
 * @param omitFirstRow - 第一行是表头数据，默认false
 * @returns array
 */
export declare const CSVToArray: (data: string, delimiter?: string, omitFirstRow?: boolean) => string[][];

/**
 * 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
 *
 * @example
 * ```js
 * CSVToJSON('col1,col2\\na,b\\nc,d'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
 * ```
 * @example
 * ```js
 * CSVToJSON('col1;col2\\na;b\\nc;d', ';'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
 * ```
 * @param data - csv数据
 * @param delimiter - 分隔符，默认','
 * @returns json
 */
export declare function CSVToJSON(data: string, delimiter?: string): any[];

/**
 * js截取字符串，中英文都能用
 * @private
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
/**
 * 截取字符串，中文算2个字节
 *
 * @param str - 要截取的字符串
 * @param len -
 * @param hasDot -
 * @returns 返回截取后的字符串
 */
export declare function cutCHSString(str: string, len?: number, hasDot?: boolean): string;

/**
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
export declare function dash2Camel(string: string): string;

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 *
 * @param fn - 要调用的函数
 * @param delay - 空闲时间
 * @param immediate - 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return 实际调用函数
 */
export declare function debounce(fn: AnyFunction, delay: number, immediate: boolean): () => void;

/**
 * base64解码
 *
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
export declare function decodeBase64(input: string): string;

/**
 * 解码Utf8
 *
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
export declare function decodeUtf8(utftext: string): string;

declare const _default: {
    client: (name?: string, userAgent?: string) => boolean | {
        IE: boolean;
        GECKO: boolean;
        WEBKIT: boolean;
        OPERA: boolean;
        TRIDENT: boolean;
        MOBILE: boolean;
        IOS: boolean;
        ANDROID: boolean;
        IPHONE: boolean;
        IPAD: boolean;
        QQBROWSER: boolean;
        WEIXIN: boolean;
        QQ: boolean;
    };
    pattern: {
        any: RegExp;
        number: RegExp;
        string: RegExp;
        postcode: RegExp;
        url: RegExp;
        username: RegExp;
        float: RegExp;
        email: RegExp;
        mobile: RegExp;
        chinese: RegExp;
        tel: RegExp;
        qq: RegExp;
        pass: RegExp;
        json: RegExp;
        arrjson: RegExp;
        array: RegExp;
        isjson: RegExp;
        textarea: RegExp;
    };
    trim: typeof trim;
    clearAttr: typeof clearAttr;
    clearBr: typeof clearBr;
    clearHtml: typeof clearHtml;
    clearHtmlExpSN: typeof clearHtmlExpSN;
    clearHtmlN: typeof clearHtmlN;
    clearHtmlNS: typeof clearHtmlNS;
    clearHtmlTag: typeof clearHtmlTag;
    getNumber: typeof getNumber;
    imgAdapt: typeof imgAdapt;
    imgChoose: typeof imgChoose;
    camel2Dash: typeof camel2Dash;
    dash2Camel: typeof dash2Camel;
    upperFirst: typeof upperFirst;
    getRandomNum: typeof getRandomNum;
    getRandomStr: typeof getRandomStr;
    getRandomStrWidthSpecialChar: typeof getRandomStrWidthSpecialChar;
    getCHSLength: typeof getCHSLength;
    cutCHSString: typeof cutCHSString;
    textareaInsertText: typeof textareaInsertText;
    textareaMoveToEnd: typeof textareaMoveToEnd;
    isDigitals: typeof isDigitals;
    isExitsFunction: typeof isExitsFunction;
    isExitsVariable: typeof isExitsVariable;
    getWindowSize: typeof getWindowSize;
    getAppVersion: typeof getAppVersion;
    getOsVersion: typeof getOsVersion;
    getIsAppVersionLastest: typeof getIsAppVersionLastest;
    getDirParam: typeof getDirParam;
    getParameter: typeof getParameter;
    getFileType: typeof getFileType;
    getUrlParam: typeof getUrlParam;
    formatTime: typeof formatTime;
    formatTimeStr: typeof formatTimeStr;
    setCookie: typeof setCookie;
    setCache: typeof setCache;
    setSession: typeof setSession;
    getCookie: typeof getCookie;
    getCache: typeof getCache;
    getSession: typeof getSession;
    delCookie: typeof delCookie;
    delCache: typeof delCache;
    delSession: typeof delSession;
    encodeBase64: typeof encodeBase64;
    encodeUtf8: typeof encodeUtf8;
    decodeBase64: typeof decodeBase64;
    decodeUtf8: typeof decodeUtf8;
    enWxJumpLink: typeof enWxJumpLink;
    enWxJumpLinkOld: typeof enWxJumpLinkOld;
    deWxJumpLink: typeof deWxJumpLink;
    deWxJumpLinkOld: typeof deWxJumpLinkOld;
    debounce: typeof debounce;
    throttle: typeof throttle;
    stopBubble: typeof stopBubble;
    stopDefault: typeof stopDefault;
    addEvent: typeof addEvent;
    removeEvent: typeof removeEvent;
    getScrollPosition: () => string | void;
    nextIndex: typeof nextIndex;
    fixNumber: typeof fixNumber;
    delay: typeof delay;
    extend: <T>(target: boolean | T, ...args: ArrayOneMore<any>) => boolean | T;
    getType: typeof getType;
    isArray: typeof isArray;
    cleanData: typeof cleanData;
    download: typeof download;
    searchTreeObject: typeof searchTreeObject;
    openUrl: typeof openUrl;
    splitThousand: typeof splitThousand;
    all: (arr: any[], fn: AnyFunction) => boolean;
    any: (arr: any[], fn: AnyFunction) => boolean;
    uuid: () => string;
    arrayToCSV: (arr: any[], delimiter?: string) => string;
    CSVToArray: (data: string, delimiter?: string, omitFirstRow?: boolean) => string[][];
    CSVToJSON: typeof CSVToJSON;
    JSONToCSV: (arr: any[], columns: any[], delimiter?: string) => string;
    RGBToHex: (r: number, g: number, b: number) => string;
};
export default _default;

/**
 * 防抖节流
 *
 * @returns class
 */
export declare function delay(): {
    map: any;
    register(id: string, fn: AnyFunction, time: number, boo: boolean): void;
    destroy(id: string): void;
};

/**
 * 删除localStorage
 *
 * @param name - 名称
 */
export declare function delCache(name: string): void;

/**
 * 删除cookie
 *
 * @param name - cookie名称
 */
export declare function delCookie(name: string): void;

/**
 * 删除sessionStorage
 *
 * @param name - 名称
 */
export declare function delSession(name: string): void;

/**
 * 用=替换* 用&替换! 解码成微信跳转链接
 * name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866
 *
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
export declare function deWxJumpLink(string: string): string;

/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 *
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
export declare function deWxJumpLinkOld(string: string): string;

/**
 * 文件下载的几种方式：
 * 1. 针对一些浏览器无法识别的文件格式。地址栏输入文件URL、window.location.href = URL、window.open(URL)；
 * 2. 使用a标签download属性（或者js创建a标签）；
 * 3. 浏览器可识别的pdf、txt文件，后端兼容处理attachment；
 * 4. 在header增加token用于鉴权下载，使用XmlHttpRequest来想后台发起请求
 *
 * @param url - 链接
 * @param filename - 文件名
 * @param type - 下载类型 'href','open','download','request'
 */
export declare function download(url: string, filename: string, type?: string): void;

/**
 * 字符串、数字转base64
 *
 * @param input - 需要编码的字符串
 * @returns 返回BASE64编码
 */
export declare function encodeBase64(input: string): string;

/**
 * 编码Utf8
 *
 * @param input - 需要编码的字符串
 * @returns 返回UTF-8编码
 */
export declare function encodeUtf8(string: string): string;

/**
 * 用*替换= 用!替换& 转码成微信跳转链接
 * name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866
 *
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
export declare function enWxJumpLink(string: string): string;

/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 *
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
export declare function enWxJumpLinkOld(string: string): string;

export declare let extend: <T>(target: boolean | T, ...args: ArrayOneMore<any>) => boolean | T;

/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
export declare function fixNumber(number: string | number, n?: number): string | number;

/**
 * 日期格式化插件
 *
 * @example 使用方式
 * ```js
 * formatTime(new Date(), "yyyy-MM-dd")
 * ```
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
export declare function formatTime(time: Date | string, fmt?: string): string;

/**
 * 格式化时间成：刚刚、几分钟前
 *
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
export declare function formatTimeStr(time: string | number, fmt: string): string;

/**
 * 获取APP版本号
 *
 * @param appName - app名称
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
export declare function getAppVersion(appName: string, withappstr: boolean, userAgent: string): string | boolean | null;

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
export declare function getCache(name: string): any;

/**
 * 获取文本长度，中文算2个字节
 *
 * @param str - 字符串
 * @returns 返回长度
 */
export declare function getCHSLength(str: string): number;

/**
 * 读取cookies
 *
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
export declare function getCookie(name: string): string | null;

/**
 * 获取目录形式URL参数
 *
 * @param url - 传入url地址
 * @returns 返回参数对象
 */
export declare function getDirParam(url: string): {
    [prop: string]: any;
};

/**
 * 文件后缀名
 *
 * @param url - 文件名
 * @returns 返回文件后缀
 */
export declare function getFileType(url: string): string | null;

/**
 * 版本号大小对比
 *
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
export declare function getIsAppVersionLastest(appName: string, compareVer: string, userAgent: string): boolean | null;

/**
 * 获取字符串中的数字
 *
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
export declare function getNumber(string: string): string;

/**
 * 获取手机系统版本
 *
 * @param osName - 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
export declare function getOsVersion(osName: string, withosstr: boolean, userAgent: string): string | boolean | null;

/**
 * 获取单个URL参数
 *
 * @param name - 参数名称
 * @returns 返回参数值
 */
export declare function getParameter(name: string): string | null;

/**
 * 获取随机整数
 *
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
export declare function getRandomNum(min?: number, max?: number): number;

/**
 * 获取随机字符串
 *
 * @param len - 需要获取随机字符串的长度
 * @param widthSpecialChar - 可选，是否需要生成带特殊字符的串
 * @returns 随机串
 */
export declare function getRandomStr(len?: number, widthSpecialChar?: boolean): string;

/**
 * 获取随机字符串带特殊符号
 *
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
export declare function getRandomStrWidthSpecialChar(len?: number): string;

/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 *
 * @returns 返回位置
 */
export declare const getScrollPosition: () => string | void;

/**
 * 读取sessionStorage
 *
 * @param name - 名称
 * @returns 返回sessionStorage
 */
export declare function getSession(name: string): any;

/**
 * 获取目标类型
 *
 * @param target - 目标
 * @returns 类型
 */
export declare function getType(target: any): string;

/**
 * 获取URL参数
 *
 * @param url - 传入url参数
 * @returns 返回参数列表
 */
export declare function getUrlParam(url: string): object;

/**
 * getWindowSize获取窗口大小
 *
 * @returns 返回宽高
 */
export declare function getWindowSize(): WindowSizeObj;

/**
 * 扩展图片自动适应多种分辨率small original
 *
 * @param imgurl - 图片url
 * @param size - 图片规格
 * @returns 返回新地址
 */
export declare function imgAdapt(imgurl: string, size: string): string | false;

/**
 * 扩展图片自动适应多种分辨率`@2x @3x`
 *
 * @param imgurl - 图片地址
 * @returns 返回新地址
 */
export declare function imgChoose(imgurl: string): string;

/**
 * 判断是否数组
 *
 * @param arr -
 */
export declare function isArray(arr: any): arr is any[];

/**
 * 是否为由数字组成的字符串
 *
 * @param str - 待检测的字符串
 * @returns 返回true/false
 */
export declare function isDigitals(str: any): boolean;

/**
 * 是否存在指定函数
 *
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
export declare function isExitsFunction(funcName: string): boolean;

/**
 * 是否存在指定变量
 *
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
export declare function isExitsVariable(variableName: string): boolean;

/**
 * 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
 *
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
 * ```
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
 * ```
 * @param data - json数据
 * @param columns - 指定列
 * @param delimiter - 分隔符，默认','
 * @returns CSV数据
 */
export declare const JSONToCSV: (arr: any[], columns: any[], delimiter?: string) => string;

/**
 * 返回下一个zIndex值
 *
 * @param min - 可选，最小值
 * @param max - 可选，最大值
 * @returns 数字
 */
export declare function nextIndex(min?: number, max?: number): number;

/**
 * 新标签页打开链接（浏览器不能解析的文件跳转下载）
 *
 * @param url - 链接
 */
export declare function openUrl(url: string): void;

export declare const pattern: {
    any: RegExp;
    number: RegExp;
    string: RegExp;
    postcode: RegExp;
    url: RegExp;
    username: RegExp;
    float: RegExp;
    email: RegExp;
    mobile: RegExp;
    chinese: RegExp;
    tel: RegExp;
    qq: RegExp;
    pass: RegExp;
    json: RegExp;
    arrjson: RegExp;
    array: RegExp;
    isjson: RegExp;
    textarea: RegExp;
};

/**
 * removeEvent移除由addEvent创建的事件委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
export declare function removeEvent(element: AnyObject, type: string, handler: AnyFunction): void;

/**
 * 将RGB组件的值转换为颜色代码。
 *
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param r - RGB第1个值
 * @param g - RGB第2个值
 * @param b - RGB第3个值
 * @returns hex值
 */
export declare const RGBToHex: (r: number, g: number, b: number) => string;

export declare interface SearchkeySet {
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
export declare function searchTreeObject(tree: object | any[], expression: any, keySet: SearchkeySet, number?: number): any[];

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @param value - 缓存数据，可以直接传入Object
 * @param seconds -缓存时间（秒）
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
export declare function setCache(name: string, value: any, seconds: number): void;

/**
 * setCookie写入cookie的方法
 *
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
export declare function setCookie(name: string, value: any, seconds?: number, path?: string, samesite?: boolean): void;

/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
export declare function setSession(name: string, value: any, seconds: number): void;

/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
export declare function splitThousand(val: string | number): string | 0;

/**
 * 阻止冒泡
 *
 * @param e - dom的event对象
 * @returns bool false
 */
export declare function stopBubble(e: Event): boolean;

/**
 * 阻止默认事件
 *
 * @param e - dom的event对象
 * @returns bool false
 */
export declare function stopDefault(e: Event): boolean;

/**
 * textarea或input对象在指定的光标位置插入文字
 *
 * @param obj-  dom对象
 * @param str - 要插入的文字
 */
export declare function textareaInsertText(obj: HTMLTextAreaElement, str: string): void;

/**
 * textarea或input对象将光标定位到文字尾部
 *
 * @param obj - dom对象
 */
export declare function textareaMoveToEnd(obj: HTMLTextAreaElement): void;

/**
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 *
 * @param fn - 需要调用的函数
 * @param delay - 延迟时间，单位毫秒
 * @param immediate - 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return 实际调用函数
 */
export declare function throttle(fn: AnyFunction, delay: number, immediate: boolean, debounce: boolean): () => void;

/**
 * trim()根据传参来去除空格
 *
 * @param string - 传入字符串
 * @param type - 可选，去除空格的类型l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格
 * @returns 返回新字符串
 */
export declare function trim(string: string, type?: string): string | void;

/**
 * 首字母大写
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
export declare function upperFirst(string: string): string;

/**
 * 浏览器端生成uuid，采用v4方法
 *
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
export declare const uuid: () => string;

export declare interface WindowSizeObj {
    width: number;
    height: number;
}

export { }
