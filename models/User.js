const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique:true, required: true},
    email: { type: String, required: true , unique : true},
    phoneNumber : {type :Number, required:true},
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    shopOwned : {type : "ObjectId", ref : "ShopList"},
    OTP : {type:Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema); 