import { Profile } from "../models/profile.js"
import { Booking } from "../models/booking.js"
import { Service } from "../models/service.js"

async function index(req, res) {
  try {
    const bookings = await Booking.find({})
      .populate(['customer','service'])
      .sort({ createdAt: 'desc' })
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json(error)
  }
}

// todo getBooking per user


async function show(req, res) {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate(['customer', 'service'])
    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.customer = req.user.profile
    
    const service = await Service.findById(req.body.serviceId)
    req.body.service = service._id
    req.body.price = service.price
    
    const booking = await Booking.create(req.body)

    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { bookings: booking } },
      { new: true }
    )
    
    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      req.body,
      { new: true }
    ).populate('customer')
    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteBooking(req, res) {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId)
    const profile = await Profile.findById(req.user.profile)
    profile.bookings.remove({ _id: req.params.bookingId })

    const serviceId = await Service.findById(booking.service)
    profile.services.remove({ _id: serviceId })
    // Toto delete the booking from the profile and Service
    await profile.save()

    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteBooking as delete
}
