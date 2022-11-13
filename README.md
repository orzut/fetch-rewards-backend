# fetch-rewards-backend
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Install PostgreSQL](#install-postgresql)
* [Run web service](#run-web-service)
* [Test web service](#test-web-service)

## General Info
This is a web service that accepts HTTP GET, POST and PUT requests.


## Technologies
* Node.js
* Express version 4.18.2
* PostgreSQL version 2.0.20
* Sequelize version 6.25.5

## Run web service
* ```git clone https://github.com/orzut/fetch-rewards-backend```
* ```cd fetch-rewards-backend```
* ```npm install```
* ```createdb fetch_points```
* ```npm run start```

## Test web service
### Using Postman
POST request url: http://localhost/api/points
