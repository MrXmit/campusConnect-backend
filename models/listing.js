import mongoose from 'mongoose'
import { Profile } from './profile'

const Schema = mongoose.Schema

const listingSchema = new Schema(
{
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['News', 'Sports', 'Games', 'Movies', 'Music', 'Television'],
  },
  price: {
    type: Number,  // todoo: check only possitive vals
    required: true,
  },
  availability: {
    type: Date  // todo: check dates in future ???
  },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  school: { type: Schema.Types.ObjectId, ref: 'School' }
},
{timestamps: true,}
)

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }
