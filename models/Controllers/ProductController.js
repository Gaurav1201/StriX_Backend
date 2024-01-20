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
