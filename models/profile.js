import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: { type: String, required: true },
  photo: String
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
