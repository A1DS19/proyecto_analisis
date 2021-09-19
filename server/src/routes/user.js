const route = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  update_user_data,
  request_password_reset,
  reset_password,
} = require('../controllers/users');

route.put(
  '/id/:id',
  passport.authenticate('isAuth', { session: false }),
  update_user_data
);

route.post('/password-reset', request_password_reset);
route.post('/reset-password', reset_password);

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

module.exports = { route };
