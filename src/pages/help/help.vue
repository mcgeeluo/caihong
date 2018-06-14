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
                            <div class="helpItem">
                                <span>{{value.title}}</span>
                                <span class="navCeter">2</span>
                            </div>  
                        </li>
                    </ul>
                    <div class="section">
                        <div>
                            <ul>
                                <li v-for="(v,i) in helpTips" :key="i">{{v.title}}</li>
                            </ul>
                        </div>
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
        height: 100%;
        margin:auto;
        .helpMain{
            height: 100%;
            left: 26%;
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
                position: absolute;
                top: 38%;
                left: 20%;
                .helpItem{
                    margin-top: 30px;
                    .navCeter{
                        float: right;
                        margin-left: 50px;
                    }
                }
                
                .section{
                    left: 150%;
                    top: -294px;
                    position: relative;
                }
                
            }
        }
    }
    
}
</style>
