/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const keys = path.split('.');

  return (obj) => {
    for (const value of keys) {
      if (obj.hasOwnProperty(value)) {
        obj = obj[value];
      } else {
        return;
      }
    }
    return obj;
  };
}
// export function createGetter(path) {
//   const keys = path.split('.');
//   return function(obj) {
//     return getInnerValue(obj, keys);
//   };
// }

// getInnerValue = function(obj, keys) {
//   if (!obj) {
//     return obj;
//   } else if (!Object.hasOwn(obj, keys[0])) {
//     return;
//   } else if (keys.length === 1) {
//     return obj[keys[0]];
//   } else {
//     return getInnerValue(obj[keys[0]], keys.slice(1));
//   }
// };