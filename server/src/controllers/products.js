const { Product } = require('../models/Product');

module.exports.get_products = async function (req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

module.exports.get_product_by_id = async function (req, res) {
  const { id } = req.params;
  res.send(id);
};

module.exports.create_product = async function (req, res) {
  try {
    const { name, description, images, quantity, price, category } = req.body;
    const product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(401).json({ err: err.message });
  }
};
