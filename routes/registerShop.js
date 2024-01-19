var express = require('express');
var router = express.Router();
const ShopList  = require("../models/ShopList");

router.post('/shop',  async (req,res)=>{
    console.log(' shop ', req.body.ownerId)
    const newShop = new ShopList({
        shopName: req.body.shopName,
        shopLocation : req.body.shopLocation,
        ownerEmail : req.body.ownerEmail,
        ownerId : req.body.ownerId,
        });

      try{
        const shopSaved = await newShop.save()
        console.log('id',shopSaved._id)
       res.send(shopSaved._id)
      }
      catch(e){
        console.log(e)
      }
    const shopList = await ShopList.find()
    console.log(shopList)
    
    
    
})
module.exports = router;