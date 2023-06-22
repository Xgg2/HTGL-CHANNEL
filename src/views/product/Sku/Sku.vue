<template>
  <div>
    <el-table :data="skulist.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column prop="date" label="默认图片">
        <template v-slot="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column label="操作" width="300">
        <template v-slot="{row,$index}">                   <!--0当前下架的状态，可以上架展示上架按钮-->
          <el-button size="mini" type="success" icon="el-icon-top" v-if="row.isSale==0" @click="topSku(row)"></el-button>
          <el-button size="mini" icon="el-icon-bottom" v-else @click="bottomSku(row)"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="info" icon="el-icon-chat-line-square" @click="showSkuInfo(row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页器-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      style="text-align: center"
      :page-sizes="[3,6,9]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--  抽屉 展示sku详细信息-->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
     <el-form style="margin:20px 80px">
       <el-form-item label="名称">{{skuInfo.skuName}}</el-form-item>
       <el-form-item label="描述">{{skuInfo.skuDesc}}</el-form-item>
       <el-form-item label="价格">{{skuInfo.price}}元</el-form-item>
       <el-form-item label="平台属性">
         <el-tag v-for="attr of skuInfo.skuAttrValueList" :key="attr.id" style="margin-left: 2px">{{attr.valueName}}</el-tag>
       </el-form-item>
       <el-form-item label="商品图片">
         <!--走马灯-->
         <el-carousel indicator-position="outside">
           <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
             <img :src="item.imgUrl">
           </el-carousel-item>
         </el-carousel>
       </el-form-item>
     </el-form>
      <img :src="url"style="width: 300px;height: 300px;background-color: #20a0ff">
    </el-drawer>

  </div>
</template>

<script>
export default {
  name: "Sku",
  data(){
    return{
      page:1,//当前页
      limit:6,//每一页展示的数量
      skulist:[],//服务器返回的sku的信息数据
      total:0,//总数量 也是服务器返回的
      drawer:false,//控制抽屉显示与隐藏
      skuInfo:{},//请求服务器返回的sku的详细信息数据
      url:'',
    }
  },
  methods:{
    //因为请求获取sku数据，不仅仅只在一上来挂载的时候，切换当前页码，以及切换每一页展示的数量的时候都会用到，所以封装到一个方法中
    async getSkuList(){
      let response=await this.$API.sku.reqSkuRouteListInfo(this.page,this.limit);
      if(response.code==200){
        this.skulist=response.data;//存储服务器返回的sku的数据【服务器会根据传递的参数，当前页，每一页的数量--返回相应的数据】
        this.total=response.data.total;
      }
    },
    //切换每一页的数量
    handleSizeChange(limit){
      console.log(limit);//饿了么会注入一个所切换的每一页的数量
      this.limit=limit;
      this.getSkuList();//发请求获取修改完每一页数量 的数据
    },
    //切换当前页
    handleCurrentChange(page){//饿了么会注入一个参数，就是点击的当前页
      this.page=page;//这里我们直接修改data中的数据，因为请求的参数就是依赖于data中的数据，所以data中page的当前页参数一变，再次调用封装的发请求的函数，函数的请求
      //先清空一下数据
      this.skulist=[];
      this.getSkuList();//发请求获取点击的当前页展示
    },
    //上架sku 【点击上架按钮，表示当前isSale为0（下架的状态），】
    async topSku(row){
      // row.isSale=1;//因为点击后上架，已经，就不能显示上架按钮了，就要显示下架按钮（isSle不等于0的时候会展示下架按钮，）  【返回的数据就有修改后的isSale】
     let response= await this.$API.sku.reqOnSale(row.id);
      if(response.code==200){
        this.$message.success('上架成功')
        //服务器不会返回数据，只是根据接口以及skuId把数据库中对应的sku上架；
        row.isSale=1;
      }
    },
    //下架sku
    async bottomSku(row){
      //有的系统数据，不能够处理
      try {
        let response=await this.$API.sku.reqCancelSale(row.id)
        if(response.code==200){
          this.$message.success('下架成功');
          row.isSale=0;//下架了，才可以上架【展示上架按钮】  ， isSale等于0的时候展示上架按钮
        }
      }
      catch(err) {
        this.$message.info('系统数据，不能处理');
      }

    },
    //展示sku详细信息
    async showSkuInfo(row){
      this.drawer=true;
      let response=await this.$API.sku.reqGetSkuInfo(row.id);
      if(response.code==200){
        this.skuInfo=response.data;
      }
    }
  },
  watch:{
    skuInfo:{
      deep:true,
      handler(newVal){
        if(newVal.skuImageList[0].imgUrl){
          this.url=newVal.skuImageList[0].imgUrl
        }
      }
    }
  },
  mounted() {
    this.getSkuList()
  }

}
</script>

<!--这里不能开启scoped-->
<style scoped>
.el-carousel__item img {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*如果要开启scoped的话,下边选择器选中的跑马灯按钮样式会不生效,可以使用css深度选择器 >>> */
/*就会影响到,其子组件使用此class属性名的元素*/
>>>.el-carousel__button{
  width: 10px;
  height: 10px;
  background-color: #20a0ff;
  border-radius: 50%;
}
</style>
