export declare const addEvent: {
    (element: AnyElement, type: string, handler: CustomAnyFunction): void;
    guid: number;
};

export declare const all: (arr: any[], fn: AnyFunction) => boolean;

export declare const any: (arr: any[], fn: AnyFunction) => boolean;

declare interface AnyElement extends Node {
    events?: any
    [prop: string]: any
}

declare interface AnyFunction {
    (...args: any[]): any
}

declare interface AnyObject {
    [prop: string]: any
}

/**
 * @description 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
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
 * camel2Dash
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
export declare const camel2Dash: (string: string) => string;

export declare function cleanData(data: any, map: any[] | AnyObject, nullFix?: any): any;

/**
 * 去除HTML标签所有属性
 * @param string - 传入字符串
 * @returns
 */
export declare const clearAttr: (string: string) => string;

/**
 * 去除换行
 * @param string - 带html标签的字符串
 * @returns
 */
export declare const clearBr: (string: string) => string;

/**
 * 去除HTML标签
 * @param string - 带html标签的字符串
 * @returns
 */
export declare const clearHtml: (string: string) => string;

/**
 * 去除HTML标签保留空格、换行
 * @param string - 带html标签的字符串
 * @returns
 */
export declare const clearHtmlExpSN: (string: string) => string;

/**
 * 去除HTML标签及换行
 * @param string - 带html标签的字符串
 * @returns
 */
export declare const clearHtmlN: (string: string) => string;

/**
 * 去除HTML标签及空格、换行
 * @param string - 带html标签的字符串
 * @returns
 */
export declare const clearHtmlNS: (string: string) => string;

/**
 * 去除HTML标签及标签里面的文字
 * @param string - 带html标签的字符串
 * @returns
 */
export declare const clearHtmlTag: (string: string) => string;

/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
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
 * @description 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
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
 * @description 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
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
export declare const CSVToJSON: (data: string, delimiter?: string) => any[];

declare interface CustomAnyFunction extends AnyFunction {
    $$guid: number;
}

declare interface CustomAnyFunction_2 extends AnyFunction {
    $$guid: number;
}

/**
 * js截取字符串，中英文都能用
 * @private
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
/**
 * 截取字符串，中文算2个字节
 * @param str - 要截取的字符串
 * @param len -
 * @param hasDot -
 * @returns 返回截取后的字符串
 */
export declare function cutCHSString(str: string, len?: number, hasDot?: boolean): string;

/**
 * dash2Camel
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
export declare const dash2Camel: (string: string) => string;

export declare const debounce: (fn: AnyFunction, delay: number, immediate: boolean) => () => void;

/**
 * base64解码
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
export declare const decodeBase64: (input: string) => string;

/**
 * 解码Utf8
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
export declare var decodeUtf8: (utftext: string) => string;

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
    trim: (string: string, type?: string) => string | void;
    clearAttr: (string: string) => string;
    clearBr: (string: string) => string;
    clearHtml: (string: string) => string;
    clearHtmlExpSN: (string: string) => string;
    clearHtmlN: (string: string) => string;
    clearHtmlNS: (string: string) => string;
    clearHtmlTag: (string: string) => string;
    getNumber: (string: string) => string;
    imgAdapt: (imgurl: string, size: string) => string | false;
    imgChoose: (imgurl: string) => string;
    camel2Dash: (string: string) => string;
    dash2Camel: (string: string) => string;
    upperFirst: (string: string) => string;
    getRandomNum: (min?: number, max?: number) => number;
    getRandomStr: (len?: number, widthSpecialChar?: boolean) => string;
    getRandomStrWidthSpecialChar: (len?: number) => string;
    getCHSLength: typeof getCHSLength;
    cutCHSString: typeof cutCHSString;
    textareaInsertText: typeof textareaInsertText;
    textareaMoveToEnd: typeof textareaMoveToEnd;
    isDigitals: (str: any) => boolean;
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
    encodeBase64: (input: string) => string;
    encodeUtf8: (string: string) => string;
    decodeBase64: (input: string) => string;
    decodeUtf8: (utftext: string) => string;
    enWxJumpLink: (string: string) => string;
    enWxJumpLinkOld: (string: string) => string;
    deWxJumpLink: (string: string) => string;
    deWxJumpLinkOld: (string: string) => string;
    debounce: (fn: AnyFunction, delay: number, immediate: boolean) => () => void;
    throttle: (fn: AnyFunction, delay: number, immediate: boolean, debounce: boolean) => () => void;
    stopBubble: typeof stopBubble;
    stopDefault: typeof stopDefault;
    addEvent: {
        (element: AnyElement, type: string, handler: CustomAnyFunction): void;
        guid: number;
    };
    removeEvent: typeof removeEvent;
    getScrollPosition: () => string | void;
    nextIndex: typeof nextIndex;
    fixNumber: typeof fixNumber;
    delay: typeof delay;
    extend: (target: any) => any;
    getType: typeof getType;
    isArray: typeof isArray;
    cleanData: typeof cleanData;
    download: (url: string, filename: string, type?: string) => void;
    searchTreeObject: typeof searchTreeObject;
    openUrl: typeof openUrl;
    splitThousand: typeof splitThousand;
    all: (arr: any[], fn: AnyFunction) => boolean;
    any: (arr: any[], fn: AnyFunction) => boolean;
    uuid: () => string;
    arrayToCSV: (arr: any[], delimiter?: string) => string;
    CSVToArray: (data: string, delimiter?: string, omitFirstRow?: boolean) => string[][];
    CSVToJSON: (data: string, delimiter?: string) => any[];
    JSONToCSV: (arr: any[], columns: any[], delimiter?: string) => string;
    RGBToHex: (r: number, g: number, b: number) => string;
};
export default _default;

export declare function delay(): {
    map: any;
    register(id: string, fn: AnyFunction, time: number, boo: boolean): void;
    destroy(id: string): void;
};

/**
 * 删除localStorage
 * @param name - 名称
 */
export declare function delCache(name: string): void;

/**
 * 删除cookie
 * @param name - cookie名称
 */
export declare function delCookie(name: string): void;

/**
 * 删除sessionStorage
 * @param name - 名称
 */
export declare function delSession(name: string): void;

/**
 * 用=替换* 用&替换! 解码成微信跳转链接
 * name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
export declare const deWxJumpLink: (string: string) => string;

/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
export declare const deWxJumpLinkOld: (string: string) => string;

/**
 * @description 文件下载的几种方式：1. 针对一些浏览器无法识别的文件格式。地址栏输入文件URL、window.location.href = URL、window.open(URL)；2. 使用a标签download属性（或者js创建a标签）；3. 浏览器可识别的pdf、txt文件，后端兼容处理attachment；4. 在header增加token用于鉴权下载，使用XmlHttpRequest来想后台发起请求
 * @param url - 链接
 * @param filename - 文件名
 * @param type - 下载类型 'href','open','download','request'
 */
export declare const download: (url: string, filename: string, type?: string) => void;

/**
 * 字符串、数字转base64
 * @param input - 需要编码的字符串
 * @returns 返回BASE64编码
 */
export declare const encodeBase64: (input: string) => string;

/**
 * 编码Utf8
 * @param input - 需要编码的字符串
 * @returns 返回UTF-8编码
 */
export declare const encodeUtf8: (string: string) => string;

/**
 * 用*替换= 用!替换& 转码成微信跳转链接
 * name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
export declare const enWxJumpLink: (string: string) => string;

/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
export declare const enWxJumpLinkOld: (string: string) => string;

export declare let extend: (target: any) => any;

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
 * 使用方式：formatTime(new Date(), "yyyy-MM-dd")
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
export declare function formatTime(time: Date | string, fmt?: string): string;

/**
 * 格式化时间成：刚刚、几分钟前
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
export declare function formatTimeStr(time: string | number, fmt: string): string;

/**
 * 获取APP版本号
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
 * @param str - 字符串
 * @returns 返回长度
 */
export declare function getCHSLength(str: string): number;

/**
 * 读取cookies
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
export declare function getCookie(name: string): string | null;

/**
 * 获取目录形式URL参数
 * @param url - 传入url地址
 * @returns 返回参数对象
 */
export declare function getDirParam(url: string): {
    [prop: string]: any;
};

/**
 * 文件后缀名
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
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
export declare const getNumber: (string: string) => string;

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
 * @param name - 参数名称
 * @returns 返回参数值
 */
export declare function getParameter(name: string): string | null;

/**
 * 获取随机整数
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
export declare const getRandomNum: (min?: number, max?: number) => number;

/**
 * 获取随机字符串
 * @param len - 需要获取随机字符串的长度
 * @param widthSpecialChar - 可选，是否需要生成带特殊字符的串
 * @returns 随机串
 */
export declare const getRandomStr: (len?: number, widthSpecialChar?: boolean) => string;

/**
 * 获取随机字符串带特殊符号
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
export declare const getRandomStrWidthSpecialChar: (len?: number) => string;

/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 * @returns 返回位置
 */
export declare const getScrollPosition: () => string | void;

/**
 * 读取sessionStorage
 * @param name - 名称
 * @returns 返回sessionStorage
 */
export declare function getSession(name: string): any;

/**
 * getType
 * @description 获取目标类型
 * @param target - 目标
 * @returns 类型
 */
export declare function getType(target: any): string;

/**
 * 获取URL参数
 * @param url - 传入url参数
 * @returns 返回参数列表
 */
export declare function getUrlParam(url: string): object;

export declare function getWindowSize(): WindowSizeObj;

/**
 * 扩展图片自动适应多种分辨率small original
 * @param imgurl - 图片url
 * @param size - 图片规格
 * @returns 返回新地址
 */
export declare const imgAdapt: (imgurl: string, size: string) => string | false;

/**
 * 扩展图片自动适应多种分辨率`@2x @3x`
 * @param imgurl - 图片地址
 * @returns 返回新地址
 */
export declare const imgChoose: (imgurl: string) => string;

/**
 * @description 判断是否数组
 * @param arr -
 */
export declare function isArray(arr: any): arr is any[];

/**
 * 是否为由数字组成的字符串
 * @param str - 待检测的字符串
 * @returns 返回true/false
 */
export declare const isDigitals: (str: any) => boolean;

/**
 * 是否存在指定函数
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
export declare function isExitsFunction(funcName: string): boolean;

/**
 * 是否存在指定变量
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
export declare function isExitsVariable(variableName: string): boolean;

/**
 * @description 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
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
 * @description 返回下一个zIndex值
 * @param min - 可选，最小值
 * @param max - 可选，最大值
 * @returns 数字
 */
export declare function nextIndex(min?: number, max?: number): number;

/**
 * @description 新标签页打开链接（浏览器不能解析的文件跳转下载）
 * @param url - 链接
 */
export declare function openUrl(url: string): void;

/**
 * pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username
 * @returns 返回对象
 */
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

export declare function removeEvent(element: AnyElement, type: string, handler: CustomAnyFunction_2): void;

/**
 * @description 将RGB组件的值转换为颜色代码。
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param r - RGB第1个值
 * @param g - RGB第2个值
 * @param b - RGB第3个值
 * @returns hex值
 */
export declare const RGBToHex: (r: number, g: number, b: number) => string;

declare interface SearchkeySet {
    childName: string;
    keyName: string;
    [prop: string]: any;
}

/**
 * @description tree对象深度查找
 *
 * @param tree - 树形对象
 * @param expression - 必填 查询方式
 * @param keySet - 选填 默认的子类名称、查询name
 * @param number - 选填 查找个数，不传则查询全部
 * @returns 返回查询到的数组
 */
export declare function searchTreeObject(tree: object | any[], expression: any, keySet: SearchkeySet, number?: number): any[];

export declare function setCache(name: string, value: any, seconds: number): void;

/**
 * setCookie写入cookie的方法
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
export declare function setCookie(name: string, value: any, seconds?: number, path?: string, samesite?: boolean): void;

export declare function setSession(name: string, value: any, seconds: number): void;

/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
export declare function splitThousand(val: string | number): string | 0;

/**
 * @description 阻止冒泡
 * @example
 * @param e - dom的event对象
 * @returns
 */
export declare function stopBubble(e: Event): boolean;

/**
 * 阻止默认事件
 * @param e - dom的event对象
 * @returns
 */
export declare function stopDefault(e: Event): boolean;

/**
 * textarea或input对象在指定的光标位置插入文字
 * @param obj-  dom对象
 * @param str - 要插入的文字
 */
export declare function textareaInsertText(obj: HTMLTextAreaElement, str: string): void;

/**
 * textarea或input对象将光标定位到文字尾部
 * @param obj - dom对象
 */
export declare function textareaMoveToEnd(obj: HTMLTextAreaElement): void;

export declare const throttle: (fn: AnyFunction, delay: number, immediate: boolean, debounce: boolean) => () => void;

/**
 * trim()根据传参来去除空格
 * @param string - 传入字符串
 * @param type - 可选，去除空格的类型l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格
 * @returns 返回新字符串
 */
export declare const trim: (string: string, type?: string) => string | void;

/**
 * upperFirst
 * 首字母大写
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
export declare const upperFirst: (string: string) => string;

/**
 * @description 浏览器端生成uuid，采用v4方法
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
export declare const uuid: () => string;

/**
 * getWindowSize获取窗口大小
 * @returns 返回宽高
 */
declare interface WindowSizeObj {
    width: number;
    height: number;
}

export { }
