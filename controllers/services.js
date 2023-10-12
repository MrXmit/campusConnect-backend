import { Profile } from "../models/profile.js"
import { Service } from "../models/service.js"


async function index(req, res) {
  try {
    const services = await Service.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(services)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const service = await Service.findById(req.params.serviceId)
      .populate('author')
      // .populate(['author', 'comments.author'])
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const service = await Service.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { services: service } },
      { new: true }
    )
    service.author = profile
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.serviceId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  show,
  update,
}