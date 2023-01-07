const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt');

router.post("/register", async(req, res) => {
    // Generate a salt
  const salt = bcrypt.genSaltSync(10);
  // Hash the password using the salt
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newuser = new User({name : req.body.name, email : req.body.email, number : req.body.number, password : hashedPassword})

    try{

        const user = await newuser.save()
        res.send("User Registered Succesfully")

    }catch(error){
        return res.status(400).json({ error });

    }

});


router.post("/login", async(req, res) => {
    // Get email and password from request body
    const { email, password } = req.body;
  
    // Find user with matching email
    const user = await User.findOne({ email });
    if (!user) {
      // Return an error if no user was found
      return res.status(400).json({ message: "Login failed" });
    }
  
    // Check if password is a match to the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Return user details if password is a match
      const temp = {
        name: user.name,
        email: user.email,
        number: user.number,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      return res.send(temp);
    } else {
      // Return an error if password is not a match
      return res.status(400).json({ message: "Login failed" });
    }
  });
  

router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/update-phone-number", async(req, res) => {
    const userId = req.body.userId
    const newNumber = req.body.newNumber
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { number: newNumber }, { new: true })
      res.send(updatedUser)
      res.send('Number Updated Successfully')
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  })

module.exports = router