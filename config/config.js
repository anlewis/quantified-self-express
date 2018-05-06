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
    "url": process.env.DATABASE_URL
  }
}
