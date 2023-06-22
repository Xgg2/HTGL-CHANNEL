<template>
  <div>
    <el-card style="margin-top: 16px;margin-bottom: 16px">
      <div slot="header" class="clearfix">
        <!--      使用tabs标签页控制切换-->
        <el-tabs v-model="activeName" style="width: 100%">
          <!--v-model的activeName中收集的数据【切换到哪个tab-pane组件，对应name中的名字是什么，就收集什么】-->
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setmounted">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            size="mini"
            value-format="yyyy-MM-dd"
          >
            <!-- value-format="yyyy-MM-dd"收集到date中的日期时间格式-->
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="17">
            <div style="width: 100%;height: 400px" ref="boxBar"></div>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="6">
            <div  class="bar-right">
              <div>门店{{isSaleOrVisit}}额排名</div>
              <ul>
                <li><span class="li-span"><svg t="1687073052220" class="icon span-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6340" width="16" height="16"><path d="M392 440.3l-148-73.2c-16.3-8.1-30.5 0.1-31.7 18.3l-10.6 164.8c-1.2 18.2 11.1 39.5 27.5 47.6L377.1 671c16.3 8.1 30.6-0.1 31.7-18.3l10.6-164.8c1.3-18.2-11.1-39.5-27.4-47.6z m339.3-195.9l-148-73.2c-16.3-8.1-30.6 0.1-31.7 18.3L541 354.2c-1.2 18.2 11.1 39.5 27.5 47.6l148 73.2c16.3 8.1 30.6-0.1 31.7-18.3l10.6-164.8c1.1-18.1-11.1-39.4-27.5-47.5z" fill="#FEAE30" p-id="6341"></path><path d="M559.9 725.4c5.7 9.9 16.6 11.4 27 5.4l81.9-47.4c8-4.6 10.8-14.6 6.3-22.6-4.6-8-14.8-10.7-22.8-6.2L599.7 685l13.6-33.2c14.8-36.2 20.5-56.1 5.9-81.4l-0.2-0.4c-16.3-28.2-47.6-34.6-78.9-16.5-22.9 13.2-32.3 29.6-36.3 50.6-0.8 4.2 0 9 2.1 12.5 4.9 8.4 15.5 11.2 23.8 6.4 5.2-3 7.7-7.6 8.4-11.2 3.1-13.9 7.5-21.8 17-27.4 11.9-6.8 24.2-4.8 31.6 7.9 7.2 12.5 4.8 25.2-5.2 51.4l-22.6 60c-2.9 7.9-2.7 15.3 1 21.7z" fill="#E5E5E5" p-id="6342"></path><path d="M900.9 507c10.5 24.5 6.1 52.3-9.8 72.9-36.9 44.8-118.5 108.5-221.2 169.1-100.4 59.1-193.4 98.9-250.1 110.2-26.4 4.3-53.7-5.9-70.2-27.8 0.3 0.4 0.4 1 0.8 1.4L110.2 522c0.1-0.3 0.6-0.2 0.2-1-6.8-11.7-2.6-26.8 9.3-33.6 4.5-2.7 9.6-3.2 14.5-2.8l222.5 45.9-16.3-294.3c-0.4-12.3 5.9-24.5 17.5-31.1 10.8-6.3 23.5-5.6 33.6-0.2l248.1 162.2 70.1-211.6c0.1 0 0.2 0.8 0.2 0.5 1.7-5.9 5.7-11.2 11.5-14.6 11.9-6.8 26.9-2.9 33.7 8.8 0.3 0.6 0.4 0.1 0.8 0.2l148 361.2c-1-1.6-2.2-2.7-3-4.6z" fill="#FED530" p-id="6343"></path><path d="M487.1 426.2c65.6-37.8 149.4-15.4 187.4 50.2 37.8 65.6 15.4 149.4-50.2 187.4-65.6 37.8-149.4 15.4-187.4-50.2s-15.4-149.4 50.2-187.4z" fill="#FEAE30" p-id="6344"></path><path d="M584.1 606.2c6.1 10.6 19.6 14.2 30.2 8.1 10.6-6.1 14.2-19.6 8.1-30.2l-62.3-102.7c-6.1-10.6-19.6-14.2-30.2-8.1l-0.5 0.3c-5.3 3-10.1 7.5-16.2 13.7L492.5 509c-6.5 6.8-7.8 16.2-3.2 24 5.2 9.1 17.4 12.1 26.4 6.8 2.1-1.2 4.4-3.2 6.2-5l11.6-11.4 50.6 82.8z" fill="#FED530" p-id="6345"></path></svg><span>1</span></span><span class="li-second-span">肯德基</span><span>366,220</span></li>
                <li><span class="li-span"><svg t="1687073136801" class="icon span-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6556" width="16" height="16"><path d="M392 440.3l-148-73.2c-16.3-8.1-30.5 0.1-31.7 18.3l-10.6 164.8c-1.2 18.2 11.1 39.5 27.5 47.6L377.1 671c16.3 8.1 30.6-0.1 31.7-18.3l10.6-164.8c1.3-18.2-11.1-39.5-27.4-47.6z m339.3-195.9l-148-73.2c-16.3-8.1-30.6 0.1-31.7 18.3L541 354.2c-1.2 18.2 11.1 39.5 27.5 47.6l148 73.2c16.3 8.1 30.6-0.1 31.7-18.3L758.7 292c1.2-18.2-11-39.5-27.4-47.6z" fill="#C6C6C6" p-id="6557"></path><path d="M559.9 725.4c5.7 9.9 16.6 11.4 27 5.4l81.9-47.4c8-4.6 10.8-14.6 6.3-22.6-4.6-8-14.8-10.7-22.8-6.2L599.7 685l13.6-33.2c14.8-36.2 20.5-56.1 5.9-81.4l-0.2-0.4c-16.3-28.2-47.6-34.6-78.9-16.5-22.9 13.2-32.3 29.6-36.3 50.6-0.8 4.2 0 9 2.1 12.5 4.9 8.4 15.5 11.2 23.8 6.4 5.2-3 7.7-7.6 8.4-11.2 3.1-13.9 7.5-21.8 17-27.4 11.9-6.8 24.2-4.8 31.6 7.9 7.2 12.5 4.8 25.2-5.2 51.4l-22.6 60c-2.9 7.9-2.7 15.3 1 21.7z" fill="#E8E8E8" p-id="6558"></path><path d="M900.9 507c10.5 24.5 6.1 52.3-9.8 72.9-36.9 44.8-118.5 108.5-221.2 169.1-100.4 59.1-193.4 98.9-250.1 110.2-26.4 4.3-53.7-5.9-70.2-27.8 0.3 0.4 0.4 1 0.8 1.4L110.2 522c0.1-0.3 0.6-0.2 0.2-1-6.8-11.7-2.6-26.8 9.3-33.6 4.5-2.7 9.6-3.2 14.5-2.8l222.5 45.9-16.3-294.3c-0.4-12.3 5.9-24.5 17.5-31.1 10.8-6.3 23.5-5.6 33.6-0.2l248.1 162.2 70.1-211.6c0.1 0 0.2 0.8 0.2 0.5 1.7-5.9 5.7-11.2 11.5-14.6 11.9-6.8 26.9-2.9 33.7 8.8 0.3 0.6 0.4 0.1 0.8 0.2l148 361.2c-1-1.6-2.2-2.7-3-4.6z" fill="#E8E8E8" p-id="6559"></path><path d="M487.1 426.2c65.6-37.8 149.4-15.4 187.4 50.2 37.8 65.6 15.4 149.4-50.2 187.4-65.6 37.8-149.4 15.4-187.4-50.2s-15.4-149.4 50.2-187.4z" fill="#C6C6C6" p-id="6560"></path><path d="M538.2 627.2c5.4 9.3 15.7 10.7 25.4 5.1l77.2-44.5c7.6-4.3 10.2-13.7 5.8-21.3-4.3-7.6-13.9-10.1-21.5-5.7l-49.6 28.6 12.9-31.2c13.9-34.1 19.4-52.9 5.6-76.7l-0.2-0.4c-15.4-26.6-44.9-32.6-74.3-15.6-21.5 12.4-30.5 27.9-34.3 47.7-0.8 3.9 0 8.4 1.9 11.9 4.5 7.9 14.5 10.6 22.5 6.1 4.9-2.8 7.2-7.1 8-10.6 3-13.1 7-20.6 16-25.7 11.1-6.5 22.8-4.5 29.7 7.5 6.8 11.8 4.4 23.7-4.9 48.3L537.2 607c-2.7 7.1-2.6 14 1 20.2z" fill="#E8E8E8" p-id="6561"></path></svg><span>2</span></span><span class="li-second-span">绝味</span><span>323,234</span></li>
                <li><span class="li-span"><svg t="1687073163016" class="icon span-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6734" width="16" height="16"><path d="M392 439.3l-148-73.2c-16.3-8.1-30.5 0.1-31.7 18.3l-10.6 164.8c-1.2 18.2 11.1 39.5 27.5 47.6L377.1 670c16.3 8.1 30.6-0.1 31.7-18.3l10.6-164.8c1.3-18.2-11.1-39.5-27.4-47.6z m339.3-195.9l-148-73.2c-16.3-8.1-30.6 0.1-31.7 18.3L541 353.2c-1.2 18.2 11.1 39.5 27.5 47.6l148 73.2c16.3 8.1 30.6-0.1 31.7-18.3L758.7 291c1.2-18.2-11-39.5-27.4-47.6z" fill="#AA733D" p-id="6735"></path><path d="M559.9 724.4c5.7 9.9 16.6 11.4 27 5.4l81.9-47.4c8-4.6 10.8-14.6 6.3-22.6-4.6-8-14.8-10.7-22.8-6.2L599.7 684l13.6-33.2c14.8-36.2 20.5-56.1 5.9-81.4l-0.2-0.4c-16.3-28.2-47.6-34.6-78.9-16.5-22.9 13.2-32.3 29.6-36.3 50.6-0.8 4.2 0 9 2.1 12.5 4.9 8.4 15.5 11.2 23.8 6.4 5.2-3 7.7-7.6 8.4-11.2 3.1-13.9 7.5-21.8 17-27.4 11.9-6.8 24.2-4.8 31.6 7.9 7.2 12.5 4.8 25.2-5.2 51.4l-22.6 60c-2.9 7.9-2.7 15.3 1 21.7z" fill="#E5E5E5" p-id="6736"></path><path d="M900.9 506c10.5 24.5 6.1 52.3-9.8 72.9-36.9 44.8-118.5 108.5-221.2 169.1-100.4 59.1-193.4 98.9-250.1 110.2-26.4 4.3-53.7-5.9-70.2-27.8 0.3 0.4 0.4 1 0.8 1.4L110.2 521c0.1-0.3 0.6-0.2 0.2-1-6.8-11.7-2.6-26.8 9.3-33.6 4.5-2.7 9.6-3.2 14.5-2.8l222.5 45.9-16.3-294.3c-0.4-12.3 5.9-24.5 17.5-31.1 10.8-6.3 23.5-5.6 33.6-0.2l248.1 162.2 70.1-211.6c0.1 0 0.2 0.8 0.2 0.5 1.7-5.9 5.7-11.2 11.5-14.6 11.9-6.8 26.9-2.9 33.7 8.8 0.3 0.6 0.4 0.1 0.8 0.2l148 361.2c-1-1.6-2.2-2.7-3-4.6z" fill="#CA9561" p-id="6737"></path><path d="M487.1 425.2c65.6-37.8 149.4-15.4 187.4 50.2 37.8 65.6 15.4 149.4-50.2 187.4-65.6 37.8-149.4 15.4-187.4-50.2s-15.4-149.4 50.2-187.4z" fill="#AA733D" p-id="6738"></path><path d="M600.1 619.3c30.1-17.4 37.7-46.7 23.1-72.2l-0.2-0.4c-14.5-25.1-37.9-24.3-58.1-16.9l11.8-40.5c2.4-8.3 3.6-14.4-0.8-21.7-4.6-8.1-13.9-9.4-22.6-4.4l-65.6 38.2c-6.9 4-9.4 13.1-5.4 20.1 4 6.9 13.1 9.4 20.1 5.4l41.4-23.9-10.8 41.4c-1.9 7.2-1.7 11.8 0.6 15.8 4 6.9 13.1 9.4 20.1 5.4l4.6-2.7c16.5-9.6 29.9-9.1 36.3 1.9l0.2 0.4c5.8 10.1 1.5 21-9.6 27.4-10.6 6.2-20.6 7.4-32.2 5.2-3.5-0.5-7.4-0.6-11.6 1.8-7.7 4.4-10.5 14.8-6.1 22.5 2.5 4.2 7.1 6.9 11.1 7.7 16.5 3 34.5 0.6 53.7-10.5z" fill="#CA9561" p-id="6739"></path></svg><span>3</span></span><span class="li-second-span">张成荣</span><span>299,668</span></li>
                <li><span>4</span><span class="li-second-span">海底捞</span><span>286,190</span></li>
                <li><span>5</span><span class="li-second-span">瑞星</span><span>268,231</span></li>
                <li><span>6</span><span class="li-second-span">蜜雪冰城</span><span>259,251</span></li>
                <li><span>7</span><span class="li-second-span">麦当劳</span><span>221,211</span></li>
                <li><span>8</span><span class="li-second-span">星巴克</span><span>210,000</span></li>
                <li><span>9</span><span class="li-second-span">汉堡王</span><span>190,990</span></li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import {reqmockSaleOrVisitCartsData} from "@/api/mocksale";
import {mapState,mapGetters} from 'vuex'
export default {
  name: "Sale",
  data(){
    return{
      activeName:'sale',//设置默认展示
      myEcharts:null,//存一下echarts实例【全局都就可以使用了】
      date:[],//收集日历数据
    }
  },
  computed:{
    isSaleOrVisit(){
      return this.activeName=='sale' ? '销售额' : '访问量';
    },
    cartsData(){
      return this.isSaleOrVisit=='销售额' ?this.saleData : this.visitData ;
    },
    // ...mapState('saleVc',['mockSaleData']),//映射数据
    ...mapGetters('saleVc',['saleData','visitData']),
  },
  //一上来，默认展示的是sale，计算属性会根据这个，计算出销售额，返回到使用的地方，
  //可视化echarts实例中，title配置项的标题，使用的是计算出来的数据，【一上来默认是销售额】
  //当数据发生变化，被watch监视属性监听到了，再次调用我们保存带data中的echarts实例，修改title，其他配置不变
  //因为activeName变了，变为visit，计算属性根据其值计算出访问量，将其作为切换后的可视化title
  watch:{
    //监听isSaleOrVisit或者activeName的变化【表示切换了】，找展示对应的点击的新的可视化数据了。
    activeName(newVal){
          //重新调用保存在data中的echarts实例，只是修改其title配置属性，其他的不动。【有新的值，新的值会替换旧的值，其他保持不变】
        this.myEcharts.setOption({
          title:{
            text:this.isSaleOrVisit+'趋势',
          },
          series:[//使用计算属性
            {
              data:this.cartsData,
            }
          ]
        })
    }
  },
  methods:{
    //点击今日按钮 设置日历显示
    setDay(){
      let day=new Date();
        this.date=[day,day]
    },
    //点击本周
    setWeek(){
      //根据当前的星期，得到星期一的日期 和 星期日的日期
      let date=new Date();
      // console.log(((date1-date)/1000)/60/60/24);86400000  86400 1440 24 1
      let day=date.getDay();
      // console.log(date.getFullYear())
      //日期要减的天数【本周周一】
      let start=(day-1)*86400000;//毫秒数【要减的天数 转化成的毫秒数】
      //日期要加的天数【本周周日】
      let ed=(7-day)*86400000;//毫秒数【要加的天数 转化成的毫秒数】
      let d=+new Date();
      //
      let startdate=new Date(d-start);
      let edate=new Date(d+ed);
      this.date=[startdate,edate];

    },
    //点击本月
    setmounted(){
        let start=dayjs().startOf('month').format('YYYY-MM-DD')
        let ed=dayjs().endOf('month').format('YYYY-MM-DD')
        this.date=[start,ed];
    },
    //点击本年
    setYear(){
      let start=dayjs().startOf('year').format('YYYY-MM-DD')
      let ed=dayjs().endOf('year').format('YYYY-MM-DD')
      this.date=[start,ed];
    },
    // async getSaleOrVisitData(){
    //   let response=await reqmockSaleOrVisitCartsData()
    //   console.log(response)
    // }
  },
  mounted() {
    //联系actions发请求，拿数据
    this.$store.dispatch('saleVc/getMockSaleOrVisiteData');
    // this.getSaleOrVisitData();
    let boxBarCarts=echarts.init(this.$refs.boxBar)
    setTimeout(()=>{

    this.myEcharts=boxBarCarts;//存一下实例，全局就可以使用了
    this.myEcharts.setOption({
      title:{
        text:this.isSaleOrVisit+'趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: this.saleData,//可以使用监视属性+$nextTick()
          // color:
        }
      ]
    })
    },400)
  }
}
</script>

<style scoped>
.clearfix{
  display: flex;
  justify-content: space-between;
  position: relative;
}
>>>.el-card__header{
  border-bottom: none;
 box-sizing: border-box;
}
.right{
  position: absolute;
  right: 10px;
  top: 6.5px;
  font-size: 14px;
}
.right>span{
  margin-right: 16px;
}
.bar-right{
  width: 100%;
  margin-left: 50px;
}
.bar-right>div{
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 35px;
}
.bar-right>ul{
  list-style-type: none;
}
.bar-right>ul>li{
  width: 100%;
  margin-top: 20px;
  position: relative;
}
.li-span{
  position: relative;
  left: -15px;
}
.span-svg{
  position: relative;
  left: 8px;
  top: -6px;
}
.li-second-span{
  position: absolute;
  left: 50px;
  font-size: 14px;
}
.bar-right>ul>li>span:last-child{
  position: absolute;
  right: 20px;
  font-size: 14px;
}
.right>span{
  cursor: pointer;
}
</style>
