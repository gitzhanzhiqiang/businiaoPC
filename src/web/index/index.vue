<template>
     <div class="indexpage">
          <!--<div class="fuchuan" v-if="zhuf == true">
                           			<img @click="dianjizhu()" class="cha" src="~@/assets/images/delete_icon.png"/>
                         				<img class="xin" src="~@/assets/images/NewYear.png"/>
                         			</div>-->
          <div class="banner">
               <el-carousel arrow="never" style="width:100%;height:360px;">
                    <el-carousel-item v-for="(item,index) in imgList" :key="index" style="width:100%;height:360px;">
                         <img :src="item.img" alt="" style="width:100%;height:360px;" @click="gourl(item.rewriteUrl)">
                    </el-carousel-item>
               </el-carousel>
          </div>
          <ul class="transactiontype">
               <li>
                    <div class="transactiontype-layer">
                         <img src="./img/icon1an.png" alt="">
                         <div class="transactiontype-layer-text">
                              <span>安全交易<br/>
                                   <form style="font-size:14px;color:rgba(153,153,153,1);line-height: 31px;">全程担保 交易首选</form>
                              </span>
                         </div>

                    </div>
               </li>
               <li>
                    <div class="transactiontype-layer">
                         <img src="./img/icon2.png" alt="">
                         <div class="transactiontype-layer-text">
                              <span>免费发布<br/>
                                   <form style="font-size:14px;color:rgba(153,153,153,1);line-height: 31px;">跨越平台 债转自由</form>
                              </span>
                         </div>
                    </div>
               </li>
               <li>
                    <div class="transactiontype-layer">
                         <img src="./img/icon3an.png" alt="">
                         <div class="transactiontype-layer-text">

                              <span>自由定价<br/>
                                   <form style="font-size:14px;color:rgba(153,153,153,1);line-height: 31px;">任意折扣 返现随心</form>
                              </span>
                         </div>
                    </div>
               </li>
               <li style="margin-right:0;">
                    <div class="transactiontype-layer">
                         <img src="./img/icon4.png" alt="">
                         <div class="transactiontype-layer-text">
                              <span>更多曝光<br/>
                                   <form style="font-size:14px;color:rgba(153,153,153,1);">债权公示 低价购买</form>
                              </span>
                         </div>
                    </div>
               </li>
          </ul>
          <div class="remen">
               <div class="remen_r">
                    <p>
                         <span class="pingtia">热门平台</span>
                         <span class="gengduo" style="cursor: pointer;" @click="$router.push('/indexa')">更多</span>
                    </p>
                    <div class="remen_b">
                         <el-carousel :interval="4000" indicator-position="outside" style="width:100%;height:200px;">
                              <el-carousel-item v-for="(item,index) in NEWS" :key="index" style="width:100%;height:200px;">
                                   <div class="banner_b" v-for="itm in item.NEWSa">
                                        <img v-if="itm.logo" :src="itm.logo" alt="" style="width:140px;height:140px;cursor: pointer;" @click="$router.push({path:'/detaila',query:{id:itm.pfName }})">
                                        <img v-if="!itm.logo" src="~@/assets/images/moren.png" @click="$router.push({path:'/detaila',query:{id:itm.pfName }})" style="width:140px;height:140px;cursor: pointer;" />
                                   </div>
                              </el-carousel-item>
                         </el-carousel>
                    </div>
               </div>
          </div>

          <!--<div class="remen">
                             		<div class="remen_r">
                             			<p><span class="pingtia">热门平台</span><span class="gengduo" style="cursor: pointer;" @click="$router.push('/indexa')">更多</span></p>
                             			<div class="remen_b">
                             				<el-carousel :interval="4000" indicator-position="outside" style="width:100%;height:200px;">
                         			        <el-carousel-item v-for="(item,index) in imgd" :key="index" style="width:100%;height:200px;">
                         			        	<div class="banner_b" v-for="itm in item.imgc">
                         			        			<img :src="itm.img" alt="" style="width:140px;height:140px;cursor: pointer;" @click="$router.push({path:'/detaila',query:{id:itm.pfName }})">
                         			        	</div>
                         			        </el-carousel-item>
                         			      </el-carousel>
                             			</div>
                             		</div>
                             </div>-->
          <div class="datalist-layer">
               <div class="datalist">
                    <div class="datalist-top">
                         <div class="datalist-topL">
                              <i></i>
                              <h1>热门推荐：</h1>
                              <p v-for="(itm,index) in listtype" :class="{actw:itm.isShow}" :key="index" @click="toptypeti(index)">{{itm.title}}</p>
                              <!--<img src="~@/assets/images/recommend.png" alt="">-->
                         </div>
                         <span class="more-btn" @click="$router.push('/debtList/index')" v-if="listtype[0].isShow === true">更多</span>
                         <span class="more-btn" @click="$router.push('/debtList/indexa')" v-if="listtype[1].isShow === true">更多</span>
                    </div>
                    <ul class="datalist-specific" v-if="projectList.length && listtype[0].isShow === true">
                         <li v-for="(item,index) in projectList" :key="index">
                              <div class="datalist-specificL">
                                   <img v-if="!item.logoAppUrl" style="cursor: pointer;" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" src="~@/assets/images/moren.png" width="125" height="86" />
                                   <img v-if="item.logoAppUrl" style="cursor: pointer;" :src="item.logoAppUrl" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" alt="" width="125" height="86">
                              </div>
                              <div class="datalist-specificR">
                                   <div class="datalist-specificR-top">
                                        <div class="datalist-specificR-topL">
                                             <div class="pfName">{{item.pfName}}</div>
                                             <div class="discount_zui" :style="leftBackground" v-for='(itmc,index) in item.labels' v-if="index < 3">{{itmc.name}}</div>
                                             <div class="prepay-text" v-if="item.prepayFlag">预付</div>
                                             <div class="discount-text" v-if="item.repayStatus == 1" style="border:1px solid rgba(72,118,165,1);color: rgba(72,118,165,1);">正常</div>
                                             <div class="discount-text" v-if="item.repayStatus == 2" style="border:1px solid rgba(72,118,165,1);color: rgba(72,118,165,1);">逾期</div>
                                             <div class="discount-text" v-if="item.bdType == 1" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">信贷</div>
                                             <div class="discount-text" v-if="item.bdType == 2" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">企贷</div>
                                             <div class="discount-text" v-if="item.bdType == 3" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">房贷</div>
                                             <div class="discount-text" v-if="item.bdType == 4" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">车贷</div>
                                             <div class="discount-text" v-if="item.bdType == 5" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">自投</div>
                                        </div>
                                        <div class="datalist-specificR-topR">
                                             <div class="link-text" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" style="color:#666666;">
                                                  <div><img src="~@/assets/images/shuben.png" alt=""></div>
                                                  <div>平台档案</div>
                                             </div>
                                             <div class="link-text" @click="goUrl(item.link)" style="color:#666666;">
                                                  <div><img src="~@/assets/images/link.png" alt=""></div>
                                                  <div>预览链接</div>
                                             </div>
                                             <div class="Rdiscount-text" @click="getTendency(item.pfName)">
                                                  <div><img src="~@/assets/images/discount.png" alt=""></div>
                                                  <div>折扣趋势</div>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="datalist-specificR-context">
                                        <div class="datalist-specificR-context-item">
                                             <i style="color: #3963D0;font-size: 16px;font-weight: bold;">{{item.amount | formatMoney}}</i>元<br>转让金额
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <i style="color: #FF0000;font-size: 16px">{{item.discountRate | formatMoney}}</i>折 <br>转让折扣
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <i style="color: #FF0000">{{item.discountAmount | formatMoney}}</i>元 <br>折扣金额
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <span style="color: #FF7611">
                                                  <i>{{item.annualRate | formatMoney}}</i>%<br>
                                                  <form style="color:rgba(102,102,102,1);">历史年化</form>
                                             </span>
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <i>{{item.surplusPeriodLeftDay}}</i>天 <br>剩余期限
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <div class="checkdetail" @click="$router.push({path:'/debtList/detail',query:{id:item.id }})">查看详情</div>
                                        </div>
                                   </div>
                              </div>
                         </li>
                    </ul>

                    <ul class="datalist-specifica" v-if="projectList.length && listtype[1].isShow === true">
                         <li v-for="(item,index) in loansList" :key="index">
                              <!--<div class="datalist-specificL">
                         							<img v-if="!item.logoAppUrl" style="cursor: pointer;" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" src="~@/assets/images/moren.png" width="125" height="86" />
                         							<img v-if="item.logoAppUrl" style="cursor: pointer;" :src="item.logoAppUrl" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" alt="" width="125" height="86">
                         						</div>-->
                              <div class="datalist-specificR">
                                   <div class="datalist-specificR-top">
                                        <div class="datalist-specificR-topL">
                                             <!--<div class="pfName">{{item.pfName}}</div>-->
                                             <div class="pfName" v-for="itm in loansType" v-text="itm.key" v-show="item.type== itm.value"></div>
                                             <!--<div class="discount_zui" :style="leftBackground" v-for='(itmc,index) in item.labels' v-if="index < 3">{{itmc.name}}</div>
                         									<div class="prepay-text" v-if="item.prepayFlag">预付</div>-->
                                             <div class="discount-text" v-if="item.holdType == 1" style="color: #666;">转让</div>
                                             <div class="discount-text" v-if="item.holdType == 2" style="color: #666;">代理</div>
                                             <div class="discount-text" v-if="item.holdType == 3" style="color: #666;">皆可</div>
                                             <div v-if="item.type==1">
                                                  <div class="discount-text" v-if="item.lawsuitState == 1" style="color: #666;">已诉讼</div>
                                                  <div class="discount-text" v-if="item.lawsuitState == 2" style="color: #666;">未诉讼</div>
                                             </div>
                                             <div v-if="item.type==2">
                                                  <div class="discount-text" v-if="item.lawsuitState == 1" style="color: #666;">已仲裁</div>
                                                  <div class="discount-text" v-if="item.lawsuitState == 2" style="color: #666;">未仲裁</div>
                                             </div>
                                        </div>
                                        <div class="datalist-specificR-topR">
                                             <div class="Rdiscount-text" @click="getTendencya(item.type)">
                                                  <div><img src="~@/assets/images/discount.png" alt=""></div>
                                                  <div>折扣趋势</div>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="datalist-specificR-context">
                                        <div class="datalist-specificR-context-item">
                                             <i style="color: #3963D0;font-size: 16px;font-weight: bold;">{{item.amountAndInterest | formatMoney}}</i>元<br>债权本息
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <i style="color: #FF0000;font-size: 16px">{{item.rate}}</i>折 <br>转让折扣
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <i style="color: #FF0000">{{item.amount | formatMoney}}</i>元 <br>成交金额
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <span>
                                             	<i v-if='item.type == 2'>无</i>
                                                  <i v-else>{{item.localProvince}}<a v-if='item.localProvince || item.localCity'>/</a>{{item.localCity}}</i><br>
                                                  <form style="color:rgba(102,102,102,1);">债务人所在地</form>
                                             </span>
                                        </div>
                                        <div class="datalist-specificR-context-item">
                                             <div class="checkdetail" @click="$router.push({path:'/debtList/detailj',query:{id:item.id }})">查看详情</div>
                                        </div>
                                   </div>
                              </div>
                         </li>
                    </ul>

               </div>
          </div>
          <!-- 暂无数据 -->
          <div class="dataList" v-if="!projectList.length && listtype[0].isShow === true">
               <div class="blank"></div>
               <div class="img">
                    <img src="~@/assets/images/nodata.png" alt="">
               </div>
               <div class="nodataTitle">
                    暂无精选推荐
               </div>
          </div>
          <!-- 折扣趋势 -->
          <el-dialog title="折扣趋势" :visible.sync="isShow" width="80%" :show-close="true">
               <tendency id="bar_type" :tendencyData="tendencyData"></tendency>
          </el-dialog>

     </div>
</template>
<script>
import ajax from '@utils/config';
import tendency from '@/components/tendency1.vue';
import Cookies from 'js-cookie';
export default {
     components: {
          tendency
     },
     data() {
          return {
               leftBackground: {
                    background: 'url(' + require("./img/oodd.png") + ') no-repeat',
                    'background-size': '100% 100%',
               },
               projectList: [],
               loansList: [],//借条列表
               loansType: [//订单类型:1、个人借条 2、小贷(金融)借条
                    { key: '个人借条', value: '1' },
                    { key: '小贷借条', value: '2' }
               ],
               holdType: [//承接方式: 1、转让 2、代理签收 3、两者皆可
                    { key: '转让', value: '1' },
                    { key: '代理签收', value: '2' },
                    { key: '两者皆可', value: '3' }
               ],
               parme: {
                    limit: 10,
                    page: 1,
               },
               isShow: false,
               zhuf: true,
               tendencyData: [],
               tendencyId: '1111',
               tendencyName: '',
               imgList: [],
               NEWS: [],
               imgd: [{
                    imgc: [{
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }]
               },
               {
                    imgc: [{
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }],
               },
               {
                    imgc: [{
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }, {
                         img: require("./img/det-bgimg.png"),
                    }],
               },
               ],
               listtype: [
                    { title: 'P2P债权', index: 0, isShow: true },
                    { title: '借条债权', index: 1, isShow: false },
               ],
          }
     },
     computed: {},
     created() {
          this.getProject();
          this.getBanner();
          this.getProjecta();
          this.getLoans();
          // console.log(this.imgd)
     },
     mounted() { },
     methods: {
          dianjizhu() {
               this.zhuf = false
          },
          //趋势曲线PC
			getTendencya(val) {
				ajax({
						url: "order_loans/discountRates",
						optionParams: {
							type: val
						}
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.tendencyData = res.data;
							this.isShow = true;
						} else {
							
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
          //趋势曲线PC
          getTendency(val) {
               ajax({
                    url: "orderTransfer/discountRates",
                    optionParams: {
                         name: val
                    }
               }).post()
                    .then(res => {
                         if (res.code === 200) {
                              this.tendencyData = res.data;
                              this.isShow = true;
                         } else { }
                    })
                    .catch(error => {
                         console.log(error)
                    })
          },
          toptypeti(val) {
               if (val === '0' || val === 0) {

               } else if (val === '1' || val === 1) {

               }
               this.listtype[0].isShow = false;
               this.listtype[1].isShow = false;
               this.listtype[val].isShow = true;
          },
          //热门平台
          getProjecta() {
               ajax({
                    url: 'platform/hot_list',
                    optionParams: this.parme
               }).post()
                    .then(response => {
                         if (response.code === 200) {
                              let data = response.data.records ? response.data.records : [];
                              if (data.length > 5) {
                                   this.initData(data);
                              } else {
                                   this.NEWS.push({
                                        NEWSa: data
                                   });
                              }
                         } else {
                              this.projectList = [];
                         }

                    })
                    .catch(error => {
                         console.log(error)
                    })
          },
          initData(data) {
               let arr = [];
               if (data.length >= 5) {
                    arr = data.splice(0, 5);
               } else {
                    console.log(data.length)
                    arr = data.splice(0, data.length);
               }
               this.NEWS.push({
                    NEWSa: arr
               });
               if (data.length != 0) {
                    this.initData(data);
               }
               console.log(this.NEWS)
          },
          getProject() {
               ajax({
                    url: 'index/fineList',
                    optionParams: {}
               }).fetch()
                    .then(response => {
                         if (response.code === 200) {
                              this.projectList = response.data ? response.data : [];
                         } else {
                              this.projectList = [];
                         }

                    })
                    .catch(error => {
                         console.log(error)
                    })
          },
          // 获取借条
          getLoans() {
               ajax({
                    url: 'index/loans_list',
                    optionParams: {}
               }).fetch()
                    .then(response => {
                         if (response.code === 200) {
                              this.loansList = response.data ? response.data : [];
                         } else {
                              this.loansList = [];
                         }

                    })
                    .catch(error => {
                         console.log(error)
                    })
          },
          //获取banner图
          getBanner() {
               ajax({
                    url: 'index/bannerList',
                    optionParams: {}
               }).fetch()
                    .then(response => {
                         if (response.code === 200) {
                              this.imgList = response.data;
                         } else {
                              console.log(response)
                         }

                    })
                    .catch(error => {
                         console.log(error)
                    })
          },
          goUrl(val) {
               window.open(val);
               // console.log(11111);
               // var reg = /http:\/\/\w*(\.\w*)+/ig;
               // if(!reg.test(val)){
               // 	this.$message.error('平台债权链接地址有误');
               // }
               // else{
               // 	window.open(val);
               // }
          },
          //banner图跳转
          gourl(val) {
               if (val == '') {

               } else {
                    var token = localStorage.getItem('token');
                    console.log(token)
                    //console.log(val+'?token='+token)
                    window.open(val + '?token=' + token);
               }

          },
          //banner图跳转
          gourla() {
               this.$router.push({
                    path: '/debtList/detaila',
                    query: {
                         id: 1
                    }
               })
          },
     },
     filters: {
          //金钱过滤
          formatMoney(val) {
               return val.toFixed(2);
          }
     }
}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
</style>