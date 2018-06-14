<template>
    <div>
        <div class="helpNav">
            <ul>
                <li v-for='(value,index) in nav' :key="index" :class='{active:isSelected == index}' @click="changeMenu(value,index)">{{value}} </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            isSelected:0,
            nav:['首页','彩票游戏','真人娱乐','电子游艺','logo','体育博弈','热门优惠','在线客服','APP下载']
        };
    },
    components: {},

    methods: {
        changeMenu(value,index){
            this.isSelected = index;
        }
    },
    mounted(){
        
    }
}

</script>
<style lang="less" scoped>
.helpNav{
    height: 30px;
    position: absolute;
    left:26%;
    >ul>li{
        width: 92px;
        height: 52px;
        text-align: center;
        line-height: 52px;
        float: left;
        list-style: none;
        margin-right: 20px;
        margin-top: 20px;
        cursor: pointer;
    }
    .active{
        background-color: #FFDDB1;
    }
}

</style>
