'use strict';

var redefineGetComputedStyle = require('./redefineGetComputedStyle');

module.exports = function(window) {
  redefineGetComputedStyle(window);
};
