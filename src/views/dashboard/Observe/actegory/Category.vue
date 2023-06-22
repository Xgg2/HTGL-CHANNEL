<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="box">
          <span>销售额类别占比</span>
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group></div>
      </div>
<!--      饼图-->
      <div class="paiCarts" ref="carts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Category",
  data(){
    return {
      radio:''
    }
  },
  mounted() {
    let mycarts=echarts.init(this.$refs.carts);
    mycarts.setOption({
      title:{
        text:'',
        subtext:'',
        top:'center',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          top:28,
          //显示文字 文字位置
          label: {
            show: true,
            position: 'outside'
          },
          //关闭放大效果
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: 40,
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            //显示索引线
            show: true
          },
          data: [
            { value: 1048, name: '视频广告' },
            { value: 735, name: '联盟广告' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '直接访问' },
            { value: 300, name: '搜索引擎' }
          ]
        }
      ]
    });
    //绑定事件
    mycarts.on('mouseover', function (params) {
      console.log(params);//data:{value: 1048, name: '视频广告'} 注入的参数的data中可以获取到移入的相关视图的数据
      mycarts.setOption({
        //修改title，其他的保持不变
        title:{
          text:params.data.name,
          subtext: params.data.value
        }
      })
    });
  }
}
</script>

<style scoped>
.box{
  display: flex;
  justify-content: space-between;
}
.paiCarts{
  width: 100%;
  height: 300px;
}
</style>
