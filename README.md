# Fetch Rewards Points
## Table of contents
* [General info](#general-info)
* [Install PostgreSQL](#install-postgresql)
* [Run web service](#run-web-service)
* [Test web service](#test-web-service)
* [Technologies](#technologies)

## General Info
This is RESTful web service that accepts HTTP POST, PUT and GET requests. The service was built with PostgreSQL and Sequelize for working with database, and Express.js for creating APIs.

This web service is built to store transactions, redemptions, and balances of points by payers. The initial data is pre-populated, but users can add additional transactions using the POST requests.

This web service provides the following features:
- Add transactions for a specific payer and date.
- Spend points using the rules above and return a list of { "payer": <string>, "points": <integer> }
- Return all payer point balances.
  
The points are redeemed based on the following rules:
- Redemption is based on the oldest transaction date
- Payer balances cannot go below 0
- User cannot redeem non-integer amount of points
- User can record (POST) negative (credit) points, but users cannot redeem (PUT) negative amount of points.
  
Follow the next steps to test and validate the web service.

## Install PostgreSQL
Open terminal and check if homebrew is installed:
* ```$ which brew```
* If installed, you'll see: ```> /usr/local/bin/brew```
* If not, you'll see: ```> brew not found```

* If homebrew is not installed, run: 
```$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

After installation, update homewbrew: 
* ```$ brew update```

After homebrew update, install postgres:
* ```$ brew install postgresql```

To check for succesfull installation, run:
* ```$ brew services start postgresql```
* ```> Successfully started `postgresql@14` (label: homebrew.mxcl.postgresql@14)```

* ```$ psql postgres```
* ```> psql (14.6 (Homebrew)) Type "help" for help.```
* To exit postgres ```$ \q```

## Run web service
After the postgreSQL is installed, run the following commands to create a copy of backend service:
* ```$ git clone https://github.com/orzut/fetch-rewards-backend```
* ```$ cd fetch-rewards-backend```

Next, install npm packages: 
* ```$ npm install```

Next, create a database table that will be used to store transactions
* ```$ createdb fetch_points```

Next, run the web service: 
* ```$ npm run start```

If all steps were successfully executed, database should be set up and listening on port 3000, 

## Test web service
Open new terminal and run the following commands to check if the web service was set up properly:
* Access the directory: ```$ cd fetch-rewards-backend```
* Run psql: ```$ psql postgres```
* Connect to database: ```$ \c fetch_points```
* Expected outcome: ```> You are now connected to database "fetch_points" as user```
* Run: ```$ select * from transactions;```
* Output similar to the following should be displayed:

<img width="952" alt="image" src="https://user-images.githubusercontent.com/100243695/202025951-b8b8882f-6c10-47d1-883a-6688f657fbff.png">

* Data table is pre-populated based on the examples from the assignment. Users can add more transactions through POST requests as described below. 

## Validate features

In terminal, repeat the following steps:
* ```$ cd fetch-rewards-backend```
* ```$ npm install```
* ```$ createdb fetch_points```
* ```$ npm run start```

Database is now ready to be called.
  
### API calls using Postman
* Download and login to Postman: https://www.postman.com/downloads/ (Note: postman cloud cannot make localhost calls)
* Select "Create new HTTP request"

* Use case: Add transactions for a specific payer and date.  


* Use case: Spend points and return a list of { "payer": <string>, "points": <integer> }
  
* API call type: PUT
* url: http://localhost:3000/api/points 
* Select Body option, raw format, select JSON 
* Enter following command within Body: {"points": 5000}
  
This request responds with the list of payers and according points spent by a user to redeem their points.

<img width="905" alt="image" src="https://user-images.githubusercontent.com/100243695/202065326-83d83c0f-f7a0-4813-94d0-4e5cb7c3cd7e.png">
  
  * GET request to url: http://localhost:3000/api/points responds with the amount of points each payer has after redeeming the users' points.
* POST request to http://localhost:3000/api/points allows to add transactions to database.
  { "payer": <string>, "points": <integer> }

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
