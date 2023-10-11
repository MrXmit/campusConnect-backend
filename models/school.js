import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schoolSchema = new Schema({
  name: String,
  state: String,
  listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
},{
  timestamps: true,
})

const School = mongoose.model('School', schoolSchema)

export { School }
