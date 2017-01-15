'use strict';

var jsdom = require('jsdom').jsdom('');
var window = require('../helper/jsdom-helper')(jsdom);
var defineUnitOfSize = require('../../../src/lib/defineUnitOfSize');
var defineRootFontSize = require('../../../src/lib/defineRootFontSize');
var defineConvertUnit = require('../../../src/lib/defineConvertUnit');
var defineScrollPosition = require('../../../src/lib/defineScrollPosition');
var chai = require('chai');
var expect = chai.expect;

var xslet = {}; require('@xslet/platform')(xslet, window);

describe('scrollLeft/scrollTop', function() {

  describe('Window scrolling', function() {
    var ns = {};

    before(function() {
      defineUnitOfSize(ns, window);
      defineRootFontSize(ns, window);
      defineConvertUnit(ns, window);
      defineScrollPosition(ns, window);
    });

    it('Should get zero position when not scrolling', function(done) {
      expect(!!window.document.body.scrollLeft).to.be.false;
      expect(!!window.document.body.scrollTop).to.be.false;
      expect(!!window.document.documentElement.scrollLeft).to.false;
      expect(!!window.document.documentElement.scrollTop).to.false;
      expect(ns.scrollLeft).to.equal(0);
      expect(ns.scrollTop).to.equal(0);
      done();
    });

    it('Should be able to set scroll position manually', function(done) {
      ns.scrollLeft = 10;
      ns.scrollTop = 20;
      expect(window.document.body.scrollLeft).to.equal(10);
      expect(window.document.body.scrollTop).to.equal(20);
      expect(window.document.documentElement.scrollLeft).to.equal(10);
      expect(window.document.documentElement.scrollTop).to.equal(20);
      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);
      done();
    });

    it('Should get scroll position when scrolled', function(done) {
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        window.document.documentElement.scrollLeft = 30;
        window.document.documentElement.scrollTop = 40;
      } else {
        window.document.body.scrollLeft = 30;
        window.document.body.scrollTop = 40;
      }
      expect(ns.scrollLeft).to.equal(30);
      expect(ns.scrollTop).to.equal(40);
      done();
    });

  });

  describe('Convert unit of scroll position', function() {
    var ns = {};

    before(function() {
      defineUnitOfSize(ns, window);
      defineRootFontSize(ns, window);
      defineConvertUnit(ns, window);
      defineScrollPosition(ns, window);

      ns.unitOfSize = 'rem';
      ns.rootFontSize = 13;
    });

    it('Should set scroll position with xslet.window.unitOfSize',
    function(done) {
      ns.scrollLeft = 10;
      ns.scrollTop = 20;
      expect(window.document.body.scrollLeft).to.equal(130);
      expect(window.document.body.scrollTop).to.equal(260);
      expect(window.document.documentElement.scrollLeft).to.equal(130);
      expect(window.document.documentElement.scrollTop).to.equal(260);
      expect(ns.scrollLeft).to.equal(10);
      expect(ns.scrollTop).to.equal(20);
      done();
    });

    it('Should get scroll position with xslet.window.unitOfSize',
    function(done) {
      if (xslet.platform.ua.MSIE || xslet.platform.ua.FIREFOX) {
        window.document.documentElement.scrollLeft = 10;
        window.document.documentElement.scrollTop = 20;
      } else {
        window.document.body.scrollLeft = 10;
        window.document.body.scrollTop = 20;
      }
      expect(window.document.body.scrollLeft).to.equal(10);
      expect(window.document.body.scrollTop).to.equal(20);
      expect(window.document.documentElement.scrollLeft).to.equal(130);
      expect(window.document.documentElement.scrollTop).to.equal(260);
      expect(ns.scrollLeft).to.equal(10/13);
      expect(ns.scrollTop).to.equal(20/13);
      done();
    });

  });

});

