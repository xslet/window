var expect = chai.expect;

describe('defineUnitOfSize', function() {

  it('Should get "px" as default unit of size', function(done) {
    var obj = {};
    defineUnitOfSize(obj);
    expect(obj.unitOfSize).to.equal('px');
    done();
  });

  it('Should set and get unit of size', function(done) {
    var obj = {};
    defineUnitOfSize(obj);
    expect(obj.unitOfSize).to.equal('px');
    obj.unitOfSize = 'rem';
    expect(obj.unitOfSize).to.equal('rem');
    done();
  });

  it('Should not be able to set unit of size twice', function(done) {
    var obj = {};
    defineUnitOfSize(obj);
    expect(obj.unitOfSize).to.equal('px');
    obj.unitOfSize = 'rem';
    expect(obj.unitOfSize).to.equal('rem');
    obj.unitOfSize = 'mm';
    expect(obj.unitOfSize).to.equal('rem');
    done();
  });

  it('Should throw Error if specified unit is illegal', function(done) {
    var obj = {};
    defineUnitOfSize(obj);
    expect(function() { obj.unitOfSize = 'em'; }).to.throw(Error);
    expect(function() { obj.unitOfSize = 'xx'; }).to.throw(Error);
    done();
  });
});
