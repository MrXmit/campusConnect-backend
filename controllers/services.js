import { Profile } from "../models/profile.js"
import { Service } from "../models/service.js"
import { School } from "../models/school.js"


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

async function deleteService(req, res) {
  try {
    const service = await Service.findByIdAndDelete(req.params.serviceId)
    const profile = await Profile.findById(req.user.profile)
    profile.services.remove({ _id: req.params.serviceId })
    await profile.save()
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addReview(req, res) {
  try {
    const service = await Service.findById(req.params.serviceId)
    req.body.author = req.user.profile
    service.reviews.push(req.body)
    await service.save()
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteService as delete,
  addReview,
}
