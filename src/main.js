import Vue from 'vue'
import App from './App'
import router from './common/router'
import store from './common/store'
import resource from 'vue-resource';
import installs from './common/server'
import __base from './common'
import base from './common/uilt'
import sAlert from 'bc-popups/lib'
import './assets/css/base.css'
// import Inits from './common/router/getserver.js'
Vue.config.productionTip = false;
Vue.use(installs);
Vue.use(resource);
Vue.use(base);
Vue.use(__base);
Vue.use(sAlert);
const _vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
