export const commonRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登入',
      hidden: true,
      icon: 'Promotion',
    },
  },
  {
    path: '/404',
    component: () => import('@/layout/index.vue'),
    name: '404',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
          title: '404',
          hidden: true,
        },
      },
    ],
  },
]

export const authRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Home',
    allows: ['admin', 'normal'],
    meta: {
      hidden: false,
      icon: 'HomeFilled',
    },
    redirect: '/',
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        allows: ['admin', 'normal'],
        meta: {
          title: '首頁',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/users',
    component: () => import('@/layout/index.vue'),
    name: 'User',
    allows: ['admin'],
    meta: {
      title: '用戶管理',
      hidden: false,
    },
    redirect: '/users',
    children: [
      {
        path: '/users',
        component: () => import('@/views/user/auth/index.vue'),
        name: 'User',
        allows: ['admin'],
        meta: {
          title: '用戶管理',
          hidden: false,
          icon: 'User',
        },
      },
    ],
  },
  {
    path: '/products',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    allows: ['admin'],
    meta: {
      title: '商品管理',
      hidden: false,
    },
    children: [
      {
        path: '/products',
        component: () => import('@/views/product/index.vue'),
        name: 'Product',
        allows: ['admin'],
        meta: {
          title: '商品管理',
          hidden: false,
          icon: 'Goods',
        },
      },
    ],
  },
  {
    path: '/warerooms',
    component: () => import('@/layout/index.vue'),
    name: 'Wareroom',
    allows: ['admin', 'normal'],
    meta: {
      title: '倉庫管理',
      hidden: false,
      icon: 'Shop',
    },
    redirect: '/warerooms/stock',
    children: [
      {
        path: '/warerooms/restock',
        component: () => import('@/views/wareroom/restock/index.vue'),
        name: 'Restock',
        allows: ['admin', 'normal'],
        meta: {
          title: '進貨',
          hidden: false,
        },
      },
      {
        path: '/warerooms/stock',
        component: () => import('@/views/wareroom/stock/index.vue'),
        name: 'Stock',
        allows: ['admin', 'normal'],
        meta: {
          title: '庫存',
          hidden: false,
        },
      },
      {
        path: '/warerooms/delivery',
        component: () => import('@/views/wareroom/delivery/index.vue'),
        name: 'Delivery',
        allows: ['admin'],
        meta: {
          title: '出貨',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/supplier',
    component: () => import('@/layout/index.vue'),
    name: 'Supplier',
    allows: ['supplier'],
    meta: {
      hidden: false,
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/supplier',
        component: () => import('@/views/supplier/index.vue'),
        name: 'Supplier',
        allows: ['supplier'],
        meta: {
          title: '首頁',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/supplier/restock',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    allows: ['supplier'],
    meta: {
      title: '進貨管理',
      hidden: false,
      icon: 'List',
    },
    redirect: '/supplier/restock/progress',
    children: [
      {
        path: '/supplier/restock/progress',
        component: () => import('@/views/supplier/progress/index.vue'),
        name: 'Progress',
        allows: ['supplier'],
        meta: {
          title: '進貨進度',
          hidden: false,
          icon: 'List',
        },
      },
      {
        path: '/supplier/restock/order',
        component: () => import('@/views/supplier/order/index.vue'),
        name: 'Order',
        allows: ['supplier'],
        meta: {
          title: '進貨申請',
          hidden: false,
          icon: 'List',
        },
      },
    ],
  },
]
export const otherRoute = {
  path: '/:pathMatch(.*)*',
  name: 'any',
  meta: {
    title: '跳轉',
    hidden: true,
    icon: 'DataLine',
  },
  redirect: '/404',
}
