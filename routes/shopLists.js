var express = require('express');
var router = express.Router();
const ShopList  = require("../models/ShopList");

//RETURN SHOP LIST
router.get('/shopList', async (req,res)=>{
    console.log('in shop ')
    const shopList = await ShopList.find()
   // console.log(shopList)
    res.send(shopList)
})

//DETAILS OF A SPECIFIC SHOP
router.get('/getDetails/:id',  async (req,res)=>{
    const shopList = await ShopList.findById(req.params.id)
    //console.log(shopList)
    res.send(shopList)
    
})

//ADD PRODUCTS TO A SHOP
router.post('/addProduct' ,async  (req,res)=>{
    console.log(req.body.productDescription, req.body.shopId)
    ShopList.updateOne(
      {_id : req.body.shopId},
        {$push : {"products" : {productId :1, productName : req.body.productName, productDescription : req.body.productDescription, productPrice : req.body.productPrice}}},
        function(err, result){
            if(err) throw err;
            console.log (result)
        }
    )
    const data = await ShopList.find().where("_id").equals(req.body.shopId)
    console.log(data)
})

module.exports = router;