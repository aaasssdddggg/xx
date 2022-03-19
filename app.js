const express = require('express');
const items = require('./data/items');
require('dotenv').config();
const http = require('http');
const cron = require('node-cron');
const app = express();

app.listen(process.env.PORT || 3000, () => {
console.log("We've now got a server!");
startKeepAlive();
//items.getitems();
});

function startKeepAlive() {
 // Reference: https://stackoverflow.com/questions/5480337/easy-way-to-prevent-heroku-idling
 // Ping request sent every minute to prevent the app from sleeping
 // goodenoughdev --> Test , goodenoughbackend --> Production

  setInterval(function() {
      var options = {
          host: 'goodenoughdev.herokuapp.com',
          port: 80,
          path: '/'
      };
      http.get(options, function(res) {
        res.on('data', function() {
            try {
              sendEmail()
            } catch (err) {
                console.log(err.message);
            }
        });
      }).on('error', function(err) {
          console.log("Error: " + err.message);
      });
  }, 1 * 60 * 1000);
}

function sendEmail() {
  // runs at 6 pm
  cron.schedule('07 01 * * *', () => {
    items.getitems();
  });
}
