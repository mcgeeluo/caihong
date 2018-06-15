<template>
    <div class="help">
        <div class="helpBox">
            <helpNav></helpNav>
            <div class="helpMain">
                <div class="mainTitle" v-show="this.title == '' ">
                    <h1 class="titleVa" >彩票常见问题</h1>
                    <h5 class="titleEng">QUESTION</h5>
                </div>
                <div class="mainTitle">
                    <h1 class="titleVa" >{{title}}</h1>
                    <h5 class="titleEng">{{eng}}</h5>
                </div>
                <div class="helpTabs">
                    <ul>
                        <li v-for="(value,index) in tabs" :key="index" @click="handel(value,index)">
                            <p class="helpItem">
                                <span>{{value.title}}</span>
                                <span class="navCeter"><i></i></span>
                            </p>  
                        </li>
                    </ul>
                    <div class="section">
                        <ul>
                            <li v-for="(v,i) in caip" :key="i" @click="changShow(i)">
                                <p class="anser">
                                    <span class="que">{{i+1}}</span>
                                    <span class="queTitle">{{v.title}}</span>
                                    <span class="icons"></span>
                                </p>
                                <p v-show="isShow" class="showMsg">{{v.message}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helpNav from '../nav/helpNav'
import {helpTips} from '../../common/config/tips'
import {aboutMe,Terms,caip} from '../../common/config/tips2'
export default {
    data () {
        return {
            title:'',
            eng:'',
            helpTips:'',
            terms:'',
            caip:'',
            aboutMe:'',
            isShow:false,
            tabs:[
                {
                    title:'彩票常见问题',
                    eng:'QUESTION'
                },
                {
                    title:'关于我们',
                    eng:'ABOUT'
                },
                {
                    title:'个人中心常见问题',
                    eng:'QUESTIONS'
                },
                {
                    title:'彩种介绍',
                    eng:'GAMES'
                },
                {
                    title:'规则与条款',
                    eng:'RULES'
                },
                {
                    title:'博彩责任',
                    eng:'RESPONSIBILITY'
                },
                {
                    title:'免责声明',
                    eng:'STATEMENTS'
                }
            ]
        };
    },
    components: {
        helpNav
    },

    methods: {
        handel(value,index){
            this.title = value.title;
            this.eng = value.eng;
        },

        changShow(index){
            this.isShow  = !this.isShow;
            
        }
    },
    mounted(){
        this.helpTips = helpTips;
        this.terms = Terms;
        this.caip = caip;
        this.aboutMe = aboutMe;
    }
}

</script>

<style lang="less" scoped>
.help{
    .helpBox{
        width: 100%;
        height:900px;
        margin:auto;
        background: url('../../assets/img/about_bg.jpg') no-repeat;
        background-size: 100%  100%;
        .helpMain{
            height: 100%;
            left: 20%;
            .mainTitle{
                width: 750px;
                height: 50px;
                top: 100px;
                margin: auto;
                position: relative;
                .titleVa{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    font-size: 300%;
                }
                .titleEng{
                    text-align: center;
                    margin-top: 10px;
                    font-size: 16px;
                }
            }
            .helpTabs{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 56%;
                left: 6%;
                >ul,>li{
                    width: 15%;
                }
                .helpItem{
                    position: relative;
                    top: -96px;
                    margin-top: 30px;
                    width: 300px;
                    >span{
                       
                    }
                    .navCeter{
                        float: right;
                        margin-left: 50px;
                    }
                }
                .section{
                    width: 70%;
                    height: 100%;
                    left: 20%;
                    top:-15%;
                    clear: both;
                    background:#F1FBFD; 
                    position: absolute;
                    border-radius: 18px;
                    >ul,>li{
                        // position: absolute;
                        top:-90%;
                        width: 90%;
                        margin-left: 30px;
                        height: 30px;
                        border:1px;
                        .anser,.showMsg{
                            // margin-top: 30px;
                            line-height: 40px;
                            font-size: 14px;
                            border-radius: 3px;
                            margin: 30px 0 0 36px;
                            width: 100%;
                            height: 40px;
                            border: 1px solid #DDDDDD;
                            background: #F5F5F5;
                            .icons{
                                display: inline-block;
                                border-left: 10px solid transparent;
                                border-right: 10px solid transparent;
                                border-top: 10px solid #000;
                                float: right;
                                margin-right: 20px;
                                margin-top: 16px;
                            }
                            .que{
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                margin-left: 20px;
                                text-align: center;
                                color:white;
                                background: #85C4B7;
                            }
                        }
                        .showMsg{
                            margin: 0 0 3% 3%; 
                            padding: 10px 0 10px 0;
                        }
                    }
                }
                
            }
        }
    }
    
}
</style>
