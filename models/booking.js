import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  date: Date,
  price: {
    type: Number,
    required: true
  },
  request: String,
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  customer: { type: Schema.Types.ObjectId, ref: 'Profile' },

}, {
  timestamps: true,
})

const Booking = mongoose.model('Booking', bookingSchema)

export { Booking }
