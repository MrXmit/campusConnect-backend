import { Profile } from "../models/profile.js"
import { Booking } from "../models/booking.js"
import { Service } from "../models/service.js"

async function index(req, res) {
  try {
    const bookings = await Booking.find({})
      .populate('customer')
      .populate('service')
      .sort({ createdAt: 'desc' })
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getBookingsPerCustomer(req, res) {
  try {
    const bookings = await Booking.find({})
      .populate('customer')
      .sort({ createdAt: 'desc' })

      const filteredBookings = bookings.filter(booking => {
      return booking.customer._id.toString().slice(0, -1) === req.params.customerId.slice(0, -1)
    })
    res.status(200).json(filteredBookings)
  } catch (error) {
    res.status(500).json(error)
  }
}

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
    req.body.service = req.body.serviceId
    const service = await Service.findById(req.body.serviceId)
    req.body.price = service.price
    const booking = await Booking.create(req.body)
    await Service.findByIdAndUpdate(
      req.body.serviceId,
      { $push: { bookings: booking } }, 
      { new: true })
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

async function updateStatus(req, res) {
  try {
    const { status } = req.body
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status },
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
  deleteBooking as delete,
  updateStatus,
  getBookingsPerCustomer
}
