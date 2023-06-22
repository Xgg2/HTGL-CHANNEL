import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import {constantRoutes,asyncRouters,autoRouters} from "@/router";
import router from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',//存储返回的用户名
    avatar: '',//服务器返回的一个gif图片
    roles:[],
    routes:[],
    buttons:[],
    asyncRouters:[],//存储计算出来的异步路由
    resultAllRouters:[],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息
  SET_NAME_AVATAR: (state, data) => {
    //一次性存储用户信息
    state.name = data.name;
    state.avatar=data.avatar;
    state.routes=data.routes;//菜单权限标记
    state.roles=data.roles;//角色
    state.buttons=data.buttons;//按钮权限标记
  },
  //向state中储存根据routes过滤出来的异步路由
  SET_ASYNC_ROUTERS(state,asyncRs){
    state.asyncRouters=asyncRs;//向state中存储传递过来的根据服务器返回过来的routes，过滤出的异步路由
    state.resultAllRouters=asyncRs.concat(constantRoutes,autoRouters);//拼接出总的路由
    //给路由器添加新路由
    router.addRoutes(state.resultAllRouters)
  }
}
function filterAsyncRouters(asyncR,dRoutes){
  console.log(asyncR,dRoutes);//一个是在router中引入的异步路由，一个是服务器根据用户角色返回的菜单权限
  return asyncR.filter(item=>{
    //在数组dRoutes也就是服务器返回的routes，中查找有没有路由name名的数组元素，有的话，此路由就满足条件
    if(dRoutes.indexOf(item.name)!=-1){//匹配的异步路由
      if(item.children && item.children.length){//有子路由这个属性，并且有配置子路由
        item.children=filterAsyncRouters(item.children,dRoutes);
      }
        return true
    }
  })
}
const actions = {
  // 登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;//传递的对象中，解构出用户名 密码
    // return new Promise((resolve, reject) => {
    //   //传参数发请求，then catch处理promise对象
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     //联系mutations并传过去请求过来的数据
    //     commit('SET_TOKEN', data.token)
    //     //存到本地
    //     setToken(data.token)
    //     //状态成功
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    let response=await login({username,password});
    console.log(response);
    if(response.code==20000){
      console.log(response.data);
      commit('SET_TOKEN', response.data.token)
      setToken(response.data.token);//本地持久化存储登录请求服务器返回的token
      return 'ok';//返回一个成功的promise对象到函数的调用处
    }
    else{
      return Promise.reject(new Error('err'));
    }
  },

  // 获取用户数据
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        //获取用户信息，返回的数据包含用户名，roles用户角色，用户头像 ，routes【不同用户可以展示的】 ，buttons【不同用户按钮的使用】
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        console.log(data)
        commit('SET_NAME_AVATAR', data);
        commit('SET_ASYNC_ROUTERS',filterAsyncRouters(asyncRouters,data.routes))
        console.log(response);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

