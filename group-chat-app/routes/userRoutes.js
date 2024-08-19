const express = require('express');
const { createUser, editUser, getAllUsers,getUserDetails } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, createUser);
router.post('/details', protect, admin, getUserDetails);
router.put('/:id', protect, admin, editUser);
router.get('/', protect, getAllUsers);

module.exports = router;
