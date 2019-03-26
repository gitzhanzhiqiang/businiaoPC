import Template from '@/template';
export default {
    path: '/helpCenter',
    component: Template,
    meta: {
        title: '帮助中心'
    },
    children: [
        {
            path: 'index',
            name: 'index',
            component: resolve => require(['./index.vue'], resolve),
            meta: {
                title: '帮助中心',
                content: '32453'
            }
        },
        {
            path: 'development',
            name: 'development',
            component: resolve => require(['./development.vue'], resolve),
            meta: {
                title: '开放平台',
                content: '32453'
            }
        }
    ]

}