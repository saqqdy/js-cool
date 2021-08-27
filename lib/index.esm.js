var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$D =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$y = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$x = fails$y;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$x(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var createPropertyDescriptor$7 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$i = {}.toString;

var classofRaw$1 = function (it) {
  return toString$i.call(it).slice(8, -1);
};

var fails$w = fails$y;
var classof$a = classofRaw$1;

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$w(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$a(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$b = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$4 = indexedObject;
var requireObjectCoercible$a = requireObjectCoercible$b;

var toIndexedObject$a = function (it) {
  return IndexedObject$4(requireObjectCoercible$a(it));
};

var isObject$j = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var global$C = global$D;

var aFunction$8 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2 ? aFunction$8(global$C[namespace]) : global$C[namespace] && global$C[namespace][method];
};

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

var global$B = global$D;
var userAgent$7 = engineUserAgent;

var process$3 = global$B.process;
var Deno = global$B.Deno;
var versions = process$3 && process$3.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent$7) {
  match = userAgent$7.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$7.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$3 = engineV8Version;
var fails$v = fails$y;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$v(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$2 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$2
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$6 = getBuiltIn$8;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var isSymbol$5 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

var isObject$i = isObject$j;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject$i(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$i(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject$i(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var shared$5 = {exports: {}};

var isPure = false;

var global$A = global$D;

var setGlobal$3 = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global$A, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$A[key] = value;
  } return value;
};

var global$z = global$D;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$z[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$5.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.16.3',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var requireObjectCoercible$9 = requireObjectCoercible$b;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$g = function (argument) {
  return Object(requireObjectCoercible$9(argument));
};

var toObject$f = toObject$g;

var hasOwnProperty = {}.hasOwnProperty;

var has$g = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject$f(it), key);
};

var id = 0;
var postfix = Math.random();

var uid$4 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var global$y = global$D;
var shared$4 = shared$5.exports;
var has$f = has$g;
var uid$3 = uid$4;
var NATIVE_SYMBOL$1 = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore$1 = shared$4('wks');
var Symbol$1 = global$y.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

var wellKnownSymbol$t = function (name) {
  if (!has$f(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (NATIVE_SYMBOL$1 && has$f(Symbol$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore$1[name];
};

var isObject$h = isObject$j;
var isSymbol$4 = isSymbol$5;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$s = wellKnownSymbol$t;

var TO_PRIMITIVE$1 = wellKnownSymbol$s('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$h(input) || isSymbol$4(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE$1];
  var result;
  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject$h(result) || isSymbol$4(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$3 = isSymbol$5;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$5 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$3(key) ? key : String(key);
};

var global$x = global$D;
var isObject$g = isObject$j;

var document$3 = global$x.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$g(document$3) && isObject$g(document$3.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$3.createElement(it) : {};
};

var DESCRIPTORS$g = descriptors;
var fails$u = fails$y;
var createElement$1 = documentCreateElement$1;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$g && !fails$u(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$f = descriptors;
var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
var createPropertyDescriptor$6 = createPropertyDescriptor$7;
var toIndexedObject$9 = toIndexedObject$a;
var toPropertyKey$4 = toPropertyKey$5;
var has$e = has$g;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$f ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$9(O);
  P = toPropertyKey$4(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (has$e(O, P)) return createPropertyDescriptor$6(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$f = isObject$j;

var anObject$k = function (it) {
  if (!isObject$f(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var DESCRIPTORS$e = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$j = anObject$k;
var toPropertyKey$3 = toPropertyKey$5;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$e ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$j(O);
  P = toPropertyKey$3(P);
  anObject$j(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$d = descriptors;
var definePropertyModule$7 = objectDefineProperty;
var createPropertyDescriptor$5 = createPropertyDescriptor$7;

var createNonEnumerableProperty$d = DESCRIPTORS$d ? function (object, key, value) {
  return definePropertyModule$7.f(object, key, createPropertyDescriptor$5(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$d = {exports: {}};

var store$1 = sharedStore;

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store$1.inspectSource != 'function') {
  store$1.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$w = global$D;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$w.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

var shared$3 = shared$5.exports;
var uid$2 = uid$4;

var keys$2 = shared$3('keys');

var sharedKey$4 = function (key) {
  return keys$2[key] || (keys$2[key] = uid$2(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$v = global$D;
var isObject$e = isObject$j;
var createNonEnumerableProperty$c = createNonEnumerableProperty$d;
var objectHas = has$g;
var shared$2 = sharedStore;
var sharedKey$3 = sharedKey$4;
var hiddenKeys$4 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$v.WeakMap;
var set$2, get$1, has$d;

var enforce = function (it) {
  return has$d(it) ? get$1(it) : set$2(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$e(it) || (state = get$1(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$2.state) {
  var store = shared$2.state || (shared$2.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set$2 = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return wmget.call(store, it) || {};
  };
  has$d = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey$3('state');
  hiddenKeys$4[STATE] = true;
  set$2 = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$c(it, STATE, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has$d = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set$2,
  get: get$1,
  has: has$d,
  enforce: enforce,
  getterFor: getterFor
};

var global$u = global$D;
var createNonEnumerableProperty$b = createNonEnumerableProperty$d;
var has$c = has$g;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$8 = internalState;

var getInternalState$7 = InternalStateModule$8.get;
var enforceInternalState$1 = InternalStateModule$8.enforce;
var TEMPLATE = String(String).split('String');

(redefine$d.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$c(value, 'name')) {
      createNonEnumerableProperty$b(value, 'name', key);
    }
    state = enforceInternalState$1(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global$u) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$b(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState$7(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil$1 = Math.ceil;
var floor$7 = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger$9 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$7 : ceil$1)(argument);
};

var toInteger$8 = toInteger$9;

var min$5 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$n = function (argument) {
  return argument > 0 ? min$5(toInteger$8(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger$7 = toInteger$9;

var max$2 = Math.max;
var min$4 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$6 = function (index, length) {
  var integer = toInteger$7(index);
  return integer < 0 ? max$2(integer + length, 0) : min$4(integer, length);
};

var toIndexedObject$8 = toIndexedObject$a;
var toLength$m = toLength$n;
var toAbsoluteIndex$5 = toAbsoluteIndex$6;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$5 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$8($this);
    var length = toLength$m(O.length);
    var index = toAbsoluteIndex$5(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$5(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$5(false)
};

var has$b = has$g;
var toIndexedObject$7 = toIndexedObject$a;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$5;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$7(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has$b(hiddenKeys$3, key) && has$b(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has$b(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$2);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$8;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
var anObject$i = anObject$k;

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$i(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$a = has$g;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
var definePropertyModule$6 = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$6.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$a(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$t = fails$y;

var replacement = /#|\.prototype\./;

var isForced$3 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails$t(detection)
    : !!detection;
};

var normalize = isForced$3.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$3.data = {};
var NATIVE = isForced$3.NATIVE = 'N';
var POLYFILL = isForced$3.POLYFILL = 'P';

var isForced_1 = isForced$3;

var global$t = global$D;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$a = createNonEnumerableProperty$d;
var redefine$c = redefine$d.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced$2 = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$t;
  } else if (STATIC) {
    target = global$t[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$t[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties$1(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$a(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$c(target, key, sourceProperty, options);
  }
};

var fails$s = fails$y;

var arrayMethodIsStrict$8 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$s(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $$w = _export;
var $indexOf$1 = arrayIncludes.indexOf;
var arrayMethodIsStrict$7 = arrayMethodIsStrict$8;

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$7 = arrayMethodIsStrict$7('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$$w({ target: 'Array', proto: true, forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$7 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO$1
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf$1(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var isSymbol$2 = isSymbol$5;

var toString$h = function (argument) {
  if (isSymbol$2(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};

var anObject$h = anObject$k;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$h(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var regexpStickyHelpers = {};

var fails$r = fails$y;
var global$s = global$D;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$s.RegExp;

regexpStickyHelpers.UNSUPPORTED_Y = fails$r(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

regexpStickyHelpers.BROKEN_CARET = fails$r(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$3 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$c = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var anObject$g = anObject$k;
var objectKeys$2 = objectKeys$3;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = DESCRIPTORS$c ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$g(O);
  var keys = objectKeys$2(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$5.f(O, key = keys[index++], Properties[key]);
  return O;
};

var getBuiltIn$4 = getBuiltIn$8;

var html$2 = getBuiltIn$4('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$f = anObject$k;
var defineProperties$1 = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$1 = hiddenKeys$5;
var html$1 = html$2;
var documentCreateElement = documentCreateElement$1;
var sharedKey$2 = sharedKey$4;

var GT = '>';
var LT = '<';
var PROTOTYPE$2 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$2] = anObject$f(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$2] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties$1(result, Properties);
};

var fails$q = fails$y;
var global$r = global$D;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$r.RegExp;

var regexpUnsupportedDotAll = fails$q(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$p = fails$y;
var global$q = global$D;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$q.RegExp;

var regexpUnsupportedNcg = fails$p(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var toString$g = toString$h;
var regexpFlags = regexpFlags$1;
var stickyHelpers$2 = regexpStickyHelpers;
var shared$1 = shared$5.exports;
var create$5 = objectCreate;
var getInternalState$6 = internalState.get;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared$1('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y || stickyHelpers$2.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$6(re);
    var str = toString$g(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = str.slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$5(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$3 = patchedExec;

var $$v = _export;
var exec = regexpExec$3;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$v({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var redefine$b = redefine$d.exports;
var regexpExec$2 = regexpExec$3;
var fails$o = fails$y;
var wellKnownSymbol$r = wellKnownSymbol$t;
var createNonEnumerableProperty$9 = createNonEnumerableProperty$d;

var SPECIES$6 = wellKnownSymbol$r('species');
var RegExpPrototype$2 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$r(KEY);

  var DELEGATES_TO_SYMBOL = !fails$o(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$o(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$6] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine$b(String.prototype, KEY, methods[0]);
    redefine$b(RegExpPrototype$2, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$9(RegExpPrototype$2[SYMBOL], 'sham', true);
};

var toInteger$6 = toInteger$9;
var toString$f = toString$h;
var requireObjectCoercible$8 = requireObjectCoercible$b;

// `String.prototype.codePointAt` methods implementation
var createMethod$4 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$f(requireObjectCoercible$8($this));
    var position = toInteger$6(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$4(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$4(true)
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$3 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var classof$9 = classofRaw$1;
var regexpExec$1 = regexpExec$3;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof$9(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec$1.call(R, S);
};

var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
var anObject$e = anObject$k;
var toLength$l = toLength$n;
var toString$e = toString$h;
var requireObjectCoercible$7 = requireObjectCoercible$b;
var advanceStringIndex$2 = advanceStringIndex$3;
var regExpExec$2 = regexpExecAbstract;

// @@match logic
fixRegExpWellKnownSymbolLogic$3('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible$7(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](toString$e(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$e(this);
      var S = toString$e(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec$2(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$2(rx, S)) !== null) {
        var matchStr = toString$e(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$l(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

/**
 * client方法返回一个浏览器判断结果：`{ ANDROID: true, GECKO: true, GLSH_APP: false, IE: false, IOS: false, IPAD: false, IPHONE: false, MOBILE: true, MOBILEDEVICE: true, OPERA: false, QQ: false, QQBROWSER: false, TRIDENT: false, WEBKIT: true, WEIXIN: false }`
 * @param name - 可选，比如传入MicroMessenger，返回是否为微信内置浏览器
 * @param userAgent - 可选，传入自定义的ua，默认取浏览器的navigator.appVersion
 * @returns 返回常用ua匹配表，如果传了name，那么返回是否匹配该终端true/false
 */
var client = function client(name, userAgent) {
  if (name === void 0) {
    name = '';
  }

  if (userAgent === void 0) {
    userAgent = navigator.appVersion;
  }

  var userAgentL = userAgent.toLowerCase();

  if (name) {
    return userAgent.indexOf(name) > -1;
  } else {
    return {
      // @ts-ignore
      IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
      // @ts-ignore
      GECKO: userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1,
      WEBKIT: userAgentL.indexOf('applewebkit') > -1,
      OPERA: userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1,
      TRIDENT: userAgentL.indexOf('trident') > -1,
      MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      // MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
      IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
      IPHONE: userAgent.indexOf('iPhone') > -1,
      IPAD: userAgent.indexOf('iPad') > -1,
      // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
      QQBROWSER: userAgent.indexOf('QQBrowser') > -1,
      WEIXIN: userAgent.indexOf('MicroMessenger') > -1,
      // @ts-ignore
      QQ: userAgent.match(/\sQQ/i) === ' qq' // 是否QQ

    };
  }
};

/**
 * pattern返回一些常用的正则：any, arrjson, chinese, email, float, isjson, json, mobile, number, pass, postcode, qq, string, tel, textarea, url, username
 * @returns 返回对象
 */
function pattern() {
  return {
    any: /[\w\W]+/,
    number: /^\d+$/,
    string: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
    postcode: /^[0-9]{6}$/,
    url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
    username: /^[a-zA-Z0-9\_\-\.]{3,15}$/,
    "float": /^[0-9]+\.{0,1}[0-9]{0,2}$/,
    email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    //mobile:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0-9])\d{8}$/,
    //mobile:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
    mobile: /^1[3|4|5|7|8][0-9]\d{8,8}$/,
    chinese: /^[\u4E00-\u9FA5\uf900-\ufa2d]$/,
    tel: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
    qq: /^[1-9][0-9]{5,13}$/,
    pass: /^(?![0-9\W\_]+$)(?![a-zA-Z\W\_]+$)[0-9a-zA-Z\W\_]{6,16}$/,
    json: /^\{[\s\S]*\}$/,
    arrjson: /^\[\{[\s\S]*\}\]$/,
    array: /^\[[\s\S]*\]$/,
    isjson: /[\s\S]*(\{[\s\S]*\})[\s\S]*/,
    textarea: /[\u4e00-\u9fa5_a-zA-Z0-9\,\.\/\?\;\:\'\"\[\]\-\*\(\)\（\）\%\$\@\\\!\，\《\》\。\、\？\；\：\‘\’\“\”\…\￥\！]/
  };
}

var pattern$1 = pattern();

var toObject$e = toObject$g;

var floor$6 = Math.floor;
var replace$1 = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$e(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$1.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor$6(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var fails$n = fails$y;
var anObject$d = anObject$k;
var toInteger$5 = toInteger$9;
var toLength$k = toLength$n;
var toString$d = toString$h;
var requireObjectCoercible$6 = requireObjectCoercible$b;
var advanceStringIndex$1 = advanceStringIndex$3;
var getSubstitution = getSubstitution$1;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$q = wellKnownSymbol$t;

var REPLACE = wellKnownSymbol$q('replace');
var max$1 = Math.max;
var min$3 = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$n(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$6(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(toString$d(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$d(this);
      var S = toString$d(string);

      if (
        typeof replaceValue === 'string' &&
        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
        replaceValue.indexOf('$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = toString$d(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = toString$d(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$k(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString$d(result[0]);
        var position = max$1(min$3(toInteger$5(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = toString$d(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

/**
 * trim()根据传参来去除空格
 * @param string - 传入字符串
 * @param type - 可选，去除空格的类型l:去除开头空格 r:去除尾部空格 lr:去除两端空格，为空的话去除所有空格
 * @returns 返回新字符串
 */
var trim$2 = function trim(string, type) {
  if (type === void 0) {
    type = '';
  }

  if (!type) {
    return string.replace(/\s/g, '');
  } else if (type === 'l' || type === 'left') {
    return string.replace(/^\s*/, '');
  } else if (type === 'r' || type === 'right') {
    return string.replace(/\s*$/, '');
  } else if (type === 'lr' || type === 'around') {
    return string.replace(/(^\s*)|(\s*$)/g, '');
  }
};

/**
 * 去除HTML标签所有属性
 * @param string - 传入字符串
 * @returns
 */
var clearAttr = function clearAttr(string) {
  return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>');
};

/**
 * 去除换行
 * @param string - 带html标签的字符串
 * @returns
 */
var clearBr = function clearBr(string) {
  return string.replace(/<\/br>/g, '').replace(/<br>/g, '').replace(/[\r\n]/g, '');
};

/**
 * 去除HTML标签
 * @param string - 带html标签的字符串
 * @returns
 */
var clearHtml = function clearHtml(string) {
  return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
};

/**
 * 去除HTML标签保留空格、换行
 * @param string - 带html标签的字符串
 * @returns
 */
var clearHtmlExpSN = function clearHtmlExpSN(string) {
  return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '');
};

/**
 * 去除HTML标签及换行
 * @param string - 带html标签的字符串
 * @returns
 */
var clearHtmlN = function clearHtmlN(string) {
  return string.replace(/<\/?.+?>|[\r\n]/g, '');
};

/**
 * 去除HTML标签及空格、换行
 * @param string - 带html标签的字符串
 * @returns
 */
var clearHtmlNS = function clearHtmlNS(string) {
  return string.replace(/<\/?.+?>|[\r\n\s]|(\ )/g, '');
};

/**
 * 去除HTML标签及标签里面的文字
 * @param string - 带html标签的字符串
 * @returns
 */
var clearHtmlTag = function clearHtmlTag(string) {
  return string.replace(/<[^>]+>/g, '');
};

/**
 * 获取字符串中的数字
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
var getNumber = function getNumber(string) {
  return string.replace(/[^0-9.]/gi, '');
};

var isObject$d = isObject$j;

var aPossiblePrototype$1 = function (it) {
  if (!isObject$d(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

/* eslint-disable no-proto -- safe */

var anObject$c = anObject$k;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$c(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var isObject$c = isObject$j;
var setPrototypeOf$6 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$6 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject$c(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$6($this, NewTargetPrototype);
  return $this;
};

var isObject$b = isObject$j;
var classof$8 = classofRaw$1;
var wellKnownSymbol$p = wellKnownSymbol$t;

var MATCH$2 = wellKnownSymbol$p('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$b(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$8(it) == 'RegExp');
};

var getBuiltIn$3 = getBuiltIn$8;
var definePropertyModule$4 = objectDefineProperty;
var wellKnownSymbol$o = wellKnownSymbol$t;
var DESCRIPTORS$b = descriptors;

var SPECIES$5 = wellKnownSymbol$o('species');

var setSpecies$3 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$4.f;

  if (DESCRIPTORS$b && Constructor && !Constructor[SPECIES$5]) {
    defineProperty(Constructor, SPECIES$5, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var DESCRIPTORS$a = descriptors;
var global$p = global$D;
var isForced$1 = isForced_1;
var inheritIfRequired$1 = inheritIfRequired$2;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$d;
var defineProperty$6 = objectDefineProperty.f;
var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
var isRegExp$2 = isRegexp;
var toString$c = toString$h;
var getFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var redefine$a = redefine$d.exports;
var fails$m = fails$y;
var has$9 = has$g;
var enforceInternalState = internalState.enforce;
var setSpecies$2 = setSpecies$3;
var wellKnownSymbol$n = wellKnownSymbol$t;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var MATCH$1 = wellKnownSymbol$n('match');
var NativeRegExp = global$p.RegExp;
var RegExpPrototype$1 = NativeRegExp.prototype;
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS$a &&
  (!CORRECT_NEW || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$m(function () {
    re2[MATCH$1] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      result += chr + string.charAt(++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      chr = chr + string.charAt(++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (IS_NCG.test(string.slice(index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || has$9(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named.push([groupname, groupid]);
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced$1('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp$2(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || pattern instanceof RegExpWrapper) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString$c(pattern);
    flags = flags === undefined ? '' : toString$c(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && flags.indexOf('s') > -1;
      if (dotAll) flags = flags.replace(/s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y$1 && 'sticky' in re1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired$1(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty$8(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$6(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys$1 = getOwnPropertyNames$2(NativeRegExp), index$1 = 0; keys$1.length > index$1;) {
    proxy(keys$1[index$1++]);
  }

  RegExpPrototype$1.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$1;
  redefine$a(global$p, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies$2('RegExp');

var redefine$9 = redefine$d.exports;
var anObject$b = anObject$k;
var $toString$3 = toString$h;
var fails$l = fails$y;
var flags = regexpFlags$1;

var TO_STRING$1 = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING$1];

var NOT_GENERIC = fails$l(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING$1;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine$9(RegExp.prototype, TO_STRING$1, function toString() {
    var R = anObject$b(this);
    var p = $toString$3(R.source);
    var rf = R.flags;
    var f = $toString$3(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

/**
 * 扩展图片自动适应多种分辨率small original
 * @param imgurl - 图片url
 * @param size - 图片规格
 * @returns 返回新地址
 */
// export enum Size { s = 's', m = 'm', l = 'l' }
var imgAdapt = function imgAdapt(imgurl, size) {
  if (!imgurl) {
    return false;
  }

  var imgPre = '';
  var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i'); // var preReg = new RegExp('([.small|.original].jpg|.png|.gif|.jpeg|.bmp|.webx)$', 'i') // 匹配.small.jpg .original.jpg

  switch (size) {
    case 's':
      imgPre = '.small';
      return imgurl.replace(urlReg, '$1' + imgPre + '$1');

    case 'm':
      imgPre = '';
      return imgurl.replace(urlReg, '$1' + imgPre);

    case 'l':
      imgPre = '.original';
      return imgurl.replace(urlReg, '$1' + imgPre + '$1');

    default:
      return imgurl;
  } //	return this.replace(preReg,"").replace(urlReg,"$1" + imgPre + "$1");
  //return this.replace(urlReg,"$1" + imgPre + "$1");

};

/**
 * 扩展图片自动适应多种分辨率`@2x @3x`
 * @param imgurl - 图片地址
 * @returns 返回新地址
 */
var imgChoose = function imgChoose(imgurl) {
  var width = window.innerWidth;
  var imgPre = '';
  var urlReg = new RegExp('(.jpg|.png|.gif|.jpeg|.bmp)', 'i');
  var preReg = new RegExp('(@[2|3]x)', 'i'); //匹配@2x @3x

  if (width >= 480) {
    imgPre = '@3x';
  } else if (width >= 320) {
    imgPre = '@2x';
  } else if (width >= 240) {
    imgPre = '';
  }

  return imgurl.replace(preReg, '').replace(urlReg, imgPre + '$1');
};

/**
 * camel2Dash
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
var camel2Dash = function camel2Dash(string) {
  return string.replace(/([A-Z]{1,1})/g, '-$1').replace(/^-/, '').toLocaleLowerCase();
};

/**
 * dash2Camel
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
var dash2Camel = function dash2Camel(string) {
  return string.replace(/[\-]{1,1}([a-z]{1,1})/g, function () {
    return arguments[1].toLocaleUpperCase();
  });
};

var classof$7 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$5 = Array.isArray || function isArray(arg) {
  return classof$7(arg) == 'Array';
};

var toPropertyKey$2 = toPropertyKey$5;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$4 = createPropertyDescriptor$7;

var createProperty$3 = function (object, key, value) {
  var propertyKey = toPropertyKey$2(key);
  if (propertyKey in object) definePropertyModule$3.f(object, propertyKey, createPropertyDescriptor$4(0, value));
  else object[propertyKey] = value;
};

var fails$k = fails$y;
var wellKnownSymbol$m = wellKnownSymbol$t;
var V8_VERSION$2 = engineV8Version;

var SPECIES$4 = wellKnownSymbol$m('species');

var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$2 >= 51 || !fails$k(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$u = _export;
var isObject$a = isObject$j;
var isArray$4 = isArray$5;
var toAbsoluteIndex$4 = toAbsoluteIndex$6;
var toLength$j = toLength$n;
var toIndexedObject$6 = toIndexedObject$a;
var createProperty$2 = createProperty$3;
var wellKnownSymbol$l = wellKnownSymbol$t;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('slice');

var SPECIES$3 = wellKnownSymbol$l('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$u({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject$6(this);
    var length = toLength$j(O.length);
    var k = toAbsoluteIndex$4(start, length);
    var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray$4(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray$4(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$a(Constructor)) {
        Constructor = Constructor[SPECIES$3];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
    result.length = n;
    return result;
  }
});

/**
 * upperFirst
 * 首字母大写
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
var upperFirst = function upperFirst(string) {
  return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
};

/**
 * 获取随机整数
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
var getRandomNum = function getRandomNum(min, max) {
  if (min === void 0) {
    min = 1;
  }

  if (max === void 0) {
    max = 10;
  }

  var Range = max - min;
  var Rand = Math.random();
  return min + Math.round(Rand * Range);
};

/**
 * 获取随机字符串
 * @param len - 需要获取随机字符串的长度
 * @param widthSpecialChar - 可选，是否需要生成带特殊字符的串
 * @returns 随机串
 */
var getRandomStr = function getRandomStr(len, widthSpecialChar) {
  if (len === void 0) {
    len = 32;
  }

  if (widthSpecialChar === void 0) {
    widthSpecialChar = false;
  }

  var chars = !widthSpecialChar ? 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' : 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  //var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  var maxPos = chars.length;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
};

/**
 * 获取随机字符串带特殊符号
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
var getRandomStrWidthSpecialChar = function getRandomStrWidthSpecialChar(len) {
  if (len === void 0) {
    len = 32;
  }

  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1

  var maxPos = chars.length;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
};

//获取字符串长度，中文算2个字符
// var getStrLen = function getStrLen(str) {
//   var realLength = 0
//   var len = str.length
//   var charCode = -1
//   for (var i = 0; i < len; i++) {
//     charCode = str.charCodeAt(i)
//     if (charCode >= 0 && charCode <= 128) {
//       realLength += 1
//     } else {
//       realLength += 2
//     }
//   }
//   return realLength
// }

/**
 * 获取文本长度，中文算2个字节
 * @param str - 字符串
 * @returns 返回长度
 */
function getCHSLength(str) {
  return str.replace(/[^\x00-\xff]/g, '**').length;
}

var redefine$8 = redefine$d.exports;

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  redefine$8(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var wellKnownSymbol$k = wellKnownSymbol$t;

var TO_STRING_TAG$4 = wellKnownSymbol$k('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$4] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$j = wellKnownSymbol$t;

var TO_STRING_TAG$3 = wellKnownSymbol$j('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$3)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$5 = classof$6;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$5(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine$7 = redefine$d.exports;
var toString$b = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine$7(Object.prototype, 'toString', toString$b, { unsafe: true });
}

/**
 * js截取字符串，中英文都能用
 * @private
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
// function cutStrLen(str, len) {
//   var str_length = 0
//   //var a = 0;
//   var str_len = str.length
//   var str_cut = new String()
//   for (var i = 0; i < str_len; i++) {
//     a = str.charAt(i)
//     str_length++
//     if (escape(a).length > 4) {
//       //中文字符的长度经编码之后大于4
//       str_length++
//     }
//     str_cut = str_cut.concat(a)
//     if (str_length >= len) {
//       str_cut = str_cut.concat('...')
//       return str_cut
//     }
//   }
//   //如果给定字符串小于指定长度，则返回源字符串；
//   if (str_length < len) {
//     return str
//   }
// }

/**
 * 截取字符串，中文算2个字节
 * @param str - 要截取的字符串
 * @param len -
 * @param hasDot -
 * @returns 返回截取后的字符串
 */
function cutCHSString(str, len, hasDot) {
  if (len === void 0) {
    len = str.length;
  }

  if (hasDot === void 0) {
    hasDot = false;
  }

  if (str == '' || !str) {
    return '';
  } else {
    var newLength = 0;
    var newStr = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = '';
    var strLength = str.replace(chineseRegex, '**').length;

    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();

      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }

      if (newLength > len) {
        break;
      }

      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }

    return newStr;
  }
}

var $$t = _export;
var global$o = global$D;
var userAgent$6 = engineUserAgent;

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent$6); // <- dirty ie9- check

var wrap$1 = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$$t({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap$1(global$o.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap$1(global$o.setInterval)
});

/**
 * textarea或input对象在指定的光标位置插入文字
 * @param obj-  dom对象
 * @param str - 要插入的文字
 */
function textareaInsertText(obj, str) {
  if (document.selection) {
    // IE
    var sel = document.selection.createRange();
    sel.text = str;
  } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    var startPos = obj.selectionStart,
        endPos = obj.selectionEnd,
        curPos = startPos,
        tmpStr = obj.value;
    obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
    curPos += str.length;
    setTimeout(function () {
      obj.selectionStart = obj.selectionEnd = curPos;
    }, 0);
  } else {
    obj.value += str;
  }
}

/**
 * textarea或input对象将光标定位到文字尾部
 * @param obj - dom对象
 */
function textareaMoveToEnd(obj) {
  obj.focus();
  var len = obj.value.length;

  if (document.selection) {
    // @ts-ignore
    var sel = obj.createTextRange();
    sel.moveStart('character', len);
    sel.collapse();
    sel.select();
  } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
    obj.selectionStart = obj.selectionEnd = len;
  }
}

/**
 * 是否为由数字组成的字符串
 * @param str - 待检测的字符串
 * @returns 返回true/false
 */
var isDigitals = function isDigitals(str) {
  return /^[0-9]*$/.test(str);
};

/**
 * 是否存在指定函数
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
function isExitsFunction(funcName) {
  try {
    if (typeof eval(funcName) === 'function') {
      return true;
    }
  } catch (e) {}

  return false;
}

/**
 * 是否存在指定变量
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
function isExitsVariable(variableName) {
  try {
    if (typeof variableName === 'undefined') {
      return false;
    } else {
      return true;
    }
  } catch (e) {}

  return false;
}

function getWindowSize() {
  var s = {
    width: 0,
    height: 0
  };

  if (window.innerWidth) {
    s.width = window.innerWidth;
    s.height = window.innerHeight;
  } else if (document.body && document.body.clientWidth) {
    s.width = document.body.clientWidth;
    s.height = document.body.clientHeight;
  } // 通过深入Document内部对body进行检测，获取窗口大小


  if (document.documentElement && document.documentElement.clientWidth) {
    s.width = document.documentElement.clientWidth;
    s.height = document.documentElement.clientHeight;
  }

  return s;
}

var wellKnownSymbol$i = wellKnownSymbol$t;
var create$4 = objectCreate;
var definePropertyModule$2 = objectDefineProperty;

var UNSCOPABLES = wellKnownSymbol$i('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  definePropertyModule$2.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$4(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$2 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $$s = _export;
var $includes$1 = arrayIncludes.includes;
var addToUnscopables$1 = addToUnscopables$2;

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$s({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('includes');

var isRegExp$1 = isRegexp;

var notARegexp = function (it) {
  if (isRegExp$1(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$h = wellKnownSymbol$t;

var MATCH = wellKnownSymbol$h('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

var $$r = _export;
var notARegExp = notARegexp;
var requireObjectCoercible$5 = requireObjectCoercible$b;
var toString$a = toString$h;
var correctIsRegExpLogic = correctIsRegexpLogic;

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$r({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~toString$a(requireObjectCoercible$5(this))
      .indexOf(toString$a(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
  }
});

/**
 * 获取APP版本号
 * @param appName - app名称
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */
function getAppVersion(appName, withappstr, userAgent) {
  // console.log(getAppVersion("Chrome"));
  // const userAgent = navigator.userAgent;
  userAgent = userAgent || navigator.appVersion;
  var reg = eval('/' + appName + '\\/([\\d\\.]+)/i');
  var isApp = userAgent.includes(appName);
  var ver = userAgent.match(reg); // console.log(userAgent)
  // console.log(ver)
  // withappstr = typeof(withappstr) != "undefined" ? withappstr : false;

  if (ver) {
    if (withappstr) {
      //需要带上app名称，完整输出
      return ver ? ver[0] : '';
    } else {
      return ver ? ver[1] : '';
    }
  } else {
    if (isApp) {
      //是指定客户端但是版本号未知
      console.log(appName + "\u672A\u77E5\u7248\u672C\u53F7");
      return false;
    } else {
      //不是指定客户端
      console.log(appName + "\u4E0D\u5B58\u5728");
      return null;
    }
  }
}

/**
 * 获取手机系统版本
 *
 * @param osName - 系统类型字符串Android、iPod、iWatch或iPhone
 * @param withosstr - 是否需要带上名称
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */

function getOsVersion(osName, withosstr, userAgent) {
  userAgent = userAgent || navigator.appVersion;
  var d = ['iPhone', 'iPad', 'iPod', 'iWatch', 'Mac', 'iMac', 'iOS'],
      name = osName,
      index = d.indexOf(osName);

  if (index > -1 && userAgent.indexOf('like Mac OS X') > -1) {
    name = 'OS';
  }

  var reg = eval('/' + name + '\\s[\\d\\_]+/ig'); // var isApp = userAgent.includes(name)

  var ver = (userAgent.match(reg) + '').replace(/\s/gi, '/').replace(/_/gi, '.');

  if (index > -1) {
    ver = ver.replace(/OS\//gi, osName + '/');
  }

  return getAppVersion(osName, withosstr, ver);
}

// a string of all valid unicode whitespaces
var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var requireObjectCoercible$4 = requireObjectCoercible$b;
var toString$9 = toString$h;
var whitespaces$2 = whitespaces$3;

var whitespace = '[' + whitespaces$2 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$3 = function (TYPE) {
  return function ($this) {
    var string = toString$9(requireObjectCoercible$4($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};

var global$n = global$D;
var toString$8 = toString$h;
var trim$1 = stringTrim.trim;
var whitespaces$1 = whitespaces$3;

var $parseFloat = global$n.parseFloat;
var FORCED$9 = 1 / $parseFloat(whitespaces$1 + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
var numberParseFloat = FORCED$9 ? function parseFloat(string) {
  var trimmedString = trim$1(toString$8(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

var $$q = _export;
var parseFloatImplementation = numberParseFloat;

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$$q({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});

/**
 * 版本号大小对比
 *
 * @param appName - app名称
 * @param compareVer - 必传 需要对比的版本号
 * @param userAgent - ua，可不传，默认取navigator.appVersion
 * @return null/true/false
 */

function getIsAppVersionLastest(appName, compareVer, userAgent) {
  //console.log(getIsAppVersionLastest("Chrome","5.1"));
  userAgent = userAgent || navigator.appVersion;
  var basicVer = appName.indexOf('.') > 0 ? appName : getAppVersion(appName, false, userAgent); //兼容getIsAppVersionLastest("1.2.2","1.2.3")直接传入版本号的对比
  // var basicVer = "5.1.";

  if (basicVer === null) {
    return null;
  } //不是指定客户端


  if (basicVer === false) {
    return false;
  } //是指定客户端但是版本号未知


  basicVer = basicVer + '.';
  compareVer = compareVer + '.';
  var bStr = parseFloat(basicVer);
  var cStr = parseFloat(compareVer);
  var bStrNext = parseFloat(basicVer.replace(bStr + '.', '')) || 0;
  var cStrNext = parseFloat(compareVer.replace(cStr + '.', '')) || 0; // console.log(bStr + "-" + cStr)
  // console.log(basicVer.replace(bStr + ".","") + "-" + compareVer.replace(cStr + ".",""))
  // console.log(bStrNext + "-" + cStrNext)

  if (cStr > bStr) {
    return false;
  } else if (cStr < bStr) {
    return true;
  } else {
    if (bStrNext >= cStrNext) {
      return true;
    } else {
      return false;
    }
  }
}

var aFunction$7 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var anObject$a = anObject$k;
var aFunction$6 = aFunction$7;
var wellKnownSymbol$g = wellKnownSymbol$t;

var SPECIES$2 = wellKnownSymbol$g('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$4 = function (O, defaultConstructor) {
  var C = anObject$a(O).constructor;
  var S;
  return C === undefined || (S = anObject$a(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$6(S);
};

var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var isRegExp = isRegexp;
var anObject$9 = anObject$k;
var requireObjectCoercible$3 = requireObjectCoercible$b;
var speciesConstructor$3 = speciesConstructor$4;
var advanceStringIndex = advanceStringIndex$3;
var toLength$i = toLength$n;
var toString$7 = toString$h;
var callRegExpExec = regexpExecAbstract;
var regexpExec = regexpExec$3;
var stickyHelpers = regexpStickyHelpers;
var fails$j = fails$y;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min$2 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$j(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString$7(requireObjectCoercible$3(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$3(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(toString$7(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject$9(this);
      var S = toString$7(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor$3(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min$2(toLength$i(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

/**
 * 获取目录形式URL参数
 * @param url - 传入url地址
 * @returns 返回参数对象
 */
function getDirParam(url) {
  var patt = new RegExp(/^http[s]?:\/\/[^\/]+([\s\S]*)/);
  var urlStr = url != '' && typeof url != 'undefined' ? url.replace(patt, '$1') : location.pathname; //获取url中域名后的字串:/post/0703/a1.html

  urlStr = urlStr.replace(/^\//, '');
  var dirParam = {}; // @ts-ignore

  dirParam.host = url != '' && typeof url != 'undefined' ? url.match(/^http[s]?:\/\/[^\/]+/)[0] : location.host; //获取域名，包含http://

  if (urlStr.includes('/')) {
    //dirParam = unescape(urlStr).split("/");
    dirParam.path = decodeURI(urlStr).split('/');
  }

  return dirParam; //{"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject$8 = anObject$k;
var requireObjectCoercible$2 = requireObjectCoercible$b;
var sameValue = sameValue$1;
var toString$6 = toString$h;
var regExpExec = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$2(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](toString$6(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject$8(this);
      var S = toString$6(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

/**
 * 获取单个URL参数
 * @param name - 参数名称
 * @returns 返回参数值
 */
function getParameter(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 文件后缀名
 * @param url - 文件名
 * @returns 返回文件后缀
 */
function getFileType(url) {
  if (typeof url != 'string' || url == '') {
    return null;
  }

  var type = /\.[^\.]+$/.exec(url); //[".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]

  return type ? type[0].toLowerCase() : null;
}

/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var toIndexedObject$5 = toIndexedObject$a;
var toInteger$4 = toInteger$9;
var toLength$h = toLength$n;
var arrayMethodIsStrict$6 = arrayMethodIsStrict$8;

var min$1 = Math.min;
var $lastIndexOf$1 = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD$6 = arrayMethodIsStrict$6('lastIndexOf');
var FORCED$8 = NEGATIVE_ZERO || !STRICT_METHOD$6;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
var arrayLastIndexOf = FORCED$8 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return $lastIndexOf$1.apply(this, arguments) || 0;
  var O = toIndexedObject$5(this);
  var length = toLength$h(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min$1(index, toInteger$4(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf$1;

var $$p = _export;
var lastIndexOf = arrayLastIndexOf;

// `Array.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
// eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
$$p({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});

/* 获取URL参数 */

/*function getUrlParam(url){
    var urlStr = url != "" && url != null ? url.substr(url.indexOf("?")) : location.search;//获取url中"?"符后的字串
    var urlParam = [];
    if(urlStr.indexOf("?") != -1){
        var str = urlStr.substr(1);
        var strs = str.split("&");
        for(var i = 0;i < strs.length;i++){
            //urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        };
    };
    return urlParam;
}*/

/* 获取URL参数 */
// function getUrlParam(url) {
//   var urlStr = url != "" && typeof url != "undefined" ? url.substr(url.indexOf("?")) : location.search; //获取url中"?"符后的字串
//   var urlParam = [];
//   if (urlStr.includes("?")) {
//     var str = urlStr.substr(1);
//     var strs = str.split("&");
//     for (var i = 0; i < strs.length; i++) {
//       //urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//       urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
//     };
//   };
//   return urlParam;
// }
// function getUrlParam(url) {
//   // url = (url != "" && typeof url != "undefined") ? url.substr(url.indexOf("?")) : location.search; //获取url中"?"符后的字串
//   var reg_url = /^[^\?]+\?([\w\W]+)$/,
//     reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
//     arr_url = reg_url.exec(url),
//     ret = {};
//   if (arr_url && arr_url[1]) {
//     var str_para = arr_url[1], result;
//     while ((result = reg_para.exec(str_para)) != null) {
//       ret[result[1]] = result[2];
//     }
//   }
//   return ret;
// }

/**
 * 获取URL参数
 * @param url - 传入url参数
 * @returns 返回参数列表
 */
function getUrlParam(url) {
  url = url !== '' && typeof url !== 'undefined' ? url.substr(url.indexOf('?')).split('#')[0] : location.search; //获取url中"?"符后的字串

  var search = url.substring(url.lastIndexOf('?') + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * 日期格式化插件
 * 使用方式：formatTime(new Date(), "yyyy-MM-dd")
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
function formatTime(time, fmt) {
  if (fmt === void 0) {
    fmt = 'yyyy-MM-dd';
  }

  if (typeof time === 'string') {
    time = new Date(time);
  }

  var o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    S: time.getMilliseconds() //毫秒

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ('' + time.getFullYear()).substr(4 - RegExp.$1.length));

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  }

  return fmt;
}

var global$m = global$D;
var toString$5 = toString$h;
var trim = stringTrim.trim;
var whitespaces = whitespaces$3;

var $parseInt = global$m.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$7 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED$7 ? function parseInt(string, radix) {
  var S = trim(toString$5(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

var $$o = _export;
var parseIntImplementation = numberParseInt;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$$o({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

/**
 * 格式化时间成：刚刚、几分钟前
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */

function formatTimeStr(time, fmt) {
  var now = new Date().getTime();
  var format = fmt != '' && fmt != null ? fmt : 'MM-dd';
  if (typeof time === 'string') time = parseInt(time, 10);
  if (!time || time < 1) return '';
  var t = now - time;
  var newTimeStr = '';

  if (t < 60 * 2) {
    newTimeStr = '刚刚';
  } else if (t < 60 * 60) {
    newTimeStr = parseInt('' + t / 60) + "\u5206\u949F\u524D";
  } else if (t < 60 * 60 * 24) {
    newTimeStr = parseInt('' + t / (60 * 60)) + "\u5C0F\u65F6\u524D";
  } else if (t < 60 * 60 * 24 * 30) {
    newTimeStr = parseInt('' + t / (60 * 60 * 24)) + "\u5929\u524D";
  } else {
    newTimeStr = formatTime(new Date(time), format);
  }

  return newTimeStr;
}

/**
 * setCookie写入cookie的方法
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
function setCookie(name, value, seconds, path, samesite) {
  if (seconds === void 0) {
    seconds = 86400;
  }

  if (path === void 0) {
    path = '/';
  }

  if (samesite === void 0) {
    samesite = true;
  }

  var exp = new Date();
  exp.setTime(exp.getTime() + seconds * 1000);
  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + ';path=' + path + (samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '');
}

function setCache(name, value, seconds) {
  var e = new Date(),
      expires = seconds ? e.getTime() + seconds * 1000 : '',
      o = {};
  o.value = value;
  o.expires = expires;
  localStorage.setItem(name, JSON.stringify(o));
}

function setSession(name, value, seconds) {
  var e = new Date();
  var expires = seconds ? e.getTime() + seconds * 1000 : '';
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  sessionStorage.setItem(name, JSON.stringify(obj));
}

/**
 * 读取cookies
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
function getCookie(name) {
  var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  arr = document.cookie.match(reg);

  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
function getCache(name) {
  var str = localStorage.getItem(name),
      exp = new Date(),
      o;

  if (str) {
    try {
      o = JSON.parse(str);
    } catch (err) {
      o = str;
    }

    if (typeof o !== 'object') return o;
    if (!o.value) return null;

    if (!o.expires || o.expires > exp.getTime()) {
      return o.value;
    }

    localStorage.removeItem(name);
    return null;
  }

  return null;
}

/**
 * 读取sessionStorage
 * @param name - 名称
 * @returns 返回sessionStorage
 */
function getSession(name) {
  var str = sessionStorage.getItem(name);
  var exp = new Date();

  if (str) {
    var obj = JSON.parse(str);

    if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
      return null;
    } else {
      if (!obj.expires || obj.expires > exp.getTime()) {
        return obj.value;
      } else {
        sessionStorage.removeItem(name);
        return null;
      }
    }
  } else {
    return null;
  }
}

/**
 * 删除cookie
 * @param name - cookie名称
 */

function delCookie(name) {
  var e = new Date();
  e.setTime(e.getTime() - 1);
  var cval = getCookie(name);

  if (cval !== null) {
    document.cookie = name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/';
  }
}

/**
 * 删除localStorage
 * @param name - 名称
 */
function delCache(name) {
  localStorage.removeItem(name);
}

/**
 * 删除sessionStorage
 * @param name - 名称
 */
function delSession(name) {
  sessionStorage.removeItem(name);
}

/**
 * 编码Utf8
 * @param input - 需要编码的字符串
 * @returns 返回UTF-8编码
 */
var encodeUtf8 = function encodeUtf8(string) {
  string = string.replace(/\r\n/g, '\n');
  var utftext = '';

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode(c >> 6 | 192);
      utftext += String.fromCharCode(c & 63 | 128);
    } else {
      utftext += String.fromCharCode(c >> 12 | 224);
      utftext += String.fromCharCode(c >> 6 & 63 | 128);
      utftext += String.fromCharCode(c & 63 | 128);
    }
  }

  return utftext;
};

var _keyStr$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * 字符串、数字转base64
 * @param input - 需要编码的字符串
 * @returns 返回BASE64编码
 */

var encodeBase64 = function encodeBase64(input) {
  var output = '';
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = encodeUtf8(input);

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + _keyStr$1.charAt(enc1) + _keyStr$1.charAt(enc2) + _keyStr$1.charAt(enc3) + _keyStr$1.charAt(enc4);
  }

  return output;
};

/**
 * 解码Utf8
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */
var decodeUtf8 = function decodeUtf8(utftext) {
  var string = '';
  var i = 0;
  var c = 0,
      // c1 = 0,
  c2 = 0,
      c3 = 0;

  while (i < utftext.length) {
    c = utftext.charCodeAt(i);

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode((c & 31) << 6 | c2 & 63);
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
      i += 3;
    }
  }

  return string;
};

var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
/**
 * base64解码
 * @param input - 需要解码的字符串
 * @returns 解码后的字符串
 */

var decodeBase64 = function decodeBase64(input) {
  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }

    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }

  output = decodeUtf8(output);
  return output;
};

/**
 * 用*替换= 用!替换& 转码成微信跳转链接
 * name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866 转成 name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
var enWxJumpLink = function enWxJumpLink(string) {
  return string // .replace(/[=]{1}/g, '~')
  .replace(/[=]{1}/g, '*') // .replace(/[&]{1}/g, '^')
  .replace(/[&]{1}/g, '!').replace(/[\[]{1}/g, '(').replace(/[\]]{1}/g, ')');
};

/**
 * 用~替换= 用^替换& 转码成微信跳转链接
 * @param string - 传入字符串
 * @returns 返回转码结果
 */
var enWxJumpLinkOld = function enWxJumpLinkOld(string) {
  return string.replace(/[=]/gi, '~').replace(/[&]/gi, '^');
};

/**
 * 用=替换* 用&替换! 解码成微信跳转链接
 * name*exMall-detail-goodsInfoId!params(goodsInfoId)*8866 转成 name=exMall-detail-goodsInfoId&params[goodsInfoId]=8866
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
var deWxJumpLink = function deWxJumpLink(string) {
  return string // .replace(/[~]{1}/g, '=')
  .replace(/[*]{1}/g, '=') // .replace(/[\^]{1}/g, '&')
  .replace(/[!]{1}/g, '&').replace(/[\(]{1}/g, '[').replace(/[\)]{1}/g, ']');
};

/**
 * 用=替换~ 用&替换^ 解码成微信跳转链接
 * @param string - 传入字符串
 * @returns 返回解码结果
 */
var deWxJumpLinkOld = function deWxJumpLinkOld(string) {
  return string.replace(/[~]/gi, '=').replace(/[\^]/gi, '&');
};

var throttle = function throttle(fn, delay, immediate, debounce) {
  var curr = +new Date(),
      //当前事件
  last_call = 0,
      last_exec = 0,
      timer,
      diff,
      // 时间差
  context,
      //上下文
  args,
      exec = function exec() {
    last_exec = curr;
    fn.apply(context, args);
  };

  return function () {
    curr = +new Date();
    context = this, args = arguments, diff = curr - (debounce ? last_call : last_exec) - delay;
    clearTimeout(timer);

    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec();
      }
    } else {
      if (diff >= 0) {
        exec();
      } else if (immediate) {
        timer = setTimeout(exec, -diff);
      }
    }

    last_call = curr;
  };
};

var debounce = function debounce(fn, delay, immediate) {
  return throttle(fn, delay, immediate, true);
};

/**
 * @description 阻止冒泡
 * @example
 * @param e - dom的event对象
 * @returns
 */
function stopBubble(e) {
  if (e && e.stopPropagation) {
    // Firefox
    e.stopPropagation(); // e.preventDefault();
  } else {
    // IE
    e.cancelBubble = true; // e.returnValue = false;
  }

  return false;
}

/**
 * 阻止默认事件
 * @param e - dom的event对象
 * @returns
 */
function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }

  return false;
}

var addEvent = function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    //为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++; //为元素的事件类型创建一个哈希表

    if (!element.events) element.events = {}; //为每一个"元素/事件"对创建一个事件处理程序的哈希表

    var handlers = element.events[type];

    if (!handlers) {
      handlers = element.events[type] = {}; //存储存在的事件处理函数(如果有)

      if (element['on' + type]) {
        handlers[0] = element['on' + type];
      }
    } //将事件处理函数存入哈希表


    handlers[handler.$$guid] = handler; //指派一个全局的事件处理函数来做所有的工作

    element['on' + type] = handleEvent;
  }
}; // a counter used to create unique IDs


addEvent.guid = 1;
/**
 * handleEvent()执行事件
 *
 * @private
 * @param event - 事件类型
 * @returns
 */

function handleEvent(event) {
  var returnValue = true; //抓获事件对象(IE使用全局事件对象)
  // @ts-ignore

  event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event); // 取得事件处理函数的哈希表的引用
  // @ts-ignore

  var handlers = this.events[event.type]; //执行每一个处理函数

  for (var i in handlers) {
    // @ts-ignore
    this.$$handleEvent = handlers[i]; // @ts-ignore

    if (this.$$handleEvent(event) === false) {
      returnValue = false;
    }
  }

  return returnValue;
}
/**
 * 为IE的事件对象添加一些“缺失的”函数
 * @private
 * @param event - 事件类型
 * @returns 返回补齐了缺失方法的的event
 */


function fixEvent(event) {
  //添加标准的W3C方法
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
}

fixEvent.preventDefault = function () {
  this.returnValue = false;
};

fixEvent.stopPropagation = function () {
  this.cancelBubble = true;
};

function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid];
    }
  }
}

/**
 * 获取滑动到顶部和底部 返回'top' 'bottom'，建议使用限流
 * @returns 返回位置
 */
var getScrollPosition = function getScrollPosition() {
  var innerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var docScrollTop = document.documentElement.scrollTop;
  var bodyScrollTop = document.body.scrollTop;
  var docScrollHeight = document.documentElement.scrollHeight;
  var bodyScrollHeight = document.body.scrollHeight;
  var scrollT = 0,
      scrollH = 0;

  if (docScrollTop === 0) {
    scrollT = bodyScrollTop;
    scrollH = bodyScrollHeight;

    if (bodyScrollTop === 0) {
      return 'top';
    }
  } else {
    scrollT = docScrollTop;
    scrollH = docScrollHeight;
  } // if(bodyScrollTop === 0 && docScrollTop === 0){
  //   return 'top';
  // }


  if (innerH + Math.floor(scrollT) === scrollH || innerH + Math.ceil(scrollT) === scrollH) {
    return 'bottom';
  }
};

var aFunction$5 = aFunction$7;

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$5(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var isObject$9 = isObject$j;
var isArray$3 = isArray$5;
var wellKnownSymbol$f = wellKnownSymbol$t;

var SPECIES$1 = wellKnownSymbol$f('species');

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$3(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray$3(C.prototype))) C = undefined;
    else if (isObject$9(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$6 = functionBindContext;
var IndexedObject$3 = indexedObject;
var toObject$d = toObject$g;
var toLength$g = toLength$n;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$d($this);
    var self = IndexedObject$3(O);
    var boundFunction = bind$6(callbackfn, that, 3);
    var length = toLength$g(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$1;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$2(7)
};

var $forEach$2 = arrayIteration.forEach;
var arrayMethodIsStrict$5 = arrayMethodIsStrict$8;

var STRICT_METHOD$5 = arrayMethodIsStrict$5('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD$5 ? function forEach(callbackfn /* , thisArg */) {
  return $forEach$2(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var $$n = _export;
var forEach$2 = arrayForEach;

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$$n({ target: 'Array', proto: true, forced: [].forEach != forEach$2 }, {
  forEach: forEach$2
});

// TODO: use something more complex like timsort?
var floor$5 = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor$5(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    mergeSort(array.slice(0, middle), comparefn),
    mergeSort(array.slice(middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;
  var result = [];

  while (lindex < llength || rindex < rlength) {
    if (lindex < llength && rindex < rlength) {
      result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
    } else {
      result.push(lindex < llength ? left[lindex++] : right[rindex++]);
    }
  } return result;
};

var arraySort = mergeSort;

var userAgent$5 = engineUserAgent;

var firefox = userAgent$5.match(/firefox\/(\d+)/i);

var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;

var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent$4 = engineUserAgent;

var webkit = userAgent$4.match(/AppleWebKit\/(\d+)\./);

var engineWebkitVersion = !!webkit && +webkit[1];

var $$m = _export;
var aFunction$4 = aFunction$7;
var toObject$c = toObject$g;
var toLength$f = toLength$n;
var toString$4 = toString$h;
var fails$i = fails$y;
var internalSort$1 = arraySort;
var arrayMethodIsStrict$4 = arrayMethodIsStrict$8;
var FF$1 = engineFfVersion;
var IE_OR_EDGE$1 = engineIsIeOrEdge;
var V8$1 = engineV8Version;
var WEBKIT$1 = engineWebkitVersion;

var test = [];
var nativeSort$1 = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails$i(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails$i(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD$4 = arrayMethodIsStrict$4('sort');

var STABLE_SORT$1 = !fails$i(function () {
  // feature detection can be too slow, so check engines versions
  if (V8$1) return V8$1 < 70;
  if (FF$1 && FF$1 > 3) return;
  if (IE_OR_EDGE$1) return true;
  if (WEBKIT$1) return WEBKIT$1 < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED$6 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$4 || !STABLE_SORT$1;

var getSortCompare$1 = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString$4(x) > toString$4(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$$m({ target: 'Array', proto: true, forced: FORCED$6 }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aFunction$4(comparefn);

    var array = toObject$c(this);

    if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1.call(array) : nativeSort$1.call(array, comparefn);

    var items = [];
    var arrayLength = toLength$f(array.length);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) items.push(array[index]);
    }

    items = internalSort$1(items, getSortCompare$1(comparefn));
    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});

/**
 * @description 返回下一个zIndex值
 * @param min - 可选，最小值
 * @param max - 可选，最大值
 * @returns 数字
 */
function nextIndex(min, max) {
  if (min === void 0) {
    min = 5000;
  }

  if (max === void 0) {
    max = 10000;
  }

  var doms = [min];
  Array.prototype.forEach.call(document.querySelectorAll('body > *'), function (e) {
    var n = +window.getComputedStyle(e).zIndex || 0;
    n > min && n < max && doms.push(n);
  });
  doms.sort(function (a, b) {
    return b - a;
  });
  return doms[0] + 1;
}

/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
function fixNumber(number, n) {
  if (n === void 0) {
    n = 2;
  }

  var reg = new RegExp('^(.*\\..{' + n + '}).*$');
  number = '' + number;

  if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
    console.warn('请传入数字');
    return number;
  }

  return parseFloat(number.replace(reg, '$1'));
}

var fails$h = fails$y;

var correctPrototypeGetter = !fails$h(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var has$8 = has$g;
var toObject$b = toObject$g;
var sharedKey$1 = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

var IE_PROTO = sharedKey$1('IE_PROTO');
var ObjectPrototype$3 = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$1 ? Object.getPrototypeOf : function (O) {
  O = toObject$b(O);
  if (has$8(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype$3 : null;
};

var $$l = _export;
var fails$g = fails$y;
var toObject$a = toObject$g;
var nativeGetPrototypeOf = objectGetPrototypeOf;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var FAILS_ON_PRIMITIVES$2 = fails$g(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$$l({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject$a(it));
  }
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var global$l = global$D;
var DOMIterables$1 = domIterables;
var forEach$1 = arrayForEach;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$d;

for (var COLLECTION_NAME$1 in DOMIterables$1) {
  var Collection$1 = global$l[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== forEach$1) try {
    createNonEnumerableProperty$7(CollectionPrototype$1, 'forEach', forEach$1);
  } catch (error) {
    CollectionPrototype$1.forEach = forEach$1;
  }
}

/**
 * @description 判断是否数组
 * @param arr -
 */
function isArray$2(arr) {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

/**
 * getType
 * @description 获取目标类型
 * @param target - 目标
 * @returns 类型
 */
function getType(target) {
  var type = {
    '[object Array]': 'array',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object RegExp]': 'regexp',
    '[object String]': 'string'
  };
  if (target === null) return target + ''; // @ts-ignore

  return typeof target === 'object' || typeof target === 'function' ? type[Object.prototype.toString.call(target)] || 'object' : typeof target;
}

function isWindow(obj) {
  return obj !== null && obj === obj.window;
}

function isPlainObject(obj) {
  return getType(obj) === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
} //对象扩展


var extend = function () {
  /**
   * @param target
   * @param source
   * @param deep
   */
  // @ts-ignore
  function extend(target, source, deep) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (deep && (isPlainObject(source[key]) || isArray$2(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
          if (isArray$2(source[key]) && !isArray$2(target[key])) target[key] = [];
          extend(target[key], source[key], deep);
        } else if (source[key] !== undefined) target[key] = source[key];
      }
    }
  } // @ts-ignore


  return function (target) {
    // @ts-ignore
    var deep,
        args = Array.prototype.slice.call(arguments, 1);

    if (typeof target === 'boolean') {
      deep = target;
      target = args.shift();
    }

    args.forEach(function (arg) {
      // @ts-ignore
      extend(target, arg, deep);
    });
    return target;
  };
}();

var $$k = _export;
var $map$1 = arrayIteration.map;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$k({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

function delay() {
  return {
    map: {},
    register: function register(id, fn, time, boo) {
      var _this = this; // 注册


      if (boo) {
        // 防抖，一定时间内只触发第一次
        if (!this.map[id]) {
          // 不存在的先执行fn
          fn();
        }

        this.map[id] = {
          id: id,
          fn: fn,
          time: time,
          boo: boo,
          timeout: setTimeout(function () {
            _this.destroy(id);
          }, time)
        };
      } else {
        // 节流，一定时间内延迟执行
        if (this.map[id]) {
          // 已存在的先销毁
          this.destroy(id);
        }

        this.map[id] = {
          id: id,
          fn: fn,
          time: time,
          boo: boo,
          timeout: setTimeout(fn, time)
        };
      }
    },
    destroy: function destroy(id) {
      // 销毁
      if (!this.map[id]) {
        return;
      }

      clearTimeout(this.map[id].timeout);
      delete this.map[id];
    }
  };
}

function cleanData(data, map, nullFix) {
  var result = {};
  if (!data) return;
  if (!map) return data;

  if (isArray$2(map)) {
    map.forEach(function (key) {
      if (data.hasOwnProperty(key)) {
        result[key] = data[key];
      } else if (typeof nullFix !== 'undefined') {
        result[key] = nullFix;
      }
    });
  } else if (typeof map === 'object') {
    for (var key in map) {
      if (typeof map[key] === 'function') {
        result[key] = map[key](data);
      } else {
        if (!map[key]) map[key] = key;

        if (data.hasOwnProperty(map[key])) {
          result[key] = data[map[key]];
        } else if (typeof nullFix !== 'undefined') {
          result[key] = nullFix;
        }
      }
    }
  }

  return result;
}

var iterators = {};

var fails$f = fails$y;
var getPrototypeOf$3 = objectGetPrototypeOf;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$d;
var has$7 = has$g;
var wellKnownSymbol$e = wellKnownSymbol$t;

var ITERATOR$8 = wellKnownSymbol$e('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

var returnThis$2 = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$f(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$8].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!has$7(IteratorPrototype$2, ITERATOR$8)) {
  createNonEnumerableProperty$6(IteratorPrototype$2, ITERATOR$8, returnThis$2);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$5 = objectDefineProperty.f;
var has$6 = has$g;
var wellKnownSymbol$d = wellKnownSymbol$t;

var TO_STRING_TAG$2 = wellKnownSymbol$d('toStringTag');

var setToStringTag$7 = function (it, TAG, STATIC) {
  if (it && !has$6(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty$5(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$3 = objectCreate;
var createPropertyDescriptor$3 = createPropertyDescriptor$7;
var setToStringTag$6 = setToStringTag$7;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$2 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$3(IteratorPrototype$1, { next: createPropertyDescriptor$3(1, next) });
  setToStringTag$6(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$j = _export;
var createIteratorConstructor$1 = createIteratorConstructor$2;
var getPrototypeOf$2 = objectGetPrototypeOf;
var setPrototypeOf$5 = objectSetPrototypeOf;
var setToStringTag$5 = setToStringTag$7;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$d;
var redefine$6 = redefine$d.exports;
var wellKnownSymbol$c = wellKnownSymbol$t;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$7 = wellKnownSymbol$c('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor$1(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$7]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$5) {
          setPrototypeOf$5(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$7] != 'function') {
          createNonEnumerableProperty$5(CurrentIteratorPrototype, ITERATOR$7, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$5(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if (IterablePrototype[ITERATOR$7] !== defaultIterator) {
    createNonEnumerableProperty$5(IterablePrototype, ITERATOR$7, defaultIterator);
  }
  Iterators$3[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine$6(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$j({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var toIndexedObject$4 = toIndexedObject$a;
var addToUnscopables = addToUnscopables$2;
var Iterators$2 = iterators;
var InternalStateModule$7 = internalState;
var defineIterator$1 = defineIterator$2;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$7 = InternalStateModule$7.set;
var getInternalState$5 = InternalStateModule$7.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$7(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$4(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$5(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var charAt = stringMultibyte.charAt;
var toString$3 = toString$h;
var InternalStateModule$6 = internalState;
var defineIterator = defineIterator$2;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$6 = InternalStateModule$6.set;
var getInternalState$4 = InternalStateModule$6.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$6(this, {
    type: STRING_ITERATOR,
    string: toString$3(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$4(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var global$k = global$D;
var DOMIterables = domIterables;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$d;
var wellKnownSymbol$b = wellKnownSymbol$t;

var ITERATOR$6 = wellKnownSymbol$b('iterator');
var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$k[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$6] !== ArrayValues) try {
      createNonEnumerableProperty$4(CollectionPrototype, ITERATOR$6, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$6] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$1]) {
      createNonEnumerableProperty$4(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$4(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

var fails$e = fails$y;
var wellKnownSymbol$a = wellKnownSymbol$t;
var IS_PURE = isPure;

var ITERATOR$5 = wellKnownSymbol$a('iterator');

var nativeUrl = !fails$e(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR$5]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

var anInstance$5 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var DESCRIPTORS$9 = descriptors;
var fails$d = fails$y;
var objectKeys$1 = objectKeys$3;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var toObject$9 = toObject$g;
var IndexedObject$2 = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$4 = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$d(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$9 && $assign({ b: 1 }, $assign(defineProperty$4({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$4(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$9(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
  while (argumentsLength > index) {
    var S = IndexedObject$2(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$9 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var anObject$7 = anObject$k;

var iteratorClose$2 = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject$7(returnMethod.call(iterator)).value;
  }
};

var anObject$6 = anObject$k;
var iteratorClose$1 = iteratorClose$2;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$6(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose$1(iterator);
    throw error;
  }
};

var wellKnownSymbol$9 = wellKnownSymbol$t;
var Iterators$1 = iterators;

var ITERATOR$4 = wellKnownSymbol$9('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$3 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$4] === it);
};

var classof$4 = classof$6;
var Iterators = iterators;
var wellKnownSymbol$8 = wellKnownSymbol$t;

var ITERATOR$3 = wellKnownSymbol$8('iterator');

var getIteratorMethod$5 = function (it) {
  if (it != undefined) return it[ITERATOR$3]
    || it['@@iterator']
    || Iterators[classof$4(it)];
};

var bind$5 = functionBindContext;
var toObject$8 = toObject$g;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
var toLength$e = toLength$n;
var createProperty$1 = createProperty$3;
var getIteratorMethod$4 = getIteratorMethod$5;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject$8(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$4(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind$5(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod$2(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty$1(result, index, value);
    }
  } else {
    length = toLength$e(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty$1(result, index, value);
    }
  }
  result.length = index;
  return result;
};

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor$4 = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$4(delta / damp) : delta >> 1;
  delta += floor$4(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor$4(delta / baseMinusTMin);
  }
  return floor$4(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line max-statements -- TODO
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$4((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$4(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};

var redefine$5 = redefine$d.exports;

var redefineAll$3 = function (target, src, options) {
  for (var key in src) redefine$5(target, key, src[key], options);
  return target;
};

var anObject$5 = anObject$k;
var getIteratorMethod$3 = getIteratorMethod$5;

var getIterator$1 = function (it) {
  var iteratorMethod = getIteratorMethod$3(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject$5(iteratorMethod.call(it));
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$i = _export;
var getBuiltIn$2 = getBuiltIn$8;
var USE_NATIVE_URL$1 = nativeUrl;
var redefine$4 = redefine$d.exports;
var redefineAll$2 = redefineAll$3;
var setToStringTag$4 = setToStringTag$7;
var createIteratorConstructor = createIteratorConstructor$2;
var InternalStateModule$5 = internalState;
var anInstance$4 = anInstance$5;
var hasOwn = has$g;
var bind$4 = functionBindContext;
var classof$3 = classof$6;
var anObject$4 = anObject$k;
var isObject$8 = isObject$j;
var $toString$2 = toString$h;
var create$2 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$7;
var getIterator = getIterator$1;
var getIteratorMethod$2 = getIteratorMethod$5;
var wellKnownSymbol$7 = wellKnownSymbol$t;

var nativeFetch = getBuiltIn$2('fetch');
var NativeRequest = getBuiltIn$2('Request');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var Headers = getBuiltIn$2('Headers');
var ITERATOR$2 = wellKnownSymbol$7('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$5 = InternalStateModule$5.set;
var getInternalParamsState = InternalStateModule$5.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$5.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$5(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance$4(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState$5(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject$8(init)) {
      iteratorMethod = getIteratorMethod$2(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject$4(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: $toString$2(first.value), value: $toString$2(second.value) });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: $toString$2(init[key]) });
    } else {
      parseSearchParams(
        entries,
        typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : $toString$2(init)
      );
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll$2(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: $toString$2(name), value: $toString$2(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString$2(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$2(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$2(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$2(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString$2(name);
    var val = $toString$2(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind$4(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine$4(URLSearchParamsPrototype, ITERATOR$2, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine$4(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag$4(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$i({ global: true, forced: !USE_NATIVE_URL$1 }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL$1 && typeof Headers == 'function') {
  var wrapRequestOptions = function (init) {
    if (isObject$8(init)) {
      var body = init.body;
      var headers;
      if (classof$3(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headers.has('content-type')) {
          headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create$2(init, {
          body: createPropertyDescriptor$2(0, String(body)),
          headers: createPropertyDescriptor$2(0, headers)
        });
      }
    } return init;
  };

  if (typeof nativeFetch == 'function') {
    $$i({ global: true, enumerable: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (typeof NativeRequest == 'function') {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance$4(this, RequestConstructor, 'Request');
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$i({ global: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

var web_urlSearchParams = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$h = _export;
var DESCRIPTORS$8 = descriptors;
var USE_NATIVE_URL = nativeUrl;
var global$j = global$D;
var defineProperties = objectDefineProperties;
var redefine$3 = redefine$d.exports;
var anInstance$3 = anInstance$5;
var has$5 = has$g;
var assign$1 = objectAssign;
var arrayFrom = arrayFrom$1;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString$1 = toString$h;
var setToStringTag$3 = setToStringTag$7;
var URLSearchParamsModule = web_urlSearchParams;
var InternalStateModule$4 = internalState;

var NativeURL = global$j.URL;
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState$4 = InternalStateModule$4.set;
var getInternalURLState = InternalStateModule$4.getterFor('URL');
var floor$3 = Math.floor;
var pow$1 = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
/* eslint-disable no-control-regex -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable no-control-regex -- safe */
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow$1(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow$1(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor$3(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign$1({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign$1({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign$1({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has$5(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has$5(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements -- TODO
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has$5(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance$3(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = $toString$1(url);
  var state = setInternalState$4(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, $toString$1(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams$1();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS$8) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URLConstructor(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS$8) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = $toString$1(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, $toString$1(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString$1(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom($toString$1(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString$1(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, $toString$1(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = $toString$1(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, $toString$1(pathname), PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = $toString$1(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = $toString$1(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine$3(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine$3(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeCreateObjectURL) redefine$3(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeRevokeObjectURL) redefine$3(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag$3(URLConstructor, 'URL');

$$h({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$8 }, {
  URL: URLConstructor
});

/**
 * @description 文件下载的几种方式：1. 针对一些浏览器无法识别的文件格式。地址栏输入文件URL、window.location.href = URL、window.open(URL)；2. 使用a标签download属性（或者js创建a标签）；3. 浏览器可识别的pdf、txt文件，后端兼容处理attachment；4. 在header增加token用于鉴权下载，使用XmlHttpRequest来想后台发起请求
 * @param url - 链接
 * @param filename - 文件名
 * @param type - 下载类型 'href','open','download','request'
 */
var download = function download(url, filename, type) {
  if (type === void 0) {
    type = 'download';
  } // @ts-ignore


  var name = /[^\/]+$/.exec(url)[0];
      // @ts-ignore
  /[^\.]+$/.exec(name)[0].toLowerCase();

  if (type === 'open') {
    window.open(url);
  } else if (type === 'href') {
    window.location.href = url;
  } else if (type === 'request') {
    downloadUrlFile(url, filename || name);
  } else {
    openFile(url, filename || name);
  }
};
/**
 * @description 新标签页下载文件
 * @private
 * @param url - 链接
 * @param filename - 文件名
 */


function openFile(url, filename, fileType) {
  var dom = document.createElement('a'); // if (['pdf', 'txt'].includes(fileType)) console.log('is pdf')

  dom.style.display = 'none';
  dom.download = filename;
  dom.href = url;
  document.body.appendChild(dom);
  dom.click();
  document.body.removeChild(dom);
}
/**
 * @description 下载二级制文件
 * @private
 * @param url - 链接
 * @param filename - 文件名
 */


function downloadUrlFile(url, filename) {
  // @ts-ignore
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (xhr.status === 200) {
      saveFile(xhr.response, filename);
    }
  };

  xhr.send();
}
/**
 * @description 保存文件
 * @private
 * @param data - 文件数据
 * @param filename - 文件名
 */


function saveFile(data, filename) {
  var urlObject = window.URL || window.webkitURL || window;
  var blob = new Blob([data]);
  var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  link.href = urlObject.createObjectURL(blob);
  link.download = filename;
  link.click();
}

var $$g = _export;
var toObject$7 = toObject$g;
var nativeKeys = objectKeys$3;
var fails$c = fails$y;

var FAILS_ON_PRIMITIVES$1 = fails$c(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$$g({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
  keys: function keys(it) {
    return nativeKeys(toObject$7(it));
  }
});

var $$f = _export;
var setPrototypeOf$4 = objectSetPrototypeOf;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$$f({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf$4
});

var $$e = _export;
var DESCRIPTORS$7 = descriptors;
var create$1 = objectCreate;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$$e({ target: 'Object', stat: true, sham: !DESCRIPTORS$7 }, {
  create: create$1
});

var $$d = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$d({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */

var toIndexedObject$3 = toIndexedObject$a;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

var toString$2 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && toString$2.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject$3(it));
};

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$6 = wellKnownSymbol$t;

wellKnownSymbolWrapped.f = wellKnownSymbol$6;

var global$i = global$D;

var path$1 = global$i;

var path = path$1;
var has$4 = has$g;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$3 = objectDefineProperty.f;

var defineWellKnownSymbol$3 = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has$4(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var $$c = _export;
var global$h = global$D;
var getBuiltIn$1 = getBuiltIn$8;
var DESCRIPTORS$6 = descriptors;
var NATIVE_SYMBOL = nativeSymbol;
var fails$b = fails$y;
var has$3 = has$g;
var isArray$1 = isArray$5;
var isObject$7 = isObject$j;
var isSymbol$1 = isSymbol$5;
var anObject$3 = anObject$k;
var toObject$6 = toObject$g;
var toIndexedObject$2 = toIndexedObject$a;
var toPropertyKey$1 = toPropertyKey$5;
var $toString = toString$h;
var createPropertyDescriptor$1 = createPropertyDescriptor$7;
var nativeObjectCreate = objectCreate;
var objectKeys = objectKeys$3;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$d;
var redefine$2 = redefine$d.exports;
var shared = shared$5.exports;
var sharedKey = sharedKey$4;
var hiddenKeys = hiddenKeys$5;
var uid$1 = uid$4;
var wellKnownSymbol$5 = wellKnownSymbol$t;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$2 = defineWellKnownSymbol$3;
var setToStringTag$2 = setToStringTag$7;
var InternalStateModule$3 = internalState;
var $forEach$1 = arrayIteration.forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');
var setInternalState$3 = InternalStateModule$3.set;
var getInternalState$3 = InternalStateModule$3.getterFor(SYMBOL);
var ObjectPrototype$2 = Object[PROTOTYPE$1];
var $Symbol = global$h.Symbol;
var $stringify = getBuiltIn$1('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$1.f;
var nativeDefineProperty$1 = definePropertyModule$1.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global$h.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS$6 && fails$b(function () {
  return nativeObjectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$2, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$2[P];
  nativeDefineProperty$1(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$2) {
    nativeDefineProperty$1(ObjectPrototype$2, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE$1]);
  setInternalState$3(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$6) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$2) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject$3(O);
  var key = toPropertyKey$1(P);
  anObject$3(Attributes);
  if (has$3(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has$3(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$1(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject$3(O);
  var properties = toIndexedObject$2(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach$1(keys, function (key) {
    if (!DESCRIPTORS$6 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey$1(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype$2 && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$2(O);
  var key = toPropertyKey$1(P);
  if (it === ObjectPrototype$2 && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
  if (descriptor && has$3(AllSymbols, key) && !(has$3(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$2(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (!has$3(AllSymbols, key) && !has$3(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$2;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$2(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype$2, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid$1(description);
    var setter = function (value) {
      if (this === ObjectPrototype$2) setter.call(ObjectPrototypeSymbols, value);
      if (has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
    };
    if (DESCRIPTORS$6 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$2, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine$2($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$3(this).tag;
  });

  redefine$2($Symbol, 'withoutSetter', function (description) {
    return wrap(uid$1(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule$1.f = $defineProperty;
  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol$5(name), name);
  };

  if (DESCRIPTORS$6) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$3(this).description;
      }
    });
    {
      redefine$2(ObjectPrototype$2, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$$c({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol$2(name);
});

$$c({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (has$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol$1(sym)) throw TypeError(sym + ' is not a symbol');
    if (has$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$$c({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$6 }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$$c({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$$c({ target: 'Object', stat: true, forced: fails$b(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject$6(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$b(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $$c({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject$7(replacer) && it === undefined || isSymbol$1(it)) return; // IE8 returns string on undefined
      if (!isArray$1(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol$1(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty$3($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$2($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

var $$b = _export;
var fails$a = fails$y;
var toIndexedObject$1 = toIndexedObject$a;
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var DESCRIPTORS$5 = descriptors;

var FAILS_ON_PRIMITIVES = fails$a(function () { nativeGetOwnPropertyDescriptor$1(1); });
var FORCED$5 = !DESCRIPTORS$5 || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$$b({ target: 'Object', stat: true, forced: FORCED$5, sham: !DESCRIPTORS$5 }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$1(toIndexedObject$1(it), key);
  }
});

var $$a = _export;
var DESCRIPTORS$4 = descriptors;
var objectDefinePropertyModile = objectDefineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$$a({ target: 'Object', stat: true, forced: !DESCRIPTORS$4, sham: !DESCRIPTORS$4 }, {
  defineProperty: objectDefinePropertyModile.f
});

var global$g = global$D;

var nativePromiseConstructor = global$g.Promise;

var anObject$2 = anObject$k;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
var toLength$d = toLength$n;
var bind$3 = functionBindContext;
var getIteratorMethod$1 = getIteratorMethod$5;
var iteratorClose = iteratorClose$2;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$1 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$3(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$2(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$1(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$1(iterFn)) {
      for (index = 0, length = toLength$d(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

var wellKnownSymbol$4 = wellKnownSymbol$t;

var ITERATOR$1 = wellKnownSymbol$4('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$1] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$1] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var userAgent$3 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$3);

var classof$2 = classofRaw$1;
var global$f = global$D;

var engineIsNode = classof$2(global$f.process) == 'process';

var global$e = global$D;
var fails$9 = fails$y;
var bind$2 = functionBindContext;
var html = html$2;
var createElement = documentCreateElement$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var set$1 = global$e.setImmediate;
var clear = global$e.clearImmediate;
var process$2 = global$e.process;
var MessageChannel = global$e.MessageChannel;
var Dispatch = global$e.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location$1, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location$1 = global$e.location;
} catch (error) { /* empty */ }

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$e.postMessage(String(id), location$1.protocol + '//' + location$1.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;
    while (argumentsLength > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE$3) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$2(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$e.addEventListener &&
    typeof postMessage == 'function' &&
    !global$e.importScripts &&
    location$1 && location$1.protocol !== 'file:' &&
    !fails$9(post)
  ) {
    defer = post;
    global$e.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set$1,
  clear: clear
};

var userAgent$2 = engineUserAgent;
var global$d = global$D;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$2) && global$d.Pebble !== undefined;

var userAgent$1 = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$1);

var global$c = global$D;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver = global$c.MutationObserver || global$c.WebKitMutationObserver;
var document$2 = global$c.document;
var process$1 = global$c.process;
var Promise$1 = global$c.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$c, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = promise.then;
    notify$1 = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE$2) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$c, flush);
    };
  }
}

var microtask$1 = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var newPromiseCapability$2 = {};

var aFunction$3 = aFunction$7;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$3(resolve);
  this.reject = aFunction$3(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$1 = anObject$k;
var isObject$6 = isObject$j;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$1(C);
  if (isObject$6(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var global$b = global$D;

var hostReportErrors$1 = function (a, b) {
  var console = global$b.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$1 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var engineIsBrowser = typeof window == 'object';

var $$9 = _export;
var global$a = global$D;
var getBuiltIn = getBuiltIn$8;
var NativePromise = nativePromiseConstructor;
var redefine$1 = redefine$d.exports;
var redefineAll$1 = redefineAll$3;
var setPrototypeOf$3 = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$7;
var setSpecies$1 = setSpecies$3;
var isObject$5 = isObject$j;
var aFunction$2 = aFunction$7;
var anInstance$2 = anInstance$5;
var inspectSource = inspectSource$3;
var iterate = iterate$1;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
var speciesConstructor$2 = speciesConstructor$4;
var task = task$1.set;
var microtask = microtask$1;
var promiseResolve = promiseResolve$1;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$1;
var InternalStateModule$2 = internalState;
var isForced = isForced_1;
var wellKnownSymbol$3 = wellKnownSymbol$t;
var IS_BROWSER = engineIsBrowser;
var IS_NODE$1 = engineIsNode;
var V8_VERSION$1 = engineV8Version;

var SPECIES = wellKnownSymbol$3('species');
var PROMISE = 'Promise';
var getInternalState$2 = InternalStateModule$2.get;
var setInternalState$2 = InternalStateModule$2.set;
var getInternalPromiseState = InternalStateModule$2.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError$1 = global$a.TypeError;
var document$1 = global$a.document;
var process = global$a.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$a.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED$4 = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$1 === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION$1 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED$4 || !checkCorrectnessOfIteration$1(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject$5(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$a.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global$a['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global$a, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global$a, function () {
    var promise = state.facade;
    if (IS_NODE$1) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$1 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$2(this, PromiseConstructor, PROMISE);
    aFunction$2(executor);
    Internal.call(this);
    var state = getInternalState$2(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$2(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll$1(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor$2(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState$2(promise);
    this.promise = promise;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine$1(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine$1(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf$3) {
      setPrototypeOf$3(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$$9({ global: true, wrap: true, forced: FORCED$4 }, {
  Promise: PromiseConstructor
});

setToStringTag$1(PromiseConstructor, PROMISE, false);
setSpecies$1(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$$9({ target: PROMISE, stat: true, forced: FORCED$4 }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$$9({ target: PROMISE, stat: true, forced: FORCED$4 }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

$$9({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$2(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$2(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$8 = _export;
var DESCRIPTORS$3 = descriptors;
var global$9 = global$D;
var has$2 = has$g;
var isObject$4 = isObject$j;
var defineProperty$2 = objectDefineProperty.f;
var copyConstructorProperties = copyConstructorProperties$2;

var NativeSymbol = global$9.Symbol;

if (DESCRIPTORS$3 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$2(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject$4(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has$2(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $$8({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

var defineWellKnownSymbol$1 = defineWellKnownSymbol$3;

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol$1('iterator');

var $$7 = _export;
var fails$8 = fails$y;
var isArray = isArray$5;
var isObject$3 = isObject$j;
var toObject$5 = toObject$g;
var toLength$c = toLength$n;
var createProperty = createProperty$3;
var arraySpeciesCreate = arraySpeciesCreate$2;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
var wellKnownSymbol$2 = wellKnownSymbol$t;
var V8_VERSION = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol$2('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$8(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$3(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$7({ target: 'Array', proto: true, forced: FORCED$3 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$5(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength$c(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var defineWellKnownSymbol = defineWellKnownSymbol$3;

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
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

function searchTreeObject(tree, expression, keySet, number) {
  if (number === void 0) {
    number = 0;
  }

  var retNode = [],
      isLimit = number > 0;

  if (!keySet || typeof keySet !== 'object') {
    keySet = {
      childName: 'child',
      keyName: 'name'
    };
  }

  if (Object.prototype.toString.call(tree) === '[object Object]') tree = [tree];
  /**
   * @description 递归查找
   *
   * @private
   * @param tree - 对象
   * @param expression - 表达式
   * @returns Nodes
   */

  function deepSearch(tree, expression) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i][keySet.childName] && tree[i][keySet.childName].length > 0) {
        deepSearch(tree[i][keySet.childName], expression);
      }

      var result = true;

      if (typeof expression === 'object') {
        var keys = Object.keys(expression);

        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];

          if (expression[key] !== tree[i][key]) {
            result = false;
            break;
          }
        }
      } else if (typeof expression === 'function') {
        result = expression.call(tree[i], tree[i]);
      } else {
        result = tree[i][keySet.keyName] === expression;
      }

      if (isLimit) {
        // 限制查询个数
        if (number > 0) {
          if (result) {
            var treeNode = _assign({}, tree[i]);

            delete treeNode[keySet.childName];
            retNode.push(treeNode);
            number--;
          }
        } else {
          break;
        }
      } else {
        if (result) {
          var treeNode = _assign({}, tree[i]);

          delete treeNode[keySet.childName];
          retNode.push(treeNode);
        }
      }
    }
  }

  deepSearch(tree, expression);
  return retNode;
}

/**
 * @description 新标签页打开链接（浏览器不能解析的文件跳转下载）
 * @param url - 链接
 */
function openUrl(url) {
  var dom = document.createElement('a');
  dom.style.display = 'none';
  dom.href = url;
  dom.setAttribute('target', '_blank');
  document.body.appendChild(dom);
  dom.click();
  document.body.removeChild(dom);
}

/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
function splitThousand(val) {
  if (!val) return val === 0 || val === '0' ? 0 : '';
  val = val.toString();
  if (val.split('.').length == 1) return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return val.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') + '.' + val.split('.')[1];
}

var $$6 = _export;
var $every$1 = arrayIteration.every;
var arrayMethodIsStrict$3 = arrayMethodIsStrict$8;

var STRICT_METHOD$3 = arrayMethodIsStrict$3('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$$6({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var all = function all(arr, fn) {
  return arr.every(fn);
};

var $$5 = _export;
var $some$1 = arrayIteration.some;
var arrayMethodIsStrict$2 = arrayMethodIsStrict$8;

var STRICT_METHOD$2 = arrayMethodIsStrict$2('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$$5({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var any = function any(arr, fn) {
  return arr.some(fn);
};

// eslint-disable-next-line es/no-typed-arrays -- safe
var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

var toInteger$3 = toInteger$9;
var toLength$b = toLength$n;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
var toIndex$2 = function (it) {
  if (it === undefined) return 0;
  var number = toInteger$3(it);
  var length = toLength$b(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

// IEEE754 conversions based on https://github.com/feross/ieee754
var abs = Math.abs;
var pow = Math.pow;
var floor$2 = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor$2(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

var toObject$4 = toObject$g;
var toAbsoluteIndex$3 = toAbsoluteIndex$6;
var toLength$a = toLength$n;

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
  var O = toObject$4(this);
  var length = toLength$a(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$3(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex$3(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var global$8 = global$D;
var DESCRIPTORS$2 = descriptors;
var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$d;
var redefineAll = redefineAll$3;
var fails$7 = fails$y;
var anInstance$1 = anInstance$5;
var toInteger$2 = toInteger$9;
var toLength$9 = toLength$n;
var toIndex$1 = toIndex$2;
var IEEE754 = ieee754;
var getPrototypeOf$1 = objectGetPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var defineProperty$1 = objectDefineProperty.f;
var arrayFill = arrayFill$1;
var setToStringTag = setToStringTag$7;
var InternalStateModule$1 = internalState;

var getInternalState$1 = InternalStateModule$1.get;
var setInternalState$1 = InternalStateModule$1.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH$1 = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global$8[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global$8[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$1 = Object.prototype;
var RangeError$2 = global$8.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter$1 = function (Constructor, key) {
  defineProperty$1(Constructor[PROTOTYPE], key, { get: function () { return getInternalState$1(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER$1) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance$1(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex$1(length);
    setInternalState$1(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS$2) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance$1(this, $DataView, DATA_VIEW);
    anInstance$1(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState$1(buffer).byteLength;
    var offset = toInteger$2(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError$2('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength$9(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError$2(WRONG_LENGTH$1);
    setInternalState$1(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS$2) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS$2) {
    addGetter$1($ArrayBuffer, 'byteLength');
    addGetter$1($DataView, 'buffer');
    addGetter$1($DataView, 'byteLength');
    addGetter$1($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  /* eslint-disable no-new -- required for testing */
  if (!fails$7(function () {
    NativeArrayBuffer(1);
  }) || !fails$7(function () {
    new NativeArrayBuffer(-1);
  }) || fails$7(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$1(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex$1(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames$1(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty$2($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf$2 && getPrototypeOf$1($DataViewPrototype) !== ObjectPrototype$1) {
    setPrototypeOf$2($DataViewPrototype, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

var $$4 = _export;
var fails$6 = fails$y;
var ArrayBufferModule$1 = arrayBuffer;
var anObject = anObject$k;
var toAbsoluteIndex$2 = toAbsoluteIndex$6;
var toLength$8 = toLength$n;
var speciesConstructor$1 = speciesConstructor$4;

var ArrayBuffer$3 = ArrayBufferModule$1.ArrayBuffer;
var DataView$2 = ArrayBufferModule$1.DataView;
var nativeArrayBufferSlice = ArrayBuffer$3.prototype.slice;

var INCORRECT_SLICE = fails$6(function () {
  return !new ArrayBuffer$3(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$$4({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex$2(start, length);
    var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
    var result = new (speciesConstructor$1(this, ArrayBuffer$3))(toLength$8(fin - first));
    var viewSource = new DataView$2(this);
    var viewTarget = new DataView$2(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});

var typedArrayConstructor = {exports: {}};

var NATIVE_ARRAY_BUFFER = arrayBufferNative;
var DESCRIPTORS$1 = descriptors;
var global$7 = global$D;
var isObject$2 = isObject$j;
var has$1 = has$g;
var classof$1 = classof$6;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$d;
var redefine = redefine$d.exports;
var defineProperty = objectDefineProperty.f;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var wellKnownSymbol$1 = wellKnownSymbol$t;
var uid = uid$4;

var Int8Array$3 = global$7.Int8Array;
var Int8ArrayPrototype = Int8Array$3 && Int8Array$3.prototype;
var Uint8ClampedArray = global$7.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray$1 = Int8Array$3 && getPrototypeOf(Int8Array$3);
var TypedArrayPrototype$1 = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
var TYPED_ARRAY_TAG$1 = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR$2 = uid('TYPED_ARRAY_CONSTRUCTOR');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$1 && classof$1(global$7.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject$2(it)) return false;
  var klass = classof$1(it);
  return klass === 'DataView'
    || has$1(TypedArrayConstructorsList, klass)
    || has$1(BigIntArrayConstructorsList, klass);
};

var isTypedArray$1 = function (it) {
  if (!isObject$2(it)) return false;
  var klass = classof$1(it);
  return has$1(TypedArrayConstructorsList, klass)
    || has$1(BigIntArrayConstructorsList, klass);
};

var aTypedArray$m = function (it) {
  if (isTypedArray$1(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor$3 = function (C) {
  if (setPrototypeOf$1 && !isPrototypeOf.call(TypedArray$1, C)) {
    throw TypeError('Target is not a typed array constructor');
  } return C;
};

var exportTypedArrayMethod$n = function (KEY, property, forced) {
  if (!DESCRIPTORS$1) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global$7[ARRAY];
    if (TypedArrayConstructor && has$1(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) { /* empty */ }
  }
  if (!TypedArrayPrototype$1[KEY] || forced) {
    redefine(TypedArrayPrototype$1, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$1) return;
  if (setPrototypeOf$1) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$7[ARRAY];
      if (TypedArrayConstructor && has$1(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray$1[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$7[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global$7[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty$1(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global$7[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty$1(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || typeof TypedArray$1 != 'function' || TypedArray$1 === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray$1 = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$7[NAME]) setPrototypeOf$1(global$7[NAME], TypedArray$1);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype) {
  TypedArrayPrototype$1 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$7[NAME]) setPrototypeOf$1(global$7[NAME].prototype, TypedArrayPrototype$1);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
  setPrototypeOf$1(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
}

if (DESCRIPTORS$1 && !has$1(TypedArrayPrototype$1, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype$1, TO_STRING_TAG, { get: function () {
    return isObject$2(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global$7[NAME]) {
    createNonEnumerableProperty$1(global$7[NAME], TYPED_ARRAY_TAG$1, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$2,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$m,
  aTypedArrayConstructor: aTypedArrayConstructor$3,
  exportTypedArrayMethod: exportTypedArrayMethod$n,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$1
};

/* eslint-disable no-new -- required for testing */

var global$6 = global$D;
var fails$5 = fails$y;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$2 = global$6.ArrayBuffer;
var Int8Array$2 = global$6.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$5(function () {
  Int8Array$2(1);
}) || !fails$5(function () {
  new Int8Array$2(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array$2();
  new Int8Array$2(null);
  new Int8Array$2(1.5);
  new Int8Array$2(iterable);
}, true) || fails$5(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
});

var isObject$1 = isObject$j;

var floor$1 = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.es/ecma262/#sec-number.isinteger
var isInteger$1 = function isInteger(it) {
  return !isObject$1(it) && isFinite(it) && floor$1(it) === it;
};

var toInteger$1 = toInteger$9;

var toPositiveInteger$1 = function (it) {
  var result = toInteger$1(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

var toPositiveInteger = toPositiveInteger$1;

var toOffset$2 = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

var toObject$3 = toObject$g;
var toLength$7 = toLength$n;
var getIteratorMethod = getIteratorMethod$5;
var isArrayIteratorMethod = isArrayIteratorMethod$3;
var bind = functionBindContext;
var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;

var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
  var O = toObject$3(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength$7(O.length);
  result = new (aTypedArrayConstructor$2(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

var $$3 = _export;
var global$5 = global$D;
var DESCRIPTORS = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$n = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance = anInstance$5;
var createPropertyDescriptor = createPropertyDescriptor$7;
var createNonEnumerableProperty = createNonEnumerableProperty$d;
var isInteger = isInteger$1;
var toLength$6 = toLength$n;
var toIndex = toIndex$2;
var toOffset$1 = toOffset$2;
var toPropertyKey = toPropertyKey$5;
var has = has$g;
var classof = classof$6;
var isObject = isObject$j;
var isSymbol = isSymbol$5;
var create = objectCreate;
var setPrototypeOf = objectSetPrototypeOf;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var typedArrayFrom = typedArrayFrom$1;
var forEach = arrayIteration.forEach;
var setSpecies = setSpecies$3;
var definePropertyModule = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var InternalStateModule = internalState;
var inheritIfRequired = inheritIfRequired$2;

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError$1 = global$5.RangeError;
var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$n.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR$1 = ArrayBufferViewCore$n.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$n.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$n.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore$n.TypedArrayPrototype;
var aTypedArrayConstructor$1 = ArrayBufferViewCore$n.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore$n.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor$1(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer$1 || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isInteger(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $$3({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global$5[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$1(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
          } else {
            byteLength = toLength$6($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView$1(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR$1, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $$3({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else typedArrayConstructor.exports = function () { /* empty */ };

var createTypedArrayConstructor = typedArrayConstructor.exports;

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var toObject$2 = toObject$g;
var toAbsoluteIndex$1 = toAbsoluteIndex$6;
var toLength$5 = toLength$n;

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject$2(this);
  var len = toLength$5(O.length);
  var to = toAbsoluteIndex$1(target, len);
  var from = toAbsoluteIndex$1(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex$1(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

var ArrayBufferViewCore$m = arrayBufferViewCore;
var $copyWithin = arrayCopyWithin;

var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

var ArrayBufferViewCore$l = arrayBufferViewCore;
var $every = arrayIteration.every;

var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$k = arrayBufferViewCore;
var $fill = arrayFill$1;

var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars -- required for `.length`
exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray$j(this), arguments);
});

var arrayFromConstructorAndList$1 = function (Constructor, list) {
  var index = 0;
  var length = list.length;
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var ArrayBufferViewCore$j = arrayBufferViewCore;
var speciesConstructor = speciesConstructor$4;

var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore$j.TYPED_ARRAY_CONSTRUCTOR;
var aTypedArrayConstructor = ArrayBufferViewCore$j.aTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
var typedArraySpeciesConstructor$4 = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
};

var arrayFromConstructorAndList = arrayFromConstructorAndList$1;
var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;

var typedArrayFromSpeciesAndList = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor$3(instance), list);
};

var ArrayBufferViewCore$i = arrayBufferViewCore;
var $filter = arrayIteration.filter;
var fromSpeciesAndList = typedArrayFromSpeciesAndList;

var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});

var ArrayBufferViewCore$h = arrayBufferViewCore;
var $find = arrayIteration.find;

var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$g = arrayBufferViewCore;
var $findIndex = arrayIteration.findIndex;

var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$f = arrayBufferViewCore;
var $forEach = arrayIteration.forEach;

var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$e = arrayBufferViewCore;
var $includes = arrayIncludes.includes;

var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$d = arrayBufferViewCore;
var $indexOf = arrayIncludes.indexOf;

var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

var global$4 = global$D;
var ArrayBufferViewCore$c = arrayBufferViewCore;
var ArrayIterators = es_array_iterator;
var wellKnownSymbol = wellKnownSymbol$t;

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array$2 = global$4.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array$2 && Uint8Array$2.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray$c(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod$d('entries', function entries() {
  return arrayEntries.call(aTypedArray$c(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod$d('keys', function keys() {
  return arrayKeys.call(aTypedArray$c(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod$d('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod$d(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);

var ArrayBufferViewCore$b = arrayBufferViewCore;

var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars -- required for `.length`
exportTypedArrayMethod$c('join', function join(separator) {
  return $join.apply(aTypedArray$b(this), arguments);
});

var ArrayBufferViewCore$a = arrayBufferViewCore;
var $lastIndexOf = arrayLastIndexOf;

var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars -- required for `.length`
exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray$a(this), arguments);
});

var ArrayBufferViewCore$9 = arrayBufferViewCore;
var $map = arrayIteration.map;
var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;

var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (typedArraySpeciesConstructor$2(O))(length);
  });
});

var aFunction$1 = aFunction$7;
var toObject$1 = toObject$g;
var IndexedObject$1 = indexedObject;
var toLength$4 = toLength$n;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$1 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject$1(that);
    var self = IndexedObject$1(O);
    var length = toLength$4(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod$1(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$1(true)
};

var ArrayBufferViewCore$8 = arrayBufferViewCore;
var $reduce$1 = arrayReduce.left;

var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce$1(aTypedArray$8(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$7 = arrayBufferViewCore;
var $reduceRight = arrayReduce.right;

var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray$7(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$6 = arrayBufferViewCore;

var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod$7('reverse', function reverse() {
  var that = this;
  var length = aTypedArray$6(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

var ArrayBufferViewCore$5 = arrayBufferViewCore;
var toLength$3 = toLength$n;
var toOffset = toOffset$2;
var toObject = toObject$g;
var fails$4 = fails$y;

var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

var FORCED$2 = fails$4(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
  aTypedArray$5(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength$3(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED$2);

var ArrayBufferViewCore$4 = arrayBufferViewCore;
var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
var fails$3 = fails$y;

var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;
var $slice$1 = [].slice;

var FORCED$1 = fails$3(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod$5('slice', function slice(start, end) {
  var list = $slice$1.call(aTypedArray$4(this), start, end);
  var C = typedArraySpeciesConstructor$1(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED$1);

var ArrayBufferViewCore$3 = arrayBufferViewCore;
var $some = arrayIteration.some;

var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$2 = arrayBufferViewCore;
var global$3 = global$D;
var fails$2 = fails$y;
var aFunction = aFunction$7;
var toLength$2 = toLength$n;
var internalSort = arraySort;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;

var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
var Uint16Array = global$3.Uint16Array;
var nativeSort = Uint16Array && Uint16Array.prototype.sort;

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !fails$2(function () {
  var array = new Uint16Array(2);
  array.sort(null);
  array.sort({});
});

var STABLE_SORT = !!nativeSort && !fails$2(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  array.sort(function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod$3('sort', function sort(comparefn) {
  var array = this;
  if (comparefn !== undefined) aFunction(comparefn);
  if (STABLE_SORT) return nativeSort.call(array, comparefn);

  aTypedArray$2(array);
  var arrayLength = toLength$2(array.length);
  var items = Array(arrayLength);
  var index;

  for (index = 0; index < arrayLength; index++) {
    items[index] = array[index];
  }

  items = internalSort(array, getSortCompare(comparefn));

  for (index = 0; index < arrayLength; index++) {
    array[index] = items[index];
  }

  return array;
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

var ArrayBufferViewCore$1 = arrayBufferViewCore;
var toLength$1 = toLength$n;
var toAbsoluteIndex = toAbsoluteIndex$6;
var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;

var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
  var O = aTypedArray$1(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength$1((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

var global$2 = global$D;
var ArrayBufferViewCore = arrayBufferViewCore;
var fails$1 = fails$y;

var Int8Array$1 = global$2.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$1(function () {
  $toLocaleString.call(new Int8Array$1(1));
});

var FORCED = fails$1(function () {
  return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
}) || !fails$1(function () {
  Int8Array$1.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);

var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
var fails = fails$y;
var global$1 = global$D;

var Uint8Array$1 = global$1.Uint8Array;
var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

/**
 * @description 浏览器端生成uuid，采用v4方法
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
// @ts-ignore
var uuid = function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

var $$2 = _export;
var IndexedObject = indexedObject;
var toIndexedObject = toIndexedObject$a;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$8;

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$$2({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

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
var arrayToCSV = function arrayToCSV(arr, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  return arr.map(function (v) {
    return v.map(function (x) {
      return isNaN(x) ? "\"" + x.replace(/"/g, '""') + "\"" : x;
    }).join(delimiter);
  }).join('\n');
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
var CSVToArray = function CSVToArray(data, delimiter, omitFirstRow) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  if (omitFirstRow === void 0) {
    omitFirstRow = false;
  }

  return data.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0).split('\n').map(function (v) {
    return v.split(delimiter);
  });
};

var $$1 = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict = arrayMethodIsStrict$8;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$1({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

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
var CSVToJSON = function CSVToJSON(data, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  var titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data.slice(data.indexOf('\n') + 1).split('\n').map(function (v) {
    var values = v.split(delimiter);
    return titles.reduce(function (obj, title, index) {
      return obj[title] = values[index], obj;
    }, {});
  });
};

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

var JSONToCSV = function JSONToCSV(arr, columns, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  return __spreadArray([columns.join(delimiter)], arr.map(function (obj) {
    return columns.reduce(function (acc, key) {
      return "" + acc + (!acc.length ? '' : delimiter) + "\"" + (!obj[key] ? '' : obj[key]) + "\"";
    }, '');
  })).join('\n');
};

var toInteger = toInteger$9;
var toString$1 = toString$h;
var requireObjectCoercible$1 = requireObjectCoercible$b;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
var stringRepeat = function repeat(count) {
  var str = toString$1(requireObjectCoercible$1(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = toLength$n;
var toString = toString$h;
var repeat = stringRepeat;
var requireObjectCoercible = requireObjectCoercible$b;

var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

var stringPad = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

// https://github.com/zloirock/core-js/issues/280
var userAgent = engineUserAgent;

// eslint-disable-next-line unicorn/no-unsafe-regex -- safe
var stringPadWebkitBug = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);

var $ = _export;
var $padStart = stringPad.start;
var WEBKIT_BUG = stringPadWebkitBug;

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/**
 * @description 将RGB组件的值转换为颜色代码。
 * @example RGBToHex(255, 165, 1); // 'ffa501'
 * @param r - RGB第1个值
 * @param g - RGB第2个值
 * @param b - RGB第3个值
 * @returns hex值
 */
var RGBToHex = function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

// export type { AnyObject, AnyFunction, AnyElement } from "../typings/common";
var index = {
  //
  client: client,
  pattern: pattern$1,
  trim: trim$2,
  clearAttr: clearAttr,
  clearBr: clearBr,
  clearHtml: clearHtml,
  clearHtmlExpSN: clearHtmlExpSN,
  clearHtmlN: clearHtmlN,
  clearHtmlNS: clearHtmlNS,
  clearHtmlTag: clearHtmlTag,
  getNumber: getNumber,
  imgAdapt: imgAdapt,
  imgChoose: imgChoose,
  camel2Dash: camel2Dash,
  dash2Camel: dash2Camel,
  upperFirst: upperFirst,
  getRandomNum: getRandomNum,
  getRandomStr: getRandomStr,
  getRandomStrWidthSpecialChar: getRandomStrWidthSpecialChar,
  getCHSLength: getCHSLength,
  cutCHSString: cutCHSString,
  textareaInsertText: textareaInsertText,
  textareaMoveToEnd: textareaMoveToEnd,
  isDigitals: isDigitals,
  isExitsFunction: isExitsFunction,
  isExitsVariable: isExitsVariable,
  getWindowSize: getWindowSize,
  getAppVersion: getAppVersion,
  getOsVersion: getOsVersion,
  getIsAppVersionLastest: getIsAppVersionLastest,
  getDirParam: getDirParam,
  getParameter: getParameter,
  getFileType: getFileType,
  getUrlParam: getUrlParam,
  formatTime: formatTime,
  formatTimeStr: formatTimeStr,
  setCookie: setCookie,
  setCache: setCache,
  setSession: setSession,
  getCookie: getCookie,
  getCache: getCache,
  getSession: getSession,
  delCookie: delCookie,
  delCache: delCache,
  delSession: delSession,
  encodeBase64: encodeBase64,
  encodeUtf8: encodeUtf8,
  decodeBase64: decodeBase64,
  decodeUtf8: decodeUtf8,
  enWxJumpLink: enWxJumpLink,
  enWxJumpLinkOld: enWxJumpLinkOld,
  deWxJumpLink: deWxJumpLink,
  deWxJumpLinkOld: deWxJumpLinkOld,
  debounce: debounce,
  throttle: throttle,
  stopBubble: stopBubble,
  stopDefault: stopDefault,
  addEvent: addEvent,
  removeEvent: removeEvent,
  getScrollPosition: getScrollPosition,
  nextIndex: nextIndex,
  fixNumber: fixNumber,
  delay: delay,
  extend: extend,
  getType: getType,
  isArray: isArray$2,
  cleanData: cleanData,
  download: download,
  searchTreeObject: searchTreeObject,
  openUrl: openUrl,
  splitThousand: splitThousand,
  all: all,
  any: any,
  uuid: uuid,
  arrayToCSV: arrayToCSV,
  CSVToArray: CSVToArray,
  CSVToJSON: CSVToJSON,
  JSONToCSV: JSONToCSV,
  RGBToHex: RGBToHex
};

export { CSVToArray, CSVToJSON, JSONToCSV, RGBToHex, addEvent, all, any, arrayToCSV, camel2Dash, cleanData, clearAttr, clearBr, clearHtml, clearHtmlExpSN, clearHtmlN, clearHtmlNS, clearHtmlTag, client, cutCHSString, dash2Camel, deWxJumpLink, deWxJumpLinkOld, debounce, decodeBase64, decodeUtf8, index as default, delCache, delCookie, delSession, delay, download, enWxJumpLink, enWxJumpLinkOld, encodeBase64, encodeUtf8, extend, fixNumber, formatTime, formatTimeStr, getAppVersion, getCHSLength, getCache, getCookie, getDirParam, getFileType, getIsAppVersionLastest, getNumber, getOsVersion, getParameter, getRandomNum, getRandomStr, getRandomStrWidthSpecialChar, getScrollPosition, getSession, getType, getUrlParam, getWindowSize, imgAdapt, imgChoose, isArray$2 as isArray, isDigitals, isExitsFunction, isExitsVariable, nextIndex, openUrl, pattern$1 as pattern, removeEvent, searchTreeObject, setCache, setCookie, setSession, splitThousand, stopBubble, stopDefault, textareaInsertText, textareaMoveToEnd, throttle, trim$2 as trim, upperFirst, uuid };
