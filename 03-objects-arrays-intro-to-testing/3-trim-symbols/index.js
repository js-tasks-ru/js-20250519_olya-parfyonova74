/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (!string) {
    return string;
  }
  let resultStr = '';
  let currentStr = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i - 1]) {
      currentStr += string[i] ?? '';
    } else {
      resultStr += currentStr;
      currentStr = string[i] ?? '';
    }
    currentStr = currentStr.slice(0, size);
  }
  resultStr += currentStr;
  return resultStr;
}
