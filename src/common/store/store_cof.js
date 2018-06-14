let userInfo = null;
export default {
  state:{
    // 登陆
    login: localStorage.getItem("_login") == '1'?true:false,
    // 全局配置
    config: {},
    // 登陆数据
    userLogin: JSON.parse(localStorage.getItem("_userLogin")),
    // user info
    user:{},
    isDemo: localStorage.getItem("_isDemo") == '1'?true:false,
    // 是否手机端
    mobile: false,
    // 余额
    balance: 0,
    // 全局定时器秒数
    timer: 0,
    // 彩种
    lottery: [],
    // 公告
    notice: [],
    // 导航活动
    navHover:'/index',
    // 登陆日志
    loginInfo:[],
    // 安全级别
    checkgrade:{
      title:'',
      num:0
    },
    // 已绑定银行卡
    cardList:[1],
    // 绑定信息
    bindInfo:[],
    // 绑卡信息
    bindList:[],
    // userISBindlist
    isBindlist:{},
    // 首页弹窗公告
    isIndexRouter: true,
    // 上下级消息
    systemMsg:[],
    // 背景切换
    className:'bg1',
    // 消息中心 消息列表
    listMsg:[],
    // 会员列表
    numberList:[],
  },
  mutations: {
    setStore(state, res){
      state[res.key] = res.data;
    },
    setlogin(state, data){
      state.login = data;
      localStorage.setItem("_login", data);
      state.userLogin = JSON.parse(localStorage.getItem("_userLogin"));
    },

  },
  actions:{}
}
