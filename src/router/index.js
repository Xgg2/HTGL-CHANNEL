import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import user from "@/store/modules/user";
import list from "@/views/acl/user/list";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',//设置二级路由组件的重定向
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

]
//异步路由
export let asyncRouters=[
  {
    path: '/product',
    component: Layout,
    name:'Product',
    meta: { title: '商品管理',icon: 'el-icon-goods'},
    children: [
      {
        name:'Trademark',
        component:()=>import('@/views/product/trademark/Trademark.vue'),
        path: 'trademark',
        meta: { title: '品牌管理'}
      },
      {
        name:'Attr',
        component:()=>import('@/views/product/Attr/Attr.vue'),
        path: 'attr',
        meta: { title: '平台属性管理'}
      },
      {
        name:'Spu',
        component:()=>import('@/views/product/Spu/Spu.vue'),
        path: 'Spu',
        meta: { title: 'Spu管理'}
      },
      {
        name:'Sku',
        component:()=>import('@/views/product/Sku/Sku.vue'),
        path: 'Sku',
        meta: { title: 'Sku管理'}
      },
    ]
  },

  {
    path: '/acl',
    name:'Acl',
    component:()=>import('@/layout'),
    redirect: '/acl/user/list',
    meta: {title: '权限管理',icon:'el-icon-lock'},
    children: [
      {
        name:'User',
        path: '/acl/user/list',
        component:()=>import('@/views/acl/user/list'),
        meta: {title: '用户管理'}

      },
      {
        name:'Role',
        path: '/acl/role/list',
        component:()=>import('@/views/acl/role/list'),
        meta: {title: '角色管理'},
      },
      {
        name: 'RoleAuth',
        path: '/acl/role/auth/:id',
        component:()=>import('@/views/acl/role/roleAuth'),
        meta: {title: '角色授权'},
        hidden:true
      },
      {
        name: 'Permission',
        path: '/acl/permission/list',
        component:()=>import('@/views/acl/permission/list'),
        meta: {title: '菜单管理'}
      }
    ]
  },
  {
    path: '/test',
    name:'Test',
    component:()=>import('@/layout'),
    redirect: '/test/test1',
    meta: {title: '测试',icon: 'el-icon-s-flag'},
    children: [
      {
        name:'Test1',
        path: '/test/test1',
        component:()=>import('@/views/test/Test1'),
        meta: {title: '测试按钮1'}

      },
      {
        name:'Test2',
        path: '/test/test2',
        component:()=>import('@/views/test/Test2'),
        meta: {title: '测试按钮2'},
      },
    ]
  },
]
//任意路由
export let autoRouters=[
  // 404 page must be placed at the end !!!  重定向到404
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),//滚动条位置
  routes: constantRoutes  //引入所有路由组件配置
})

const router = createRouter()
// router.selfaddRoutes = function (params){
//   router.matcher = new Router({ mode: 'hash' }).matcher;
//   router.addRoutes(params)
// }
// router.beforeEach((to,from,next)=>{
//   next({...to,replace:true})
// })
// 设置flag，防止非权限路由，页面死循环重定向

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
