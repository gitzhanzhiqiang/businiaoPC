<template>
	<div class="beijing">
		<div class="guanyu">
			<div class="newycontent">
				<div class="contop">
					<h3>{{tendencyData.title}}</h3>
					<span>{{tendencyData.createTime}}</span>
					<p>来源：{{tendencyData.source}}</p>
				</div>
				<div class="conbottom">
					<!--<p v-html="tendencyData.content"></p>-->
					<div class="conrong" v-html="tendencyData.content"></div>
					<a v-if='tendencyData.url' @click="tiaozhuan(tendencyData.url)"><img src="~@/assets/images/lianjie.png"/>原文链接</a>
				</div>
			</div>
			<div class="bottoma">
				<input type="button" style="float: left;margin-left: 57px;" value="上一篇" id="previous" @click.prevent="getarticle(tendencyData.id,1)" :disabled="perdisable==true">
				<input type="button" style="float: right;margin-right: 57px;" value="下一篇" id="next" @click.prevent="getarticle(tendencyData.id,2)" :disabled="nextdisable==true">
				<!--<p style="float: left;margin-left: 57px;" @click.prevent="getarticle(tendencyData.id,1)" v-if="perdisable == false">上一篇</p>
				<p style="float: right;margin-right: 57px;" @click.prevent="getarticle(tendencyData.id,2)" v-if="nextdisable == false">下一篇</p>-->
			</div>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	export default {
		components: {},
		data() {
			return {
				orderId:'',
				tendencyData:{},
				xinParams: {
			        limit: 99999,
			        page: 1,
			        pfId:'',
			        type:'',
			      },
			      xindata:[],
			      perdisable:false,
			      nextdisable:false,
			}
		},
		computed: {},
		created() {
			this.orderId = this.$route.query.id?this.$route.query.id:'';
			this.xinParams.pfId = this.$route.query.dailogShow?this.$route.query.dailogShow:'';
			this.xinParams.type = this.$route.query.index?this.$route.query.index:'';
			this.getTendency()
			this.getTendenxin()
		},
		mounted() {
			// this.map()
		},
		updated() {
		    document.querySelector('.conrong img').style.cssText = 'display: block;margin: 0 auto;margin-top: 20px;'
		 },
		methods: {
			getTendenxin() {
			ajax({
				url: "platform/content_list",
				optionParams: this.xinParams
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.xindata = res.data.records ?res.data.records:[];
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
			getTendency() {
				ajax({
					url: "platform/content_detail",
					optionParams: {
						id: this.orderId
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.tendencyData = res.data;
						} else {
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			tiaozhuan(urla){
				//window.open(urla)
				window.location.href=urla
			},
			getarticle(row,type){
					var val1 = ''
					console.log(val1)
					val1 = row
				this.perdisable=false;
				this.nextdisable=false;
				//点击上一篇判断
				if(type == 1){
					this.xindata.map((item, index)=>{
						if(row==this.xindata[index].id){
							 val1 = this.xindata[index-1].id;
						}
					});			
				}

				//点击下一篇判断
				if(type == 2){
					this.xindata.map((item, index)=>{
						if(row==this.xindata[index].id){
							 val1 = this.xindata[index+1].id;
						}
					});
				}	
				//改变上一篇和下一篇按钮状态
				if(val1==this.xindata[0].id){
					this.perdisable=true;
				}
				let z = this.xindata.length-1;
				if(val1==this.xindata[z].id){
					this.nextdisable=true;
				}
				ajax({
					url: "platform/content_detail",
					optionParams: {
						id: val1
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.tendencyData = res.data;
						} else {
						}
					})
					.catch(error => {
						console.log(error)
					})
				
			},
		},
		filters: {

		}
	}
</script>
<style lang='scss' scoped>
.beijing{
	width: 100%;
	overflow: hidden;
	background: #f7f8fd;
}
	.guanyu{
		width: 1200px;
		overflow: hidden;
		margin: 0 auto;
		background: white;
		margin-top: 20px;
		.newycontent{
			width: 1100px;
			overflow: hidden;
			background: rgba(255, 255, 255, 1);
			margin: 0 auto;
			.contop{
				width: 100%;
				overflow: hidden;
				padding: 20px 0px;
				border-bottom: 1px solid #F7F7F7;
				h3{
					width:902px;
					font-size:20px;
					font-family:MicrosoftYaHei-Bold;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:32px;
					float: left;
				}
				span{
					line-height: 30px;
					font-size:16px;
					font-family:MicrosoftYaHeiLight;
					font-weight:300;
					color:rgba(51,51,51,1);
					float: right;
				}
				p{
					width: 100%;
					margin-top: 10px;
					float: left;
					font-size:14px;
					font-family:MicrosoftYaHeiLight;
					font-weight:300;
					color:rgba(128,128,128,1);
				}
			}
			.conbottom{
				width: 100%;
				overflow: hidden;
				.conrong{
					width: 100%;
					overflow: hidden;
					margin-top: 20px;
					margin-bottom: 20px;
					font-size:14px;
					font-family:MicrosoftYaHeiLight;
					font-weight:300;
					color:rgba(128,128,128,1);
					line-height:24px;
				}
				a{
					height: 30px;
					line-height: 30px;
					display: block;
					font-size:12px;
					font-family:MicrosoftYaHeiLight;
					font-weight:300;
					color:rgba(57,99,208,1);
					margin-bottom: 20px;
					cursor: pointer;
					img{
						width: 20px;
						height: 18px;
						float: left;
						margin-top: 5px;
						margin-right: 10px;
					}
				}
			}
		}
		.bottoma{
			width: 100%;
			height: 138px;
			background: #f7f8fd;
			input{
				width:180px;
				height:38px;
				background:rgba(255,255,255,1);
				border:1px solid rgba(204,204,204,1);
				border-radius:8px;
				text-align: center;
				line-height: 38px;
				margin-top: 32px;
				cursor: pointer;
				font-size:14px;
				font-family:MicrosoftYaHei;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
	}
</style>