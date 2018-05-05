module.exports = {
  "development": {
    "username": "annalewis",
    "password": null,
    "database": "qs_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "annalewis",
    "password": null,
    "database": "qs_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "annalewis",
    "password": null,
    "database": "qs_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "url": process.env.DATABASE_URL
  }
}