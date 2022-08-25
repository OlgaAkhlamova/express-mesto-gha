const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  console.log(req.params);
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` }));
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` }));
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` }));
};
