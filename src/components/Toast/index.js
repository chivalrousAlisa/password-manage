import Vue from 'vue';
import Toast from './Toast';
const ToastConstructor = Vue.extend(Toast);
function showToast(text,duration=2000){
  const toastDom = new ToastConstructor({
    el:document.createElement("div"),
    data(){
      return{
        text,
        show:true
      }
    }
  });
  document.body.appendChild(toastDom.$el);
  setTimeout(() => {
    toastDom.show = false;
  },duration);
}
function registryToast(){
  Vue.prototype.$toast = showToast;
}
export default registryToast
