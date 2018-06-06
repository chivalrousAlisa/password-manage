import Vue from 'vue'
import Router from 'vue-router'
import Passwordlist from './../views/Passwordlist';

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'passwordlist',
      components: {
        default:Passwordlist
      }
    }
  ]
})
