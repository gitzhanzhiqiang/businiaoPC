<template>
	<div style="width:100%;background: #f7f8fd;padding-top: 20px;padding-bottom: 20px;" class="psspd">
		<div class="wanttib">
			<div class="lie">
				<div class="meiyoud" v-if="!allData.length">
					<img src="./img/libiao.png"/>
					<p>暂无求购，<span @click="$router.push({path:'/wearelooking/releasefor' })">发布看看</span></p>
				</div>
				<div class="lie_x" v-for="itm in allData" v-if="allData.length">
					<div class="imgx">
						<img v-if="!itm.pfLogo" src="~@/assets/images/moren.png" />
              			<img v-if="itm.pfLogo" :src="itm.pfLogo" alt="">
					</div>
					<div class="xian"></div>
					<div class="lie_ri">
						<div class="lie_top">
							<p>{{itm.pfName}}&nbsp;&nbsp;<b>发布日期：{{itm.createTime}} </b> <span class="imgsd">{{itm.hotPoint}}<img src="./img/huo.png"/></span></p>
							<span>
								<b v-if='itm.status == 1'>发布中</b>
								<b v-if='itm.status == 2' style="color: #F3AC30;">已撤销</b>
								<b v-if='itm.status == 3' style="color: #5F72A4;">已下架</b>
								<b v-if='itm.status == 4'>人工下架</b>
								  分享<img style="cursor: pointer;" @click="fengxian(itm)" src="./img/fengxiang.png"/></span>
						</div>
						<div class="lie_bottom">
							<ul>
								<li>
									<p>{{itm.minDiscountAmount}}至{{itm.maxDiscountAmount}} <b style="font-size:22px;color:rgba(51,51,51,1);font-weight: 400;">元</b></p>
									<span>期望转让金额(元)</span>
								</li>
								<li>
									<p>{{itm.minDiscountRate}}至{{itm.maxDiscountRate}} <b style="font-size:22px;color:rgba(51,51,51,1);font-weight: 400;">折</b></p>
									<span>期望转让折扣</span>
								</li>
								<li>
									<p style="margin-bottom: 5px;">
										<template v-if="itm.repayStatus == 1">正常还款</template>
										<template v-if="itm.repayStatus == 2">逾期还款</template>
										<template v-if="itm.repayStatus == 3">正常还款;逾期还款</template>
									</p>
									<span>期望还款状况</span>
								</li>
								<li>
									<button v-if='itm.status == 1' @click="suabst(itm)" style="background:rgba(104,111,132,1);">撤销求购</button>
									<button v-if='itm.status == 2' @click="suabsta(itm)">再次发起</button>
									<button v-if='itm.status == 3' @click="suabsta(itm)">再次发起 </button>
									<button v-if='itm.status == 4' @click="suabsta(itm)">再次发起</button>
								</li>
							</ul>
						</div>
						<div class="lie_btt">
							<div class="lie_btt_l">
								<ul>
									<li>求购标的类型 |&nbsp;&nbsp;
										<template v-for='itme in itm.types' v-if="itm.types && itm.types.length > 0 && itme">
											{{itme.name}}
										</template>
									</li>
									<li v-if="itm.invokeDayLeft">期望剩余时间 |&nbsp;&nbsp;{{itm.invokeDayLeft}}</li>
									<li v-if='itm.showQqCode == 1'>求购人QQ |&nbsp;&nbsp;{{itm.qqCode}}</li>
								</ul>
							</div>
							<div class="lie_btt_r">
								<ul>
									<li v-if="itm.remark" style="height: 50px;">备注 |
										<p>{{itm.remark}}</p>
									</li>
									<li v-if="itm.delistingTime">下架时间 | {{itm.delistingTime}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 分页 -->
			<div class="pagination-container">
				<el-pagination @size-change="undertakeSizeChange" @current-change="undertakeCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30, 50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="undertakeDataTotal">
				</el-pagination>
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
				undertakeDataTotal: 0,
				optionParams: {
					page: 1,
					limit: 10,
				},
				allData: [],
				centerDialogVisible:false,
				dizhi:'',
			}
		},
		computed: {},
		created() {
			
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
        fengxian(row){
        	this.dizhi = 'https://www.bsnzz.com/wearelooking/details?id=' + row.id + '-0'
        	this.centerDialogVisible = true
        },
			suabst(row) {
				this.$confirm('是否撤销求购, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					ajax({
						url: 'invoke_buy/revoke',
						optionParams: {
							id:row.id
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.getApplyList() 
							this.$message({
								type: 'success',
								message: response.message,
							});
						} else {
							this.$message.error(response.message);
						}

					})
					.catch(error => {
						console.log(error)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			
			suabsta(row) {
				this.$confirm('是否再次发起, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({path:'/wearelooking/releasefor',query:{data:JSON.stringify(row)}})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//债转列表
			getApplyList() {
				ajax({
						url: 'invoke_buy/my_list',
						optionParams: this.optionParams
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.allData = response.data.records ? response.data.records : [];
							this.undertakeDataTotal = response.data.total;
						} else {
							this.allData = [];
							this.undertakeDataTotal = 0;
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			// 改变每一页的条数
			undertakeSizeChange(val) {
				this.optionParams.limit = val;
				this.getApplyList()
			},
			// 切换页码
			undertakeCurrentPageChange(val) {
				this.optionParams.page = val;
				this.getApplyList()
			},
		},
		filters: {}
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