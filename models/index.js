'use strict';

var Sequelize = require('sequelize');

var sequelize = new Sequelize('nozama_app', 'group404', 'abc', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nozama_mongo');

var models = {};

models.sequelize = sequelize;
models.User = sequelize.import('./user');
models.Profile = sequelize.import('./profile');
// models.Cart = require('./cart')(mongoose);
models.Order = sequelize.import('./order');
models.Product = sequelize.import('./product');
models.LineItem = sequelize.import('./lineitem');



// Object.keys(models).forEach(function(modelName) {
//  if ("associate" in models[modelName]) {
//    models[modelName].associate(models);
//  }
// });

models.User.hasOne(models.Profile);
models.Profile.belongsTo(models.User);

models.Order.belongsTo(models.User);
models.User.hasMany(models.Order);

models.LineItem.belongsTo(models.Order);
models.Order.hasMany(models.LineItem);

models.LineItem.belongsTo(models.Product);
models.Product.hasMany(models.LineItem);

// sequelize.sync();

module.exports = models;
