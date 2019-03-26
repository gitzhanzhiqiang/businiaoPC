<template>
    <div :id="id" class="echarts"></div>
</template>

<script>
   	import echarts from 'echarts'
    import ajax from '@utils/config';
    export default {
			data(){
					return {
							myChart:null,
							xList:[],
							yList:[],
							// tendencyData: []
					}
			},
			mounted(){
					this.myChart = echarts.init(document.getElementById(this.id));
					// this.getList();
					this.myChart.setOption(this.readyBarOption());
			},
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        name: 'tendency',
        props: {
            //弹框id
            // name: {
            //     type: String,//Boolean Array Object
            //     default: function() {
            //         return ''
            //     }
			// },
			id: {
                type: String,//Boolean Array Object
                default: function() {
                    return ''
                }
			},
			tendencyData: {
                type: Array,//Boolean Array Object
                default: function() {
                    return []
                }
			},
		},
		created() {
			// this.readyBarOption();
			this.getList();
		},
        methods: {
			//趋势曲线PC
			getTendency() {
				ajax({
					url: "orderTransfer/discountRates",
					optionParams: {
						name: this.name
					}
				}).post()
					.then(res => {
					if (res.code === 200) {
						this.tendencyData = res.data;
						this.tendencyData.forEach((item)=>{
							this.xList.push(item.createTime);
							this.yList.push(item.discountRate);
						})
						this.myChart.setOption(this.readyBarOption());
					} else {
					}
					})
					.catch(error => {
					console.log(error)
					})
			},
			getList() {
				this.xList = [];
				this.yList = [];
				this.tendencyData.forEach((item)=>{
					this.xList.push(item.createTime);
					this.yList.push(item.discountRate);
                })
                this.myChart.setOption(this.readyBarOption());
			},
            readyBarOption(){
				// this.xList = [];
				// this.yList = [];
				// this.tendencyData.forEach((item)=>{
				// 	this.xList.push(item.createTime);
				// 	this.yList.push(item.discountRate);
                // })
				let data = {
					// tooltip : {
					// 	trigger: 'axis',
					// 	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					// 		type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
					// 	}
					// },
					// legend: {
					// 	data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度']
					// },
					// grid: {
					// 	left: '3%',
					// 	right: '4%',
					// 	bottom: '3%',
					// 	containLabel: true
					// },
					xAxis : [
					{
						type : 'category',
						// data : ['周一','周二','周三','周四','周五','周六','周日']
						data: this.xList
					}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series:{
						// name: '折扣',
						data:this.yList,
						type : 'line',
						smooth: true
					},
					// series : [

					// 	{
					// 		name:'直接访问',
					// 		type:'bar',
					// 		data:[320, 332, 301, 334, 390, 330, 320]
					// 	},
					// 	{
					// 		name:'邮件营销',
					// 		type:'bar',
					// 		stack: '广告',
					// 		data:[120, 132, 101, 134, 90, 230, 210]
					// 	},
					// 	{
					// 		name:'联盟广告',
					// 		type:'bar',
					// 		stack: '广告',
					// 		data:[220, 182, 191, 234, 290, 330, 310]
					// 	},
					// 	{
					// 		name:'视频广告',
					// 		type:'bar',
					// 		stack: '广告',
					// 		data:[150, 232, 201, 154, 190, 330, 410]
					// 	},
					// 	{
					// 		name:'搜索引擎',
					// 		type:'bar',
					// 		data:[862, 1018, 964, 1026, 1679, 1600, 1570],
					// 		markLine : {
					// 			lineStyle: {
					// 				normal: {
					// 					type: 'dashed'
					// 				}
					// 			},
					// 			data : [
					// 				[{type : 'min'}, {type : 'max'}]
					// 			]
					// 		}
					// 	},
					// 	{
					// 		name:'百度',
					// 		type:'bar',
					// 		barWidth : 5,
					// 		stack: '搜索引擎',
					// 		data:[620, 732, 701, 734, 1090, 1130, 1120]
					// 	}
					// ]
				}
				return data;
				  
			},
        },
        watch: {
			// tendencyData:(v)=>{
			// 	// this.getList(v);
			// 	this.readyBarOption();
			// },
			id:(v)=>{
				// console.log(1111111111);
				// this.getList();
				//this.readyBarOption(v);
			},
            tendencyData:function(v){
				this.getList(v);
                // this.readyBarOption(v);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .echarts {
		width:100%;
		height:400px;
    }
</style>
