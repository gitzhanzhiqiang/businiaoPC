import Template from '@/template';
export default {
    path: '/debtList',
    component: Template,
    meta: {
        title: '债转列表'
    },
    children: [{
            path: 'index',
            name: 'debtList_index',
            component: resolve => require(['./index.vue'], resolve),
            meta: {
                title: '债转列表'
            }
       },{
            path: 'indexa',
            name: 'debtList_indexa',
            component: resolve => require(['./indexa.vue'], resolve),
            meta: {
                title: '借条列表'
            }
       },
        {
            path: 'detail',
            name: 'debtList_detail',
            component: resolve => require(['./detail'], resolve),
            meta: {
                title: '债转详情'
            }
        },{
            path: 'detailj',
            name: 'debtList_detailj',
            component: resolve => require(['./detailj'], resolve),
            meta: {
                title: '借条详情'
            }
        },
        {
            path: 'confirmTransfer',
            name: 'debtList_confirmTransfer',
            component: resolve => require(['./confirmTransfer'], resolve),
            meta: {
                title: '转承接人'
            }
        },
    ]

}