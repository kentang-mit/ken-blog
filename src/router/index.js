import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import List from '@/components/List'
import Login from '@/components/Login'
import Post from '@/components/Post'
import Editor from '@/components/Editor'
import Article from '@/components/Article'
Vue.use(Router)

export default new Router({
  //history mode: no #
  mode: 'history',
  routes: [
  //坑!千万不要用'/:id'这种路由,'/post'会被理解成id=post
    {
      path: '/page/:id',
      name: 'Page',
      component: List
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/post',
      name: 'Post',
      meta:{
        requireAuth: true,
      },
      component: Post
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/editor/:id',
      name: 'Editor',
      meta:{
        requireAuth: true,
      },
      component: Editor
    },
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
