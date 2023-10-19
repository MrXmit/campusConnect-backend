import { Router } from 'express'
import * as bookingsCtrl from '../controllers/bookings.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, bookingsCtrl.index)
router.post('/', checkAuth, bookingsCtrl.create)
router.get('/:bookingId', checkAuth, bookingsCtrl.show)
router.put('/:bookingId', checkAuth, bookingsCtrl.update)
router.delete('/:bookingId', checkAuth, bookingsCtrl.delete)
router.get('/customer/:customerId', checkAuth, bookingsCtrl.getBookingsPerCustomer)

export { router }