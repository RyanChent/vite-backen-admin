import { RouterView } from 'vue-router'

const functional = [
  {
    path: '/functional',
    redirect: '/functional/socket',
    name: 'FunctionAl',
    meta: {
      icon: 'el-icon-setting',
      title: 'functional-component'
    },
    component: RouterView,
    children: [
      {
        path: '/functional/socket',
        name: 'SocketPage',
        meta: {
          icon: 'el-icon-phone-outline',
          title: 'socket-page',
          permission: ['admin', 'customer']
        },
        component: () => import('@/views/Socket')
      }
    ]
  }
]

export default functional
