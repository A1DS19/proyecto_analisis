const route = require('express').Router();
const {
  reserved_products,
  total_income_orders,
  categories_total_orders,
  total_orders,
  geo_zone_express,
} = require('../controllers/statistics');

route.get('/reserved-products', reserved_products);
route.get('/total-income-orders', total_income_orders);
route.get('/categories-total-orders', categories_total_orders);
route.get('/total-orders', total_orders);
route.get('/geo-zone-express', geo_zone_express);

module.exports = { route };
