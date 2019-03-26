<template>
	<div style="width:100%;">
		<div class="banner" style="background: #f7f8fd;padding-top: 20px;">
		</div>
		<div class="datalist-layer">
			<div class="datalist">
				<div class="datalist-top">
					<div class="rightsearch">
						<div class="search bar7" style="position: relative;">
							<form>
								<input type="text" v-model="optionParams.loansId" placeholder="输入平台名称可直接搜索哟~">
								<div class='button' @click="getApplyList();">
									<img src="./img/fang.png" />
								</div>
							</form>
						</div>
						<ul v-if="pfNameList" style="background-color: #fff;color: #666666;position: absolute;z-index: 999;width: 660px;">
							<div v-for="(item,index) in pfNameList" :key="index">
								<li style="height:30px;line-height:30px;cursor:pointer;" @click="seach(item)">{{item}}</li>
							</div>
						</ul>
						<!-- <div class="rightsearch-layer" style="position:relative;">
                <img class="fl  " src="./img/search.png" alt="" @click="getApplyList()">
                <input class="rightsearch-input" placeholder="输入平台名称可直接搜索哟~" type="text" v-model="optionParams.favorites" v-on:input="getPlatform()">
                <img class="fr rightsearch-layerR-img" src="./img/search-clear.png" alt="" @click="optionParams.favorites = '';pfNameList = [];">
                <ul v-if="pfNameList" style="position: absolute;left:0px;top:36px;width:220px;z-index:9900;background-color: transparent;">
                  <li style="height:30px;line-height:30px;cursor:pointer;" v-for="(item,index) in pfNameList" :key="index" @click="seach(item)">{{item}}</li>
                </ul>
                
              </div> -->
					</div>
					<!--<div class="debtdataStatus">
            <span>债权类型：</span>
            <ul class="debtdataStatus-list">
              <li v-for="i in debtdataStatus" v-text="i.name" @click="checkdebt(i.key,0)" :class="{active:params.activestatus==i.key}"></li>
            </ul>
          </div>-->
					<div class="debtdataType">
						<span>债权状态：</span>
						<ul class="debtdataType-list">
							<li v-for="i in debtdataType" v-text="i.name" @click="checkdebt(i.key,1)" :class="{active:params.activetype==i.key}"></li>
						</ul>
					</div>
					<div class="debtdataTypea">
						<span>平台类型：</span>
						<ul class="debtdataTypea-list">
							<li v-for="i in debtdataTypea" v-text="i.name" @click="checkdebt(i.key,2)" :class="{active:params.isSafe==i.key}"></li>
						</ul>
					</div>
					<div class="debtdataTypea">
						<span>省份地区：</span>
						<ul class="debtdataTypea-list">
							<li style="padding: 0px 0px;">
								<el-cascader :options="options" clearable v-model="selectedOptions3" @change='diqu()'></el-cascader>
							</li>
						</ul>
					</div>
				</div>
				<div class="debtdataBottom">
					<ul class="debtdataBottom-list">
						<!-- <li v-for="i in debtdataBottom" @click="checkdebt(i.key,2)" :class="{activeBottom:params.activetype==i.key}">
                      <span>{{i.name}}</span>
                    </li> -->
						<!-- 最新 -->
						<li @click="optionParams.amountSort = 0;optionParams.rateSort = 0;optionParams.aniSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">最新
						</li>
						<!-- 债权本息  aniSort-->
						<li v-if="optionParams.aniSort === 0" @click="optionParams.aniSort = 1;optionParams.amountSort = 0;optionParams.rateSort = 0;getApplyList();">债权本息
							<img src="./img/shan.png" v-if="optionParams.aniSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.aniSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.aniSort === 2">
						</li>
						<li v-if="optionParams.aniSort === 1" @click="optionParams.aniSort = 2;optionParams.amountSort = 0;optionParams.rateSort = 0;getApplyList();">债权本息
							<img src="./img/shan.png" v-if="optionParams.aniSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.aniSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.aniSort === 2">
						</li>
						<li v-if="optionParams.aniSort === 2" @click="optionParams.aniSort = 0;optionParams.amountSort = 0;optionParams.rateSort = 0;getApplyList();">债权本息
							<img src="./img/shan.png" v-if="optionParams.aniSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.aniSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.aniSort === 2">
						</li>
						<!-- 转让折扣 -->
						<li v-if="optionParams.rateSort === 0" @click="optionParams.rateSort = 1;optionParams.amountSort = 0;optionParams.aniSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让折扣
							<img src="./img/shan.png" v-if="optionParams.rateSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.rateSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.rateSort === 2">
						</li>
						<li v-if="optionParams.rateSort === 1" @click="optionParams.rateSort = 2;optionParams.amountSort = 0;optionParams.aniSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让折扣
							<img src="./img/shan.png" v-if="optionParams.rateSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.rateSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.rateSort === 2">
						</li>
						<li v-if="optionParams.rateSort === 2" @click="optionParams.rateSort = 0;optionParams.amountSort = 0;optionParams.aniSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让折扣
							<img src="./img/shan.png" v-if="optionParams.rateSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.rateSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.rateSort === 2">
						</li>
						<!-- 成交金额 -->
						<li v-if="optionParams.amountSort === 0" @click="optionParams.amountSort = 1;optionParams.rateSort = 0;optionParams.aniSort = 0;getApplyList();">成交金额
							<img src="./img/shan.png" v-if="optionParams.amountSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
						</li>
						<li v-if="optionParams.amountSort === 1" @click="optionParams.amountSort = 2;optionParams.rateSort = 0;optionParams.aniSort = 0;getApplyList();">成交金额
							<img src="./img/shan.png" v-if="optionParams.amountSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
						</li>
						<li v-if="optionParams.amountSort === 2" @click="optionParams.amountSort = 0;optionParams.rateSort = 0;optionParams.aniSort = 0;getApplyList();">成交金额
							<img src="./img/shan.png" v-if="optionParams.amountSort === 0">
							<img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
							<img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
						</li>
					</ul>
				</div>
				<ul class="datalist-specific" v-if="allData.length" style="min-height:100px;">
					<li v-for="(item,index) in allData" :key="index">
						<div class="datalist-specificR">
							<div class="datalist-specificR-top">
								<div class="datalist-specificR-topL">
									<div class="pfName" v-if="item.type==1">个人借条</div>
									<div class="pfName" v-if="item.type==2">小贷借条</div>

									<div v-if="item.holdType==1" class="label">转让</div>
									<div v-if="item.holdType==2" class="label">代理</div>
									<div v-if="item.holdType==3" class="label">皆可</div>
									<div v-if="item.lawsuitState==1&&item.type==1" class="label">已诉讼</div>
									<div v-if="item.lawsuitState==2&&item.type==1" class="label">未诉讼</div>
									<div v-if="item.lawsuitState==1&&item.type==2" class="label">已仲裁</div>
									<div v-if="item.lawsuitState==2&&item.type==2" class="label">未仲裁</div>
									<!-- <div class="discount-text" v-if="item.repayStatus == 1" style="color:#666666;">正常</div> -->
								</div>
								<div class="datalist-specificR-topR">
									<!--<div class="link-text" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" style="color:#666666;">
	                    <div><img src="~@/assets/images/shuben.png" alt=""></div>
	                    <div>平台档案</div>
	                  </div>
                  <div class="link-text" @click="goUrl(item.link)" style="color:#666666;">
                    <div><img src="~@/assets/images/link.png" alt=""></div>
                    <div>预览链接</div>
                  </div>-->
									<div class="Rdiscount-text" @click="tendencyId = item.id;getTendency(item.type)">
										<div><img src="~@/assets/images/discount.png" alt=""></div>
										<div>折扣趋势</div>
									</div>
								</div>
							</div>
							<div class="datalist-specificR-context">
								<div class="datalist-specificR-context-item">
									<i style="color:rgba(51,51,51,1);font-size: 16px">{{item.amountAndInterest | formatMoney}}</i>元<br>债权本息
								</div>
								<div class="datalist-specificR-context-item">
									<i style="color: #FF0000;font-size: 16px">{{item.rate | formatMoney}}</i>折 <br>转让折扣
								</div>
								<div class="datalist-specificR-context-item">
									<i style="color: #FF0000">{{item.amount | formatMoney}}</i>元 <br>成交金额
								</div>
								<div class="datalist-specificR-context-item">
									<span>
										<i v-if='item.type == 2'>无</i>
					                    <i v-else style="color:rgba(51,51,51,1);">{{item.localProvince}} <a v-if='item.localProvince || item.localCity'>/</a> {{item.localCity}}</i><br>债务人所在地
					                  </span>
								</div>
								<!--<div class="datalist-specificR-context-item">
                  <i>{{item.surplusPeriodLeftDay}}</i>天 <br>剩余期限
                </div>-->
								<div class="datalist-specificR-context-item">
									<div class="checkdetail" v-if="item.status === 0" @click="$router.push({path:'/debtList/detailj',query:{id:item.id }})">查看详情</div>
									<div class="checkdetail" style="background:rgba(107,115,136,1);" v-if="item.status === 1||item.status === 3||item.status === 5||item.status === 11||item.status === 12||item.status === 13||item.status === 14||item.status === 16||item.status === 20||item.status === 30" @click="$router.push({path:'/debtList/detailj',query:{id:item.id}})">锁定中</div>
									<div class="checkdetail" style="background:rgba(204,204,204,1);" v-if="item.status === 2 ||item.status === 15 ||item.status === 22 ||item.status === 31" @click="$router.push({path:'/debtList/detailj',query:{id:item.id}})">已转让</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<!-- 暂无数据 -->
				<div class="dataList" v-if="!allData.length">
					<div class="blank"></div>
					<div class="img">
						<img src="~@/assets/images/nodata1.png" alt="">
					</div>
					<div class="nodataTitle">
						暂无转让债权
					</div>
					<div class="return" @click="returnData()">
						返回列表
					</div>
				</div>
				<!-- 分页 -->
				<div v-if="total" class="pagination-container">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30,50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
				<div style="height: 1px;width:100%"></div>
			</div>
		</div>
		<!-- 折扣趋势 -->
		<el-dialog title="折扣趋势" :visible.sync="isShow" width="80%" :show-close="true">
			<tendency :id="tendencyId" :tendencyData="tendencyData"></tendency>
		</el-dialog>
		<!-- <div class="height540"> </div>
          <div style="width: 100%; height: 270px;"></div> -->
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import tendency from '@/components/tendency1.vue';
	import myaddresse from '../../../static/shend.json';
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
				leftBackgrounda: {
					background: 'url(' + require("./img/oowl.png") + ') no-repeat',
					'background-size': '100% 100%',
				},
				debtdataTypea: [{
					name: '全部',
					key: ''
				}, {
					name: '个人',
					key: '1'
				}, {
					name: '小贷',
					key: '2'
				}, ],
				debtdataType: [{
					name: '全部',
					key: ''
				}, {
					name: '可承接',
					key: '1'
				}, {
					name: '已转让',
					key: '3'
				}, ],
				debtdataStatus: [{
					name: '全部',
					key: ''
				}, {
					name: '预付',
					key: '1'
				}, {
					name: '定向',
					key: '2'
				}, {
					name: '担保',
					key: '3'
				}, ],
				debtdataBottom: [{
					name: '转让金额',
					key: ''
				}, {
					name: '转让折扣',
					key: '1'
				}, {
					name: '折扣金额',
					key: '2'
				}, {
					name: '剩余期限',
					key: '3'
				}, ],
				params: {
					activetype: '', //债权转让类型
					activestatus: '', //债权转让状态
					isSafe: '',
				},
				optionParams: {
					aniSort: 0,
					loansId:'',
					amountSort: 0,
					rateSort: 0,
					isAssure: 0,
					isOrient: 0,
					status: [],
					favorites: [],
					type:[],
					limit: 10,
					page: 1,
					isSafe: '',
					localProvince:'',
					localCity:'',
				},
				favorites: '', //模糊搜索平台
				allData: [],
				total: 0,
				tendencyData: [],
				tendencyId: '',
				isShow: false,
				pfNameList: [],
				selectedOptions3: [],
				options: [],
			}
		},
		computed: {},
		created() {
			this.checkdebt('1', '');
			console.log(myaddresse)
			// this.getApplyList();
			myaddresse.map((itm) => {
				this.$set(itm, 'value', itm.name)
				this.$set(itm, 'label', itm.name)
				this.$set(itm, 'children', itm.city)
				itm.children.map((itmm) => {
					this.$set(itmm, 'value', itmm.name)
					this.$set(itmm, 'label', itmm.name)
					//						var cheen = []
					//						itmm.area.map((itma)=>{
					//							var dd = {value:itma,label:itma}
					//							cheen.push(dd)
					//						})
					//						this.$set(itmm, 'children',cheen)
				})
			})
			//console.log(myaddressa)
			this.options = myaddresse
		},
		mounted() {},
		methods: {
			diqu(){
				this.optionParams.localProvince = this.selectedOptions3[0]
				this.optionParams.localCity = this.selectedOptions3[1]
				this.getApplyList();
			},
			//趋势曲线PC
			getTendency(val) {
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
			//返回列表
			returnData() {
				this.favorites = '';
				this.optionParams = {
					aniSort: 0,
					loansId:'',
					amountSort: 0,
					rateSort: 0,
					isAssure: 0,
					isOrient: 0,
					status: [],
					favorites: [],
					type:[],
					limit: 10,
					page: 1,
					localProvince:'',
					localCity:'',
				}
				this.getApplyList();
			},
			//债转列表
			getApplyList() {
				if(this.favorites) {
					this.optionParams.favorites = [this.favorites];
				} else {
					this.optionParams.favorites = [];
				}
				ajax({
						url: 'order_loans/list',
						optionParams: this.optionParams
					}).post()
					.then(response => {
						this.optionParams.favorites = '';
						if(response.code === 200) {
							this.allData = response.data.records ? response.data.records : [];
							this.total = response.data.total;
						} else {
							this.allData = [];
							this.total = 0;
							this.$message.error(response.message);
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//模糊查询选中
			seach(val) {
				this.favorites = val;

				this.pfNameList = [];
				this.getApplyList();
			},
			checkdebt(key, type) {
				if(type == 0) {
					this.params.activestatus = key;
					if(key === '') {
						this.optionParams.isAssure = 0;
						this.optionParams.isOrient = 0;
						this.optionParams.isPrepay = 0;
					} else if(key === '1') {
						this.optionParams.isAssure = 0;
						this.optionParams.isOrient = 0;
						this.optionParams.isPrepay = 1;
					} else if(key === '2') {
						this.optionParams.isAssure = 0;
						this.optionParams.isOrient = 1;
						this.optionParams.isPrepay = 0;
					} else if(key === '3') {
						this.optionParams.isAssure = 1;
						this.optionParams.isOrient = 0;
						this.optionParams.isPrepay = 0;
					} else {

					}
					this.getApplyList();
				} else if(type == 1) {
					this.params.activetype = key;
					if(key === '') {
						this.optionParams.status = [];
					} else if(key === '1') {
						this.optionParams.status = [1];
					} else if(key === '2') {
						this.optionParams.status = [2];
					} else if(key === '3') {
						this.optionParams.status = [2];
					}
					// this.optionParams.orderByField = status;
					this.getApplyList();

				} else if(type == 2) {
					this.params.isSafe = key;
					this.optionParams.type = [];
					if(key === '') {
						this.optionParams.isSafe = 0;
					} else if(key === '1') {
						this.optionParams.isSafe = 1;
						this.optionParams.type = [1];
					} else if(key === '2') {
						this.optionParams.isSafe = 2;
						this.optionParams.type = [2];
					}
					// this.optionParams.orderByField = status;
					this.getApplyList();

				} else {

				}
			},

			//m模糊查询平台列表
			getPlatform() {
				if(this.favorites) {
					ajax({
							url: "orderTransfer/findPfNames",
							optionParams: {
								name: this.favorites
							}
						}).post()
						.then(res => {
							if(res.code === 200) {
								this.pfNameList = res.data;
							} else {
								this.pfNameList = [];
							}
						})
						.catch(error => {
							console.log(error)
						})
				}

			},
			//
			changeCount() {
				this.pfNameList = [];
			},
			// 改变每一页的条数
			handleSizeChange(val) {
				this.optionParams.limit = val;
				this.optionParams.page = 1; //从第一页开始
				this.getApplyList();
			},
			// 切换页码
			handleCurrentPageChange(val) {
				this.optionParams.page = val;
				this.getApplyList();
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
	@import './scss/indexa.scss';
	/*搜索框7*/
</style>