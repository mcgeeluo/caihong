<template>
    <div class="help">
        <div class="helpBox">
            <helpNav></helpNav>
            <div class="helpMain">
                <div class="mainTitle">
                    <h1 class="titleVa">{{title}}</h1>
                    <h5 class="titleEng">{{eng}}</h5>
                </div>
                <div class="helpTabs">
                    <ul>
                        <li v-for="(value,index) in tabs" :key="index" @click="handel(value,index)">
                            <p class="helpItem">
                                <span>{{value.title}}</span>
                                <span class="navCeter">2</span>
                            </p>  
                        </li>
                    </ul>
                    <div class="section">
                        <ul>
                            <li v-for="(v,i) in caip" :key="i">
                                <p class="anser">
                                    <span class="que">{{i+1}}</span>
                                    <span class="queTitle">{{v.title}}</span>
                                </p>
                                <p v-show="isShow">{{v.message}}</p>
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
                    // position: absolute;
                    margin-top: 30px;
                    // width: 56%;
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
                    top:-100%;
                    // background-color:#ffe6e6;
                    background:#ffe6e6; 
                    filter:Alpha(opacity=60);
                    position: relative;
                    border-radius: 18px;
                    >ul,>li{
                        // position: absolute;
                        top:-90%;
                        width: 90%;
                        margin-left: 30px;
                        height: 30px;
                        border:1px;
                        .anser{
                            // margin-top: 30px;
                            line-height: 40px;
                            font-size: 14px;
                            border-radius: 3px;
                            margin-bottom: 30px;
                            width: 100%;
                            height: 40px;
                            border: 1px solid #000;
                            background: #fff2f2;
                            .que{
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                margin-left: 20px;
                                text-align: center;
                                color:white;
                                background: #ccffcc;
                            }
                        }
                    }
                }
                
            }
        }
    }
    
}
</style>
