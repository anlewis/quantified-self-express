const env = process.env.NODE_ENV;
const configuration = require('../config/config')[env];

const app = require('../app')
const sequelize = require('../sequelize')
const Sequelize = require('sequelize')
const Food =  require('../models/food')
const seed = require('../seeders/20180502222129-foods')
const logger = require('logfmt')

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the home page with text', () => {
    return chai.request(server)
      .get('/')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.html;
      })
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
      .get('/sad')
      .then((response) => {
        response.should.have.status(404);
      })
  });
});

describe('API Routes', () => {
  // clear db and seed
  beforeEach(done => {
    console.log(sequelize)
    Food(sequelize).sequelize.sync({ force: true, match: /qs_test/ })
      .then(() => {
        return seed.up(sequelize.queryInterface, Sequelize)
      }).then(() => {
        done()
      })
  })

  it('sends a list of foods', (done) => {
    chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.be.eql(50);
        done();
      });
  });

  it('can get a single food by id', (done) => {
    chai.request(server)
      .get('/api/v1/food/1')
      .then((response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
        done();
      }).catch((e) => {console.log(e)});
  });
});