const route = require('express').Router();
const passport = require('passport');
const {
  create_category,
  fetch_categories,
  update_category,
  delete_category,
} = require('../controllers/categories');

route.get('/', fetch_categories);

route.post('/', passport.authenticate('isAdmin', { session: false }), create_category);

route.put(
  '/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  update_category
);

route.delete(
  '/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  delete_category
);

module.exports = { route };
