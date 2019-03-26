<template>
	<div style="width:100%;background: #f7f8fd;padding-top: 20px;padding-bottom: 20px;" class="psspd">
		<div class="detailsd">
			<div class="tite">
				<i></i> 求购详情
			</div>
			<div class="detailsd_heda">
				<img class="leftimg" v-if="!allData.pfLogo" src="~@/assets/images/moren.png" />
              	<img class="leftimg"  v-if="allData.pfLogo" :src="allData.pfLogo" alt="">
				<div class="detailsd_hedl">
					<h3>{{allData.pfName}}<span style="cursor: pointer;" @click="centerDialogVisible = true">分享<img src="./img/fengxiang.png"/></span></h3>
					<p>发布日期：{{allData.createTime}}<span>{{allData.hotPoint}}<img src="./img/huo.png"/></span></p>
				</div>
			</div>
			<div class="gexinxi">
				<div class="gexinxi_top">
					<p style="width: 612px;">求购标的类型<span v-for="itm in allData.types">{{itm.name}}</span></p>
					<p style="width: 200px;" v-if='allData.invokeDayLeft'>期望剩余时间<span>{{allData.invokeDayLeft}}</span></p>
				</div>
				<div class="gexinxi_bt">
					<p>{{allData.minDiscountAmount}}至{{allData.maxDiscountAmount}} <b style="font-size:22px;color:rgba(51,51,51,1);font-weight: 400;">元</b><span>期望转让金额(元)</span></p>
					<p>{{allData.minDiscountRate}}至{{allData.maxDiscountRate}} <b style="font-size:22px;color:rgba(51,51,51,1);font-weight: 400;">折</b><span>期望转让折扣</span></p>
					<p>
						<template v-if="allData.repayStatus == 1">正常还款</template>
						<template v-if="allData.repayStatus == 2">逾期还款</template>
						<template v-if="allData.repayStatus == 3">正常还款,逾期还款</template>
						<span>期望还款状况</span>
					</p>
				</div>
			</div>
			<div class="gexinxi_di">
				<ul>
					<li v-if='allData.remark'><span>备注 |</span>{{allData.remark}}</li>
					<li v-if='allData.showQqCode == 1'><span>求购人QQ |</span>{{allData.qqCode}}</li>
					<li><span>客服QQ |</span>2177430082</li>
					<li><span>客服电话 |</span>400-600-0186</li>
				</ul>
			</div>
			<div class="dibuxia">
				<p>私下交易有风险，交易请用不死鸟。</p>
				<div class="dibuxia_d">
					
				</div>
			</div>
		</div>
		
		
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
	import tendency from '@/components/tendency1.vue';
	export default {
		data() {
			return {
				id: '',
				allData: {},
				centerDialogVisible:false,
				dizhi:'',
				suffix:'',
				suffixa:'',
			}
		},
		computed: {},
		created() {
			this.id = this.$route.query.id ? this.$route.query.id : '';
			var arr =this.id.split('-');
			this.suffix = arr[arr.length-1]
			this.suffixa = arr[arr.length-arr.length]
			console.log(this.suffix)
			console.log(this.suffixa)
			if(this.suffix == 1){
				this.centerDialogVisible = true
			}
			this.dizhi = 'https://www.bsnzz.com/wearelooking/details?id=' + this.suffixa + '-0'
			this.getApplyList()
		},
		mounted() {},
		methods: {
			shareBox() {
				var url = document.getElementById("cpLink");
			    url.select();
			    document.execCommand("copy");
			   	this.$message.success('复制成功');
			   	this.centerDialogVisible=false;
	            return
        },
			getApplyList() {
				ajax({
						url: 'invoke_buy/details?id=' + this.suffixa,
						optionParams: {}
					}).fetch()
					.then(response => {
						if(response.code === 200) {
							this.allData = response.data ? response.data : {}
						} else {
							this.allData = {};
							this.total = 0;
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
		},
	}
</script>
<style lang='scss' scoped>
	@import './scss/index.scss';
	/*搜索框7*/
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
</style>