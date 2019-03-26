import Template from '@/template';
export default {
    path: '/',
    component: Template,
    meta: {
        title: '首页'
    },
    children: [{
            path: 'index',
            name: 'index',
            alias: '',
            component: resolve => require(['./index.vue'], resolve),
            meta: {
                title: '首页',
                content: '32453'
            }
        },
     //    {
     //        path: '/',
     //        redirect: '/index' //重定向为主页
     //    },
        {
            path: 'heichen',
            name: 'heichen',
            component: resolve => require(['./heichen.vue'], resolve),
            meta: {
                title: '黑尘服务协议',
            }
        },
        {
            path: 'indexa',
            name: 'indexa',
            component: resolve => require(['./indexa.vue'], resolve),
            meta: {
                title: '热门平台',
            }
        },
         {
            path: 'detaila',
            name: 'detaila',
            component: resolve => require(['./detaila.vue'], resolve),
            meta: {
                title: '平台档案',
            }
        },{
            path: 'newdetaila',
            name: 'newdetaila',
            component: resolve => require(['./newdetaila.vue'], resolve),
            meta: {
                title: '新闻详情',
            }
        },
        {
            path: 'welfare',
            name: 'welfare',
            component: resolve => require(['./welfare.vue'], resolve),
            meta: {
                title: '领取福利',
            }
        },
        {
            path: 'accountService',
            name: 'accountService',
            component: resolve => require(['./accountService.vue'], resolve),
            meta: {
                title: '账户管理服务',
            }
        },
    ]

}