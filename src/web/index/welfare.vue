<template>
	<div class="linqu" :style="bg">
		<div class="houqu">
			<div class="houqu_d">
				<input type="" name="" maxlength="11" v-model="regin.phone" placeholder="输入手机号领福利" id="" value="" />
				<p @click="submin()">立即领取</p>
			</div>
		</div>

		<!-- 设置qq号码 -->
		<el-dialog title="" :visible.sync="outerVisible">
			<div class="login-div">
				<h3>注册并领取优惠券</h3>
				<p class="fasong">已向您的手机<span style="color: red;">{{regin.phone}}</span>发送验证码</p>
				<!--<input @blur="phoneValide()" type="text" v-model="loginForm.phone" placeholder="请输入手机号" class="yonhu" style="text-indent: 22px;" />-->
				<div class="yonhu yanzheng">
					<input @blur="valideCode()" maxlength="6" v-model="loginForm.checkcode" type="text" placeholder="请输入短信验证码" style="text-indent: 22px;" />
					<div class="img" v-if="isSend" @click="sendCheckCode()">获取</div>
					<div class="img" v-if="!isSend">
						{{count}}s
					</div>
				</div>
				<input @blur="pwdValide()" type="password" v-model="loginForm.pwd" maxlength="16" placeholder="请输入登陆密码，由8-16位字母和数字组成" class="yonhu" style="text-indent: 22px;" />
				<div class="login-on" style="margin-top: 15px;" @click="login()">提交</div>
				<!-- <button class="login-on" @click="login()">立即注册</button> -->
				<p class="login-p">
					<label><input name="sex" checked type="radio" value="gay" /> 点击注册即同意
                        <span style="color:rgba(57,99,208,1);" @click="$router.push('/heichen')">《黑尘服务协议》</span>
                        <span style="color:rgba(57,99,208,1);" @click="$router.push('/accountService')">《账户管理服务》</span>
                        <span style="color:rgba(57,99,208,1);" @click="$router.push('/heichen')">《不死鸟风险提示与免责声明》</span>
                    </label>
				</p>
				<!--<div class="qudenglu">
                    <span @click="$router.push('/login')">立即登录</span>
                </div>-->
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button></el-button>
				<el-button></el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import baseURL from '@/assets/js/ajax/baseURL';
import { validatPhone } from '@/assets/js/validate';
import Cookies from 'js-cookie';
	export default {
		components: {},
		data() {
			return {
				bg: {
					backgroundImage: "url(" + require("./img/lingqu.png") + ")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
				},

				outerVisible: false,

				accountLogin: true, //账号登陆
				codeLogin: false, //短信登陆
				loginForm: {
					checkcode: "",
					phone: "",
					pwd: "",
					inviteCode:'',
				},
				regin: {
					phone: "",
				},
				isSend: true,
				count: '',
				timer: null,
			}
		},
		computed: {},
		created() {
			let data = this.$route.query.inviteCode ?this.$route.query.inviteCode : '';
			this.loginForm.inviteCode = data
			console.log(this.loginForm)
			this.safeExit()
			// this.getType();
		},
		mounted() {},
		methods: {
			safeExit() {
                Cookies.remove('saleDebt');
                 Cookies.remove('phone');
                  Cookies.remove('token');
                localStorage.setItem('phone', '');
				localStorage.setItem('token', '');
            },
			submin() {
				if(this.regin.phone == ''){
					this.$message.error('手机号码不能为空');
					return false
				}
				ajax({
						url: 'tAppUser/check_phone',
						optionParams: {
							phone: this.regin.phone
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.outerVisible = true
							this.loginForm.phone = this.regin.phone
							this.sendCheckCode()
							this.$message.success(response.message);
						} else {
							console.log(response)
							this.open()
							this.$message.error(response.message);
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			getType() {
				ajax({
						url: 'news/types',
						optionParams: {}
					}).post()
					.then(response => {
						if(response.code === 200) {
							let data = response.data ? response.data : {};
							this.tabList = data.types ? data.types : [];
							if(this.tabList.length > 0) {
								this.getList(this.tabList[0].type)
							}
						} else {
							console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},

			open() {
				this.$alert('优质又低价的债权等你来承接！', '您的手机号已经注册过啦！', {
					confirmButtonText: '赶紧去看看',
					type: 'warning',
					center: true,
					callback: action => {
						this.$router.push('/login');
					}
				});
			},

			reset() {

			},
			//注册
			login() {
				if(this.loginForm.checkcode && this.loginForm.phone && this.loginForm.pwd) {
					ajax({
							url: "tAppUser/register",
							optionParams: this.loginForm
						}).post()
						.then(res => {

							if(res.code === 200) {
								this.$message.success('注册成功！');
								this.$store.dispatch('SETTOKEN', {
									token: res.data.token
								});
								window.localStorage.setItem("token", res.data.token);
								window.localStorage.setItem('phone', this.loginForm.phone);
								 let name = this.loginForm.phone ? this.loginForm.phone: '';
            					this.$store.dispatch('SETUSER', { phone: name });
								Cookies.set('token', res.data.token);
								Cookies.set('phone', this.loginForm.phone);
								this.$router.push('/index');
							} else {
								this.loginForm.phone = '';
								this.loginForm.pwd = '';
								this.loginForm.checkcode = '';
								this.regin.phone = '';
								this.$message.error(res.message);
							}
						})
						.catch(error => {
							console.log(error)
						})
				} else {
					this.pwdValide();
					this.valideCode();
					this.phoneValide();
					return false;
				}

			},
			//发送短信验证码
			sendCheckCode() {
				ajax({
						url: "tAppUser/sendCheckCode",
						optionParams: {
							phone: this.regin.phone
						}
					}).post()
					.then(res => {
						console.log(res);
						if(res.code === 200) {
							this.isSend = false;
							this.count = 60;
							this.timer = setInterval(() => {
								if(this.count > 0 && this.count <= 60) {
									this.count--;
								} else {
									this.isSend = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						} else {
							this.$message.error(res.message);
						}
					})
					.catch(error => {
						console.log(error)
					})

			},
			//手机号校验
			phoneValide() {
				if(this.loginForm.phone) {
					if(validatPhone(this.loginForm.phone)) {
						//return false;
					} else {
						this.loginForm.phone = '';
						// alert('请输入正常的手机号');
						this.$message({
							message: '请输入正常的手机号',
							type: "warning"
						});
					}
				} else {
					this.$message.error('手机号不能为空!');
					return false;
				}

			},
			//登陆密码校验   由8-16位字母和数字组成 ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$
			pwdValide() {
				console.log(11111);
				if(this.loginForm.pwd) {
					if(this.loginForm.pwd.match("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")) {
						return true;
					} else {
						this.$message.error('登陆密码格式不正确!');
						this.loginForm.pwd = '';
						return false;
					}
				} else {
					this.$message.error('登陆密码不能为空!');
					return false;
				}
			},
			//短信验证码校验
			valideCode() {
				if(this.loginForm.checkcode) {
					if(this.loginForm.checkcode.length === 6) {
						return true;
					} else {
						this.loginForm.checkcode = '';
						this.$message.error('短信验证码格式不正确!');
						return false;
					}
				} else {
					this.$message.error('短信验证码不能为空!');
					return false;
				}
			}

		},
		filters: {

		}
	}
</script>
<style lang='scss' scoped>
	@import './scss/index.scss';
	.linqu {
		width: 100%;
		height: 1296px;
	}
	
	.houqu {
		width: 930px;
		height: 500px;
		margin: 0 auto;
		.houqu_d {
			width: 300px;
			height: 300px;
			float: left;
			margin-top: 365px;
			input {
				width: 97%;
				height: 40px;
				outline: 0;
				background: white;
				border-radius: 5px;
				border: none;
				font-size: 16px;
				padding-left: 10px;
				color: #666;
			}
			input::placeholder {
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(206, 206, 206, 1);
			}
			p {
				width: 100%;
				height: 40px;
				line-height: 40px;
				font-size: 16px;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				background: #FFD05B;
				border-radius: 5px;
				text-align: center;
				margin-top: 30px;
				cursor: pointer;
			}
		}
	}
	
	.login-div {
		width: 500px;
		height: 485px;
		float: right;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		text-align: center;
	}
	.login-div .fasong{
		color: #666;
		font-size: 20px;
		margin-top: 10px;
	}
	.login-div h3 {
		width: 100%;
		height: 56px;
		line-height: 28px;
		font-size: 28px;
		font-family: "MicrosoftYaHei";
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 60px;
		text-align: center;
		margin-top: 25px;
	}
	
	.yonhu {
		width: 320px;
		height: 58px;
		border: 1px solid rgba(196, 209, 216, 1);
		border-radius: 4px;
		margin-top: 25px;
		padding: 0 5px;
	}
	
	.yanzheng {
		margin: 0 auto;
		margin-top: 25px;
		padding: 0;
		width: 330px;
	}
	
	.yanzheng input {
		width: 260px;
		display: block;
		float: left;
		height: 58px;
		border: 0;
		border-right: 1px solid rgba(196, 209, 216, 1);
		text-indent: 5px;
	}
	
	.yanzheng .img {
		// display: block;
		width: 69px; // width: 61px;
		height: 58px;
		line-height: 58px;
		float: right;
		text-align: center;
		border: 0;
		border-radius: 8px;
		color: rgba(57, 99, 208, 1);
		cursor: pointer;
	}
	
	.login-on {
		margin: 0 auto;
		width: 320px;
		height: 58px;
		line-height: 58px;
		background: rgba(57, 99, 208, 1);
		border-radius: 29px;
		font-size: 18px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(255, 255, 255, 1);
		margin-top: 25px;
		cursor: pointer;
	}
	
	.login-p {
		width: 320px;
		height: 30px;
		font-size: 12px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(128, 128, 128, 1);
		margin: 0 auto;
		margin-top: 18px;
	}
	
	.login-p a {
		color: #3963D0;
	}
	
	.qudenglu {
		width: 320px;
		height: 27px;
		line-height: 37px;
		font-size: 16px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		text-align: right;
		margin: 0 auto;
	}
	
	.qudenglu a {
		color: rgba(51, 51, 51, 1);
	}
</style>