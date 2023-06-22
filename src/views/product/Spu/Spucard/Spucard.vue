<template>
  <div>
    <el-form ref="form" :model="spuInfo" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <!--
          el-select组件使用 v-model指定收集信息存放的地方
          el-option组件使用 :label指定v-for遍历出来的每一个下拉框展示的内容 ，
                           :value指定收集具体什么信息到【信息存放的地方】
        -->
        <el-select placeholder="请选择品牌" v-model="spuInfo.tmId"> <!--收集到这里品牌id-->
          <el-option :label="t.tmName" :value="t.id" v-for="t of tradeMarkList" :key="t.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="描述" v-model="spuInfo.description"></el-input>
      </el-form-item>
<!--
          【查看大图】:on-preview="handlePictureCardPreview"	点击文件列表中已上传的文件时的钩子	function(file)
          【删除】:on-remove="handleRemove"  文件列表移除文件时的钩子	function(file, fileList)
          【添加图片】  :on-success="handleAvatarSuccess" 添加成功时需要收集数据
          action  图片发送到的地址【存的地址】
          :file-list 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] ，对象属性名只能是name，url【我们服务器返回的数据名字是imgName imgUrl】
-->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/api1/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImage"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="isSpuAttr" v-model="attrlistIdOrName"><!--这里收集销售属性id-->
          <!--:value="`${attrlist.id}:${attrlist.name}`" 这样收集 销售属性id与名-->
          <el-option :value="`${attrlist.id}:${attrlist.name}`" :label="attrlist.name" v-for="attrlist of spuAttrSelectList" :key="attrlist.id"></el-option>
        </el-select>                                  <!--已经点击一个列表【收集到spu销售属性id】，就位false解除禁用-->
        <el-button icon="el-icon-plus" type="primary" :disabled="!attrlistIdOrName" @click.native="addSpuAttrchange">添加销售属性</el-button>
<!--        表格-->
        <el-table :data="spuInfo.spuSaleAttrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性值" width="80px"></el-table-column>
          <el-table-column label="属性值名称列表">
<!--             @close="handleClose(tag)"
                 @click="showInput"
                 -->
            <template v-slot="{row,$index}">                                                                                                          <!--删除销售属性值-->
              <el-tag :key="spuAttrVal.id" v-for="(spuAttrVal,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" style="margin: 0 2px" @close="row.spuSaleAttrValueList.splice(index,1)">{{spuAttrVal.saleAttrValueName}}</el-tag>
<!--          v-model="inputValue"    @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"-->
              <el-input class="input-new-tag" v-if="row.inputVisible"  v-model="inputValue"  ref="saveTagInput" size="small" style="width: 70px" @keyup.enter.native="handleInputConfirm(row,$index)" @blur="handleInputConfirm(row,$index)"></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)" style="margin-left: 2px;position: relative;top: 1px">+添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="100px">
            <template v-slot="{row,$index}">                            <!--删除销售属性-->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spuInfo.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

<!--      -->
      <el-form-item>
        <el-button type="primary" @click="saveSpuInfo">保存</el-button>
        <el-button @click="$emit('goSpuList',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--添加与修改spu组件-->
<script>
export default {
  name: "Spucard",
  data(){
    return{
      dialogImageUrl: '',
      dialogVisible: false,
      // tableData:[{},{}],//表格依赖数据
      // spuInfo:{},//存服务器返回的Spu信息--【修改信息收集进的对象】
      SaleAttrList:[],//平台销售属性数据
      tradeMarkList:[],//品牌列表
      spuImage:[],
      spuInfo: {//添加spu收集进的对象【依据的保存接口的发送给服务器的参数】 ，修改时，服务器返回的数据会替换这里个对象【区别是修改多一个id】，保存接口发送给服务器的参数与修改时请求的spu的信息的对象参数一样【添加不需要id】
        category3Id: 0,//三级分类id
        description: "",//描述、
        spuName: "",//spu名称
        tmId: 0,//品牌id
        // id: 0,添加不用传id参数给服务器
        spuImageList: [//收集spu图片信息
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0
          }
        ],
        //平台属性与属性值的收集
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0
              }
            ]
          }
        ],
      },
      attrlistIdOrName:'',//spu销售属性id+name
      // inputVisible:false,//隐藏添加属性值的输入框 【在这里只用一个控制所有的属性添加销售属性值输入框显示，是错误的】
      inputValue:'',//收集添加销售属性值的表单数据【我们给每一个销售属性都有一个这个属性】
    }
  },
  props:['scene','addOrsetSpu','getSpuList'],//第二个参数表示点击的添加spu按钮，还是修改spu按钮跳到这里的  ，接收父组件传过来的发请求展示spu列表的函数
  methods:{
    async getSpuInfo(row){//父组件调用子组件方法时，传过来的数据，接收一下
      // console.log('发请求',row)
      //获取Spu基本信息
      let response=await this.$API.spu.reqSpuInfo(row.id);//属性id
      if(response.code==200){
        //先处理一下数据【给每一个销售属性对象中添加一个布尔值，用于控制当前的销售属性添加属性值输入框的显示与隐藏】
        response.data.spuSaleAttrList.forEach(item=>{
          //item就是当前spu所拥有的销售属性
          item.inputVisible=false;//默认输入框隐藏
        })
        this.spuInfo=response.data;
      }
    //  获取平台销售属性
      let response1=await this.$API.spu.reqSaleAttrList();
      if(response1.code==200){
        this.SaleAttrList=response1.data;
      }
      //获取品牌列表
      let response2=await this.$API.spu.reqSpuFromTradeMarkList();
      if(response2.code==200){
        this.tradeMarkList=response2.data;
      }
      //获取Spu图片
      let response3=await this.$API.spu.reqImageList(row.id);
      // console.log(response3)
      if(response3.code==200){
      // :file-list 上传的文件列表【需要】  属性名只能是name url  ，保存时不需要name url就可以去掉
        response3.data.forEach(item=>{
          item.name=item.imgName;
          item.url=item.imgUrl;
        })
        this.spuImage=response3.data;
      }
    },
    //查看照片墙大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;//将查看的图片路径赋值，用于img大图的展示
      this.dialogVisible = true;//控制显示与隐藏
    },
    //删除图片时触发
    handleRemove(file,fileList){
      console.log(file,fileList);//会接收到删除的图片的对象，以及删除后的整个照片墙列表数据
      //将删除后的照片请列表数据存起来
      this.spuImage=fileList;//还是存在照片墙所依赖的列表数据那里【请求获得图片数据所存数据的地方】
    },
    //添加图片【成功时触发】
    handleAvatarSuccess(response, file, fileList){
      console.log(response,file,fileList);//第一个参数是请求的结果，第二个参数是添加图片的数据对象，第三个参数是添加图片后整个照片墙列表的数据
      //将添加的数据村收集起来
      this.spuImage=fileList;
    },
    //添加销售属性【触发这个事件不是点击下拉菜单触发，而是点击添加销售属性button按钮触发的】 所以这个收集的数据【id+name】还是依赖与:value中收集的
    addSpuAttrchange(){ //这里我们是直接传的对象【v-for中的点击的】
      // console.log(attrlist)
      let [spuAttrId,spuAttrName]=this.attrlistIdOrName.split(':');
      let newSpuAttr={
        baseSaleAttrId: spuAttrId,
        saleAttrName: spuAttrName,
        inputVisible:false,//指控制当前销售属性，添加属性值的输入乱搞显示与隐藏
        //新增销售属性，不应该有属性值
        spuSaleAttrValueList: [
        //   {
        //     baseSaleAttrId: attrlist.id,
        //     id: 0,
        //     isChecked: "",
        //     saleAttrName: "",
        //     saleAttrValueName: "",
        //     spuId: 0
        //   }
        ]
      }
      this.spuInfo.spuSaleAttrList.push(newSpuAttr);
      //置空下拉菜单中已显示的内容
      this.attrlistIdOrName='';
    },
    //点击添加销售属性值 显示input框
    showInput(row) {
      //【这里可以使用$set给row添加inputVisible = true】
      // row.inputValue='';//每一个销售属性的添加属性值输入框数据收集到对应的销售属性身上【不使用$set就不是响应式的数据】
      // this.$set(row,'inputValue','');//现在就是响应式的数据了
      row.inputVisible = true;//给添加的销售属性 加一条控制添加属性值输入框显示与隐藏的数据
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },
    //添加销售属性的表单失去焦点或点击回车触发的回调
    handleInputConfirm(row,index) {
      console.log(row)
      //添加的销售属性值不能为空
      if(this.inputValue.trim()==''){
        this.$message.info('属性值为空');
        console.log(this.inputValue.trim())
        return;//不走后面逻辑
      }
      //添加的销售属性值不能和已有的数据值重复  【也可以直接row.spuSaleAttrValueList  因为row就是当前这个销售属性对象】
      let isRepeat=this.spuInfo.spuSaleAttrList[index].spuSaleAttrValueList.some(item=>{
        return item.saleAttrValueName==this.inputValue;//只要有一个等于【重复】，就返回true
      })
      // console.log(isRepeat);
      if(isRepeat){//与已经有的销售属性值重复【只要有一个重复】
        this.$message.info('已添加此销售属性值');
        return;
      }
        let inputValueobj = {
              baseSaleAttrId: row.baseSaleAttrId,
              saleAttrName: row.saleAttrName,//销售属性名
              saleAttrValueName: this.inputValue,//销售属性值名【v-model收集的】
            };//这里不能只写个销售属性只
          // this.spuInfo.spuSaleAttrList.forEach((item,index)=>{
          //   if (item.saleAttrName==row.saleAttrName){
          //     this.spuInfo.spuSaleAttrList[index].spuSaleAttrValueList.push(inputValueobj);
          //     this.spuInfo.spuSaleAttrList[index].inputVisible=false;
          //   }
          // });
        // this.inputVisible = false;
        row.spuSaleAttrValueList.push(inputValueobj);
        row.inputVisible=false;
        this.inputValue = '';
      },
    //保存spu
    async saveSpuInfo(){
      if(this.addOrsetSpu=='addSpu'){//添加spu
        console.log('添加spu')
        //将收集的添加的图片数据整理，放到spuInfo对应属性中
        this.spuInfo.spuImageList=this.spuImage.map(item=>{
          return{
            imgName: item.name,
            imgUrl: item.response.data,
          }
        })
        //去除销售属性的inputVisible
        this.spuInfo.spuSaleAttrList.forEach(item=>{
          delete item.inputVisible;
        })
        let response=await this.$API.spu.reqaddOrSetSpuList(this.spuInfo);
        if(response.code==200){
          this.$emit('goSpuList',0);
          this.$message.success('添加成功');
          //处理page页码
          this.$emit('setSkuListPage',1);
          this.getSpuList();//spu列表展示添加后最新的数据
        }
      }
      else {
        // console.log('修改spu');
        //整理参数
        this.spuInfo.spuImageList=this.spuImage.map(item=>{
          return{
            id:item.id,
            spuId: item.spuId,
            imgName: item.name,
            imgUrl: item.response ? item.response.data : item.url,//新添加的图片没有url【有resonse的data中有图片的路径】，已有的图片有url
          }
        });
        //将销售属性的inputVisible【添加是为了控制添加销售属性值输入框的显示与隐藏】删掉
        this.spuInfo.spuSaleAttrList.forEach(item=>{
          delete item.inputVisible;
        });
        let response=await this.$API.spu.reqaddOrSetSpuList(this.spuInfo);
        if(response.code==200){//保存成功
          this.$emit('goSpuList',0);//显示spu列表
          this.$message.success('修改成功');
          //发请求展示最新的数据
          this.getSpuList();
        }
      }
      //添加或修改成功后清空spuInfo数据【前提是初始的数据是空的--才可以这样清空】
      //data函数中的数据就等于实例的_data中的数据，this._data就是组件当前的数据，this.$options.data()就是data中我们写的初始的数据【就是组件data函数中现在写的/呈现--在这里我们都设的空--就可以用来清空数据（初始的数据清空后期赋值的数据）】
      Object.assign(this._data,this.$options.data());//this.$options.data()是一个此组件的data函数式中的所有数据【初始的/空】，全部赋值/拷贝给已经有数据的data中的所有数据
      // console.log(this._data)
      // console.log(this.$options)
      // console.log(this.$options.data)
    },
    //点击添加spu按钮，这个组件发请求【两个】的函数 品牌下拉列表数据，所有销售属性
   async getaddSpuTradeMarkOrAttr(category3id){//这里不用接收什么
      //  获取平台销售属性
      let response1=await this.$API.spu.reqSaleAttrList();
      if(response1.code==200){
        this.SaleAttrList=response1.data;
      }
      //获取品牌列表
      let response2=await this.$API.spu.reqSpuFromTradeMarkList();
      if(response2.code==200){
        this.tradeMarkList=response2.data;
        this.spuInfo.tmId='';
      }
     this.spuInfo.spuSaleAttrList=[];
     console.log(category3id)
      this.spuInfo.category3Id=category3id;
    }


  },
  computed:{
    //根据spu已有的销售属性，计算出下拉列表应该展示的spu销售属性
    spuAttrSelectList(){
      //返回所过滤的满足条件的数组元素【数组的形式】  颜色  版本  尺码
      //第一次【颜色属性】，在every中，[{颜色}，{版本}] 已有了（第一个）等于了第一个，所以不满足条件false【此数组元素不符合条件--颜色】
      //第二次【版本属性】，在every中，[{颜色}，{版本}] 已有了（第二个）等于了第二个，所以不满足条件false【此数组元素不符合条件--版本】
      //第三次【尺码属性】，在every中，[{颜色}，{版本}] 没有（也不等于第一个，也不等于第二个），所以满足条件这次every循环为true【filter返回了这次循环的数组元素--版本】
      let newSaleAttrList=this.SaleAttrList.filter(item=>{//过滤出满足条件的
        //filter中的return后面一整个就是一个过滤条件，
        return this.spuInfo.spuSaleAttrList.every(item1=>{//举例--[{颜色}，{版本}]所有满足条件才是true
          return item.name!=item1.saleAttrName;//【就是每一个数组元素（销售属性对象）中的saleAttrName都不等与总的name】//所有的销售属性，在已有的销售属性中，没有的【就是该spu还没有的销售属性】
        })
      });
      return newSaleAttrList;//计算出属性return出去
    },
    //接着上面计算属性计算【spu三个销售属性值都有了--提示就显示没有销售属性可选了】【否则就是 还有${spuAttrSelectList.length}未选择】
    isSpuAttr(){
      if(this.spuAttrSelectList.length){
        return `还有${this.spuAttrSelectList.length}未选择`;
      }
      else {
        return '没有销售属性可选了';
      }
    }
  }
  // watch:{
  //   scene(newVal){
  //     if(newVal==1){//说明切到了这个子组件【点击了添加 或修改】
  //       console.log('发请求')
  //     }
  //
  //   }
  // }
}
</script>

<style scoped>

</style>
