'use strict';

var SCROLL_BAR_WIDTH = 17;

function redefineCreateElement(document) {
  var originalCreateElement = document.createElement.bind(document);

  document.createElement = function(tagName) {
    var newTag = originalCreateElement(tagName);

    Object.defineProperty(newTag, 'offsetWidth', {
      get: function() {
        if (!newTag.style.width) {
          return 0;
        }
        return Number(newTag.style.width.slice(0, -'px'.length));
      },
      set: function() {},
    });

    Object.defineProperty(newTag, 'clientWidth', {
      get: function() {
        if (!newTag.style.width) {
          return 0;
        }
        var w = Number(newTag.style.width.slice(0, -'px'.length));
        if (newTag.style.overflow === 'scroll') {
          return Math.max(w - SCROLL_BAR_WIDTH, 0);
        }
        return w;
      },
      set: function() {},
    });

    return newTag;
  };
}

module.exports = redefineCreateElement;
