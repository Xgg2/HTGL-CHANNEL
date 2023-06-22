<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="请输入SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" rows="4" type="textarea" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item :label="attr.attrName" v-for="attr of attrInfoList" :key="attr.id">
                            <!--下拉列表数据收集到的对象-->                 <!--收集到每一个对应的平台属性对象身上-->
            <el-select placeholder="请选择"  v-model="attr.attrIdOrValueId">
                                  <!--下拉列表收集的信息  收集属性id 属性值id  【平台属性id:平台属性的属性值id】-->
              <el-option :label="attrValue.valueName" :value="`${attrValue.attrId}:${attrValue.id}`" v-for="attrValue of attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item :label="spuSale.saleAttrName" v-for="spuSale of spuSaleAttrList" :key="spuSale.id">
            <el-select v-model="spuSale.spuSaleIdOrSpuSaleValueId" placeholder="请选择">
              <el-option :label="spuSaleValue.saleAttrValueName" :value="`${spuSale.id}:${spuSaleValue.id}`" v-for="spuSaleValue of spuSale.spuSaleAttrValueList" :key="spuSaleAttrList.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
<!--
   @selection-change="handleSelectionChange"   selection-change	当选择项发生变化时会触发该事件【这里的多选按钮框】	selection
-->
        <el-table :data="spuImageList" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column  type="selection" align="center"></el-table-column>
          <el-table-column  label="图片">
            <template v-slot="{row,$index}">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0" @click="setDefaultImage(row,$index)">设为默认</el-button>
              <el-button v-else>默认</el-button>  <!--不等于0，等于1，就是设置的默认图片-->
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SaveSku">确定</el-button>
        <el-button @click="setScene">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--添加sku组件-->
<script>
export default {
  name: "Skucard",
  data(){
    return{
      formInline:{},
      tableData:[{},{}],
      spuImageList:[],//spu图片
      spuSaleAttrList:[],//销售属性
      attrInfoList:[],//平台属性
      skuInfo:{  //收集的sku数据【此界面/组件 保存要用的参数】
        category3Id: 0,//三级分类id 父组件传的
        spuId: 0,//父组件传的 【row.id】
        tmId: 0,//父组件传的
        // createTime: "2023-06-12T12:31:53.033Z",
        // id: 0,
        // isSale: 0,

        //双向绑定收集的数据
        skuName: "",
        price: 0,//价格
        weight: 0,//重量空串
        skuDesc: "",//规格描述
        skuAttrValueList: [//平台属性
          //{
            // attrId: 0,//平台属性id 数字
            // valueId: 0,//平台属性值id 数字
          //}
        ],
        skuDefaultImg: "",//默认图片
        skuImageList: [//收集图片
          //{
            // id: 0,
            // imgName: "",【需】
            // imgUrl: "",  【需】
            // isDefault: "", 【需】 字符串
            // skuId: 0,
            // spuImgId: 0   【需】 数字
          //}
        ],
        skuSaleAttrValueList: [//销售属性
          // {
            // id: 0,
            // saleAttrId: 0, 【需】 数字
            // saleAttrName: "",
            // saleAttrValueId: 0, 【需】 数字
            // saleAttrValueName: "",
            // skuId: 0,
            // spuId: 0
          // }
        ],

      },
      spu:{},//父组件传的spu
      imageList:[],//收集的图片列表数据//存放当第一列多选框变化时，触发回调，饿了么注入了一个形参，就是当前选中的图片列表的数据【每次新增选中一个】就会增一条数据
    }
  },
   methods:{
    async getSkuInfo(category1Id,category2Id,spu){
      console.log(spu);
      this.skuInfo.category3Id=spu.category3Id;
      this.skuInfo.spuId=spu.id;
      this.skuInfo.tmId=spu.tmId;
      this.spu=spu;
      // 图片列表
      let response=await this.$API.sku.reqSpuImageList(spu.id)
      if(response.code==200){
        let list=response.data;
        list.forEach(item=>{ //这里不是直接往响应式数据对象身上天加属性，而是往服务器返回的图片列表数据赋值给一个变量，往这个变量身上添加一个新属性，然后在赋值给已经设好的响应式数据对象【存服务器返回的图片列表数据的数组】身上
          item.isDefault=0;
        })
          this.spuImageList=list;
      }
      let response1=await this.$API.sku.reqSpuSaleAttrList(spu.id)
      // 销售属性
      if(response1.code==200){
          this.spuSaleAttrList=response1.data;
      }
      let response2=await this.$API.sku.reqAttrInfoList(category1Id,category2Id,spu.category3Id);
      // 平台属性
      if(response2.code==200){
          this.attrInfoList=response2.data;
      }
    },
     //表格第一列选择框变化时触发
     handleSelectionChange(params){//饿了么注入这个参数，就是当前已选中的行【图片列表】的数据
       console.log(params)
       this.imageList=params;
     },
     //设置默认图片
     setDefaultImage(row,index){
      //排他思维
      this.spuImageList.forEach(item=>{
        item.isDefault=0;
      })
       this.spuImageList[index].isDefault=1;
      //收集默认图片
       this.skuInfo.skuDefaultImg=row.imgUrl; //this.spuImageList[index]就是row
     },
     //保存sku
     async SaveSku(){
      //1、整理平台属性数据
      //使用forEach
      // this.attrInfoList.forEach(item=>{
      //   if(item.attrIdOrValueId){
      //     let [attrId,valueId]=item.attrIdOrValueId.split(':');
      //     let obj={
      //       attrId,//平台属性id
      //       valueId ,//平台属性值id
      //     }
      //     this.skuInfo.skuAttrValueList.push(obj);
      //   }
      // })

      //使用reduce
       let attrlist=this.attrInfoList.reduce((prev,val)=>{
         if(val.attrIdOrValueId){
           let [attrId,valueId]=val.attrIdOrValueId.split(':');
           let obj={
             attrId:attrId, //这里传的id是字符传或数字类型都可以
             valueId:valueId
           };
           prev.push(obj);
         }
         return prev;//作为下一次循环的prev 【然后再解构出val中的id，放在对象中，push进去】
       },[])
      this.skuInfo.skuAttrValueList=attrlist;

       //2、整理销售属性数据
       this.skuInfo.skuSaleAttrValueList=this.spuSaleAttrList.reduce((prev,val)=>{
         if(val.spuSaleIdOrSpuSaleValueId){
           let [saleAttrId,,saleAttrValueId]=val.spuSaleIdOrSpuSaleValueId;//解构字符串
           prev.push({saleAttrId:parseInt(saleAttrId),saleAttrValueId:parseInt(saleAttrValueId)});
         }
         return prev;
       },[])
       //3、整理图片数据
       this.skuInfo.skuImageList=this.imageList.map(item=>{//使用map映射，处理数组元素，返回处理后的数组元素
         return {
           imgName:item.imgName,
           imgUrl: item.imgUrl,
           isDefault: item.isDefault.toString(),
           spuImgId: item.id
         }
       });
       //价格与重量设置为数字
       this.skuInfo.price=parseInt(this.skuInfo.price);
       this.skuInfo.weight=parseInt(this.skuInfo.weight);
       //发请求，向服务器提交数据
       let response=await this.$API.sku.reqSaveSkuInfo(this.skuInfo);
       if (response.code==200){
         this.$message.success('添加SKU成功');
         this.$emit('goSpuList',0);
       }
     },
     //取消
     setScene(){
      this.$emit('goSpuList',0);
     }
  }
}
</script>

<style scoped>

</style>
