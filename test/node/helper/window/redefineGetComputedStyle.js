'use strict';

function redefineGetComputedStyle(window) {
  var originalGetComputedStyle = window.getComputedStyle;

  window.getComputedStyle = function(tag) {
    var cs = originalGetComputedStyle(tag);

    Object.defineProperty(cs, 'fontSize', {
      get: getFontSize.bind(tag),
    });

    return cs;
  };
}

var REM_TO_PX = 16;
var MM_TO_PX = 3.7795;

function getFontSize() {
  var tag = this;

  var fontSize = tag.style.fontSize || (REM_TO_PX + 'px');
  var unit = fontSize.replace(/^[0-9]*/, '');
  var num = fontSize.slice(0, -unit.length);

  if (unit === 'px') {
    return fontSize;
  } else if (unit === 'mm') {
    return (num * MM_TO_PX) + 'px';
  } else if (unit === 'rem') {
    num = REM_TO_PX * num;
    if (tag.tagName.toLowerCase() === 'html') {
      REM_TO_PX = num;
    }
    return num;
  }
}

module.exports = redefineGetComputedStyle;
