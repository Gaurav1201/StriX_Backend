var express = require('express');
var router = express.Router();
const ShopList  = require("../models/ShopList");

//ADD PRODUCTS TO A SHOP
router.post('/addProduct', (req, res) => {
  console.log(req.body.productDescription, req.body.shopId);

  // Use the $addToSet operator to add a new product to the "products" array
  ShopList.updateOne(
    { _id: req.body.shopId },
    {
      $addToSet: {
        products: {
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productPrice: req.body.productPrice,
        },
      },
    },
    { upsert: true } // Create the document if it doesn't exist
  )
    .then((updateResult) => {
      console.log('Update Result:', updateResult);

      // Fetch the updated shop data
      return ShopList.findById(req.body.shopId);
    })
    .then((updatedShop) => {
      console.log('Updated Shop Data:', updatedShop);

      res.status(200).json({ message: 'Product added successfully', shop: updatedShop });
    })
    .catch((error) => {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});



//UPDATE PRODUCTS IN A SHOP
router.post('/updateProduct', (req, res) => {
  const { shopId, productId, updatedData } = req.body;

  // Use the $set operator to update an existing product in the "products" array
  ShopList.updateOne(
    { _id: shopId, 'products._id': productId },
    {
      $set: {
        'products.$.productName': updatedData.productName,
        'products.$.productDescription': updatedData.productDescription,
        'products.$.productPrice': updatedData.productPrice,
        'products.$.productStock': updatedData.productStock
        // Add more fields as needed
      },
    }
  )
    .then((updateResult) => {
      console.log('Update Result:', updateResult);

      // Fetch the updated shop data
      return ShopList.findById(shopId);
    })
    .then((updatedShop) => {
      console.log('Updated Shop Data:', updatedShop);

      res.status(200).json({ message: 'Product updated successfully', shop: updatedShop });
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


router.post('/deleteProduct', async (req, res) => {
  const { shopId, productId } = req.body;

  // Use the $pull operator to remove the product with the specified _id
  Shop.updateOne(
    { _id: shopId },
    { $pull: { products: { _id: productId } } }
  )
    .then((updateResult) => {
      console.log('Update Result:', updateResult);

      // Fetch the updated shop data
      return Shop.findById(shopId);
    })
    .then((updatedShop) => {
      console.log('Updated Shop Data:', updatedShop);

      res.status(200).json({ message: 'Product deleted successfully', shop: updatedShop });
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


module.exports = router;
