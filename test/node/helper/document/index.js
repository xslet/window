'use strict';

var redefineCreateElement = require('./redefineCreateElement');

module.exports = function(document) {
  redefineCreateElement(document);
};

