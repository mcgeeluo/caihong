import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Inits from './initData'
import login from '../../pages/login/login'
import register from '../../pages/register/register'
import help from '../../pages/help/help'
const isMobile = (function  () {
  return (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) ? true : false;
})();
const _$ = Inits();
_$.init();
const notLogin = {
  "download":true,
  "active":true,
  "detection":true,
  "help":true,
  "register":true
}
Vue.use(Router)
var router = new Router({
  hashbang: false,
  mode: 'history',
  routes: [
    {
      path: '/', name: 'login', component: login
    },
    {
      path: '/login', name: 'login', component: login
    },
    { 
      path:'/register', name: 'register', component: register
    },
    {
      path:'/help', name:'help', component:help
    }
  ]
});
router.beforeEach ((to, from, next) => {
  let islogin = store.state.app.login;
  if(isMobile) return _$['mobile'](to, from, next);
  if( !islogin && (to.name=="login" || to.name=="logins")) return next();
  if(!islogin && !notLogin[to.name]) return next('login');
  if(islogin && (to.name=="login" || to.name=="logins"))return next('index');
  return _$.hasOwnProperty(to.name +'Init')?_$[to.name +'Init'](next):next();

})
export default router;
