'use strict';

var redefineWindow = require('./window');
var redefineDocument = require('./document');

module.exports = function(jsdom) {
  var window = jsdom.defaultView;
  redefineWindow(window);
  redefineDocument(window.document);
  return window;
};

