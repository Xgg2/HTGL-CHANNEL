
// import saleData from './sale.json'
const saleData=require('./sale.json')
module.exports = [
  {
    url: '/saleCarts/list',
    type: 'get',
    response: config => {
      // const items = saleData.items
      return {
        code: 20000,
        data: saleData
      }
    }
  }
]
