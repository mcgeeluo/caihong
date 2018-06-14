const APPAPI = {
  ROOTS: '/sso',
  ROOTSPATH: {
    // 登录验证码
    CAPTCHA: '/getImgCode',
    // 登录
    LOGIN: '/login',
    // 登录
    ULOGIN: '/u/login',
    // 退出登录
    LOGOUT: '/logout'
  },
  ROOTY: '/yx',
  POOTYPATH: {
    // 采种列表
    LOTTERY_LIST: '/u/api/game-lottery/openLotterys',
    // 用户信息
    USER_INFO: '/game-lottery/init-page',
    // 公告
    NOTICE_LIST: '/u/api/notice/list',
    // 注册验证码
    CAPTCHA: '/getImgCode',
    // 注册
    REGISTER: '/rg',
    // 银行卡''
    LIST_CARD: '/u/api/account/list-card',
    // 获取用户全部信息
    USER_INFOALL: '/u/api/account/list-full-info',
    // 获取用户安全等级
    USER_STATUS: '/u/api/account/get-bind-status',
    // 获取银行卡列表
    LOADBANKS: '/u/api/account/prepare-bind',
    // 个人资料
    USER_DATA:'/u/api/account/apply-bind',
    // 添加银行卡
    ADD_BANK: '/u/api/account/bind-card',
    // 修改登录密码
    RESET_LOGINPASSWORD:'/u/api/account/modify-password',
    // 修改资金密码
    RESET_FUNDSPASSWORD:'/u/api/account/modify-withdraw-password',
    // 获取登录记录
    USER_LOGINDETAIL: '/u/api/account/list-userlogin-info',
    // 注册init接口
    USER_REGISTER:'/rg/init',
    // 站内信息
    USER_NOTICE: '/u/api/account/list-system-message',
    // 站内消息已读
    USER_NOTICEREADY: '/u/api/account/clear-system-message',
    USERLOOP: '/u/api/loop',
    SETCARD: '/u/api/account/set-default-card',
    BINDINFO:'/u/api/account/get-bind-info',
    // FAVOURITEGAME:'/u/api/game-lottery/get-favourite-game'
    // 获取余额
    THIRDAMOUNT: '/thirdGameApi/common/showThirdAmount',
    // 获取游戏链接
    GAMEURL: '/thirdGameApi/common/getLoginUrl',
    LOGIN_URL: '/thirdGameApi/common/getLoginUrl', // 第三方游戏地址
    THIRD_PARTY_BALANCE: '/api/i/u/bank/getPcodeCbBaseList', // 第三方钱包
    // 拉去消息接口
    LISTMSG:'/u/api/account/list-message',
    // 消息已读接口
    READMSG:'/u/api/account/read-message',
    // 删除消息接口
    DELETEMSG:'/u/api/account/delete-message',
    // 获取下级会员名称
    NUMBERLIST:'/u/api/agent/list-direct-account',
    // 发送消息
    SENDMSG:'/u/api/account/send-message',
    // 获取banner接口
    BANNER:'/api/bannerInfo/getList',
  }
};
export default {
  APPAPI
};
