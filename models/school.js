import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
}, {
  timestamps: true,
})

const School = mongoose.model('School', schoolSchema)

export { School }
