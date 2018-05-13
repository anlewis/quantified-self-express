const models = require('../models')

const attrs = ['id', 'name']
const foodAttrs = ['id', 'name', 'calories']

getMeals = function (req, res) {
  models.Meal.findAll(
    {
      attributes: attrs,
      include: [{
        model: models.Food,
        as: 'foods',
        attributes: foodAttrs,
        through: { attributes: [] } 
      }],
    })
    .then(meals => {
      res.json(meals)
    })
    .catch((e) => { throw e })
}

getMeal = function (req, res) {
  models.Meal.findAll(
    {
      where: { id: req.params.id },
      attributes: attrs,
      include: [{
        model: models.Food,
        as: 'foods',
        attributes: foodAttrs,
        through: { attributes: [] }
      }],
    })
    .then(meal => {
      res.json(meal)
    })
    .catch((e) => { throw e })
}

function addFoodToMeal(foodId, mealId) {
  let food;
  models.Food.findById(foodId).then(food => {
  })
}

async function addFoodToMeal(foodId, mealId) {
  const food = await models.Food.findById(foodId)
  const meal = await models.Meal.findById(mealId)
  await meal.addFood(food)
  return { food, meal }
}

postFoodToMeal = function (req, res) {
  const promise = addFoodToMeal(req.params.foodId, req.params.id)
  promise.then(({ food, meal }) => {
    res.status(201).json({ food })
  })
  .catch((e) => { throw e })
}

async function removeFoodFromMeal(foodId, mealId) {
  const food = await models.Food.findById(foodId)
  const meal = await models.Meal.findById(mealId)
  await meal.removeFood(food)
  return { food, meal }
}

deleteFoodFromMeal = function (req, res) {
  const promise = removeFoodFromMeal(req.params.foodId, req.params.id)
  promise.then(({ food, meal }) => {
    res.json({ food })
  })
  .catch((e) => { throw e })
}

module.exports = getMeals, getMeal, postFoodToMeal