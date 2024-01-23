const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.get('/getUser', (req,res)=>{
  res.send('jkd')
})
//REGISTER
router.post("/register", async (req, res) => {
  try{

    var responseData = {isValid:true, responceText:""};

    console.log('auth ', req.body.password)
    const userdata = await User.findOne().where('username').equals(userName)
    if(userdata!= null){
      responseData['isValid'] = false;
      responseData['responceText'] = "Email Already Exists";
      return res.send(responseData)
    }
    const newUser = new User({
      username: req.body.firstName,
      email: req.body.email,
      phoneNumber : req.body.phoneNumber,
      password : req.body.password
    });

  try {
    console.log('try block')
    const savedUser = await newUser.save();
    console.log(savedUser)
    responseData['isValid'] = true;
    responseData['responceText'] = "Saved";
    responseData['savedUser'] = savedUser;
    return res.send(responseData)
   // return res.status(201).json(savedUser);
  } catch (err) {
    console.log('error-------',err)
    responseData['isValid'] = false;
    responseData['responceText'] = err;
    return res.status(500).json(responseData);
  }
}catch(err){
  responseData['isValid'] = false;
    responseData['responceText'] = "Error";
}
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
      var responseData = {isValid:true, responceText:""};
      console.log('login route---', req.body.userName)
      const userName = req.body.userName;
      console.log(req.body)
      var user1 = "";
      const userdata = await User.findOne().where('username').equals(userName)
      if(userdata != null){
      console.log(userdata)
       const originalPassword = userdata.password; 
      
         inputPassword = req.body.password;
        // check login password and saved password
        if (originalPassword != inputPassword){
          console.log('user data--', userdata._id,'name--',userdata.username,'password--', userdata.password)
          console.log('wrong pass input pass ',inputPassword, 'original pass ', originalPassword)
          responseData['isValid'] = false;
          responseData['responceText'] = "Email/Password Combo Doesn't Match";
          return res.send(responseData);
        }
        else{
          console.log('pass matched')
          responseData['isValid'] = true;
          responseData['responceText'] = "Login succees";

          // TODO: GENERATE JWT TOKEN 
          res.send(responseData);
        }
       
      }
      else {
        console.log('wejlh')
        responseData['isValid'] = false;
        responseData['responceText'] = "Email/Password Comination Doesn't Match";
        res.send(responseData);
      }
      }catch(err){
        responseData['isValid'] = false;
        responseData['responceText'] = err;
      console.log('login err')
      console.log(err)
      res.status(500).json(responseData);
    }

}); 

module.exports = router;