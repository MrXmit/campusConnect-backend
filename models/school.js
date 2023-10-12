import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schoolSchema = new Schema({
  name: String,
  state: String,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
},{
  timestamps: true,
})

const School = mongoose.model('School', schoolSchema)

export { School }
