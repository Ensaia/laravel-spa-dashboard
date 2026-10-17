const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Index'),
    meta: { layout: 'home'},
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/home/Index'),
    meta: { layout: 'dashboard', auth: true, verify : true },
  },
      /**
    * Users routes
     */
  {
    path:'/dashboard/users',
    name:'users',
    component: () => import('@/views/dashboard/user/Index'),
    meta:{ layout : 'dashboard' , auth: true, verify : true },
  },
  {
    path:'/dashboard/user/:id',
    name:'userEdit',
    component: () => import('@/views/dashboard/user/Edit'),
    props:true,
    meta:{layout : 'dashboard' , auth : true, verify : true},

  },
    {
    path:'/dashboard/user/profile',
    name:'profile',
    component: () => import('@/views/dashboard/user/Profile'),
    meta:{ layout : 'dashboard' , auth: true, verify : true },
  },
  /**
   * Auth routes
   */
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login'),
    meta: { layout: 'auth', guest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register'),
    meta: { layout: 'auth', guest: true },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/views/auth/forgotPassword'),
    meta: { layout: 'auth', guest: true },
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () => import('@/views/auth/resetPassword'),
    meta: { layout: 'auth', guest: true },
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: () => import('@/views/auth/verifyEmail'),
    // meta: { layout: 'dashboard', auth: true },
    meta: { layout: 'auth', guest: true },
  },
  {
    path: '/email/verify/:id/:hash',
    name: 'verifyEmailStatus',
    component: () => import('@/views/auth/verifyEmailStatus'),
    // meta: { layout: 'dashboard', auth: true },
      meta: { layout: 'auth', guest: true },
    props:true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/404.vue'),
  },
];

export default routes;
