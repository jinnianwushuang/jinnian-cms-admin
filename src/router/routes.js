const routes = [
  {
    path: '/',
    component: () => import('src/pages/login/login1.vue')
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children:[
      {
        path: '',
        name:'dashboard',
       component: () => import('src/pages/dashboard/dashboard1.vue')
      },
      {
        path: 'user',
        name:'user',
       component: () => import('src/pages/user/index.vue')
      },
    ]
  },
  {
    path: '/main2',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      {path: '', component: () => import('src/pages3/Dashboard.vue')},
      {path: '/Dashboard2', component: () => import('src/pages3/Dashboard2.vue')},
      {path: '/Profile', component: () => import('src/pages3/UserProfile.vue')},
      {path: '/Map', component: () => import('src/pages3/Map.vue')},
      {path: '/MapMarker', component: () => import('src/pages3/MapMarker.vue')},
      {path: '/TreeTable', component: () => import('src/pages3/TreeTable.vue')},
      {path: '/StreetView', component: () => import('src/pages3/StreetView.vue')},
      {path: '/Cards', component: () => import('src/pages3/Cards.vue')},
      {path: '/Tables', component: () => import('src/pages3/Tables.vue')},
      {path: '/Contact', component: () => import('src/pages3/Contact.vue')},
      {path: '/Checkout', component: () => import('src/pages3/Checkout.vue')},
      {path: '/Ecommerce', component: () => import('src/pages3/ProductCatalogues.vue')},
      {path: '/Pagination', component: () => import('src/pages3/Pagination.vue')},
      {path: '/Charts', component: () => import('src/pages3/Charts.vue')},
      {path: '/Calendar', component: () => import('src/pages3/Calendar.vue')},
      {path: '/Directory', component: () => import('src/pages3/Directory.vue')},
      {path: '/Footer', component: () => import('src/pages3/Footer.vue')},
      {path: '/CardHeader', component: () => import('src/pages3/CardHeader.vue')},

      // Not completed yet
      // {path: '/Taskboard', component: () => import('src/pages3/TaskBoard.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages3/Error404.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('src/pages3/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('src/pages3/Pricing.vue')
  },

  {
    path: '/Lock',
    component: () => import('src/pages3/LockScreen.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('src/pages3/LockScreen-2.vue')
  }
]

export default routes
