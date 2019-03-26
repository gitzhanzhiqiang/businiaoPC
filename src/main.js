import 'babel-polyfill'; //开发环境显示  360和ie
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import router from './router';
import store from './store';
// import SockJS from  'sockjs-client';
// import  Stomp from 'stompjs';
import * as filters from './filters/index.js'
import '@/assets/scss/reset.scss'; //重置样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';




import Cookies from 'js-cookie';
// import Swiper from 'swiper';
// 赋值到Vue的原型上面，在页面就可以使用this.$ + name获取到了
// Vue.prototype.$Swiper = Swiper;
// Vue.prototype.$Cookies = Cookies;
Vue.prototype.$message = ElementUI.Message;
//全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(ElementUI);
/* eslint-disable no-new */


//全局钩子作用于所有路由，里面的参数to表示即将要进入的路由对象，from表示即将要离开的路由对象 路由进入之前
router.beforeEach((to, from, next) => {
    // if (to.path == '/') {
    //   next();
    // }
    /* 路由发生变化修改页面meta */ //搜索关键字什么的可以使用
    store.dispatch('SETISCOLLAPSE', { isCollapse: true });
    if (to.meta.content) {
        let head = document.getElementsByTagName('head');
        let meta = document.createElement('meta');
        meta.content = to.meta.content;
        head[0].appendChild(meta)
    }
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = '不死鸟_' + to.meta.title;
    }
    store.dispatch('setUser', { data: to.path }); //导航默认点亮是使用
    //登录且有用户信息
    if (store.getters.token) {
        console.log(11112);
        next();
    } else if (!store.getters.token && Cookies.get('token')) {
        // 登录且没有用户信息
        console.log(11113);
        store.dispatch('SETTOKEN', { token: Cookies.get('token') });
        next();
    } else if (to.path.indexOf('/aboutUs/index') != -1 || to.path.indexOf('/detaila') != -1 || to.path.indexOf('/welfare') != -1 || to.path.indexOf('/newdetaila') != -1|| to.path.indexOf('/indexa') != -1 || to.path.length === 6 || to.path.indexOf('/debtList/') != -1 || to.path.indexOf('/helpCenter/index') != -1|| to.path.indexOf('/helpCenter/development') != -1 || to.path.indexOf('/login') != -1 || to.path.indexOf('/register') != -1 || to.path.indexOf('/wearelooking/index') != -1 || to.path.indexOf('/wearelooking/details') != -1 || to.path.indexOf('/login') != -1 || to.path.indexOf('/heichen') != -1 || to.path.indexOf('/accountService') != -1 || to.path == '/') {

        console.log(11115);
        next();
    } else {

        console.log(11116);
        next('/login');

    }

});
// //路由进入之后
router.afterEach((to, from) => {

});


new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})