/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */
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

    if (fromUnit === toUnit) {
      return value;

    } else if (fromUnit === 'px') {
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
