import Template from '@/template';
export default {
    path: '/wearelooking',
    component: Template,
    meta: {
        title: '求购债权'
    },
    children: [{
            path: 'index',
            name: 'wearelooking_index',
            component: resolve => require(['./index.vue'], resolve),
            meta: {
                title: '求购列表'
            }
        },
        {
            path: 'releasefor',
            name: 'wearelooking_releasefor',
            component: resolve => require(['./releasefor.vue'], resolve),
            meta: {
                title: '发布求购'
            }
        },
        {
            path: 'wanttobuy',
            name: 'wearelooking_wanttobuy',
            component: resolve => require(['./wanttobuy.vue'], resolve),
            meta: {
                title: '我的求购'
            }
        },
        {
            path: 'details',
            name: 'wearelooking_details',
            component: resolve => require(['./details.vue'], resolve),
            meta: {
                title: '求购详情'
            }
        },
    ]

}