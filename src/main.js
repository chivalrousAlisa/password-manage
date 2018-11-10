
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import './assets/css/base.css';
import toastRegistry from './components/Toast';
Vue.use(toastRegistry);
// Vue.use(Vuex);
//
// const store = new Vuex.Store({
//   state:{
//     userName:'',
//     cartCount:0
//   },
//   mutations:{
//     updateUserInfo(state, nickName){
//       state.userName = nickName;
//     },
//     updateCartsCount(state, cartCount){
//       state.cartCount = cartCount;
//     }
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
