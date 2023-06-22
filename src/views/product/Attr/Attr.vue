<template>
  <div>
<!--    三级下拉列表-->
    <el-card style="margin-bottom: 20px">
                <!--自定义事件-->
      <Selectlist @getAttrInfo="getAttrInfoLists" :isHidden="!isHidden"></Selectlist>
    </el-card>
    <el-card v-show="isHidden">
<!--      添加按钮-->                                                                           <!--这里当有属性数据的时候就解除禁用【表示已经点击完了三个下拉菜单】【直接取反也可以】，亦可以用categ3判断【点击第三个下拉菜单后的id】-->
      <el-button type="primary" icon="el-icon-s-promotion" style="margin-bottom: 20px" @click="addAttrInfoList" :disabled="!category3id">添加属性</el-button>
<!--      表格-->
      <el-table :data="attrinfolist" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="160"></el-table-column>
        <el-table-column prop="attrValueList" label="属性值列表">
          <!--要修改样式，使用插槽-->
          <template v-slot="{row,$index}"><!--row是每一行属性数据 ，attrValueList是每一个属性的一些属性值-->
            <el-tag type="success" v-for="a of row.attrValueList" style="margin-right: 10px">{{a.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="220" align="center">
          <template v-slot="{row,$index}"> <!--这里我们提前写上作用域插槽【拿到这一行属性数据】便于以后操作-->
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="setAttrValue(row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<!--    添加属性-->
    <el-card v-show="!isHidden">                <!--将表单数据收集到formdata对象中-->
      <el-form :inline="true" label-width="80px" :model="formdata">
        <el-form-item label="属性名">     <!--收集ipt内容到formdata对象的attrName属性中-->
          <el-input placeholder="属性名" v-model="formdata.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" style="margin-left: 20px" @click="addSaveAttrInfo" :disabled="!formdata.attrName">添加属性值</el-button>
      <el-button style="margin-left: 50px" @click="isHidden=true">取消</el-button>
      <!--表格依赖的数据是收集数据对象中的属性值的数组 attrValueList，-->
      <el-table :data="formdata.attrValueList" border style="width: 100%;margin: 20px 0">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="属性值名称" width="width">
          <template v-slot="{row,$index}">
            <!--row是每一行属性值数据,包括我们属性值数据的flag-->                             <!--传一个当前的这一行的属性值数据 当按下键盘回车键也会显示span-->
            <el-input v-model="row.valueName" size="mini" v-if="row.flag" @blur="iptBlur(row)" @keydown.native.enter="iptBlur(row)" ref="focusIpt"></el-input>
            <span v-else style="display: block" @click="spanIptblock(row)">{{row.valueName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template v-slot="{row,$index}">           <!--还是使用的旧版本的onConfirm点击确定后触发的事件回调，传一个要删除属性值的下标-->
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteAttrValue($index)">
              <el-button type="danger" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="saveAttrInfo" :disabled="!formdata.attrValueList.length">保存</el-button>
      <el-button>取消</el-button>

    </el-card>
  </div>
</template>

<script>
//引入lodash深拷贝cloneDeep
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data(){
    return{
      attrinfolist:[],//存服务器返回过来的数据【第三个下拉列表改变后触发】
      isHidden:true,//点击添加按钮，隐藏这个card
      //收集的信息 表单信息 【主要依据看接口参数】
      category3id:'',//第三个下拉框id
      // flag:true,//只是用一个布尔值的话，一个属性值不会受影响，多个属性值会受影响
      formdata:{
        attrName: "",//属性名
        attrValueList: [  //存多个属性值的数组【添加/修改的表格就是依赖于这个存放属性值数据】
          // {
          //   attrId: 0,  //属性id
          //   valueName: "" //属性值名称
          // }
        ],
        categoryId: 0, //三级下拉菜单id
        categoryLevel: 3, //3  为了区分几级id
      },
      selectId:{},//存三级下拉列表，三个id
    }
  },
  methods:{
    async getAttrInfoLists(selectId){//接收传过来的三个id
      this.selectId=selectId;//存一下三级下拉菜单的三个id【用于保存时，还需要发请求获取保存后的新数据】
      console.log(selectId);//这里可以拿到子组件传递过来的三个下拉菜单的id【用于发请求，拿数据】
      let selectidobj={ //与服务器参数对应
        category1Id:selectId.categ1,
        category2Id:selectId.categ2,
        category3Id:selectId.categ3
      };
      //在这里存一下第三个下拉框id
      this.category3id=selectId.categ3;

      let response=await this.$API.attr.reqAttrInfoList(selectidobj);//传一个对象过去【包含三个下拉列表信息id】
      if(response.code===200){
          this.attrinfolist=response.data;//【获取下面table应该展示的数据】
      }
    },
    //添加属性按钮
    addAttrInfoList(){  //要清空一下上次的
      this.isHidden=false;
      // this.formdata.categoryId=this.category3id;//收集三级id到添加属性的数据参数中。
      this.formdata={
        attrName: "",//属性名
          attrValueList: [  //存多个属性值的数组
        ],
          categoryId: this.category3id, //三级下拉菜单id 【这届在这里传递三级id】
          categoryLevel: 3, //3  为了区分几级id
      }

    },
    //添加属性值
    addSaveAttrInfo() {
      //向收集的formdata的attrValueList存放属性值的数组中添加对象【属性值】，table表格依赖这个数组展示
      let attrvalue = {
        //修改的时候属性值要带上已有属性的id，添加就不用了。
        // attrId: undefined,  //属性id   ，添加属性 ，还没有属性id，给服务器传一个undefined
        attrId:this.formdata.id,//添加就不会有这个id【修改才会有--已有属性--深拷贝的】添加没有row
        valueName: '' ,//属性值名称
        flag:true,//这里就只能对应控制每一个属性值【默认是编辑flag为true】
      }
      // attrvalue.attrId=this.category3id;
      this.formdata.attrValueList.push(attrvalue);
      this.$nextTick(()=>{//通常在这里面操作更新后的dom元素
        this.$refs.focusIpt.focus();
      })

    },
    //保存
    async saveAttrInfo(){
      //首先发给服务数据参数不能为空，连续点击多次添加会为空
      //发给服务器数据不能该有flag
      //最终或过滤出属性值不为空并且没有flag的数组的属性值数据对象
      let newAttrValues=this.formdata.attrValueList.filter(item=>{
        if (item.valueName!=''){//先过滤出不为空的
          delete item.flag;
          return true;
        }
      });
      this.formdata.attrValueList=newAttrValues;
      // console.log(this.formdata);
      //发请求，向服务器保存添加或修改的数据【属性/属性值】
      try {
        let response=await this.$API.attr.reqAddSaveAttrInfo(this.formdata);//向服务器传递保存的属性属性值
        if(response.code==200){
          this.$message.success('保存成功');
          this.getAttrInfoLists(this.selectId);//发请求拿保存后的数据，传入三级下拉列表id
          this.isHidden=true;//显示展示属性列表
        }
      }
    catch(err){

    }
     //  this.isHidden=true;//显示属性列表
     //  //发请求  向服务器存要添加的属性数据
     // let response= await this.$API.attr.reqAddSaveAttrInfo(this.formdata);//服务器只是拿着我们要添加的数据存储在数据库中，不会返回数据
    },
    //修改属性/属性值
    setAttrValue(row){//使用的作用域插槽，传回的row是这一行的属性级属性值的数据【对象】 ，在这里接收一些
      //首先要显示添加/修改界面
      console.log(row);
      this.isHidden=false;
      console.log(this.formdata);//【这里还没有将row这一属性以及属性值数据深拷贝过来，还是最原始的值】
      // this.formdata.attrName=row.tmName;
      // Object.assign(this.formdata,row);//这是用的浅拷贝的语法糖，原来的数据也是受影响//直接把这一行要修改的属性对象拷贝到收集的属性/属性值信息的对象中 【这样就可以展示原有的属性属性值】
      //由于数据中存在对象里面有数组，数组里面套对象，浅拷贝会相互影响，应该使用深拷贝。
      //要注意的是：{...obj}如果obj中没有数组或者对象的话【就类似于深拷贝不会相互影响数据】，如果obj中有数组或者对象【普通的数据类型不会受影响，深层的数组对象会受到影响--把地址直接拷贝了】
      //这里直接使用lodash cloneDeep【深拷贝】
      //因为是修改，要展示已有的属性值
      this.formdata=cloneDeep(row);//使用lodash深拷贝 【这里数据比较复杂】
      // for(var k in row){
      //   if(row[k] instanceof Array){
      //     this.formdata[k]=[];
      //     this.setAttrValue(row[k])
      //   }
      //   else if(row[k] instanceof Object){
      //     this.formdata.attrValueList[k]={}
      //   }
      //   else {
      //     this.formdata[k]=row[k];
      //   }
      //
      // }
      this.formdata.attrValueList.forEach(item=>{//如果在深拷贝之前遍历属性值数组的还，这时还没有将row中的属性的所有数据（包括属性值）深拷贝到响应对象中，所以这时还没有item，更不可能往每个属性值中添加属性。
        // item.flag=false;//默认是查看模式 【】
        // item.flag=false;//这里已经给每个属性值新添加了flag属性，默认为查看模式所以值为false，【因为是在响应对象中（data中的数据）后期新加的数据，vue检测不到，就不是响应式的数据，就不是数据变页面变】，所以要使用$set将后期在响应对象中新加的数据设成响应式的。
        this.$set(item,'flag',false);//修改默认是参看，flag是false
      });
    },
    iptBlur(row){
      //还有就是，存属性值的数组中，新添【正在添加的属性值】不能和已有属性值重名
      //【注意】：这里使用遍历的时候，因为点击添加属性值，已经把这个属性值的对象添加到了数组中，【如果判断的话是否有的话，就有排除正在添加的这个数据对象--不然就一直是true】
      let isRepeat=this.formdata.attrValueList.some(item=>{//【有一个满足条件就是true，会返回一个布尔值】
        if(row!=item){//数组中item每个对象会包含row正在添加的属性值，所以要排除自己【正在/刚添加的属性值对象】
          return row.valueName==item.valueName;//除了自己的名，前面只要有一个与刚添加这个属性值对象名重复，就满足条件【整个就会返回true】
        }    //【注意：条件不能只写一个等于】
      });
      //与前面属性值有重复
      // console.log(isRepeat);
      if(isRepeat){
        this.$message.info('该属性值已存在')
        return;//有重复，直接结束函数，不走下面判断是否为空了
      };
      //input中的空的属性值不允许显示span
      if (row.valueName.trim()){//如果有，不会空就允许变为span展示input中的属性值内容
        row.flag=false;
      }
      else {
        this.$message.info('属性值为空');
        return;
      }
      // if (isRepeat)return;//结束整个
      // row.flag=false;
    },
    spanIptblock(row){//点击span，转修改模式，自动获取焦点
      row.flag=true;
      this.$nextTick(()=>{
        this.$refs.focusIpt.focus();
      })
    },
    //添加/修改编辑面，删除删除属性值
    deleteAttrValue(index){
      this.formdata.attrValueList.splice(index,1);//作用域插槽返回的下标，就是当前点击删除按钮，要删除的属性值，这里没有接口，直接修改响应数据即可。
    }
  },
  // watch:{
  //   isHidden(){
  //     // console.log(this.$refs);//空 【因为点击修改，默认是查看模式，ipt框v-if为false还没有此dom】 ，页面的重绘和重排是耗时间的，当为false添加修改部分展示的时候，重排一个ipt会耗费时间，不能直接就获得组件dom。
  //     this.$nextTick(()=>{
  //       console.log(this.$refs);//因为点击修改默认我们设定的是查看模式
  //     })
  //   }
  // }
}
</script>

<style scoped>

</style>
