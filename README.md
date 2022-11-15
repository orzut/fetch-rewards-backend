# Fetch Rewards Points
## Table of contents
* [General info](#general-info)
* [Install PostgreSQL](#install-postgresql)
* [Run web service](#run-web-service)
* [Test web service](#test-web-service)
* [Technologies](#technologies)

## General Info
This is RESTful web service that accepts HTTP POST, PUT and GET requests. The service was built with PostgreSQL and Sequelize for working with database, and Express.js for creating APIs.

## Install PostgreSQL
* Check if your Homebrew is installed:
```$ which brew```
* If installed: ```> /usr/local/bin/brew```
* If not: ```> brew not found```
* If brew is not installed, run: 
```$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"``` on your terminal
* To update homewbrew ```brew update```
* To install postgres ```brew install postgresql```
* ```brew services start postgresql```
* To run postgres ```psql postgres```

Postgres commands:
* to connect to database ```\c fetch_points```
* to see tables details ```\d transactions```
* to quit postgres ```\q```


## Run web service
After the postgreSQL is installed run the following commands:
* ```git clone https://github.com/orzut/fetch-rewards-backend```
* ```cd fetch-rewards-backend```
* To install packages ```npm install```
* To create a database table that we will use to store transactions ```createdb fetch_points```
* To run our web service or a server ```npm run start```

## Test web service
### Using Postman
* PUT request to url: http://localhost:3000/api/points, enter {"points": 5000} to body field and select JSON format.
This request responds with the list of payers and according points spent by a user to redeem their points.
* GET request to url: http://localhost:3000/api/points responds with the amount of points each payer has after redeeming the users' points.
* POST request to http://localhost:3000/api/points allows to add transactions to database.

### Using curl
Run the following commands on your terminal to test the apis:
* PUT request ```curl -d '{"points": 5000}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/points```
* GET request ```curl -v http://localhost:3000/api/points```
* POST request ```curl -d '{"payer": "UNILEVER", "points": 5000}' -H "Content-Type: application/json" http://localhost:3000/api/points```


## Technologies
* Node.js
* Express version 4.18.2
* PostgreSQL version 2.0.20
* Sequelize version 6.25.5
