'use strict';
const pipeline = require('./pipeline');

module.exports = function (...args) {
  const reversedArgs = [...args].reverse();
  return pipeline(...reversedArgs);    
};
