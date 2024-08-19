const Group = require('../models/Group');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    console.log("groupname"+name)
    const group = new Group({ name, members: [req.user._id] });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ error: err.message });
  }
};
exports.deleteGroup = async (req, res) => {
    const { groupId } = req.body;
    try {
      console.log("groupId "+groupId)
      const group = await Group.findById(groupId);
      const messages=await Message.find({groupId});
      await Message.deleteMany({groupId})
      await Group.deleteOne(group)
      res.status(201).json(group);
    } catch (err) {
      console.log(err.message)
      res.status(400).json({ error: err.message });
    }
  };
exports.fetchGroupName = async (req, res) => {
    const { groupId } = req.body;
    try {
      const group = await Group.findById(groupId)
     
      res.status(201).json(group.name);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  exports.fetchSenderName = async (req, res) => {
    const { userIds } = req.body;
    try {
  
        if (!Array.isArray(userIds)) {
            return res.status(400).json({ error: 'userIds must be an array' });
          }
          console.log(userIds)
        //   const users = await User.find({ _id: { $in: userIds } });
        // var users=[];
       
        const users = await User.find({ _id: { $in: userIds } });
        console.log("user"+users)
          const usernames = users.map(user => ({
            id: user._id,
            username: user.username
          }));
          console.log(usernames)
     
      res.status(201).json(usernames);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
exports.fetchMessageofGroup=async(req,res)=>{
    const{groupId}=req.body;
    try{
        console.log(groupId)
        const message=await Message.find({groupId});
        console.log(message)
       
        
       
            
            
            res.status(201).json(message);
        
        
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}
exports.sendMessageToGroup=async(req,res)=>{
    const{groupId,senderId,content}=req.body;
    try{
        console.log(groupId+" "+senderId+" "+content)
        const group=await Group.findById(groupId);
        if(!group){
            return res.status(400).json({message:"Invalid Group not found"});
        }
        const findMember=group.members.find((ele)=>{
            return ele._id.equals(senderId);
        });
        if(!findMember){
            return res.status(400).json({message:"Not a user in this group"});
        }
        else{
            const message=new Message({groupId,senderId,content});
            await message.save();
            res.status(201).json(message);
        }
        
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}
exports.addLikeToMessage=async(req,res)=>{
    const{messageId,userId}=req.body;
    try{
        const message=await Message.findById(messageId);
        console.log(message.groupId)
        if(!message){
            return res.status(400).json({message:"Message not found"});
        }
        const group=await Group.findById(message.groupId);

        const findMember=group.members.find((ele)=>{
            return ele._id.equals(userId);
        });
        if(!findMember){
            return res.status(400).json({message:"Member not found"});
        }
        const findLike=message.likes.find((like)=>{
            return like._id.equals(userId)
        })
        if(findLike){
            return res.status(400).json({message:"Already Liked"});
        
        }
        else{
            message.likes.push(userId);
            await message.save();
            res.status(201).json(message);
        }
        
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}
exports.addMemberToGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const group = await Group.findById(groupId);
    const user = await User.findById(userId);

    if (!group || !user) {
      return res.status(404).json({ message: 'Group or User not found' });
    }
    const findMember=group.members.find((ele)=>{
        return ele._id.equals(user._id);
    });
    if(findMember==undefined){
        group.members.push(userId);
        await group.save();
        res.json(group);
    }
    else{
        return res.status(404).json({ message: "Already member in this group" });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.fetchAllGroup= async (req, res) => {
    const { username } = req.body;
    
    try {
        

        const userId=await User.findOne({ username: username });
        console.log("Username: "+username+" userId: "+userId)

      const groups = await Group.find({members:userId});

  
      
      res.json(groups)
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.groupDetails=async(req,res)=>{
    const{groupId}=req.body;
    try{
        console.log(groupId)
        const group=await Group.findById(groupId);
        console.log(group)
       
        
       
            
            
            res.status(201).json(group);
        
        
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}
