import convert from 'koa-convert'
import compose from 'koa-compose'
import Router from 'koa-router'
//importDir is a good library
import importDir from 'import-dir'
const routes = importDir('./routes')

export default function api(){
  const router = new Router();
  Object.keys(routes).forEach(name => {
    return routes[name](router);
  });
  return convert.compose([
    router.routes(),
    router.allowedMethods()
  ]);
}