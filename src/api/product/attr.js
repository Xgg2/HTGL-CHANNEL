import request from "@/utils/request";
// 动态展示三级下拉菜单
// GET /admin/product/getCategory1    获取以及下拉列表数据
// GET /admin/product/getCategory2/{category1Id}   通过一级下拉列表数据的id，获取二级下拉菜单的数据
// GET /admin/product/getCategory3/{category2Id}   通过二级下拉列表数据的id，获取三级下拉菜单的数据

export const reqGetCategory1=()=>{
  return request({url:'/api1/admin/product/getCategory1',method:'get'});
}
export const reqGetCategory2=(getCategory1id)=>{
  return request({url:`/api1/admin/product/getCategory2/${getCategory1id}`,method:'get'});
}
export const reqGetCategory3=(getCategory2id)=>{
  return request({url:`/api1/admin/product/getCategory3/${getCategory2id}`,method:'get'});
}

//Attr信息列表数据
export const reqAttrInfoList=({category1Id,category2Id,category3Id})=>{//解构  【注意传递的对象属性名对不上为什么会是undefined，因为我们这里写的是category1Id传过来的对象那里属性名是categ1，找不到属性，就是undefined】【所以属性名一定要对应上】
  return request({url:`/api1/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});
}

//添加属性属性值  POST /admin/product/saveAttrInfo
export const reqAddSaveAttrInfo=(data)=>{//data就是传过来的参数
  return request({url:'/api1/admin/product/saveAttrInfo',method:'post',data});//data传参的简写  走的是/api1代理
}
//携带的参数 id是服务器生成的就不需要带
// {
//   "attrName": "string",   属性名
//   "attrValueList": [      属性值会有多个，存属性值的数组
//   {
//     "attrId": 0,          属性id ，【知道该属性值属于哪个属性】
//     "valueName": "string" 属性值名称
//   }
// ],
//   "categoryId": 0,         三级下拉菜单id
//   "categoryLevel": 0,   3  为了区分几级id
// }
