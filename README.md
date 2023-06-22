# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template


**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

<p align="center">
  <b>SPONSORED BY</b>
</p>
<p align="center">
   <a href="https://finclip.com?from=vue_element" title="FinClip" target="_blank">
      <img height="200px" src="https://gitee.com/panjiachen/gitee-cdn/raw/master/vue%E8%B5%9E%E5%8A%A9.png" title="FinClip">
   </a>
</p>

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Browsers support

Modern browsers and Internet Explorer 10+.
 [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen

###后台管理系统是什么？
购物平台前台，针对于用户，而商品从哪来？让卖家操作数据库？
所以卖家就要有一套后台管理系统，卖家可以从中上架商品。【可视化操作数据库，增删改查】
卖家：老板【产品上架，产品下架，查看员工业绩】，员工【查看个人业绩】。
后台管理系统：可以让用户通过可视化工具，实现对数据库增删改查，且不同的角色操作内容不同，一般不需要注册功能。

### 克隆模板
git clone https://github.com/PanJiaChen/vue-admin-template.git 
--npm install     安装依赖
--npm run dev  运行服务器【这里报错了，原因是nodejs版本太高使用nvm切换nodejs版本】

###模板介绍
build
--------文件夹中的 index.js webpack配置文件【很少修改这个文件】
mock文件夹 ：
--------模拟一些假数据。【因为实际开发中利用的是真实的接口】
node_modules：
--------项目依赖模块。
public：
--------静态页面，ioc图标，经常放一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，会原封不动的打包到dist文件夹中。
src
--------程序员代码的地方
api ：请求axios的二次封装
assets：静态资源文件（共用的），打包时webpack会编译
components：非路由组件
icons：矢量图标
layout：组件 ，混入（相同的地方）
router：路由的配置文件，路由组件，一级路由组件下的二级路由组件（每一个一级路由组件如果有多个二级路由组件会重定向一个二级路由组件）
store：vuex仓库
utils：放一些工具文件   创建axios、拦截器 ，cookie  
views：路由组件
App：跟组件
main.js：入口文件
permission.js：路由守卫
settings.js配置文件

tests测试文件
.editorconfig编程风格配置文件

webpack配置文件
-----.env.development   开发环境配置文件  
-----.env.production   上线环境配置文件
-----.env.staging  测试环境配置文件

.eslintignore 忽略文件
.eslintrc.js 配置文件
.gitignore git忽略文件
.yml 语言以及开发环境版本
babel配置文件
jest测试框架配置文件
jsconfig.json src别名文件
版权声明文件
package.json 版本号 依赖
postcss.config.js  css配置文件
vue.config.js 可以看作webpack.config.js


###登录业务
静态页面
分析
将mock的假数据换成真实接口数据
可以使用async代替里面的promise处理请求
配置脚手架代理代理（解决跨域）

###路由搭建
首页
权限管理 --先不写这个
商品管理 【品牌管理，平台属性管理，Spu管理，Sku管理】

###品牌管理静态组件
按钮组件
表格组件
分页组件
element-ui的使用，一些属性参考官网对应组件文档

### 品牌列表展示
/admin/product/baseTrademark/{page}/{limit}  
参数：当前页码数 ，每一页展示的商品数
统一将请求放到Vue的原型对象上。
【问题】：由于baseURL会自动添加一个默认路径 /dev-api在每一个请求的地址中 ，我们可以通过它走代理【登陆请求拿token】端口5170
而这个product请求的地址端口与上面的不同，端口8510，所以就要重新配置一个代理。
在配置这个代理的时候反复出现问题，就是404不成功，新代理路径名或两个加起来【默认+新代理路径】以及替换路径反复尝试。【在预览中path一直没有/dev-api 分明替换了/api1却一直有/api1】
最后原来由于正则匹配，路径中也有默认路径，一直走的登陆那个端口的代理，上面的代理会把/dev-api替换掉，所以每次请求预览的path中都有/api1却没有/dev-api。
解决方式：将新的代理放到前面【优先】。
1、在配置代理的时候要注意优先级的问题，2、baseURL这个默认地址路径会自动放到最前面。


因为要在挂载的时候获取数据，在点击分页器也要重新把当前页以及每一页展示的数量重新发请求传递给服务器。【所以就要把发请求封装到methods中】使用就直接调用。

组件中作用域插槽接收的数据名是固定写法
分页器组件中的两个自定义事件【已经封装好的】一个切换当前页回调函数会接收一个当前页码，一个是切换每一个的商品数【此回调函数会接收一个当前每一个展示的数量】
组件内发请求拿数据，存数据，展示数据


###添加与修改品牌静态组件
使用Dialog对话框组件  ,上传图片组件
 
###添加品牌
收集表单数据
发请求 【添加】【上传】【修改】
POST /admin/product/baseTrademark/save  添加 【不用传id】
PUT /admin/product/baseTrademark/update  修改  【传要修改的品牌id】
POST /admin/product/fileUpload  上传   action中 不能直接访问服务器，走脚手架代理 /dev-api/api1  ，服务器会响应一个图片存入服务器后的地址。如果上传成功的话【会触发一个成功的回调函数，参数可以接收到图片存入服务器的地址】

###修改品牌

表格中修改按钮利用作用域插槽【row】会带有id，会拿到每一行的品牌信息【对象】，修改时展示到会话框中，如果直接赋值给formdata，在我们修改会话框数据时，formdata收集到，因为地址相同，表格对应品牌展示也会被修改。
根据id判断用户是点击修改品牌，发请求【请求中已经根据id判断了是修改的请求还是添加的请求】

###表单验证
element-ui表单验证form

:rules="rule"属性

rule就是这个表单的校验放在data中的对象
每一个表单元素对应的所有校验放在数组【数组属性名是校验的字段/内容】中【每一条校验写在数组对象中】
el-form-item组件的prop属性中写对应组件中表单元素的字段/内容【收集的】
可以通过ref选中表单组件，validate方法回调中会得到表单校验的结果【所有校验成功就是true】

饿了么还提供了自定义校验规则。【重点】


###删除品牌的操作
使用弹窗组件，点击品牌的删除按钮，将row【作用域插槽拿的，包含品牌的信息】，传递给回调函数，发请求传参，服务器操作数据库删除品牌

###【平台属性管理】三级下拉菜单静态
card卡片组件
三级联动组件【因为多处使用】，就直接封装成全局组件
使用form组件的inline行内组件

###动态展示三级下拉菜单
GET /admin/product/getCategory1    获取以及下拉列表数据
GET /admin/product/getCategory2/{category1Id}   通过一级下拉列表数据的id，获取二级下拉菜单的数据
GET /admin/product/getCategory3/{category2Id}   通过二级下拉列表数据的id，获取三级下拉菜单的数据

element-ui组件中的change事件是团队封装好的，不是原生事件，不需要加.native

展示出三级下拉菜单数据以后，如果再次点击一级菜单或二级菜单，就不应该展示以前的数据【二级或三级】
 使用change与click.native区别 ，当已经有三级下拉列表数据时，再次点击相同的一级下拉列表【change 后面的二三级不会被清空】【click.native后面的二三级会被清空】

###三级联动发请求 获取下面的数据

GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

Selectlist子组件收集好三个下拉列表id后需要传递给父组件【触发子组件自定义事件回调，父组件发请求拿数据】父组件展示数据。

###平台属管理动态展示属性【数据】
表格组件中每一个el-table-column组件，表示一列【会展示一列数据】
表格组件作用域插槽v-slot="{row}"，就表示每一行数据【这一行数据（对象）】

###添加属性和修改属性静态
v-show加一个isHidden数据【布尔】，控制el-card表格与el-card添加属性的显示与隐藏，
自定义属性isHidden传给子组件props接收，根据isHidden给下拉菜单相应的disabled【当isHidden为true的时候，就不能禁用所以为false，否则就是true】

###收集属性名
属性：颜色
属性值：红色，远峰蓝，绿色，粉色
【添加属性属性值】POST /admin/product/saveAttrInfo

element-ui输入框自动获取不到焦点，只能输入一个字   ，【利用作用域插槽row】
【关于传给服务器参数】如果我们这里没有这个参数的数据，就传一个undefined给服务器 【很少】

###返回按钮数据回显
点击添加属性按钮，清除一下formdata所添加的未保存的属性。

###修改属性操作

当点击修改按钮，把当前点击的属性以及属性值，在添加/修改页面中显示出来。
当要把某一个复杂对象【对象中有数组数组中有对象】赋值给另一个对象的时候【不能够让两者相互影响】，可以使用深拷贝--递归，也可以使用lodash的cloneDeep深拷贝。

###查看模式与修改切换模式
属性id就是每一个属性值的attrId
修改的时候属性值要带上已有属性的id，添加就不用了。

添加属性值 ，input框点失去焦点就隐藏，显示span【ipt框中的内容】，再点击span就会显示input框【span隐藏】：这里的问题是添加的属性值可能不只有一个，如果使用一个布尔变量控制的话，多个属性值就会都受影响。
这里如果添加为空就显示不了input了【失去焦点可以判断一下为不为空】

###点击修改按钮 input的修改与查看
响应式对象添加属性【新】的时候，vue检测不到，不会有getter与setter，不是响应式的数据【新】，就不是数据变页面变。
data(){
  return{
    obj:{
      number:'',//像这种已经有的对其再次修改，就是响应式的，不用使用$set
    }
  }
}
//
data(){
  return{
    obj:{
      n:'',//像这种已经有的对其再次修改，就是响应式的，不用使用$set
    }
  }
}
this.obj.n=20;//是响应式的
this.obj.num=200;//新添的【原响应式对象中没有】，此属性就不是响应式的【需要这样 this.$set(this.obj,'num',200);这样该属性就是响应式的了】

###表单元素自动获取焦点
watch使用$ref选中组件或元素，为undefined
【因为点击修改，默认是查看模式，ipt框v-if为false还没有此dom】 ，页面的重绘和重排是耗时间的，当为false添加修改部分展示的时候，重排一个ipt会耗费时间【耗时】，不能直接就获得组件dom【input框】。

每个input组件ref的值应该不同，可以使用$index

使用$nextTick操作更新后的dom

###删除属性值操作
注意element-ui的版本
饿了么气泡确认框
这里不需要发请求，只是添加修改这里编辑页，展示的操作。
【注意】：在组件中插入html解构【别的组件时】，要使用插槽。

###保存
保存添加的属性属性值或修改的

###三级联动的可操作性
三级联动按钮 当切换为添加/修改模式时，三级联动就是禁止使用【父传子数据】根据isHidden【为false时】判断是否是添加/修改模式
保存按钮：如果属性值长度为0，就是禁止保存。


###【spu管理模块】spu路由组件
spu大类：他有一些实例对象【sku】
###spu静态
在组件中添加结构,使用插槽template
###动态展示spu列表
GET /admin/product/{page}/{limit}

回顾$attrs 封装Hintbutton全局组件，title展示。

父组件中也可以使用 title="名称"【字符串类型的】 给子组件传递数据，子组件props接收

###spu管理内容切换
列表数据展示
spu添加/spu修改
sku添加
【这种不是两个场景切换】：可以使用数字或字符【不用布尔值】

###spuform静态
<el-form>中嵌套每一个 <el-form-item>里面放一些组件
###SpuForm请求业务分析
【添加 修改】
点击修改【按钮】：传一个点击这一行的数据对象
请求：品牌列表【下拉框】
     获取平台中全部的销售属性【最多三个 颜色 版本 尺寸】 【下拉框】
     获取某一个spu的id【spu信息】
     获取spu图片
要在展示spucard组件时发请求：
    我们使用的v-show，如果在Spucard组件mounted钩子中发请求，整个spu路由组件挂载的时候Spucard组件mounted钩子就会被调用【只是Spucard这个组件隐藏了】，所以这里不适用。
      （1）使用父组件给Spucard子组件传递一个scene场景值，子组件监听scene的变化，并且当scene为1的时候【就是点击了添加或修改spu】，就可以发请求
      （2）【使用ref获取子组件】父组件通过ref获取子组件，就可以在父组件中获取的子组件的数据，以及方法。可以在点击添加或修改Spu回调哈数中调用子组件发请求的函数，并且父组件还可以传递点击这一行的数据row，发送给子组件。【props是可以父组件传一个函数给子组件，子组件接收这个函数，并且可以以实参的方式传递数据给父元素】
       

###发请求获取SpuForm数据展示

###数据的收集
点击修改，服务器返回的数据，我们会存到data中【赋值给响应式数据】，在我们收集数据的时候，就可以收集到服务器返回给我们的对象中。
点击添加，数据收集到哪里，有一个保存的接口，收集的数据依照接口发送给服务器的参数【与修改时发请求获取服务器spu基本信息的数据对象参数一致--只是添加不需要id】。
添加直接是收集到spuInfo对象没有id，修改，发情求，服务器返回数据赋值给spuInfo带有id【不管是添加还是修改数据都是收集到spuInfo里面】
````flow js
//添加保存发给服务器的参数，收集进的对象
 let obj = {
            category3Id: 0,
            description: "string",
            id: 0,
            spuImageList: [
                {
                    id: 0,
                    imgName: "string",
                    imgUrl: "string",
                    spuId: 0
                }
            ],
            spuName: "string",
            spuSaleAttrList: [
                {
                    baseSaleAttrId: 0,
                    id: 0,
                    saleAttrName: "string",
                    spuId: 0,
                    spuSaleAttrValueList: [
                        {
                            baseSaleAttrI: 0,
                            id: 0,
                            isChecked: "string",
                            saleAttrName: "string",
                            saleAttrValueName: "string",
                            spuId: 0
                        }
                    ]
                }
            ],
            tmId: 0
        }
````
【下拉框组件】
el-select组件使用 v-model指定收集信息存放的地方
el-option组件使用 :label指定v-for遍历出来的每一个下拉框展示的内容 ，
:value指定收集具体什么信息到【信息存放的地方】

【上传组件】
:on-preview="handlePictureCardPreview"	点击文件列表中已上传的文件时的钩子	function(file)
:on-remove="handleRemove"  文件列表移除文件时的钩子	function(file, fileList)
action  图片发送到的地址【存的地址】
:file-list 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] ，对象属性名只能是name，url【我们服务器返回的数据名字是imgName imgUrl】

###销售属性数据展示
一共三个销售属性：颜色 尺码 版本
表格展示部分
spuInfo当前spu信息里面，有当前spu的已有的销售属性【包括其销售属性的属性值】
点击修改时，我们还发请求，服务器返回一个总共的销售属性【3个】
【展示已有销售属性列表】

spu销售属性下拉列表所展示的数据，是根据spuInfo中已有的销售属性，所展示的【有了，下面表格展示了，下拉列表中就不用展示了】

###照片墙图片的收集
照片墙何时收集数据
--预览照片的时候【显示大图】，不需要收集，只是查看已有的数据【图片】

--删除图片 :on-remove="handleRemove" 需要收集数据
--添加图片  :on-success="handleAvatarSuccess" 添加成功时需要收集数据

【注意每一个图片数据对象中】

###销售属性的添加操作

点击下拉列表，让表格所依赖数据添加一个对象【所点击的销售属性的数据放进去】
inputVisible:false 不管是已有的销售属性，还是要添加的销售属性，每一个销售属性都有，控制每一个添加销售属性值的输入框的显示与隐藏
  
添加销售属性属性值

【销售属性】数据收集：
baseSaleAttrId:1  销售属性id
saleAttrName:"颜色" 销售属性名
spuSaleAttrValueList:Array[2]  销售属性值
【什么时候收集数据】
点击添加销售属性按钮时收集到spuIn的销售属数组中

###删除销售属性 销售属性值
利用v-for的index【销售属性值的下标】
利用作用域插槽的$index这一行的下标【销售属性的下标】

###完成修改spu保存
【注意】：保存按钮可能是修改spu的保存按钮，也可能是添加spu的保存按钮【可以根据调用函数时传递的参数】
POST /admin/product/saveSpuInfo  添加spu接口 spu没有id，不用带id
POST /admin/product/updateSpuInfo  更新spu接口【修改】 spu有id ，带上id 
【两个接口参数都是一样的】

【修改保存发给服务器的参数】
三级分类id 【点击修改按钮发请求时，服务器返回的--一整个spuInfo里面有】
名称服务器返回的
描述服务器返回的
收集品牌id
图片整理收集【name url删掉】
销售属性【inputVisible删掉】

###添加spu
点击添加spu按钮需要发请求的【获取品牌数据，全部销售属性数据】
需要三级分类id

【清空数据】--前提是初始的数据是空的：小操作  Object.assign(this._data,this.$options.data());  调用一次此组件data函数式中的数据【初始的/空的】，赋值/拷贝给已经有数据的data中的每个数据。【因为我们data中数据写的初始值是空字符串（后期请求赋值才会有新的值），所以使用浅拷贝语法糖，把后面的data初始值赋值给data中的值（已有的值--data函数中的值就等于实例身上的_data中的数据）】 
vm.$options.data() 用于当前 Vue 实例（或组件实例）的初始化选项【就是data中我们写的初始的值（不是后期请求等二次赋值的值）】
就不用挨个数据清空了。

###删除spu
DELETE /admin/product/deleteSpu/{spuId}

###sku静态
###获取skuCard数据

GET /admin/product/spuImageList/{spuId}   获取spu图片
GET /admin/product/spuSaleAttrList/{spuId}  获取销售属性接口
GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   获取平台属性

###展示sku与收集sku数据
添加sku的时候，就是相当于给spu这个大类添加小的实例对象。
```flow js

let obj={
  "category3Id": 0,
  "createTime": "2023-06-12T12:31:53.033Z",
  "id": 0,
  "isSale": 0,
  "price": 0,
  "skuAttrValueList": [
    {
      "attrId": 0,
      "attrName": "string",
      "id": 0,
      "skuId": 0,
      "valueId": 0,
      "valueName": "string"
    }
  ],
  "skuDefaultImg": "string",
  "skuDesc": "string",
  "skuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "isDefault": "string",
      "skuId": 0,
      "spuImgId": 0
    }
  ],
  "skuName": "string",
  "skuSaleAttrValueList": [
    {
      "id": 0,
      "saleAttrId": 0,
      "saleAttrName": "string",
      "saleAttrValueId": 0,
      "saleAttrValueName": "string",
      "skuId": 0,
      "spuId": 0
    }
  ],
  "spuId": 0,
  "tmId": 0,
  "weight": "string"
}
```
这里不是用的el-form的 :data="" 指定数据收集到的对象
我们利用双向绑定 收集到skuInfo

【三级分类组件】--根据父组件传递的数据【父组件一上来的界面（显示）】，三级分类应该解除禁用 ，其他小组件显示时【添加1或修改attr，或添加修改spu以及添加sku】，三级分类就要禁用
父元素不同控制场景的值传给三级分类组件的使用相同的自定义属性【这里都是用的isHidden自定义属性名】--attr组件传的是isHidden【:isHidden="!isHidden"】  --spu组件传的是scene【:isHidden="scene!=0"】   ,都在传的时候进行处理【使用逻辑运算符】。


###表格展示数据 与收集数据
默认图片 服务器返回过来的图片列表的数据，我们给每一条新增一条数据isDefault默认为0
不要直接操作【修改】服务器的数据【请求时，服务器返回的数据不要直接修改，例如直接添加数据】

###添加sku 
POST /admin/product/saveSkuInfo    
整理收集的数据

###SKU列表的展示
GET /admin/product/findBySpuId/{spuId}
使用dialog嵌套表格的自定义对话框

当已经查看了一个spu的sku列表时，关闭以后，再点击另一个spu的sku列表查看时，会有上一个sku列表的数据回显


###loading效果
v-loading="loading" 加上这个  loading是一个布尔值

使用一次loading动画就没有了

###sku路由组件部分
GET /admin/product/list/{page}/{limit}

###sku商品上架与下架
每一个slu对象中都有一个isSlale字段，控制上架还是下架 【0是下架，1是上架】
GET /admin/product/onSale/{skuId}      上架
GET /admin/product/cancelSale/{skuId}  下架

###抽屉展示sku详细信息

###深度选择器
css  >>>
less /deep/
sass v-deep

###数据可视化
2D 3D
计算机图形学:操作系统,工程制图CAD,计算机动画PS/AE,计算机游戏,虚拟显示VR,数据可视化.
典型应用:Excel,流程图, 数据大屏,数据报表,地图

数据可视化技术:Echarts ,d3 ,three.js ,Highcharts ,AntV ,zrender   
【WebGL ,HTML ,Svg ,Canvas】--数据可视化技术底层技术  
【Skia,OpenGL】--数据可视化浏览器底层

把庞大复杂的数据转化成图标，便于查看

###首页
Layout 布局 组件
响应式布局可以使用el-row与el-col
24个为一栏 下面这个就是四栏  ，每一块之间的距离
<el-row :gutter="10"> 
  <el-col :span="6"></el-col>
  <el-col :span="6"></el-col>
  <el-col :span="6"></el-col>
  <el-col :span="6"></el-col>
</el-row>

点击销售额，展示销售额相关的可视化数据
点击访问量，展示访问量相关的可视化数据

根据收集的activeName数据【sale  visit】，判断是切换的销售还是访问 【使用计算属性，拿已有的数据进行计算】

使用dayjs处理日期时间

使用el-row与el-col分块

###mock模拟sale与visit可视化视图的数据【问题】
404问题：【先】写了一个json的数据文件，导入到mock的js文件中，使用Mock.mock()配置了请求的路径以及请求返回的数据。
        创建了一个mock的axios请求实例，设置默认baseURL路径为'/mock' 对外暴露mock的axios实例，请求函数调用后返回mock的axios实例发请求
        '/mock'这个默认路径就不用写了，写上配置mock的请求路径/mock后面的，组件挂载发请求，这里一直404，【修改mock的axios实例的请求method方式-404】
【后】：依据作者mock数据的方式，导入json数据文件，写在data中
```flow js
//mock-server.js文件中
// for mock server 
const responseFake = (url, type, respond) => {
  return {//mock数据就不能使用原始的这个了VUE_APP_BASE_API【会找真实的服务器要数据】
    url: new RegExp(`${process.env.VUE_APP_MOCK_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}
```
env.development   开发环境配置文件 ，配置此开发环境下mock请求的默认url '/mock-api'   VUE_APP_MOCK_API='/mock-api'
在vue.config.js配置 devServer 中的after配置项【没有使用before】，导入的是mock-server.js文件，让请求可以正常访问mock地址
重写mock请求的axios实例，配置baseURL为 VUE_APP_MOCK_API的
500问题：
修改了mock的url的地址
修改了mock的axios请求中的url地址

###权限管理
权限角色
admin 超级管理员  【查看员工信息，可以添加员工--姓名、用户名、密码，查询员工信息，修改员工信息，设置员工角色，删除/批量删除员工信息】
角色管理（BOSS 运维 销售 程序员 技术总监 产品经理 测试） 【查询角色，添加角色，给角色分配权限，修改角色信息，删除角色】 不同的角色，可以看到以及操作的地方是不一样的。

【用户管理】
【角色管理】
【菜单管理】
这里主要是已权限业务为主。

超级管理员：首页 权限模块 商品模块
不普通用户：首页

###
现在不管是超级管理员 还是普通用户所展示的都是一样的【目前的路由是写s的】
路由可以根据不同的用户角色展示不同的路由菜单？
不同的用户登录的时候会向服务器发请求，服务器会把用户相应的菜单的权限信息，返回给我们，我们可以根据服务器返回的数据【信息】，可以动态设置路由，可以根据不同的用户展示不同的菜单。
登录后获取用户信息的请求，会获取服务器返回的用户信息【用户名，roles用户角色，用户头像 ，routes【不同用户可以展示的】 ，buttons【不同用户按钮的使用】】

admin 用户 所有
平台管理员  'User', 'Spu', 'Trademark', 'Sku', 'Attr'
普通 空 

【路由菜单权限】
【项目路由配置拆分】
常量路由：不管是什么角色的用户都可以看到的路由   【登录、首页 、404】
异步路由：不同的用户角色需要过滤筛选出不同的路由  【权限、商品】
任意路由：404

拿着服务器返回过来的routes菜单权限与异步路由的名查找过滤 【要注意异步路由中的路由name要与服务器返回的routes的名字一致--不要出现大小写不一致问题】
【按钮权限】
根据服务器返回的数据buttons【角色对应的按钮权限】，使用v-show在服务器返回的按钮权限的数组中查找此按钮是否有【indexOf()】，有就显示此按钮，没有就隐藏此按钮
以test1 test2 test3测试按钮为例，BOSS这个角色在服务器返回的buttons按钮权限的数据中，有'btn.Add1' 'btn.Add2' 'btn.Add3' ，在buttonsindexOf()可以查找到，v-show按钮就可以显示
普通管理员，buttons只有'btn.Add1' ，所以indexOf() 查找到'btn.Add1'只有测试按钮1会显示，其他的查找不到为false，就会隐藏。