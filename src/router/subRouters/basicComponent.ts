import { RouterView } from 'vue-router'

const basicComponent = [
  {
    path: '/basic',
    redirect: '/basic/icons',
    name: 'Basic',
    meta: {
      icon: 'el-icon-s-home',
      title: 'basic-component'
    },
    component: RouterView,
    children: [
      {
        path: '/basic/icons',
        name: 'IconPage',
        meta: {
          icon: 'el-icon-picture-outline-round',
          title: 'icons-page',
          keepAlive: true,
          permission: ['admin', 'customer']
        },
        component: () => import('@/views/Icons')
      },
      {
        path: '/basic/dialog',
        name: 'DialogPage',
        meta: {
          icon: 'el-icon-message',
          title: 'dialogs-page',
          keepAlive: true,
          showMobile: false,
          permission: ['admin', 'customer']
        },
        component: () => import('@/views/Dialogs')
      },
      {
        path: '/basic/charts',
        name: 'ChartsPage',
        meta: {
          icon: 'el-icon-s-data',
          title: 'charts-page',
          keepAlive: true,
          permission: ['admin']
        },
        component: () => import('@/views/Echarts')
      },
      {
        path: '/basic/form',
        name: 'FormPage',
        meta: {
          icon: 'el-icon-s-claim',
          title: 'form-page'
        },
        component: () => import('@/views/Form')
      },
      {
        path: '/basic/editor',
        name: 'EditorPage',
        meta: {
          icon: 'el-icon-edit',
          title: 'editor-page',
          permission: ['admin']
        },
        component: () => import('@/views/Editor')
      },
      {
        path: '/basic/table',
        name: 'TablePage',
        meta: {
          title: 'table-page',
          icon: 'el-icon-notebook-1',
          permission: ['admin', 'customer']
        },
        component: () => import('@/views/Table')
      },
      {
        path: '/basic/upload',
        name: 'UploadPage',
        meta: {
          title: 'upload-page',
          icon: 'el-icon-upload',
          permission: ['admin', 'customer']
        },
        component: () => import('@/views/Upload')
      },
      {
        path: '/basic/steps',
        name: 'StepsPage',
        meta: {
          title: 'steps-page',
          icon: 'el-icon-s-order',
          permission: ['admin', 'customer']
        },
        component: () => import('@/views/Steps')
      },
      {
        path: '/basic/tree',
        name: 'TreePage',
        meta: {
          title: 'tree-page',
          icon: 'el-icon-collection-tag',
          showMobile: false
        },
        component: () => import('@/views/Tree')
      },
      {
        path: '/basic/json',
        name: 'ObjectPage',
        meta: {
          title: 'json-page',
          icon: 'el-icon-notebook-2',
          permission: ['admin'],
          showMobile: false
        },
        redirect: '/basic/json/object',
        component: RouterView,
        children: [
          {
            path: '/basic/json/object',
            name: 'JsonPage',
            meta: {
              title: 'object-page',
              icon: 'el-icon-document',
              permission: ['admin'],
              showMobile: false
            },
            component: () => import('@/views/Json')
          },
          {
            path: '/basic/json/array',
            name: 'ArrayPage',
            meta: {
              title: 'array-page',
              icon: 'el-icon-tickets',
              permission: ['admin'],
              showMobile: false
            },
            component: () => import('@/views/Array')
          }
        ]
      },
      {
        path: '/basic/transfer',
        name: 'TransferPage',
        meta: {
          title: 'transfer-page',
          icon: 'el-icon-bangzhu',
          permission: ['admin'],
          showMobile: false
        },
        component: () => import('@/views/Transfer')
      },
      {
        path: '/basic/video',
        name: 'VideoPage',
        meta: {
          title: 'video-page',
          icon: 'el-icon-video-camera',
          showMobile: false
        },
        component: () => import('@/views/Video')
      }
    ]
  }
]

export default basicComponent
