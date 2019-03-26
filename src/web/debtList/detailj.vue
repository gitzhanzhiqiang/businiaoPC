<template>
	<div class="detail psspd">
		<div class="middle"></div>
		<div class="debtDetail">
			<div class="title">借款详情</div>
			<div class="middleCon">
				<div class="thirdStatus">
					<div class="datalist-specificR-topL">
						<div class="pfName" v-if="detailData.type == 1">个人借条</div>
						<div class="pfName" v-if="detailData.type == 2">小贷借条</div>
						<!--<div class="discount_zui" :style="leftBackground" v-for='(itmc,index) in item.labels' v-if="index < 3">{{itmc.name}}</div>
            <div class="prepay-text" v-if="item.prepayFlag">预付</div>-->
						<div class="discount-text" v-if="detailData.holdType == 1" style="color: #666;">转让</div>
						<div class="discount-text" v-if="detailData.holdType == 2" style="color: #666;">代理</div>
						<div class="discount-text" v-if="detailData.holdType == 3" style="color: #666;">皆可</div>
						<div v-if="detailData.type==1">
							<div class="discount-text" v-if="detailData.lawsuitState == 1" style="color: #666;">已诉讼</div>
							<div class="discount-text" v-if="detailData.lawsuitState == 2" style="color: #666;">未诉讼</div>
						</div>
						<div v-if="detailData.type==2">
							<div class="discount-text" v-if="detailData.lawsuitState == 1" style="color: #666;">已仲裁</div>
							<div class="discount-text" v-if="detailData.lawsuitState == 2" style="color: #666;">未仲裁</div>
						</div>
					</div>
					<div class="Rdiscount-text" @click="getTendency(detailData.type)">
						<div style="margin-right: 10px;">
							<img src="~@/assets/images/discount.png" alt>
						</div>
						<div>折扣趋势</div>
					</div>
				</div>

				<div class="trendecy">
					<div class="maskl">
						<span>订单号：</span>
						<p>{{detailData.id}}</p>
					</div>
					<div class="maskl">
						<span>发布日期：</span>
						<p v-if>{{detailData.createTime | parseTime('{y}-{m}-{d}')}}</p>
					</div>
					<div class="amountBottom">
						<div class="undertake" v-if="detailData.status === 0" @click="confirmBox();">立即承接</div>
						<div class="undertake disabled" v-if="detailData.status === 1||detailData.status === 3||detailData.status === 5||detailData.status === 11||detailData.status === 12||detailData.status === 13||detailData.status === 14||detailData.status === 16||detailData.status === 20||detailData.status === 30">锁定中</div>
						<div class="undertake disabled" v-if="detailData.status === 4">已下架</div>
						<div class="undertake disabled" v-if="detailData.status === 2||detailData.status === 15||detailData.status === 22||detailData.status === 31">已转让</div>
						<div class="undertake disabled" v-if="detailData.status === -1">待付款</div>
					</div>
				</div>
			</div>
			<div class="amountItem">
				<div class="amountTop">
					<div class="amountLeft">
						<img src="~@/assets/images/backLeft.png" alt>
					</div>
					<div class="mainCon">
						<div class="bdtype">
							<div class="bdtypeCon">
								<div class="bdtypetitle">承接方式</div>
								<div class="name" v-for="item in holdType" v-text="item.key" v-show="detailData.holdType== item.value"></div>
								<div v-if="detailData.holdType!==1">
									<div class="bdtypetitle">代理清收费率</div>
									<div class="name">{{detailData.proxyFeeRate}}%</div>
								</div>
							</div>
						</div>
						<div class="flash"></div>
						<div class="main">
							<div class="item">
								<div class="amount">{{detailData.amountAndInterest}}元</div>
								<div class="amounttitle">债权本息</div>
							</div>
							<div class="item">
								<div class="amount">
									<a style="color: #FF0000;">{{detailData.rate}}</a>折
								</div>
								<div class="amounttitle">转让折扣</div>
							</div>
							<div class="item">
								<div class="amount">
									<a style="color: #FF0000;">{{detailData.amount}}</a>元
								</div>
								<div class="amounttitle">成交金额</div>
							</div>
							<div class="item" v-if="detailData.type==1">
								<div class="amount">{{detailData.baseAmount}}元</div>
								<div class="amounttitle">债权本金</div>
							</div>
							<div class="item" v-if="detailData.type==2">
								<div class="amount">{{detailData.debtOrderCount}}个</div>
								<div class="amounttitle">债权数量</div>
							</div>
							<div class="item" v-if="detailData.type==1">
								<div class="amount">{{detailData.interest}}元</div>
								<div class="amounttitle">债权利息</div>
							</div>
							<div class="item" v-if="detailData.type==2">
								<div class="amount">{{detailData.debtAmountAvg}}元</div>
								<div class="amounttitle">债权均值</div>
							</div>
						</div>
					</div>
					<div class="amountLeft">
						<img src="~@/assets/images/backRight.png" alt>
					</div>
				</div>
			</div>
			<div class="amounbottom">
				<div class="amounl">
					<ul>
						<li v-if="detailData.remark">
							备注 |
							<p>{{detailData.remark}}</p>
						</li>
						<li v-if="detailData.type==1">债务人姓名 | &nbsp;{{detailData.debtorName}}</li>
						<li v-if="detailData.type==1">债务人地址 | &nbsp;{{detailData.localDetail}}</li>
						<li v-if="detailData.payFlag==1">债务人联系方式 | &nbsp;QQ {{detailData.qqCode}}</li>
						<li v-if="detailData.payFlag==0">
							债务人联系方式 | &nbsp;支付信息展示费用后显示，
							<span style="font-size:16px;color:rgba(57,99,208,1);cursor:pointer;" @click="$router.push({ path: '/saleClaim/payBirda', query: { data:JSON.stringify(detailData),source:'payment'}});">点我支付</span>
							<img @click="centerDialogVisiblefei = true" src="./img/wenhao.png" alt style="margin:10px 255px 0 0;float:right;cursor:pointer;">
						</li>
					</ul>
				</div>
				<div class="amounr">
					<ul>
						<li v-if="detailData.type==1">
							诉讼情况 | &nbsp;
							<span v-for="item in lawsuitState" v-text="item.key" :value="item.key" v-show="detailData.lawsuitState == item.value"></span>
						</li>
						<li v-if="detailData.type==2">
							仲裁情况 | &nbsp;
							<span v-for="item in lawsuitState1" v-text="item.key" :value="item.key" v-show="detailData.lawsuitState == item.value"></span>
						</li>
						<li v-if="detailData.type==1 && detailData.lawsuitState==1">诉讼本金 | &nbsp;{{detailData.lawsuitAmount}}</li>
						<li v-if="detailData.type==2 && detailData.lawsuitState==1">仲裁本金 | &nbsp;{{detailData.lawsuitAmount}}</li>
						<li v-if="detailData.type==1 && detailData.lawsuitState==1">诉讼机构 | &nbsp;{{detailData.lawsuitOrg}}</li>
						<li v-if="detailData.type==2 && detailData.lawsuitState==1">仲裁机构 | &nbsp;{{detailData.lawsuitOrg}}</li>
						<li v-if="detailData.lawsuitState==1">
							执行状态 | &nbsp;
							<span v-for="item in lawsuitProgress" v-text="item.key" :value="item.key" v-show="detailData.lawsuitProgress == item.value"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="blank"></div>
		<!-- 输入债权密码 -->
		<el-dialog title="债权密码" :visible.sync="dialogPwd" width="30%" :show-close="false">
			<!-- form表单 -->
			<el-form :model="delayData" :rules="rules" ref="delayData" label-width="120px" class="demo-delayData">
				<el-row>
					<el-col :span="24">
						<el-form-item label="债权密码:" prop="tranPwd">
							<el-input v-model="delayData.tranPwd" type="password" maxlength="6" placeholder="请输入债权密码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit('delayData')">提交</el-button>
							<el-button @click="resetForm('delayData');dialogPwd = false;delayData.tranPwd = '';">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
		<!-- 设置qq号码 -->
		<el-dialog title="承接确认" :visible.sync="dialogEditLoginQQ" width="30%" :show-close="false">
			<!-- form表单 -->
			<el-form :model="delayData" :rules="rules" ref="delayData" label-width="120px" class="demo-loginPwdForm">
				<el-row>
					<el-col :span="24">
						<p style="height: 40px;text-indent: 3em;font-size: 16px;">是否确认承接该债权？</p>
						<el-form-item label="QQ号码:" prop="qqCode">
							<el-input v-model="setupqq.qqCode" maxlength="16" placeholder="请输入QQ号码 , 方便交易对接？ 选填！"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="qqshezhi()">提交</el-button>
							<el-button @click="dialogEditLoginQQ = false;">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
		<!-- 折扣趋势 -->
		<el-dialog title="折扣趋势" :visible.sync="dialogShow" width="80%" :show-close="true">
			<tendency id="bar_type" :tendencyData="tendencyData"></tendency>
		</el-dialog>
		<!-- 分享 -->
		<el-dialog title="分享债权信息" :visible.sync="centerDialogVisible" width="39%" center>
			<p class="text">分享出去，让更多人看到，会增加债转成功率哦</p>
			<textarea id="cpLink" readonly v-model="dizhi"></textarea>
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shareBox" class="copybtn">复制链接</el-button>
      </span>
		</el-dialog>
		<el-dialog title :visible.sync="centerDialogVisiblefei" width="20%" center>
			<p>信息展示费=成交金额*费率（{{fuwufei}}%）</p>
			<p>*费率会根据不同成交金额进行变动，最低2元</p>
		</el-dialog>
	</div>
</template>
<script>
	import ajax from "@utils/config";
	import { parseTime } from "@/filters";
	import tendency from "@/components/tendency1.vue";
	import Cookies from "js-cookie";
	export default {
		components: {
			tendency
		},
		data() {
			var validTranPwd = (rule, value, callback) => {
				if(String(value).length != 6) {
					callback(new Error("交易密码格式错误"));
					return false;
				}
				callback();
			};
			return {
				leftBackground: {
					background: "url(" + require("./img/oodd.png") + ") no-repeat center",
					"background-size": "100% 100%"
				},
				bg: {
					backgroundImage: "url(" + require("@/assets/images/backItem.png") + ")",
					backgroundRepeat: "repeat",
					backgroundSize: "100% 100%"
				},
				detailData: {},
				dialogShow: false,
				tendencyData: [],
				tendencyName: "",
				isShow: false,
				centerDialogVisiblefei: false,
				dialogEditLoginQQ: false,
				dialogPwd: false,
				isBindCard: null,
				loansId: "",
				dizhi: "",
				userId: "",
				delayData: {
					tranPwd: ""
				},
				rules: {
					tranPwd: [{
							required: true,
							message: "债权密码不能为空",
							trigger: "blur"
						},
						{
							validator: validTranPwd,
							trigger: "blur"
						}
					]
				},
				userInfo: {},
				response: {},
				setupqq: {
					qqCode: ""
				},
				fuwufei: "",
				centerDialogVisible: false,
				holdType: [
					//承接方式: 1、转让 2、代理签收 3、两者皆可
					{
						key: "转让",
						value: "1"
					},
					{
						key: "代理清收",
						value: "2"
					},
					{
						key: "两者皆可",
						value: "3"
					}
				],
				lawsuitState: [
					//诉讼/仲裁情况: 1、已诉讼 2、未诉讼 3、不清楚
					{
						key: "已诉讼",
						value: "1"
					},
					{
						key: "未诉讼",
						value: "2"
					},
					{
						key: "不清楚",
						value: "3"
					}
				],
				lawsuitState1: [
					//诉讼/仲裁情况: 1、已诉讼 2、未诉讼 3、不清楚
					{
						key: "已仲裁",
						value: "1"
					},
					{
						key: "未仲裁",
						value: "2"
					},
					{
						key: "不清楚",
						value: "3"
					}
				],
				lawsuitProgress: [
					//诉讼/仲裁执行状态: 1、执行中 2、已判决 3、未判决 4、终结执行
					{
						key: "执行中",
						value: "1"
					},
					{
						key: "已判决",
						value: "2"
					},
					{
						key: "未判决",
						value: "3"
					},
					{
						key: "终结执行",
						value: "4"
					}
				]
			};
		},
		computed: {},
		created() {
			this.loansId = this.$route.query.id ?
				this.$route.query.id :
				Cookies.get("loansId");
			var ishw = this.$route.query.ishw ? this.$route.query.ishw : "";
			Cookies.set("loansId", this.loansId);
			if(ishw == 1) {
				this.centerDialogVisible = true;
			}
			this.dizhi =
				"http://192.168.0.121:8081/web/tmp/#/debtList/detailj?id=" + this.loansId; //http://192.168.0.121:8081/web/tmp/#/debtList/detailj?id=LNS69497439823990784   https://www.bsnzz.com/debtList/detail?id=
			Cookies.set("loansId", this.loansId);
			this.getApplyList();
			//this.getTable();
			//this.shareBox();
		},
		mounted() {},
		methods: {
			getServerRate() {
				ajax({
						url: "order_loans/info_fee_rate",
						optionParams: {
							amount: this.detailData.amount
						}
					})
					.post()
					.then(res => {
						if(res.code === 200) {
							this.fuwufei = res.data.rate;
						} else {
							this.fuwufei = "";
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			getTendency(val) {
				ajax({
						url: "order_loans/discountRates",
						optionParams: {
							type: val
						}
					})
					.post()
					.then(res => {
						if(res.code === 200) {
							this.tendencyData = res.data;
							this.dialogShow = true;
						} else {}
					})
					.catch(error => {
						console.log(error);
					});
			},
			//获取详情数据
			getApplyList() {
				ajax({
						url: "order_loans/detail",
						optionParams: {
							loansId: this.loansId
						}
					})
					.post()
					.then(response => {
						console.log(response);
						if(response.code === 200) {
							this.detailData = response.data ? response.data : {};
							this.getServerRate();
							// this.tendencyName = this.detailData.pfName;
							// this.getTendency();
						} else {}
					})
					.catch(error => {
						console.log(error);
					});
			},
			qqshezhi() {
				console.log(this.setupqq.qqCode);
				if(this.setupqq.qqCode == "") {
					this.underTake();
					return false;
				} else if(
					this.setupqq.qqCode.length > 13 ||
					this.setupqq.qqCode.length < 5
				) {
					this.$message.error("请输入正确QQ号");
				} else {
					this.submitLoginQQForm();
					this.underTake();
					return false;
				}
			},
			// qq密码
			submitLoginQQForm() {
				ajax({
						url: "tAppUser/qqCode",
						optionParams: this.setupqq
					})
					.post()
					.then(response => {
						if(response.code === 200) {
							this.$message.success(response.message);
							this.setupqq.qqCode = "";
							this.dialogEditLoginQQ = false;
						} else {
							this.$message.error(response.message);
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			//弹框
			confirmBox() {
				if(!Cookies.get("token")) {
					this.$router.push("/login");
					return false;
				}
				this.getTable();
				// return false;
				// if (this.isBindCard != '1') {
				// 	//未绑卡
				// 	this.$message.error('请先绑定银行卡');
				// 	this.$router.push({ path: '/personalCenter/index', query: { index: 5 } });
				// 	return false;
				// }
			},
			// 1.是否登录，未登录跳出登录页面；
			// 2.是否绑定银行卡，未绑定跳出绑定页面；
			// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
			// 4.是否为预付债转，如为预付债转，直接跳转至设置的债权平台的债权链接地址，跳转后项目状态更改为【锁定中】
			// 5.是否为一般债权，如为一般债权，弹出弹窗提示，并且项目状态更改为【锁定中】
			//立即承接
			//分享弹框
			shareBox() {
				var url = document.getElementById("cpLink");
				url.select();
				document.execCommand("copy");
				this.$message.success("复制成功");
				this.centerDialogVisible = false;
				return;
			},
			underTake() {
				ajax({
						url: "order_loans/hold",
						optionParams: {
							loansId: this.detailData.id
						}
					})
					.post()
					.then(res => {
						if(res.code === 200) {
							this.$message.success(res.message);
							if(this.detailData.payFlag == 1) {
								this.$router.push({
									path: "/personalCenter/index",
									query: {
										index: 2
									}
								});
							} else {
								this.$router.push({ path: '/saleClaim/payBirda', query: { data:JSON.stringify(this.detailData)}});
							}

							this.getApplyList();
						} else {
							this.$message.error(res.message);
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			// 2.是否绑定银行卡，未绑定跳出绑定页面；
			goBindCard() {
				this.$message.error("请先绑定银行卡");
				this.$router.push({
					path: "/personalCenter/index",
					query: {
						index: 8
					}
				});
				return false;
			},

			// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
			submit(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						ajax({
								url: "orderTransfer/holdDebt",
								optionParams: {
									orderId: this.orderId,
									tranPwd: this.delayData.tranPwd
								}
							})
							.post()
							.then(response => {
								if(response.code === 200) {
									this.$message.success(
										"您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户"
									);
									this.resetForm("delayData");
									this.dialogPwd = false;
									this.getApplyList();
									this.$router.push({
										path: "/personalCenter/index",
										query: {
											index: 2
										}
									});
								} else {
									this.$message.error(response.message);
								}
							})
							.catch(error => {
								console.log(error);
							});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			//是否绑卡
			getTable() {
				ajax({
						url: "tAppUser/userInfo",
						optionParams: {}
					})
					.fetch()
					.then(res => {
						if(res.code === 200) {
							this.userInfo = res.data;
							this.isBindCard = res.data.isBindCard;
							this.userId = res.data.userId;
							if(res.data.userId === this.detailData.userId) {
								//不能承接自己的债转
								this.$message.error("不可承接本人发布的债权");
								return false;
							}
							if(res.data.qqCode == "" || res.data.qqCode == null) {
								this.dialogEditLoginQQ = true;
							} else {
								this.$confirm("是否确认承接该债权？", "承接确认", {
										confirmButtonText: "确定",
										cancelButtonText: "取消",
										type: "warning"
									})
									.then(() => {
										this.underTake();
									})
									.catch(() => {
										this.$message({
											type: "info",
											message: "已取消承接"
										});
									});
							}
						} else {}
					})
					.catch(error => {
						console.log(error);
					});
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
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
			}
		},
		filters: {
			//金钱过滤
			formatMoney(val) {
				if(val) {
					return val.toFixed(2);
				}
			}
		}
	};
</script>
<style lang='scss' scoped>
	.detail {
		width: 100%;
		background-color: #f7f8fd;
		.middle {
			width: 100%;
			height: 215px;
			background: #f7f8fd;
		}
		.debtDetail {
			margin: auto;
			margin-top: -200px;
			width: 1200px;
			height: 740px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(242, 242, 242, 1);
			border-radius: 4px 4px 0px 0px;
			margin-bottom: 30px;
			.amounbottom {
				width: 1010px;
				overflow: hidden;
				margin: 0 auto;
				.amounl {
					float: left;
					width: 680px;
					ul {
						li {
							line-height: 40px;
							font-size: 16px;
							font-family: PingFang-SC-Regular;
							font-weight: 400;
							color: #666666;
							p {
								width: 625px;
								float: right;
							}
						}
					}
				}
				.amounr {
					float: right;
					width: 300px;
					ul {
						li {
							line-height: 40px;
							font-size: 16px;
							font-family: PingFang-SC-Regular;
							font-weight: 400;
							color: #666666;
						}
					}
				}
			}
			.title {
				height: 28px;
				line-height: 28px;
				margin-left: 34px;
				margin-top: 21px;
				text-indent: 20px;
				border-left: 4px solid rgba(57, 99, 208, 1);
				font-size: 14px;
				font-family: MicrosoftYaHei;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
			.middleCon {
				height: 140px;
				width: 100%;
				.logo {
					width: 125px;
					height: 86px;
					float: left;
					margin-left: 93px;
					margin-top: 25px;
				}
				.thirdStatus {
					width: 1005px;
					height: 70px;
					margin-left: 95px; // margin-top: 23px;
					float: left;
					.tatustai {
						float: left;
						line-height: 50px;
						font-size: 14px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: #666;
						margin-left: 20px;
					}
					.Rdiscount-text {
						font-size: 14px;
						float: right;
						width: 97px;
						height: 22px;
						line-height: 22px;
						cursor: pointer;
						margin-top: 18px;
						&>div {
							float: left;
						}
					}
					.pfName {
						height: 50px;
						font-size: 16px;
						font-family: MicrosoftYaHei-Bold;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
						line-height: 50px;
						float: left;
						margin-right: 10px;
					}
					.discount-text {
						height: 26px;
						font-size: 14px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						line-height: 26px;
						float: left;
						padding: 0px 25px;
						margin-top: 14px;
						background-size: 100% 100%;
					}
					.orderNum {
						font-size: 14px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(0, 0, 0, 1);
						line-height: 14px;
						float: right;
						margin-top: 17px;
					}
				}
				.trendecy {
					width: 1002px;
					height: 90px;
					float: left;
					line-height: 140px;
					font-size: 14px;
					font-family: MicrosoftYaHeiLight;
					font-weight: 300;
					color: rgba(102, 102, 102, 1);
					margin-left: 98px;
					.orderStatus {
						height: 30px;
						float: left;
						.orderItem {
							line-height: 20px;
							width: 60px;
							height: 20px;
							color: rgba(57, 99, 208, 1);
							text-align: center;
							border: 1px solid rgba(57, 99, 208, 1);
							border-radius: 14px;
							margin-right: 10px;
							float: left;
						}
						.orientFlag {
							border: 1px solid rgba(242, 48, 47, 1);
							color: rgba(242, 48, 47, 1);
						}
						.prepayFlag {
							border: 1px solid rgba(247, 187, 81, 1);
							color: rgba(247, 187, 81, 1);
						}
					}
					.link-text {
						margin-right: 20px;
						font-size: 14px;
						float: right;
						width: 97px;
						height: 22px;
						line-height: 22px;
						cursor: pointer;
						&>div {
							float: left;
						}
					}
					.Rdiscount-text {
						font-size: 14px;
						float: right;
						width: 97px;
						height: 22px;
						line-height: 22px;
						cursor: pointer;
						&>div {
							float: left;
						}
					}
					.maskl {
						width: 300px;
						height: 60px;
						float: left;
						span {
							float: left;
							font-size: 14px;
							font-family: MicrosoftYaHeiLight;
							font-weight: 300;
							color: rgba(102, 102, 102, 1);
							line-height: 30px;
						}
						p {
							width: 230px;
							height: 60px;
							line-height: 30px;
							float: right;
							font-size: 14px;
							font-family: SourceHanSansCN-Light;
							font-weight: 300;
							color: rgba(102, 102, 102, 1);
						}
					}
					.amountBottom {
						width: 100%;
						height: 141px;
						position: relative;
						.undertake {
							width: 128px;
							height: 32px;
							line-height: 32px;
							text-align: center;
							background: rgba(57, 99, 208, 1);
							border-radius: 20px;
							font-size: 14px;
							font-family: MicrosoftYaHeiLight;
							font-weight: 300;
							color: rgba(255, 255, 255, 1);
							cursor: pointer;
							float: right;
						}
						.disabled {
							background: rgba(102, 102, 102, 1);
						}
					}
				}
			}
			.amountItem {
				width: 1138px;
				height: 262px;
				overflow: hidden;
				border-top: 1px solid rgba(90, 123, 252, 0.16); // border-bottom:1px solid rgba(90, 123, 252, 0.16);
				margin: 20px auto;
				box-shadow: 0px 1px 0px 0px rgba(90, 123, 252, 0.16);
				.amountTop {
					width: 100%;
					height: 262px;
					display: flex;
					display: -webkit-flex;
					.amountLeft {
						width: 27px;
						height: 100%;
					}
					.mainCon {
						flex: 1;
						.bdtype {
							width: 100%;
							height: 95px;
							.bdtypeCon {
								height: 100%;
								width: 1003px;
								margin: auto;
								.bdtypetitle {
									float: left;
									margin-top: 40px;
									height: 14px;
									line-height: 14px;
									font-size: 14px;
									font-family: MicrosoftYaHeiLight;
									font-weight: 300;
									color: rgba(102, 102, 102, 1);
								}
								.name {
									float: left;
									margin-top: 40px;
									margin-left: 18px;
									margin-right: 93px;
									line-height: 16px;
									height: 16px;
									font-size: 16px;
									font-family: SourceHanSansCN-Light;
									font-weight: 300;
									color: rgba(0, 0, 0, 1);
								}
							}
						}
						.main {
							display: flex;
							display: -webkit-flex;
							height: 80px;
							margin-top: 40px;
							.item {
								flex: 1;
								// text-align: center;
								background: rgba(255, 255, 255, 1);
								text-indent: 2.5rem;
								.amount {
									width: 100%;
									height: 14px;
									line-height: 14px;
									padding-top: 26px;
									font-size: 18px;
									font-family: SourceHanSansCN-Light;
									font-weight: 400;
									color: rgba(0, 0, 0, 1);
								}
								.amounttitle {
									width: 100%;
									height: 14px;
									line-height: 14px;
									margin-top: 20px;
									font-size: 14px;
									font-family: MicrosoftYaHeiLight;
									font-weight: 300;
									color: rgba(102, 102, 102, 1);
								}
							}
						}
					}
				}
				.flash {
					height: 1px;
					width: 1000px;
					background: rgba(247, 247, 247, 1);
					margin: 0 auto;
				}
				.amountBottom {
					width: 100%;
					height: 141px;
					position: relative;
					.undertake {
						width: 300px;
						height: 42px;
						line-height: 42px;
						text-align: center;
						background: rgba(57, 99, 208, 1);
						border-radius: 20px;
						position: absolute;
						left: 391px;
						bottom: 170px;
						font-size: 18px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(255, 255, 255, 1);
						cursor: pointer;
					}
					.disabled {
						background: rgba(102, 102, 102, 1);
					}
				}
			}
		}
		.prograss {
			margin: 37px auto;
			width: 1200px;
			height: 453px;
			background: rgba( 255, 255, 255, 1); // border: 1px solid rgba(242, 242, 242, 1);
			border-radius: 4px 4px 0px 0px;
			.prograssImg {
				width: 100%;
				height: 393px;
			}
			.service {
				width: 100%;
				border: 1px solid rgba(242, 242, 242, 1);
				height: 60px;
				line-height: 60px;
				font-size: 14px;
				font-family: MicrosoftYaHei-Bold;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				text-align: center;
			}
		}
		.blank {
			width: 100%;
			height: 1px;
			background-color: #f7f8fd;
		} // .el-dialog{
		// 	border-radius:20px;
		.text {
			color: #999999;
			font-size: 20px;
			width: 249px;
			height: 50px;
			text-align: center;
			margin: 0 auto 16px;
			font-family: "SourceHanSansCN-Light";
			line-height: 30px;
		}
		#cpLink {
			color: #3963d0;
			text-align: center;
			border: none;
			width: 100%;
			outline: none;
			-webkit-appearance: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			resize: none;
			font-family: "SourceHanSansCN-Light";
		}
		.dialog-footer {
			.copybtn {
				width: 300px;
				height: 42px;
				background: rgba(57, 99, 208, 1);
				border-radius: 20px;
			}
		} // }
	}
</style>