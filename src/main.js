// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import {markdown} from './filters/index'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import 'bootstrap/dist/css/bootstrap.css'
import Axios from 'axios'
//import './stylus/index.styl'
//Vue.config.productionTip = false
Vue.filter('markdown', markdown);
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  //console.log(to)
  if(to.meta!={} && to.meta.requireAuth){
    if(store.state.token){
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
      next();
    }
    else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else{
    next();
  }
});

Axios.interceptors.response.use((response => {return response;}), (error =>{
  if(error.response){
    if(error.response.status === 401){
      store.commit('LOGOUT');
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
  }
}));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App,
})