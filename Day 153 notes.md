  db.getCollection('carts').aggregate(
  [
    { $unwind: { path: '$items' } },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'items.product'
      }
    },
    { $unwind: { path: '$items.product' } },
    {
      $unwind: { path: '$items.product.variants' }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$items.variant',
            '$items.product.variants._id'
          ]
        }
      }
    },
    {
      $addFields: {
        itemPrice: {
          $multiply: [
            '$items.quantity',
            '$items.product.variants.price.amount'
          ]
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        total: { $sum: '$itemPrice' },
        items: { $push: '$items' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);



Original vali
db.getCollection('carts').aggregate(
  [
    {
      $match: {
        user: ObjectId('6a0be242f8619119578aa1ed')
      }
    },
    { $unwind: { path: '$items' } },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'items.product'
      }
    },
    { $unwind: { path: '$items.product' } },
    {
      $unwind: { path: '$items.product.variants' }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$items.variants',
            '$items.product.variants._id'
          ]
        }
      }
    },
    {
      $addFields: {
        itemPrice: {
          price: {
            $multiply: [
              '$items.quantity',
              '$items.product.variants.price.amount'
            ]
          },
          currency:
            '$items.product.variants.price.currency'
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        Totalprice: { $sum: '$itemPrice.price' },
        currency: {
          $first: '$items.price.currency'
        },
        items: { $push: '$items' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);