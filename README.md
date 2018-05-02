# Quantified Self

### About

Quantified self is a simple calorie tracking application. It is used as a learning experience in using multiple languages and seperating backend and frontend services. This is the Express.js component.

### Getting Started

This project uses the [Express](https://expressjs.com/) framework, which can be installed [here](https://expressjs.com/en/starter/installing.html).
[NPM](https://www.npmjs.com/) is used as the package manager for the app.

In order to run this appication in the development environment, perform the following in the CLI:

```
npm install
sequelize db:create
sequelize db:migrate:all
sequelize db:seed:all
```

In order to spin-up the server, run: `npm start`

### Learning Goals
- Create a [Rails API](https://github.com/anlewis/quantified-self-rails) given specified endpoints and response formats.
- Create an Express API given specified endpoints and response formats.
- Create an API in a new language of the students choice given specified endpoints and response formats.
- Review and refactor code (in each of the three languages) so that it:
  - is well organized
  - clearly communicates intent
  - utilizes abstraction to hide complexity
  - breaks problems down into small methods/functions with a single responsibility

### Database

The following schema was used to create a [PostgreSQL](https://www.postgresql.org/) database:

![schema](https://preview.ibb.co/e3J3ES/Screenshot_2018_05_01_17_12_51.png)

### Testing

In order to run tests, perform the following:

`// instructions to come`

### API Endpoints

Quantified Self will have the following endpoints:

#### Food Endpoints
- `GET /api/v1/foods`: Returns all foods currently in the database

```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

- `GET /api/v1/foods/:id` Returns the food object with the specific :id you’ve passed in or 404 if the food is not found.

- `POST /api/v1/foods` Allows creating a new food with the parameters:

```
{ "food": { "name": "Name of food here", "calories": "Calories here"} }
```

- `PATCH /api/v1/foods/:id` Allows one to update an existing food with the parameters:

```
{ "food": { "name": "Mint", "calories": "14"} }
```

- `DELETE /api/v1/foods/:id` Will delete the food with the id passed in and return a 204 status code. If the food can’t be found, a 404 will be returned.

#### Meal Endpoints
- `GET /api/v1/meals` Returns all the meals in the database along with their associated foods.

```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 4,
        "name": "Dinner",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            }
        ]
    }
]
```

- `GET /api/v1/meals/:meal_id/foods` Returns all the foods associated with the meal with an id specified by :meal_id or a 404 if the meal is not found.

```
{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 150
        },
        {
            "id": 6,
            "name": "Yogurt",
            "calories": 550
        }
    ]
}
```

- `POST /api/v1/meals/:meal_id/foods/:id` Adds the food with :id to the meal with :meal_id. This returns:

```
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```

- `DELETE /api/v1/meals/:meal_id/foods/:id` Removes the food with :id from the meal with :meal_id. This returns:

```
{
    "message": "Successfully removed FOODNAME to MEALNAME"
}
```
