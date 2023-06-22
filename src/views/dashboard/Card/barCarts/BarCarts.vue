<template>
  <div class="line-carts" ref="barCarts">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "BarCarts",
  mounted() {
    let BarCarts=echarts.init(this.$refs.barCarts)
    BarCarts.setOption({
      xAxis:{
        show:false,//隐藏x轴
        //均分
        type:'category'
      },
      yAxis:{
        show: false
      },
      //类型
      series:[
        {
          type:'bar',
          data:[10,90,20,180,70,140,210,420,500,420,210,400,320,800,620,700],
          color:'lightseagreen'
        }
      ],
      //布局
      grid:{
        left:0,
        right:0,
        top:0,
        bottom:0
      },
      tooltip:{}
    })
  }
}
</script>

<style scoped>
div{
  /*color: lightseagreen;*/
}
</style>
