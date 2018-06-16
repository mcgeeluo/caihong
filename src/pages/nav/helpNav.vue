<template>
    <div>
        <div class="helpNav">
            <div class="navLeft">
                <ul>
                    <li v-for='(value,index) in nav' :key="index" :class='{active:isSelected == index}' @click="changeMenu(value,index)">{{value}} </li>
                </ul>
            </div>
            <div class="navLogo">
                <span class="logoImg">
                    <img src="../../assets/img/logo.png" alt="">
                </span>
            </div>
            <div class="navRight">
                <ul>
                    <li v-for='(value,index) in nav2' :key="index" :class='{active:isSelected2 == index}' @click="changeMenu2(value,index)">{{value}} </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:['type'],
    data () {
        return {
            isSelected:-1,
            isSelected2:-1,
            nav:['首页','彩票游戏','真人娱乐','电子游艺'],
            nav2:['体育博弈','热门优惠','在线客服','APP下载']
        };
    },
    components: {},

    methods: {
        changeMenu(value,index){
            this.isSelected2 = -1;
            this.isSelected = index;
        },
        changeMenu2(value,index){
            this.isSelected = -1;
            this.isSelected2 = index;
        }
    },
    mounted(){
        
    }
}

</script>
<style lang="less" scoped>
.helpNav{
    width: 100%;
    height: 30px;
    position: absolute;
    left:20%;
    .navLeft,.navRight,.navLogo{
        float: left;
        .active{
            background: url('../../assets/img/scloud_bg.png') no-repeat 50% -3%;
        }
    }
    .navLeft,.navRight{
        >ul>li{
            float: left;
            width: 92px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            float: left;
            list-style: none;
            font-size: 14px;
            margin-right: 20px;
            margin-top: 20px;
            cursor: pointer;
            background: url('../../assets/img/scloud_bg.png') no-repeat 50% 100%; 
        }
    }
    .navLogo{
        .logoImg{
            display: inline-block;
            width: 190px;
            height: 96px;
            margin-right: 20px;
            background: url('../../assets/img/cloud_bg.png') no-repeat 100% 100%;
            >img{
                width: 60%;
                margin-top: 30px;
                margin-left: 20px;
            }
        }
    }
    
}

</style>
