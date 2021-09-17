module.exports.server_error = function (err, res) {
  return res.status(500).json({ err: err.message });
};
