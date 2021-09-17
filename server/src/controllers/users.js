const { User } = require('../models/User');
const { server_error } = require('../util/controllerFuncs');

module.exports.register_user = async function (req, res) {
  try {
    const data = req.body;
    console.log(data);
  } catch (err) {
    server_error(err, res);
  }
};
