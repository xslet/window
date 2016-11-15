/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

'use strict';

/**
 * Defines the root font size as a property of `xslet.window` namespace.
 *
 * @private
 * @param nsWindow {object} - `xslet.window` namespace object.
 * @param htmlTag {HTMLElement} - A HTML element of DOM.
 * @param computedHtmlStyle {CSS2Properties} - A computed style object of
 *  `htmlTag`.
 */
function defineRootFontSize(nsWindow, htmlTag, computedHtmlStyle) {

  function getRootFontSize() {
    return parseInt(computedHtmlStyle.fontSize.slice(0, -2));
  }

  function setRootFontSize(fontSize) {
    if (typeof fontSize === 'number') {
      if (fontSize <= 0) {
        throw new Error('The font size must be a positive number : ' +
          fontSize);
      }
      fontSize = fontSize + 'px';

    } else if (typeof fontSize === 'string') {
      var unit = fontSize.replace(/^[0-9]+/, '');
      if (unit !== 'px' && unit !== 'mm') {
        throw new Error('The unit of root font size must be either ' +
          '"px" or "mm" : ' + fontSize);
      }

      var num = parseInt(fontSize.slice(0, -unit.length));
      if (!num) {
        throw new Error('The font size must be a positive number : ' +
          fontSize);
      }

    } else {
      throw new Error('The font size must be a number : ' + fontSize);
    }

    htmlTag.style.fontSize = fontSize;
  }

  Object.defineProperty(nsWindow, 'rootFontSize', {
    enumerable: true,
    get: getRootFontSize,
    set: setRootFontSize,
  });
}

module.exports = defineRootFontSize;
