import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './fontello/css/fontello.css';
import p2p from "./communication/p2p";

Vue.config.productionTip = false
window.p2p = p2p;
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');


