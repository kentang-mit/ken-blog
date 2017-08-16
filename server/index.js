const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const router = require('koa-router')()
const cors = require('koa-cors') //front-back communication

import api from './api'

const app = new Koa();
app.use(cors());
app.use(bodyParser());

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/ken-blog').catch(err => {
	console.log(err);
});
app.use(api());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
console.log('Server successfully listens at http://localhost:3000 ...');

export default app;