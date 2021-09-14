require('dotenv').config();
const express = require('express');
const { mongo_db_connection } = require('./config/dbConnection');
const { route: productsRoute } = require('./routes/products');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 5000 || process.env.PORT;
const app = express();

(async () => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use('/products', productsRoute);

  mongo_db_connection();
  app.listen(PORT, () => {
    console.log(`SERVER STARTED, PORT ${PORT}`);
  });
})();
