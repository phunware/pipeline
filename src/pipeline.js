'use strict';
module.exports = function pipeline(initial, ...funcs) {
  return funcs.reduce((val, fn) => fn(val), initial);
}
