import { School } from "../models/school.js"

async function index(req, res) {
  try {
    const schools = await School.find({})
      .populate('services')
    res.status(200).json(schools)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    const school = await School.create(req.body)
    res.status(201).json(schools)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index
}
