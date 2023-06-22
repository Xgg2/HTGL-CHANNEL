<template>
  <div class="line-carts" ref="progressCarts">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "ProgressCarts",
  data(){
    return{
      progress:78,
    }
  },
  mounted() {
    let ProgressCarts=echarts.init(this.$refs.progressCarts)
    ProgressCarts.setOption({
      xAxis:{
        show:false,//隐藏x轴
        min:0,
        max:100,
      },
      yAxis:{
        show: false,
        //均分
        type:'category',

      },
      //类型
      series:[
        {
          type:'bar',
          data:[78],
          barWidth:70,//柱状图宽度
          color:'cornflowerblue',
          //背景颜色设置
          showBackground:true,//会显示一个灰色的背景
          backgroundStyle:{
            color:'#eee'
          },
          //文本
          // label:{
          //   show:true,
          //   formatter:`${this.progress}%`,
          //   position:'center',
          //   color: 'red',
          //   fontSize:79,//要设置的大一点
          // }
        }
      ],
      //布局
      grid:{
        left:0,
        right:0,
        top:-100,
        bottom:0
      },
      tooltip:{}
    })
  }
}
</script>

<style scoped>
div{
 position: relative;
  top: 20px;
}
</style>
