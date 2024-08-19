const express = require('express');
const { createGroup, addMemberToGroup,sendMessageToGroup,addLikeToMessage,fetchMessageofGroup,fetchAllGroup,fetchGroupName,fetchSenderName,groupDetails,deleteGroup } = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createGroup);
router.post('/adduser', protect, addMemberToGroup);
router.post('/addMessage',protect,sendMessageToGroup);
router.post('/addLikeToMessage',protect,addLikeToMessage);
router.post('/getMessages',protect,fetchMessageofGroup);
router.post('/getGroups',protect,fetchAllGroup);
router.post('/fetchGroupName',protect,fetchGroupName);
router.post('/fetchSenderName',protect,fetchSenderName);
router.post('/fetchGroupDetails',protect,groupDetails);
router.delete('/deleteGroup',protect,deleteGroup);

module.exports = router;
