/* eslint-disable @adonisjs/prefer-lazy-controller-import */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import RolesController from '../app/controllers/role/roles_controller.js'
import UtilisateursController from '../app/controllers/utilisateur/utilisateurs_controller.js'
import { middleware } from './kernel.js'

router
  .get('/', async () => {
    return {
      hello: 'fuck world',
    }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.post('/roleStore', [RolesController, 'storeRole']).prefix('/api')
router.get('/roles', [RolesController, 'getAllRoles']).prefix('/api')
router.put('/roleUpdate/:id', [RolesController, 'updateRole']).prefix('/api')
router.delete('/roleDelete/:id', [RolesController, 'deleteRole']).prefix('/api')

router.post('/userStore', [UtilisateursController, 'create']).prefix('/api')
router.get('/users', [UtilisateursController, 'getAllUsers']).prefix('/api')
router.put('/userUpdate/:id', [UtilisateursController, 'update']).prefix('/api')
router.delete('/userDelete/:id', [UtilisateursController, 'delete']).prefix('/api')
router.get('/user/:id', [UtilisateursController, 'getOne']).prefix('/api')

router.post('/auth/login', [UtilisateursController, 'login']).prefix('/api')
router.get('/auth/logout', [UtilisateursController, 'logout']).prefix('/api')
