const express = require('express');
// const model = require('./models/index');
const items = require('./data/items');
require('dotenv').config();
const cors = require('cors');
const configRoutes = require('./routes');
const http = require('http');
const cron = require('node-cron');

//const items = require('./models/items');

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

// model.Item.findAll().then((data) => console.log(data));
configRoutes(app);
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000, () => {
  console.log("We've now got a server!");
startKeepAlive();
  sendEmail()

});

function startKeepAlive() {
  setInterval(function() {
      var options = {
          host: 'testfarah.herokuapp.com',
          port: 80,
          path: '/'
      };
      http.get(options, function(res) {}).on('error', function(err) {
          console.log("Error: " + err.message);
      });
  }, 1 * 60 * 1000);
}

function sendEmail() {
  cron.schedule('* * 21 * * *', () => {
 //  items.getitems();
    console.log('running a task every minute at the 5th second');
  });
}
