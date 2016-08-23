'use strict';
module.exports = function pipeline(initial, ...funcs) {
  let value = initial;
  for (var i = 0; i < funcs.length; i++) {
    const func = funcs[i]
    value = func(value);
  }
  return value;
}
