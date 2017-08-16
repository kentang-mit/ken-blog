const mongoose = require('mongoose')
const Article = require('../../models/article.js')
const Tag = require('../../models/tag.js')
const Router = require('koa-router')
const convert = require('koa-convert')
const compose = require('koa-compose')
import * as $ from '../../controllers/article_controller.js'
import verify from '../../middlewares/token_verify.js'

//一定要用controller,不然id传不进去
export default async(router) => {
  //const router = new Router();

  router.get('/api', function(ctx){
  	ctx.body = '<h1>hello</h1>';
  });

  router.post('/api/add_article', verify, $.createArticle);

  router.patch('/api/modify_article/:id', verify, $.modifyArticle)

  router.delete('/api/delete_article/:id', verify, $.deleteArticle)

  router.get('/api/get_article/:id', $.getArticle)
  
  router.get('/api/get_all_articles', $.getAllArticles)

  /*return convert.compose([
    router.routes(),
    router.allowedMethods()
  ]);*/
}