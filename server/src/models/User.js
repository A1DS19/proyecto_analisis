const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    resetPasswordTokenExpiryDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

//Antes de guardar un documento va a hashear la contrasena, NO se puede hacer user.save() sin rescribir la contraseña
UserSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  this.password = hashedPassword;
  next();
});

//Compara contrasenas y devuelve valor booleano
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model('User', UserSchema);
module.exports = { User };
