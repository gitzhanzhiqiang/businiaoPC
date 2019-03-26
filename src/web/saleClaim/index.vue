<template>
	<div class="beijing beijinga">
		<div class="zhaizhuan" :style="bg">
			<!-- <span class="dian">.</span>专业债转担保平台
				<span>.</span> -->
		</div>

		<div class="zhaizhuan-title">填写出售信息</div>

		<div class="zhaizhuan-form">
			<div class="zhaizhuan_lei">
				<ul>
					<li>
						<!--  @click="reLoad();reLoad2();" -->
						<h3>出售类型：</h3>
						<el-radio-group @blur="localSave();" class="danxuan" v-model="leixin" @change='typeradio()'>
							<el-radio :label="1">p2p债权</el-radio>
							<el-radio :label="2">借条债权</el-radio>
						</el-radio-group>
					</li>
				</ul>
			</div>
			<!-- p2p -->
			<div class="zhaizhuan-div" v-if='leixin == 1'>
				<ul>
					<li>
						<h3>平台名称：</h3>
						<el-autocomplete @blur="localSave()" class="zhaizhuan-txt" v-model="params.pfName" :fetch-suggestions="querySearchAsync" placeholder="例：钱盆网" @select="handleSelect"></el-autocomplete>
						<!-- <el-input v-model="params.pfName" placeholder="请输入债权平台名称" class="zhaizhuan-txt"></el-input> -->
					</li>
					<li>
						<h3>还款状况：</h3>
						<el-radio-group @blur="localSave()" class="danxuan" v-model="params.repayStatus">
							<el-radio :label="1">正常还款</el-radio>
							<el-radio :label="2">逾期还款</el-radio>
						</el-radio-group>
					</li>
					<li>
						<h3>标的类型：</h3>
						<el-radio-group @blur="localSave()" class="danxuan" v-model="params.bdType">
							<el-radio :label="1">个人信用贷</el-radio>
							<el-radio :label="2">企业贷</el-radio>
							<el-radio :label="3">房抵贷</el-radio>
							<el-radio :label="4">车贷</el-radio>
							<el-radio :label="5">自助投标</el-radio>
						</el-radio-group>
					</li>
					<!--<li>
						<h3>标的类型：</h3>
						<el-select @blur="localSave()" v-model="params.bdType" @change='localSave()' placeholder="请选择标的类型" class="zhaizhuan-txt">
							<el-option v-for="item in bdTypeList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>-->
					<li>
						<h3>转让金额：</h3>
						<el-input placeholder="例：9000" type='number' v-model.number="params.amount" @blur="localSave()" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li>
						<h3>标的年化：</h3>
						<el-input :max="99.99" :min="0.01" type='number' @blur="localSave()" maxlength="5" placeholder="例：12" v-model.number="params.annualRate" class="zhaizhuan-txt">
							<template slot="append">%</template>
						</el-input>
					</li>
					<li>
						<h3>债权到期日：</h3>
						<el-date-picker @blur="localSave()" :picker-options="pickerOptions" v-model="params.surplusPeriod" type="date" class="zhaizhuan-txt">
						</el-date-picker>
					</li>
					<li>
						<h3>还款方式：</h3>
						<el-select @blur="localSave()" v-model="params.repaymentType" placeholder="请选择" class="zhaizhuan-txt">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<h3>转让折扣：</h3>
						<el-input :max="9.99" @blur="localSave()" type='number' :min="0.01" maxlength="4" placeholder="例：8.88（本金的转让折扣）" v-model.number="params.discountRate" class="zhaizhuan-txt" @change="getAmount()">
							<template slot="append">折</template>
						</el-input>
					</li>
					<li>
						<h3>折扣金额：</h3>
						<el-input placeholder="例：1008" @blur="localSave()" type='number' v-model.number="params.discountAmount" class="zhaizhuan-txt" disabled>
							<template slot="append">元</template>
						</el-input>
					</li>
					<li>
						<h3>转让有效期：</h3>
						<el-select @blur="localSave()" v-model="params.effDay" placeholder="请选择转让有效期" class="zhaizhuan-txt">
							<el-option v-for="(item,index) in 10" :value="item" :key="index">
								{{item}}天
							</el-option>
						</el-select>
					</li>
					<li>
						<h3>债转链接：</h3>
						<el-input v-model="params.link" placeholder="请输入债权平台发布的债权转让链接" class="zhaizhuan-txt" @blur="checkLink();localSave();"></el-input>
					</li>
					<li>
						<h3>定向债权：</h3>
						<el-radio-group @blur.prevent="localSave()" @change='localSave()' class="danxuan" v-model="params.orientFlag">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</li>
					<li v-if="params.orientFlag===1">
						<h3>债权密码：</h3>
						<el-input type="password" maxlength="6" v-model="params.tranPwd" placeholder="请输入六位数数字和字母组合" class="zhaizhuan-txt" />
					</li>
					<li>
						<h3>是否预付：</h3>
						<el-radio-group class="danxuan" @blur.prevent="localSave()" @change='localSave()' v-model="params.prepayFlag">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</li>
					<li>
						<h3>QQ号：</h3>
						<el-input placeholder="请输入您的QQ号" v-model="params.qqCode" class="zhaizhuan-txt">
						</el-input>
					</li>
					<li style="height: 100px;">
						<h3>备注：</h3>
						<textarea name="" rows="" maxlength="30" v-model="params.remark" placeholder="还有其他需要展示的信息都写在这哦~（选填）" cols=""></textarea>
					</li>
					<li>
						<h3>验证码：</h3>
						<el-input v-model="params.captcha" placeholder="请输入图形验证码" class="zhaizhuan-yanzhen"></el-input>
						<div class="tuxingma" @click="reLoad()" style="cursor:pointer;">
							<img src="" alt="" id="valideImg" width="100" height="40">
						</div>
					</li>
				</ul>
				<!-- $router.push({ path: '/saleClaim/detail' }) -->
				<div class="zhaiquan-on" @click="underTake()" style="cursor:pointer;">立即发布</div>
			</div>

			<!-- 借条 -->
			<div class="zhaizhuan-div" v-if='leixin == 2'>
				<ul>

					<li>
						<h3>借条类型：</h3>
						<el-radio-group @blur="localSave2()" class="danxuan" v-model="paramsloans.type">
							<el-radio :label="1">个人借条</el-radio>
							<el-radio :label="2">小贷（金融）借条</el-radio>
						</el-radio-group>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>债权本金：</h3>
						<el-input placeholder="例：900000" type='number' v-model.number="paramsloans.baseAmount" @blur.prevent="localSave2();amountsumInterest();" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>债权利息：</h3>
						<!--@keyup.native="inputChageMoney($event,'interest')"-->
						<el-input placeholder="例：10000" type='number' v-model.number="paramsloans.interest" @blur.prevent="localSave2();amountsumInterest();" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>债权本息：</h3>
						<el-input placeholder="0" disabled="disabled" v-model.number="paramsloans.amountAndInterest" @blur="localSave2()" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 2' >
						<h3>债权本息：</h3>
						<el-input placeholder="例：9000" type='number' v-model.number="paramsloans.amountAndInterest" @blur="localSave2();amountsumInteresta()" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li>
						<h3>成交金额：</h3>
						<el-input placeholder="例：9000" type='number' v-model.number="paramsloans.amount" @blur="localSave2()" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li>
						<h3>承接方式：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.holdType" placeholder="请选择承接方式" class="zhaizhuan-txt">
							<el-option v-for="item in holdType" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li v-if='paramsloans.holdType == 2 || paramsloans.holdType == 3'>
						<h3>代理清收费率：</h3>
						<el-input placeholder="例15" type='number' v-model.number="paramsloans.proxyFeeRate" @blur="localSave2()" class="zhaizhuan-txt">
							<template slot="append">%</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>转让有效期：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.surplusPeriodLeftDay" placeholder="请选择转让有效期" class="zhaizhuan-txt">
							<el-option v-for="item in surplusPeriodLeftDay" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>姓名：</h3>
						<el-input placeholder="请输入真实姓名" @blur="localSave2()" v-model.number="paramsloans.debtorName" class="zhaizhuan-txt">
						</el-input>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>所在地区：</h3>
						<el-cascader :options="myaddressa" v-model="selectedOptions3" @change="getaddress()"></el-cascader>
					</li>
					<li v-if='paramsloans.type == 1'>
						<h3>债务人地址：</h3>
						<el-input placeholder="例如：天堂小区1幢1单元211室" @blur="localSave2()" v-model.number="paramsloans.localDetail" class="zhaizhuan-txt">
							<!-- <template slot="append">元</template> -->
						</el-input>
					</li>
					<li v-if='paramsloans.type == 2'>
						<h3>债权数量：</h3>
						<el-input placeholder="例：10" type='number' @blur="localSave2();amountsumInteresta()" v-model.number="paramsloans.debtOrderCount" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 2'>
						<h3>债权均值：</h3>
						<el-input placeholder="例：1008" disabled="disabled" type='number' @blur="localSave2()" v-model.number="paramsloans.debtAmountAvg" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 2'>
						<h3>转让有效期：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.surplusPeriodLeftDay" placeholder="请选择转让有效期" class="zhaizhuan-txt">
							<el-option v-for="item in surplusPeriodLeftDay" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<!-- 诉讼情况 -->
					<li v-if='paramsloans.type == 1'>
						<h3>诉讼情况：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.lawsuitState" placeholder="请选择诉讼情况" class="zhaizhuan-txt">
							<el-option v-for="item in lawsuitState" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li v-if='paramsloans.type == 1 && paramsloans.lawsuitState == 1'>
						<h3>诉讼本金：</h3>
						<el-input placeholder="例：1008" type='number' @blur="localSave2()" v-model.number="paramsloans.lawsuitAmount" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 1 && paramsloans.lawsuitState == 1'>
						<h3>诉讼机构：</h3>
						<el-input placeholder="请输入诉讼机构" @blur="localSave2()" v-model.number="paramsloans.lawsuitOrg" class="zhaizhuan-txt">
						</el-input>
					</li>
					<li v-if='paramsloans.type == 1 && paramsloans.lawsuitState == 1'>
						<h3>执行状态：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.lawsuitProgress" placeholder="请选择执行状态" class="zhaizhuan-txt">
							<el-option v-for="item in lawsuitProgress" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<!-- 仲裁情况 -->
					<li v-if='paramsloans.type == 2'>
						<h3>仲裁情况：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.lawsuitState" placeholder="请选择" class="zhaizhuan-txt">
							<el-option v-for="item in lawsuitState2" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li v-if='paramsloans.type == 2 && paramsloans.lawsuitState == 1'>
						<h3>仲裁本金：</h3>
						<el-input placeholder="例：1008" type='number' @blur="localSave2()" v-model.number="paramsloans.lawsuitAmount" class="zhaizhuan-txt">
							<template slot="append">元</template>
						</el-input>
					</li>
					<li v-if='paramsloans.type == 2 && paramsloans.lawsuitState == 1'>
						<h3>仲裁机构：</h3>
						<el-input placeholder="请输入申请仲裁的机构/法院名称" @blur="localSave2()" v-model.number="paramsloans.lawsuitOrg" class="zhaizhuan-txt">
						</el-input>
					</li>
					<li v-if='paramsloans.type == 2 && paramsloans.lawsuitState == 1'>
						<h3>执行状态：</h3>
						<el-select @blur="localSave2()" v-model="paramsloans.lawsuitProgress" placeholder="请选择" class="zhaizhuan-txt">
							<el-option v-for="item in lawsuitProgress" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<h3>QQ号：</h3>
						<el-input placeholder="请输入您的QQ号" v-model="paramsloans.qqCode" class="zhaizhuan-txt">
						</el-input>
					</li>
					<li style="height: 100px;">
						<h3>备注：</h3>
						<textarea name="" rows="" maxlength="30" v-model="paramsloans.remark" placeholder="还有其他需要展示的信息都写在这哦~（选填）" cols="" @blur="localSave2()"></textarea>
					</li>
					<li>
						<h3>验证码：</h3>
						<el-input v-model="paramsloans.captcha" placeholder="请输入图形验证码" class="zhaizhuan-yanzhen"></el-input>
						<div class="tuxingma" @click="reLoad2()" style="cursor:pointer;">
							<img src="" alt="" id="valideImg2" width="100" height="40">
						</div>
					</li>
				</ul>
				<div class="zhaiquan-on" @click="loans()" style="cursor:pointer;">立即发布</div>
			</div>

			<div style="width: 100%; height: 50px;"></div>
		</div>

	</div>
</template>
<script>
	import ajax from "@utils/config";
	import baseURL from '@/assets/js/ajax/baseURL';
	import { parseTime } from '@/filters';
	import Cookies from 'js-cookie';
	import { mapGetters } from 'vuex';
	import { validate } from '@/assets/js/validation';
	import { Common } from '@/common/common';
	import myaddress from '../../../static/pca.json';
	import myaddressa from '../../../static/shen.json';
	export default {
		components: {},
		data() {
			return {
				bg: {
					backgroundImage: "url(" + require("@/assets/images/saleBanner.png") + ")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
				},
				pickerOptions: {
					// disabledDate(time) {
					// 	return time.getTime() < Date.now() - 8.64e7;
					// }
				},
				selectedOptions3: [],
				params: {
					amount: '',
					annualRate: '',
					bdType: 1,
					captcha: "",
					discountAmount: '',
					discountRate: '',
					effDay: 10,
					extendFlag: '',
					insUserId: 0,
					link: "",
					tranPwd: "",
					orientFlag: 0,
					payType: "",
					pfName: "",
					qqCode: "",
					prepayFlag: 0,
					repayStatus: 1,
					repaymentType: 0,
					surplusPeriod: new Date(),
					surplusPeriodType: "",
					remark: '',
				},//p2p
				paramsloans:{
					amount:'',//成交金额
					amountAndInterest: '',//债权本息
					baseAmount:'',//债权本金
					captcha:'',//验证码
					createTime:'',//创建时间
					deadLine:'',//超时时间
					debtAmountAvg:'',//债权均值
					debtOrderCount:'',//债权数量[9]
					debtorAddress:'',//债务人住址
					debtorName:'',//债务人姓名
					holdTime:'',//承接时间
					holdType: '',//承接方式: 1、转让 2代理签收 3、两者皆可
					holdUserId:'',//承接人id
					interest:'',//债权利息
					lawsuitAmount:'',//诉讼本金
					lawsuitOrg:'',//诉讼机构[20]
					lawsuitProgress: '',//诉讼执行状态: 1、执行中 2、已判决 3、未判决 4、终结执行
					lawsuitState: '',//诉讼/仲裁情况: 1、已诉讼 2、未诉讼 3、不清楚
					localArea:'',//债务人住址-区
					localCity:'',//债务人住址-市
					localDetail:'',//债务人详细住址[100]
					localProvince:'',//债务人住址-省
					modifiedTime:'',//修改时间
					msg:'',//订单失效原因
					payFlag:'',//购买标识 1是 0否
					phone:'',//手机号
					proxyFeeRate:'',//代理清收费率(百分比)
					qqCode:'',//发布人qq号
					remark:'',//备注[30]
					status:'',//状态 -1预付款到帐中 0上架中(转让中) 1锁定中 2已转让(已承接) 3已申诉 4:已下架 5:已冻结
					surplusPeriod:'',//债转截止日期
					surplusPeriodLeftDay: '',//债转剩余有效天数
					type: 1,//订单类型: 1、个人借条 2、小贷(金融)借条
				},//借条
				options: [{
						value: 0,
						label: "一次性还本付息"
					},
					{
						value: 1,
						label: "先息后本"
					},
					{
						value: 2,
						label: "等额本息"
					},
					{
						value: 3,
						label: "等额本金"
					},
				],
				bdTypeList: [{
						value: 1,
						label: "个人信用贷"
					},
					{
						value: 2,
						label: "企业贷"
					},
					{
						value: 3,
						label: "房抵贷"
					},
					{
						value: 4,
						label: "车贷"
					},
					{
						value: 5,
						label: "自助投标"
					},
				],
				isBindCard: '', //是否绑卡
				userInfo: {},
				restaurants: [],
				timeout: null,
				pfNameList: [],
				response: '',
				leixin: 1, //类型切换
				jieleixing: 1,
				myaddressa:[],
				holdType:[
					{
						value: 1,
						label: "转让"
					},
					{
						value: 2,
						label: "代理清收"
					},
					{
						value: 3,
						label: "两者皆可"
					},
				],//承接方式
				lawsuitProgress:[
					{
						value: 1,
						label: "执行中"
					},
					{
						value: 2,
						label: "已判决"
					},
					{
						value: 3,
						label: "未判决"
					},
					{
						value: 4,
						label: "终结执行"
					},
				],//诉讼执行状态: 1、执行中 2、已判决 3、未判决 4、终结执行
				lawsuitState:[
					{
						value: 1,
						label: "已诉讼"
					},
					{
						value: 2,
						label: "未诉讼"
					},
					{
						value: 3,
						label: "不清楚"
					},
				],//诉讼情况: 1、已诉讼 2、未诉讼 3、不清楚
				lawsuitState2:[
					{
						value: 1,
						label: "已仲裁"
					},
					{
						value: 2,
						label: "未仲裁"
					},
					{
						value: 3,
						label: "不清楚"
					},
				],///仲裁情况
				surplusPeriodLeftDay:[
					{
						value: 1,
						label: "10天"
					},
					{
						value: 2,
						label: "30天"
					},
					{
						value: 3,
						label: "90天"
					},
				]
			}
		},
		computed: {},
		created() {
			this.reLoad();
			this.reLoad2()
			this.getBanklist();
			if(this.$route.query.data) {
				console.log(this.$route.query.ishd)
				console.log(JSON.parse(this.$route.query.data))
				if(this.$route.query.ishd){
					this.paramsloans = JSON.parse(this.$route.query.data);
					this.leixin = 2
					this.selectedOptions3.push(this.paramsloans.localProvince)
					this.selectedOptions3.push(this.paramsloans.localCity)
					this.selectedOptions3.push(this.paramsloans.localArea)
					this.paramsloans.surplusPeriodLeftDay = 1
				}else{
					this.params = JSON.parse(this.$route.query.data);
				}
				//this.params = JSON.parse(this.$route.query.data);
			} else {
				if(Cookies.get('saleDebt')) {
					this.params = JSON.parse(Cookies.get('saleDebt'));
				} else {
					// this.params.surplusPeriod = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
				}
			}
				myaddressa.map((itm)=>{
					this.$set(itm, 'value', itm.name)
					this.$set(itm, 'label', itm.name)
					this.$set(itm, 'children', itm.city)
					itm.children.map((itmm)=>{
						this.$set(itmm, 'value', itmm.name)
						this.$set(itmm, 'label', itmm.name)
						var cheen = []
						itmm.area.map((itma)=>{
							var dd = {value:itma,label:itma}
							cheen.push(dd)
						})
						this.$set(itmm, 'children',cheen)
					})
				})
				this.myaddressa = myaddressa;
		},
		mounted() {
			this.loadAll();
			this.getTablea()
		},
		methods: {
//			 inputChageMoney(e) {
//	            let obj = {
//	                input: e,
//	                maxMoney: 10,
//	                that: this
//	            }
//	            console.log(e)
//	            //this.paramsloans.baseAmount = Common.positiveIntegerMoney(obj); //表单赋值
//	        },
			typeradio(){
				if(this.leixin == 1){
					this.reLoad()
				}else if(this.leixin == 2){
					this.reLoad2()
				}
			},
			//获取用户基本信息
			getTablea() {
				ajax({
						url: 'tAppUser/userInfo',
						optionParams: {}
					}).fetch()
					.then(res => {
						if(res.code === 200) {
							this.params.qqCode = res.data.qqCode ? res.data.qqCode : '';
							this.paramsloans.qqCode = res.data.qqCode ? res.data.qqCode : '';
						} else {
							// console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//刷新图片
			reLoad() {
				let xmlhttp;
				xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET", baseURL() + "orderTransfer/captcha", true);
				xmlhttp.responseType = "blob";
				xmlhttp.setRequestHeader("token", Cookies.get("token"));
				let that = this;
				xmlhttp.onload = function() {
					if(this.status == 200) {

						let blob = this.response;
						let img = document.getElementById("valideImg");
						img.src = window.URL.createObjectURL(blob);
					} else if(this.status == 401) {
						that.$store.dispatch('SETTOKEN', {
							token: ''
						});
						Cookies.remove('token');
						Cookies.remove('phone');
						that.$router.push('/login');
					} else {

					}
				}
				xmlhttp.send();
			},
			//刷新图片
			reLoad2() {
				let xmlhttp;
				xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET", baseURL() + "order_loans/captcha", true);
				xmlhttp.responseType = "blob";
				xmlhttp.setRequestHeader("token", Cookies.get("token"));
				let that = this;
				xmlhttp.onload = function() {
					if(this.status == 200) {
						let blob = this.response;
						let img = document.getElementById("valideImg2");
						img.src = window.URL.createObjectURL(blob);
					} else if(this.status == 401) {
						that.$store.dispatch('SETTOKEN', {
							token: ''
						});
						Cookies.remove('token');
						Cookies.remove('phone');
						that.$router.push('/login');
					} else {

					}
				}
				xmlhttp.send();
			},
			//出售p2p按钮
			underTake() {
				if(!this.params.pfName) {
					this.$message.error('请输入债权平台名称');
					return false;
				}
				if(!this.params.repayStatus) {
					this.$message.error('请选择还款状况');
					return false;
				}
				if(!this.params.bdType) {
					this.$message.error('请选择标的类型');
					return false;
				}
				if(!this.params.amount) {
					this.$message.error('请输入转让金额');
					return false;
				}
				if(!this.params.annualRate) {
					this.$message.error('请输入标的历史年化');
					return false;
				}
				if(!this.params.surplusPeriod) {
					this.$message.error('请输入债权到期日');
					return false;
				}
				if(this.params.repaymentType === "") {
					this.$message.error('请选择还款方式');
					return false;
				}
				if(!this.params.discountRate) {
					this.$message.error('请输入转让折扣');
					return false;
				}
				if(!this.params.discountAmount) {
					this.$message.error('折扣金额不能为空');
					return false;
				}
				if(!this.params.effDay) {
					this.$message.error('请选择转让有效期');
					return false;
				}
				if(!this.params.link) {
					this.$message.error('请输入在债权平台发布的债权链接');
					return false;
				}
				if(!this.params.qqCode || this.params.qqCode.length > 13 || this.params.qqCode.length < 5) {
					this.$message.error('请输入正确的QQ号');
					return false;
				}

				this.params.surplusPeriod = parseTime(this.params.surplusPeriod, '{y}-{m}-{d} {h}:{i}:{s}');
				//是否预付
				if(this.params.prepayFlag === 1) {
					if(this.userInfo.isSetTranspwd != 1) {
						this.$message.error('请先前往个人中心设置交易密码')
						this.$router.push({
							path: '/personalCenter/index',
							query: {
								index: 8
							}
						})
						return false;
					}
					if(this.isBindCard === 0) {
						this.$message.error('请先前往个人中心绑定银行卡')
						this.$router.push({
							path: '/personalCenter/index',
							query: {
								index: 8
							}
						})
						return false;
					} else {
						ajax({
								url: "orderTransfer",
								optionParams: this.params
							}).post()
							.then(res => {
								if(res.code === 200) {
									Cookies.remove('saleDebt');
									// this.$router.push('/index');
									this.params.id = res.data.transOrderId;
									this.$router.push({
										path: '/saleClaim/payBird',
										query: {
											data: JSON.stringify(this.params)
										}
									})
								} else {
									this.$message({
										message: res.message,
										type: "warning"
									});
								}
							})
							.catch(error => {
								console.log(error)
							})
						// this.$router.push({path:'/saleClaim/payBird', query:{data: JSON.stringify(this.params)}});

					}
				}
				//非预付直接出售
				if(this.params.prepayFlag === 0) {
					this.transfer();
				}
			},
			//计算折扣金额
			getAmount() {
				if(this.params.amount && this.params.discountRate) {
					if(Number(this.params.discountRate) > 0 && Number(this.params.discountRate) <= 9.99) {
						this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * Number(this.params.discountRate) / 10);
					} else {
						this.params.discountRate = "";
						this.params.discountAmount = "";
						// this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * Number(this.params.discountRate) / 10);
						this.$message.error('转让折扣应为0.01~9.99之间');
					}

				} else {
					this.$message.error('请输入转让金额或转让折扣');
					this.params.discountAmount = '';
					return false;
				}

			},
			//出售债转
			transfer() {
				let that = this;
				ajax({
						url: "orderTransfer",
						optionParams: this.params
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.$message({
								message: '发布成功！',
								type: "success"
							});
							Cookies.remove('saleDebt');
							//this.$router.push('/index');
							this.$router.push({
								path: '/debtList/detail',
								query: {
									id: res.data.transOrderId,
									ishw: 1
								}
							})
						} else {
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
			//是否绑卡
			getBanklist() {
				ajax({
						url: 'tAppUser/userInfo',
						optionParams: {}
					}).fetch()
					.then(response => {
						if(response.code === 200) {
							this.userInfo = response.data;
							this.isBindCard = response.data.isBindCard;
						} else {
							console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//检测域名
			checkLink() {
				//			console.log('检测域名')
				//			var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
				//			// var reg = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
				//			// var reg = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?/;
				//			if (!reg.test(this.params.link)) {
				//				this.$message.error('平台债权链接地址有误');
				//				this.params.link = '';
				//				return false;
				//			}

			},
			//模糊查询
			loadAll() {
				ajax({
						url: "orderTransfer/findPfNames",
						optionParams: {
							name: ''
						}
					}).post()
					.then(res => {
						if(res.code === 200) {
							for(let i = 0; i < res.data.length; i++) {
								this.pfNameList.push({
									'value': res.data[i]
								})
							}
						} else {
							this.pfNameList = [];
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			//模糊查询
			querySearchAsync(queryString, cb) {
				var restaurants = this.pfNameList;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 1000 * Math.random());
			},
			//模糊查询
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			//模糊查询
			handleSelect(item) {
				//console.log(item);
			},
			//金钱过滤
			formatMoney(val) {
				return val.toFixed(2);
			},
			//6位数字字母校验
			myfunction(value) {
				if(value.match("([0-9](?=[0-9]*?[a-zA-Z])\\w{5})|([a-zA-Z](?=[a-zA-Z]*?[0-9])\\w{5})")) {
					return true;
				} else {
					return false;
				}
			},
			//跳转支付页面Bird
			titleUrl(val) {
				//this.$router.push({path:'/saleClaim/pay', query:{data: JSON.stringify(val)}})
				this.$router.push({
					path: 'Bird',
					query: {
						data: JSON.stringify(val)
					}
				})
			},
			//本地存储输入的出售信息Cookies.set('token', res.data.token);
			localSave() {
				// var obj = {"a": 1,"b": 2};
				let obj = JSON.stringify(this.params); //转化为JSON字符串
				Cookies.set('saleDebt', obj);
			},
			localSave2() {
				// var obj = {"a": 1,"b": 2};
				let obj = JSON.stringify(this.paramsloans);
				Cookies.set('saleDebt', obj);
			},

			//借条
			
			//出售借条按钮
			loans() {
				//个人借条
				if(this.paramsloans.type == 1){
					if (!this.paramsloans.baseAmount) {
						this.$message.error('请输入债权本金');
						return false;
					}
					if (!this.paramsloans.interest) {
						this.$message.error('请输入债权利息');
						return false;
					}
					if(!this.paramsloans.holdType){
						this.$message.error('请输入承接方式');
						return false;
					}
					if(this.paramsloans.holdType != 1){
						if (!this.paramsloans.proxyFeeRate) {
							this.$message.error('请输入代理清收费率');
							return false;
						}
					}
					if (!this.paramsloans.debtorName) {
						this.$message.error('请输入债务人姓名');
						return false;
					}
					if (this.selectedOptions3=='') {
						this.$message.error('请输入债务人所在地区');
						return false;
					}
					if (!this.paramsloans.localDetail) {
						this.$message.error('请输入债务人详细住址');
						return false;
					}
				}
				//小贷(金融)借条
				if(this.paramsloans.type == 2){
					if (!this.paramsloans.debtOrderCount) {
						this.$message.error('请输入债权数量');
						return false;
					}
					if (!this.paramsloans.debtAmountAvg) {
						this.$message.error('请输入债权均值');
						return false;
					}
				}
				//共有判断
				if (!this.paramsloans.amountAndInterest) {
					this.$message.error('请输入债权本息');
					return false;
				}
				if (!this.paramsloans.amount) {
					this.$message.error('请输入成交金额');
					return false;
				}
				if (!this.paramsloans.holdType) {
					this.$message.error('请输入承接方式');
					return false;
				}
				if (!this.paramsloans.lawsuitState) {
					this.$message.error('请输入诉讼或仲裁情况');
					return false;
				}
				if(this.paramsloans.lawsuitState==1){
					if (!this.paramsloans.lawsuitAmount) {
						this.$message.error('请输入诉讼/仲裁本金');
						return false;
					}
					if (!this.paramsloans.lawsuitOrg) {
						this.$message.error('请输入诉讼/仲裁机构');
						return false;
					}
					if (!this.paramsloans.lawsuitProgress) {
						this.$message.error('请输入执行状态');
						return false;
					}
				}
				if (!this.paramsloans.qqCode) {
					this.$message.error('请输入QQ号');
					return false;
				}
				if (!this.paramsloans.captcha || this.paramsloans.captcha.length != 4) {
					this.$message.error('请输入四位图形验证码');
					return false;
				}
				console.log('ok');
				this.loansOrder();
			},
			loansOrder(){
				ajax({
					url: "order_loans",
					optionParams: this.paramsloans
				}).post()
				.then(res => {
					if(res.code === 200) {
						this.$message({
							message: '发布成功！',
							type: "success"
						});
						Cookies.remove('saleDebt');
						this.$router.push({
							path: '/debtList/detailj',
							query: {
								id: res.data.loansOrderId,
								ishw: 1,
							}
						})
					} else {
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
			//计算本息
			amountsumInterest() {
				if(this.paramsloans.baseAmount || this.paramsloans.interest){
					this.paramsloans.amountAndInterest = Number(this.paramsloans.baseAmount) + Number(this.paramsloans.interest);
				}else{
					this.paramsloans.amountAndInterest = 0;
				}
			},
			amountsumInteresta() {
				if(this.paramsloans.amountAndInterest || this.paramsloans.debtOrderCount){
					this.paramsloans.debtAmountAvg = Number(this.paramsloans.amountAndInterest) / Number(this.paramsloans.debtOrderCount);
					this.paramsloans.debtAmountAvg = (this.paramsloans.debtAmountAvg).toFixed(2)
				}else{
					this.paramsloans.debtAmountAvg = 0;
				}
			},
			//获取省市区
			getaddress(){
				this.paramsloans.localProvince = this.selectedOptions3[0];
				this.paramsloans.localCity = this.selectedOptions3[1];
				this.paramsloans.localArea = this.selectedOptions3[2];
			}
		},
		filters: {

		}
	};
</script>
<style lang='scss' scoped>
	@import "./scss/index.scss";
	.beijing {
		background: #f7f8fd;
		padding-bottom: 20px;
	}
	
	.zhaizhuan {
		width: 100%;
		height: 120px;
	}
	
	.zhaizhuan span {
		font-size: 60px;
		position: absolute;
		margin-top: -17px;
	}
	
	.dian {
		margin-left: -35px;
	}
	
	.zhaizhuan-title {
		width: 1200px;
		height: 80px;
		line-height: 80px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(242, 242, 242, 1);
		box-shadow: 0px 4px 8px 1px rgba(90, 123, 252, 0.16);
		border-radius: 4px 4px 0px 0px;
		margin: 0 auto;
		font-size: 18px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		margin-top: 38px;
	}
	
	.zhaizhuan-form {
		width: 1200px;
		min-height: 942px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(242, 242, 242, 1);
		border-radius: 4px 4px 0px 0px;
		margin: 0 auto;
		margin-top: 1px;
	}
	
	.zhaizhuan-form .zhaizhuan_lei {
		width: 585px;
		margin: 0 auto;
		margin-top: 60px;
	}
	
	.zhaizhuan-form .zhaizhuan_lei ul {
		width: 100%;
	}
	
	.zhaizhuan-form .zhaizhuan_lei ul li {
		width: 100%;
		height: 50px;
		margin-top: 8px;
	}
	
	.zhaizhuan-form .zhaizhuan_lei ul li h3 {
		width: 85px;
		height: 50px;
		line-height: 50px;
		float: left;
		text-align: right;
		font-size: 14px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(128, 128, 128, 1);
	}
	
	.zhaizhuan-div {
		width: 630px;
		min-height: 900px;
		margin: 0 auto;
	}
	
	.zhaizhuan-div ul {
		width: 100%;
	}
	
	.zhaizhuan-div ul li {
		width: 100%;
		height: 50px;
		margin-top: 8px;
	}
	
	.zhaizhuan-div ul li h3 {
		width: 105px;
		height: 50px;
		line-height: 50px;
		float: left;
		text-align: right;
		font-size: 14px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(128, 128, 128, 1);
	}
	
	.zhaizhuan-div ul li textarea {
		width: 483px;
		height: 80px;
		border: 1px solid #c4d1d8;
		border-radius: 4px;
		font-size: 14px;
		font-family: MicrosoftYaHeiLight;
		font-weight: 300;
		color: #333333;
		vertical-align: top;
		resize: none;
		outline: none;
		padding-left: 10px;
		margin-top: 10px;
		color: #606266;
	}
	
	textarea::input-placeholder {
		color: #c0c4cc;
	}
	
	textarea::-webkit-input-placeholder {
		color: #c0c4cc;
	}
	
	textarea::-moz-input-placeholder {
		color: #c0c4cc;
	}
	
	.zhaizhuan-txt {
		width: 495px;
		height: 40px;
		float: left;
		border-radius: 4px;
		margin-top: 4px;
		background-color: #fff!important;
	}
	
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
		border-right: 0px;
	}
	
	.danxuan {
		margin-top: 19px;
	}
	
	.zhaizhuan-yanzhen {
		width: 382px;
		margin-top: 4px;
	}
	
	.tuxingma {
		width: 100px;
		height: 40px;
		float: right;
		margin-right: 5px;
		background: #9298a6;
		margin-top: 4px;
	}
	
	.zhaiquan-on {
		width: 300px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		background: rgba(57, 99, 208, 1);
		border-radius: 20px;
		font-size: 18px;
		font-family: "MicrosoftYaHeiLight";
		font-weight: 300;
		color: rgba(255, 255, 255, 1);
		margin: 45px 0 0 120px;
	}
</style>