const router = require('express').Router();
const { userValidation, userIdValidation, avatarValidation } = require('../middlewares/validation');

const {
  getUsers, getUserById, patchUser, patchAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserInfo);

router.get('/users/:userId', userIdValidation, getUserById);

router.patch('/users/me', userValidation, patchUser);

router.patch('/users/me/avatar', avatarValidation, patchAvatar);

module.exports = router;
