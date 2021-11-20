const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const { server_error } = require('../util/controllerFuncs');

module.exports.create_order = async function (req, res) {
  try {
    const body = req.body;
    body.storePickup = Boolean(body.storePickup);
    body.isDelivered = Boolean(body.isDelivered);

    body.total = !body.storePickup ? body.total + 5000 : body.total;
    body.isDelivered = false;

    const totalOrders = await Order.count();
    const order = await Order.create(body);

    order.orderId = totalOrders + 1;
    await order.save();

    order.products.forEach(async (product) => {
      const prd = await Product.findOne({ name: product.name });
      prd.quantity -= product.selectedQuantity;
      await prd.save();
    });

    if (!order) {
      return res.status(400).json({ err: 'No se pudo crear orden' });
    }

    res.json(body);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.fetch_user_orders = async function (req, res) {
  try {
    const { userId } = req.query;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders) {
      return res.json([]);
    }

    res.json(orders);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.fetch_all_orders = async function (req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('userId');

    if (!orders) {
      return res.json([]);
    }

    res.json(orders);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.fetch_delivered_or_not_orders = async function (req, res) {
  try {
    const { isDelivered } = req.params;

    const orders = await Order.find({ isDelivered: JSON.parse(isDelivered) })
      .sort({ createdAt: -1 })
      .populate('userId');

    if (!orders) {
      return res.json([]);
    }

    res.json(orders);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.fetch_orders_by_id = async function (req, res) {
  try {
    const { id } = req.params;

    let orders = await Order.aggregate([
      {
        $addFields: {
          tempOrderId: { $toString: '$orderId' },
        },
      },
      {
        $match: {
          tempOrderId: { $regex: id, $options: 'i' },
        },
      },
    ])
      .sort({ createdAt: -1 })
      .exec();

    orders = await Order.populate(orders, { path: 'userId' });

    orders = orders.map((order) => {
      return { ...order, id: order._id };
    });

    if (!orders) {
      return res.json([]);
    }

    res.json(orders);
  } catch (err) {
    console.log(err);
    server_error(err, res);
  }
};

module.exports.update_delivered_state = async function (req, res) {
  try {
    const { id } = req.params;
    const body = req.body;

    const order = await Order.findByIdAndUpdate(id, body, { new: true }).populate(
      'userId'
    );

    if (!order) {
      return res.status(400).json({ err: 'No se pudo actualizar' });
    }

    res.json(order);
  } catch (err) {
    server_error(err, res);
  }
};
