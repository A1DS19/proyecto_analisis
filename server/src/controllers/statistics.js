const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const { server_error } = require('../util/controllerFuncs');

module.exports.reserved_products = async function (req, res) {
  try {
    const { sort } = req.query;
    const products = [];

    const orders = await Order.aggregate([
      { $unwind: '$products' },
      { $sortByCount: '$products.name' },
      {
        $sort: {
          count: parseInt(sort),
        },
      },
      { $limit: 20 },
    ]);

    orders.forEach((order) => {
      products.push(order._id);
    });

    const topProducts = await Product.find({ name: { $in: products } });

    res.json(topProducts);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.total_income_orders = async function (req, res) {
  try {
    const totalOrders = await Order.count();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
        },
      },
    ]);

    res.json({ totalOrders, totalRevenue: totalRevenue[0].total });
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.categories_total_orders = async function (req, res) {
  try {
    let categories = [];
    categories = await Category.find();
    const categories_with_amount = await Order.aggregate([
      { $unwind: '$products' },
      { $group: { _id: '$products.category', amount: { $sum: 1 } } },
      { $sort: { amount: -1 } },
    ]);

    for (let i = 0; i < categories.length; i++) {
      categories[i] = categories[i].name;
    }

    categories.forEach((cat1) => {
      const temp_cats = categories_with_amount.map((cat2) => cat2._id);
      if (temp_cats.indexOf(cat1) === -1) {
        categories_with_amount.push({ _id: cat1, amount: 0 });
      }
    });

    res.json(categories_with_amount);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.total_orders = async function (req, res) {
  try {
    const { pickup } = req.query;
    const orders = await Order.countDocuments({ storePickup: JSON.parse(pickup) });
    res.json(orders);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.geo_zone_express = async function (req, res) {
  try {
    const orders = await Order.aggregate([
      { $match: { storePickup: false } },
      { $unwind: '$address' },
      { $group: { _id: '$address.provincia', amount: { $sum: 1 } } },
      { $sort: { amount: -1 } },
    ]);

    res.json(orders);
  } catch (err) {
    server_error(err, res);
  }
};
