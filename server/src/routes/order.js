const route = require('express').Router();
const passport = require('passport');
const {
  create_order,
  fetch_user_orders,
  fetch_all_orders,
  fetch_delivered_or_not_orders,
  fetch_orders_by_id,
  update_delivered_state,
} = require('../controllers/orders');

route.post('/', passport.authenticate('isAuth', { session: false }), create_order);
route.get('/', passport.authenticate('isAuth', { session: false }), fetch_user_orders);

route.get(
  '/admin/isDelivered/:isDelivered',
  passport.authenticate('isAdmin', { session: false }),
  fetch_delivered_or_not_orders
);

route.get(
  '/admin',
  passport.authenticate('isAdmin', { session: false }),
  fetch_all_orders
);

route.get(
  '/admin/id/:id',
  passport.authenticate('isAdmin', { session: false }),
  fetch_orders_by_id
);

route.put(
  '/admin/:id',
  passport.authenticate('isAdmin', { session: false }),
  update_delivered_state
);

module.exports = { route };
