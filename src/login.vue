<template>
	<div>
		<top></top>
		<div class="login" :style="bg">
			<p class="login-fei"></p>
			<div class="login-center">
				<ul>
					<li>
						<h3 class="li-h3">为债权转让人找到合适的承接人<br />为承接人找到更优质的转让债权</h3>
						<img src="~@/assets/images/denglu.png" class="li-img" />
					</li>
					<li class="li-right">

						<!--账号登录开始-->
						<div class="login-div" v-if="accountLogin">
							<!--@blur="phoneValide(params.phone)"-->
							<h3 style="margin-top: 20px;">登录账号</h3>
							<input type="text" maxlength="11" v-model.number="params.phone" placeholder="请输入手机号" class="yonhu" style="margin-top: 20px;text-indent: 22px;" />
							<input @blur="pwdValide(params.pwd)" v-if="accountLogin" maxlength="16" v-model="params.pwd" type="password" placeholder="请输入密码" class="yonhu" style="text-indent: 22px;" />
							<div class="yonhu yanzheng" style="border: none;">
								<input @blur="captchaValide(params.captcha)" style="border: 1px solid #c4d1d8;" maxlength="4" v-model="params.captcha" type="text" placeholder="请输入图形验证码" />
								<div class="img" @click="reLoad()">
									<img src="" alt="" id="valideImg" width="129" height="58">
								</div>
							</div>
							<p class="login-p" v-if="accountLogin">
								<span @click="codeLogin = true;accountLogin = false;reset()" style="color:rgba(57,99,208,1); float: right;cursor:pointer;">短信登录</span>
							</p>
							<div class="login-on" style="margin-top: 15px;" @click="login()">立即登录</div>

							<div class="qudenglu" style="margin-top: 25px;">
								<span style=" float:left;color:rgba(57,99,208,1);cursor:pointer;" @click="dialogEditLoginPwd = true;">忘记密码</span>
								<span @click="$router.push({ path: '/register'})" style="color: #FA3A0E;cursor:pointer;">立即注册</span>
							</div>
						</div>
						<!--短信登陆-->
						<div class="login-div" v-if="codeLogin">
							<h3 style="margin-top: 20px;">登录账号</h3>
							<!--@blur="phoneValide(checkCodeForm.phone)"-->
							<input type="text" v-model="checkCodeForm.phone" maxlength="11" placeholder="请输入手机号" class="yonhu" style="margin-top: 20px;text-indent: 22px;" />
							<div class="yonhu valide">
								<input @blur="valideCode(checkCodeForm.checkcode)" maxlength="6" v-model="checkCodeForm.checkcode" type="text" placeholder="请输入短信验证码" style="text-indent: 22px;" />
								<div class="img" v-if="isSend" @click="sendCheckCode()">获取</div>
								<div class="img" v-if="!isSend">
									{{count}}s
								</div>
							</div>
							<p class="login-p">
								<span @click="codeLogin = false;accountLogin = true;reLoad();reset()" style="color:rgba(57,99,208,1); float: right;cursor:pointer;">账号登录</span>
							</p>
							<div class="login-on" style="margin-top: 15px;" @click="checkCodeLogin()">立即登录</div>

							<div class="qudenglu" style="margin-top: 25px;">
								<span @click="dialogEditLoginPwd = true;" style=" float:left;color:rgba(57,99,208,1);cursor:pointer;">忘记密码</span>
								<span @click="$router.push({ path: '/register'})" style="color: #FA3A0E;cursor:pointer;">立即注册</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 忘记密码 -->
		<el-dialog title="忘记密码" :visible.sync="dialogEditLoginPwd" width="30%" :show-close="false">
			<!-- form表单 -->
			<el-form :model="loginPwdForm" :rules="rules" ref="loginPwdForm" label-width="120px" class="demo-loginPwdForm">
				<el-row>
					<el-col :span="24">
						<el-form-item label="手机号:" prop="phone">
							<el-input v-model.number="loginPwdForm.phone" maxlength="11" placeholder="请输入手机号码"></el-input>
						</el-form-item>
						<el-form-item label="新登陆密码:" prop="pwd">
							<el-input v-model="loginPwdForm.pwd" type='password' maxlength="16" placeholder="由8-16位字母和数字组成"></el-input>
						</el-form-item>
						<el-form-item label="验证码:" prop="checkcode">
							<el-input style="width:80%;" v-model="loginPwdForm.checkcode" maxlength="6" placeholder="请输入验证码"></el-input>
							<el-button style="color:rgba(57,99,208,1);" v-if="isSend1" @click="getphonecodeId()">获取</el-button>
							<el-button style="color:rgba(57,99,208,1);" v-if="!isSend1">{{count1}}s</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitLoginPwdForm('loginPwdForm')">提交</el-button>
							<el-button @click="resetForm('loginPwdForm');dialogEditLoginPwd = false;">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>

		<!-- 忘记密码 -->
		<el-dialog title="用户操作引导" :visible.sync="dialog" width="50%" :show-close="false">
			
		</el-dialog>
		<bottom></bottom>
	</div>
</template>
<script>
import ajax from '@utils/config';
import top from '@/components/header.vue';
import bottom from '@/components/footer.vue';
import baseURL from '@/assets/js/ajax/baseURL';
import { validate } from '@/assets/js/validation';
import Cookies from 'js-cookie';
export default {
	components: {
		top,
		bottom
	},
	data() {
		var validPhone = (rule, value, callback) => {
			if (!validate.validatPhone(value)) {
				callback(new Error('手机格式错误'));
				return false;
			}
			callback();
		};
		var validCheckcode = (rule, value, callback) => {
			if (String(value).length != 6) {
				callback(new Error('手机验证码格式错误'));
				return false;
			}
			callback();
		};
		var validLoginPwd = (rule, value, callback) => {
			if (!validate.validatLoginPwd(value)) {
				callback(new Error('登陆密码格式错误'));
				return false;
			}
			callback();
		};
		return {
			bg: {
				backgroundImage: "url(" + require("@/assets/images/denglu-banner.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			dialogEditLoginPwd: false,
			dialog:false,
			accountLogin: true,//账号登陆
			codeLogin: false,//短信登陆
			params: {
				phone: '',
				pwd: '',
				captcha: '',
				randNum: '',
			},
			checkCodeForm: {
				checkcode: "",
				phone: ""
			},
			isSend: true,
			count: '',
			isSend1: true,
			count1: '',
			timer: null,
			loginPwdForm: {
				checkcode: '',
				phone: '',
				pwd: '',
			},
			rules: {
				checkcode: [
					{ required: true, message: "手机验证码不能为空", trigger: "blur" },
					{ validator: validCheckcode, trigger: 'blur' }],
				phone: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ validator: validPhone, trigger: 'blur' },
				],
				pwd: [{ required: true, message: "登陆密码不能为空", trigger: "blur" },
				{ validator: validLoginPwd, trigger: 'blur' }],
			}
		}
	},
	computed: {},
	created() {
		this.reLoad();
	},
	mounted() { },
	methods: {
		reset() {
			this.params = {
				phone: '',
				pwd: '',
				captcha: '',
				randNum: '',
			}
			this.checkCodeForm = {
				checkcode: "",
				phone: ""
			}
		},
		//刷新图片
		reLoad() {
			let xmlhttp;
			xmlhttp = new XMLHttpRequest();
			this.params.randNum = Date.parse(new Date());
			xmlhttp.open("GET", baseURL() + "tAppUser/captcha?randNum=" + this.params.randNum, true);
			xmlhttp.responseType = "blob";
			let that = this;
			xmlhttp.onload = function() {

				if (this.status == 200) {
					let blob = this.response;
					let img = document.getElementById("valideImg");
					img.src = window.URL.createObjectURL(blob);
				}
			}
			xmlhttp.send();
		},
		//账号登陆
		login() {
			if (this.pwdValide(this.params.pwd) && this.captchaValide(this.params.captcha)) {
				ajax({
					url: 'tAppUser/pcLogin',
					optionParams: this.params
				}).post()
					.then(res => {
						if (res.code === 200) {
							let token = res.data.token;
							this.$store.dispatch('SETTOKEN', { token: res.data.token });
							// this.$store.dispatch('SETTOKEN', {
							// 	token
							// });
							localStorage.setItem('token', res.data.token);
							localStorage.setItem('phone', res.data.phone);
							Cookies.set('token', res.data.token);
							Cookies.set('phone', res.data.phone);
							this.$message({
								message: res.message,
								type: "success"
							});
							// this.$router.push('/index');
							if (Cookies.get("fromPath")) {
								this.$router.push(Cookies.get("fromPath"));
							} else {
								this.$router.push('/index');
							}
							Cookies.remove("fromPath");
						} else {
							this.$message({
								message: res.message,
								type: "warning"
							});
							this.params.phone = '';
							this.params.captcha = '';
							this.params.randNum = '';
							this.params.pwd = '';
							this.reLoad();
						}
					})
					.catch(error => {
						this.loading = false;
						console.log(error)
					})
			} else {

			}


		},
		//发送短信验证码
		sendCheckCode() {
			ajax({
				url: "tAppUser/sendCheckCode",
				optionParams: {
					phone: this.checkCodeForm.phone
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.isSend = false;
						this.count = 60;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= 60) {
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
		//验证码登录
		checkCodeLogin() {
			ajax({
				url: "tAppUser/loginByCheckcode",
				optionParams: this.checkCodeForm
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.$message({
							message: res.message,
							type: "success"
						});
						let token = res.data.token;
						this.$store.dispatch('SETTOKEN', { token: res.data.token });
						// this.$store.dispatch('SETTOKEN', {
						// 	token
						// });
						Cookies.set('token', res.data.token);
						Cookies.set('phone', res.data.phone);
						if (Cookies.get("fromPath")) {
							this.$router.push(Cookies.get("fromPath"));
						} else {
							this.$router.push('/index');
						}
						Cookies.remove("fromPath");

					} else {
						this.checkCodeForm.phone = '';
						this.checkCodeForm.checkcode = '';
						this.$message({
							message: res.message,
							type: "warning"
						});
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//充值密码
		submitLoginPwdForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					ajax({
						url: 'tAppUser/forgetPwd',
						optionParams: this.loginPwdForm
					}).post()
						.then(response => {
							if (response.code === 200) {
								this.$message.success(response.message);
								this.resetForm('loginPwdForm');
								this.dialogEditLoginPwd = false;
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
		//忘记密码发送验证码
		getphonecodeId() {
			if (!this.loginPwdForm.phone) {
				this.$message.error('请先输入手机号码！');
				return false;
			}
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count1 = TIME_COUNT;
				this.isSend1 = false;
				this.timer = setInterval(() => {
					if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
						this.count1--;
					} else {
						this.isSend1 = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000)
			}
			ajax({
				url: 'tAppUser/sendCheckCode',
				optionParams: {
					phone: this.loginPwdForm.phone
				}
			}).post()
				.then(response => {
					if (response.code === 200) {
						this.$message.success(response.message);
						// this.resetForm('loginPwdForm');
					} else {
						this.$message.error(response.message);
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
		//手机号校验
		phoneValide(val) {
			if (val) {
				if (validate.validatPhone(val)) {
					return true;
				} else {
					val = '';
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
		pwdValide(val) {
			if (val) {
				if (val.match("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")) {
					return true;
				} else {
					val = '';
					this.$message.error('登陆密码格式不正确!');
					return false;
				}
			} else {
				this.$message.error('登陆密码不能为空!');
				return false;
			}
		},
		//短信验证码校验
		valideCode(val) {
			if (val) {
				if (val.length === 6) {
					return true;
				} else {
					val = '';
					this.$message.error('短信验证码格式不正确!');
					return false;
				}
			} else {
				this.$message.error('短信验证码不能为空!');
				return false;
			}
		},
		//图形验证码校验
		captchaValide(val) {
			if (val) {
				if (val.length === 4) {
					return true;
				} else {
					val = '';
					this.$message.error('图形验证码格式不正确!');
					return false;
				}
			} else {
				this.$message.error('图形验证码不能为空!');
				return false;
			}
		}
	},
	filters: {

	}
}
</script>
<style lang='scss' scoped>
.login {
	width: 100%;
	min-height: 800px;
}

.login-fei {
	width: 100%;
	height: 130px;
}

.login-center {
	width: 1200px;
	min-height: 490px;
	margin: 0px auto;
}

.login-center ul {
	width: 100%;
	overflow: hidden;
}

.login-center ul li {
	float: left;
	width: 46%;
	height: 565px;
}

.li-right {
	margin-left: 95px;
}

.li-h3 {
	width: 465px;
	height: 120px;
	font-size: 28px;
	font-family: "FZCQJW--GB1-0";
	font-weight: 400;
	font-style: italic;
	color: rgba(255, 255, 255, 1);
	line-height: 60px;
	margin-left: 85px;
}

.li-img {
	width: 450px;
	margin: 78px 0 0 25px;
}

.login-div {
	width: 500px;
	height: 520px;
	float: right;
	background: rgba(255, 255, 255, 1);
	border-radius: 8px;
	text-align: center;
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

.valide {
	margin: 0 auto;
	margin-top: 25px;
	padding: 0;
	width: 330px;
}

.valide input {
	width: 263px;
	display: block;
	float: left;
	height: 58px;
	border: 0;
	border-right: 1px solid rgba(196, 209, 216, 1);
	text-indent: 22px;
}

.yanzheng input {
	width: 180px;
	display: block;
	float: left;
	height: 58px;
	border: 0;
	border-right: 1px solid rgba(196, 209, 216, 1);
	text-indent: 22px;
}

.valide .img {
	// display: block;
	width: 61px;
	height: 58px;
	line-height: 58px;
	float: left;
	text-align: center;
	border: 0;
	border-radius: 8px;
	color: rgba(57, 99, 208, 1);
	cursor: pointer;
}

.yanzheng .img {
	// display: block;
	width: 61px;
	height: 58px;
	line-height: 58px;
	float: left;
	margin-left: 20px;
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
	font-size: 16px;
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