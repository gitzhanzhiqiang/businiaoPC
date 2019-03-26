<template>
  <div style="width:100%;">
    <div class="banner" style="background: #f7f8fd;padding-top: 20px;">
    </div>
    <div class="datalist-layer">
      <div class="datalist">
      	<div class="remen">热门平台</div>
        <ul class="datalist-specific" v-if="allData.length" style="min-height:100px;">
          <li v-for="(item,index) in allData" :key="index">
            <div class="datalist-specificL">
              <img v-if="!item.logo" src="~@/assets/images/moren.png" width="125" height="86" />
              <img v-if="item.logo" :src="item.logo" alt="" width="125" height="86">
            </div>
            <div class="datalist-specificR">
              <div class="datalist-specificR-top">
                <div class="datalist-specificR-topL">
                  <div class="pfName">{{item.pfName}}</div>
                  <div class="discount_zui" :style="leftBackground" v-for='(itmc,index) in item.labels' v-if="index < 3">{{itmc.name}}</div>
                </div>
                <div class="datalist-specificR-topR">
                  <!--<div class="link-text" @click="goUrl(item.link)" style="color:#666666;">
                    <div><img src="~@/assets/images/link.png" alt=""></div>
                    <div>预览链接</div>
                  </div>-->
                  <div class="Rdiscount-text" @click="tendencyId = item.pfId;getTendency(item.pfName)">
                    <div><img src="~@/assets/images/discount.png" alt=""></div>
                    <div>折扣趋势</div>
                  </div>
                </div>
              </div>
              <div class="datalist-specificR-context">
                <div class="datalist-specificR-context-item">
                  <i style="color:rgba(51,51,51,1);font-size: 16px">发布 {{item.totalCountRelease}} 笔</i> 
                </div>
                <div class="datalist-specificR-context-item">
                  <i style="color: rgba(51,51,51,1);font-size: 16px">承接 {{item.totalCountHold}} 笔</i> 
                </div>
                <div class="datalist-specificR-context-item">
                  <div class="checkdetail" @click="$router.push({path:'/detaila',query:{id:item.pfName }})">查看详情</div>
                  
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 暂无数据 -->
        <div class="dataList" v-if="!allData.length">
          <div class="blank"></div>
          <div class="img">
            <img src="~@/assets/images/nodata1.png" alt="">
          </div>
          <div class="nodataTitle">
            暂无转让债权
          </div>
          <div class="return" @click="returnData()">
            返回列表
          </div>
        </div>
        <!-- 分页 -->
        <div v-if="total" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30,50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div style="height: 1px;width:100%"></div>
      </div>
    </div>
    <!-- 折扣趋势 -->
    <el-dialog title="折扣趋势" :visible.sync="isShow" width="80%" :show-close="true">
      <tendency :id="tendencyId" :tendencyData="tendencyData"></tendency>
    </el-dialog>
    <!-- <div class="height540"> </div>
          <div style="width: 100%; height: 270px;"></div> -->
  </div>
</template>
<script>
import ajax from '@utils/config';
import tendency from '@/components/tendency1.vue';
export default {
  components: {
    tendency
  },
  data() {
    return {
    	leftBackground: {
	        background: 'url(' + require("./img/oodd.png") + ') no-repeat',
	        'background-size': '100% 100%',
	    },
	    leftBackgrounda: {
	        background: 'url(' + require("./img/oowl.png") + ') no-repeat',
	        'background-size': '100% 100%',
	    },
	   
      optionParams: {
        limit: 10,
        page: 1,
      },
      favorites:'',//模糊搜索平台
      allData: [],
      total: 0,
      tendencyData: [],
      tendencyId: '',
      isShow: false,
      pfNameList: [],
    }
  },
  computed: {
  },
  created() {
  	this.getProjecta()
    // this.getApplyList();
  },
  mounted() {
  },
  methods: {
    //趋势曲线PC
    getTendency(val) {
      ajax({
        url: "orderTransfer/discountRates",
        optionParams: {
          name: val
        }
      }).post()
        .then(res => {
          if (res.code === 200) {
            this.tendencyData = res.data;
            this.isShow = true;
          } else {
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
   
     //热门平台
    getProjecta() {
      ajax({
        url: 'platform/hot_list',
        optionParams: this.optionParams
      }).post()
        .then(response => {
          if (response.code === 200) {
            this.allData = response.data.records ? response.data.records : [];
            this.total = response.data.total
          } else {
            this.allData = [];
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
      this.getProjecta();
    },
    // 切换页码
    handleCurrentPageChange(val) {
      this.optionParams.page = val;
      this.getProjecta();
    },
    goUrl(val) {
      window.open(val);
			// console.log(11111);
			// var reg = /http:\/\/\w*(\.\w*)+/ig;
			// if(!reg.test(val)){
			// 	this.$message.error('平台债权链接地址有误');
			// }
			// else{
			// 	window.open(val);
			// }
    },
  },
  filters: {
   
  }
}
</script>
<style lang='scss' scoped>
@import './scss/indexa.scss';

/*搜索框7*/
</style>


