const route = require('express').Router();
const {
  create_category,
  fetch_categories,
  update_category,
  delete_category,
} = require('../controllers/categories');

route.post('/', create_category);
route.get('/', fetch_categories);
route.put('/id/:id', update_category);
route.delete('/id/:id', delete_category);
route.delete('/id/:id');

module.exports = { route };
