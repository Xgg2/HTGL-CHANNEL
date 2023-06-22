<template>
      <a :title="title" style="margin-left: 2px">
<!--        接收父组件传过来的所有属性-->  <!--接收父组件传过来的自定义事件-->
<!--        使用该组件的地方，父组件传入属性【el-button】的，这里就有了-->
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
      </a>
</template>

<script>
//$attrs属性接收父组件传递过来的数据
export default {
  name: "Hintbutton",
  props:['title']
}
</script>

<style scoped>

</style>
