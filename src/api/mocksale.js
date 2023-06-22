import mockrequest from "@/utils/mocksale";

//mock模拟的sale 销售额与访问量的加数据请求接口
export const reqmockSaleOrVisitCartsData=()=>{
  return mockrequest.get('/saleCarts/list');//也需要请求方式
}

