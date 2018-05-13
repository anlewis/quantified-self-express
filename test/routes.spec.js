const env = process.env.NODE_ENV;
const configuration = require('../config/config')[env];

const app = require('../app')
const models = require('../models')
const Sequelize = require('sequelize')
const seed_foods = require('../seeders/20180502222129-foods')
const seed_meals = require('../seeders/20180508184341-meals')
const logger = require('logfmt')

const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
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
  beforeEach(done => {
    models.Food.sync({ force: true, match: /qs_test/ })
    .then(() => {
      seed_foods.up(models.sequelize.queryInterface, Sequelize)
    })
    .then(() => { done() })
  })

  beforeEach(done => {
    models.Meal.sync({ force: true, match: /qs_test/ })
    .then(() => {
      seed_meals.up(models.sequelize.queryInterface, Sequelize)
    })
    .then(() => { done() })
  })

  beforeEach(done => {
    models.FoodMeals.sync({ force: true, match: /qs_test/ })
    .then(() => { done() })
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
        return models.Food.findById(1).then(updatedFood => {
          updatedFood.name.should.equal("Waffles")
          updatedFood.calories.should.equal(300)
        });
      });
  });

  it('should delete a food', () => {
    models.Food.count().then(count => {
      count.should.equal(50);
    });

    return chai.request(server)
      .delete('/api/v1/foods/1')
      .then((response) => {
      response.should.have.status(204);
    });

    models.Food.count().then(count => {
      count.should.equal(49);
    });
  });

  it('sends a list of meals', () => {
    models.Food.findById(1)
      .then(food => {
        models.Meal.findById(1)
      .then(meal => {
        meal.addFood(food)
      });
    });

    return chai.request(server)
      .get('/api/v1/meals')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.be.eql(4);
        response.body[0].should.have.property('foods');
      });
  });

  it('can get a single meal by id', () => {
    return chai.request(server)
      .get('/api/v1/meals/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
      });
  });

  it('can add a food to a meal', () => {
    return chai.request(server)
      .post("/api/v1/meals/1/foods/1")
      .then(response => {
        response.should.have.status(201);
        return models.Meal.findById(1)
      }).then(meal => meal.getFoods())
      .then(foods => {
        foods.length.should.equal(1);
        foods[0].id.should.equal(1);
      });
  });

  it('can remove a food from a meal', () => {
    models.Food.findById(1).then(food => {
      models.Meal.findById(1)
        .then(meal => { meal.addFood(food) })
    })

    return chai.request(server)
      .delete("/api/v1/meals/1/foods/1")
      .then(response => {
        response.should.have.status(200);
        return models.Meal.findById(1)
      }).then(meal => {
        meal.getFoods()
      }).then(foods => {
        expect(foods).to.be.undefined;
      })
  });
});
