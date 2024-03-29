import { Router } from 'express'
import * as servicesCtrl from '../controllers/services.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, servicesCtrl.index)
router.post('/', checkAuth, servicesCtrl.create)
router.get('/:serviceId', checkAuth, servicesCtrl.show)
router.put('/:serviceId', checkAuth, servicesCtrl.update)
router.post('/:serviceId/reviews', checkAuth, servicesCtrl.addReview)
router.delete('/:serviceId', checkAuth, servicesCtrl.delete)
router.put('/:serviceId/reviews/:reviewId', checkAuth, servicesCtrl.updateReview)
router.delete('/:serviceId/reviews/:reviewId', checkAuth, servicesCtrl.deleteReview)
router.get('/createdBy/:userId', checkAuth, servicesCtrl.getServicesPerCreator)


export { router }