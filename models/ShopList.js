const mongoose = require("mongoose");

const ShopListSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true},
    shopDescription: { type: String, required: false },
    shopRating :{type:Number, required:false, default:4},
    shopLocation : {type:String, default:"Udupi"},
    shopCordination : {"latitude":Number, "longitude":Number},
    ownerEmail : {type: String},
    products: [{
      productId : {type : Number},
      productName : String,
      productPrice : Number,
      productDescription : String,
      productQuantity : Number,
    }
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShopList", ShopListSchema); 