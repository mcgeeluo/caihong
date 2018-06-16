<template>
    <div class="navBox">
        <div class="navMain">
            <ul>
                <li v-for="(value,index) in navArr" :key="index" :class="{'active':active==index}" @click='chengeMenu(index)'>
                    {{value}}
                    <img src="../../assets/img/logo.png" v-if="index == 4" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active:0,
            navArr:['首页','彩票游戏','真人娱乐','电子游艺','','体育博弈','热门优惠','在线客服','APP下载']
        };
    },
    components: {},


    methods: {
        chengeMenu(index){
            this.active = index;
        }
    },

    mounted () {
        
    }
}

</script>

<style lang="less" scoped>
.navBox{
    width: 100%;
    height:100%;
    
}
.navMain{
    width: 100%;
    height: 100%;
    position: absolute;
    margin-left: 10%;
    margin-top: 2%;
    text-align: center;
    >ul>li{
        width: 150px;
        height: 50px;
        float: left;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        cursor: pointer;
        background: url('../../assets/img/scloud_bg.png') no-repeat 50% 96%;
        >img{
            width: 56%;
            height: 50%;
            line-height: 94px;
            position: relative;
            top: 32%;
            left: -6%;
        }
        &:nth-child(5){
            width: 10%;
            height: 80px;
            text-align: center;
            background: url('../../assets/img/cloud_bg.png') no-repeat 50% 50%;
        }
        
    }
    .active{
        background: url('../../assets/img/scloud_bg.png') no-repeat 50% 0%;
    }
}
</style>
