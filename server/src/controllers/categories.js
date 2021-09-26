const { Category } = require('../models/Category');
const { server_error } = require('../util/controllerFuncs');

module.exports.fetch_categories = async function (req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.update_category = async function (req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ err: 'Categoria no existe' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    res.status(202).json(updatedCategory);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.delete_category = async function (req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ err: 'Categoria no existe' });
    }

    await Category.findOneAndDelete({ id });

    res.status(202).json(true);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.create_category = async function (req, res) {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ err: 'Categoria ya existe' });
    }

    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    server_error(err, res);
  }
};
