import axios from '../server/server.js'
import APPAPI from '../config/api'
import store from '../store/store_cof'
// store.state['test'] = "4444444444";
import md5 from 'js-md5'
// import base from '../assets/js/pubilc.js';
let isconfi = {
  indexInit: false,
  usercenterInit: false,
  userMessageInit: false,
  userReportInit: false,
  userAccountInit: false,
  userProxyInit: false,
}
let moile = {
  'activity': true,
  'register': true,
  'detection': true,
}
const API = APPAPI.APPAPI;
const _cofg = function(){
  return {
    init(){
      axios('/upload/json/app.json')
      .then(function (response) {
        console.info("app.json格式错误")
        // localStorage.setItem("_appInit", JSON.stringify(response));
      })
      .catch(function (response) {
        store.mutations['setStore'](store.state,{
          key:'config',
          data:response
        });
        // localStorage.setItem('_appInit', JSON.stringify(response));
      });
      axios(API.ROOTY + API.POOTYPATH.USER_INFO)
      .then(function (response) {
        if(!response.isLogin || response === -1 )return localStorage.clear(),next('/login');
        store.mutations['setStore'](store.state,{
          key:'user',
          data:response
        });
        // localStorage.setItem("_UserInit", JSON.stringify(response));
      })
      .catch(function (result) {
        if(Boolean(store.state.login)){
          store.mutations['setlogin'](store.state, 0);
          // location.href = "/";
        }
        // location.href = "/login";
      });
      this.loginInfo( function(str) {
        location.href = '/';
      }).checkgrade();

    },
    mobile(to, from, next){
      store.mutations['setStore'](store.state, {
        key:'mobile',
        data:true
      });
      if(moile.hasOwnProperty(to.name))return next();
      return location.href="/yx/login/sign.html";
    },
    indexInit(next){
      (store.state.isIndexRouter !== "null" && location.pathname === "/index")&&store.mutations['setStore'](store.state,{
        key:'isIndexRouter',
        data:false
      });
      next()
    },

    usercenterInit(next){
      // if(isconfi.usercenterInit) return next();
      this.loginInfo( function(str) {
        next('/')
      }).checkCard().loadBanks();
      next();
      // isconfi.usercenterInit = true;
    },
    loginInfo(fn){
      axios(API.ROOTY + API.POOTYPATH.USER_LOGINDETAIL)
      .then(function (result) {
        if(result === -1 || !result)return localStorage.clear(),fn&&fn();
        result = result.length > 5 ? result.data.slice(4) : result;
        store.mutations['setStore'](store.state,{
          key:'loginInfo',
          data:result
        });
        // _this.$store.commit('setUser', response);
      })
      .catch(function (result) {
        // console.log(result,"------setUser")
        // _this.$store.commit('setUser', result);
      });
      return this;
    },
    checkgrade() {
      axios(API.ROOTY + API.POOTYPATH.USER_STATUS)
      .then(function (result) {
        let grade = 0;
        let gradeMsg = {title:'',num:0};
        if (result.isBindWithdrawPassword) {
            grade += 33;
        }
        if (result.isBindCard) {
            grade += 33;
        }
        if (result.isBindWithdrawName) {
            grade += 33;
        }
        if (grade <= 35) {
            gradeMsg.title = '低！';
            gradeMsg.num = 35;
        }
        if (grade <= 70 && grade > 36) {
            gradeMsg.title = '中！';
            gradeMsg.num = 70;
        }
        if (grade >= 90) {
            gradeMsg.title = '高！';
            gradeMsg.num = 100;
        }
        store.mutations['setStore'](store.state,{
          key:'checkgrade',
          data:gradeMsg
        });
        store.mutations['setStore'](store.state,{
          key:'isBindlist',
          data:result
        });
        // _this.$store.commit('setUser', response);
      })
      .catch(function (result) {
        // console.log(result,"------setUser")
        // _this.$store.commit('setUser', result);
      });
      return this;
    },
    checkCard() {
      axios(API.ROOTY + API.POOTYPATH.LIST_CARD)
      .then(function (result) {
        if(result === -1 )return localStorage.clear(),fn();
        for(let o of result) {
          o['bankCardId'] = '****' + o.bankCardId.slice(-4);
        }
        store.mutations['setStore'](store.state,{
          key:'cardList',
          data:result
        });
        // _this.$store.commit('setUser', response);
      })
      .catch(function (result) {
        console.log(result,"------setUser")
        // _this.$store.commit('setUser', result);
      });
      return this;
    },
    loadBanks() {
      axios(API.ROOTY + API.POOTYPATH.LOADBANKS)
      .then(function (result) {
        store.mutations['setStore'](store.state,{
          key:'bindList',
          data:result.bankList
        });
        // _this.$store.commit('setUser', response);
      })
      .catch(function (result) {
        console.log(result,"------setUser")
        // _this.$store.commit('setUser', result);
      });
      return this;
    },
    userMessageInit(next){
      store.mutations['setStore'](store.state,{
        key:'isIndexRouter',
        data:true
      });
      if(isconfi.userMessageInit ) return next();
      // this.loginInfo( function(str) {
      //   next('/')
      // });
      next();
      isconfi.userMessageInit = true;
    },
    userAccountInit(next){
      store.mutations['setStore'](store.state,{
        key:'isIndexRouter',
        data:true
      });
      if(isconfi.userAccountInit ) return next();
      // this.loginInfo( function(str) {
      //   next('/')
      // }).checkgrade().checkCard().loadBanks();
      next();
      isconfi.userAccountInit = true;
    },
    userReportInit(next){
      store.mutations['setStore'](store.state,{
        key:'isIndexRouter',
        data:true
      });
      if(isconfi.userReportInit ) return next();
      // this.loginInfo( function(str) {
      //   next('/')
      // }).checkgrade();
      next();
      isconfi.userReportInit = true;
    },
    userProxyInit(next){
      store.mutations['setStore'](store.state,{
        key:'isIndexRouter',
        data:true
      });
      if(isconfi.userProxyInit ) return next();
      // this.loginInfo( function(str) {
      //   next('/')
      // }).checkgrade();
      next();
      isconfi.userProxyInit = true;
    },

  }
}


export default _cofg
