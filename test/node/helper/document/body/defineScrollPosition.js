'use strict';

var platform = require('platform');

function defineScrollPosition(window) {
  var body = window.document.body;

  Object.defineProperty(body, 'offsetWidth', {
    enumerable: true,
    get: function() {
      return window.innerWidth;
    },
    set: readonly,
  });
  Object.defineProperty(body, 'offsetHeight', {
    enumerable: true,
    get: function() {
      return window.innerHeight;
    },
    set: readonly,
  });
  Object.defineProperty(body, 'clientWidth', {
    enumerable: true,
    get: function() {
      return window.innerWidth;
    },
    set: readonly,
  });
  Object.defineProperty(body, 'clientHeight', {
    enumerable: true,
    get: function() {
      return window.innerHeight;
    },
    set: readonly,
  });
  Object.defineProperty(body, 'scrollWidth', {
    enumerable: true,
    get: function() {
      var v = body.style.width;
      v = Number(v.slice(0, -'px'.length));
      return v;
    },
    set: readonly,
  });
  Object.defineProperty(body, 'scrollHeight', {
    enumerable: true,
    get: function() {
      var v = body.style.height;
      v = Number(v.slice(0, -'px'.length));
      return v;
    },
    set: readonly,
  });

  if (platform.name == 'IE' || platform.name === 'Firefox') {
    Object.defineProperty(body, 'scrollLeft', {
      enumerable: true,
      get: function() {
        return 0;
      },
      set: function() {},
    });

    Object.defineProperty(body, 'scrollTop', {
      enumerable: true,
      get: function() {
        return 0;
      },
      set: function() {},
    });
  }

  var scrollLeft = 0,
      scrollTop = 0;

  Object.defineProperty(body, 'scrollLeft', {
    enumerable: true,
    get: function() {
      return scrollLeft;
    },
    set: function(v) {
      scrollLeft = v;
    },
  });

  Object.defineProperty(body, 'scrollTop', {
    enumerable: true,
    get: function() {
      return scrollTop;
    },
    set: function(v) {
      scrollTop = v;
    },
  });
}

function readonly() {}

module.exports = defineScrollPosition;
