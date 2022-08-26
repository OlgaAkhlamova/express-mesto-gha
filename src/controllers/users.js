const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка валидации: ${err.message}` });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(404).send({ message: `Ресурс не найден: ${err.message}` });
        return;
      }
      if (err.name === 'ServerError') {
        res.status(500).send({ message: `Ошибка сервера: ${err.message}` });
      }
      console.log({ message: `Произошла неизвестная ошибка ${err.name} c текстом ${err.message}` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }, { runValidators: true })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка валидации: ${err.message}` });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(404).send({ message: `Ресурс не найден: ${err.message}` });
        return;
      }
      if (err.name === 'ServerError') {
        res.status(500).send({ message: `Ошибка сервера: ${err.message}` });
      }
      console.log({ message: `Произошла неизвестная ошибка ${err.name} c текстом ${err.message}` });
    });
};

module.exports.getUserById = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Ресурс не найден' });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка валидации: ${err.message}` });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(404).send({ message: `Ресурс не найден: ${err.message}` });
        return;
      }
      if (err.name === 'ServerError') {
        res.status(500).send({ message: `Ошибка сервера: ${err.message}` });
        return;
      }
      console.log({ message: `Произошла неизвестная ошибка ${err.name} c текстом ${err.message}` });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка валидации: ${err.message}` });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(404).send({ message: `Ресурс не найден: ${err.message}` });
        return;
      }
      if (err.name === 'ServerError') {
        res.status(500).send({ message: `Ошибка сервера: ${err.message}` });
      }
      console.log({ message: `Произошла неизвестная ошибка ${err.name} c текстом ${err.message}` });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body.avatar;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ user }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` }));
};
