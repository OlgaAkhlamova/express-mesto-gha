const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('connected'))
  .catch((error) => console.log(error));

app.use('/', (req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  res.send('Рано радоваться, когда ничего не понимаешь');
  next();
});

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
