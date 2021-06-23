const UserRoutes = [
  {
    path: '/login',
    hidden: true,
    name: 'login',
    meta: {
      title: 'login-page',
      icon: 'el-icon-share'
    },
    component: () => import('@/views/Login')
  },
  {
    path: '/forget',
    hidden: true,
    name: 'forget',
    meta: {
      title: 'forget-page',
      icon: 'el-icon-edit'
    },
    component: () => import('@/views/Forget')
  },
  {
    path: '/register',
    hidden: true,
    name: 'register',
    meta: {
      title: 'register-page',
      icon: 'el-icon-edit'
    },
    component: () => import('@/views/Register')
  }
]

export default UserRoutes
