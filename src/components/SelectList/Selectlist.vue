<template>
  <div>
<!--    利用行内表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">   <!--根据父组件传递过来的isHidden当为false时【表示用户要添加属性了】，disabled就是true禁用状态-->
        <el-select v-model="formInline.categ1" placeholder="选项"  @change="getCategory2" :disabled="isHidden">                                                    <!--这里change事件是饿了么封装好的，不是原生事件【不用click.native】-->
          <el-option :label="category1.name" :value="category1.id" v-for="category1 of category1list" :key="category1.id"></el-option>
        </el-select>                 <!--最终会收集到id【这里是name的话就会收集到name】-->
      </el-form-item>
      <el-form-item label="二级分类">
                <!--将el-option组件中:value中的数据收集-->
        <el-select v-model="formInline.categ2" placeholder="选项"  @change="getCategory3" :disabled="isHidden">                                                     <!--这里就先不传id了，使用收集的id-->
          <el-option :label="category2.name" :value="category2.id" v-for="category2 of category2list" :key="category2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.categ3" placeholder="选项" @change="getAttrInfoList" :disabled="isHidden">
          <el-option :label="category3.name" :value="category3.id" v-for="category3 of category3list" :key="category3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Selectlist",
  data(){
    return{
      formInline: {
        categ1:'',//收集的id  【收集的什么】取决于:value中是 name还是id
        categ2:'',
        categ3:'',
      },
      category1list:[],//存一级下拉菜单服务器返回的数据
      category2list:[],//存二级下拉菜单服务器返回的数据
      category3list:[],//存三级下拉菜单服务器返回的数据
    }
  },
  props:['isHidden'],//接收父组件传递过来的数据【这个是控制el-card表格与添加属性el-card的显示与隐藏的】，不同的父组件【Attr组件 ,spu组件】传递的是同一个名的自定义属性【传递的时候处理一下数据】
  methods:{
    async getCategory1(){
      let response=await  this.$API.attr.reqGetCategory1();
      if(response.code===200){
          this.category1list=response.data;
      }
    },
    //点击一级分类，获取二级分类
     async getCategory2(){
      //清除二级和三级菜单的数据
       this.category2list=[];
       this.category3list=[];
       this.formInline.categ2='';//清空二级框中的数据【内容】
       this.formInline.categ3='';//清空三级框中的数据【内容】
       let response=await this.$API.attr.reqGetCategory2(this.formInline.categ1);//拿着收集一级分类的id发请求
       if(response.code===200){
         this.category2list=response.data;//二级列表的数据
       }
    },
    async getCategory3(){//使用一次收集的二级id
      this.category3list=[];
      this.formInline.categ3='';//清空三级框中的数据【内容】
      let response=await this.$API.attr.reqGetCategory3(this.formInline.categ2);
      if(response.code===200){
        //把服务器返回的三级下拉列表数据存起来
        this.category3list=response.data;
      }
    },
    //三级下拉菜单改变时触发回调，获取Attr信息列表数据
    getAttrInfoList(){
      //触发自定义事件getAttrInfo，并传入三个下拉列表id【收集的】
      //【可以使用同一个自定义事件给不同的父组件传数据】
      this.$emit('getAttrInfo',this.formInline);//当点击第三个下拉别表时【改变时】，把收集好的三个id传给父组件
      //往Spu路由组件中传数据
      this.$emit('getSpuSelectId',this.formInline);//当点击第三个下拉别表时【改变时】，把收集好的三个id传给父组件【就可以调用父组件中给子组件绑定自定义时间的回调】
    }
  },
  mounted() {
   this.getCategory1();//一上来【挂载】就有第一个下拉列表的数据
  }
}
</script>

<style scoped>

</style>
