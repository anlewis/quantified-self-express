import factory from 'factory-girl';
import Food from '../../models/User';
import fakerFoods from '../../public/javascripts/fakerFoods';

var foods = []
for (var i = 0; i < 50; i++) {
  var randomIndex = Math.floor(Math.random() * fakerFoods.length)
  var randomName = fakerFoods[randomIndex];
  var randomCalories = Math.floor(Math.random() * 2000);
  foods.push({
    name: randomName,
    calories: randomCalories,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

factory.define('Food', Food, {
  name: randomName,
  calories: randomCalories
});

factory.build('Food').then(food => {
  console.log(food);
});