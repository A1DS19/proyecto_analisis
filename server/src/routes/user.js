const route = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  update_user_data,
  request_password_reset,
  reset_password,
  get_users,
  get_user,
  create_user,
  update_user,
  delete_user,
  fetch_user_by_idNumber,
} = require('../controllers/users');

route.put(
  '/id/:id',
  passport.authenticate('isAuth', { session: false }),
  update_user_data
);

route.post('/register', (req, res, next) => {
  passport.authenticate('register', async (err, user) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).json({ err: 'Datos invalidos' });
      }

      req.login(user, () => {
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});

route.post('/login', (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).json({ err: 'Datos invalidos' });
      }

      req.login(user, () => {
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});

route.get(
  '/me',
  passport.authenticate('isAuth', { session: false }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ err: 'No autenticatido' });
    }

    res.json({ user: req.user });
  }
);

route.post('/password-reset', request_password_reset);
route.post('/reset-password', reset_password);

//get all users
route.get('/users', passport.authenticate('isAuth', { session: false }), get_users);

//get user by id
route.get('/user/:id', passport.authenticate('isAuth', { session: false }), get_user);
//get user by idNumber
route.get(
  '/user/idNumber/:idNumber',
  passport.authenticate('isAuth', { session: false }),
  fetch_user_by_idNumber
);

//create user
route.post('/user', passport.authenticate('isAuth', { session: false }), create_user);
//update user
route.put('/user/:id', passport.authenticate('isAuth', { session: false }), update_user);
//delete user
route.delete(
  '/user/:id',
  passport.authenticate('isAuth', { session: false }),
  delete_user
);

module.exports = { route };
