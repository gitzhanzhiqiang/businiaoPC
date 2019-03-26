<template>
	<div class="mainPay">
		<div class="pay">
			<div class="title">
				<img src="~@/assets/images/safe.png" alt="">
			</div>
			<div class="detail">订单详情</div>
			<div class="list">
				<div class="item">
					<div class="itemList">平台名称：{{rowData.pfName}}</div>
					<div class="itemList">转让金额：{{rowData.amount}}元</div>
					<div class="itemList">标的年化：{{rowData.annualRate}}%</div>
					<div class="itemList">标的类型:
						<span v-if="rowData.bdType ==1">个人信用贷</span>
						<span v-if="rowData.bdType ==2">企业贷</span>
						<span v-if="rowData.bdType ==3">房抵贷</span>
						<span v-if="rowData.bdType ==4">车贷</span>
						<span v-if="rowData.bdType ==5">自助投标</span>
					</div>
				</div>
				<div class="item">
					<div class="itemList">还款方式:
						<span v-if="rowData.repaymentType ==0">一次性还本付息</span>
						<span v-if="rowData.repaymentType ==1">先息后本</span>
						<span v-if="rowData.repaymentType ==2">等额本息</span>
						<span v-if="rowData.repaymentType ==3">等额本金</span>
					</div>
					<div class="itemList">还款状况:
						<span v-if="rowData.repayStatus ==1">正常还款</span>
						<span v-if="rowData.repayStatus ==2">逾期还款</span>
					</div>
					<div class="itemList">债权到期日:{{rowData.surplusPeriod | parseTime('{y}-{m}-{d}')}}</div>
					<div class="itemList">转让有效期:{{rowData.effDay}}天</div>
				</div>
				<div class="item">
					<div class="itemList">折扣金额：{{rowData.discountAmount}}元</div>
					<div class="itemList">转让折扣：{{rowData.discountRate}}</div>
					<div class="itemList">债转链接：{{rowData.link}}</div>
				</div>
			</div>
			<div class="white"></div>
			<div class="content-box">
				<div class="payStyle">确认付款</div>
				<div class="mainCon" style="margin-top:30px;">
					<div class="amount">实际支付金额：
						<span>{{sjzf}}元</span>
					</div>
					<div class="amount">折扣金额：
						<span>{{rowData.discountAmount}}元</span>
					</div>
					<div class="amount">服务费：
						<span>{{fuwufeiyong}}元 <img src="./img/wenhao.png" @click="centerfulishuming =true"/></span>
					</div>
				</div>
				<div class="mainCon" style="margin-top:50px;margin-bottom:40px;">
					<div class="payTitle">选择方式：</div>
					<div class="tabButton">
						<div class="tabitemLeft" :class="{tabActive:tab1Show}" @click="tab1Show = true;tab2Show = false;tab3Show = false;confirmBox.payType = 1;">余额支付</div>
						<div class="tabitemCenter" :class="{tabActive:tab2Show}" @click="tab1Show = false;tab2Show = true;tab3Show = false;confirmBox.payType = 3;">网银支付</div>
						<div class="tabitemRight" :class="{tabActive:tab3Show}" @click="tab1Show = false;tab2Show = false;tab3Show = true;confirmBox.payType = 2;tabSelectOne(0);">认证支付</div>
					</div>
				</div>
				<div class="bank" v-if="tab1Show" style="height:50px;">
					<div class="bankTitle">支付银行：</div>
					<!-- 余额支付 -->
					<div class="bankLogo">
						<div class="img" style="width:230px;height:50px;margin-bottom:10px;float:left;">
							<div class="floatImg" style="width:230px;height:50px;" :style="bankBackground">
								<img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/bank/balance.png" alt="" width="230" height="50" style="opacity:.5;">
							</div>
							<!-- <div class="floatImg" style="width:230px;height:50px;">
                            <img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/bank/balance.png" alt="" width="230" height="50">
                        </div> -->
						</div>
					</div>
					<p>可用余额：<span>￥{{balance}}元</span></p>
				</div>
				<!-- 快捷支付 -->
				<div class="bank" v-if="tab3Show" style="min-height:50px;">
					<div class="bankTitle">支付银行：</div>
					<div class="bankLogo" style="width:800px;">
						<div class="img" v-for="(item,index) in cardCheckList" @click="tabSelectOne(index)" :key="index" style="width:230px;height:50px;float:left;margin-bottom:12px;margin-right:10px;">
							<div class="floatImg" v-if="item.isShow" style="width:230px;height:50px;" :style="bankBackground">
								<!--<img :src="item.bankLogo" alt="" width="230" height="50" style="opacity:.5;">-->
								{{item.bankName}}
							</div>
							<div class="floatImg" v-if="!item.isShow" style="width:230px;height:50px;line-height: 50px;text-align: center;border: 1px solid #999999;">
								<!--<img :src="item.bankLogo" alt="" width="230" height="50">-->
								{{item.bankName}}
							</div>
						</div>
					</div>
				</div>
				<!-- 网银支付 -->
				<div class="bank" v-if="tab2Show" style="height:250px;">
					<div class="bankTitle">支付银行：</div>
					<div class="bankLogo" style="width:800px;">
						<div class="img" v-for="(item,index) in bankCheckList" @click="tabSelectBank(index)" :key="index" style="width:230px;height:50px;float:left;margin-bottom:12px;margin-right:10px;">
							<img v-if="item.isSeleted" :src="item.selectedImg" alt="" width="230" height="50">
							<img v-if="!item.isSeleted" :src="item.img" alt="" width="230" height="50">
						</div>
					</div>
				</div>
				<!-- 优惠券： -->
				<div class="password">
					<div class="pwdTitle" style="text-align: left;">优惠券：</div>
					<div class="pwdInput" style="margin-left: 10px;">
						<el-select v-model="confirmBox.userCouponId" :placeholder="placeho" :disabled="isAble" @change='xuanze()' class="zhaizhuan-txt">
							<el-option v-for="item in dikoujuan" :key="item.id" :label="item.tite" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="youhuojun" v-if="rate != ''">- ¥ {{rate}}</div>
				<!-- 交易密码 -->
				<div class="password" v-if="tab1Show">
					<div class="pwdTitle">交易密码:</div>
					<div class="pwdInput">
						<el-input type="password" placeholder="请输入6位数字交易密码" maxlength="6" style="height:36px;width:400px;text-indent:10px;" v-model.number="confirmBox.transPassword">
						</el-input>
					</div>
				</div>

				<!--手机验证码  -->
				<!--<div class="password" v-if="tab3Show">
					<div class="pwdTitle">手机验证码:</div>
					<div class="pwdInput">
						<el-input placeholder="请输入手机验证码" maxlength="6" v-model="confirmBox.validatecode" style="width:400px;margin-left:10px;">
						</el-input>
						<span v-if="!isShow" @click="getCode()" style="width:20%;color:#3963D0;cursor: pointer;">获取</span>
						<span v-if="isShow" style="width:20%;color:#3963D0;">{{count}}s</span>
					</div>
				</div>-->
				<!-- 立即付款 -->
				<div class="payNow" @click="confirmCash()" v-if="clickShow" style="cursor: pointer;"> 
					立即付款
				</div>
				<div class="payNow" v-if="!clickShow" style="cursor: pointer;">
					立即付款
				</div>
				<div class="blank1"></div>
			</div>
			<div class="blank"></div>
			
			
			
			<el-dialog title="" :visible.sync="centerfulishuming" width="20%" center>
			<div class="shuoming">
				<p style="line-height: 30px;">服务费=转让金额*服务费率（{{fuwufei}}%）<br/>*服务费率会根据不同平台进行变动</p>
			</div>
		</el-dialog>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import { parseTime } from '@/filters';
	import Cookies from 'js-cookie';
	export default {
		components: {},
		data() {
			return {
				rowData: {},
				bankBackground: {
					backgroundImage: "url(" + require("@/assets/images/bank.png") + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "0px center",
					 backgroundPosition: "0px center",
					'line-height':' 50px',
				'text-align': 'center',
				},
				centerfulishuming:false,
				count: '',
				isShow: false,
				timer: null,
				confirmBox: { //充值参数
					amount: '',
					userCardId: '',
					validatecode: '',
					requestno: '',
					transPassword: '',
					payType: 1,
					bdType: '',
					userCouponId: '',
				},
				tab1Show: true,
				tab2Show: false,
				tab3Show: false,
				clickShow: true, //重复点击
				bankList: [], //银行卡
				cardCheckList: [], //银行卡选择
				requestnoStatus: false,
				bankCheckList: [ //网银支付银行卡选择
				{ bankCode: "01030000", selectedImg: require("@/assets/images/1.png"), img: require("@/assets/images/bank1.png"), isSeleted: true },
                { bankCode: "01040000", selectedImg: require("@/assets/images/2.png"), img: require("@/assets/images/bank2.png"), isSeleted: false },
                { bankCode: "01050000", selectedImg: require("@/assets/images/3.png"), img: require("@/assets/images/bank3.png"), isSeleted: false },
               	{ bankCode: "03030000", selectedImg: require("@/assets/images/4.png"), img: require("@/assets/images/bank4.png"), isSeleted: false },
                { bankCode: "03090000", selectedImg: require("@/assets/images/5.png"), img: require("@/assets/images/bank5.png"), isSeleted: false },
                { bankCode: "03050000", selectedImg: require("@/assets/images/6.png"), img: require("@/assets/images/bank6.png"), isSeleted: false },
                { bankCode: "03020000", selectedImg: require("@/assets/images/7.png"), img: require("@/assets/images/bank7.png"), isSeleted: false },
               	{ bankCode: "03060000", selectedImg: require("@/assets/images/8.png"), img: require("@/assets/images/bank8.png"), isSeleted: false },
                { bankCode: "03100000", selectedImg: require("@/assets/images/9.png"), img: require("@/assets/images/bank9.png"), isSeleted: false },
                { bankCode: "03070000", selectedImg: require("@/assets/images/10.png"), img: require("@/assets/images/bank10.png"), isSeleted: false },
                { bankCode: "01020000", selectedImg: require("@/assets/images/11.png"), img: require("@/assets/images/bank11.png"), isSeleted: false },
                { bankCode: "03080000", selectedImg: require("@/assets/images/12.png"), img: require("@/assets/images/bank12.png"), isSeleted: false },
                
                { bankCode: "04031000", selectedImg: require("@/assets/images/13.png"), img: require("@/assets/images/bank13.png"), isSeleted: false },
                { bankCode: "03040000", selectedImg: require("@/assets/images/14.png"), img: require("@/assets/images/bank14.png"), isSeleted: false },
                { bankCode: "01000000", selectedImg: require("@/assets/images/15.png"), img: require("@/assets/images/bank15.png"), isSeleted: false }
				],
				seleckCode: 'ABC-NET-B2C', //网银支付银行卡选中
				balance: '', //余额
				bdTypeList: [{
					name: 'fasfa',
					value: '1'
				}],
				debtDetail: {},
				optionParams: {
					page: 1,
					limit: 99999,
				},
				dikoujuan: [],
				rate: '',
				fuwufei:'',//服务费
				fuwufeiyong:'',
				sjzf:'',
				placeho:"请选择优惠卷",
				isAble:false,
			}
		},
		computed: {},
		created() {
			let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			this.rowData = data;
			console.log(this.rowData)
			this.getBankList();
			this.getTable()
			this.getTabld()
			this.getTabledayil()
			this.getServerRate()
			this.confirmBox.amount = this.formatMoney(this.rowData.discountAmount);
			//this.confirmBox.amount = this.rowData.discountAmount;
		},
		mounted() {

		},
		methods: {
			//获取银行卡信息 userCard/list
			getBankList() {
				this.cardCheckList = [];
				ajax({
						url: 'userCard/list',
						optionParams: {}
					}).fetch()
					.then(response => {
						if(response.code === 200) {
							this.bankList = response.data;
							if(this.bankList.length) {
								this.bankList.forEach((item) => {
									let obj = {
										userCardId: item.id,
										bankLogo: item.bankLogo,
										isShow: false,
										payType: 2,
										 bankName:item.bankName
									}
									// if (item.isMatser === 1) {
									//     obj.isShow = false;
									//     this.confirmBox.userCardId = item.id;
									// }
									this.cardCheckList.push(obj);
								})
								// let obj = {
								//     userCardId: 9999,//余额支付id默认值
								//     bankLogo: 'https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/bank/balance.png',
								//     isShow: true,
								//     payType: 1
								// }

								// this.confirmBox.userCardId = obj.userCardId;
								this.confirmBox.payType = 1;
								// this.cardCheckList.push(obj);
							} else {
								this.$message.error('请前往个人中心绑定银行卡！');

								this.$router.push({
									path: '/personalCenter/index',
									query: {
										index: 6
									}
								})
								// return false;
							}
						} else {
							this.$message.error(response.message);
						}
					})
					.catch(error => {
						console.log(error);
					})
			},
			//获取用户基本信息(余额)
			getTable() {
				ajax({
						url: 'tAppUser/userInfo',
						optionParams: {}
					}).fetch()
					.then(res => {
						if(res.code === 200) {
							// this.response = res.data ? res.data : {};
							console.log(res);
							this.balance = res.data.balance;
						} else {
							// console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//获取用户基本信息(余额)
			getTabledayil() {
				console.log(this.rowData)
				ajax({
						url: 'orderTransfer/debtDetail',
						optionParams: {
							orderId: this.rowData.id
						}
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.debtDetail = res.data
							if(this.debtDetail.initComplete == 1){
								var fuwuf = Number((this.rowData.amount*(this.fuwufei/100)).toFixed(2))
								this.rate = (this.debtDetail.feeEval - this.debtDetail.fee).toFixed(2)
								this.sjzf = ((this.debtDetail.discountAmount + fuwuf)- Number(this.rate)).toFixed(2) //实际金额
								this.isAble = true
								this.placeho = '您已使用过优惠卷'
							}else{
								if(this.dikoujuan.length == 0){
								this.isAble = true
								this.placeho = '暂无优惠卷'
								}else{
									var ddd = {tite:'暂不选择优惠卷',id:''}
									this.dikoujuan.push(ddd)
									this.dikoujuan.reverse()
									//console.log(this.dikoujuan.reverse())
								}
							}
							
						} else {
							// console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//获取可用diyongjian
			getTabld() {
				ajax({
						url: 'user_coupon/invalid_coupon_page',
						optionParams: this.optionParams
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.dikoujuan = res.data.records ? res.data.records : []
							this.dikoujuan.map((itm) => {
								var tien = parseTime(itm.expireTime, '{y}-{m}-{d}')
								var itt = itm.name + ' ' + itm.rate + '%OFF' + " (有效日期" + tien + ")"
								this.$set(itm, 'tite', itt)
							})
							
							console.log(this.dikoujuan)
						} else {
							this.dikoujuan = []
							// console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			xuanze() {
//				console.log(this.rowData.amount)
//				console.log(this.fuwufei)
//				console.log((this.rowData.amount*(this.fuwufei/100)).toFixed(2))
				//console.log(this.debtDetail.initComplete)
					this.dikoujuan.map((itm) => {
						if(itm.id == ''){
							this.rate = ''
							this.sjzf = (Number(this.rowData.discountAmount) + this.fuwufeiyong).toFixed(2)
						}else{
							if(this.confirmBox.userCouponId == itm.id) {
								var fuwuf = Number((this.rowData.amount*(this.fuwufei/100)).toFixed(2))
								console.log(fuwuf)//服务费
								console.log(itm.rate)
								console.log((itm.rate/100) * fuwuf)//优惠金额
								var youhui = (itm.rate/100) * fuwuf
								if(youhui > itm.maxPrice){
									console.log(this.debtDetail.discountAmount)//折扣金额
									this.sjzf = ((this.debtDetail.discountAmount + itm.maxPrice)- youhui).toFixed(2) //实际金额
									console.log(this.sjzf)
									this.rate = itm.maxPrice.toFixed(2)
								}else{
									console.log(this.debtDetail.discountAmount)//折扣金额
									this.sjzf = ((this.debtDetail.discountAmount + fuwuf)- youhui).toFixed(2) //实际金额
									console.log(this.sjzf)
									this.rate = youhui.toFixed(2)
								}
								
							}
							
						}
						
					})
					
				
			},
			getServerRate() {
				ajax({
						url: 'sys_fee/query_fee_rate/?pfName='+this.rowData.pfName +'&discountRate='+this.rowData.discountRate,
						optionParams: {
						}
					}).fetch()
					.then(res => {
						if(res.code === 200) {
							this.fuwufei = res.data
							this.fuwufeiyong = Number((this.rowData.amount*(this.fuwufei/100)).toFixed(2))
							this.sjzf = (Number(this.rowData.discountAmount) + this.fuwufeiyong).toFixed(2)
						} else {
							this.fuwufei = ''
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//银行卡选择
			tabSelectOne(index) {
				let _that = this;
				this.cardCheckList.forEach((item) => {
					item.isShow = false;
				})
				this.cardCheckList[index].isShow = true;
				this.confirmBox.userCardId = this.cardCheckList[index].userCardId;
				this.confirmBox.payType = this.cardCheckList[index].payType;
			},
			//网银支付银行卡选择
			tabSelectBank(index) {
				let _that = this;
				this.bankCheckList.forEach((item) => {
					item.isSeleted = false;
				})
				this.bankCheckList[index].isSeleted = true;
				this.seleckCode = this.bankCheckList[index].bankCode;
			},
			//金钱过滤
			formatMoney(val) {
				if(val){
				return val.toFixed(2);
				}
			},
			//转让人支付到聚财司
			// getCode() {
			// 	console.log(this.rowData.id)
			// 	const TIME_COUNT = 60;
			// 	if(!this.timer) {
			// 		this.count = TIME_COUNT;
			// 		this.isShow = true;
			// 		this.timer = setInterval(() => {
			// 			if(this.count > 0 && this.count <= TIME_COUNT) {
			// 				this.count--;
			// 			} else {
			// 				this.isShow = false;
			// 				clearInterval(this.timer);
			// 				this.timer = null;
			// 			}
			// 		}, 1000)
			// 	}
			// 	ajax({
			// 			url: 'orderTransfer/masterPay',
			// 			optionParams: {
			// 				userCardId: this.confirmBox.userCardId,
			// 				transferId: this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id,
			// 				payType: this.confirmBox.payType,
			// 				transPassword: this.confirmBox.transPassword,
			// 				userCouponId: this.confirmBox.userCouponId,
			// 			}
			// 		}).post()
			// 		.then(response => {
			// 			if(response.code === 200) {
			// 				this.$message.success(response.message);
			// 				this.confirmBox.requestno = response.data.requestno;
			// 			} else {
			// 				this.$message.error(response.message);
			// 			}

			// 		})
			// 		.catch(error => {
			// 			console.log(error)
			// 		})

			// },
			//确认充值
			confirmCash() {
				if(this.confirmBox.payType === 2) {
					// if(!this.confirmBox.validatecode) {
					// 	this.$message.error('请输入验证码！');
					// 	return false;
					// }
					this.clickShow = false;
					var sdid = this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id
					ajax({
							url: 'orderTransfer/masterPay',
							optionParams: {
								requestno: this.confirmBox.requestno,
								userCardId: this.confirmBox.userCardId,
								payType:'4',
								// validatecode: this.confirmBox.validatecode,
								userCouponId: this.confirmBox.userCouponId,
								transferId: this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id,
								callback: 'https://www.bsnzz.com/personalCenter/index?index=1',
							}
						}).post()
						.then(res => {
							if(res.code === 200) {
								this.$message.success(res.message);
								window.location.href=res.data.gatewayUrl
								// if(this.rowData.status == 11) {
								// 	this.$router.push({
								// 		path: '/personalCenter/index',
								// 		query: {
								// 			index: 1,
								// 			transOrderId: sdid
								// 		}
								// 	});
								// } else {
								// 	this.$router.push({
								// 		path: '/personalCenter/index',
								// 		query: {
								// 			index: 1,
								// 			dailogShow: true,
								// 			transOrderId: sdid
								// 		}
								// 	});
								// }
							} else {
								this.clickShow = true;
								this.$message.error(res.message);
							}

						})
						.catch(error => {
							console.log(error)
						})
				}
				if(this.confirmBox.payType === 1) {
					this.clickShow = false;
					this.confirmZhiFu();
				}
				// 网银支付
				if(this.confirmBox.payType === 3) {
					this.clickShow = false;
					this.netpay();
					Cookies.remove('saleDebt');
				}
			},
			// 网银支付转让人支付到不死鸟
			netpay() {
				console.log(this.rowData.id)
				var sdid = this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id
				ajax({
						url: 'orderTransfer/masterPay',
						optionParams: {
							payType: this.confirmBox.payType,
							transferId: this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id,
							bank: this.seleckCode,
							userCouponId: this.confirmBox.userCouponId,
							// callback: 'https://www.bsnzz.com',
							callback: 'https://www.bsnzz.com/personalCenter/index?index=1',
						}
					}).post()
					.then(res => {
						if(res.code === 200) {
							window.open(res.data.url);
							if(this.rowData.status == 11) {
								this.$router.push({
									path: '/personalCenter/index',
									query: {
										index: 1,
										transOrderId: sdid
									}
								});
							} else {
								this.$router.push({
									path: '/personalCenter/index',
									query: {
										index: 1,
										dailogShow: true,
										transOrderId: sdid
									}
								});
							}
						} else {
							this.clickShow = true;
							this.$message.error(res.message);
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//支付到不死鸟
			confirmZhiFu() {
				console.log(this.rowData.id)
				var sdid = this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id
				ajax({
						url: 'orderTransfer/masterPay',
						optionParams: {
							userCardId: this.confirmBox.userCardId,
							transferId: this.rowData.id.transOrderId ? this.rowData.id.transOrderId : this.rowData.id,
							payType: this.confirmBox.payType,
							transPassword: this.confirmBox.transPassword,
							userCouponId: this.confirmBox.userCouponId,
						}
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.confirmBox.requestno = res.data.requestno;
							// this.confirmBox.isShow = false;
							this.$message.success(res.message);
							if(this.rowData.status == 11) {
								this.$router.push({
									path: '/personalCenter/index',
									query: {
										index: 1,
										transOrderId: sdid
									}
								});
							} else {
								this.$router.push({
									path: '/personalCenter/index',
									query: {
										index: 1,
										dailogShow: true,
										transOrderId: sdid
									}
								});
							}
							//this.isshow = !this.isshow;
							//this.getApplyList();

						} else {
							this.clickShow = true;
							this.$message.error(res.message);
						}

					})
					.catch(error => {
						console.log(error)
					})
			}
		},
		filters: {

		}
	}
</script>
<style lang='scss' scoped>
	.youhuojun {
		font-size: 16px;
		font-family: MicrosoftYaHeiLight;
		font-weight: 300;
		color: rgba(247, 15, 15, 1);
		width: 300px;
		margin-left: 235px;
	}
	
	.mainPay {
		width: 100%;
		background-color: #f7f8fd;
		.pay {
			width: 1200px;
			margin: 0 auto;
			background-color: #fff;
			.title {
				width: 1200px;
				height: 100px;
				font-size: 32px;
				font-family: MicrosoftYaHei-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 100px;
				text-align: center;
			}
			.detail {
				margin-top: 34px;
				margin-left: 57px;
				width: 90px;
				height: 28px;
				line-height: 28px;
				font-size: 14px;
				font-family: MicrosoftYaHeiLight;
				color: rgba(51, 51, 51, 1);
				font-weight: 300;
				border-left: 4px solid rgba(57, 99, 208, 1);
				text-indent: 5px;
			}
			.list {
				width: 100%;
				margin-top: 11px;
				height: 112px;
				.item {
					width: 33.3%;
					float: left;
					height: 100%;
					.itemList {
						height: 33.3%;
						width: 100%;
						text-indent: 104px;
						line-height: 36px;
						font-size: 14px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(128, 128, 128, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.white {
				height: 65px;
				width: 100%;
				border-bottom: 1px solid rgb(217, 218, 220);
				margin-bottom: 34px;
				background: rgba(255, 255, 255, 1);
			}
			.content-box {
				// padding-top: 20px;
				width: 1200px; // height: 680px;
				// background-color: #f7f8fd;
				// margin: 0 auto;
				background: rgba(255, 255, 255, 1);
				// box-shadow: 0px 4px 8px 1px rgba(90, 123, 252, 0.16);
				.payStyle {
					margin-left: 57px;
					height: 28px;
					font-size: 14px;
					font-family: MicrosoftYaHeiLight;
					font-weight: 300;
					color: rgba(51, 51, 51, 1);
					line-height: 28px;
					border-left: 4px solid rgba(57, 99, 208, 1);
					text-align: center;
					width: 70px;
				}
				.mainCon {
					width: 1060px;
					height: 36px;
					margin-left: 140px;
					.amount {
						width: 33.3%;
						float: left;
						height: 36px;
						line-height: 36px;
						font-size: 20px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(128, 128, 128, 1);
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						&>span {
							font-size: 18px;
							font-family: MicrosoftYaHeiLight;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							img{
							    width: 20px;
							    height: 20px;
							    float: right;
							    margin-right: 165px;
							    margin-top: 9px;
								cursor: pointer;
							}
						}
					}
					.payTitle {
						float: left;
						width: 100px;
						height: 40px;
						font-size: 18px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(0, 0, 0, 1);
						line-height: 40px;
					}
					.tabButton {
						float: left;
						width: 480px;
						height: 40px; // background: rgba(57, 99, 208, 1);
						.tabitemLeft {
							text-align: center;
							height: 38px;
							width: 158px;
							border: 1px solid rgba(153, 153, 153, 1);
							float: left;
							line-height: 40px;
							font-size: 9px;
							font-family: MicrosoftYaHei;
							font-weight: bold;
							color: rgba(153, 153, 153, 1);
							background: #fff;
							border-radius: 20px 0px 0px 20px;
						}
						.tabitemCenter {
							text-align: center;
							height: 38px;
							width: 158px;
							float: left;
							line-height: 40px;
							font-size: 9px;
							font-family: MicrosoftYaHei;
							font-weight: bold;
							color: rgba(153, 153, 153, 1);
							background: #fff;
							border: 1px solid rgba(153, 153, 153, 1);
						}
						.tabitemRight {
							text-align: center;
							height: 38px;
							width: 158px;
							float: left;
							line-height: 40px;
							font-size: 9px;
							font-family: MicrosoftYaHei;
							font-weight: bold;
							color: rgba(153, 153, 153, 1);
							background: #fff;
							border-radius: 0px 20px 20px 0px;
							border: 1px solid rgba(153, 153, 153, 1);
						}
						.tabActive {
							// border-radius: 20px;
							background: rgba(57, 99, 208, 1);
							color: rgba(255, 255, 255, 1);
							border: 1px solid rgba(57, 99, 208, 1);
						}
					}
				}
				.bank {
					width: 1060px;
					margin-left: 140px;
					min-height: 50px;
					margin-bottom: 51px;
					.bankTitle {
						float: left;
						// margin-left: -700px;
						font-size: 18px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(0, 0, 0, 1);
						width: 100px;
						// text-align: left;
						line-height: 50px;
						height: 50px;
					}
					.bankLogo {
						float: left;
						width: 950px;
						// margin-left: 12px;
						// min-height: 250px;
					}
					>p {
						padding-left: 100px;
						color: #333333;
						font-size: 14px;
					}
				}
				.password {
					width: 700px;
					// margin: 40px auto;
					margin-left: 140px;
					height: 50px;
					line-height: 40px;
					.pwdTitle {
						width: 100px;
						float: left;
						font-size: 18px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(0, 0, 0, 1);
					}
					.pwdInput {
						float: left;
					}
				}
				.payNow {
					width: 300px;
					margin: 50px auto;
					margin-bottom: 0;
					height: 42px;
					background: rgba(57, 99, 208, 1);
					border-radius: 20px;
					line-height: 42px;
					font-size: 18px;
					font-family: MicrosoftYaHeiLight;
					font-weight: 300;
					color: rgba(255, 255, 255, 1);
					text-align: center;
				}
				.valideCode {
					width: 100%;
					text-align: left;
					text-indent: 140px;
				}
				.blank1 {
					width: 100%;
					height: 40px;
					background-color: #fff;
				}
			}
			.blank {
				width: 100%;
				height: 40px;
				background-color: #f7f8fd;
			}
		}
	}
</style>