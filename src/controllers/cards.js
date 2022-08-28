const Card = require('../models/card');
const {
  OK, CREATED, BAD_REQUEST, NOT_FOUND, SERVER_ERROR,
} = require('../utils/errorStatus');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` });
    });
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner }, {
    new: true,
    runValidators: true,
  })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `Ошибка валидации: ${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` });
      }
      console.log({ message: `Произошла неизвестная ошибка ${err.name} c текстом ${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params.id;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Такой карточки не существует' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Невалидный id ' });
      } else {
        res.status(SERVER_ERROR).send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Такой карточки не существует' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Невалидный id ' });
      } else {
        res.status(SERVER_ERROR).send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Такой карточки не существует' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Невалидный id ' });
      } else {
        res.status(SERVER_ERROR).send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
      }
    });
};
