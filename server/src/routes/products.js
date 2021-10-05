const route = require('express').Router();
const passport = require('passport');
const {
  get_products,
  create_product,
  get_product_by_id,
  get_product_by_name,
  update_product,
  delete_product,
  get_all_promotions,
  delete_image,
  updatePromotion,
  deletePromotion,
} = require('../controllers/products');

route.get('/', get_products);
route.get('/id/:id', get_product_by_id);
route.get('/name/:name', get_product_by_name);
route.get('/promotions', get_all_promotions);
route.put(
  '/promotions/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  updatePromotion
);
route.delete(
  '/promotions/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  deletePromotion
);
route.put(
  '/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  update_product
);
route.delete(
  '/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  delete_product
);
route.post('/', passport.authenticate('isAdmin', { session: false }), create_product);
route.post(
  '/delete_image',
  passport.authenticate('isAdmin', { session: false }),
  delete_image
);

module.exports = { route };
