<template>
  <div class="line-carts" ref="lineCarts"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "LineCarts",
  mounted() {
    let lineCarts=echarts.init(this.$refs.lineCarts)
    lineCarts.setOption({
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
          type:'line',
          data:[90,110,80,170,50,201,21,30,50,101],
          color:'skyblue',
          //设置拐点样式
          itemStyle:{
            opacity:0
          },
          //填充颜色
          areaStyle:{
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'skyblue' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
            }
          },
          smooth:true
        },
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

</style>
