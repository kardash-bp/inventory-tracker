import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: 'SKU',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Please add a quantity'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Please add a price'],
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
)

export default model('Product', productSchema)
