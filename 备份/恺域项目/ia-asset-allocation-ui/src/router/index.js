import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
export const constantRoutes = [{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () =>
    import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/marketResearch/marketResearch'
  // children: [{
  //   path: 'home',
  //   name: 'home',
  //   component: () =>
  //     import('@/views/home/index'),
  //   meta: {
  //     title: '首页',
  //     icon: 'home'
  //   },
  //   hidden: true
  // }]
}, {
  path: '/marketResearch',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '市场研究',
    icon: 'scyj'
  },
  children: [{
    path: 'marketResearch',
    name: 'marketResearch',
    component: () =>
      import('@/views/marketResearch/index'),
    meta: {
      title: '市场研究'
    }
  }]
}, {
  path: '/indexConfiguration',
  component: Layout,
  name: 'indexConfiguration',
  meta: {
    title: '指数配置',
    icon: 'zspz'
  },
  children: [{
    path: 'compoundList',
    // component: Layout,
    component: () =>
      import('@/views/indexConfiguration/compoundList/indexList/index.vue'),
    name: 'compoundList',
    meta: {
      title: '复合指数列表'
    }
  }, {
    path: 'newCompoundList',
    // component: Layout,
    component: () =>
      import('@/views/indexConfiguration/compoundList/newList/index.vue'),
    name: 'newCompoundList',
    meta: {
      title: '新增/修改复合指数',
      breadcrumb: false,
      // 高亮列表的路由
      activeMenu: '/indexConfiguration/compoundList'
    },
    // 在菜单隐藏
    hidden: true
  }, {
    path: 'schemeList',
    // component: Layout,
    component: () =>
      import('@/views/indexConfiguration/schemeList/indexList/index.vue'),
    name: 'schemeList',
    meta: {
      title: '指数方案列表'
    }
  }, {
    path: 'newSchemeList',
    // component: Layout,
    component: () =>
      import('@/views/indexConfiguration/schemeList/newList/index.vue'),
    name: 'newSchemeList',
    meta: {
      title: '新增/修改指数方案',
      breadcrumb: false,
      activeMenu: '/indexConfiguration/schemeList'
    },
    hidden: true
  }
  ]
},
// 模型配置
{
  path: '/modelConfig',
  component: Layout,
  name: 'modelConfig',
  alwaysShow: true,
  meta: {
    title: '模型配置',
    icon: 'mxpz'
  },
  children: [
    {
      path: 'modelPlanList',
      // component: Layout,
      component: () =>
        import('@/views/modelConfig/indexList/index'),
      name: 'modelPlanList',
      meta: {
        title: '模型方案列表'
      }
    },
    {
      path: 'modelPlanConfig/:operation',
      // component: Layout,
      component: () =>
        import('@/views/modelConfig/newList/index'),
      name: 'modelPlanConfig',
      meta: {
        title: '模型方案配置',
        activeMenu: '/modelConfig/modelPlanList'
      },
      hidden: true
    },
    // {
    //   path: 'modelPlanView',
    //   // component: Layout,
    //   component: () =>
    //     import('@/views/modelConfig/newList/modelPlanView/index.vue'),
    //   name: 'modelPlanView',
    //   meta: {
    //     title: '查看模型',
    //     activeMenu: '/modelConfig/modelPlanList'
    //   },
    //   hidden: true
    // },
    {
      path: 'modelingSelect',
      // component: Layout,
      component: () =>
        import('@/views/modelConfig/newList/modelingSelect/index.vue'),
      name: 'modelingSelect',
      meta: {
        title: '模型选择',
        activeMenu: '/modelConfig/modelPlanList'
      },
      hidden: true
    },
    {
      path: 'modelingParameter',
      // component: Layout,
      component: () =>
        import('@/views/modelConfig/newList/modelingParameter/index.vue'),
      name: 'modelingParameter',
      meta: {
        title: '模型参数配置',
        activeMenu: '/modelConfig/modelPlanList'
      },
      hidden: true
    },
    {
      path: 'modelingOptimized',
      // component: Layout,
      component: () => import('@/views/modelConfig/newList/modelingOptimized/index.vue'),
      // redirect: '/example/table',
      name: 'modelingOptimized',
      meta: {
        title: '模型优化结果',
        activeMenu: '/modelConfig/modelPlanList'
      },
      hidden: true
    }]
},
// 大类资产配置
{
  path: '/assets',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '大类资产配置',
    icon: 'dlzc'
  },
  name: 'assetsList',
  children: [{
    path: 'assetsList', component: () =>
      import('@/views/bigCategoriesAssets/index'),
    name: 'assetsList',
    meta: {
      title: '资产配置列表'
    }
  }]
},
// 负债端现金流
{
  path: '/liabilitiesCashFlow',
  component: Layout,
  alwaysShow: true,
  name: 'liabilitiesCashFlow',
  meta: {
    title: '负债端现金流',
    icon: 'xjl'
  },
  children: [{
    path: 'mobility',
    // component: Layout,
    component: () =>
      import('@/views/liabilitiesCashFlow/mobility/index.vue'),
    name: 'mobility',
    meta: {
      title: '流动性管理'
    }
  }
  ]
}, {
  path: '/cashFlowPlan', alwaysShow: true, component: Layout, meta: {
    title: '现金流规划', icon: 'xjlgh'
  }, children: [{
    path: 'cashFlowPlan', name: 'cashFlowPlan', component: () => import('@/views/cashFlowPlan/index'), meta: {
      title: '现金流规划'
    }
  }]
}, {
  path: '/rebalance', alwaysShow: true, component: Layout, meta: {
    title: '再平衡', icon: 'zph'
  }, children: [{
    path: 'rebalance', name: 'rebalance', component: () => import('@/views/rebalance/index'), meta: {
      title: '再平衡'
    }
  }]
},
// 存量分析 stockAnalysis
{
  path: '/stockAnalysis',
  component: Layout,
  alwaysShow: true,
  name: 'stockAnalysis',
  meta: {
    title: '存量分析',
    icon: 'clfx'
  },
  children: [{
    path: 'stockAnalysis',
    // component: Layout,
    component: () =>
      import('@/views/stockAnalysis/revenueAnalysis/index.vue'),
    name: 'revenueAnalysis',
    meta: {
      title: '规模及收益分析'
    }
  }, {
    path: 'yieldAnalysis',
    // component: Layout, yieldAnalysis
    component: () =>
      import('@/views/stockAnalysis/yieldAnalysis/index.vue'),
    name: 'yieldAnalysis',
    meta: {
      title: '固收类收益率分析'
    }
  }
  ]
},
// 调仓分析
{
  path: '/warehouseAdjustment',
  component: Layout,
  alwaysShow: true,
  name: 'warehouseAdjustment',
  meta: {
    title: '调仓分析',
    icon: 'ylcs'
  },
  children: [{
    path: 'analysis',
    // component: Layout,
    component: () =>
      import('@/views/warehouseAdjustment/analysis/index.vue'),
    name: 'simulation',
    meta: {
      title: '调仓分析'
    }
  }
  ]
},
// 压力测试
{
  path: '/stressTesting',
  component: Layout,
  alwaysShow: true,
  name: 'stressTesting',
  meta: {
    title: '压力测试',
    icon: 'ylcs'
  },
  children: [{
    path: 'scene',
    // component: Layout,
    component: () =>
      import('@/views/stressTesting/simulation/index.vue'),
    name: 'simulation',
    meta: {
      title: '情景模拟'
    }
  }
  ]
},
// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
