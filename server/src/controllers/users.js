const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { server_error } = require('../util/controllerFuncs');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../services/sendEmail');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const generateJWT = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET);
};

module.exports.register_user = async function (req, res) {
  try {
    const data = req.body;
    const existingUser = await User.findOne({
      $or: [
        {
          email: data.email,
        },
        { idNumber: data.idNumber },
      ],
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return res.status(401).json({ err: `Email ${data.email} ya existe` });
      }

      if (existingUser.idNumber === data.idNumber) {
        return res.status(401).json({ err: `Cedula ${data.idNumber} ya existe` });
      }
    }

    const newUser = await User.create(data);
    const jwt = generateJWT(newUser);
    res.status(201).json({ user: newUser, jwt });
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.login_user = async function (req, res) {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(401).json({ err: `Datos invalidos` });
    }

    const validatePassword = await user.isValidPassword(data.password);
    if (!validatePassword) {
      return res.status(401).json({ err: `Datos invalidos` });
    }

    const jwt = generateJWT(user);
    res.json({ user, jwt });
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.update_user_data = async function (req, res) {
  try {
    const data = req.body;
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!user) {
      return res.status(400).json({ err: 'Usuario no existe' });
    }

    res.status(202).json(user);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.request_password_reset = async function (req, res) {
  try {
    const resetPasswordEJS = path.join(__dirname, '..', 'views', 'resetPassword.ejs');
    const resetPasswordFile = fs.readFileSync(resetPasswordEJS, 'utf-8');
    const resetPasswordCompiled = ejs.compile(resetPasswordFile);
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(202).send(true);
    }

    //Fecha maxima para reset del token es el dia que se pide el reset + 24 horas
    user.resetPasswordToken = uuidv4();
    user.resetPasswordTokenExpiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000);
    await user.save();

    const resetPasswordHtml = resetPasswordCompiled({ token: user.resetPasswordToken });

    await sendEmail(email, 'RESET CONTRASEÑA', resetPasswordHtml);

    res.status(202).send(true);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.reset_password = async function (req, res) {
  try {
    const { password, token } = req.body;

    const user = await User.findOne({
      $and: [
        { resetPasswordToken: token },
        {
          resetPasswordTokenExpiryDate: {
            $lte: new Date(Date.now() + 60 * 60 * 24 * 1000),
          },
        },
      ],
    });

    if (!user) {
      return res.status(400).json({ err: 'El token expiro, intentelo de nuevo' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiryDate: null,
    });

    res.status(202).json({ msg: 'Contraseña reseteada con exito' });
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.get_users = async function (req, res) {
  try {
    const users = await User.find().select('-password');

    if (!users) {
      return res.status(404).json({ err: 'No hay usuarios registrados' });
    }

    res.json(users);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.get_user = async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ err: 'Usuario no existe' });
    }

    res.json(user);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.create_user = async function (req, res) {
  try {
    const { email, idNumber } = req.body;
    const user_with_email = await User.findOne({ email });

    if (user_with_email) {
      return res.status(404).json({ err: `Email ${email} ya existe` });
    }

    const user_with_idNumber = await User.findOne({ idNumber });

    if (user_with_idNumber) {
      return res.status(404).json({ err: `Cedula ${idNumber} ya existe` });
    }

    //crear nuevo usuario con contraseña generica
    const defaultPassword = 'abc123';
    const password = await bcrypt.hash(defaultPassword, 10);
    const body = { ...req.body, password };

    const newUser = await User.create(body);

    const newUserEJS = path.join(__dirname, '..', 'views', 'newUser.ejs');
    const newUserFile = fs.readFileSync(newUserEJS, 'utf-8');
    const newUserCompiled = ejs.compile(newUserFile);

    const newUser2 = await User.findByIdAndUpdate(
      newUser.id,
      {
        resetPasswordToken: uuidv4(),
        resetPasswordTokenExpiryDate: new Date(Date.now() + 60 * 60 * 24 * 1000),
      },
      { new: true }
    );

    const newUserHtml = newUserCompiled({
      token: newUser2.resetPasswordToken,
      email: newUser2.email,
      password: defaultPassword,
    });

    await sendEmail(email, 'Nueva cuenta Dragon Rojo', newUserHtml);

    res.json(newUser);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.update_user = async function (req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body, { new: true });

    if (!user) {
      return res.status(404).json({ err: 'Usuario no existe' });
    }

    res.json(user);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.delete_user = async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ err: 'No se pudo eliminar a usuario' });
    }

    res.json(true);
  } catch (err) {
    server_error(err, res);
  }
};

module.exports.fetch_user_by_idNumber = async function (req, res) {
  try {
    const { idNumber } = req.params;
    const user = await User.findOne({
      idNumber: { $regex: new RegExp(idNumber), $options: 'i' },
    }).select('-password');

    if (!user) {
      return res.json([]);
    }

    res.json([user]);
  } catch (err) {
    server_error(err, res);
  }
};
