'use strict';

var redefineGetComputedStyle = require('./window/redefineGetComputedStyle');
var redefineCreateElement = require('./document/redefineCreateElement');

module.exports = function(jsdom) {
  var window = jsdom.defaultView;
  redefineGetComputedStyle(window);
  redefineCreateElement(window.document);
  return window;
};

