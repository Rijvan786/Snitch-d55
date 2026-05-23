import mongoose from "mongoose";
import CartModel from "../models/Cart.model.js";

export async function getCartDetails(userId) {

    let  cart =(await CartModel.aggregate(
  [
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId)
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
        TotalPrice: { $sum: '$itemPrice.price' },
          currency:{$first:"$itemPrice.currency"},
         items:{$push:"$items"}
      }
    }
  ]))[ 0 ]

  return cart
    
}