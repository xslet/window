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
  Object.defineProperty(xslet, 'window', {
    enumerable: true,
    value: {},
  });

  defineUnitOfSize(xslet.window);
  defineRootFontSize(xslet.window, window);
  defineConvertUnit(xslet.window, window);
  defineRelayout(xslet.window, window);

  /**
   * Is the namespace for window informations and operations.
   *
   * @namespace xslet.window
   * @prop unitOfSize {string} - The unit of size used in a whole of HTML page.
   * @prop rootFontSize {number} - The root font size.
   *   This value is a number, and can be specified as a number or a string
   *   of which format is `value + unit`.
   *   The unit allowed is either `'px'`, `'mm'` or `'rem'`.
   * @prop scrollbarWidth {number} - The scroll bar width.
   *   The unit of this value is same with `unitOfSize` property.
   *   This value can be updated by re-layouting a page, because some browsers
   *   change its scroll bar width by zooming.
   * @prop relayoutDelay {number} - The delay time to re-layout a page against
   *   resize events. The unit of this value is millisecond.
   */

  /**
   * Converts `value` in `fromUnit` to new value in `toUnit`.
   * The units allowed are either `'px'`, `'mm'` and `'rem'`.
   *
   * @method xslet.window.convertUnit
   * @param value {number} - A value to be converted.
   * @param fromUnit {string} - The unit of `value`.
   * @param toUnit {string} - The unit of value after converted.
   * @return {number} The value after converted.
   */

  /**
   * Re-layout a page.
   * This method forcely executes re-layout listeners registered by
   * `addRelayoutListener` method.
   *
   * @method xslet.window.relayout
   */

  /**
   * Adds a re-layout listener which is to be called when a browser is resized
   * or `xslet.window.relayout` method is executed.
   *
   * @method xslet.window.addRelayoutListener
   * @param listener {function} - A listener function.
   */

  /**
   * Removes a registered re-layout listener.
   *
   * @method xslet.window.removeRelayoutListener
   * @param listener {function} - A listener function.
   */
}
