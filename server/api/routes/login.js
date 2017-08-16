const mongoose = require('mongoose')
const User = require('../../models/user.js')
const Router = require('koa-router')
const convert = require('koa-convert')
const compose = require('koa-compose')
const md5 = require('md5')
import config from '../../config'
import jwt from 'jsonwebtoken'
//const config = require('../config.js')

async function init_user(){
  let user = await User.find().catch(err => {
    console.log(err);
  })
  if(user.length === 0){
    const adminUser = new User({
      username: config.admin.user,
      password: md5(config.admin.pwd)
    })
    await adminUser.save();
  }
  return new Promise((resolve, reject) => {
    resolve();
  })
}

export default async(router) => {
  //const router = new Router();
  init_user().then(()=>{
    router.post('/api/login', async function(ctx){
      let username = ctx.request.body.username,
          password = ctx.request.body.password;
      //find returns an array
      let user = await User.findOne({username: username}).catch(err => {
        ctx.throw(401, 'User is non-existent!')
      });
      if(user.password === password){
        let token = jwt.sign({
          username: username,
          password: password,
          expiresIn: 60*60*5,
        }, config.jwt.secret);
        ctx.body = {
          success: true,
          token: token
        }
      }
      else{
        ctx.throw(401, 'Password is incorrect');
      }
    })
  });
  /*return convert.compose([
    router.routes(),
    router.allowedMethods()
  ])*/
}