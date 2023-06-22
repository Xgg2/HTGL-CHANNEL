<template>
  <div>
    <div class="title-box">{{title}}  <i class="el-icon-info"></i></div>
    <div class="content">{{num}} <span>{{n}}</span><slot name="svg"></slot></div>
<!--    统一接收父组件不同可视化数据-->
    <div class="lineCarts" ref="lineBox"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "LineCarts",
  props:['title','num','n','lineCartsData','color'],
  mounted() {
    let linecharts=echarts.init(this.$refs.lineBox);
    linecharts.setOption({
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
          //这里数据写父组件传递过来的数据
          data:this.lineCartsData,
          color:this.color,
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
                offset: 0, color: this.color // 0% 处的颜色
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
.title-box{
  font-size: 12px;
  color: #666666;
  /*background-color: palevioletred;*/
}
.title-box>i{
  margin-left: 20px;
  color: #666666;
  position: relative;
  top: 1px;
}
.content{
  margin-top: 15px;
  font-size: 18px;
  margin-bottom: 10px;
}
.content>span{
  color: #666666;
  font-size: 12px;
  margin-left: 26px;

}
.content>svg{
  position: relative;
  top: 6px;
}
.lineCarts{
  width: 100%;
  height: 80px;
}
</style>
