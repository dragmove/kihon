export const truthy = (obj) => !!obj;

export const falsy = (obj) => !!!obj;

export const not = (func) => {
  return (object) => {
    return !func(object);
  };
};

export const existy = (obj) => (obj != null);

export const isDefined = (obj) => {
  if (obj === null || typeof obj === 'undefined') return false;

  return true;
};

export const isNotDef = not(isDefined);

export const isBoolean = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === Boolean);
};

export const isNumber = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === Number);
};

export const isString = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === String);
};

export const isObject = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === Object);
};

export const isFunction = (obj) => {
  if (isNotDef(obj)) return false;

  return (obj.constructor === Function);
};

export const isVideoElement = (ele) => {
  if (isNotDef(ele)) return false;

  return (ele.constructor === HTMLVideoElement);
};

export const allOf = function (/*args*/) {
  const args = Array.prototype.slice.call(arguments);

  return args.every((val) => (val === true));
};

export const anyOf = (/*args*/) => {
  const args = Array.prototype.slice.call(arguments);

  return args.some(function (val) {
    return (val === true);
  });
};

export const singleEle = ($ele) => ($ele.length === 1);

export const notSingleEle = not(singleEle);

export const each = (dataCanLoop, func, context) => {
  if (falsy(Array.isArray(dataCanLoop) || isString(dataCanLoop))) {
    throw new TypeError('dataCanLoop parameter type of each() should be Array or String.');
  }

  const _context = (existy(context)) ? context : null;

  for (let i = 0, max = dataCanLoop.length; i < max; i++) {
    func.call(_context, dataCanLoop[i]);
  }
};

export const curry2 = (func) => {
  if (!isFunction(func)) throw new TypeError('func parameter type of curry2() should be Function.');

  return (secondArg) => (firstArg) => func(firstArg, secondArg);
};

export const gt = curry2(function (lhs, rhs) {
  if (!allOf(isNumber(lhs), isNumber(rhs))) throw new TypeError('gt requires Number parameters.');

  return lhs > rhs;
});

export const lt = curry2(function (lhs, rhs) {
  if (!allOf(isNumber(lhs), isNumber(rhs))) throw new TypeError('lt requires Number parameters.');

  return lhs < rhs;
});

export const lte = curry2(function (lhs, rhs) {
  if (!allOf(isNumber(lhs), isNumber(rhs))) throw new TypeError('lte requires Number parameters.');

  return lhs <= rhs;
});

export const eq = curry2(function (lhs, rhs) {
  return lhs === rhs;
});

export const getSizeAspectFill = (srcWidth, srcHeight, fillWidth, fillHeight) => {
  if (!allOf(isNumber(srcWidth), isNumber(srcHeight), isNumber(fillWidth), isNumber(fillHeight))) {
    throw new TypeError('getSizeAspectFill() requires Number parameters.');
  }

  let modifiedSizeW = fillWidth,
    modifiedSizeH = Math.ceil((fillWidth / srcWidth) * srcHeight);

  if (modifiedSizeH < fillHeight) {
    modifiedSizeW = Math.ceil((fillHeight / srcHeight) * srcWidth);
    modifiedSizeH = fillHeight;
  }

  return {width: modifiedSizeW, height: modifiedSizeH};
};

export const getUriCombinedParams = (uri = '', params = {}) => {
  if (!isString(uri)) throw new TypeError('uri parameter type of getUriCombinedParams() should be string.');

  if (!uri) return '';
  if (!params) return uri;

  let str = '';
  for (let key in params) str += `&${key}=${String(params[key])}`;

  if (str === '') return uri;

  const uris = uri.split('#');
  uri = uris[0];

  const hashStr = (isDefined(uris[1])) ? '#' + uris[1] : '';
  uri = ((uri.indexOf('?') >= 0) ? (uri + str) : (uri + '?' + str.substr(1))) + hashStr;

  return uri;
};