
var expect = chai.expect;

var obj = {};
defineRootFontSize(obj, window);

describe('defineRootFontSize', function() {

  it('Should get default root font size', function(done) {
    expect(obj.rootFontSize).to.equal(16);
    done();
  });

  it('Should set specified root font size as a number', function(done) {
    obj.rootFontSize = 13;
    expect(obj.rootFontSize).to.equal(13);
    done();
  });

  it('Should set specified root font size in "px"', function(done) {
    obj.rootFontSize = '20px';
    expect(obj.rootFontSize).to.equal(20);
    done();
  });

  it('Should set specified root font size in "mm"', function(done) {
    obj.rootFontSize = '8mm';
    expect(obj.rootFontSize).to.equal(30);
    done();
  });

  it('Should throw Error if specified font size is zero', function(done) {
    expect(function() { obj.rootFontSize = 0; }).to.throw(Error);
    expect(function() { obj.rootFontSize = '0px'; }).to.throw(Error);
    done();
  });

  it('Should throw Error if specified font size is negative', function(done) {
    expect(function() { obj.rootFontSize = -10; }).to.throw(Error);
    expect(function() { obj.rootFontSize = '-12px'; }).to.throw(Error);
    done();
  });

  it('Should throw Error if specified font size is a string but its unit ' +
  'is\n\tillegal', function(done) {
    expect(function() { obj.rootFontSize = '10xxx'; }).to.throw(Error);
    done();
  });

  it('Should throw Error if specified font size is a bad string',
  function(done) {
    expect(function() { obj.rootFontSize = 'px'; }).to.throw(Error);
    expect(function() { obj.rootFontSize = 'xx'; }).to.throw(Error);
    done();
  });

  it('Should throw Error if specified font size is bad type', function(done) {
    expect(function() { obj.rootFontSize = {}; }).to.throw(Error);
    done();
  });
});
