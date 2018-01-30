export const not = (func) => {
  return (object) => {
    return !func(object);
  };
};

export const isDefined = (obj) => {
  if (obj === null || typeof obj === 'undefined') return false;

  return true;
};

export const isNotDef = not(isDefined);

export const isBoolean = (obj) => {
  if (!isDefined(obj)) return false;

  return (obj.constructor === Boolean);
};

export const isNumber = (obj) => {
  if (!isDefined(obj)) return false;

  return (obj.constructor === Number);
};

export const isFunction = (obj) => {
  if (!isDefined(obj)) return false;

  return (obj.constructor === Function);
};

export const anyOf = (/*args*/) => {
  const args = Array.prototype.slice.call(arguments);

  return args.some(function (val) {
    return (val === true);
  });
};

export const singleEle = ($ele) => ($ele.length === 1);

export const notSingleEle = not(singleEle);