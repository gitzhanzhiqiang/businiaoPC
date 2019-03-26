<template>
	<div style="width:100%;background: #f7f8fd;padding-top: 20px;">
		<div class="looking">
			<div class="looking_head">
				<ul>
					<li @click="getApplyList(0)">最新</li>
					<li @click="getApplyList(0);optionParams.hotSort = 1" v-if='optionParams.hotSort == 0'>热度<img src="./img/shan.png"></li>
					<li @click="getApplyList(1);optionParams.hotSort = 2" v-if='optionParams.hotSort == 1'>热度<img src="./img/xiaa.png"></li>
					<li @click="getApplyList(2);optionParams.hotSort = 0" v-if='optionParams.hotSort == 2'>热度<img src="./img/xiab.png"></li>
				</ul>
			</div>
			<div class="lie">
				<div class="meiyoud" v-if="!allData.length">
					<img src="./img/woqiugou.png"/>
					<p>您还未发布过求购哦，<span @click="$router.push({path:'/wearelooking/releasefor' })">发布看看</span></p>
				</div>
				<div class="lie_x" v-for='item in allData' v-if="allData.length">
					<div class="imgx">
						<img v-if="!item.pfLogo" src="~@/assets/images/moren.png" />
              			<img v-if="item.pfLogo" :src="item.pfLogo" alt="">
					</div>
					<div class="xian"></div>
					<div class="lie_ri">
						<div class="lie_top">
							<p>{{item.pfName}}</p>
							<span>{{item.hotPoint}}<img src="./img/huo.png"/></span>
						</div>
						<div class="lie_bottom">
							<ul>
								<li>
									<p>{{item.minDiscountAmount}}至{{item.maxDiscountAmount}} <b style="font-size:22px;color:rgba(51,51,51,1);font-weight: 400;">元</b></p>
									<span>期望转让金额(元)</span>
								</li>
								<li>
									<p>{{item.minDiscountRate}}至{{item.maxDiscountRate}} <b style="font-size:22px;color:rgba(51,51,51,1);font-weight: 400;">折</b></p>
									<span>期望转让折扣</span>
								</li>
								<li>
									<p>
										<template v-if="item.repayStatus == 1">正常还款</template>
										<template v-if="item.repayStatus == 2">逾期还款</template>
										<template v-if="item.repayStatus == 3">正常还款;逾期还款</template>
									</p>
									<span>期望还款状况</span>
								</li>
								<li>
									<button style="cursor: pointer;" @click="$router.push({path:'/wearelooking/details',query:{id:item.id + '-0'}})">查看详情</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- 分页 -->
			<div class="pagination-container">
				<el-pagination @size-change="undertakeSizeChange" @current-change="undertakeCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30, 50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import tendency from '@/components/tendency1.vue';
	export default {
		data() {
			return {
				optionParams: {
					page: 1,
					limit: 10,
					hotSort:'0',
				},
				total:0,
				allData:[],
				numd:'0',
			}
		},
		computed: {},
		created() {
			this.getApplyList(0)
		},
		mounted() {},
		methods: {
			//债转列表
			getApplyList(num) {
				this.optionParams.hotSort = num
				ajax({
						url: 'invoke_buy/list',
						optionParams: this.optionParams
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.allData = response.data.records ? response.data.records : [];
							this.total = response.data.total;
						} else {
							this.allData = [];
							this.total = 0;
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			// 改变每一页的条数
			undertakeSizeChange(val) {
				this.optionParams.limit = val;
				this.getApplyList(0)
			},
			// 切换页码
			undertakeCurrentPageChange(val) {
				this.optionParams.page = val;
				this.getApplyList(0)
			},
		},
	}
</script>
<style lang='scss' scoped>
	@import './scss/index.scss';
	/*搜索框7*/
</style>