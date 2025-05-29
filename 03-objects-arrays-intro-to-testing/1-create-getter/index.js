/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let keys = path.split('.');
  return function(obj) {
    return getInnerValue(obj, keys);
  };
}

getInnerValue = function(obj, keys) {
  if (!obj) {
    return obj;
  } else if (!Object.hasOwn(obj, keys[0])) {
    return undefined;
  } else if (keys.length === 1) {
    return obj[keys[0]];
  } else {
    return getInnerValue(obj[keys[0]], keys.slice(1));
  }
};