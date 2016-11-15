'use strict';

var jsdom = require('jsdom').jsdom('');
var window = require('../helper/jsdom-helper')(jsdom);
var defineRootFontSize = require('../../../src/lib/defineRootFontSize');
var defineConvertUnit = require('../../../src/lib/defineConvertUnit');
var chai = require('chai');
var expect = chai.expect;

var obj = {};
var htmlTag = window.document.getElementsByTagName('html')[0];
var computedHtmlStyle = window.getComputedStyle(htmlTag);
defineRootFontSize(obj, htmlTag, computedHtmlStyle);
defineConvertUnit(obj, window);

describe('convertUnit', function() {

  it('Should convert value in "px" to "mm"', function(done) {
    expect(obj.convertUnit(13, 'px', 'mm')).to.be.within(3, 4);
    done();
  });

  it('Should convert value in "px" to "rem"', function(done) {
    obj.rootFontSize = 14;
    expect(obj.convertUnit(13, 'px', 'rem')).to.equal(13 / 14);
    done();
  });

  it('Should convert value in "mm" to "px"', function(done) {
    expect(obj.convertUnit(13, 'mm', 'px')).to.be.within(48, 50);
    done();
  });

  it('Should convert value in "mm" to "rem"', function(done) {
    obj.rootFontSize = 17;
    expect(obj.convertUnit(13, 'mm', 'rem')).to.be.within(48 / 17, 50 / 17);
    done();
  });

  it('Should convert value in "rem" to "px"', function(done) {
    obj.rootFontSize = 11;
    expect(obj.convertUnit(13, 'rem', 'px')).to.be.equal(13 * 11);
    done();
  });

  it('Should convert value in "rem" to "mm"', function(done) {
    obj.rootFontSize = 11;
    expect(obj.convertUnit(13, 'rem', 'mm')).to.be.within(3 * 11, 4 * 11);
    done();
  });

  it('Should throw Error if illegal units are specified', function(done) {
    expect(function() { obj.convertUnit(9, 'em', 'mm'); }).to.throw(Error);
    expect(function() { obj.convertUnit(9, 'ex', 'px'); }).to.throw(Error);
    expect(function() { obj.convertUnit(9, 'xx', 'rem'); }).to.throw(Error);
    expect(function() { obj.convertUnit(9, 'px', 'ex'); }).to.throw(Error);
    expect(function() { obj.convertUnit(9, 'mm', 'em'); }).to.throw(Error);
    expect(function() { obj.convertUnit(9, 'rem', 'yy'); }).to.throw(Error);
    done();
  });
});

