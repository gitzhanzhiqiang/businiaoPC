<template>
    <div class="helpCenter">
       <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" v-if="!isShow">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
       </el-radio-group>

        <el-tabs :tab-position="tabPosition">
            <el-tab-pane :label="item.name" v-for="(item,index) in projectList" :key="index">
                <div v-if="item.children.length">
                    <div v-for="(itm,index) in item.children" :key="index" >
                        <div>{{itm.name}}</div>
                        <el-collapse v-for="(item,index) in itm.data" :key="index" v-model="activeNames" @change="handleChangeNew">
                            <el-collapse-item :title="item.sort" :name="index">
                                <div>{{item.quest}}</div>
                                <div>{{item.answer}}</div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <div v-else>
                    <div>{{item.name}}</div>
                    <el-collapse v-for="(itm,index) in item.data" :key="index" v-model="activeNames" @change="handleChangeNew">
                        <el-collapse-item :title="itm.sort" :name="index">
                            <div>{{itm.quest}}</div>
                            <div>{{itm.answer}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-tab-pane>
        </el-tabs> -->
        <div class="new-nav">
            <div class="help">
                帮助中心
            </div>
            <ul>
                <li v-for="(item,index) in leftData" :key="index" :class="{'actived': index===leftIndex}" @click="handleLeft(index)">
                    <div>{{item.name}}</div>
                </li>
            </ul>
	    </div>
        <div class="new-nav" style="width:778px;margin-left:59px;">
                <div v-if="rightData.children.length">
                    <div v-for="(itm,index) in rightData.children" :key="index" >
                        <div style="fon-size:20px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);">{{itm.name}}</div>
                        <el-collapse v-for="(item,index) in itm.data" :key="index" v-model="activeNames" @change="handleChangeNew">
                            <el-collapse-item :title="item.quest" :name="index">
                                <!-- <div>{{item.quest}}</div> -->
                                <div v-if="item.answer" v-html="item.answer"></div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <div v-else>
                    <div style="fon-size:20px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);">{{rightData.name}}</div>
                    <el-collapse v-for="(itm,index) in rightData.data" :key="index" v-model="activeNames" @change="handleChangeNew">
                        <el-collapse-item :title="itm.quest" :name="index">
                            <!-- <div>{{itm.quest}}</div> -->
                            <div  v-if="itm.answer" v-html="itm.answer"></div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
export default {
    components: {
    },
    data() {
        return {
           projectList: [],
           tabPosition: 'left',
           isShow: true,
           activeNames: '1',
           leftData:[
					// {
					// 	url:'/userinfo/infoshow/informationyi-a',
					// 	name:'公司概况'
					// },
					// {
					// 	url:'/userinfo/infoshow/informationer-a',
					// 	name:'组织结构'
					// },
					// {
					// 	url:'/userinfo/infoshow/informationsan-a',
					// 	name:'平台信息'
					// },
					// {
					// 	url:'/userinfo/infoshow/informationsi-a',
					// 	name:'风险保障'
					// },
					// {
					// 	url:'/userinfo/infoshow/informationwu-a',
					// 	name:'法律法规'
					// },
					// {
					// 	url:'/userinfo/infoshow/informationliu-a',
					// 	name:'重大事项'
					// }
            ],
            leftIndex:0,
            activefouse: null,
            rightData:[]
        }
    },
    computed: {

    },
    created() {
        this.getProject();
       
        console.log(this.projectList);
    },
    mounted() {
    },
    methods: {
        handleLeft(index){
            this.leftIndex=index;
            this.rightData = this.projectList[index];
            console.log(this.rightData);
        },
        getProject() {
            ajax({
                url: 'helper/findHelperCenter/1',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.projectList = response.data.children;
                        this.rightData = this.projectList[this.leftIndex];
                        this.projectList.forEach((item)=>{
                            let obj={
                                name:''
                            }
                            obj.name=item.name;
                            this.leftData.push(obj);
                        })
                        
                    } else {
                        console.log(response.message)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
                this.rightData = this.projectList[this.leftIndex];
        },
        handleChangeNew() {

        }
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
.helpCenter{
    width: 1200px;
    height: 902px;
    margin: 24px auto;

    .new-nav {
		width: 280px;
        min-height: 50px;
        float:left;
        .help{
            width: 264px;
            height: 88px;
            line-height: 88px;
            text-align: center;
            border-right:1px solid rgba(204,204,204,1);
            font-size:28px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:60px;
        }
	}
	
	.new-nav ul {
		width: 100%;
        min-height: 50px;
        &>li{
            border-left:4px solid #fff;
            font-size:20px;
            font-family:MicrosoftYaHeiLight;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        .actived{
            background: #fff;
            border-left:4px solid #3963D0;
            border-top:1px solid rgba(204,204,204,1);
            border-bottom: 1px solid rgba(204,204,204,1);
            border-right: none;
        }
	}
	
	.new-nav ul li {
        
		color: #666;
		cursor: pointer;
		font-size: 18px;
		width: 260px;
		height: 49px;
		margin-left: 0px;
		background: #fff;
		text-align: center;
		line-height: 49px;
		position: relative;
        background:rgba(255,255,255,1);
        border-right:1px solid rgba(204,204,204,1);
	}
	
	.new-nav ul li a:hover {
		background: #fff;
		border-left: 3px solid #50b1f2;
	}
	.new-nav ul li .router-link-active{
        background: #fff;
        border-left:4px solid rgba(57,99,208,1);
		border-top:1px solid rgba(204,204,204,1);
        border-bottom: 1px solid rgba(204,204,204,1);
       
	}
	
	.new-nav ul li a {
		color: #666;
		width: 260px;
		height: 49px;
		display:block;
		border-left: 3px solid #ddd;
	}
	
	li.activefouse {
		color: #fc6670;
	}
}
</style>


