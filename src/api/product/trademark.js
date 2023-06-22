import request from "@/utils/request";

export const reqProductTradeMark=(page,limit)=>{
  // 返回一个promise对象【带有状态，带有结果/数据】，baseURL的默认路径会放到最前面
  return request({url:`/api1/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
}

// POST /admin/product/baseTrademark/save  添加
// 传给服务器的参数 logoUrl: "string",    tmName: "string"  id服务器数据库会自己生成
// PUT /admin/product/baseTrademark/update  修改
//"id": 0,"logoUrl": "string","tmName": "string" 这里要传要修改的品牌id给服务器
export const reqAddOrSetTradeMark=(trademark)=>{//这里直接接收一个对象
  if(trademark.id){//有id，就表示在修改
    return request({url:'/api1/admin/product/baseTrademark/update',method:'put',data:trademark});
  }
  else {//添加品牌
    return request({url:'/api1/admin/product/baseTrademark/save',method:'post',data:trademark});//这里传数据要写在data中
  }
}

//DELETE /admin/product/baseTrademark/remove/{id}  删除品牌
export const reqromoveTRadeMark=(id)=>{
  return request({url:`/api1/admin/product/baseTrademark/remove/${id}`,method:'delete'})
}
