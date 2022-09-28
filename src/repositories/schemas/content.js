import mongoose from "mongoose"
const { Schema, model } = mongoose

const ContentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ingredients: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: true,
      default: []
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
)

export default model('content', ContentSchema)