<template>

	<div class="detail psspd">
		<div class="middle">
		</div>
		<div class="debtDetail">
			<div class="title">
				平台档案
			</div>
			<div class="middleCon">
				<div class="logo">
					<img v-if="detailData.logoAppUrl" :src="detailData.logoAppUrl" width="125" height="86" />
					<img v-if="!detailData.logoAppUrl" src="~@/assets/images/moren.png" width="125" height="86" />
				</div>
				<div class="thirdStatus">
					<div class="pfName">
						1
					</div>
					<div class="discount-text" :style="leftBackground" v-for='(itmc,index) in detailData.labels' v-if='index<3'>3</div>
					<div class="trendecya">
						<div class="link-text" @click="goUrl(detailData.link)" style="color:#666666;">
		                    <div style="float: left;">分享</div>
		                    <div style="float: right;"><img src="~@/assets/images/discount.png" alt=""></div>
		                  </div>
	                  <div class="Rdiscount-text" @click="getTendency(detailData.pfName)">
	                    <div style="margin-right: 10px;float: left;"><img src="~@/assets/images/discount.png" alt=""></div>
	                    <div>折扣趋势</div>
	                  </div>
	                  
					</div>
					
				</div>
				
				<div class="trendecy">
					<span>债转规则</span>
				</div>
			</div>
			<div class="amountItem">
				
				<div class="amountTop">
					
					<div class="amountLeft">
						<img src="~@/assets/images/backLeft.png" alt="">
					</div>
					<div class="mainCon">
						<div class="main">
						<div class="item">
							<div class="amount">6元</div>
							<div class="amounttitle">总发布数量</div>
						</div>
						<div class="item">
							<div class="amount">6折</div>
							<div class="amounttitle">总成交数量</div>
						</div>
						<div class="item">
							<div class="amount">6元</div>
							<div class="amounttitle">总转让金额</div>
						</div>
						<div class="item">
							<div class="amount">3%</div>
							<div class="amounttitle">平均转让折扣</div>
						</div>
						<!-- <div class="item">
							<div class="amount">
								<span v-if="detailData.repaymentType ==0">一次性还本付息</span>
								<span v-if="detailData.repaymentType ==1">先息后本</span>
								<span v-if="detailData.repaymentType ==2">等额本息</span>
								<span v-if="detailData.repaymentType ==3">等额本金</span>
							</div>
							<div class="amounttitle">
								还款方式

							</div>

						</div> -->
						
						</div>
					</div>
					
					<div class="amountLeft">
						<img src="~@/assets/images/backRight.png" alt="">
					</div>
				</div>
				
			</div>
		</div>
		<div class="debtdataBottom">
            <ul class="debtdataBottom-list">
              <!-- <li v-for="i in debtdataBottom" @click="checkdebt(i.key,2)" :class="{activeBottom:params.activetype==i.key}">
                      <span>{{i.name}}</span>
                    </li> -->
              <!-- 转让金额 -->
              <li v-if="optionParams.amountSort === 0" @click="optionParams.amountSort = 1;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">默认
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
              </li>
              <li v-if="optionParams.amountSort === 0" @click="optionParams.amountSort = 1;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">转让金额
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
              </li>
              <li v-if="optionParams.amountSort === 1" @click="optionParams.amountSort = 2;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">转让金额
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
              </li>
              <li v-if="optionParams.amountSort === 2" @click="optionParams.amountSort = 1;optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">转让金额
                <img src="./img/shan.png" v-if="optionParams.amountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.amountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.amountSort === 2">
              </li>
              <!-- 折扣金额 -->
              <li v-if="optionParams.discountAmountSort === 0" @click="optionParams.discountAmountSort = 1;optionParams.amountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">折扣金额
                <img src="./img/shan.png" v-if="optionParams.discountAmountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountAmountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountAmountSort === 2">
              </li>
              <li  v-if="optionParams.discountAmountSort === 1" @click="optionParams.discountAmountSort = 2;optionParams.amountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">折扣金额
                <img src="./img/shan.png" v-if="optionParams.discountAmountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountAmountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountAmountSort === 2">
              </li>
              <li v-if="optionParams.discountAmountSort === 2" @click="optionParams.discountAmountSort = 1;optionParams.amountSort = 0;optionParams.discountRateSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">折扣金额
                <img src="./img/shan.png" v-if="optionParams.discountAmountSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountAmountSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountAmountSort === 2">
              </li>
              <!-- 转让折扣 -->
              <li  v-if="optionParams.discountRateSort === 0" @click="optionParams.discountRateSort = 1;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">转让折扣
                <img src="./img/shan.png" v-if="optionParams.discountRateSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountRateSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountRateSort === 2">
              </li>
              <li  v-if="optionParams.discountRateSort === 1" @click="optionParams.discountRateSort = 2;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">转让折扣
                <img src="./img/shan.png" v-if="optionParams.discountRateSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountRateSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountRateSort === 2">
              </li>
              <li  v-if="optionParams.discountRateSort === 2" @click="optionParams.discountRateSort = 1;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;optionParams.surplusPeriodSort = 0;getApplyLista();">转让折扣
                <img src="./img/shan.png" v-if="optionParams.discountRateSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.discountRateSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.discountRateSort === 2">
              </li>
              <!-- 剩余期限 -->
              <li v-if="optionParams.surplusPeriodSort === 0" @click="optionParams.surplusPeriodSort = 1;optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;getApplyLista();">剩余期限
                <img src="./img/shan.png" v-if="optionParams.surplusPeriodSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.surplusPeriodSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.surplusPeriodSort === 2">
              </li>
              <li v-if="optionParams.surplusPeriodSort === 1" @click="optionParams.surplusPeriodSort = 2;optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;getApplyLista();">剩余期限
                <img src="./img/shan.png" v-if="optionParams.surplusPeriodSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.surplusPeriodSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.surplusPeriodSort === 2">
              </li>
              <li  v-if="optionParams.surplusPeriodSort === 2" @click="optionParams.surplusPeriodSort = 1;optionParams.discountRateSort = 0;optionParams.amountSort = 0;optionParams.discountAmountSort = 0;getApplyLista();">剩余期限
                <img src="./img/shan.png" v-if="optionParams.surplusPeriodSort === 0">
                <img src="./img/xiaa.png" v-if="optionParams.surplusPeriodSort === 1">
                <img src="./img/xiab.png" v-if="optionParams.surplusPeriodSort === 2">
              </li>
            </ul>
          </div>
          
          <ul class="datalist-specific" v-if="allData.length" style="min-height:100px;">
          <li v-for="(item,index) in allData" :key="index">
            <div class="datalist-specificL">
              <img v-if="!item.logoAppUrl" src="~@/assets/images/moren.png" width="125" height="86" />
              <img v-if="item.logoAppUrl" :src="item.logoAppUrl" alt="" width="125" height="86">
            </div>
            <div class="datalist-specificR">
              <div class="datalist-specificR-top">
                <div class="datalist-specificR-topL">
                  <div class="pfName">{{item.pfName}}</div>
                  <div class="discount_zui" :style="leftBackground" v-for='(itmc,index) in item.labels' v-if="index < 3 && itmc.name.length == 2">{{itmc.name}}</div>
                  <div class="discount_zui" :style="leftBackgrounda" v-for='(itmc,index) in item.labels' v-if="index < 3 && itmc.name.length == 3">{{itmc.name}}</div>
                  <div class="discount_zuia" :style="leftBackgrounda" v-for='(itmc,index) in item.labels' v-if="index < 3 && itmc.name.length == 4">{{itmc.name}}</div>
                  <div class="discount-text">担保</div>
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
                  <div class="link-text" @click="goUrl(item.link)" style="color:#666666;">
                    <div><img src="~@/assets/images/link.png" alt=""></div>
                    <div>预览链接</div>
                  </div>
                  <!--<div class="Rdiscount-text" @click="tendencyId = item.id;getTendencya(item.pfName)">
                    <div><img src="~@/assets/images/discount.png" alt=""></div>
                    <div>折扣趋势</div>
                  </div>-->
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
          <!-- 分页 -->
        <div v-if="total" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30,50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
          
		<!--<div class="prograss">
			<div class="prograssImg">
				<img src="~@/assets/images/prograss.png" alt="">
			</div>
			<div class="service">
				<不死鸟>对双方交易金额提供全程担保服务
			</div>
		</div>-->
		<div class="blank"></div>
		<!-- 输入债权密码 -->
		<el-dialog title="债权密码" :visible.sync="dialogPwd" width="30%" :show-close="false">
			<!-- form表单 -->
			<el-form :model="delayData" :rules="rules" ref="delayData" label-width="120px" class="demo-delayData">
				<el-row>
					<el-col :span="24">
						<el-form-item label="债权密码:" prop="tranPwd">
							<el-input v-model="delayData.tranPwd" type='password' maxlength="6" placeholder="请输入债权密码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit('delayData')">提交</el-button>
							<el-button @click="resetForm('delayData');dialogPwd = false;delayData.tranPwd = '';">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
		<!-- 设置qq号码 -->
            <el-dialog title="承接确认" :visible.sync="dialogEditLoginQQ" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="delayData" :rules="rules" ref="delayData" label-width="120px" class="demo-loginPwdForm">
                    <el-row>
                        <el-col :span="24">
                        	<p style="height: 40px;text-indent: 3em;font-size: 16px;">是否确认承接该债权？</p>
                            <el-form-item label="QQ号码:" prop="qqCode">
                                <el-input v-model="setupqq.qqCode" maxlength="16" placeholder="请输入QQ号码 , 方便交易对接？ 选填！"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button  type="primary" @click="qqshezhi()">提交</el-button>
                                <el-button @click="dialogEditLoginQQ = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
		<!-- 折扣趋势 -->
		<el-dialog title="折扣趋势" :visible.sync="dialogShow" width="80%" :show-close="true">
			<tendency id="bar_type" :tendencyData="tendencyData"></tendency>
		</el-dialog>
			<!-- 折扣趋势 -->
	    <el-dialog title="折扣趋势" :visible.sync="isShow" width="80%" :show-close="true">
	      <tendency :id="tendencyId" :tendencyData="tendencyDataa"></tendency>
	    </el-dialog>
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
import { parseTime } from '@/filters';
import tendency from '@/components/tendency1.vue';
import Cookies from 'js-cookie';
export default {
	components: {
		tendency
	},
	data() {
		var validTranPwd = (rule, value, callback) => {
			if (String(value).length != 6) {
				callback(new Error('交易密码格式错误'));
				return false;
			}
			callback();
		};
		return {
			leftBackground: {
	        background: 'url(' + require("./img/oodd.png") + ') no-repeat center',
	        'background-size': '100% 100%',
	    },
			bg:{
				backgroundImage: "url(" + require("@/assets/images/backItem.png") + ")",
				backgroundRepeat: "repeat",
				backgroundSize: "100% 100%",
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
			detailData: {},
			dialogShow: false,
			tendencyData: [],
			tendencyDataa: [],
			tendencyName: '',
			isShow: false,
			dialogEditLoginQQ:false,
			dialogPwd: false,
			isBindCard: null,
			orderId: '',
			dizhi:'',
			userId: '',
			delayData: {
				tranPwd: '',
			},
			rules: {
				tranPwd: [
					{ required: true, message: "债权密码不能为空", trigger: "blur" },
					{ validator: validTranPwd, trigger: 'blur' }
				],
			},
			userInfo:{},
			response:{},
			setupqq:{
            	qqCode:'',
           },
           allData:[],
            params: {
		        activetype: '',//债权转让类型
		        activestatus: '',//债权转让状态
		        isSafe:'',
		      },
		      total:0,
		      tendencyId:'',
			centerDialogVisible: false,
		}
	},
	computed: {
	},
	created() {   
		this.orderId = this.$route.query.id?this.$route.query.id:Cookies.get('orderId');
		 var ishw = this.$route.query.ishw?this.$route.query.ishw:'';
		Cookies.set('orderId',this.orderId)
		if(ishw == 1){
			this.centerDialogVisible = true
		}
		this.dizhi = 'https://www.bsnzz.com/debtList/detail?id=' + this.orderId  //https://www.bsnzz.com/  //http://192.168.0.121:8081/web/tg/  //http://192.168.0.107:8080/#/
		Cookies.set('orderId',this.orderId);
		this.checkdebt('1', 1);
		//this.getApplyList();
		//this.getTable();
		//this.shareBox();
	},
	mounted() {
	},
	methods: {
		
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
        this.getApplyLista();
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
        this.getApplyLista();

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
        this.getApplyLista();

      } else {

      }
    },
		
		
		
		
		getTendency() {
			ajax({
				url: "orderTransfer/discountRates",
				optionParams: {
					name: this.tendencyName
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.tendencyData = res.data;
						this.dialogShow = true;
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		
		//趋势曲线PC
    getTendencya(val) {
    	console.log(val)
      ajax({
        url: "orderTransfer/discountRates",
        optionParams: {
          name: val
        }
      }).post()
        .then(res => {
          if (res.code === 200) {
            this.tendencyDataa = res.data;
            this.isShow = true;
          } else {
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
		//获取详情数据
		getApplyList() {
			ajax({
				url: "orderTransfer/debtDetail",
				optionParams: {
					orderId: this.orderId,
				}
			}).post()
				.then(res => {
					console.log(res);
					if (res.code === 200) {
						this.detailData = res.data;
						this.tendencyName = this.detailData.pfName;
						// this.getTendency();
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//债转列表
    getApplyLista() {
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
		qqshezhi(){
			console.log(this.setupqq.qqCode)
			if(this.setupqq.qqCode == ''){
				this.underTake()
				return false
			}else{
				this.submitLoginQQForm()
				this.underTake()
				return false
			}
		},
		
		
		shareBox() {
			var url = document.getElementById("cpLink");
		    url.select();
		    document.execCommand("copy");
		   	this.$message.success('复制成功');
		   	this.centerDialogVisible=false;
            return
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
		//重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
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
.detail {
	width: 100%;
	background-color: #f7f8fd;
	.middle {
		width: 100%;
		height: 215px;
		background: #f7f8fd;
	}
	
	
	.datalist-specific {
    //display: flex;
    background-color: transparent;
    z-index: 99;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    li {
        background: #fff;
        display: flex;
        flex: 1;
        height: 180px;
        border: 1px solid rgba(242, 242, 242, 1);
        border-radius: 2px;
        background-color: white !important;
        overflow: hidden;
        // padding: 10px 10px 0;
        // margin-bottom: 10px;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        .datalist-specificL {
            flex: 1;
            // height: 114px;
            text-align: center;
            vertical-align: middle;
            margin-top: 37px;
            margin-left: 22px;
            margin-bottom: 20px;
            margin-right: 28px;
            border-right: 1px solid rgba(217, 217, 217, 1);
            &>img {
                display: block;
                margin-top: 25px;
            }
        }
        .datalist-specificR {
            padding: 10px 10px;
            flex: 7;
            .datalist-specificR-top {
                display: flex;
                font-size: 12px;
                margin-top: 30px;
                .datalist-specificR-topL {
                    // flex: 1;
                    width: 755px;
                    height: 32px;
                    float: left;
                    .pfName {
                        text-align: center;
                        float: left;
                        height: 30px;
                        line-height: 30px;
                        font-size: 20px;
                        font-family: SourceHanSansCN-Bold;
                        font-weight: bold;
                        color: rgba(77, 77, 77, 1);
                        margin-right: 29px;
                    }
                    .discount-text {
                        float: left;
                        width: 60px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        border: 1px solid rgba(57, 99, 208, 1);
                        border-radius: 15px;
                        font-size: 16px;
                        color: rgba(57, 99, 208, 1);
                        margin-top: 7px;
                        margin-right: 10px;
                    }
                    .discount_zui{
                        height: 26px;
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height: 26px;
                        float: left;
                        padding: 0px 20px 0px 20px;
                        margin-right: 10px;
                        margin-top: 4px;
                    }
                    .discount_zuia{
                        height: 26px;
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height: 26px;
                        float: left;
                        padding: 0px 27px 0px 22px;
                        margin-right: 10px;
                        margin-top: 4px;
                    }
                    .prepay-text {
                        float: left;
                       width: 60px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        font-size: 16px;
                        border: 1px solid rgba(247, 187, 81, 1);
                        border-radius: 15px;
                        color: rgba(247, 187, 81, 1);
                        margin-top: 7px;
                         margin-right: 10px;
                    }
                    .orient-text {
                        float: left;
                        width: 60px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        font-size: 16px;
                        border: 1px solid rgba(242, 48, 47, 1);
                        border-radius: 15px;
                        color: rgba(242, 48, 47, 1);
                        margin-top: 7px;
                        margin-right: 10px;
                    }
                }
                .datalist-specificR-topR {
                    // flex: 1;
                    width: 233px;
                    float: left;
                    text-align: right;
                    color: #666666;
                    // margin-left: 450px;
                    img {
                        margin-right: 8px;
                    }
                    .link-text {
                        margin-right: 40px;
                        font-size: 14px;
                        float: right;
                        width: 97px;
                        height: 22px;
                        line-height: 22px;
                        cursor: pointer;
                        &>div {
                            float: left;
                        }
                    }
                    .Rdiscount-text {
                        font-size: 14px;
                        float: left;
                        width: 97px;
                        height: 22px;
                        line-height: 22px;
                        cursor: pointer;
                        &>div {
                            float: left;
                        }
                    }
                }
            }
            .datalist-specificR-context {
                display: flex;
                // padding: 10px 0 10px;
                margin-top: 35px;
                font-size: 14px;
                color: #666666;
                .datalist-specificR-context-item {
                    flex: 1;
                    line-height: 26px;
                    i {
                        font-style: normal;
                    }
                    .checkdetail {
                        width: 128px;
                        height: 32px;
                        line-height: 32px;
                        text-align: center;
                        background: rgba(57, 99, 208, 1);
                        border-radius: 16px;
                        font-size: 14px;
                        font-family: MicrosoftYaHeiLight;
                        font-weight: 300;
                        color: rgba(255, 255, 255, 1);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
	
	
	
	
	.debtdataBottom {
             font-size: 16px;
            padding: 5px 0;
            width: 1200px;
            background: white;
            margin: 0 auto;
            margin-top: 12px;
            span{
                border-left:3px solid #3963D0 ;
                padding-left: 10px;
                font-weight: 800;
            }
            ul.debtdataStatus-list,
            ul.debtdataType-list {
                display: inline-block;
                li {
                    display: inline-block;
                    padding: 0 23px;
                    cursor: pointer;
                    &.active {
                        background: #3963D0;
                        color: white;
//                      border: 1px solid rgba(255, 223, 173, 1);
//                      color: rgba(255, 223, 173, 1);
                        padding: 5px 23px;
                    }
                }
            }
            ul.debtdataTypea-list {
                display: inline-block;
                li {
                    display: inline-block;
                    padding: 0 23px;
                    cursor: pointer;
                    &.active {
                        background: #3963D0;
                        color: white;
//                      border: 1px solid rgba(255, 223, 173, 1);
//                      color: rgba(255, 223, 173, 1);
                        padding: 5px 23px;
                    }
                }
            }
            ul.debtdataBottom-list {
                display: inline-block;
                li {
                    float: left;
                    padding: 0 23px;
                    cursor: pointer;
                    &.active {
                        
                        border: 1px solid rgba(255, 223, 173, 1);
                        color: rgba(255, 223, 173, 1);
                        // padding: 5px 8px;
                    }
                }
            }
        }
        .debtdataBottom {
            ul.debtdataBottom-list {
                li {
                    line-height: 33px;
                    border: 1px solid #ffffff;
                }
            }
        }
    .debtdataBottom {
           
            span{
                border-left:3px solid #3963D0 ;
                padding-left: 10px;
                font-weight: 800;
            }
            ul.debtdataStatus-list,
            ul.debtdataType-list {
                display: inline-block;
                margin-left: 38px;
                li {
                    display: inline-block;
                    padding: 0 80px;
                    cursor: pointer;
                    &.active {
                        background: #3963D0;
                        color: white;
//                      border: 1px solid rgba(255, 223, 173, 1);
//                      color: rgba(255, 223, 173, 1);
                        padding: 5px 23px;
                    }
                }
            }
            ul.debtdataBottom-list {
                display: inline-block;
                margin-left: 38px;
                li {
                    float: left;
                    padding: 0 80px;
                    cursor: pointer;
                    &.active {
                        
                        border: 1px solid rgba(255, 223, 173, 1);
                        color: rgba(255, 223, 173, 1);
                        // padding: 5px 8px;
                    }
                }
            }
        }
	.debtDetail {
		margin: auto;
		margin-top: -200px;
		width: 1200px;
		height:350px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(242, 242, 242, 1);
		border-radius: 4px 4px 0px 0px;
		.title {
			height: 28px;
			line-height: 28px;
			margin-left: 34px;
			margin-top: 21px;
			text-indent: 20px;
			border-left: 4px solid rgba(57, 99, 208, 1);
			font-size: 14px;
			font-family: MicrosoftYaHei;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}
		.middleCon {
			height: 140px;
			width: 100%;
			.logo {
				width: 125px;
				height: 86px;
				float: left;
				margin-left: 93px;
				margin-top: 25px;
			}
			.thirdStatus {
				width: 789px;
				height: 70px;
				margin-left: 92px;
				// margin-top: 23px;
				float: left;
				.pfName {
					height:50px;
					font-size:16px;
					font-family:MicrosoftYaHei-Bold;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:50px;
					float: left;
					margin-right: 10px;
				}
				.discount-text {
                        height: 26px;
                        font-size:14px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height: 26px;
                        float: left;
                        padding: 0px 25px;
                        margin-top: 14px;
                        background-size:100% 100% ;
                    }
				.orderNum {
					font-size: 14px;
					font-family: MicrosoftYaHeiLight;
					font-weight: 300;
					color: rgba(0, 0, 0, 1);
					line-height: 14px;
					float: right;
					margin-top: 17px;
				}
				
			}
			.trendecya {
				width:570px;
				height: 70px;
				float: right;
				font-size: 14px;
				font-family: MicrosoftYaHeiLight;
				font-weight: 300;
				color: rgba(102, 102, 102, 1);
				margin-right: 84px;
				.Rdiscount-text{
					    float: right;
					    width: 100px;
					    line-height: 25px;
					    margin-top: 15px;
				}
				.link-text{
					float: right;
					 width: 66px;
					 line-height: 25px;
					 font-size:16px;
					font-family:MicrosoftYaHeiLight;
					color:rgba(51,51,51,1);
					 margin-top: 15px;
				}
			}
			.trendecy {
				width:809px;
				height: 75px;
				float: right;
				font-size: 14px;
				font-family: MicrosoftYaHeiLight;
				font-weight: 300;
				color: rgba(102, 102, 102, 1);
				margin-right: 84px;
			}
		}
		.amountItem {
			width: 1138px;
			height: 115px;
			overflow: hidden;
			border-top:1px solid rgba(90, 123, 252, 0.16);
			 border-bottom:1px solid rgba(90, 123, 252, 0.16);
			margin: 20px auto;
			box-shadow: 0px 1px 0px 0px rgba(90, 123, 252, 0.16);
			box-shadow:0px 4px 8px 1px rgba(90,123,252,0.16);
			.amountTop {
				width: 100%;
				height:115px;
				display: flex;
				display: -webkit-flex;
				
				.amountLeft {
					width: 27px;
					height: 100%;
				}
				.mainCon {
					flex: 1;
					.bdtype {
						width: 100%;
						height: 95px;
						.bdtypeCon {
							height: 100%;
							width: 960px;
							
							margin: auto;
							.bdtypetitle {
								float: left;
								margin-top: 40px;
								
								height:14px;
								line-height: 14px;
								font-size:14px;
								font-family:MicrosoftYaHeiLight;
								font-weight:300;
								color:rgba(102,102,102,1);
							}
							.name {
								float: left;
								margin-top: 40px;
								margin-left: 18px;
								margin-right: 93px;
								line-height: 16px;
								height:16px;
								font-size:16px;
								font-family:SourceHanSansCN-Light;
								font-weight:300;
								color:rgba(0,0,0,1);
							}
						}
					}
					.main {
						display: flex;
						display: -webkit-flex;
						height: 71px;
						
						.item {
						flex: 1;
						text-align: center;
						background: rgba(255, 255, 255, 1);
					.amount {
						width: 100%;
						height: 14px;
						line-height: 14px;
						padding-top: 26px;
						font-size: 18px;
						font-family: SourceHanSansCN-Light;
						font-weight: 400;
						color: rgba(0, 0, 0, 1);
					}
					.amounttitle {
						width: 100%;
						height: 14px;
						line-height: 14px;
						margin-top: 20px;
						font-size: 14px;
						font-family: MicrosoftYaHeiLight;
						font-weight: 300;
						color: rgba(102, 102, 102, 1);
					}
				}
					}
				}
				
			}
			.flash{
				height: 1px;
				width: 1000px;
				background:rgba(247,247,247,1);
				margin: 0 auto;
			}
			.amountBottom {
				width: 100%;
				height: 141px;
				position: relative;
				.undertake {
					width: 300px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					background: rgba(57, 99, 208, 1);
					border-radius: 20px;
					position: absolute;
					left: 391px;
					bottom: 170px;
					font-size: 18px;
					font-family: MicrosoftYaHeiLight;
					font-weight: 300;
					color: rgba(255, 255, 255, 1);
					cursor:pointer;
				}
				.disabled {
					background: rgba(102, 102, 102, 1);
				}
			}
		}
	}
	.prograss {
		margin: 37px auto;
		width: 1200px;
		height: 453px;
		background: rgba(255, 255, 255, 1);
		// border: 1px solid rgba(242, 242, 242, 1);
		border-radius: 4px 4px 0px 0px;
		.prograssImg {
			width: 100%;
			height: 393px;
		}
		.service {
			width: 100%;
			border: 1px solid rgba(242, 242, 242, 1);
			height: 60px;
			line-height: 60px;
			font-size: 14px;
			font-family: MicrosoftYaHei-Bold;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			text-align: center;
		}
	}
	.blank {
		width: 100%;
		height: 1px;
		background-color: #f7f8fd;
	}
	// .el-dialog{
	// 	border-radius:20px;
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
		.dialog-footer{
			.copybtn{
				width:300px;
				height:42px;
				background:rgba(57,99,208,1);
				border-radius:20px;
			}
		}
	// }
}
</style>


