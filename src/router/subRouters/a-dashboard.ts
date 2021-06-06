const dashBoard = [
    {
        path: '/',
        name: 'DashBoard',
        meta: {
            title: 'dashboard-page',
            icon: 'el-icon-data-analysis',
            showMobile: false
        },
        component: () => import('@/views/Dashboard')
    }
]

export default dashBoard