import Template from '@/template';
export default {
  path: '/aboutUs',
  component: Template,
  meta: {
    title: '关于我们'
  },
  children: [{
      path: 'index',
      name: 'aboutUs_index',
      component: resolve => require(['./index.vue'], resolve),
      meta: {
        title: '关于我们'
      }
    }
  ]

}
