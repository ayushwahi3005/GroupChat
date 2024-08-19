const User = require('../models/User');

exports.createUser = async (req, res) => {
  // logic for creating a new user
  const { username, password } = req.body;
  console.log("createUser....");
  
  try {
    const user = new User({ username, password});
    await user.save();
    res.status(201).json({ message: "User Created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.editUser = async (req, res) => {
  // logic for editing a user
  const {username,password} = req.body;
  console.log("edit "+username+" "+password)
  const userId=req.params.id;
  try{
    const user=await User.findById(userId);
    if(user){
        user.username=username;
        user.password=password;
        await user.save();
        res.status(201).json({ message: "User Updated" });
    }
    else{
        res.status(400).json({ error: "Invalid user" });
    }
  }
  catch(err){
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // const users = await User.find().select('-password');
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserDetails=async(req,res)=>{
  const {userId}=req.body
  try {
    // const users = await User.find().select('-password');
    const users = await User.findById(userId);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
