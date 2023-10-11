import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.get('/', checkAuth, profilesCtrl.index)
// router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
