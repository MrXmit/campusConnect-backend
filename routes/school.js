import { Router } from 'express'
import * as schoolsCtrl from '../controllers/schools.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, schoolsCtrl.index)
router.post('/', checkAuth, schoolsCtrl.create)

export { router }
