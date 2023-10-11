import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schoolSchema = new Schema({
  name: String,
  state: String,
  listings: [listingSchema]    //   TODO
},{
  timestamps: true,
})

const School = mongoose.model('School', schoolSchema)

export { School }
