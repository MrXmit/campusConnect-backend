import { Profile } from "../models/profile.js"
import { Listing } from "../models/listing.js"


async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const listing = await Listing.create(req.body)
    const owner = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { listings: listing } },
      { new: true }
    )
    listing.owner = owner
    res.status(201).json(blog)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create
}