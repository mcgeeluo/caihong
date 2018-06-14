<template>
  <div class="page">
    <span>共计<b class="color">{{pageMeg.sizeAll}}</b>页</span>
    <span >当前第<b class="color">{{(pageMeg.page+1)}}</b>页</span>
    <span class="sp" @click="pagenext(0)">上一页</span>
    <span class="sp" @click="pagenext(1)">下一页</span>
    <input type="text" name="" value="" v-model = "pagenextsize" placeholder="跳转至">
    <span class="sp" @click="pagenext(2)">跳转</span>
  </div>
</template>
<script type="text/javascript">
	export default {
	  name: 'page',
    props: ['pageMeg'],
	  data () {
	    return {
        pagenextsize:0,
	    };
	  },
    created () {},
	  methods: {
      nextInit(str){
        if((str + 1) > this.pageMeg.sizeAll) return this.pageMeg.page = this.pageMeg.sizeAll-1,{err:0,data:'没有更多了'};
        if(str < 0) return this.pageMeg.page = 0, {err: 0, data:'已是第一页'};
        return {err:1,data: true};
      },
      pagenext(page) {
        let datas = null;
        switch (page) {
          case 0:
            this.pageMeg.page--;
            break;
          case 1:
            this.pageMeg.page++;
            break;
          case 2:
            this.pageMeg.page = this.pagenextsize - 1;
            break;
          default:
        }
        datas = this.nextInit(this.pageMeg.page);
        if(datas.err === 1) {
          return this.$emit('nextpage',this.pageMeg.page)
        }else{
          this.$s.sAlert({
            message: datas.data,
            autoClose: true,
            time: 2000
          });
        }
      }
    },
	  components: {},
    mounted () {
    },
	  beforeCreate() {

	  }
	}
</script>
<style lang="less">
  @import "../css/page/base.less";
  @import "../css/page/color.less";
  @import "../css/page/page.less";
</style>
