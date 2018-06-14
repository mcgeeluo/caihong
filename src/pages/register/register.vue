<template>
    <div class="loginWrap">
        <div class="login">
            <div class="loginMain">
                <div class="logo">
                    <img src="../../assets/img/logo.png" alt="">
                    <span>会员登录</span>
                </div>
                <div class="main">
                    <div class="user">
                        <i></i>
                        <span>用户名</span>
                        <input type="text" placeholder="请输入用户名" v-model="req.name" @blur="reqUserName" v-on:keyup.enter='register'>
                    </div>
                    <div class="waringText">
                        <p v-text="error_info.name"></p>
                        <p class="tishi">提示：登录账号必须字母和数字组合，只能字母开头，长度5到10位，不支持特殊字符，示例：test1234</p>
                    </div>
                    <div class="pass">
                        <i></i>
                        <span>登录密码</span>
                        <input type="password" placeholder="请输入您要设定的登录密码" v-model="req.pass" @blur="reqPass" v-on:keyup.enter='register'>
                    </div>
                    <div class="waringText">
                        <p v-text="error_info.pass"></p>
                        <p class="tishi">提示：密码必须字母和数字组合，长度5到10位，不支持特殊字符,示例：uiO21dswq</p>
                    </div>
                    <div class="passA">
                        <i></i>
                        <span>确认密码</span>
                        <input type="password" placeholder="重复密码" v-model="req.passTo" @blur="reqPassTo" v-on:keyup.enter='register'>
                    </div>
                    <div class="waringText">
                        <p class="pwdAgain" v-text="error_info.passAgin"></p>
                    </div>
                    <div class="yzm">
                        <i></i>
                        <span>验证码</span>
                        <input type="text" placeholder="验证码" v-model="req.safety" v-on:keyup.enter='register'>
                        <span>
                            <img :src='req.safetySrc' alt="">
                        </span>
                    </div>
                    <div class="agree">
                        <input type="checkbox" id="agree" :checked='req.isreadyS'>
                        <label for="agree">已阅读并同意签署</label>
                        <span><a href="/help#2" target="_blank">《服务条款》</a></span>
                        <p v-text="req.login_pass_error"></p>
                    </div>
                    <div class="btnRegister" @click="register">
                        <span>立即注册</span>
                    </div>
                    <div class="bLogin">
                        <span @click="goLogin">
                            已有账号？点击这里<span>登录</span>
                        </span>
                        <i></i>
                        <span class="server" >在线客服</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {resetPwdTips} from '../../common/config/tips'
export default {
    data () {
        this['reg'] = this.$.newReg()
        return {
            req:{
                  name: '',
                  pass: '',
                  passTo: '',
                  safety: '',
                  login_pass_error: '',
                  safetySrc:'',
                  isreadyS: true,
                  parentId:'',
                  links:'',
                },
            error_info: {
                name: '',
                pass: '',
                passAgin: '',
            },
            next:[]
        };
    },
    components: {},

    methods: {
        //验证用户名
        reqUserName(){
            this.req.login_pass_error = '';
            !this['reg'].username(this.req.name)?this.error_info.name = resetPwdTips.username.no:
                this.next[0]=1;
                console.log(this.error_info.name);
        },

        //验证密码
        reqPass(){
            !this['reg'].pwd(this.req.pass)?this.error_info.pass = resetPwdTips.pwd.no:this.next[1]=2;
        },

        //验证两次密码是否一致
        reqPassTo(){
            this.req.pass !== this.req.passTo?
            this.error_info.passAgin = '两次输入的密码不一致':
            this.next[2]=3;
        },

        //获取验证码
        RefreshSrc(){
            this.req.safetySrc = this.$$.refreshSrc(true);
        },

        //注册
        register(){
            // this.req.login_pass_error = '请求处理中...'
            if(!this.req.isreadyS){
                return this.req.login_pass_error = '请勾选用户协议' ;
            }else{
                this.$$.register.call(this);
            }
        },

        //登录
        goLogin(){
            this.$router.push('/login');
        },

    },
    mounted(){
        this.RefreshSrc();
    }
}

</script>
<style lang="less" scoped>
.loginWrap{
    width: 100%;
    height:1000px;
    .login{
        width: 100%;
        height: 100%;
        background: url('../../assets/img/reg_bg-min.png') no-repeat;
        position: relative;
        margin: auto;
        text-align: center;
        .loginMain{
            width: 500px;
            height:900px;
            position: absolute;
            top:80px;
            left:700px;
            .logo{
                width: 100%;
                border-bottom: 1px solid #ECECEC;
                padding-bottom: 10px;
                >img{
                    width: 50%;
                    height: 50%;
                }
                >span{
                    color: #BABABA;
                    font-size: 20px;
                    position: absolute;
                    top: 60px;
                    margin-left: 10px;
                }
            }
            .main{
                width: 100%;
                // height: 100%;
                .user,.pass,.passA,.yzm,.waringText{
                    width:540px;
                    height: 42px;
                    position: relative;
                    >span{
                        width: 120px;
                        display: inline-block;
                        text-align: left;
                    }
                    >input{
                        width: 305px;
                        height: 42px;
                        border: none;
                        outline: none;
                        background: #ECECEC;
                        border-radius: 5px;
                        margin-top: 20px;
                        text-align: left;
                        padding-left: 10px;
                    }
                }
                .yzm{
                    margin-left: 10px;
                    >input{
                      width: 200px; 
                    }
                    >span>img{
                        vertical-align: middle;
                    }
                }
            }
            .waringText{
                 
                :first-child{
                    width: 120px;
                    height: 30px;
                    color: red;
                    font-size: 14px;
                    text-align: left;
                    position: absolute;
                    left: 36px;
                    top: 20px;
                }
                .tishi{
                        text-align: left;
                        color: #999999;
                        top: 30px;
                        left: 180px;
                        position: absolute;
                        font-size: 12px;
                }

            }
            .agree{
                width: 100%;
                height: 100%;
                position: relative;
                top: 50px;
                >label,span{
                    font-size: 12px;
                    cursor: pointer;
                }
                >input{
                    vertical-align: middle;
                    margin-top: -2px;
                    margin-bottom: 1px;
                }
                >span,p{
                    color: blue;
                }
            }
            .btnRegister{
                width: 390px;
                height: 40px;
                background-color: #0CCC9D;
                border-radius: 5px;
                text-align: center;
                line-height: 40px;
                position: absolute;
                top: 56%;
                left: 20%;
                cursor: pointer;
                >span{
                    color: white;
                }
            }
            .bLogin{
                position: absolute;
                top:66%;
                right: 0;
                >span{
                    font-size: 14px;
                    cursor: pointer;
                    >span{
                        color:#0CCC9D;
                        margin-right: 5px;
                    }
                }
                .server{
                    color: #0CCC9D; 
                }
            }
        }
    }
}
</style>
