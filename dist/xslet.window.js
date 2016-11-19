/*!
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

/**
 * Is the top namespace of all xslet modules.
 *
 * @namespace xslet
 * @global
 */
;xslet = (typeof xslet === 'undefined') ? {} : xslet;

(function(){
  'use strict';
  defineWindow(xslet, window);


/**
 * Defines a unit of a whole of HTML page as a property of `xslet.window`
 * namespace.
 *
 * @param nsWindow {object} - `xslet.window` namespace object.
 */
function defineUnitOfSize(nsWindow) {
  var unitOfSize;

  function getUnitOfSize() {
    return unitOfSize || (unitOfSize = 'px');
  }

  function setUnitOfSize(unit) {
    if (unit !== 'px' && unit !== 'mm' && unit !== 'rem') {
      throw new Error('The unit must be either "px", "mm" or "rem" : ' + unit);
    }

    if (!unitOfSize) {
      unitOfSize = unit;
    }
  }

  Object.defineProperty(nsWindow, 'unitOfSize', {
    enumerable: true,
    get: getUnitOfSize,
    set: setUnitOfSize,
  });
}


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


/**
 * Gets pixel count per millimeter.
 *
 * @private
 * @param window {Window} - A window object of DOM.
 * @return {number} - Pixel count per millimeter.
 */
function getPxPerMm(window) {
  var divTag = window.document.createElement('div');
  divTag.style.fontSize = '100mm';
  divTag.style.position = 'absolute';
  divTag.style.visibility = 'hidden';
  window.document.body.appendChild(divTag);

  var computedStyle = window.getComputedStyle(divTag);
  var fontSizePx = computedStyle.fontSize;
  divTag.parentNode.removeChild(divTag);
  return Number(fontSizePx.slice(0, -'px'.length)) / 100;
}

/**
 * Defines a function to convert a size value in a unit to new value in
 * another unit.
 * The units supported by this function are `'px'`, `'mm'` and `'rem'`.
 *
 * @private
 * @param nsWindow {object} - The `xslet.window` namespace object.
 * @param window {Window} - The window object of DOM.
 */
function defineConvertUnit(nsWindow, window) {
  var pxPerMm;

  function convertUnit(value, fromUnit, toUnit) {
    pxPerMm = pxPerMm || getPxPerMm(window);
    var pxPerRem = nsWindow.rootFontSize;

    if (fromUnit === 'px') {
      if (toUnit === 'mm') {
        return value / pxPerMm;
      }

      if (toUnit === 'rem') {
        return value / pxPerRem;
      }

    } else if (fromUnit === 'mm') {
      if (toUnit === 'px') {
        return value * pxPerMm;
      }

      if (toUnit === 'rem') {
        return (value * pxPerMm) / pxPerRem;
      }

    } else if (fromUnit === 'rem') {
      if (toUnit === 'px') {
        return value * pxPerRem;
      }

      if (toUnit === 'mm') {
        return (value * pxPerRem) / pxPerMm;
      }
    }

    throw new Error('Illegal units : "' + fromUnit + '" -> "' + toUnit + '"');
  }

  Object.defineProperty(nsWindow, 'convertUnit', {
    enumerable: true,
    value: convertUnit,
  });
}


/**
 * Defines `xslet.window` namespace.
 *
 * @private
 * @param xslet {object} - `xslet` namespace object.
 * @param window {Window} - A window object of DOM.
 */
function defineWindow(xslet, window) {
  var htmlTag = window.document.getElementsByTagName('html')[0];
  var computedHtmlStyle = window.getComputedStyle(htmlTag);

  /**
   * Is the namespace for window informations and operations.
   *
   * @namespace xslet.window
   * @prop unitOfSize {string} - The unit of size used in a whole of HTML page.
   * @prop rootFontSize {number} - The root font size.
   *   This value is a number, and can be specified as a number or a string
   *   of which format is `value + unit`.
   *   The unit allowed is either `'px'`, `'mm'` or `'rem'`.
   */
  Object.defineProperty(xslet, 'window', {
    enumerable: true,
    value: {},
  });

  defineUnitOfSize(xslet.window);
  defineRootFontSize(xslet.window, htmlTag, computedHtmlStyle);

  /**
   * Converts `value` in `fromUnit` to new value in `toUnit`.
   * The units allowed are either `'px'`, `'mm'` and `'rem'`.
   *
   * @param value {number} - A value to be converted.
   * @param fromUnit {string} - The unit of `value`.
   * @param toUnit {string} - The unit of value after converted.
   * @return {number} The value after converted.
   * @memberof xslet.window
   * @method xslet.window.convertUnit
   */
  defineConvertUnit(xslet.window, window);
}

}());
