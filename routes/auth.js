const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.get('/getUser', (req,res)=>{
  res.send('jkd')
})
//REGISTER
router.post("/register", async (req, res) => {
  console.log('auth ', req.body.password)
  const newUser = new User({
    username: req.body.firstName,
    email: req.body.email,
    phoneNumber : req.body.phoneNumber,
    password : req.body.password
    // password: CryptoJS.AES.encrypt(
    //   req.body.password,
    //   "sand"
    // ).toString(),
  });

  try {
    console.log('try bloc')
    const savedUser = await newUser.save();
    console.log(savedUser)
    return res.send(savedUser)
   // return res.status(201).json(savedUser);
  } catch (err) {
    console.log('error-------',err)
    return res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
      console.log('login route---', req.body.userName)
      const userName = req.body.userName;
      var user1 = "";
      const userdata = await User.findOne().where('username').equals(userName)
      console.log(userdata)
      // const user = await User.find({username:userName}, function(err, docs){
      //   if(err){
      //     console.log( 'errorln,n,,',err)
      //   }
      //   else{
      //     console.log('docdjldk',docs);
      //     user1 = docs;
      //   }
      // } ) 
      //const user = await User.find().where('username').equals(req.body.userName)
      // const user = await User.findOne(
      //       {
      //           username: req.body.userName
      //       }
      //   )
        //c onst user = await User.find().where('username').equals('test3')
        //!user && re s.status(401).json("Wrong User Name");

        // const hashedPassword = CryptoJS.AES.decrypt(
        //     user.password,
        //     "sand"
        //    // process.env.PASS_SEC
        // );


       // const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const originalPassword = userdata.password;
        const inputPassword = req.body.password;
        
       // originalPassword != inputPassword && 
            //res.json("Wrong Password");
        if (originalPassword != inputPassword){
          console.log('user data--', userdata._id,'name--',userdata.username,'password--', userdata.password)
          console.log('wrong pass input pass ',inputPassword, 'original pass ', originalPassword)
          return res.send('wrong password')
        }
        else{
          console.log('pass matched')
          
          res.send('user exists')
        }
        // const accessToken = jwt.sign(
        // {
        //     id: userdata._id,
        //     isAdmin: userdata.isAdmin,
        // },
        // //,
        // "sand",
        //     {expiresIn:"3d"}
        // );
  
        // const { password, ...others } = userdata._doc;  
        // return res.json({...others, accessToken});

    }catch(err){
      console.log('login err')
      console.log(err)
      res.status(500);
    }

}); 

module.exports = router;