const models = require('../models/index');
require('dotenv').config();
var moment = require('moment-timezone');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

// get expired items
async function getitems() {
  var date = moment().tz("America/New_York").add(3, 'days').toDate()
  try {
    var items =  await models.Item.findAll({
      where: {
        expiration_date: {
          [Op.lte]: date
        }
        , is_used:false
      }
  });
}
catch 
{
  console.log("Error in fetching items. ")
  return false; 
}
  if (items && items.length != 0 )
  {
var expiredItems = [];
  for (const element of items) {
    var userProduct = await models.user_product
    .findOne({
      where: 
        {id: element.product_id}
    })

    if (userProduct)
    {
var user =  await models.users
.findOne({
  where: 
    {id: userProduct.user_id}
})
if (!user)  
{console.log("Error user not found. ")
return false;
}
else
{
expiredItems.push({name: user.name, email: user.email, itemName: userProduct.name, expire: element.expiration_date, userProduct: userProduct,  item: element })
}
}
else
{
console.log("Error product not found.")
return false;
}
  }
 try {
let emails = expiredItems.map(item => item.email).filter((value, index, self) => self.indexOf(value) === index)
emailSetup(emails, expiredItems, 'Hello! - Good Enough', 'expired');
// console.log(expiredItems);
} catch (e) {
  console.log("Error: " + e.message);
  return false;
}
  }
  return true;
}

// Setup email
function emailSetup(users, expiredItems, title, templateName) {
  users.forEach(user => {
    var userItems =   expiredItems.filter(function (data)
    {
      return data.email == user
    }
    );
  
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

  // item is expired, remove it from item table and add it to the shopping list table.
  expiredItems.forEach(item => {
    let now = moment().tz("America/New_York").format('YYYY-MM-DD')
    if (item.expire == now)
    {
     // deleteItem(item.item.id);
      // addShoppingItem (item.item.created_at, item.userProduct.id, item.item.initial_quantity, item.item.cost )
    }
  });
});
}

async function deleteItem(itemId) {
  // delete item
  await models.Item.destroy({
    where: {
      id: itemId,
    },
  });
  // if (deletedItem === 1) 
  //   return true ;
  // else 
  //   return false;
}

async function addShoppingItem(date, productId, quantity, cost) {
  // add item to shopping list
  await models.shopping_list_item.create({
    product_id: productId,
    quantity: quantity,
    cost: cost,
    created_at: date,
  });
}

module.exports = {
  getitems,
};
