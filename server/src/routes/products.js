const route = require('express').Router();
const {
  get_products,
  create_product,
  get_product_by_id,
} = require('../controllers/products');

route.get('/', get_products);
route.get('/:id', get_product_by_id);
route.post('/', create_product);

module.exports = { route };
