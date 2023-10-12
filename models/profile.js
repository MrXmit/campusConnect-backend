import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  // todo add bookings
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
