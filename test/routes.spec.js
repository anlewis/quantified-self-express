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
    Food(sequelize).sequelize.sync({ force: true, match: /qs_test/ })
      .then(() => {
        return seed.up(sequelize.queryInterface, Sequelize)
      }).then(() => {
        done()
      })
  })

  it('sends a list of foods', () => {
    return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.be.eql(50);
      });
  });

  it('can get a single food by id', () => {
    return chai.request(server)
      .get('/api/v1/foods/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
      });
  });

  it('should add a food', () => {
    return chai.request(server)
      .post('/api/v1/foods')
      .send({
        "food": {
          "name": "Waffles",
          "calories": 300
        }
      })
      .then((response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body['food'].should.have.property('id');
        response.body['food'].should.have.property('name');
        response.body['food'].should.have.property('calories');
      });

    food = Food(sequelize).findAll({ where: { id: 51 } })

    food.name.should.be("Waffles")
    food.calories.should.be(300)
  });

  it('should update a food', () => {
    return chai.request(server)
      .patch('/api/v1/foods/1')
      .send({
        "food": {
          "name": "Waffles",
          "calories": 300
        }
      })
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body['food'].should.have.property('id');
        response.body['food'].should.have.property('name');
        response.body['food'].should.have.property('calories');
        return Food(sequelize).findById(1).then(updatedFood => {
          updatedFood.name.should.equal("Waffles")
          updatedFood.calories.should.equal(300)
        });
      });
  });

  it('should delete a food', () => {
    Food(sequelize).count().then(count => {
        count.should.equal(50);
      });

    return chai.request(server)
      .delete('/api/v1/foods/1')
      .then((response) => {
        response.should.have.status(204);
        return Food(sequelize).count().then(count => {
          count.should.equal(49);
        });
      });
  });
});