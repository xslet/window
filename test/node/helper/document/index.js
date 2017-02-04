'use strict';

var redefineCreateElement = require('./redefineCreateElement');
var redefineHtml = require('./html');
var redefineBody = require('./body');

module.exports = function(window) {
  redefineCreateElement(window);
  redefineHtml(window);
  redefineBody(window);
};

