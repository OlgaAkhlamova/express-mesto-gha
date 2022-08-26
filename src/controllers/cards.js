const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
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

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
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

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res.send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
    });
};
