const { Product } = require('../models/Product');
const { server_error } = require('../util/controllerFuncs');

module.exports.get_products = async function (req, res) {
  try {
    const { category, page, limit } = req.query;
    const count = await Product.countDocuments();
    let products = null;

    if (!category && page !== 0) {
      products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    } else if (category && page !== 0) {
      products = await Product.find({ category })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    } else if (page === 0) {
      products = await Product.find(category && { category });
    }

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.get_product_by_id = async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ err: 'Producto no existe' });
    }

    res.json(product);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.get_product_by_name = async function (req, res) {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ err: 'Producto no existe' });
    }

    res.json([product]);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.update_product = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ err: 'Producto no existe' });
    }

    const updatedProduct = await Product.findOneAndUpdate({ id }, data, { new: true });

    res.status(202).json(updatedProduct);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.delete_product = async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ err: 'Producto no existe' });
    }

    await Product.findOneAndDelete({ id });

    res.status(202).json(true);
  } catch (err) {
    server_error(err, res);
  }
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
    server_error(err, res);
  }
};

module.exports.get_all_promotions = async function (req, res) {
  try {
    const promotions = await Product.find({ isDiscounted: true });

    if (!promotions) {
      return res.status(404).json({ err: 'No hay promociones' });
    }

    res.json(promotions);
  } catch (err) {
    server_error(err, res);
  }
};
