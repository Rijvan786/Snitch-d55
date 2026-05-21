import mongoose from "mongoose";
import priceSchema from "./price.model.js";
// tittle description price images,user
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    price: {
      type:priceSchema
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    variants: [
      {
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        stock: {
          type: Number,
          default: 0,
        },
        attributes: {
          type: Map,
          of: String,
        },
        price:{
          type:priceSchema
        }
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
