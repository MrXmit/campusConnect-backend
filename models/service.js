import mongoose from 'mongoose'

const Schema = mongoose.Schema

const serviceSchema = new Schema(
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
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    // school: { type: Schema.Types.ObjectId, ref: 'School' }
  },
  { timestamps: true, }
)

const Service = mongoose.model('Service', serviceSchema)

export { Service }
