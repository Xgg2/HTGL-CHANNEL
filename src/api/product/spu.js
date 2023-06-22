import request from "@/utils/request";
//SPU路由组件列表接口  GET /admin/product/{page}/{limit}    page当前页 ，limit每一页的数，category3Id三级id
export const reqSpuLists=(page,limit,category3Id)=>{
  return request({method:'get',url:`/api1/admin/product/${page}/${limit}`,params:{category3Id}})
}

//SpuCard信息 GET /admin/product/getSpuById/{spuId}

export const reqSpuInfo=(spuId)=>{
  return request({method:'get',url:`/api1/admin/product/getSpuById/${spuId}`})
}
//品牌列表 GET /admin/product/baseTrademark/getTrademarkList
export const reqSpuFromTradeMarkList=()=>{
  return request({method:'get',url:'/api1/admin/product/baseTrademark/getTrademarkList'});
}
//平台中全部的销售属性 GET /admin/product/baseSaleAttrList
export const reqSaleAttrList=()=>{
  return request({method:'get',url:'/api1/admin/product/baseSaleAttrList'})
}
//获取Spu图片  GET /admin/product/spuImageList/{spuId}
export const reqImageList=(spuId)=>{
  return request({method:'get',url:`/api1/admin/product/spuImageList/${spuId}`})
}

//POST /admin/product/saveSpuInfo  添加spu接口 spu没有id，不用带id
// POST /admin/product/updateSpuInfo  更新spu接口【修改】 spu有id ，带上id
export const reqaddOrSetSpuList=(spuInfo)=>{
  if(spuInfo.id){//有id 表示更新/修改spu
    return request({url:'/api1//admin/product/updateSpuInfo',method:'post',data:spuInfo});
  }
  else {//没有id，表示添加
    return request({url:'/api1/admin/product/saveSpuInfo',method:'post',data:spuInfo});
  }
}
// DELETE /admin/product/deleteSpu/{spuId}  删除spu
export const reqDeleteSpu=(spuId)=>{
  return request({url:`/api1/admin/product/deleteSpu/${spuId}`,method:'delete'})
}

