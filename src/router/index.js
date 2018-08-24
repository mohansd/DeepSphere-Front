import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    meta: {
      auth: true
    },
    redirect: '/overview'
  },
  {
    path: '/overview',
    component: Layout,
    redirect: 'overview/overview',
    name: 'Dashboard',
    meta: { title: '总览', icon: 'home', auth: false },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/overview/monitor'),
        meta: { title: '概览', auth: false }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/overview/overview'),
        meta: { title: '运行监控', auth: false }
      }
    ]
  },
  {
    path: '/clusters',
    component: Layout,
    redirect: 'clusters/manage',
    name: 'clusters',
    meta: { title: '集群管理', icon: 'cluster', auth: true },
    children: [
      {
        path: 'node',
        name: 'node',
        component: () => import('@/views/clusters/nodeMgr'),
        meta: { title: '节点管理', auth: true }
      },
      {
        path: 'storage',
        name: 'Storage',
        component: () => import('@/views/clusters/storageNode'),
        meta: { title: '存储节点管理', auth: true }
      },
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/clusters/manageNode'),
        meta: { title: '管理节点管理', auth: true }
      },
      {
        path: 'shelf',
        name: 'Shelf',
        component: () => import('@/views/clusters/shelfManage'),
        meta: { title: '机架管理', auth: true }
      },
      {
        path: 'pool',
        name: 'Pool',
        component: () => import('@/views/clusters/poolManage'),
        meta: { title: '数据池管理', auth: true }
      }
    ]
  },
  {
    path: '/file',
    component: Layout,
    redirect: 'file/filesystem',
    name: 'file',
    meta: { title: '文件存储管理', icon: 'file', auth: true },
    children: [
      {
        path: 'filesystem',
        name: 'FileSystem',
        component: () => import('@/views/file/fileSystem'),
        meta: { title: '文件系统管理', auth: true }
      },
      {
        path: 'nas',
        name: 'NAS',
        component: () => import('@/views/file/NAS'),
        meta: { title: 'NAS管理', auth: true }
      },
      {
        path: 'fileshare',
        name: 'FileShare',
        component: () => import('@/views/file/fileShare'),
        meta: { title: '文件共享', auth: true }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/file/userManage'),
        meta: { title: '用户管理', auth: true }
      }
    ]
  },
  {
    path: '/object',
    component: Layout,
    redirect: 'object/add',
    name: 'object',
    meta: { title: '对象存储管理', icon: 'object', auth: true },
    children: [
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/object/addNode'),
        meta: { title: '添加对象存储网关节点', auth: true }
      },
      {
        path: 'close',
        name: 'Close',
        component: () => import('@/views/object/close'),
        meta: { title: '关闭对象网关', auth: true }
      },
      {
        path: 'modify',
        name: 'Modify',
        component: () => import('@/views/object/modify'),
        meta: { title: '修改服务端口', auth: true }
      }
    ]
  },
  {
    path: '/blockdevice',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'blockdevice',
        component: () => import('@/views/blockDevice/blockDevice'),
        meta: { title: '块设备管理', icon: 'shebei', auth: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/ntp',
    name: 'System',
    meta: { title: '系统管理', icon: 'system', auth: true },
    children: [
      {
        path: 'ntp',
        name: 'NTP',
        component: () => import('@/views/system/NTP'),
        meta: { title: 'NTP设置', auth: true }
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: () => import('@/views/system/parameter'),
        meta: { title: '参数设置', auth: true }
      },
      {
        path: 'load',
        name: 'Load',
        component: () => import('@/views/system/loadBalancing'),
        meta: { title: '负载均衡设置', auth: true }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/system/log'),
        meta: { title: '日志管理', auth: true }
      },
      {
        path: 'user',
        name: 'UserSetting',
        component: () => import('@/views/system/user'),
        meta: { title: '用户设置', auth: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

