import jwt from 'jsonwebtoken';
import config from '../config'

export default async(ctx, next) => {
  const authorization = ctx.get('Authorization');
  if(authorization === ''){
    ctx.throw(401, 'No token detected!');
  }
  const token = authorization.split(' ')[1];
  try{
    let tokenContent = await jwt.verify(token, config.jwt.secret)
  } catch(err) {
    console.log(err.name)
    if(err.name === 'TokenExpiredError'){
      ctx.throw(401, 'Token expired!');
    }
    ctx.throw(401, 'Invalid token!');
  }
  await next();
}