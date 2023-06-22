import request from "@/utils/request";
// GET /admin/product/spuImageList/{spuId}   获取spu图片
export const reqSpuImageList=(spuId)=>{
  return request({url:`/api1/admin/product/spuImageList/${spuId}`,method:'get'});
}
// GET /admin/product/spuSaleAttrList/{spuId}  获取销售属性接口
export const reqSpuSaleAttrList=(spuId)=>{
  return request({url:`/api1/admin/product/spuSaleAttrList/${spuId}`,method:'get'});
}
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   获取平台属性
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>{
  return request({url:`/api1/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});
}

//POST /admin/product/saveSkuInfo
export const reqSaveSkuInfo=(skuInfo)=>{
  return request({url:'/api1/admin/product/saveSkuInfo ',method:'post',data:skuInfo})
}

// GET /admin/product/findBySpuId/{spuId}  SKU列表的展示
export const reqSkuList=(spuId)=>{
  return request({url:`/api1/admin/product/findBySpuId/${spuId}`,method:'get'});
}

//GET /admin/product/list/{page}/{limit}  sku路由组件的请求数据接口
export const reqSkuRouteListInfo=(page,limit)=>{
  return request({url:`/api1/admin/product/list/${page}/${limit}`,method:'get'});
}

//每一个slu对象中都有一个isSlale字段，控制上架还是下架 【0是下架，1是上架】
// GET /admin/product/onSale/{skuId}      上架
// GET /admin/product/cancelSale/{skuId}  下架

//上架
export const reqOnSale=(skuId)=>{
  return request({url:`/api1/admin/product/onSale/${skuId}`,method:'get'});
}
//下架
export const reqCancelSale=(skuId)=>{
  return request({url:`/api1/admin/product/cancelSale/${skuId}`,method:'get'});
}

//sku详细信息  GET /admin/product/getSkuById/{skuId}
export const reqGetSkuInfo=(skuId)=>{
  return request({url:`/api1/admin/product/getSkuById/${skuId}`,method:'get'})
}


