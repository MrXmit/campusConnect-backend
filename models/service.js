import mongoose from 'mongoose'

const Schema = mongoose.Schema


const reviewSchema = new Schema({
  text: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  author: { type: Schema.Types.ObjectId, ref: "Profile" },
},
  { timestamps: true}
)

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Haircut', 'Tutoring', 'HandWork', 'Cooking', 'DIY', 'Other'],
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: props => 'Price cannot be negative!'
      }
    },
    availability: {
      type: String
    },
    reviews: [reviewSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
  },
  { timestamps: true, }
)

const Service = mongoose.model('Service', serviceSchema)

export { Service }
