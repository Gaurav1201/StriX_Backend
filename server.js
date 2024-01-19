const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const shopListRoute = require("./routes/shopLists")
const registerShopRoute = require("./routes/registerShop")
const { urlencoded, Router, query } = require('express');
app.use(urlencoded({extended:true}))

//const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const ShopList = require("./models/ShopList");

dotenv.config();

mongoose 
 .connect("mongodb+srv://gaurav:testdb@cluster0.xr1lyrt.mongodb.net/?retryWrites=true&w=majority")   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

// mongoose
//   .connect("mongodb://localhost/strix_test",()=>{
//     console.log('connected')
//   },
//   (e) => console.error(e)
//   )


  // .then(() => console.log("DB Connection Successfull!"))
  // .catch((err) => {
  //   console.log('error',err);
  // });
 
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('server connected')
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/shops", shopListRoute)
app.use("/api/register", registerShopRoute)
//app.use("/api/checkout", stripeRoute);


app.listen(8000,() => {
  console.log("Backend server is running!");
});