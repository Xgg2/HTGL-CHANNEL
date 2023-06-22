<template>
  <div>
<!--    按钮-->
    <el-button type="primary" class="el-icon-plus" @click="showDialog">添加</el-button>
    <div style="width: 100%;height: 40px"></div>
<!--    表格 data是表格展示的东西，数组的形式  label是标题-->
<!--
每一个el-table-column组件表示一列,可以对应展示数组中每一个数组元素【这里是对象】
-->
    <el-table :data="records" style="width:100%" :border="true">
      <el-table-column type="index" align="center" label="标题" width="80px"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <!--利用作用域插槽，参数是子组件传过来的固定写法-->
        <template v-slot="{row,$index}">
<!--          {{row}} 就是每一行品牌数据【对象】-->
          <img :src="row.logoUrl" style="width: 70px;height: 65px;">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template v-slot="{row}">  <!--使用作用域插槽，row是固定的，可以拿到每一行牌品的信息【品牌名称，图标地址，id】我们以实参的形式传给次函数的回调-->
          <el-button type="warning" icon="el-icon-edit" @click="setTradeMarkshow(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="removeTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--分页器-->
<!--
  当前页
  数据总条数
  几页
  每一页展示的数量
  连续页数
@current-change="" currentPage 改变时会触发 分页组件自定义事件 修改时触发【修改当前页时】
@size-change	pageSize 改变时会触发	每页条数
---------
current-page  ：表示当前第几页
total：表示分页器一共需要展示数据数
page-size：代表每一页展示的数据数
page-sizes：代表可以设置每一页可以展示的数据数【选项】
layout：可以实现分页器布局
pager-count：按钮的数量 如果是9 连续页码就是7
-->
    <el-pagination style="margin-top:20px;text-align:center;" :current-page="page" :pager-count="9" :total="total" :page-size="limit" :page-sizes="[3,5,10]" layout="total,sizes,prev,pager,next,jumper" @current-change="setcurrentPage" @size-change="pageSize"></el-pagination>
<!--    对话框组件-->
<!--  :visible.sync 控制对话框的显示与隐藏
    el-form组件   :model会将表单数据收集到一个对象中
    action： 图片提交的路径
-->
    <el-dialog :title="formdata.id ? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible" @keydown.native.enter="addTradeMarknew">
      <el-form :model="formdata"  :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input  autocomplete="off" style="width: 80%" v-model="formdata.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
          <!--
            :on-success="handleAvatarSuccess"   上传成功触发
            :before-upload="beforeAvatarUpload"  上传之前触发
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/api1/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formdata.logoUrl" :src="formdata.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiaoDailog">取 消</el-button>
        <el-button type="primary" @click="addTradeMarknew">确 定</el-button>
      </div>
    </el-dialog>
  </div>
<!--  弹窗组件-->
</template>

<script>
export default {
  name: "Trademark",
  data(){
    return{
      page:1,//初始的页码
      limit:4,//初始的每一个数量
      total:1,//商品中数量
      records:[],//这一页的品牌数据【数组】
      dialogFormVisible:false,
      formLabelWidth:'130px',
      // imageUrl: '',
      formdata:{
        logoUrl:'',//图片在服务器中的路径
        tmName:'',//添加的品牌名
      },
      //表单验证
      rules:{
        //收集的表单数据    required：带星星    message：校验提示    trigger：什么事件进行校验
        tmName: [//每一个校验提示都写成对象的形式
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择图片'}
        ],
      }
    }
  },
  methods:{
    //每次请求都会拿着data中的当前页码与每一页展示的数传给服务器，拿数据，再存起来。
    async getTradeMarkList(){//因为要多次发请求拿品牌列表的数据，所以封装成一个函数
      let {page,limit}=this;//出要用的当前页以及每一页的数量
      let response=await this.$API.trademark.reqProductTradeMark(page,limit);//这里报错了，可能是代理不对【代理的端口号不对】
      if(response.code===200){//请求成功
        this.total=response.data.total;
        this.records=response.data.records;
      }
      else {
        //处理请求失败
      }
    },
    setcurrentPage(page){//修改当前页  【会接收一个当前的页码】
      // console.log(page)
      this.page=page;//修改当前页
      //重新发请求，拿点击这一页的数据
      this.getTradeMarkList();
    },
    pageSize(size){//修改了每一页展示的数量触发
      // console.log(size)
      this.limit=size;
      this.getTradeMarkList();//发请求拿数据
    },
    showDialog(){//添加品牌列表 对话框显示
      //formdata中有id就清掉
      this.formdata.id='';
      this.formdata.tmName='';
      this.formdata.logoUrl='';
      this.dialogFormVisible=true;//对话框显示
    },
    //row对象里的数据是表格展示的  如果直接等于【赋值】给formdata【会话框展示数据的地方】，就会相互影响
    setTradeMarkshow(row){//修改品牌列表 【对话框显示】
      this.dialogFormVisible=true;//对话框显示
      console.log(row);
      //先把品牌信息展示到对话框上面  这里也可以使用 {...row}  开辟一个新对象把属性放进去
     for(var i in row){
       this.formdata[i]=row[i];
     }
    },
    //图片上传成功的回调
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res)//图片存入服务器后的服务器返回图片在服务器中的路径
      console.log(file)//关于图片的详细信息
      this.formdata.logoUrl=res.data;//图片在服务器中的地址，存起来 ，发请求用
    },
    //校验图片类型，及大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    quxiaoDailog(){//点击取消按钮
        this.dialogFormVisible=false;
        this.formdata={};
        this.imageUrl='';//再点击的时候，form表单不再展示上一次用户填的
    },
    //点击确定按钮
     addTradeMarknew(){
       //校验总结果  返回true【所有都校验通过】/false
      this.$refs.ruleForm.validate(async (success)=>{
        if (success){
          this.dialogFormVisible=false;//隐藏
          //发请求 向服务器数据库 添加数据【品牌】
          if(this.formdata.id){//有id说明是用户修改
            let res=await this.$API.trademark.reqAddOrSetTradeMark(this.formdata);//收集的表单信息发给服务器
            if (res.code===200){
              this.$message.success('修改成功')
              this.getTradeMarkList();//发请求拿最新的数据【修改后】
            }
            else {
              this.$message.error('修改失败');
            }
          }
          else{//用户添加品牌
            try {
              let response=await this.$API.trademark.reqAddOrSetTradeMark(this.formdata);//传递一个对象【不包含id】
              console.log(response);
              this.$message({//消息提示
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              //成功发请求展示存入品牌后的数据
              this.getTradeMarkList();
            }
            catch(err) {
              this.$message.error('添加失败');
            }
          }
        }
        else {
          return false;
        }
      })
    },
    //删除按钮弹窗
     removeTradeMark(row) {
      console.log(row);
        let confirm=this.$confirm(`是否删除${row.tmName}品牌 ？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose:false,
        // beforeClose:async (action,vc,done)=>{   //第一个参数是点击的哪个按钮 cancel【取消】    confirm【确定】//第二个参数是组件实例对象  //第三个参数是放行
        //   if(action==='confirm'){//确认删除
        //      let response=await this.$API.trademark.reqromoveTRadeMark(row.id);//将要删除的品牌id传给服务器
        //     if(response.code===200){//删除成功
        //       this.getTradeMarkList();//发请求拿删除后的数据
        //       done();//放行【关闭页面】
        //     }
        //     else {
        //       console.log('@201')
        //       done();
        //     }
        //   }
        //   else if(action==='cancel'){//取消按钮
        //     done();
        //   }
        // }
      }).then(async () => {//删除成功的回调  【点击弹窗确定的回调】
        let response=await this.$API.trademark.reqromoveTRadeMark(row.id);//向服务器发请求传递参数
          if(response.code===200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //发请求拿最新的数据
            this.getTradeMarkList();
          }
         //请求失败就直接走catch了，就不需要else了
      }).catch((res) => { //【点击弹窗取消的回调】
          // console.log(res.message);//如果点击不允许删除的品牌这里会得到失败的结果
          if(res.message=='失败'){//【没有删除成功】

          }
          else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          }
      });
       console.log(confirm);//是一个promise对象
    },
    // logrow(row){
    //   console.log(row);//row都是el-table-column组件内部通过作用域插槽返回的【返回到父组件】的每一行品牌的数据，【因为el-table-column是管一列的，所以在组件内部展示会展示出对应这一列的数据----所有品牌的这一个属性】
    // }

  },
  mounted() {
    this.getTradeMarkList();//挂载发请求
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
