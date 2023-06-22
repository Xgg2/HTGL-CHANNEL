import {reqmockSaleOrVisitCartsData} from "@/api/mocksale";

let actions={
  async getMockSaleOrVisiteData({commit}){
    let response=await reqmockSaleOrVisitCartsData();
    // console.log(response);
    if(response.code==20000){
      commit('GETMOCKSALEORVISITEDATA',response.data)
    }
  }
};
let mutations={
  GETMOCKSALEORVISITEDATA(state,val){
    state.mockSaleData=val;
  }
};
let state={
  mockSaleData:{},//接收请求mock的数据
};
let getters={
  saleData(state){
    return state.mockSaleData.saledata || []
  },
  visitData(state){
    return state.mockSaleData.visitdata || []
  }
};
let saleVc={
  namespaced:true,//开启命名空间
  actions,
  mutations,
  state,
  getters
}
export default saleVc

