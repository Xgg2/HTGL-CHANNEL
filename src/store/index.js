import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import saleVc from "@/store/modules/sale";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {//vuex的模块化
    app,
    settings,
    user,
    saleVc
  },
  getters
})

export default store
