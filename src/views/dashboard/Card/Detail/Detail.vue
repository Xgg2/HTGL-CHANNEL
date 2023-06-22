<template>
  <div class="detail">
    <div class="header">
      <span>{{title}}</span>
      <span><i class="el-icon-info span-i"></i></span>
    </div>
    <div class="content">{{ content }}</div>
    <div class="echarts">
      <slot name="carts"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props:['title','content']
}
</script>

<style scoped>
.detail{
  position: relative;
}
.header>span:first-child{
  color: #999;
  font-size: 14px;
}
.span-i{
  color: #666;
  position: absolute;
  right: 6px;
}
.content{
  font-size: 30px;
  margin-top: 5px;
}
.echarts{
  height: 50px;
}
.footer{
  border-top: 1px solid #d9d9d9;
  padding-top: 6px;
  height: 30px;
  margin-top: 2px;
}
</style>
