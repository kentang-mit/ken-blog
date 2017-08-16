const mongoose = require('mongoose')
const Category = require('../../models/category.js')
import * as $ from '../../controllers/category_controller.js'
import verify from '../../middlewares/token_verify.js'

export default async(router) => {
  //const router = new Router();
  router.post('/api/add_category', verify, $.createCategory)

  router.patch('/api/modify_category', verify, $.modifyCategory)

  router.delete('/api/delete_category', verify, $.deleteCategory)

  router.get('/api/get_all_categories', $.getAllCategories)

  /*return convert.compose([
    router.routes(),
    router.allowedMethods()
  ]);*/
}