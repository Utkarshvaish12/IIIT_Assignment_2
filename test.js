const chai = require('chai');
const supertest = require('supertest');
const { app, server } = require('./index');

const request = supertest(app);

chai.should();
describe('SQL Routes', () => {
  it('should get all customers from SQL', (done) => {
    chai.request(app)
      .get('/sql/customers')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });

  it('should insert a new customer into SQL', (done) => {
    const newCustomer = { name: 'John Doe', email: 'john.doe@example.com' };
    chai.request(app)
      .post('/sql/customers')
      .send(newCustomer)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Customer inserted successfully');
        done();
      });
  });
});

