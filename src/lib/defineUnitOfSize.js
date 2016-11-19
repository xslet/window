/*
 * Copyright (C) 2016 xslet project.
 * This software is released under the MIT license.
 */

'use strict';

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

module.exports = defineUnitOfSize;
