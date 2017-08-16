const mongoose = require('mongoose')
const Tag = require('../../models/tag.js')
import * as $ from '../../controllers/tag_controller.js'
import verify from '../../middlewares/token_verify.js'

export default async(router) => {
  console.log(verify)
  //const router = new Router();
  router.post('/api/add_tag', verify, $.createTag)

  router.patch('/api/modify_tag', verify, $.modifyTag)

  router.delete('/api/delete_tag', verify, $.deleteTag)

  router.get('/api/get_all_tags', $.getAllTags)

  /*return convert.compose([
    router.routes(),
    router.allowedMethods()
  ]);*/
}