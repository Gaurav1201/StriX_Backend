var express = require('express');
var router = express.Router();
const ShopList  = require("../models/ShopList");

router.post('/addReview', async (req, res) => {
    const { shopId, productId, newReview } = req.body;
  
    // Use the $push operator to add a new review to the product's "reviews" array
    Shop.updateOne(
      { _id: shopId, 'products._id': productId },
      { $push: { 'products.$.reviews': newReview } }
    )
      .then((updateResult) => {
        console.log('Update Result:', updateResult);
  
        // Fetch the updated shop data
        return Shop.findById(shopId);
      })
      .then((updatedShop) => {
        console.log('Updated Shop Data:', updatedShop);
  
        res.status(200).json({ message: 'Review added successfully', shop: updatedShop });
      })
      .catch((error) => {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  router.post('/deleteReview', async (req, res) => {
    const { shopId, productId, reviewId } = req.body;
  
    // Use the $pull operator to remove the review with the specified _id
    Shop.updateOne(
      { _id: shopId, 'products._id': productId },
      { $pull: { 'products.$.reviews': { _id: reviewId } } }
    )
      .then((updateResult) => {
        console.log('Update Result:', updateResult);
  
        // Fetch the updated shop data
        return Shop.findById(shopId);
      })
      .then((updatedShop) => {
        console.log('Updated Shop Data:', updatedShop);
  
        res.status(200).json({ message: 'Review deleted successfully', shop: updatedShop });
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  