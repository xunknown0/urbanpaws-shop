const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    images: [{url: String, public_id: String}],
    location: String,
    lat: Number,
    lng: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   reviews: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }
]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
