import { Profile } from "../models/profile.js"
import { Booking } from "../models/booking.js"
import { Service } from "../models/service.js"

async function index(req, res) {
  try {
    const bookings = await Booking.find({})
      .populate(['customer', 'service'])
      .sort({ createdAt: 'desc' })
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json(error)
  }
}

// todo getBooking per Customer
// todo getBooking per Author (created By)

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
    const service = await Service.findById(req.body.service)
    req.body.price = service.price
    const booking = await Booking.create(req.body)
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
    )
    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteBooking(req, res) {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId)

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
