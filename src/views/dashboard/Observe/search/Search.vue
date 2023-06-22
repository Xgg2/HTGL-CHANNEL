<template>
  <div>
    <el-card>
      <div slot="header" class="footer-search-box">
        <span>线上热门搜索</span>
<!--        下拉栏-->
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more icon-i"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12"> <LineCarts title="搜索用户数" num="123214" n="17.1" :lineCartsData="[90,110,80,170,50,201,21,30,50,101]" color="#20a0ff">
<!--            插入svg到子组件具名插槽对应位置-->
            <template slot="svg"><svg t="1687162688324" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6822" width="20" height="20"><path d="M723.25455957 590.56708997c18.04012654 18.87399937 5.28797393 51.17131722-20.21633121 51.17131724l-382.48322394 0c-25.50430513 0-38.25645774-32.29731787-20.21633121-51.17131724l81.27209205-85.01435051 109.9695199-115.05411031c11.16576039-11.67421947 29.26690202-11.67421947 40.43266242 0l109.96951995 115.05411031 81.27209204 85.01435051z" fill="#d81e06" p-id="6823"></path></svg></template>
          </LineCarts></el-col>
          <el-col :span="12"> <LineCarts title="人均搜索次数" num="2.7" n="21.2" :lineCartsData="[190,40,230,70,150,101,21,130,150,30]" color="palevioletred">
<!--            使用具名插槽插入svg到子组件对应插槽名的位置-->
            <template slot="svg">
              <svg t="1687164260227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7329" width="20" height="20"><path d="M300.74544043 433.43291003c-18.04012654-18.87399937-5.28797393-51.17131722 20.21633121-51.17131724l382.48322394 0c25.50430513 0 38.25645774 32.29731787 20.21633121 51.17131724l-81.27209205 85.01435051-109.9695199 115.05411031c-11.16576039 11.67421947-29.26690202 11.67421947-40.43266242 0l-109.96951995-115.05411031-81.27209204-85.01435051z" fill="#1afa29" p-id="7330"></path></svg>
            </template>
          </LineCarts></el-col>
        </el-row>
      </div>
<!--      表格-->
      <el-table :data="tableData" border style="width: 100%;margin-top: 5px">
        <el-table-column type="index" label="排名" width="80"></el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180"></el-table-column>
        <el-table-column prop="address" label="用户数" sortable></el-table-column>
        <el-table-column prop="address" label="周涨幅" sortable></el-table-column>
      </el-table>
      <!--    分页器-->
      <el-pagination
        style="text-align: center"
        layout="prev, pager, next"
        :total="99">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
//折线图组件
import LineCarts from "@/views/dashboard/Observe/search/LineCarts/LineCarts";
export default {
  name: "Search",
  data(){
    return{
      tableData:[{}]
    }
  },
  components:{
    LineCarts
  }
}
</script>

<style scoped>
.footer-search-box{
  position: relative;
}
.icon-i{
 margin-left: 520px;
}
</style>
