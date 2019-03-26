<template>
     <div>
          <div class="login-bottom">
               <ul>
                    <li>
                         <img src="~@/assets/images/longin-xian.jpg" class="li-img" />
                         <h3 class="login-li-h3">关于不死鸟</h3>
                         <p class="li-p">不死鸟债权转让担保交易平台是黑尘科技旗下专注服务于p2p债权担保交易的互联网金融服务平台。上线于2018年9月18日，旨在利用大数据和人工智能技术，为金融需求多样化的客户提供完善的解决方案和极致的服务体验，实现多方共赢。
                         </p>
                    </li>
                    <li class="login-di-li">
                         <img src="~@/assets/images/longin-xian.jpg" class="li-img" />
                         <img src="~@/assets/images/kefu-img.jpg" class="login-di-li-img">
                         <p class="login-di-dianhua">400-600-0186</p>
                         <div class="login-di-shijian">
                              周一至周五<br/>(9：00-18：00)
                         </div>
                    </li>
                    <li>
                         <div class="login-erweima">
                              <div>
                                   <img src="~@/assets/images/officialServe.jpg" alt="二维码">
                              </div>
                              <p>关注官方服务号</p>
                         </div>
                         <div class="login-erweima duoyu">
                              <div>
                                   <img src="~@/assets/images/officialWeChat.jpg" alt="二维码">
                              </div>
                              <p>关注官方微信</p>
                         </div>
                    </li>
               </ul>
          </div>
          <!--  -->
          <div class="footer"><span style="margin-right:20px;cursor:pointer;" @click="openUrl()">浙ICP备18048695号-1</span><span>© 黑尘科技（杭州）有限公司</span></div>
     </div>
</template>
<script>
import ajax from '@utils/config';
export default {
     components: {},
     data() {
          return {

          }
     },
     computed: {},
     created() {

     },
     mounted() { },
     methods: {
         //打开工信部网站
         openUrl() {
             window.open('http://www.miibeian.gov.cn/');
         }
     },
     filters: {

     }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/commin.scss';
.footer {
     width: 100%;
     height: 60px;
     background: rgba(42, 51, 72, 1);
     text-align: center;
     line-height: 60px;
     font-size: 14px;
     font-family: 'MicrosoftYaHeiLight', '微软雅黑';
     font-weight: 300;
     color: rgba(255, 255, 255, 1);
}

.login-bottom {
     width: 100%;
     height: 287px;
     background: rgba(255, 255, 255, 1);
}

.login-bottom ul {
     width: 1200px;
     height: 287px;
     margin: 0 auto;
     overflow: hidden;
}

.login-bottom ul li {
     width: 33%;
     height: 287px;
     float: left;
}

.li-img {
     float: right;
     width: 1px;
     margin-top: 70px;
}

.login-li-h3 {
     width: 89px;
     height: 16px;
     font-size: 16px;
     font-family: "MicrosoftYaHei-Bold";
     font-weight: bold;
     color: rgba(51, 51, 51, 1);
     margin-top: 50px;
}

.li-p {
     width: 262px;
     min-height: 134px;
     font-size: 14px;
     font-family: "MicrosoftYaHeiLight";
     font-weight: 300;
     color: rgba(128, 128, 128, 1);
     line-height: 24px;
     margin-top: 25px;
}

.login-di-li {
     text-align: center;
}

.login-di-li-img {
     margin-top: 50px;
}

.login-di-dianhua {
     width: 99%;
     height: 18px;
     font-size: 24px;
     font-family: "MicrosoftYaHei-Bold";
     font-weight: bold;
     color: rgba(57, 99, 208, 1);
     text-align: center;
     margin-top: 10px;
}

.login-di-shijian {
     width: 99%;
     min-height: 44px;
     font-size: 16px;
     font-family: "MicrosoftYaHeiLight";
     font-weight: 300;
     color: #666666;
     margin-top: 32px;
     line-height: 25px;
}

.login-erweima {
     width: 120px;
     min-height: 100px;
     float: right;
     margin-top: 70px;
     img {
          width: 100%;
          height: 100%;
     }
}

.login-erweima div {
     width: 120px;
     height: 120px;
     background: rgba(57, 99, 208, 1);
}

.login-erweima p {
     width: 100%;
     height: 40px;
     line-height: 40px;
     font-size: 14px;
     font-family: "MicrosoftYaHeiLight";
     font-weight: 300;
     color: rgba(102, 102, 102, 1);
     text-align: center;
}

.duoyu {
     margin-right: 50px;
}
</style>