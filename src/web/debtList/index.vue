<template>
  <div style="width:100%;">
    <div class="banner" style="background: #f7f8fd;padding-top: 20px;">
    </div>
    <div class="datalist-layer">
      <div class="datalist">
        <div class="datalist-top">
        	<div class="rightsearch">
            <div class="search bar7" style="position: relative;">
              <form>
                <input type="text" v-model="favorites" v-on:input="getPlatform()" placeholder="输入平台名称可直接搜索哟~">
                <div class='button' @click="pfNameList = [];getApplyList();">
                	<img src="./img/fang.png"/>
                </div>
              </form>
            </div>
            <ul v-if="pfNameList" style="background-color: #fff;color: #666666;position: absolute;z-index: 999;width: 660px;">
              <div v-for="(item,index) in pfNameList" :key="index">
                <li style="height:30px;line-height:30px;cursor:pointer;" @click="seach(item)">{{item}}</li>
              </div>
            </ul>
            <!-- <div class="rightsearch-layer" style="position:relative;">
                <img class="fl  " src="./img/search.png" alt="" @click="getApplyList()">
                <input class="rightsearch-input" placeholder="输入平台名称可直接搜索哟~" type="text" v-model="optionParams.favorites" v-on:input="getPlatform()">
                <img class="fr rightsearch-layerR-img" src="./img/search-clear.png" alt="" @click="optionParams.favorites = '';pfNameList = [];">
                <ul v-if="pfNameList" style="position: absolute;left:0px;top:36px;width:220px;z-index:9900;background-color: transparent;">
                  <li style="height:30px;line-height:30px;cursor:pointer;" v-for="(item,index) in pfNameList" :key="index" @click="seach(item)">{{item}}</li>
                </ul>
                
              </div> -->
          </div>
          <div class="debtdataStatus">
            <span>债权类型：</span>
            <ul class="debtdataStatus-list">
              <li v-for="i in debtdataStatus" v-text="i.name" @click="checkdebt(i.key,0)" :class="{active:params.activestatus==i.key}"></li>
            </ul>
          </div>
          <div class="debtdataType">
            <span>债权状态：</span>
            <ul class="debtdataType-list">
              <li v-for="i in debtdataType" v-text="i.name" @click="checkdebt(i.key,1)" :class="{active:params.activetype==i.key}"></li>
            </ul>
          </div>
          <div class="debtdataTypea">
            <span>平台类型：</span>
            <ul class="debtdataTypea-list">
              <li v-for="i in debtdataTypea" v-text="i.name" @click="checkdebt(i.key,2)" :class="{active:params.isSafe==i.key}"></li>
            </ul>
          </div>
        </div>
        <div class="debtdataBottom">
            <ul class="debtdataBottom-list">
              <!-- <li v-for="i in debtdataBottom" @click="checkdebt(i.key,2)" :class="{activeBottom:params.activetype==i.key}">
                      <span>{{i.name}}</span>
                    </li> -->
              <!-- 转让金额 -->
              <li v-if="optionParams.amountSort === 0" @click="optionParams.amountSort = 2;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让金额
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
              </li>
              <li v-if="optionParams.amountSort === 1" @click="optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让金额
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 1">
              </li>
              <li v-if="optionParams.amountSort === 2" @click="optionParams.amountSort = 1;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让金额
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 1">
              </li>
              <!-- 折扣金额 -->
              <li v-if="optionParams.discountAmountSort === 0" @click="optionParams.discountAmountSort = 2;optionParams.amountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">折扣金额
                <img src="./img/shan.png" v-if="optionParams.discountAmountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountAmountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountAmountSort === 2">
              </li>
              <li  v-if="optionParams.discountAmountSort === 1" @click="optionParams.discountAmountSort = 0;optionParams.amountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">折扣金额
                <img src="./img/shan.png" v-if="optionParams.discountAmountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountAmountSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.discountAmountSort === 1">
              </li>
              <li v-if="optionParams.discountAmountSort === 2" @click="optionParams.discountAmountSort = 1;optionParams.amountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">折扣金额
                <img src="./img/shan.png" v-if="optionParams.discountAmountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountAmountSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.discountAmountSort === 1">
              </li>
              <!-- 转让折扣 -->
              <li  v-if="optionParams.discountRateSort === 0" @click="optionParams.discountRateSort = 2;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让折扣
                <img src="./img/shan.png" v-if="optionParams.discountRateSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountRateSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountRateSort === 2">
              </li>
              <li  v-if="optionParams.discountRateSort === 1" @click="optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让折扣
                <img src="./img/shan.png" v-if="optionParams.discountRateSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountRateSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.discountRateSort === 1">
              </li>
              <li  v-if="optionParams.discountRateSort === 2" @click="optionParams.discountRateSort = 1;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.surplusPeriodSort = 0;getApplyList();">转让折扣
                <img src="./img/shan.png" v-if="optionParams.discountRateSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountRateSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.discountRateSort === 1">
              </li>
              <!-- 剩余期限 -->
              <li v-if="optionParams.surplusPeriodSort === 0" @click="optionParams.surplusPeriodSort = 2;optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;getApplyList();">剩余期限
                <img src="./img/shan.png" v-if="optionParams.surplusPeriodSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.surplusPeriodSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.surplusPeriodSort === 2">
              </li>
              <li v-if="optionParams.surplusPeriodSort === 1" @click="optionParams.surplusPeriodSort = 0;optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;getApplyList();">剩余期限
                <img src="./img/shan.png" v-if="optionParams.surplusPeriodSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.surplusPeriodSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.surplusPeriodSort === 1">
              </li>
              <li  v-if="optionParams.surplusPeriodSort === 2" @click="optionParams.surplusPeriodSort = 1;optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;getApplyList();">剩余期限
                <img src="./img/shan.png" v-if="optionParams.surplusPeriodSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.surplusPeriodSort === 2">
                <img src="./img/xiab.png" v-if="optionParams.surplusPeriodSort === 1">
              </li>
            </ul>
          </div>
        <ul class="datalist-specific" v-if="allData.length" style="min-height:100px;">
          <li v-for="(item,index) in allData" :key="index">
            <div class="datalist-specificL">
              <img v-if="!item.logoAppUrl" style="cursor: pointer;" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" src="~@/assets/images/moren.png" width="125" height="86" />
              <img v-if="item.logoAppUrl" style="cursor: pointer;" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" :src="item.logoAppUrl" alt="" width="125" height="86">
            </div>
            <div class="datalist-specificR">
              <div class="datalist-specificR-top">
                <div class="datalist-specificR-topL">
                  <div class="pfName">{{item.pfName}}</div>
                  <div class="discount_zui" :style="leftBackground" v-for='(itmc,index) in item.labels' v-if="index < 3">{{itmc.name}}</div>
<!--                  <div class="discount-text">担保</div>--> 
                 <div class="prepay-text" v-if="item.prepayFlag">预付</div>
                  <div class="orient-text" v-if="item.orientFlag">定向</div>
                  
	                <div class="discount-text" v-if="item.repayStatus == 1" style="border:1px solid rgba(72,118,165,1);color: rgba(72,118,165,1);">正常</div>
									<div class="discount-text" v-if="item.repayStatus == 2" style="border:1px solid rgba(72,118,165,1);color: rgba(72,118,165,1);">逾期</div>
									<div class="discount-text" v-if="item.bdType == 1" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">信贷</div>
									<div class="discount-text" v-if="item.bdType == 2" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">企贷</div>
									<div class="discount-text" v-if="item.bdType == 3" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">房贷</div>
									<div class="discount-text" v-if="item.bdType == 4" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">车贷</div>
									<div class="discount-text" v-if="item.bdType == 5" style="border:1px solid rgba(255,114,0,1);color: rgba(255,114,0,1);">自投</div>
                </div>
                <div class="datalist-specificR-topR">
                	<div class="link-text" @click="$router.push({path:'/detaila',query:{id:item.pfName }})" style="color:#666666;">
	                    <div><img src="~@/assets/images/shuben.png" alt=""></div>
	                    <div>平台档案</div>
	                  </div>
                  <div class="link-text" @click="goUrl(item.link)" style="color:#666666;">
                    <div><img src="~@/assets/images/link.png" alt=""></div>
                    <div>预览链接</div>
                  </div>
                  <div class="Rdiscount-text" @click="tendencyId = item.id;getTendency(item.pfName)">
                    <div><img src="~@/assets/images/discount.png" alt=""></div>
                    <div>折扣趋势</div>
                  </div>
                </div>
              </div>
              <div class="datalist-specificR-context">
                <div class="datalist-specificR-context-item">
                  <i style="color:rgba(51,51,51,1);font-size: 16px">{{item.amount | formatMoney}}</i>元<br>转让金额
                </div>
                <div class="datalist-specificR-context-item">
                  <i style="color: #FF0000;font-size: 16px">{{item.discountRate | formatMoney}}</i>折 <br>转让折扣
                </div>
                <div class="datalist-specificR-context-item">
                  <i style="color: #FF0000">{{item.discountAmount | formatMoney}}</i>元 <br>折扣金额
                </div>
                <div class="datalist-specificR-context-item">
                  <span>
                    <i style="color:rgba(51,51,51,1);">{{item.annualRate | formatMoney}}%</i><br>历史年化
                  </span>
                </div>
                <div class="datalist-specificR-context-item">
                  <i>{{item.surplusPeriodLeftDay}}</i>天 <br>剩余期限
                </div>
                <div class="datalist-specificR-context-item">
                  <div class="checkdetail" v-if="item.status === 0" @click="$router.push({path:'/debtList/detail',query:{id:item.id }})">查看详情</div>
                  <div class="checkdetail" style="background:rgba(107,115,136,1);" v-if="item.status === 1||item.status === 3||item.status === 5||item.status === 11||item.status === 12||item.status === 13||item.status === 14||item.status === 16||item.status === 20||item.status === 30" @click="$router.push({path:'/debtList/detail',query:{id:item.id}})">锁定中</div>
                  <div class="checkdetail" style="background:rgba(204,204,204,1);" v-if="item.status === 2 ||item.status === 15 ||item.status === 22 ||item.status === 31" @click="$router.push({path:'/debtList/detail',query:{id:item.id}})">已转让</div>
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
	    debtdataTypea: [{ name: '全部', key: '' }, { name: '正常', key: '1' }, { name: '问题', key: '2' },],
      debtdataType: [{ name: '全部', key: '' }, { name: '可承接', key: '1' }, { name: '锁定中', key: '2' }, { name: '已转让', key: '3' },],
      debtdataStatus: [{ name: '全部', key: '' }, { name: '预付', key: '1' }, { name: '定向', key: '2' }, { name: '担保', key: '3' },],
      debtdataBottom: [{ name: '转让金额', key: '' }, { name: '转让折扣', key: '1' }, { name: '折扣金额', key: '2' }, { name: '剩余期限', key: '3' },],
      params: {
        activetype: '',//债权转让类型
        activestatus: '',//债权转让状态
        isSafe:'',
      },
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
        isAssure: 0,
        isOrient: 0,
        isPrepay: 0,
        isSafe:0,
        status: []
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
    this.checkdebt('1', 1);
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
    //返回列表
    returnData() {
      this.favorites = '';
      this.optionParams = {
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
        isAssure: 0,
        isOrient: 0,
        isPrepay: 0,
        status: []
      }
      this.getApplyList();
    },
    //债转列表
    getApplyList() {
      if (this.favorites) {
        this.optionParams.favorites = [this.favorites];
      } else {
        this.optionParams.favorites = [];
      }
      ajax({
        url: 'orderTransfer/debtList',
        optionParams: this.optionParams
      }).post()
        .then(response => {
          this.optionParams.favorites = '';
          if (response.code === 200) {
            this.allData = response.data.TOrderTransfers ? response.data.TOrderTransfers : [];
            this.total = response.data.TotalCount;
          } else {
            this.allData = [];
            this.total = 0;
          }

        })
        .catch(error => {
          console.log(error)
        })
    },
    //模糊查询选中
    seach(val) {
      this.favorites = val;

      this.pfNameList = [];
      this.getApplyList();
    },
    checkdebt(key, type) {
      if (type == 0) {
        this.params.activestatus = key;
        if (key === '') {
          this.optionParams.isAssure = 0;
          this.optionParams.isOrient = 0;
          this.optionParams.isPrepay = 0;
        } else if (key === '1') {
          this.optionParams.isAssure = 0;
          this.optionParams.isOrient = 0;
          this.optionParams.isPrepay = 1;
        } else if (key === '2') {
          this.optionParams.isAssure = 0;
          this.optionParams.isOrient = 1;
          this.optionParams.isPrepay = 0;
        } else if (key === '3') {
          this.optionParams.isAssure = 1;
          this.optionParams.isOrient = 0;
          this.optionParams.isPrepay = 0;
        } else {

        }
        this.getApplyList();
      } else if (type == 1) {
        this.params.activetype = key;
        if (key === '') {
          this.optionParams.status = [];
        } else if (key === '1') {
          this.optionParams.status = [0];
        } else if (key === '2') {
          this.optionParams.status = [1];
        } else if (key === '3') {
          this.optionParams.status = [2];
        }
        // this.optionParams.orderByField = status;
        this.getApplyList();

      } else if (type == 2) {
        this.params.isSafe = key;
        if (key === '') {
          this.optionParams.isSafe = 0;
        } else if (key === '1') {
          this.optionParams.isSafe = 1;
        } else if (key === '2') {
          this.optionParams.isSafe = 2;
        } 
        // this.optionParams.orderByField = status;
        this.getApplyList();

      } else {

      }
    },

    //m模糊查询平台列表
    getPlatform() {
      if (this.favorites) {
        ajax({
          url: "orderTransfer/findPfNames",
          optionParams: {
            name: this.favorites
          }
        }).post()
          .then(res => {
            if (res.code === 200) {
              this.pfNameList = res.data;
            } else {
              this.pfNameList = [];
            }
          })
          .catch(error => {
            console.log(error)
          })
      }

    },
    //
    changeCount() {
      this.pfNameList = [];
    },
    // 改变每一页的条数
    handleSizeChange(val) {
      this.optionParams.limit = val;
      this.optionParams.page = 1; //从第一页开始
      this.getApplyList();
    },
    // 切换页码
    handleCurrentPageChange(val) {
      this.optionParams.page = val;
      this.getApplyList();
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
    //金钱过滤
    formatMoney(val) {
      return val.toFixed(2);
    }
  }
}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';

/*搜索框7*/
</style>


