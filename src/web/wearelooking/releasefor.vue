<template>
  <div style="width:100%;background: #f7f8fd;padding-top: 20px;padding-bottom: 20px;">
    	<div class="release">
    		<h2>填写求购债权</h2>
    		<p>请填写您想购买的平台及其债权信息，让债权交易更加便捷舒心!</p>
    		<div class="tijiao">
    			<div class="tijiao_d">
    				<span>平台名称：</span>
    				<el-autocomplete class="zhaizhuan-txt" v-model="optionParams.pfName" :fetch-suggestions="querySearchAsync" placeholder="例：钱盆网" @select="handleSelect"></el-autocomplete>
    				<!--<input type="" placeholder="例：钱盆网" v-model="optionParams.pfName" name="" id="" value="" />-->
    			</div>
    			<div class="tijiao_d">
    				<span>标的类型：</span>
    				<el-checkbox-group v-model="optionParams.leixing">
					    <el-checkbox v-for="city in cities" :label="city.id" :key="city.id" @change="Citiesb(city)">{{city.name}}</el-checkbox>
					  </el-checkbox-group>
    			</div>
    			<div class="tijiao_d">
    				<span>期望转让金额：</span>
    				<input type="" class="fistyuan" v-model="optionParams.minDiscountAmount" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" placeholder="例：9000 " name="" id="" value="" />
    				<b>至</b>
    				<input type="" class="lastyuan" v-model="optionParams.maxDiscountAmount" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" @change="getAmount()" placeholder="例：10000" name="" id="" value="" />
    			</div>
    			<div class="tijiao_d">
    				<span>期望转让折扣：</span>
    				<input type="" class="fistyuan" v-model="optionParams.minDiscountRate" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" placeholder="例：8.88" name="" id="" value="" />
    				<b>至</b>
    				<input type="" class="lastyuan" v-model="optionParams.maxDiscountRate" onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" placeholder="例：9.99" name="" id="" value="" />
    			</div>
    			<div class="tijiao_d">
    				<span>期望还款状况：</span>
    				<el-checkbox-group v-model="optionParams.zhuangk">
					    <el-checkbox v-for="city in citiea" :label="city.id" :key="city.id"  @change="Cities()">{{city.tit}}</el-checkbox>
					  </el-checkbox-group>
    			</div>
    			<div class="tijiao_d">
    				<span>期望剩余时间：</span>
    				<input type="" placeholder="例：3个月或者120日" maxlength="10" v-model="optionParams.invokeDayLeft" name="" id="" value="" />
    			</div>
    			<div class="tijiao_d">
    				<span>求购有效期：</span>
    				<el-select v-model="optionParams.effDay" placeholder="请选择">
	    				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						    </el-option>
						</el-select>
    			</div>
    			<div class="tijiao_d">
    				<span>QQ号：</span>
    				<input type="" placeholder="请输入您的QQ号" v-model="optionParams.qqCode" name="" id="" value="" />
    			</div>
    			<div class="tijiao_d" style="margin-top: 0px;">
    				<el-checkbox-group v-model="optionParams.qqxian">
					    <el-checkbox v-for="city in citiec" :label="city.id" @change="Citiesa()" :key="city.id">{{city.tit}}</el-checkbox>
					  </el-checkbox-group>
    			</div>
    			<div class="tijiao_d">
    				<span>备注：</span>
						<textarea name="" rows="" maxlength="30" v-model="optionParams.remark" placeholder="还有其他需要展示的信息都写在这哦~" cols=""></textarea>
    			</div>
    			<div class="tijiao_d">
    				<span>验证码：</span>
    				<input type="" v-model="optionParams.captcha" class="yanzhenm" placeholder="请输入图形验证码" name="" id="" value="" />
    				<img @click="reLoad()" id="valideImg" src=""/>
    			</div>
    			<div class="tijiao_d" style="margin-bottom: 30px;">
    				 <el-button type="primary" style='width:300px;height: 42px;background: rgba(57,99,208,1);border-radius:20px;border: none;color: white;margin-left: 140px;' plain @click='submbst'>立即发布</el-button>
    			</div>
    		</div>
    	</div>
  </div>
</template>
<script>
import ajax from '@utils/config';
import baseURL from '@/assets/js/ajax/baseURL';
import tendency from '@/components/tendency1.vue';
export default {
		data() {
			return {
				optionParams: {
					pfName:'',//平台名称
					leixing:[1],
					types:[{id: 1, name: "个人信用贷"}],//	类型
					minDiscountAmount:'',//最低转让金额
					maxDiscountAmount:'',//最高转让金额
					minDiscountRate:'',//最低折扣金额
					maxDiscountRate:'',//最高折扣金额
					zhuangk:[1],
					repayStatus:1,//还款状况
					invokeDayLeft:'',//期望剩余天数
					effDay:'',//求购有效期
					qqCode:'',//qq号
					qqxian:true,
					showQqCode:1,//是否显示QQ号
					remark:'',//备注
					captcha:'',//图形验证码
					randNum:'',
				},
				cities:[],
				citiea:[
					{
						tit:'正常还款',
						id:1,
					},
					{
						tit:'逾期还款',
						id:2,
					},
				],
				citiec:[
					{
						tit:'在求购详情内展示QQ号码',
						id:1,
					},
					
				],
				value: '',
				 options: [{
          value: '10',
          label: '10天'
        }, {
          value: '30',
          label: '30天'
        }, {
          value: '90',
          label: '90天'
        }],
        pfNameList:[],
        datafter:{},
			}
		},
		computed: {
			
		},
		created() {
			this.reLoad();
			this.getlate()
			this.loadAll()
			this.datafter = this.$route.query.data ?  JSON.parse(this.$route.query.data) : '';
			this.adataftr()
		},
		mounted() {
			
		},
		methods: {
			adataftr(){
				if(this.datafter != ''){
					this.optionParams.pfName = this.datafter.pfName
					this.optionParams.pfName = this.datafter.pfName
					this.optionParams.minDiscountAmount = this.datafter.minDiscountAmount
					this.optionParams.maxDiscountAmount = this.datafter.maxDiscountAmount
					this.optionParams.minDiscountRate = this.datafter.minDiscountRate
					this.optionParams.maxDiscountRate = this.datafter.maxDiscountRate
					this.optionParams.invokeDayLeft = this.datafter.invokeDayLeft
					this.optionParams.qqCode = this.datafter.qqCode
					this.optionParams.remark = this.datafter.remark
					this.optionParams.id = this.datafter.id
					var str = this.datafter.types
					var arry = []
					str.map((item)=>{
						arry.push(item.id)
					})
					this.optionParams.leixing = arry
					if(this.datafter.showQqCode == 1){
						this.optionParams.qqxian = true
					}else{
						this.optionParams.qqxian = false
					}
					if(this.datafter.repayStatus == 1 || this.datafter.repayStatus == 2 ){
						this.optionParams.zhuangk = [this.datafter.repayStatus]
					}else{
						this.optionParams.zhuangk = [1,2]
					}
					this.reload()
			    this.Cities()
					this.Citiesa()
					this.Citiesb()
				}
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
					if (res.code === 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.pfNameList.push({ 'value': res.data[i] })
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
			return (state) => {
				return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		//模糊查询
		handleSelect(item) {
			//console.log(item);
		},
			getlate(){
				ajax({
						url: 'invoke_buy/types',
						optionParams: {}
					}).fetch()
					.then(response => {
						if(response.code === 200) {
							this.cities = response.data ? response.data : []
							if(this.datafter != ''){
								this.optionParams.types = []
								var ste = this.optionParams.leixing
									this.cities.map((itme)=>{
										ste.map((itm)=>{
											if(itme.id == itm){
												this.optionParams.types.push(itme) 
											}
										})
									})
							}
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
				this.optionParams.randNum = Date.parse(new Date());
				console.log(this.optionParams.randNum)
				xmlhttp.open("GET", baseURL() + "tAppUser/captcha?randNum=" + this.optionParams.randNum, true);
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
			Cities(){
					if(this.optionParams.zhuangk.length == 2){
						this.optionParams.repayStatus = 3
					}else{
						this.optionParams.repayStatus = this.optionParams.zhuangk[0]
					}
			},
			Citiesa(){
					if(this.optionParams.qqxian == false){
						this.optionParams.showQqCode = 0
					}else{
						this.optionParams.showQqCode = 1
					}
			},
			Citiesb(itm){
				this.optionParams.types = []
				var ste = this.optionParams.leixing
					this.cities.map((itme)=>{
						ste.map((itm)=>{
							if(itme.id == itm){
								this.optionParams.types.push(itme) 
							}
						})
					})
					console.log(this.optionParams.types)
			},
     submbst(){
     	console.log(this.optionParams)
     	if(this.optionParams.pfName == ""){
				this.$message.error('请输入平台名称');
				return false
			}
     	if(this.optionParams.minDiscountAmount == ""){
				this.$message.error('请输入最低转让金额');
				return false
			}
     	if(this.optionParams.maxDiscountAmount == ""){
				this.$message.error('请输入最高转让金额');
				return false
			}
     	if(this.optionParams.minDiscountAmount > this.optionParams.maxDiscountAmount){
     		this.$message.error('最高转让金额需要大于最低转让金额');
				return false
     	}
			if(this.optionParams.minDiscountRate == ""){
				this.$message.error('请输入最低折扣金额');
				return false
			}
			if(this.optionParams.maxDiscountRate == ""){
				this.$message.error('请输入最高折扣金额');
				return false
			}
			if(this.optionParams.minDiscountRate > this.optionParams.maxDiscountRate){
     		this.$message.error('最高折扣金额需要大于最低折扣金额');
				return false
     	}
			if(this.optionParams.effDay == ""){
				this.$message.error('请输入求购有效期');
				return false
			}
			if(this.optionParams.qqCode == ""){
				this.$message.error('请输入QQ号');
				return false
			}
			if(this.optionParams.captcha == ""){
				this.$message.error('请输入图形验证码');
				return false
			}
			var url = ''
			if(this.datafter != ''){
				url ='invoke_buy/again_release'
			}else{
				url ='invoke_buy/release'
			}
     	ajax({
						url: url,
						optionParams: this.optionParams
					}).post()
					.then(response => {
						if(response.code == 200){
							this.$message.success(response.message);
							this.$router.push({path:'/wearelooking/details',query:{id:response.data + '-1'}})
						}else{
							this.$message.error(response.message);
						}

					})
					.catch(error => {
						console.log(error)
					})
     },
     //计算折扣金额
		getAmount(num) {
			
		},
		},
	}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
/*搜索框7*/
.release input{
	padding-left: 10px;
}
</style>