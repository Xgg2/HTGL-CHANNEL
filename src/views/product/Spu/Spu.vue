<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <!--绑定自定义事件，接收子组件SelectList传过来的数据【三个id】  不等于0就是1或2的时候为真禁用，等于0，就是false取消禁用-->
      <Selectlist @getSpuSelectId="getSelectId" :isHidden="scene!=0"></Selectlist>
    </el-card>
    <el-card>
      <div v-show="scene==0">
      <el-button type="primary" icon="el-icon-upload" style="margin-bottom: 20px" @click="addSpuList" :disabled="!category3Id">添加SPU</el-button>
<!--      表格组件-->
      <el-table :data="records" border style="width: 100%">
        <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="spuName" label="SPU名称"></el-table-column>
        <el-table-column prop="description" label="SPU描述"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row,$index}">
            <Hintbutton type="success" icon="el-icon-plus" size="mini" title="添加spu" @click="addSku(row)"></Hintbutton>
<!--            <el-button type="success" icon="el-icon-plus" size="mini"></el-button>-->
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="setSpuList(row)" style="margin-left: 2px"></el-button>
                                                                                            <!--展示sku列表【与表格嵌套的对话框】 请求需要spuId，传一个row过去-->
            <el-button type="info" icon="el-icon-info" size="mini" style="margin-left: 2px" @click="showSkuList(row)"></el-button>
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
              <el-button type="danger"  icon="el-icon-delete" size="mini" slot="reference"  style="margin-left: 2px"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
<!--      分页器组件
           @size-change="handleSizeChange"    每条页数改变
           @current-change="handleCurrentChange" 当前页改变
        :current-page="page"当前页码
        :page-size="limit" 每页显示个数
        :total="total" 总数
-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[3, 6, 9]"
        :page-size="limit"
        style="text-align: center;margin-top: 20px;"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total">
      </el-pagination>
      </div>
<!--      添加修改spu-->         <!--传一个状态  子组件用于监听-->
      <Spucard v-show="scene==1" :scene="scene" @goSpuList="setSpucardScene" ref="spucard" :addOrsetSpu="addOrsetSpu" :getSpuList="getSpuList" @setSkuListPage="spucardSetPage"></Spucard>
<!--      添加sku-->                                   <!--这里不同的子组件使用的相同的自定义事件回调--用于切换场景-->
      <Skucard v-show="scene==2" ref="skucard" @goSpuList="setSpucardScene"></Skucard>
    </el-card>

<!--    嵌套表格的对话框 展示sku列表-->         <!--控制展示与隐藏的-->    <!--关闭对话框的回调-->
    <el-dialog :title="spu.spuName" :visible.sync="dialogTableVisible" @close="skuListHidden">
      <el-table :data="skuList" border  v-loading="loading">
        <el-table-column property="skuName" label="名称"></el-table-column>
        <el-table-column property="price" label="价格"></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template v-slot="{row,$index}">
            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import Spucard from "@/views/product/Spu/Spucard/Spucard";
import Skucard from "@/views/product/Spu/Skucard/Skucard";
export default {
  name: "Spu",
  data(){
    return{
      isShow:false,
      category3Id:'',//存传过来的三级id
      page:1,//当前页
      limit:3,//每一个的数量
      records:[],//服务器返回的列表数据
      total:0,//服务器返回的总数 注意这里不能写'' ，默认可以写0
      scene:0,//控制3种场景
      addOrsetSpu:'',//判断添加还是修改spu
      category1Id:'',//一级分类id
      category2Id:'',//二级分类id
      dialogTableVisible:false,
      spu:{},//sku列表需要展示spu的名字，点击查看sku列表信息的时候传的row存一份
      skuList:[],//请求的 sku列表数据
      loading:true,//loading动画
    }
  },
  components:{//注册子组件
    Spucard,
    Skucard
  },
  methods:{
    getSelectId(selectListId){
        let selectId={
          category1Id:selectListId.categ1,
          category2Id:selectListId.categ2,
          category3Id:selectListId.categ3
        };
        this.category3Id=selectListId.categ3;
        this.category1Id=selectListId.categ1;
        this.category2Id=selectListId.categ2;
        //调用封装的函数 发请求，拿列表数据
      this.getSpuList();
      console.log(selectId);
    },
    async getSpuList(){
      let {page,limit,category3Id}=this
      let response=await this.$API.spu.reqSpuLists(page,limit,category3Id)
      // console.log(response)
      if(response.code===200){//请求成功
        //存一下列表数据
        this.records=response.data.records;
        this.total=response.data.total;
      }
    },
    //当前页改变  会接受到一个点击的页 当前页
    handleCurrentChange(page){
      // console.log(page)
      this.page=page;//改变分页器中的当前页 修改请求中的参数
      this.getSpuList();//发请求获取点击的【当前页】数据展示
    },
    //修改每一个数量
    handleSizeChange(size){
      // console.log(size)
      this.limit=size;
      this.getSpuList();//发请求  添加需要用【修改服务器会返回不需要传】
    },
    //添加spu
    addSpuList(){
      this.scene=1;
      this.addOrsetSpu='addSpu';//添加
      //通知子组件发请求【两个】
      this.$refs.spucard.getaddSpuTradeMarkOrAttr(this.category3Id);//子组件发请求，获取【品牌列表，所有销售属性数据】
    },
    //Spucard子组件点击取消，切换场景
    setSpucardScene(scene){
      this.scene=scene;//Spucard点击取消 ，将场景切到0
    },
    //点击列表每一行操作第二个按钮，的修改spu
    setSpuList(row){
        this.scene=1;
        this.addOrsetSpu='setSpu';//标识/标记，表示修改spu
      // console.log(this.$refs.spucard.getSpuInfo);//这样这届可以拿到子组件的数据或方法
      this.$refs.spucard.getSpuInfo(row);//调用子组件的方法  【还可以传数据过去】 子组件方法中用于发请求*4，初始展示数据
    },
    //删除Spu
    async deleteSpu(row){
      let response=await this.$API.spu.reqDeleteSpu(row.id);
      if(response.code==200){
        this.$message.success('删除成功');
        //先改实例身上的page【处理当前页】，再发请求
        this.page=this.records.length>1 ? this.page : this.page-1;//在最后一页删除数据，只剩一条数据【把这一条数据删除了】
        this.getSpuList();//重新发请求展示删除后的列表数据
      }
    },
    //子组件保存时，处理page当前页
    spucardSetPage(page){
      this.page=page;
    },
    //点击第一个按钮，添加sku
    addSku(row){
      this.scene=2;//显示skucard组件
      //使用ref选中子组件【可以使用子组件的数据与方法】  【子组件请求需要用三级分类的id，我们调用子组件的方法时，传递过去】
      this.$refs.skucard.getSkuInfo(this.category1Id,this.category2Id,row);//调用子组件发请求的函数，子组件发请求【获取数据】
    },
    //展示sku列表
    async showSkuList(row){
      this.spu=row;
      console.log(row)
      this.dialogTableVisible=true;
      let response=await this.$API.sku.reqSkuList(row.id)
      if(response.code==200){
        this.skuList=response.data;
        //请求成功数据有了，关闭loading
        this.loading=false;
      }
    },
    //关闭对话框
    skuListHidden(){
      this.loading=true;//关闭时继续让loading为true，不然只能使用一次loading【第一次】
      this.skuList=[];//清空一下sku列表数据，防止点击下一个sku时，数据回显
    }
  }
}
</script>

<style scoped>

</style>
