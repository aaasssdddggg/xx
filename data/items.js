const models = require('../models/index');
require('dotenv').config();
var moment = require('moment-timezone');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

async function getitems() {
  var date = moment().tz("America/New_York").add(3, 'days').toDate()
    var items =  await models.Item.findAll({
      where: {
        expiration_date: {
          [Op.lte]: date
        }
        , is_used:false
      }
  });
var expiredItems = [];
  for (const element of items) {
    var userProduct = await models.user_product
    .findOne({
      where: 
        {id: element.product_id}
    })
   // console.log(userProduct.user_id);
    if (userProduct)
    {
var user =  await models.users
.findOne({
  where: 
    {id: userProduct.user_id}
})
if (!user)  console.log("Error user not found. ")
else
{
expiredItems.push({name: user.name, email: user.email, item: userProduct.name, expire: element.expiration_date })
}
}
else
console.log("Error product not found.")
  }
 try {
  // var items = ['test', 'farah']
  // const uniques = array.map(item => item.age)
  // .filter((value, index, self) => self.indexOf(value) === index)
let emails = expiredItems.map(item => item.email).filter((value, index, self) => self.indexOf(value) === index)
emailSetup(emails, expiredItems, 'Hello! - Good Enough', 'expired');
 console.log(expiredItems);
} catch (e) {
  console.log("Error: " + e.message);
}

}

// Setup email
function emailSetup(users, expiredItems, title, templateName) {

  for (const user of users) {
    var userItems =   expiredItems.filter(function (data)
    {
      return data.email == user
    }
    );
   // console.log(x)
  

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
  });
  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.handlebars',
        layoutsDir: './views/',
        defaultLayout: templateName,
      },
      viewPath: './views/',
    })
  );
  let mailOptions = {
    from: process.env.Email,
    to: user,
    subject: title,
    template: templateName,
    context: {
      items: userItems,
    },
  };
  transporter.sendMail(mailOptions);
  return;
}

}

module.exports = {
  getitems,
};

