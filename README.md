## Good Enough Scheduler

## ℹ️ About:
Scheduler is used to run a task everyday and it is hosted on [Heroku](https://www.heroku.com/). Scheduler is going to send an email that contains a list of the products that are about to expire. Notifying the user everyday, three days before the expiration date.


## 🎯 Functionality:
1- The is_used flag should be false for the notified item.

2- The user should get notified for three days before the expiration date at 6pm time zone (America/New_York). 

3- If the items are expired, they should be removed from the item table and added to the shopping list table.

4- The Scheduler will ping itself to keep it awake on Heroku. [more details](https://devcenter.heroku.com/articles/free-dyno-hours)

## 🚀 Run:
To run the project you need the following:

You will need to first install all the dependencies by running this command:

    $ npm ci
  
Then you will need a .env file to make sure all the configurations are in place.
Run the application using the following command:

    $ npm start


## 📋 Structure: 

| Directories    | Description                                                                                                                      |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `/config`      | This directory contains database configuration file                                                                              |
| `/data`        | This directory contains the database operations                                                                                  |
| `/models`      | This directory contains all the sequelize definitions of the tables in the databse                                               |                                                                                                                                                                   |
| `/views`       | This directory contains the handlebar file that has the design template for the email
| `/_test_`      | This directory contains the test code using Jest                                               |     
| `/images`      | This directory contains the README file image                                                  |     

## 📐 Scheduler Architecture:
<img src="https://raw.githubusercontent.com/GoodEnoughApp/GoodEnoughScheduler/dev/images/diagram.png" data-canonical-src="https://raw.githubusercontent.com/GoodEnoughApp/GoodEnoughScheduler/dev/images/diagram.png" width="900" height="900" />

