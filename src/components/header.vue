<template>
     <div>
          <div class="header">
               <!-- <span v-show="false">{{user}}</span> -->
               <div class="top">
                    <div class="center">
                            
                         <ul>
                              <li @click="go_url(item,1)" class="fr" v-for="(item,index) in top_nav"  @mouseenter="leave(item)" @mouseleave="leave(item)" :key="index">
                                  <span v-if="index===0">{{item.name}}</span>
                                  <span v-if="index===1"><img src="~@/assets/images/app-img.jpg" class="app-img" />{{item.name}}</span>
                                   <span v-if="index===2">{{item.name}}</span>
                                   <span v-if="index===3&&!phone">{{item.name}}</span>
                                   <span v-if="index===4&&!phone">{{item.name}}</span>
                                   <transition name="fade" v-if="index===2">
                                        <div v-show="item.name== '下载App' && item.isShow">
                                             <img src="~@/assets/images/download.png" alt="二维码">
                                        </div>
                                   </transition>
                              </li>
                              <li v-if="phone" style="float:right;" @click="safeExit()">退出</li>
                              <li v-if="phone" style="float:right;">{{phone | phoneFilter}}</li>
                         </ul>
                         <!-- <ul v-if="phone" style="margin-right:10px;">
                             <li style="float:left;">{{phone}}</li>
                             <li style="float:left;" @click="out()">退出</li>geren
                         </ul> -->
                         <!-- <img src="~@/assets/images/geren.jpg" class="geren-img"> -->
                    </div>
               </div>
               <div class="bottom">
                    <div class="center">
                         <div class="fl">
                              <img src="~@/assets/images/log.jpg" alt="" class="log">
                         </div>
                         <ul class="fr">
                              <li class="fl" @mouseenter="selectStyle(item)" @mouseleave="outStyle(item)" @click="go_url(item,2)" :class="{'hover': item.isShow,'hovera':item.isShowa}" v-for="(item,index) in nav" :key="index" style="position: relative;">
                                  <div v-if="index===5" class="indexwu" style="float:left;margin-top:2px;margin-left:20px;padding: 0;"><img src="~@/assets/images/geren.jpg"></div><div style="float:left;">{{item.name}}</div>
                              </li>
                         </ul>
                    </div>
               </div>
               <div class="bottm_head" @mouseenter="selectStylea()" @mouseleave="outStylea()" v-if='daohan == false'>
               		<ul>
               			<li @click="go_urlc(item,1)" v-for="item in nava" :class="{'hovera': item.isShow}">{{item.name}}</li>
               		</ul>
               </div>
               <div class="bottm_heada" @mouseenter="selectStylez()" @mouseleave="outStylez()" v-if='daohana == false'>
               		<ul>
               			<li @click="go_urlz(item,1)" v-for="item in listtype" :class="{'hoverz': item.isShow}">{{item.title}}</li>
               		</ul>
               </div>
          </div>
          <div class="fei"></div>
          <div class="center" style="min-width: 1200px;overflow: auto;">
               <div class="content">
                    <ul class="left" v-if="isCollapse">
                         <li @mouseover="changeOver()" @mouseout="changeOut()">
                              <img src="~@/assets/images/QQ.png" alt="">
                         </li>
                         <li @mouseover="changeOver(1)" @mouseout="changeOut(1)">
                              <img src="~@/assets/images/wecat.png" alt="">
                         </li>
                         <li @click="getScoll">
                              <p>^</p>
                              <p>TOP</p>
                         </li>
                         <li v-show="isQQ">
                              <img v-if="isQQ == 1" src="~@/assets/images/QQ.jpg" alt="">
                              <img v-else src="~@/assets/images/WX.jpg" alt="">
                              <p v-if="isQQ == 1">客服QQ：2177430082</p>
                              <p v-else>客服微信：15336891617</p>
                         </li>
                    </ul>
               </div>
          </div>
     </div>
</template>
<script>
import ajax from '@utils/config';
import Swiper from 'swiper';
import store from '../store';
import Cookies from 'js-cookie';
import loginout from '@/assets/js/loginout';
import { mapGetters } from 'vuex';
export default {
     components: {},
     data() {
          return {
               navIndex: 0,
               phone: '',
               top_nav: [
               {
                    name: '开放平台',
                    url: '/helpCenter/development'
               },
               {
                    name: '帮助中心',
                    url: '/helpCenter/index'
               },
               {
                    name: '下载App',
                    url: '',
                    isShow: false
               },
               {
                    name: '注册',
                    url: '/register'
               },
               {
                    name: '登录',
                    url: '/login'
               },
               ],
               nav: [{
                    name: '首页',
                    url: '/',
                    isShow: true,
                    isShowa: false
               },
               {
                    name: '债权列表',
                    url: '/debtList/index',
                    isShow: false,
                    isShowa: false
               },
               {
                    name: '求购债权',
                    url: '/wearelooking/index',
                    isShow: false,
                    isShowa: false
               },
               {
                    name: '出售债权',
                    url: '/saleClaim/index',
                    isShow: false,
                    isShowa: false
               },
               {
                    name: '关于我们',
                    url: '/aboutUs/index',
                    isShow: false,
                    isShowa: false
               },
               {
                    name: '个人中心',
                    url: '/personalCenter/index',
                    isShow: false,
                    isShowa: false
               }
               ],
               nava: [
               {
                    name: '发布求购',
                    url: '/wearelooking/releasefor',
                    isShow: false
               },

               {
                    name: '求购列表',
                    url: '/wearelooking/index',
                    isShow: false
               },
                {
                    name: '我的求购',
                    url: '/wearelooking/wanttobuy',
                    isShow: false
               },
               ],
               listtype: [
	                { title: 'P2P债权', index: 0,url: '/debtList/index', isShow: true },
	                { title: '借条债权', index: 1,url: '/debtList/indexa', isShow: false },
	            ],
               isQQ: '',
               daohan:true,
				num:"",
				daohana:true,
          }
     },
     computed: {
//          ...mapGetters([
//             'isCollapse'
//         ]),
        isCollapse() {
            this.init();
            this.inita();
            this.initz();
            return store.state.isCollapse;
        }
        // user() {
        //     this.init();
        //     return store.state.user;
        // },
        

     },

     created() {
     },
     mounted() {
     	this.phone = Cookies.get('phone')?Cookies.get('phone'):''
     },
     methods: {
          init() {
               let route = this.$route.path;
               let row = {};
               this.nav.map((item) => {
                    item.isShow = false;
                    if (route.split('/')[1] == item.url.split('/')[1]) { //防止二级刷新时，父级导航当前不能保持
                         row = item;
                         if(!Cookies.get("token")) {
                            Cookies.set("fromPath", route);
                        }
                    }
               })
               if(route.split('/')[1] == 'wearelooking'){
               		this.num = 1
               }else{
               		this.num = ''
               }
               let arr = ['', 'heichen', 'indexa', 'detaila', 'welfare', 'accountService']
               if (arr.indexOf(route.split('/')[1]) != -1) {
                    this.nav[0].isShow = true;
               }
               row.isShow = true;

          },
         inita() {
               let route = this.$route.path;
               let row = {};
				 this.nava.map((item) => {
				 	item.isShow = false;
				 	if (route.split('/')[2] == item.url.split('/')[2]) { //防止二级刷新时，父级导航当前不能保持
                         row = item;
                         if(!Cookies.get("token")) {
                            Cookies.set("fromPath", route);
                        }
                    }
				 })
				 row.isShow = true;
          },
          initz() {
               let route = this.$route.path;
               let row = {};
				 this.listtype.map((item) => {
				 	item.isShow = false;
				 	if (route.split('/')[2] == item.url.split('/')[2]) { //防止二级刷新时，父级导航当前不能保持
                         row = item;
                         if(!Cookies.get("token")) {
                            Cookies.set("fromPath", route);
                        }
                    }
				 })
				 row.isShow = true;
          },
          selectStyle (itme){
//        	console.log(itme)
//        	this.nava.map((item) => {
//               item.isShowa = false;
//          })
//        	itme.isShowa = true;
			if(itme.url == '/debtList/index'){
          		this.daohana = false
          	}
          	if(itme.url == '/debtList/index' && this.num == 1){
          		this.daohana = false
          	}
          	if(itme.url == '/wearelooking/index'){
          		this.daohan = false
          	}
          	if(itme.url == '/wearelooking/index' && this.num == 1){
          		this.daohan = false
          	}
          },
          outStyle (itme){
//        	console.log(itme)
//        	this.nava.map((item) => {
//               item.isShowa = false;
//          })
//        	itme.isShowa = false;
			if(itme.url == '/debtList/index'){
          		this.daohana = true
          	}
          	if(itme.url == '/debtList/index' && this.num == 1){
          		this.daohana = true
          	}
          	if(itme.url == '/wearelooking/index'){
          		this.daohan = true
          	}
          	if(itme.url == '/wearelooking/index' && this.num == 1){
          		this.daohan = true
          	}
          },
           selectStylea (){
          	this.daohan = false
          },
          outStylea (itme){
          	this.daohan = true
          },
           selectStylez (){
          	this.daohana = false
          },
          outStylez (itme){
          	this.daohana = true
          },
          leave(item) {
               if (item.name == '下载App') {
                    item.isShow = !item.isShow;
               }
          },
          go_url(item,val) {
               if (item.url) {
                    this.nav.map((item) => {
                         item.isShow = false;
                    })
                    item.isShow = true;
                    if(!Cookies.get("token")&&val===2) {
                        Cookies.set("fromPath", item.url);
                    }
                    if(item.url == '/wearelooking/index'){
		          		this.num = 1
		          		this.daohan = false
		          	}else{
		          		this.num = ''
		          		this.daohan = true
		          	}
                    this.$router.push({
                         path: item.url
                    })
               }
          },
          go_urlc(row,vla){
          	this.nava.map((item) => {
                 item.isShow = false;
            })
          	row.isShow = true;
          	this.$router.push({
                 path: row.url
            })
          },
          go_urlz(row,vla){
          	this.listtype.map((item) => {
                 item.isShow = false;
            })
          	row.isShow = true;
          	this.$router.push({
                 path: row.url
            })
          },
          changeOver(number) {
               if (!number) {
                    this.isQQ = 1;
               } else {
                    this.isQQ = 2;
               }

          },
          changeOut(number) {
               this.isQQ = '';
          },
          getScoll() {
               document.body.scrollTop = document.documentElement.scrollTop = 0;
          },
          //安全退出
            safeExit() {
                this.$message({
                    message: '安全退出成功！',
                    type: 'success'
                });
                Cookies.remove('saleDebt');
                localStorage.setItem('phone', '');
				localStorage.setItem('token', '');
                loginout();
            },
     },
     filters: {
         //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        },
     }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/commin.scss';
.content {
     float: right;
     .left {
          position: fixed;
          top: 60%;
          z-index: 1999;
          @media screen and (max-width: 1250px) {
              left: 1150px;
          }
           @media screen and (max-width: 1000px) {
              left: 1000px;
          }

          cursor: pointer;
          li:nth-child(1) {
               border-bottom: 1px solid #fff;
          }
          li:nth-child(1),
          li:nth-child(2) {
               width: 60px;
               height: 60px;
               background: #3963D0;
               border-left: 1px solid #3963D0;
               text-align: center;
               position: relative;
               &:hover {
                    border-left: 1px solid #fff;
               }
               img {
                    width: 33px;
                    padding: 10px;
               }
          }
          li:nth-child(3) {
               margin-top: 10px;
               width: 60px;
               height: 60px;
               border: 1px solid #3963D0;
               background: #fff;
               text-align: center;
               font-size: 14px;
               p:nth-child(1) {
                    line-height: 12px;
                    padding-top: 16px;
               }
               p:nth-child(2) {
                    line-height: 16px;
               }
          }
          li:nth-child(4) {
               width: 136px;
               height: 136px;
               background: #3963D0;
               position: absolute;
               left: -136px;
               top: 0;
               font-size: 12px;
               font-family: 'MicrosoftYaHeiLight', '微软雅黑';
               text-align: center;
               font-weight: 300;
               line-height: 20px;
               color: rgba(255, 255, 255, 1);
               img {
                    width: 72px;
                    height: 72px;
                    padding-top: 20px;
               }
          }
     }
}

.header {
     width: 100%;
     position: fixed;
     height: 113px;
     z-index: 1111;
     .top {
          height: 30px;
          background: rgba(245, 245, 245, 1);
          border: 1px solid rgba(217, 217, 217, 1);
          border-top: 0px;
          line-height: 30px;
          font-size: 12px;
          font-family: 'MicrosoftYaHeiLight', '微软雅黑';
          font-weight: 300;
          color: rgba(77, 77, 77, 1);
          li {
               padding: 0 30px;
               border-right: 1px solid rgba(217, 217, 217, 1);
               cursor: pointer;
               color: #4D4D4D;
               &:first-child {
                    border: 0;
               }
               &:nth-child(3) {
                    text-align: center;
                    width: 163px;
                    padding: 0;
                    position: relative;
                    z-index: 999;
                    div {
                         width: 163px;
                         height: 163px;
                         line-height: 163px;
                         position: absolute;
                         top: 30px;
                         left: 0;
                         background: #fff;
                         img {
                              width: 120px;
                              height: 120px;
                              padding-top: 20px;
                         }
                    }
               }
          }
     }
     .bottom {
          width: 100%;
          height: 82px;
          background: rgba(255, 255, 255, 1);
          li {
               margin-right: 69px;
               height: 80px;
               cursor: pointer;
               font-size: 16px;
               font-family: 'MicrosoftYaHeiLight', '微软雅黑';
               font-weight: 300;
               color: rgba(0, 0, 0, 1);
               line-height: 17px;
               div.indexwu+div{
               	padding: 0;
               }
               div{
               	padding: 33px 0 9px 0;
               }
               &.hover {
                    color: rgba(57, 99, 208, 1);
                    div{
                    	border-bottom: 1px solid rgba(57, 99, 208, 1);
                    }
                    div.indexwu{
                     	border-bottom: none;
		            }
               }
               &:last-child {
                    margin-right: 0;
                    margin-top: 23px;
                    padding: 0;
                    width: 120px;
                    height: 36px;
                    line-height: 36px;
                    border: 1px solid rgba(57, 99, 208, 1);
                    text-align: center;
                    border-radius: 6px;
                    font-size: 16px;
                    font-family: 'MicrosoftYaHeiLight', '微软雅黑';
                    font-weight: 300;
                    color: rgba(57, 99, 208, 1);
               }
          }
     }
     .bottm_head{
     	width: 100%;
     	height: 95px;
     	background: white;
     	margin-top: -14px;
     	border-bottom: 1px solid #f7f7f7;
     	position: relative;
     	z-index: 1;
     	ul{
     		display: flex;
     		width: 365px;
     		height: 95px;
     		position: absolute;
     		left: 46.3%;
     		z-index: -2;
     		li{
     			float: right;
     			cursor: pointer;
     			line-height: 95px;
     			font-size: 15px;
     			color: #414551;
     			text-align: center;
     			flex: 1;
     		}
     		li.hovera{
     			color: #3963D0;
     		}
     		li.hoverz{
     			color: #3963D0;
     		}
     	}
     }
     .bottm_heada{
     	width: 100%;
     	height: 95px;
     	background: white;
     	margin-top: -14px;
     	border-bottom: 1px solid #f7f7f7;
     	position: relative;
     	z-index: 1;
     	ul{
     		display: flex;
     		width: 365px;
     		height: 95px;
     		position: absolute;
     		left: 39.3%;
     		z-index: -2;
     		li{
     			float: right;
     			cursor: pointer;
     			line-height: 95px;
     			font-size: 15px;
     			color: #414551;
     			text-align: center;
     			flex: 1;
     		}
     		
     		li.hoverz{
     			color: #3963D0;
     		}
     	}
     }
}

.log {
     margin-top: 12px;
}

.app-img {
     position: absolute;
     top: 6px;
     margin-left: 970px;
}

.geren-img {
     position: absolute;
     top: 63px;
     margin-left: 1085px;
}

.fade-enter-active,
.fade-leave-active {
     transition: opacity .5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
     opacity: 0;
}

.fei {
     width: 100%;
     height: 113px;
}
</style>
