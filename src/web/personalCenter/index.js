import Template from '@/template';
export default {
  path: '/personalCenter',
  component: Template,
  meta: {
    title: '个人中心'
  },
  children: [{
      path: 'index',
      name: 'personalCenter_index',
      component: resolve => require(['./index.vue'], resolve),
      meta: {
        title: '个人中心'
      }
    }
  ]

}
