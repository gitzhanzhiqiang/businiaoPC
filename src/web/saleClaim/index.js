import Template from '@/template';
export default {
    path: '/saleClaim',
    component: Template,
    meta: {
        title: '出售债权'
    },
    children: [{
            path: 'index',
            name: 'saleClaim_index',
            component: resolve => require(['./index.vue'], resolve),
            meta: {
                title: '出售债权'
            }
        },
        {
            path: 'detail',
            name: 'saleClaim_detail',
            component: resolve => require(['./detail'], resolve),
            meta: {
                title: '订单详情'
            }
        },
        {
            path: 'pay',
            name: 'saleClaim_pay',
            component: resolve => require(['./pay'], resolve),
            meta: {
                title: '支付'
            }
        },
        {
            path: 'payBird',
            name: 'saleClaim_payBird',
            component: resolve => require(['./payBird'], resolve),
            meta: {
                title: '支付'
            }
        },
        {
            path: 'payBirda',
            name: 'saleClaim_payBirda',
            component: resolve => require(['./payBirda'], resolve),
            meta: {
                title: '支付'
            }
        },
    ]

}