<template>
	<div class="beijing">
		<div class="fei"></div>
		<div class="guanyu">

			<div class="guanzhu-div">
				<!-- <h3>不死鸟</h3>
				<p class="guanzhu-p">黑尘科技(杭州)有限公司成立于2018年01月25日，是目前国内发展最快的互联网金融信息服务提供商。公司以金融科技服务业务为核心，坚持以科技手段为小微企业及个人提供平等、透明、高效的金融担保交易服务。</p>
				<p class="guanzhu-p">不死鸟债权转让担保交易平台是黑尘科技旗下专注服务于P2P债权担保交易的第三方互联网金融服务平台，于2018年9月18日上线。不死鸟旨在创造透明、高效、可信赖的金融资产交易环境，平台采用数字化生物信息身份核验、在线电子签章、区块链分布式账本等技术 ，以满足用户未来多样化的金融资产配置需求，用极致的服务体验为目标，提供日趋完善的交易解决方案。</p>
				<p class="guanzhu-p">不死鸟将秉承独立第三方、可信赖无篡改、安全交易保证的服务承诺，竭力为您提供安全便捷的资产优化服务。</p>
				<img src="~@/assets/images/guanyu-banner.jpg" class="guanzhu-banner" />
				<div class="guanzhu-wenan">
					<h4>联系我们</h4>
					<ul>
						<li>
							<p>公司名称<span style="padding-right: 6px;"></span>：</p >
							黑尘科技（杭州）有限公司
						</li>
						<li>
							<p>客服热线<span style="padding-right: 6px;"></span>：</p >
							15336891617
						</li>
						<li>
							<p>客服QQ群：</p >
							938999594
						</li>
						<li>
							<p>服务时间<span style="padding-right: 6px;"></span>：</p >
							周一至周五 &nbsp; 9:00 - 18:00
						</li>
					</ul>
				</div> -->

				<!-- 头部导航和标题 -->
				<div class="datatitle-header">
					<ul class="datatitle-list">
						<li v-for="(i,key) in datanav" v-text="i.name" :key="key" @click="checkabout(i.key,0)" :class="{active:activestatus==i.key}"></li>
					</ul>
					<div class="datatitle-title"  v-if="exist==false">
						<img :src="titleimg" alt="">
					</div>
				</div>
				<!-- 正文 -->
				<div class="content">
					<!-- 正文名称 -->
					<div class="content-title"  v-if="exist==false">
						<span class="line"></span>
						<h3>{{title}}</h3>
					</div>
					<!-- 公司介绍 -->
					<div v-if="datanav[0].isShow == true" class="introduction">
						<p class="info">黑尘科技(杭州)有限公司成立于2018年01月25日，是一家专注于互联网/移动互联网/电子商务行业的科技企业。</p>
						<p class="info">公司以“专注，用心，服务”为核心价值，致力于通过科技创新，搭建一个安全高效的第三方债转服务担保平台，为用户提供优质的债转担保服务。同时还建立了完善的服务体系，为中途遇到的问题和困难提供指导帮助。我们相信，通过我们的不断努力和追求，一定能够实现互利共赢。</p>
						<p class="info">团队中有超过十年创业经验的连续创业者、来自全球顶级FinTech公司的技术专家、互联网和移动互联网领域的技术高手和经验丰富的客户服务专家。</p>
						<!-- 三个小图标 -->
						<ul class="small_icon">
							<li>
								<span><img src="./img/first.png" alt=""></span>
								<p>创新科技</p>
							</li>
							<li>
								<span><img src="./img/second.png" alt=""></span>
								<p>完善体系</p>
							</li>
							<li>
								<span><img src="./img/third.png" alt=""></span>
								<p>顶级技术专家</p>
							</li>
						</ul>
						<div class="content-title">
							<span class="line"></span>
							<h3>发展历程</h3>
						</div>
						<div class="development">
							<img src="./img/rocket.png" alt="">
							<ol class="datatitle-list">
								<li v-for="(i,index) in development"  :key="index">
									<span class="line2"></span>
									<h6>{{i.time}}</h6>
									<p>{{i.content}}</p>
								</li>
							</ol>
							<span class="line2"></span>
						</div>
					</div>
					<!-- 公司动态 -->
					<div v-if="datanav[1].isShow == true" class="motion">
						<ul>
							<li v-for="(i,k) in records" :key="k"  @click="getarticle(i.id,0)">
								<h4>{{i.title}}</h4>
								<span class="right">></span>
								<span>{{i.modifiedTime}}</span>
							</li>
						</ul>
					</div>
					<!-- 媒体报道 -->
					<div v-if="datanav[2].isShow == true" class="reports">
						<ul>
							<li v-for="(i,k) in records" :key="k"  @click="getarticle(i.id,0)">
								<h4>{{i.title}}</h4>
								<span class="right">></span>
								<span>{{i.modifiedTime}}</span>
							</li>
						</ul>
					</div>
					<!-- 管理团队 -->
					<div v-if="datanav[3].isShow == true" class="team">
						<ul>
							<li v-for="(item,key) in team" :key="key">
								<img :src="item.icon" alt="">
								<h3>{{item.name}}<small>{{item.position}}</small></h3>
								<ol>
									<li v-for="(i,intro) in item.introduction" :key="intro">{{i.experience}}</li>
								</ol>
							</li>
						</ul>
					</div>
					<!-- 网站公告 -->
					<div v-if="datanav[4].isShow == true" class="announcement">
						<ul>
							<li v-for="(i,k) in records" :key="k"  @click="getarticle(i.id,0)">
								<h4>{{i.title}}</h4>
								<span class="right">></span>
								<span>{{i.modifiedTime}}</span>
							</li>
						</ul>
					</div>
					<!-- 联系我们 -->
					<div v-if="datanav[5].isShow == true" class="contact">
						<ul>
							<li v-for="(item,index) in contact" :key="index">
								<img :src="item.icon" alt="">
								<h5>{{item.keynote}}</h5>
								<pre v-html="item.note"></pre>
							</li>
						</ul>	
						<b id="allmap" ref="allmap" class="map">
						</b>
					</div>
					<!-- 平台荣誉 -->
					<!-- <div v-if="datanav[6].isShow == true" class="honor"></div> -->
					<!-- 文章详情 -->
					<div v-if="exist==true" class="article">
						<h4>{{article.title}}<small>{{article.modifiedTime}}</small></h4>
						<div v-html="article.content" class="article_content"></div>
					</div>
				</div>
			</div>
		</div>
			<!-- 分页 -->
			<div v-if="total" class="pagination-container">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30,50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<!-- 文章切换 -->
			<div v-if="exist==true" class="article_button">
				<input type="button" value="上一篇" id="previous" @click.prevent="getarticle(article.id,1)" :disabled="perdisable==true">
				<input type="button" value="下一篇" id="next" @click.prevent="getarticle(article.id,2)" :disabled="nextdisable==true">
			</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	export default {
		components: {},
		data() {
			return {
				datanav:[
					{name:'公司介绍',key:'0',isShow:false,img:require("@/assets/images/bg.png")},
					{name:'公司动态',key:'1',isShow:false,img:require("@/assets/images/bg2.png")},
					{name:'媒体报道',key:'2',isShow:false,img:require("@/assets/images/bg3.png")},
					{name:'管理团队',key:'3',isShow:false,img:require("@/assets/images/bg4.png")},
					{name:'网站公告',key:'4',isShow:false,img:require("@/assets/images/bg5.png")},
					{name:'联系我们',key:'5',isShow:false,img:require("@/assets/images/bg6.png")},
					// {name:'平台荣誉',key:'6',isShow:false,img:require("@/assets/images/bg.png")}
				],//导航数据
				navnumber:'',//type类型
				activestatus:'',//选中的导航状态
				titleimg:'',//标题背景
				title:'',//标题
				development:[
					{time:'未来正在起航',content:''},
					{time:'2018.11.23',content:'H5页面正式上线，社群、微信公众号、第三方媒体合作的推进全面开始'},
					{time:'2018.11.02',content:'不死鸟安卓及IOS版本全面上线'},
					{time:'2018.01.05',content:'黑尘科技成立'}
				],//发展历程
				records:[],//文章列表
     			total: 0,//文章数量
				optionParams: {
					favorites: [],
					amountSort: 0,
					dateFrom: "",
					dateTo: "",
					discountAmountSort: 0,
					discountRateSort: 0,
					surplusPeriodSort: 0,
					isAsc: false,
					limit: 10,
					page: 1,
					status: []
				},
				team:[
					{
						icon:require("@/assets/images/people1.png"),
						name:'孙震',
						position:'CEO',
						introduction:[
							{experience:'浙江大学 双学士'},
							{experience:'实习网（集团）产品总监'},
							{experience:'杭州新旦网络 Dropet联合创始人'},
							{experience:'杭州炬合网络 联合创始人'},
							{experience:'浙江省文化产业协会网络文化分会 秘书长'},
							{experience:'黑尘科技（杭州）创始人'}
						]
					},
					{
						icon:require("@/assets/images/people2.png"),
						name:'赵乐',
						position:'COO',
						introduction:[
							{experience:'浙江理工大学 学士'},
							{experience:'杭州五月雨信息技术 运营总监'},
							{experience:'杭州币吧科技 联合创始人'},
							{experience:'浙江华瑞信息资讯 分析师'}
						]
					},
					{
						icon:require("@/assets/images/people3.png"),
						name:'？',
						position:'CTO',
						introduction:[
							{experience:'杭州擎雷数字科技有限公司 运营经理'},
							{experience:'浙江大学控股集团有限公司 项目总监'},
							{experience:'网易杭州研究院 产品总监'}
						]
					},
					{
						icon:require("@/assets/images/people4.png"),
						name:'冯兆东',
						position:'CFO',
						introduction:[
							{experience:'中国人民大学 学士'},
							{experience:'北京国嘉瑞联合会计师事务所(普通合伙)审计项目经理'},
							{experience:'安信证券股份有限公司 投资银行项目经理'}
						]
					}
				],//管理团队
				contact:[
					{icon:require("@/assets/images/contact1.png"),
					keynote:'公司信息',
					note:'公司名称 | 黑尘科技（杭州）有限公司<br/>公司地址 | 浙江省杭州市余杭区仓前街道良睦<br/>路1399号8号楼244室'
					},
					{icon:require("@/assets/images/contact2.png"),
					keynote:'联系方式',
					note:'客服热线 | 400-600-0186<br/> 客服QQ | 2177430082<br/>  QQ群 | 938999594'
					},
					{icon:require("@/assets/images/contact3.png"),
					keynote:'服务时间',
					note:'周一至周五<br/>9:00-18:00'
					}
				],//联系我们
				exist:false,
				article:[],
				perdisable:'',//上一篇按钮disable属性
				nextdisable:'',//下一篇按钮disable属性
				mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
      			myMap: null
			}
		},
		computed: {},
		created() {
    		this.checkabout('0', 0);
		},
		mounted() {
			// this.map()
		},
		updated(){
			//为了防止点击其他导航都加载函数
			if(this.activestatus==5){
				this.map()
			}
		},
		methods: {
			//获取新闻条数
			getType(val) {
				ajax({
						url: 'content/list',
						optionParams:{
							type:val,
							limit: this.optionParams.limit,
							page: this.optionParams.page,
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							let data = response.data ? response.data : {};
							this.total = response.data.total;
							this.records = response.data.records;
						} else {
							console.log(response);
            				this.total = 0;
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			//头部导航的显示和隐藏
			checkabout(key, type) {
				this.exist = false;
				this.optionParams.page = 1;
				this.total = 0;
				this.datanav.map((item, index)=>{
					this.datanav[index].isShow=false;
					if(key==index){
						this.datanav[index].isShow = true;
					}
				});
				if (type == 0) {
					this.activestatus = key;
					this.title = this.datanav[key].name;
					this.titleimg = this.datanav[key].img;
				}
				if(key==1){
					this.getType(1);
					this.navnumber=1;
				}
				if(key==2){
					this.getType(2);
					this.navnumber=2;
				}
				if(key==4){
					this.getType(3);
					this.navnumber=3;
				}
			},
			//文章内容的显示及隐藏
			getarticle(val,type){
				var val1 = ''
				val1 = val
				this.exist = true;
				this.total=null;
				this.datanav.map((item, index)=>{
					this.datanav[index].isShow=false
				});
				this.perdisable=false;
				this.nextdisable=false;

				//点击上一篇判断
				if(type == 1){
					this.records.map((item, index)=>{
						if(val==this.records[index].id){
							val1=this.records[index-1].id;
						}	
					});			
				}

				//点击下一篇判断
				if(type == 2){
					// console.log(this.records)
					this.records.map((item, index)=>{
						if(val==this.records[index].id){
							 val1 = this.records[index+1].id;
							// console.log(this.records[index+1])

						}
					});
				}			
				//改变上一篇和下一篇按钮状态
				if(val1==this.records[0].id){
					this.perdisable=true;
				}
				let z = this.records.length-1;
				if(val1==this.records[z].id){
					this.nextdisable=true;
				}

				ajax({
						url: 'content/details',
						optionParams:{
							id:val1
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.article = response.data;
							this.exist = true;
						} else {
							console.log(response);
            				this.total = 0;
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			// 改变每一页的条数
			handleSizeChange(val) {
				this.optionParams.limit = val;
				this.optionParams.page = 1; //从第一页开始
				this.getType(this.navnumber);
			},
			// 切换页码
			handleCurrentPageChange(val) {
				this.optionParams.page = val;
				this.getType(this.navnumber);
			},
			//地图
			map(){  
				let map =new BMap.Map(this.$refs.allmap); // 创建Map实例  
				map.centerAndZoom(new BMap.Point(120.010274,30.298243), 17);  // 初始化地图,设置中心点坐标和地图级别 
				var point = new BMap.Point(120.010274,30.298243);
				var marker = new BMap.Marker(point);        // 创建标注    
				map.addOverlay(marker); 
				map.addControl(new BMap.MapTypeControl({//添加地图类型控件  
					mapTypes:[  
					BMAP_NORMAL_MAP,  
					BMAP_HYBRID_MAP  
					]}));  
				map.setCurrentCity("杭州");// 设置地图显示的城市 此项是必须设置的  
				map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放  
		        //map.setMapStyle({style:'midnight'});//地图风格
			}  
		},
		filters: {

		}
	}
</script>
<style lang='scss' scoped>
	@import './scss/index.scss';
	.beijing {
		background: #f7f8fd;
		padding-bottom: 20px;
	}
	
	.fei {
		width: 100%;
		height: 24px;
	}
	
	.guanyu {
		width: 1200px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(242, 242, 242, 1);
		box-shadow: 0px 11px 20px 0px rgba(86, 122, 215, 0.14);
		border-radius: 8px 8px 4px 8px;
		margin: 0 auto;
	}
	
	.guanzhu-div {
		// width: 885px;
		min-height: 194px;
		font-size: 14px;
		font-family: 'MicrosoftYaHei','微软雅黑';
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		line-height: 30px;
		margin: 0 auto;
	}

	
	// .guanzhu-div h3 {
	// 	font-size: 20px;
	// 	font-family: "MicrosoftYaHei-Bold";
	// 	font-weight: bold;
	// 	color: rgba(51, 51, 51, 1);
	// 	line-height: 30px;
	// 	text-align: center;
	// 	margin-top: 48px;
	// }
	
	// .guanzhu-p {
	// 	width: 100%;
	// 	font-size: 14px;
	// 	font-family: "MicrosoftYaHeiLight";
	// 	font-weight: 300;
	// 	color: rgba(51, 51, 51, 1);
	// 	line-height: 30px;
	// 	text-indent: 2em;
	// 	margin-top: 30px;
	// }
	
	// .guanzhu-banner {
	// 	width: 100%;
	// 	margin-top: 57px;
	// }
	
	// .guanzhu-wenan {
	// 	width: 350px;
	// 	min-height: 300px;
	// 	margin: 0 auto;
	// }
	
	// .guanzhu-wenan ul {
	// 	width: 100%;
	// }
	
	// .guanzhu-wenan ul li {
	// 	height: 50px;
	// 	line-height: 50px;
	// 	font-size: 16px;
	// 	font-family: "MicrosoftYaHei-Bold";
	// 	font-weight: bold;
	// 	color: rgba(51, 51, 51, 1);
	// 	line-height: 48px;
	// }
	
	// .guanzhu-wenan h4 {
	// 	width: 100%;
	// 	height: 50px;
	// 	font-size: 20px;
	// 	font-family: "MicrosoftYaHei-Bold";
	// 	font-weight: bold;
	// 	color: rgba(51, 51, 51, 1);
	// 	line-height: 50px;
	// 	text-align: center;
	// 	margin-top: 30px;
	// }
	
	// .guanzhu-wenan ul li p {
	// 	width: 120px;
	// 	height: 50px;
	// 	line-height: 50px;
	// 	float: left;
	// 	text-align: right;
	// 	font-size: 14px;
	// 	font-family: "MicrosoftYaHeiLight";
	// 	font-weight: 300;
	// 	color: rgba(51, 51, 51, 1);
	// }
</style>