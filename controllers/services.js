import { Profile } from "../models/profile.js"
import { Service } from "../models/service.js"


async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const service = await Service.create(req.body)
    const owner = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { services: service } },
      { new: true }
    )
    service.owner = owner
    res.status(201).json(blog)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create
}