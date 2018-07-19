var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('User', function() {
  it('should list ALL users on /users GET', function(done) {
  chai.request(server)
    .get('/register')
    .end(function(err, res){
      res.should.have.status(200);
      //res.should.be.json;
      //res.body.should.be.a('array');
      done();
    });
});
  it('should list a SINGLE user on /user/<id> GET');
  it('should add a SINGLE blob on /blobs POST', function(done) {
  chai.request(server)
    .post('/register')
    .send({'name': 'Java', 'lastName': 'Script'})
    .end(function(err, res){
      res.should.have.status(200);
      //res.should.be.json;
      res.body.should.be.a('object');
      //res.body.should.have.property('SUCCESS');
      //res.body.SUCCESS.should.be.a('object');
      //res.body.SUCCESS.should.have.property('name');
      //res.body.SUCCESS.should.have.property('lastName');
     //res.body.SUCCESS.should.have.property('_id');
      // res.body.SUCCESS.name.should.equal('Java');
      // res.body.SUCCESS.lastName.should.equal('Script');
      done();
    });
});
  it('should update a SINGLE user on /user/<id> PUT');
  it('should delete a SINGLE user on /user/<id> DELETE');
});
