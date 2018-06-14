import Vue from 'vue'
import vuex from 'vuex'
import store_cof from './store_cof'
import baseinit from '../uilt'
Vue.use(vuex);
Vue.use(baseinit);
export default new vuex.Store({
  modules:{
    app: store_cof
  }
})
