import APPAPI from './config/api'
import md5 from 'js-md5'
import Inits from './router/initData'
// import base from '../assets/js/pubilc.js';
let _userLogin = {};
const _$ = Inits();
let timer = null;
const API = APPAPI.APPAPI;
const base = {
    Inits(){
      if(!this.$store.state.app.login) return false;
      appConfig.oVue(this);
      this.$store.commit('setStore', {
        key:'navHover',
        data:this.$route.path
      });
      this.$$.noticeInit.call(this);
      this.$$.lotteyList.call(this);
      this.$$.initBalance.call(this);
      this.$$.getNotice.call(this);
      let num = 0;
      let _this = this;
      timer = setInterval(() => {
        this.$store.commit('setStore',{
          key:'timer',
          data: num++
        } );
        if(num % 10 === 0) {
          this.$$.initBalance.call(this);
          this.$$.getNotice.call(this);
        }
      },1000);
    },

    getNotice() {
      let _this = this;
      _this.axios(API.ROOTY + API.POOTYPATH.USER_NOTICE)
      .then(function (response) {
        if(response.length){
          for(let i of response){
            i['content'] = _this.$.cleanHtml(i['content']);
          }
        }
        _this.$store.commit('setStore',{
          key:'systemMsg',
          data:response
        } );
      })
      .catch(function (result) {
          console.log(result)
      });
    },
    readyNotice(datas) {
      let _this = this;
      let listall = [];
      for(let obj of datas) {
        listall.push(obj.id);
      }
      _this.axios(API.ROOTY + API.POOTYPATH.USER_NOTICEREADY + '?ids=' + (listall.toString()))
      .then(function (response) {
        _this.$$.getNotice.call(_this);
      })
      .catch(function (result) {
          console.log(result)
      });
      // let that = this;
      // return base.httpPost(_this, API.ROOTY + API.POOTYPATH.USER_NOTICEREADY + '?ids=' + (this.listall.toString()), function (result) {
      //     if (result.code === 0) {
      //         that.getNotice(this);
      //     }
      // });
    },

    getbind(){
      let _this = this;
      _this.axios(API.ROOTY + API.POOTYPATH.BINDINFO)
      .then(function (response) {
        _this.$store.commit('setStore',{
          key:'bindInfo',
          data:response
        } );
      })
      .catch(function (result) {
          console.log(result)
      });
    },
    // 获取验证码
    refreshSrc(istrue){
      return ((!istrue?API.ROOTS + API.ROOTSPATH.CAPTCHA:API.ROOTY + API.POOTYPATH.CAPTCHA) + '?t=' + new Date().getTime());
    },
    // 登陆
    login(){
      let _this = this;
      _this.login_pass_error = "登录中...";
      let passd = md5(_this.pass);
      var ssoParams = [API.ROOTS + API.ROOTSPATH.LOGIN, '?', 'cn=', _this.name, '&password=', passd];
      if (_this.captchasrc !== '') {
          ssoParams.push('&capchaCode=' + _this.captcha);
      }
      _this.axios(ssoParams.join(''))
      .then(function (response) {
        _userLogin['cn'] = _this.name;
        _userLogin['pwd'] = passd;
        _userLogin['appid'] = response.user.sourceAppId;
        localStorage.setItem("_userLogin", JSON.stringify(_userLogin));
        _this.$store.commit('setlogin', 1);
        localStorage.setItem("_isDemo", '1');
        _$.init();
        base.Inits.call(_this);
        _this.$router.push('/home')
      })
      .catch(function (result) {
        if (result.code === 36 || result.code === 37) {
            _this.captcha = '';
            _this.isCaptcha = true;
            _this.captchasrc = _this.$$.refreshSrc()
        }
        _this.login_pass_error = result.msg;
      });
    },
    // 退出
    loginOut() {
      let _this = this;
        let logout = _this.$store.state.app.userLogin;
        let isdemo = _this.$store.state.app.isDemo;
        let ssoParams = [API.ROOTS + API.ROOTSPATH.LOGOUT, '?', 'cn=', logout.cn, '&password=', logout.pwd, '&appId=', logout.appid];
        _this.axios(ssoParams.join(''))
        .then(function (response) {
          localStorage.clear();
          _this.$store.commit('setlogin', 0);
          if(!isdemo)return location.href=appConfig.DemoOut,true;
          _this.$router.push('/login');
        })
        .catch(function (result) {
          if (result.code === 36 || result.code === 37) {
              _this.captcha = '';
              _this.isCaptcha = true;
              refreshSrc(_this)
          }
          _this.login_pass_error = result.msg;
        });
    },
    // 刷新余额
    initBalance() {
      let _this = this;
      _this.axios(API.ROOTY + API.POOTYPATH.USERLOOP)
      .then(function (result) {
        _this.$store.commit('setStore',{
          key:'balance',
          data:result.lotteryBalance
        } );
      })
      .catch(function (result) {
        console.log(result)
      });
    },
    // 获取彩种
    lotteyList(){
        let _this = this;
      _this.axios( API.ROOTY + API.POOTYPATH.LOTTERY_LIST)
      .then(function (result) {
        _this.$store.commit('setStore', {
          key:'lottery',
          data:result
        });
      })
      .catch(function (result) {
        console.log(result)
      });
    },
    // 拉去公告
    noticeInit() {
      let _this = this;
      this.axios( API.ROOTY + API.POOTYPATH.NOTICE_LIST)
      .then(function (result) {
        if(result.length) {
          for(let val of result) {
            val['content'] = _this.$.toHtml(val['content']);
          }
          _this.$store.commit('setStore',{
            key:'notice',
            data:result
          });
        }
      })
      .catch(function (result) {
        console.log(result)
      });
    },
    // 首页公告
    StorageNotice() {
        return {
            _timer: null,
            _isStatus: false,
            noticeMove(_this) {
                if(!_this.$refs.notice) return false;
                (this._isStatus && _this.NoticeMoveNum--) || _this.NoticeMoveNum++;
                if (_this.NoticeMoveNum >= _this.promptList.length - 1) return this._isStatus = true, this.noticeMove(_this);
                if (_this.NoticeMoveNum <= 0) this._isStatus = false;
                _this.$.move(_this.$refs.notice, {'top': -35 * _this.NoticeMoveNum});
            }
        }
    },
    // 获取第三方游戏链接
    getGameUrl() {
      return this.axios( API.ROOTY + API.POOTYPATH.LOGIN_URL+'?platformId='+this.sportObj.platformId)
    },
    // 获取第三方钱包余额
    getGameBanlce(id) {
      return this.axios( API.ROOTY + API.POOTYPATH.THIRDAMOUNT+'?platformId='+id)
    },
    // 绑定银行卡
    bindCardInit() {
      let _this = this;
      let isFirstBind = Boolean(this.$store.state.app.bindInfo.withdrawName);

      let datas = "?withdrawPassword=" + md5(this.card.fundsPwd) +
                  "&bankId=" + this.card.openBank +
                  "&bankBranch=" + this.card.bankName +
                  "&bankCardId=" + this.card.bankNumber;
      let sendUrl = API.ROOTY + ( isFirstBind ?
        API.POOTYPATH.ADD_BANK:
        (datas += '&withdrawName='+this.card.cn,API.POOTYPATH.USER_DATA));
      this.axios( sendUrl + datas)
      .then(function (result) {
        _this.closeUserData();
        _$.checkCard();
        !isFirstBind && _$.checkgrade();
      })
      .catch(function (result) {
        console.log(4444)
        _this.receiveError = result.message;
      });
    },
    // 充值密码【登陆/资金】
    sendResetPwd() {
      let _this = this;
      let sendUrl = [API.ROOTY + (Boolean(this.res.type) ? API.POOTYPATH.RESET_FUNDSPASSWORD:API.POOTYPATH.RESET_LOGINPASSWORD), '?',
      'oldPassword=', md5(this.res.oldPassword),
      '&newPassword=', md5(this.res.rePassword)].join('');
      this.axios(sendUrl)
      .then(function (result) {
        _this.closePwd();
        _this.$s.sAlert({
          message:result.message,
          autoClose: true,
          time: 3000
        });
      })
      .catch(function (result) {
        _this.res.resetPwdErroe = result.message;
      });
    },

    // 注册
    register(){
      let sendUrl = [API.ROOTY + API.POOTYPATH.REGISTER, '?',
      'parentId=', this.req.parentId,
      '&link=', this.req.links,
      '&name=', this.req.name,
      '&pwd=', md5(this.req.pass),
      '&yanzCode=', this.req.safety];
      let _this = this;
      this.axios({
        method: 'post',
        url:sendUrl.join('')
      }).then(function (result) {
        _this.req.login_pass_error = '';
        let login = _this.$store.state.app.login;
        _this.$s.sAlert({
          message: '注册成功',
          note:'用户名：' + result.userName,
          autoClose:2000,
          callback:function(){
            if(login){
              _this.$$.loginOut.call(_this);
            }else{
              _this.$router.push("/login")
            }

          }
        })
      }).catch(function (result) {
        _this.req.login_pass_error = result.message;
        _this.RefreshSrc();
      });
    },
    // 注册链接hash检测
    testRegisterLink(){
      let _this = this;
      var sendUrl = [API.ROOTY + API.POOTYPATH.USER_REGISTER, '?', 'link=',this.$route.params.userid];
      this.axios({
        method: 'post',
        url:sendUrl.join('')
      }).then(function (result) {
        _this.req['links'] = result.link;
        _this.req['parentId'] = result.parentId;
      }).catch(function (result) {
        _this.$s.sAlert({
          message: result.message,
          callback:function(){
            _this.$router.push("/login")
          }
        })
        // _this.res.resetPwdErroe = result.message;
      });
    },
    // 设置默认银行卡
    setDefult(datas) {
      let sendUrl = API.ROOTY + API.POOTYPATH.SETCARD;
      let _this = this;
      this.axios({
        method: 'post',
        url: sendUrl,
        data: datas
      }).then(function (result) {
        _this.$s.sAlert({
          message: '设置成功',
          autoClose: 3000,
          callback: function(){
            _$.checkCard();
          }
        })
      }).catch(function (result) {
        _this.$s.sAlert({
          message: result.message,
          autoClose: 3000,
        })
        // _this.res.resetPwdErroe = result.message;
      });
    },
    // 获取消息列表
    gitMessage(){
      let _this = this;
      _this.axios( {
        method: 'post',
        url:API.ROOTY + API.POOTYPATH.LISTMSG,
        data:{
          page: 0,
          size: 10
        }
      })
      .then(function (result) {
        _this.$store.commit('setStore', {
          key:'listMsg',
          data:result
        });
      })
      .catch(function (result) {
        console.log(result,"------setListMsg")
      });
    },
    readMessage(id){
      let _this = this;
      _this.axios( {
        method: 'post',
        url:API.ROOTY + API.POOTYPATH.READMSG,
        data:{
          ids: id
        }
      })
      .then(function (result) {
        console.log('已读 '+result.title)
      })
      .catch(function (result) {
        console.log(result,"------setListMsg")
      });
    },
    delMessage(id){
      let _this = this;
      _this.axios( {
        method: 'post',
        url:API.ROOTY + API.POOTYPATH.DELETEMSG,
        data:{
          ids: id
        }
      })
      .then(function (result) {
        _this.$s.sAlert({
          message: '删除成功',
          autoClose:true,
          callback:function(){
            _this.$$.gitMessage.call(_this);
          }
        })
      })
      .catch(function (result) {
        console.log(result,"------setListMsg")
        _this.$s.sAlert({
          message: result.message,
          autoClose:true
        })
      });
    },
    getNumberList(){
      let _this = this;
      _this.axios(API.ROOTY + API.POOTYPATH.NUMBERLIST)
      .then(function (result) {
        _this.$store.commit('setStore', {
          key:'numberList',
          data:result
        });
      })
      .catch(function (result) {
        console.log(result,"------setListMsg")
        _this.msg.error="没有下级会员信息";
      });
    },

    sendMsg(data){
      let _this = this;
      _this.axios({
        method: 'post',
        url:API.ROOTY + API.POOTYPATH.SENDMSG,
        data:data
      })
      .then(function (result) {
        _this.$s.sAlert({
          message: '发送成功',
          autoClose:true
        })
      })
      .catch(function (result) {
        _this.$s.sAlert({
          message: result.message,
          autoClose:true
        })
      });
    },

    getbanner(fn){
      let _this = this;
      _this.axios({
        method: 'post',
        url:API.ROOTY + API.POOTYPATH.BANNER,
        data:{showTerminalType:1}
      })
      .then(function (result) {
        fn.call(_this,result)
      })
      .catch(function (result) {
        _this.$s.sAlert({
          message: result.message,
          autoClose:true
        })
      });
    },

}

export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$$", { value: base });
  }
};
