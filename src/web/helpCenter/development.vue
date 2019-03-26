<template>
	<div class="helpCenter">
		<div class="Center">
			<img src="~@/assets/images/kaifang.png" />
			<div class="mikl">
				<h2><i></i>提供的服务</h2>
				<div class="content">
					<p>覆盖全网债转用户，迅速传播债转信息帮助企业与不死鸟进行债权转让信息的同步，提高债转曝光量，主要同步内容有：</p>
					<h3>债转订单ID、平台名称、债权的基本信息</h3>
				</div>
				<h2><i></i>特别申明</h2>
				<div class="content">
					<p>未得到黑尘科技的书面许可，不得为任何目的、以任何形式或手段（包括但不限于机械的或电子的）复制或传播本文档的任何部分。对于本文档涉及的技术和产品，黑尘科技拥有其专利（或正在申请专利）、 商标、版权或其它知识产权。除非得到黑尘科技的书面许可协议，本文档不授予这些专利、商标、版权或其它知识产权的许可。</p>
					<p>本文档因产品功能示例和描述的需要，所使用的任何人名、企业名和数据都是虚构的，并仅限于黑尘科技内部测试使用，不等于黑尘科技对任何第三方的承诺和宣传。</p>
					<p>本文档的解释权属于黑尘科技。若本文档内容变动，恕不另行通知。</p>
				</div>
				<h2><i></i>接口文档</h2>
				<div class="content" style="margin-top: 60px;">
					<img src="~@/assets/images/wendan.png" />
					<p style="float: left;margin: 10px 0px;font-size:18px;color:rgba(102,102,102,1);">合作平台对接文档.PDF</p>
					<a href="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/%E5%90%88%E4%BD%9C%E5%B9%B3%E5%8F%B0%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3v1.0.1.pdf" target="_blank">下载文档</a>
				</div>
				<h2><i></i>合作伙伴</h2>
				<div class="content">
					<ul>
						<li>
							<img src="~@/assets/images/qidai.png"/>
						</li>
						<li>
							<img src="~@/assets/images/qidai.png"/>
						</li>
						<li>
							<img src="~@/assets/images/qidai.png"/>
						</li>
						<li>
							<img src="~@/assets/images/qidai.png"/>
						</li>
					</ul>
				</div>
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

			}
		},
		computed: {

		},
		created() {

		},
		mounted() {},
		methods: {

		},
		filters: {

		}
	}
</script>
<style lang='scss' scoped>
	@import './scss/index.scss';
	.helpCenter {
		width: 100%;
		overflow: hidden;
		background: #f7f8fd;
	}
	
	.helpCenter .Center {
		width: 1200px;
		overflow: hidden;
		margin: 0 auto;
		background: white;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.helpCenter .Center>img {
		width: 100%;
	}
	
	.helpCenter .Center .mikl {
		width: 1100px;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.helpCenter .Center .mikl h2 i {
		display: block;
		float: left;
		width: 4px;
		height: 28px;
		background: rgba(57, 99, 208, 1);
		margin-right: 23px;
	}
	
	.helpCenter .Center .mikl h2 {
		font-size: 20px;
		font-family: MicrosoftYaHei-Bold;
		color: rgba(51, 51, 51, 1);
		line-height: 28px;
		margin-top: 30px;
	}
	.helpCenter .Center .mikl .content{
		width: 100%;
		overflow: hidden;
	}
	.helpCenter .Center .mikl .content a{
		width:120px;
		height:30px;
		border:1px solid rgba(57,99,208,1);
		border-radius:15px;
		display: block;
		float: left;
		text-align: center;
		line-height: 30px;
		font-size:14px;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(57,99,208,1);
		margin-left: 20px;
		margin-top: 10px;
		cursor: pointer;
	}
	.helpCenter .Center .mikl .content>img{
		width: 38px;
		height: 46px;
		float: left;
		margin-right: 20px;
	}
	.helpCenter .Center .mikl .content p{
		font-size:16px;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(102,102,102,1);
		line-height: 30px;
		margin: 20px 0px;
	}
	.helpCenter .Center .mikl .content h3{
		font-size:16px;
		font-family:MicrosoftYaHeiLight;
		color:#666;
		line-height: 30px;
		margin-bottom: 50px;
	}
	.helpCenter .Center .mikl .content ul{
		width: 100%;
		overflow: hidden;
		margin-top: 50px;
		margin-bottom: 40px;
	}
	.helpCenter .Center .mikl .content ul li{
		width: 260px;
		height: 90px;
		float: left;
		margin-right: 15px;
		margin-bottom: 15px;
	}
	.helpCenter .Center .mikl .content ul li img{
		width: 260px;
		height: 90px;
	}
</style>