import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import blogDetail from '../views/blogDetail.vue'
import postBlog from '../views/postBlog.vue'
import Error from '../views/error.vue'
import Regist from '../views/regist.vue'
import commentBlog from '../views/commentBlog.vue'
import nowTime from '../views/nowTime.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/aboutOur',
    name: 'About',
    component: About
  },
  {
    path: '/nowTime',
    name: 'nowTime',
    component: nowTime
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/blog/detail/:blogId',
    name: 'blogDetail',
    component: blogDetail
  },
  {
    path: '/blog/post',
    name: 'postBlog',
    component: postBlog
  },
  {
    path: '/blog/content/:blogId',
    name: 'commentBlog',
    component: commentBlog
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
