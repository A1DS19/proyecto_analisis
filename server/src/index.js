require('dotenv').config();
const express = require('express');
const { mongo_db_connection } = require('./config/dbConnection');
const { route: productsRoutes } = require('./routes/products');
const { route: categoriesRoutes } = require('./routes/categories');
const { route: userRoutes } = require('./routes/user');
const { route: orderRoutes } = require('./routes/order');
const { route: statisticsRoutes } = require('./routes/statistics');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const PORT = process.env.PORT || 5000;
const app = express();

(async () => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  require('./config/passportAuth');

  app.use('/statistics', statisticsRoutes);
  app.use('/products', productsRoutes);
  app.use('/category', categoriesRoutes);
  app.use('/order', orderRoutes);
  app.use('/user', userRoutes);

  mongo_db_connection();
  app.listen(PORT, () => {
    console.log(`SERVER STARTED, PORT ${PORT}`);
  });
})();
