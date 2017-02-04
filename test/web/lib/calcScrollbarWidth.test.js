
var expect = chai.expect;
describe('calcScrollbarWidth', function() {

  it('Should get scroll bar width', function(done) {
    if (xslet.platform.ua.PHANTOMJS) {
      expect(calcScrollbarWidth(window)).to.equal(16);

    } else if (xslet.platform.os.MACOS) {
      expect(calcScrollbarWidth(window)).to.equal(0);

    } else if (xslet.platform.os.WINNT) {
      if (xslet.platform.ua.EDGE) {
        expect(calcScrollbarWidth(window)).to.equal(12);
      } else {
        expect(calcScrollbarWidth(window)).to.equal(17);
      }

    } else if (xslet.platform.os.LINUX) {
      if (xslet.platform.ua.CHROME) {
        expect(calcScrollbarWidth(window)).to.equal(15);

      } else if (xslet.platform.ua.FIREFOX) {
        expect(calcScrollbarWidth(window)).to.equal(10);

      } else if (xslet.platform.ua.VIVALDI) {
        expect(calcScrollbarWidth(window)).to.equal(15);

      }
    } else {
      expect(calcScrollbarWidth(window)).to.equal(17);
    }

    done();
  });

});
