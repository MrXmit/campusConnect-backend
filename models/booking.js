import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  date: String,
  price: {
    type: Number,
    required: true
  },
  contactinfo: String,
  request: String,
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  customer: { type: Schema.Types.ObjectId, ref: 'Profile' },
  status: { type: Boolean, default: false}

}, {
  timestamps: true,
})

const Booking = mongoose.model('Booking', bookingSchema)

export { Booking }
