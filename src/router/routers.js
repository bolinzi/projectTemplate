export default [{
        path: '/',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            title: '登录'
            // hideLeftMenu: true,
            // hideHeader: true
        }
    },
    {
        path: '/welcome',
        component: () => import('@/views/layout/index'),
        children: [
            {
                path: '',
                name: 'welcome',
                component: () => import('@/views/welcome'),
                meta: {
                    title: '欢迎'
                }
            }
        ]
    },
    {
        path: '/highChart',
        component: () => import('@/views/layout/index'),
        children: [
            {
                path: '',
                name: 'highChart',
                component: () => import('@/views/highChart'),
                meta: {
                    title: '图表'
                }
            }
        ]
    },
    {
        path: '/bdMap',
        component: () => import('@/views/layout/index'),
        children: [
            {
                path: '',
                name: 'bdMap',
                component: () => import('@/views/bdMap'),
                meta: {
                    title: '地图'
                }
            }
        ]
    }
];
