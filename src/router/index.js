import Vue from 'vue'
import Router from 'vue-router'
import APP from '../App';
import index from '@/web/index/index.js';
import helpCenter from '@/web/helpCenter';
import debtList from '@/web/debtList';
import saleClaim from '@/web/saleClaim';
import wearelooking from '@/web/wearelooking';
import aboutUs from '@/web/aboutUs';
import personalCenter from '@/web/personalCenter';
Vue.use(Router)
const defaultRoute = {
    path: '/',
    component: APP,
    children: [
        index,
        helpCenter,
        debtList,
        saleClaim,
        wearelooking,
        aboutUs,
        personalCenter
    ]
};
export default new Router({ //路由懒加载 
    mode: 'history', //去掉# //需后台配合 nginx
    routes: [
     //     {
     //        path: '/',
     //        redirect: '/index'
     //    },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../login'], resolve),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['../register'], resolve),
            meta: {
                title: '注册'
            }
        },
        // {
        //   path: '/',
        //   redirect: '/login' //重定向
        // },
        // {
        //   path: '/404',
        //   name: 'notFound',
        //   component: resolve => require(['../notFound.vue'], resolve),
        //   meta: {
        //     title: '404'
        //   }
        // },
        defaultRoute,
        // {
        //   path: "*", // 此处需特别注意置于最底部
        //   redirect: "/404"
        // }
    ],
    scrollBehavior(to, from, savedPosition) { //第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
        if (savedPosition) { //前进后退按钮  保持原样
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            } //跳转   回顶部
        }
    }
})