<template>
    <div class="loginWrap">
        <div class="login">
            <p>
                <img src="../../assets/img/logo.png" alt="">
                <span>MEMBER LOGIN</span>
            </p>
            <div class="loginMain">
                <div class="userNameBox">
                    <i class=""></i>
                    <input type="text" placeholder="用户名" class="userName" v-model="name" v-on:keyup.enter='login'>
                </div>
                <div class="userNameBox">
                    <i></i>
                    <input type="password" placeholder="请输入密码" class="pwd" v-model="pass" v-on:keyup.enter='login'>
                </div>
                <div class="wraningBox">
                    <p class="wraning" v-text="login_pass_error"></p>
                </div>
                <div class="userNameBox" v-show="isCaptcha">
                    <i></i>
                    <input type="text" class="yzm" placeholder="验证码" v-model="yanzCode" v-on:keyup.enter='login'>
                    <img class="code" :src='captchasrc'/>
                </div>
                <div class="wraningBox" v-show="isCaptcha">
                    <p class="wraning" v-text="login_pass_error"></p>
                </div>
                <div class="userNameBox btn" @click="login" > 
                    <span>立即登录</span>
                </div>
                <div class="try" @click="tryPlay">
                    <span>试玩</span>
                </div>
            </div>
            <div class="tab">
                <span v-for="(btnItem,index) in tabsBtn" :key="index" @click="handel(index)">{{btnItem}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/font/iconfont'
export default {
    data () {
        return {
            name:'',
            pass:'',
            login_pass_error:'',
            captcha:'',
            isCaptcha:'',
            captchasrc:'',
            yanzCode:'',
            tabsBtn:['线路检测','登录器下载','手机端下载','在线客服']
        };
    },
    components: {},
    
    methods: { 
        //点击登录  
        login(){
            this.$$.login.call(this);
        },

        //试玩
        tryPlay(){
            this.$router.push('/index');
        },

        //底部按钮
        handel(index){
            this.$router.push('/index');
        }
    }
}

</script>

<style lang="less" scoped>
@boxWidth:310px;
@boxHeight:40px;
.loginWrap{
    width:100%;
    height:900px;
    position: relative;
    margin: auto;
    text-align: center;
    background: url('../../assets/img/login_bg-min.png') no-repeat;
    .login{
        position: absolute;
        width: 660px;
        height: 280px;
        top:200px;
        left:610px;
        >p{
            width: 100%;
            margin-top: 10px;
            border-bottom: 1px solid #ECECEC;
            >img{
                width: 246px;
                height:96px;
            }
            >span{
                display: inline-block;
                width: 100%;
                height: 30px;
                margin-top: 10px;
                font-size: 22px;
                color: #81DDCD  
            }
        }
        .loginMain{
            width: 100%;
            height: 100%;
            margin: auto;
            
            .userNameBox{
                width:@boxWidth;
                height: @boxHeight;
                background-color: #ECECEC;
                border-radius: 5px;
                margin: auto;
                line-height: 36px;
                margin-top: 10px;
                >input{
                    width:80%;
                    height:80%;
                    border-radius: 5px;
                    outline: none;
                    border: none;
                    background-color: #ECECEC;
                    color: #B8B8B8;
                    padding-left:10px;
                    &:active{
                        // border: 1px solid red;
                    }
                }
                >.yzm{
                    width: 80px;
                    height:35px;
                }
                >.code{
                    display: inline-block;
                    width: 86px;
                    height:36px;
                    line-height: 34px;
                    text-align: center;
                    background-color: white;
                    margin-top: 2px;
                    margin-right: 2px;
                    border-radius: 5px;
                    float: right;
                    cursor: pointer;
                }
                >p{
                    width: 100%;
                    height: 100%;
                }
            }
            .btn{
                background-color: #0CCB9C;
                cursor: pointer;
                >span{
                    display: inline-block;
                    width: 86px;
                    height:36px;
                    line-height: 34px;
                    text-align: center;
                    font-size: 16px;
                    color: white;
                    cursor: pointer;
                }
            }
            .wraningBox,.try{
                width:@boxWidth;
                // height: @boxHeight;
                margin:auto;
            }
            .wraning{
                width: 100%;
                height: 100%;
                margin-top: 5px;
                text-align: left;
            }
            .try{
                background: url('../../assets/img/regtag_bg.png') no-repeat;
                margin-top: 30px;
                text-align: center;
                line-height: 1px;
                >span{
                    display: inline-block;
                    margin-left: 30px;
                    color: #B8B8B8;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
        .tab{
            width: 100%;
            text-align: left;
            >span{
                display: inline-block;
                margin-left: 20px;
                font-size: 16px;
                color: #81DDCD;
                cursor: pointer;
            }
            :nth-child(3){
                color:#000000;
            }
            :last-child{
                float: right;
            }
        }
    }
}
</style>
