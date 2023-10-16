import { Profile } from "../models/profile.js"
import { Service } from "../models/service.js"
import { School } from "../models/school.js"


async function index(req, res) {
  try {
    const services = await Service.find({})
      .populate(['createdBy', 'reviews'])
      .sort({ createdAt: 'desc' })
    res.status(200).json(services)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const service = await Service.findById(req.params.serviceId)
      .populate(['createdBy', 'reviews'])
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

// TODO get Serevices by Scool

async function create(req, res) {
  try {
    req.body.createdBy = req.user.profile
    const service = await Service.create(req.body)
    const school = await School.findById(req.body.school)
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
    )
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteService(req, res) {
  try {
    const service = await Service.findByIdAndDelete(req.params.serviceId)
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
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateReview(req, res) {
  try {
    const service = await Service.findById(req.params.serviceId)
    service.reviews.remove({ _id: req.params.reviewId })
    req.body.author = req.user.profile
    service.reviews.push(req.body)
    await service.save()
    res.status(200).json(service)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteReview(req, res) {
  try {
    const service = await Service.findById(req.params.serviceId)
    service.reviews.remove({ _id: req.params.reviewId })
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
  updateReview,
  deleteReview
}
