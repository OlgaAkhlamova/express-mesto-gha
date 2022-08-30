const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Лаймовый Дракон',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'в твоих руках',
  },

  avatar: {
    type: String,
    default: 'https://i.pinimg.com/originals/ec/ae/53/ecae53253279276bc2fd54d2aea18c1b.jpg',
    validate: {
      validator: (url) => isUrl(url),
      message: 'Ссылка указана неверно',
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Почта указана неверно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlenght: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
