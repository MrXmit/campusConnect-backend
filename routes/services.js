import { Router } from 'express'
import * as servicesCtrl from '../controllers/services.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, servicesCtrl.create)

export { router }
