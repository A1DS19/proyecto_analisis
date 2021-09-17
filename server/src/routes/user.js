const route = require('express').Router();
const { register_user } = require('../controllers/users');

route.post('/register', register_user);
route.post('/login');

module.exports = { route };
