<template>

	<div class="detail psspd">
		<div class="middle">
		</div>
		<div class="debtDetail">
			<div class="title">
				债权详情
			</div>
			<div class="middleCon">
				<div class="logo">
					<img v-if="detailData.logoAppUrl" @click="$router.push({path:'/detaila',query:{id:detailData.pfName }})" :src="detailData.logoAppUrl" width="125" height="86" />
					<img v-if="!detailData.logoAppUrl" @click="$router.push({path:'/detaila',query:{id:detailData.pfName }})" src="~@/assets/images/moren.png" width="125" height="86" />
				</div>
				<div class="thirdStatus">
					<div class="pfName">
						{{detailData.pfName}}
					</div>
					<div class="discount-text" :style="leftBackground" v-for='(itmc,index) in detailData.labels' v-if='index<3'>{{itmc.name}}</div>
					<div class="orderNum">
						<span>订单号：{{detailData.id}}</span>
						<span style="margin-left:17px;">发布日期：{{detailData.createTime | parseTime('{y}-{m}-{d}')}}</span>
					</div>
					
				</div>
				
				<div class="trendecy">
					<div class="orderStatus">
						<div class="orderItem prepayFlag" v-if="detailData.prepayFlag">预付</div>
						<div class="orderItem orientFlag" v-if="detailData.orientFlag">定向</div>
						<div class="orderItem orientFlag" v-if="detailData.repayStatus == 1" style="border:1px solid rgba(72,118,165,1);color: rgba(72,118,165,1);">正常</div>
						<div class="orderItem orientFlag" v-if="detailData.repayStatus == 2" style="border:1px solid rgba(72,118,165,1);color: rgba(72,118,165,1);">逾期</div>
						<div class="orderItem orientFlag" v-if="detailData.bdType == 1" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">信贷</div>
						<div class="orderItem orientFlag" v-if="detailData.bdType == 2" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">企贷</div>
						<div class="orderItem orientFlag" v-if="detailData.bdType == 3" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">房贷</div>
						<div class="orderItem orientFlag" v-if="detailData.bdType == 4" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">车贷</div>
						<div class="orderItem orientFlag" v-if="detailData.bdType == 5" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">自投</div>
					</div>
                  <div class="Rdiscount-text" @click="getTendency(detailData.pfName)">
                    <div style="margin-right: 10px;"><img src="~@/assets/images/discount.png" alt=""></div>
                    <div>折扣趋势</div>
                  </div>
                  <div class="link-text" @click="goUrl(detailData.link)" style="color:#666666;">
                    <div style="margin-right: 10px;"><img src="~@/assets/images/link.png" alt=""></div>
                    <div>预览链接</div>
                  </div>
                  <div class="link-text" @click="$router.push({path:'/detaila',query:{id:detailData.pfName }})" style="color:#666666;">
                    <div><img style="margin-right: 10px;" src="~@/assets/images/shuben.png" alt=""></div>
                    <div>平台档案</div>
                  </div>
                  <div class="maskl" v-if="detailData.remark">
                  	<span>备注:</span>
                  	<p>{{detailData.remark}}</p>
                  </div>
				</div>
			</div>
			<div class="amountItem">
				
				<div class="amountTop">
					
					<div class="amountLeft">
						<img src="~@/assets/images/backLeft.png" alt="">
					</div>
					<div class="mainCon">
						<div class="bdtype">
							<div class="bdtypeCon">
								<div class="bdtypetitle">还款方式</div>
								<div class="name" v-if="detailData.repaymentType ==0">一次性还本付息</div>
								<div class="name" v-if="detailData.repaymentType ==1">先息后本</div>
								<div class="name" v-if="detailData.repaymentType ==2">等额本息</div>
								<div class="name" v-if="detailData.repaymentType ==3">等额本金</div>
								<div class="bdtypetitle">还款状况</div>
								<div class="name" v-if="detailData.repayStatus ===null">&nbsp;&nbsp;</div>
								<div class="name" v-if="detailData.repayStatus ==1">正常还款</div>
								<div class="name" v-if="detailData.repayStatus ==2">逾期还款</div>
								<div class="bdtypetitle">标的类型</div>
								<div class="name" v-if="detailData.bdType ===null">&nbsp;&nbsp;</div>
								<div class="name" v-if="detailData.bdType ==1">个人信用贷</div>
								<div class="name" v-if="detailData.bdType ==2">企业贷</div>
								<div class="name" v-if="detailData.bdType ==3">房抵贷</div>
								<div class="name" v-if="detailData.bdType ==4">车贷</div>
								<div class="name" v-if="detailData.bdType ==5">自助投标</div>
							</div>
						</div>
						<div class="flash"></div>
						<div class="main">
						<div class="item">
							<div class="amount">{{detailData.amount | formatMoney}}元</div>
							<div class="amounttitle">转让金额</div>
						</div>
						<div class="item">
							<div class="amount">{{detailData.discountRate}}折</div>
							<div class="amounttitle">转让折扣</div>
						</div>
						<div class="item">
							<div class="amount">{{detailData.discountAmount | formatMoney}}元</div>
							<div class="amounttitle">折扣金额</div>
						</div>
						<div class="item">
							<div class="amount">{{detailData.annualRate | formatMoney}}%</div>
							<div class="amounttitle">历史年化</div>
						</div>
						<div class="item">
							<div class="amount">{{detailData.surplusPeriodLeftDay}}天</div>
							<div class="amounttitle">剩余期限</div>
						</div>
						<!-- <div class="item">
							<div class="amount">
								<span v-if="detailData.repaymentType ==0">一次性还本付息</span>
								<span v-if="detailData.repaymentType ==1">先息后本</span>
								<span v-if="detailData.repaymentType ==2">等额本息</span>
								<span v-if="detailData.repaymentType ==3">等额本金</span>
							</div>
							<div class="amounttitle">
								还款方式

							</div>

						</div> -->
						<div class="item">
							<div class="amount">{{detailData.effDay}}天</div>
							<div class="amounttitle">转让有效期</div>
						</div>
						</div>
					</div>
					
					<div class="amountLeft">
						<img src="~@/assets/images/backRight.png" alt="">
					</div>
				</div>
				<div class="amountBottom">
					<div class="undertake" v-if="detailData.status === 0" @click="confirmBox();">
						立即承接
					</div>
					<div class="undertake disabled" v-if="detailData.status === 1||detailData.status === 3||detailData.status === 5||detailData.status === 11||detailData.status === 12||detailData.status === 13||detailData.status === 14||detailData.status === 16||detailData.status === 20||detailData.status === 30">
						锁定中
					</div>
					<div class="undertake disabled" v-if="detailData.status === 4">
						已下架
					</div>
					<div class="undertake disabled" v-if="detailData.status === 2||detailData.status === 15||detailData.status === 22||detailData.status === 31">
						已转让
					</div>
					<div class="undertake disabled" v-if="detailData.status === -1">
						待付款
					</div>
				</div>
			</div>

		</div>
		<div class="prograss">
			<div class="prograssImg">
				<img src="~@/assets/images/prograss.png" alt="">
			</div>
			<div class="service">
				<不死鸟>对双方交易金额提供全程担保服务
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
							<el-input v-model="delayData.tranPwd" type='password' maxlength="6" placeholder="请输入债权密码"></el-input>
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
                                <el-button  type="primary" @click="qqshezhi()">提交</el-button>
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
	</div>
</template>
<script>
import ajax from '@utils/config';
import { parseTime } from '@/filters';
import tendency from '@/components/tendency1.vue';
import Cookies from 'js-cookie';
export default {
	components: {
		tendency
	},
	data() {
		var validTranPwd = (rule, value, callback) => {
			if (String(value).length != 6) {
				callback(new Error('交易密码格式错误'));
				return false;
			}
			callback();
		};
		return {
			leftBackground: {
	        background: 'url(' + require("./img/oodd.png") + ') no-repeat center',
	        'background-size': '100% 100%',
	    },
			bg:{
				backgroundImage: "url(" + require("@/assets/images/backItem.png") + ")",
				backgroundRepeat: "repeat",
				backgroundSize: "100% 100%",
			},
			detailData: {},
			dialogShow: false,
			tendencyData: [],
			tendencyName: '',
			isShow: false,
			dialogEditLoginQQ:false,
			dialogPwd: false,
			isBindCard: null,
			orderId: '',
			dizhi:'',
			userId: '',
			delayData: {
				tranPwd: '',
			},
			rules: {
				tranPwd: [
					{ required: true, message: "债权密码不能为空", trigger: "blur" },
					{ validator: validTranPwd, trigger: 'blur' }
				],
			},
			userInfo:{},
			response:{},
			setupqq:{
            	qqCode:'',
           },
			centerDialogVisible: false,
		}
	},
	computed: {
	},
	created() {   
		this.orderId = this.$route.query.id?this.$route.query.id:Cookies.get('orderId');
		 var ishw = this.$route.query.ishw?this.$route.query.ishw:'';
		Cookies.set('orderId',this.orderId)
		if(ishw == 1){
			this.centerDialogVisible = true
		}
		this.dizhi = 'https://www.bsnzz.com/debtList/detail?id=' + this.orderId  //https://www.bsnzz.com/  //http://192.168.0.121:8081/web/tg/  //http://192.168.0.107:8080/#/
		Cookies.set('orderId',this.orderId);
		this.getApplyList();
		//this.getTable();
		//this.shareBox();
	},
	mounted() {
	},
	methods: {
		getTendency() {
			ajax({
				url: "orderTransfer/discountRates",
				optionParams: {
					name: this.tendencyName
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.tendencyData = res.data;
						this.dialogShow = true;
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//获取详情数据
		getApplyList() {
			ajax({
				url: "orderTransfer/debtDetail",
				optionParams: {
					orderId: this.orderId,
				}
			}).post()
				.then(res => {
					console.log(res);
					if (res.code === 200) {
						this.detailData = res.data;
						this.tendencyName = this.detailData.pfName;
						// this.getTendency();
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		qqshezhi(){
			console.log(this.setupqq.qqCode)
			if(this.setupqq.qqCode == ''){
				this.underTake()
				return false
			}else if(this.setupqq.qqCode.length > 13 || this.setupqq.qqCode.length < 5){
				this.$message.error('请输入正确QQ号');
			}else{
				this.submitLoginQQForm()
				this.underTake()
				return false
			}
		},
		// qq密码
        submitLoginQQForm() {
	    	 ajax({
	            url: 'tAppUser/qqCode',
	            optionParams: this.setupqq
	        }).post()
	            .then(response => {
	                if (response.code === 200) {
	                    this.$message.success(response.message);
	                    this.setupqq.qqCode = ''
	                    this.dialogEditLoginQQ = false;
	                } else {
	                    this.$message.error(response.message);
	                }
	            })
	            .catch(error => {
	                console.log(error);
	            })
        },
		//弹框
		confirmBox() {
			if(!Cookies.get('token')) {
				this.$router.push('/login');
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
		   	this.$message.success('复制成功');
		   	this.centerDialogVisible=false;
            return
        },
		underTake() {
			if(this.isBindCard!=1) {
				this.$message.error('请先绑定银行卡');
				this.$router.push({ path: '/personalCenter/index', query: { index: 8 } });
				return false;
			}
			if(this.userInfo.isSetTranspwd!=1) {
				this.$message.error('请先设置交易密码');
				this.$router.push({ path: '/personalCenter/index', query: { index: 8 } });
				return false;
			}
			if (this.detailData.orientFlag === 1) {
				this.dialogPwd = true;
			} else if (this.detailData.prepayFlag === 1) {
				ajax({
					url: "orderTransfer/holdDebt",
					optionParams: {
						orderId: this.orderId,
						tranPwd: '',
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							let obj = {
								id: this.orderId
							}
							this.$message.success('转让人已付款，请前往债权平台购买债权！');
							this.$router.push({ path: '/personalCenter/index', query: { index: 2 } });
							this.goUrl(this.detailData.link);
							// this.getApplyList();
						} else {
							this.$message.error(res.message)
						}
					})
					.catch(error => {
						console.log(error)
					})

				// 				



			} else if (this.detailData.assureFlag === 1) {
				ajax({
					url: "orderTransfer/holdDebt",
					optionParams: {
						orderId: this.orderId,
						tranPwd: ''
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.$message.success('您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户');
							this.$router.push({ path: '/personalCenter/index', query: { index: 2 } });
							this.dialogPwd = false;
							
							this.getApplyList();
							
						} else {
							this.$message.error(res.message);
						}
					})
					.catch(error => {
						console.log(error)
					})

			} else {
			}

		},
		// 2.是否绑定银行卡，未绑定跳出绑定页面；
		goBindCard() {
			this.$message.error('请先绑定银行卡');
			this.$router.push({ path: '/personalCenter/index', query: { index: 8 } });
			return false;
		},

		// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					ajax({
						url: 'orderTransfer/holdDebt',
						optionParams: {
							orderId: this.orderId,
							tranPwd: this.delayData.tranPwd
						}
					}).post()
						.then(response => {
							if (response.code === 200) {
								this.$message.success('您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户');
								this.resetForm('delayData');
								this.dialogPwd = false;
								this.getApplyList();
								this.$router.push({ path: '/personalCenter/index', query: { index: 2 } })

							} else {
								this.$message.error(response.message);
							}
						})
						.catch(error => {
							console.log(error);
						})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//是否绑卡
		getTable() {
			ajax({
				url: 'tAppUser/userInfo',
				optionParams: {}
			}).fetch()
				.then(res => {
					if (res.code === 200) {
						this.userInfo = res.data;
						this.isBindCard = res.data.isBindCard;
						this.userId = res.data.userId;
						if (res.data.userId === this.detailData.userId) {
							//不能承接自己的债转
							this.$message.error('不可承接本人发布的债权');
							return false;
						}
						if(res.data.qqCode == '' || res.data.qqCode == null){
							this.dialogEditLoginQQ = true
						}else{
							 this.$confirm('是否确认承接该债权？', '承接确认', {
				                confirmButtonText: '确定',
				                cancelButtonText: '取消',
				                type: 'warning'
				            }).then(() => {
								this.underTake();
				            }).catch(() => {
				                this.$message({
				                    type: 'info',
				                    message: '已取消承接'
				                });
				            });
						}
					} else {
					}

				})
				.catch(error => {
					console.log(error)
				})
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
		},
		
	},
	filters: {
		//金钱过滤
		formatMoney(val) {
			if(val){
				return val.toFixed(2);
			}
		}
	}
}
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
		height: 512px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(242, 242, 242, 1);
		border-radius: 4px 4px 0px 0px;
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
				width: 789px;
				height: 70px;
				margin-left: 92px;
				// margin-top: 23px;
				float: left;
				.pfName {
					height:50px;
					font-size:16px;
					font-family:MicrosoftYaHei-Bold;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:50px;
					float: left;
					margin-right: 10px;
				}
				.discount-text {
                        height: 26px;
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height: 26px;
                        float: left;
                        padding: 0px 25px;
                        margin-top: 14px;
                        background-size:100% 100% ;
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
				width:809px;
				height: 90px;
				float: right;
				line-height: 140px;
				font-size: 14px;
				font-family: MicrosoftYaHeiLight;
				font-weight: 300;
				color: rgba(102, 102, 102, 1);
				margin-right: 84px;
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
				.maskl{
					width: 100%;
					height: 60px;
					float: left;
					span{
						float: left;
						font-size:14px;
						font-family:MicrosoftYaHeiLight;
						font-weight:300;
						color:rgba(102,102,102,1);
						line-height: 30px;
					}
					p{
						width: 770px;
						height: 60;
						line-height: 30px;
						float: right;
						font-size:14px;
						font-family:SourceHanSansCN-Light;
						font-weight:300;
						color:rgba(102,102,102,1);
					}
				}
			}
		}
		.amountItem {
			width: 1138px;
			height: 262px;
			overflow: hidden;
			border-top:1px solid rgba(90, 123, 252, 0.16);
			// border-bottom:1px solid rgba(90, 123, 252, 0.16);
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
							width: 960px;
							
							margin: auto;
							.bdtypetitle {
								float: left;
								margin-top: 40px;
								
								height:14px;
								line-height: 14px;
								font-size:14px;
								font-family:MicrosoftYaHeiLight;
								font-weight:300;
								color:rgba(102,102,102,1);
							}
							.name {
								float: left;
								margin-top: 40px;
								margin-left: 18px;
								margin-right: 93px;
								line-height: 16px;
								height:16px;
								font-size:16px;
								font-family:SourceHanSansCN-Light;
								font-weight:300;
								color:rgba(0,0,0,1);
							}
						}
					}
					.main {
						display: flex;
						display: -webkit-flex;
						height: 71px;
						
						.item {
						flex: 1;
						text-align: center;
						background: rgba(255, 255, 255, 1);
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
			.flash{
				height: 1px;
				width: 1000px;
				background:rgba(247,247,247,1);
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
					cursor:pointer;
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
		background: rgba(255, 255, 255, 1);
		// border: 1px solid rgba(242, 242, 242, 1);
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
	}
	// .el-dialog{
	// 	border-radius:20px;
		.text{
			color: #999999;
			font-size: 20px;
			width: 249px;
			height: 50px;
			text-align: center;
			margin:0 auto 16px;
			font-family: 'SourceHanSansCN-Light';
			line-height: 30px;
		}
		#cpLink{
			color: #3963D0;
			text-align: center;
			border:none;
			width: 100%;
			outline: none;
			-webkit-appearance: none; 
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			resize:none ;
			font-family: 'SourceHanSansCN-Light';
		}
		.dialog-footer{
			.copybtn{
				width:300px;
				height:42px;
				background:rgba(57,99,208,1);
				border-radius:20px;
			}
		}
	// }
}
</style>


