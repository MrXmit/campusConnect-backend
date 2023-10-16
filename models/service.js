import mongoose from 'mongoose'

const Schema = mongoose.Schema


const reviewSchema = new Schema({
  text: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  author: { type: Schema.Types.ObjectId, ref: "Profile"},
})

const serviceSchema = new Schema(
  {
    
    type: {
      type: String,
      required: true,
      enum: ['Haircut','Tutoring', 'HandyWork', 'Cooking', 'Other']
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,  // todoo: check only possitive vals
      required: true,
    },
    availability: {
      type: String  // todo: check dates in future ???
    },
    reviews: [reviewSchema],
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    school: { type: Schema.Types.ObjectId, ref: 'School' }
    // todo bookings 
  },
  { timestamps: true, }
)

const Service = mongoose.model('Service', serviceSchema)

export { Service }
