/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

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
