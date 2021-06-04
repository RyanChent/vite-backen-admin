const Docs = [
  {
    path: '/docs',
    name: 'DocsPage',
    meta: {
      icon: 'el-icon-folder-opened',
      title: 'docs-page',
      showMobile: false
    },
    component: () => import('@/views/Docs')
  }
]

export default Docs
