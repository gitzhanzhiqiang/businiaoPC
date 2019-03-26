<template>
    <div class="tempCon psspd psspddd">
        <div class="center" :class="{tableActive:list[1].isShow === true||list[2].isShow === true}">
            <div class="top">
                <!--<div class="left">
                    <div class="headImg">
                        <img v-if="response.headUrl" :src="response.headUrl" alt="" width="74" height="74">
                        <img v-if="!response.headUrl" src="~@/assets/images/person.png" alt="" width="74" height="74">
                    </div>
                    <div class="acountPhone">{{phone}}</div>
                </div>-->
                <div class="right">
                    <ul class="selectIndex" style="position: relative;">
                    	<img style="position: absolute;left: 607px ;top: 50px;width: 30px;height: 10px;" src="~@/assets/images/ptgs.gif"/>
                        <li class="list" v-for="(item,index) in list" :key="index" @click="selectIndex(index);" :class="{active:item.isShow,activem:item.isShowa}">
                        	<a>{{item.title}}</a>
                        	<p v-for="(itm,index) in item.list2" @click="selectIndexa(index);" :class="{activea:itm.isShow}" v-show="baozhen == true">{{itm.title2}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 账户首页 -->
            <div v-if="list[0].isShow === true">
                <div class="withdrawal">
                    <div class="balance">
                        <div class="title">可用余额(元)</div>
                        <div class="amount" style="margin-top:23px;">{{response.balance}}</div>
                    </div>
                    <div class="moneyDeal">
                        <div class="item recharge" v-if='response.isBindCard===0||response.isSetTranspwd===0' @click="warnBank()">充值</div>
                        <div class="item recharge" v-if='response.isBindCard >0&&response.isSetTranspwd >0' @click="list[0].isShow = false;list[6].isShow = true;getBankList();rechargeShow = true;cashShow = false;">充值</div>
                        <div class="item cash" v-if='response.isBindCard >0&&response.isSetTranspwd >0' @click="list[0].isShow = false;list[6].isShow = true;getBankList();cashShow = true;rechargeShow = false;">提现</div>
                        <div class="item cash" v-if='response.isBindCard===0||response.isSetTranspwd===0' @click="warnBank()">提现</div>
                    </div>
                </div>
                <div class="amountData" :style="bg">
                    <div class="listItem">
                        <div class="title">总资产（元）</div>
                        <div class="amount">
                            {{response.totalBalance | formatMoney}}
                        </div>
                    </div>
                    <div class="listItem">
                        <div class="title">冻结金额（元）</div>
                        <div class="amount" style="color:rgba(51,51,51,1);">
                            {{response.freezeBalance | formatMoney}}
                        </div>
                    </div>
                    <div class="listItem" style="border: none;">
                        <div class="title">累计收益（元）</div>
                        <div class="amount" style="color:rgba(246,156,50,1);">
                            {{response.totalIncome | formatMoney}}
                        </div>
                    </div>
                </div>
                <!-- 我的转让 -->
                <div class="transfer">
                    <div class="title">
                        我的转让
                    </div>
                    <div class="allkind">
                    	<div class="item">
                            <div class="status">待付款</div>
                            <div class="amount">{{orderSummary.master.countPaying}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">转让中</div>
                            <div class="amount">{{orderSummary.master.waiting}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">锁定中</div>
                            <div class="amount">{{orderSummary.master.lockOn}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">申诉中</div>
                            <div class="amount">{{orderSummary.master.appeal}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">冻结中</div>
                            <div class="amount">{{orderSummary.master.freeze}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">已转让</div>
                            <div class="amount">{{orderSummary.master.complete}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">已下架</div>
                            <div class="amount">{{orderSummary.master.soldOut}}笔</div>
                        </div>
                    </div>
                </div>
                <!-- 我的承接 -->
                <div class="transfer">
                    <div class="title" style="color:rgba(241,143,63,1);">
                        我的承接
                    </div>
                    <div class="allkind">
                        <div class="item">
                            <div class="status">锁定中</div>
                            <div class="amount">{{orderSummary.slave.lockOn}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">申诉中</div>
                            <div class="amount">{{orderSummary.slave.appeal}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">冻结中</div>
                            <div class="amount">{{orderSummary.slave.freeze}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">已承接</div>
                            <div class="amount">{{orderSummary.slave.complete}}笔</div>
                        </div>
                        <div class="item">
                            <div class="status">承接失败</div>
                            <div class="amount">{{orderSummary.slave.soldOut}}笔</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的转让 -->
            <div class="section" v-if="list[1].isShow === true">
                <div class="status" style="margin-bottom:20px;width:100%;height: 40px;">
                	<div class="section_jilu">
                		<h3><i></i>债权记录：</h3>
                		<p v-for="(itm,index) in listtype" :class="{actw:itm.isShow}" :key="index" @click="toptypeti(index)">{{itm.title}}</p>
                	</div>
                	<div v-if='listtype[0].isShow === true' style="float:right;margin-right:40px;color: #4D4D4D;font-size:16px;cursor:pointer;margin-top: 10px;" @click="dialogOperateShow = 1;dialogOperate = true;">
                        <i class="el-icon-question" style="color: rgb(57, 99, 208);"></i>操作说明
                    </div>
                    <div style="float:right;margin-right: 30px;" v-if='listtype[0].isShow === true'>
                        <span style="margin-left:23px;">债权状态:</span>
                        <el-select v-model="optionParams.status" placeholder="请选择" style="width:169px;" @change="getTransferTable()">
                            <el-option v-for="item in transferList" :key="item.code" :label="item.text" :value="item.code">
                            </el-option>
                            <!-- <el-option v-for="item in storad" :key="item.id" :label="item.label" :value="item.id">
                                            </el-option> -->
                        </el-select>
                    </div>
                    
                    <div v-if='listtype[1].isShow === true' style="float:right;margin-right:40px;color: #4D4D4D;font-size:16px;cursor:pointer;margin-top: 10px;" @click="dialogOperateShow = 1;dialogOperate = true;">
                        <i class="el-icon-question" style="color: rgb(57, 99, 208);"></i>操作说明
                    </div>
                    <div style="float:right;margin-right: 30px;" v-if='listtype[1].isShow === true'>
                        <span style="margin-left:23px;">债权状态:</span>
                        <el-select v-model="loanParams.status" placeholder="请选择" style="width:169px;" @change="getLoansTable()">
                            <el-option v-for="item in transferLista" :key="item.code" :label="item.text" :value="item.code">
                            </el-option>
                            <!-- <el-option v-for="item in storad" :key="item.id" :label="item.label" :value="item.id">
                                            </el-option> -->
                        </el-select>
                    </div>
                </div>
                <!-- p2p -->
                <div class="tableList" v-if='listtype[0].isShow === true'>
                    <el-table :data="transferData" v-loading="listLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%" stripe :header-cell-style="getRowClass">
                        <el-table-column align="center" label="订单号" width="200">
                            <template slot-scope="scope">
                                <span @click="$router.push({path:'/debtList/detail',query:{id:scope.row.id}})" style="color:#3963D0;">{{scope.row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="平台名称" width="150">
                            <template slot-scope="scope">
                                {{scope.row.pfName}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="债权链接" width="50">
                            <template slot-scope="scope">
                                <!-- <a class="link-text" :href="scope.row.link" target="_blank">
                                                          <img src="~@/assets/images/link.png" alt="">
                                                          </a> -->
                                <img src="~@/assets/images/link.png" alt="" @click="goUrl(scope.row.link)">
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="转让金额(元)" width="150">
                            <template slot-scope="scope">
                                {{scope.row.amount}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="折扣金额(元)" width="150">
                            <template slot-scope="scope">
                                {{scope.row.discountAmount}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="发布时间">
                            <template slot-scope="scope">
                                {{scope.row.createTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="锁定到期时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0"></span>
                                <span v-else>{{scope.row.deadLine}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="完成/失效时间">
                            <template slot-scope="scope">
                                {{scope.row.completeTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="状态">
                            <template slot-scope="scope">
                                <span v-for="(itm,index) in storad" v-if="itm.id==scope.row.status" :key="index">{{itm.label}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="500">
                            <template slot-scope="scope">
                                <!-- 预付款到账中 -->
                                <span v-if="scope.row.status === -1">
                                    <el-button @click="$router.push({path:'/saleClaim/payBird', query:{data: JSON.stringify(scope.row)}})">重新支付</el-button>
                                    <!-- <el-button @click="repayNet(scope.row)">重新支付</el-button> -->
                                </span>
                                <!-- 转让中，待承接 -->
                                <span v-if="scope.row.status === 0">
                                    <el-button v-if="scope.row.orientFlag===1" @click="showPwd(scope.row)">债权密码</el-button>
                                    <el-button style="margin-left:10px;" @click="cancelTransfer(scope.row)">撤销</el-button>
                                </span>
                                <!-- 已承接 -->
                                <span v-if="scope.row.status === 2">
                                    <el-button @click="openUrl(scope.row.holdConfirmImg)">查看凭证</el-button>
                                    <!-- <a :href="scope.row.holdConfirmImg" target="_blank" style="color:#333;width:98px;height:40px;display:block;border:1px solid #ccc;border-radius:5px;line-height:40px;margin:auto;">查看凭证</a> -->
                                </span>
                                <!-- 待转让人支付到担保账户 -->
                                <span v-if="scope.row.status === 11">
                                    <el-button @click="resetWord(scope.row)">支付到担保账户</el-button>
                                    <!-- <el-button @click="$router.push({path:'/saleClaim/payBird', query:{data: JSON.stringify(scope.row)}})">支付到担保账户</el-button> -->
                                </span>
                                <!-- 待承接人上传凭证 -->
                                <span v-if="scope.row.status === 12">
                                    <el-button disabled>查看凭证</el-button>
                                </span>
                                <!-- 待转让人确认转账至承接人 -->
                                <span v-if="scope.row.status === 13">
                                    <el-button @click="openUrl(scope.row.holdConfirmImg)">查看凭证</el-button>
                                    <!-- <a :href="scope.row.holdConfirmImg" target="_blank" style="color:#333;width:98px;height:40px;display:block;border:1px solid #ccc;border-radius:5px;line-height:40px;margin:auto;">查看凭证</a> -->
                                    <el-button @click="$router.push({path:'/debtList/confirmTransfer', query:{data: JSON.stringify(scope.row)}})">确认转承接人</el-button>
                                    <el-button v-if="scope.row.extendFlag ==0" @click="delayData.orderTranId = scope.row.id;delayDataShow = true;">延长付款</el-button>
                                    <el-button v-if="scope.row.extendFlag ==1" @click="showDelay(scope.row);">查看延长</el-button>
                                    <el-button @click="appeal(scope.row)">申诉</el-button>
                                </span>
                                <!-- 申诉中 冻结审核中 已转让 -->
                                <span v-if="scope.row.status>13">
                                    <!-- <el-button> -->
                                    <el-button @click="openUrl(scope.row.holdConfirmImg)">查看凭证</el-button>
                                    <!-- <a :href="scope.row.holdConfirmImg" target="_blank" style="color:#333;width:98px;height:40px;display:block;border:1px solid #ccc;border-radius:5px;line-height:40px;margin:auto;">查看凭证</a> -->
                                    <!-- </el-button> -->
                                </span>
                                <!-- 已下架 -->
                                <span v-if="scope.row.status === 4">
                                    <el-button v-if="scope.row.reCallLimit>0" @click="$router.push({path:'/saleClaim/index', query:{data: JSON.stringify(scope.row)}})">再次发起</el-button>
                                    <el-button @click="undercarriageReason(scope.row)">查看下架原因</el-button>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <!-- 分页 -->
                <div v-if="transferDataTotal && listtype[0].isShow === true" class="pagination-container">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30,50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="loansDataTotal">
                    </el-pagination>
                </div>
				
				
				 <!-- 借条 -->
				<div class="tableList" v-if='listtype[1].isShow === true'>
                    <el-table :data="loansData" v-loading="listLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%" stripe :header-cell-style="getRowClass">
                        <el-table-column align="center" label="订单号" width="200">
                            <template slot-scope="scope">
                                <span @click="$router.push({path:'/debtList/detailj',query:{id:scope.row.id}})" style="color:#3963D0;">{{scope.row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="借条类型" width="150">
                            <template slot-scope="scope">
                                <span v-for="item in type" :key="item.value" v-text="item.key" v-show="item.value == scope.row.type"></span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="债权本息" width="150">
                            <template slot-scope="scope">
                                {{scope.row.amountAndInterest}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="成交金额(元)" width="150">
                            <template slot-scope="scope">
                                {{scope.row.amount}}
                            </template>
                        </el-table-column>
                         <el-table-column align="center" label="发布时间">
                            <template slot-scope="scope">
                                {{scope.row.createTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="锁定到期时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0"></span>
                                <span v-else>{{scope.row.deadLine}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="完成/失效时间">
                            <template slot-scope="scope">
                                {{scope.row.surplusPeriod}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="状态">
                            <template slot-scope="scope">
                                <span v-for="(itm,index) in storad" v-if="itm.id==scope.row.status" :key="index">{{itm.label}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="500">
                            <template slot-scope="scope">
                                <!-- 预付款到账中 -->
                                <span v-if="scope.row.status === -1">
                                    <el-button @click="$router.push({path:'/saleClaim/payBirda', query:{data: JSON.stringify(scope.row)}})">重新支付</el-button>
                                    <!-- <el-button @click="repayNet(scope.row)">重新支付</el-button> -->
                                </span>
                                <!-- 转让中，待承接 -->
                                <span v-if="scope.row.status === 0">
                                    <el-button style="margin-left:10px;" @click="cancelTransferj(scope.row)">撤销</el-button>
                                </span>
                                <!-- 已承接 -->
                                <span v-if="scope.row.status === 2">
                                    <el-button @click="openUrlyuan(scope.row)">取消转让</el-button>
                                    <!-- <a :href="scope.row.holdConfirmImg" target="_blank" style="color:#333;width:98px;height:40px;display:block;border:1px solid #ccc;border-radius:5px;line-height:40px;margin:auto;">查看凭证</a> -->
                                </span>
                               
                                <!-- 待承接人上传凭证 -->
                                <span v-if="scope.row.status === 12">
                                    <el-button disabled>查看凭证</el-button>
                                </span>
                                
                               
                                <!-- 已下架 -->
                                <span v-if="scope.row.status === 4">
                                    <el-button @click="undercarriagezaici(scope.row)">再次发起</el-button>
                                    <el-button @click="undercarriageReasonj(scope.row)">查看下架原因</el-button>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <!-- 分页 -->
                <div v-if="loansDataTotal && listtype[1].isShow === true" class="pagination-container">
                    <el-pagination @size-change="handleSizeTotal" @current-change="handleCurrentTotal" :current-page.sync="loanParams.page" :page-sizes="[10,20,30,50]" :page-size="loanParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="loansDataTotal">
                    </el-pagination>
                </div>
				
				
            </div>
            <!-- 我的承接 -->
            <div class="section" v-if="list[2].isShow === true">
                <div class="status" style="margin-bottom:20px;width:100%;height: 40px;">
                	<div class="section_jilu">
                		<h3><i></i>债权记录：</h3>
                		<p v-for="(itm,index) in listtypea" :class="{actw:itm.isShow}" :key="index" @click="toptypetia(index)">{{itm.title}}</p>
                	</div>
                	<div v-if="listtypea[0].isShow === true" style="float:right;margin-right:40px;color: #4D4D4D;font-size:16px;cursor:pointer;margin-top: 10px;" @click="dialogOperateShow = 2;dialogOperate = true;">
                        <i class="el-icon-question" style="color: rgb(57, 99, 208);"></i>操作说明
                    </div>
                    <div v-if="listtypea[0].isShow === true" style="float:right;margin-right: 30px;">
                        <span style="margin-left:23px;">债权状态:</span>
                        <el-select v-model="undertakeParams.status" placeholder="请选择" style="width:169px;" @change="getUndertake()">
                            <el-option v-for="item in undertakeList" :key="item.code" :label="item.text" :value="item.code">
                            </el-option>
                        </el-select>
                    </div>
                    
                    <div v-if="listtypea[1].isShow === true" style="float:right;margin-right:40px;color: #4D4D4D;font-size:16px;cursor:pointer;margin-top: 10px;" @click="dialogOperateShow = 2;dialogOperate = true;">
                        <i class="el-icon-question" style="color: rgb(57, 99, 208);"></i>操作说明
                    </div>
                    <div v-if="listtypea[1].isShow === true" style="float:right;margin-right: 30px;">
                        <span style="margin-left:23px;">债权状态:</span>
                        <el-select v-model="undertakeiouParams.status" placeholder="请选择" style="width:169px;" @change="getUndertakeiou()">
                            <el-option v-for="item in undertakeLista" :key="item.code" :label="item.text" :value="item.code">
                            </el-option>
                        </el-select>
                    </div>
                    
                </div>
                <!-- p2p -->
                <div class="tableList" v-if="listtypea[0].isShow === true">
                    <el-table :data="undertakeData" v-loading="undertakeListLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%" stripe :header-cell-style="getRowClass">
                        <el-table-column align="center" label="订单号" width="200">
                            <template slot-scope="scope">
                                <span @click="$router.push({path:'/debtList/detail',query:{id:scope.row.id}})" style="color:#3963D0;cursor:pointer;">{{scope.row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="平台名称" width="150">
                            <template slot-scope="scope">
                                {{scope.row.pfName}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="债权链接" width="50">
                            <template slot-scope="scope">
                                <!-- <a class="link-text" :href="scope.row.link" target="_blank">
                                                          <img src="~@/assets/images/link.png" alt="">
                                                          </a> -->
                                <img src="~@/assets/images/link.png" alt="" @click="goUrl(scope.row.link)">
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="转让金额(元)" width="150">
                            <template slot-scope="scope">
                                {{scope.row.amount}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="折扣金额(元)" width="150">
                            <template slot-scope="scope">
                                {{scope.row.discountAmount}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="发布时间">
                            <template slot-scope="scope">
                                {{scope.row.createTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="锁定到期时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0"></span>
                                <span v-else>{{scope.row.deadLine}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="完成/失效时间">
                            <template slot-scope="scope">
                                {{scope.row.completeTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="状态" width="150">
                            <template slot-scope="scope">
                                <span v-for="(itm,index) in storad" v-if="itm.id==scope.row.status" :key="index">{{itm.label}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right">
                            <template slot-scope="scope">
                                <!--  待承接人上传凭证-->
                                <span v-if="scope.row.status === 12">
                                    <el-button @click="holdDebt(scope.row)">购买债权</el-button>
                                    <el-button @click="add();imgId = scope.row.id">上传凭证</el-button>
                                </span>
                                <!--   申诉中 冻结审核中 已承接-->
                                <span v-if="scope.row.status === 30 ||scope.row.status === 20 ||scope.row.status === 2">
                                    <el-button @click="openUrl(scope.row.holdConfirmImg)">查看凭证</el-button>
                                    <!-- <a :href="scope.row.holdConfirmImg" target="_blank" style="color:#333;width:98px;height:40px;display:block;border:1px solid #ccc;border-radius:5px;line-height:40px;margin:auto;">查看凭证</a> -->
                                </span>
                                <!-- 待转让人确认转账至承接人 -->
                                <span v-if="scope.row.status === 13">
                                    <el-button @click="openUrl(scope.row.holdConfirmImg)">查看凭证</el-button>
                                    <el-button @click="add();imgId = scope.row.id">修改凭证</el-button>
                                </span>
                                <!-- 已下架 -->
                                <span v-if="scope.row.status === 41 || scope.row.status === 4 ||scope.row.status === 21 ||scope.row.status === 32">
                                    <el-button @click="lookFailReason(scope.row)">查看失败原因</el-button>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <!-- 分页 -->
                <div v-if="undertakeDataTotal&&listtypea[0].isShow === true" class="pagination-container">
                    <el-pagination @size-change="undertakeSizeChange" @current-change="undertakeCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30, 50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="undertakeDataTotal">
                    </el-pagination>
                </div>
				
				<!-- 借条 -->
				 <div class="tableList" v-if="listtypea[1].isShow === true">

                    <el-table :data="undertakeiouData" v-loading="undertakeiouListLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%;" stripe :header-cell-style="getRowClass">
                        <el-table-column align="center" label="订单号" width="200">
                            <template slot-scope="scope">
                                <span @click="$router.push({path:'/debtList/detailj',query:{id:scope.row.id}})" style="color:#3963D0; cursor:pointer;">{{scope.row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="借条类型" width="150">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type==1">个人借条</span>
                                <span v-if="scope.row.type==2">小贷借条</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="债权本息" width="150">
                            <template slot-scope="scope">
                                {{scope.row.amountAndInterest}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="成交金额(元)" width="150">
                            <template slot-scope="scope">
                                {{scope.row.amount}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="债权人QQ" width="150">
                            <template slot-scope="scope">
                                {{scope.row.qqCode}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="承接时间" sortable="false">
                            <template slot-scope="scope">
                                {{scope.row.holdTime}}
                            </template>
                        </el-table-column>
                        <!--<el-table-column align="center" label="锁定到期时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0"></span>
                                <span v-else>{{scope.row.deadLine}}</span>
                            </template>
                        </el-table-column>-->
                        <el-table-column align="center" label="完成/失效时间">
                            <template slot-scope="scope">
                                {{scope.row.successTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="订单状态" width="150">
                            <template slot-scope="scope">
                                <span v-for="(itm,index) in storad" v-if="itm.id==scope.row.status" :key="index">{{itm.label}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right">
                            <template slot-scope="scope">
                                <!-- 取消承接 -->
                                <span v-if="scope.row.status === 2">
                                    <el-button @click="cancelUndertaking(scope.row.id)">取消承接</el-button>
                                </span>
                                <!-- 重新支付 -->
                                <span v-if="scope.row.status === 1">
                                    <el-button @click="$router.push({path:'/saleClaim/payBirda', query:{data: JSON.stringify(scope.row)}})">重新支付</el-button>
                                </span>
                               <!-- 已下架 -->
                                <span v-if="scope.row.status === 4">
                                    <el-button @click="undercarriageReasonj(scope.row)">查看下架原因</el-button>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <!-- 分页 -->
                <div v-if="undertakeiouDataTotal&&listtypea[1].isShow === true" class="pagination-container">
                    <el-pagination @size-change="undertakeiouSizeChange" @current-change="undertakeiouCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30, 50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="undertakeiouDataTotal">
                    </el-pagination>
                </div>
				
            </div>
            <!--
            	存证保全
            -->
            <div class="section" v-if="list[3].isShow === true">
            	<div class="ptwop" v-if="list[3].list2[0].isShow === true">
            		<p class="bttm" @click="folder(0)">创建文件夹</p>
            		<b>P2P合同</b>
            		<div class="meiyoud" v-if="!undertakeanquan.length">
            			<img src="./img/libiao.png"/>
						<p>您还未创建过文件夹哦，<span @click="folder(0)">点击创建</span></p>
            		</div>
            		<div class="tableList">
						<table>
							<tr v-for="itm in undertakeanquan" @mouseover="selectStyle(itm)" @mouseout="outStyle(itm)" v-if="undertakeanquan.length">
								<td style="width: 500px;position: relative;">
									<img class="tuc" v-if='!itm.logoUrl' src="~@/assets/images/fkid.png"/>
									<img class="tuc" v-if='itm.logoUrl' :src="itm.logoUrl"/>
									<span class="mingc" style="cursor: pointer;" @click="detailta(0,itm)">{{itm.name}}</span>
									<div class="dianx" @click="xiugaiw(itm,0)" style="cursor: pointer;">
										<img class="dian" v-if='itm.gengm' src="~@/assets/images/eee.png"/>
									</div>
									<div class="xiugai" v-if='itm.mingzixuan == true'>
										<ul>
											<li @click="gengmingzi(itm,0)">重命名</li>
											<li @click="deltsan(itm,0)">删除</li>
										</ul>
									</div>
									<div class="gengming" v-if='itm.gming == true'>
										<input type="" name="" v-model="itm.name" />
										<span @click="namegai(itm,0)"><img src="~@/assets/images/cb.png"/></span>
										<span @click="namequ"><img src="~@/assets/images/cd.png"/></span>
									</div>
								</td>
								<td @click="detailta(0,itm)" style="cursor: pointer;">
									<span style="margin-left: 0px;color: #666;font-weight: Medium;">标的名称：</span><span style="color: #333;">{{itm.bdName}}</span>
								</td>
								<td @click="detailta(0,itm)" style="cursor: pointer;">
									<span style="margin-left: 0px;color: #666;font-weight: Medium;">标的金额：</span><span style="color: #333;">{{itm.bdAmount}}</span>
								</td>
							</tr>
						</table>  
						<!-- 分页 -->
		                <div v-if="hetongtal" class="pagination-container">
		                    <el-pagination @size-change="hetongSizeChange" @current-change="hetongPageChange" :current-page.sync="baozhenlie.page" :page-sizes="[10,20,30, 50]" :page-size="baozhenlie.limit" layout="total, sizes, prev, pager, next, jumper" :total="hetongtal">
		                    </el-pagination>
		                </div>
            		</div>
            	</div>
            	
            	<div class="detailsall" v-if='detailsall == 0' v-loading="hetongLoading">
            			<div class="btm1">
            				<p class="scwj" @click="addc"><img src="~@/assets/images/bct.png"/>{{titshang}}</p>
            				<p class="baochunx" @click="baocunxiu(0)" v-if="hexiugai == false">修改</p>
            				<p class="baochun" @click="baocunxiu(0)" v-if="hexiugai == true">保存</p>
            			</div>
            			<div class="luyou">
            				<span style="color: #3963D0;cursor: pointer;font-size: 16px;" @click="shangji">返回上一级</span> | <span style="color: #3963D0;">P2P合同</span> | <span style="color: #333333;">{{detailtahtong.name}}</span>
            			</div>
            			<div class="xinxit">
            				<span>标的名称</span>
            				<input style="width: 280px;" :disabled="hejinzhi" :class="{actt:hejinzhi}" v-model="detailtahtong.bdName" type="" name="" id="" value="" />
            				<span>标的金额</span>
            				<input style="width: 160px;" type="" :disabled="hejinzhi" :class="{actt:hejinzhi}" v-model="detailtahtong.bdAmount" name="" id="" value="" />
            				<span style="text-align: center;">备注</span>
            				<input style="width: 398px;" type="" :disabled="hejinzhi" :class="{actt:hejinzhi}" v-model="detailtahtong.remark" name="" id="" value="" />
            			</div>
            			
            			<div class="tableList ptwop">
            				<div class="tishishang" v-if = 'meiyoushang == true'>
            					<img src="~@/assets/images/ffk.png"/>
            					<div class="meishang">您还没上传过文件哦，<a @click="addc">点击上传</a></div>
            					<div><i></i><span>* 格式为PDF/ZIP/RAR/JPEG/JPG/PNG，大小不超过5M</span></div>
            				</div>
            				<table v-if = 'meiyoushang == false'>
            					<tr style="height: 56px;">
									<td style="text-align: center;height: 56px;">
										文件名
									</td>
									<td style="text-align: center;height: 56px;">
										大小
									</td>
									<td style="text-align: center;height: 56px;">
										上传日期
									</td>
								</tr>
								<tr v-for="itm in undertakeData1" @mouseover="selectStylea(itm)" @mouseout="outStylea(itm)">
									<td style="width: 500px;position: relative;">
										<img v-if="itm.suffix == 'jpeg'" class="tuc" src="./img/jpeg.png"/>
										<img v-if="itm.suffix == 'jpg'" class="tuc" src="./img/jpg.png"/>
										<img v-if="itm.suffix == 'pdf'" class="tuc" src="./img/pdf.png"/>
										<img v-if="itm.suffix == 'png'" class="tuc" src="./img/png.png"/>
										<img v-if="itm.suffix == 'rar'" class="tuc" src="./img/rar.png"/>
										<img v-if="itm.suffix == 'zip'" class="tuc" src="./img/zip.png"/>
										<span class="mingc" style="cursor: pointer;" @click="yulangtu(itm,0)">{{itm.fileName}}.{{itm.suffix}}</span>
										<div class="dianx" @click="wenxiugaiw(itm,0)" style="cursor: pointer;">
											<img class="dian" v-if='itm.gengm' src="~@/assets/images/eee.png"/>
										</div>
										
										<div class="xiugai" v-if='itm.mingzixuan == true'>
											<ul>
												<li @click="pingzheng(itm,0)">查看证书</li>
												<li @click="gengmingziw(itm,0)">重命名</li>
												<li @click="deltsanw(itm,0)">删除</li>
											</ul>
										</div>
										<div class="gengming" v-if='itm.gming == true'>
											<input type="" name="" v-model="itm.fileName" />
											<span @click="namegaiw(itm,0)"><img src="~@/assets/images/cb.png"/></span>
											<span @click="namequw"><img src="~@/assets/images/cd.png"/></span>
										</div>
									</td>
									<td @click="xiaoshika(itm)" style="cursor: pointer;text-align: center;">
										<span>{{itm.fileLength/1048576 | forma2}}</span>M
									</td>
									<td @click="xiaoshika(itm)" style="cursor: pointer;text-align: center;">
										<span>{{itm.createTime}}</span>
									</td>
								</tr>
							</table>  
		                    <!-- 分页 -->
		                <div v-if="hetongtal" class="pagination-container">
		                    <el-pagination @size-change="hetongwSizeChange" @current-change="hetongwPageChange" :current-page.sync="detailzhi.page" :page-sizes="[10,20,30, 50]" :page-size="detailzhi.limit" layout="total, sizes, prev, pager, next, jumper" :total="hetongwtal">
		                    </el-pagination>
		                </div>
	            		</div>
            		</div>
            	<div class="ptwop" v-if="list[3].list2[1].isShow === true">
            		<p class="bttm" @click="folder(1)">创建文件夹</p>
            		<b>欠条</b>
            		<div class="meiyoud" v-if="!undertakeanquan.length">
            			<img src="./img/libiao.png"/>
						<p>您还未创建过文件夹哦，<span @click="folder(1)">点击创建</span></p>
            		</div>
            		<div class="tableList">
						<table>
							<tr v-for="itm in undertakeanquan" @mouseover="selectStyle(itm)" @mouseout="outStyle(itm)" v-if="undertakeanquan.length">
								<td style="width: 500px;position: relative;">
									<img class="tuc" v-if='!itm.logoUrl' src="~@/assets/images/fkid.png"/>
									<img class="tuc" v-if='itm.logoUrl' :src="itm.logoUrl"/>
									<span class="mingc" style="cursor: pointer;" @click="detailta(1,itm)">{{itm.name}}</span>
									<div class="dianx" @click="xiugaiw(itm,1)" style="cursor: pointer;">
										<img v-if='itm.gengm' class="dian" src="~@/assets/images/eee.png"/>
									</div>
									<div class="xiugai" v-if='itm.mingzixuan == true'>
										<ul>
											<li @click="gengmingzi(itm,1)">重命名</li>
											<li @click="deltsan(itm,1)">删除</li>
										</ul>
									</div>
									<div class="gengming" v-if='itm.gming == true'>
										<input type="" name="" v-model="itm.name" />
										<span @click="namegai(itm,1)"><img src="~@/assets/images/cb.png"/></span>
										<span @click="namequ"><img src="~@/assets/images/cd.png"/></span>
									</div>
								</td>
								<td @click="detailta(1,itm)" style="cursor: pointer;">
									<span style="margin-left: 0px;color: #666;font-weight: Medium;">借款人：</span><span style="color: #333333;">{{itm.loansSlave}}</span>
								</td>
								<td @click="detailta(1,itm)" style="cursor: pointer;">
									<span style="margin-left: 0px;color: #666;font-weight: Medium;">借款金额：</span><span style="color: #333333;">{{itm.loansAmount}}</span>
								</td>
							</tr>
						</table>   
						<!-- 分页 -->
		                <div v-if="hetongtal" class="pagination-container">
		                    <el-pagination @size-change="hetongSizeChange" @current-change="hetongPageChange" :current-page.sync="baozhenlie.page" :page-sizes="[10,20,30, 50]" :page-size="baozhenlie.limit" layout="total, sizes, prev, pager, next, jumper" :total="hetongtal">
		                    </el-pagination>
		                </div>
            		</div>
            	</div>
            	
            	<div class="detailsall" v-if='detailsall == 1' v-loading="hetongLoading">
            			<div class="btm1">
            				<p class="scwj" @click="addc"><img src="~@/assets/images/bct.png"/>{{titshang}}</p>
            				<p class="baochunx" @click="baocunxiu(1)" v-if="qianxiugai == false">修改</p>
            				<p class="baochun" @click="baocunxiu(1)" v-if="qianxiugai == true">保存</p>
            			</div>
            			<div class="luyou">
            				<span style="color: #3963D0;cursor: pointer;font-size: 16px;" @click="shangji">返回上一级</span> | <span style="color: #3963D0;">欠条</span> | <span style="color: #333333;">{{detailtahtong.name}}</span>
            			</div>
            			<div class="xinxit" style="height: 100px;">
            				<span style="width: 60px;">借款人</span>
            				<input style="width: 260px;" :disabled="qianjinzhi" :class="{actt:qianjinzhi}" v-model="detailtahtong.loansSlave" type="" name="" id="" value="" />
            				<span style="width: 100px;text-indent: 2em;">借款金额</span>
            				<input style="width: 260px;" :disabled="qianjinzhi" :class="{actt:qianjinzhi}" v-model="detailtahtong.loansAmount" type="" name="" id="" value="" />
            				<span style="text-align: right;">出借人</span>
            				<input style="width: 260px;" :disabled="qianjinzhi" :class="{actt:qianjinzhi}" v-model="detailtahtong.loansMaster" type="" name="" id="" value="" /><br />
            				<span style="text-align: left;width: 60px;">期限</span>
            				 <el-date-picker v-model="value1" type="daterange" :class="{actt:qianjinzhi}" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				    </el-date-picker>
            				<span style="text-align: center;width: 100px;">备注</span>
            				<input style="width: 607px;" :disabled="qianjinzhi" :class="{actt:qianjinzhi}" v-model="detailtahtong.remark" type="" name="" id="" value="" />
            			</div>
            			
            			<div class="tableList ptwop">
            				<div class="tishishang" v-if = 'meiyoushang == true'>
            					<img src="~@/assets/images/ffk.png"/>
            					<div class="meishang">您还没上传过文件哦，<a @click="addc">点击上传</a></div>
            					<div><i></i><span>* 格式为PDF/ZIP/RAR/JPEG/JPG/PNG，大小不超过5M</span></div>
            				</div>
		                    <table v-if = 'meiyoushang == false'>
            					<tr style="height: 56px;">
									<td style="text-align: center;height: 56px;">
										文件名
									</td>
									<td style="text-align: center;height: 56px;">
										大小
									</td>
									<td style="text-align: center;height: 56px;">
										上传日期
									</td>
								</tr>
								<tr v-for="itm in undertakeData1" @mouseover="selectStylea(itm)" @mouseout="outStylea(itm)">
									<td style="width: 500px;position: relative;">
										<img v-if="itm.suffix == 'jpeg'" class="tuc" src="./img/jpeg.png"/>
										<img v-if="itm.suffix == 'jpg'" class="tuc" src="./img/jpg.png"/>
										<img v-if="itm.suffix == 'pdf'" class="tuc" src="./img/pdf.png"/>
										<img v-if="itm.suffix == 'png'" class="tuc" src="./img/png.png"/>
										<img v-if="itm.suffix == 'rar'" class="tuc" src="./img/rar.png"/>
										<img v-if="itm.suffix == 'zip'" class="tuc" src="./img/zip.png"/>
										<span class="mingc" @click="yulangtu(itm,1)" style="cursor: pointer;">{{itm.fileName}}.{{itm.suffix}}</span>
										<div class="dianx" @click="wenxiugaiw(itm,1)" style="cursor: pointer;">
											<img class="dian" v-if='itm.gengm' src="~@/assets/images/eee.png"/>
										</div>
										<div class="xiugai" v-if='itm.mingzixuan == true'>
											<ul>
												<li @click="pingzheng(itm,1)">查看证书</li>
												<li @click="gengmingziw(itm,1)">重命名</li>
												<li @click="deltsanw(itm,1)">删除</li>
											</ul>
										</div>
										<div class="gengming" v-if='itm.gming == true'>
											<input type="" name="" v-model="itm.fileName" />
											<span @click="namegaiw(itm,1)"><img src="~@/assets/images/cb.png"/></span>
											<span @click="namequw"><img src="~@/assets/images/cd.png"/></span>
										</div>
									</td>
									<td @click="xiaoshik(itm)" style="cursor: pointer;text-align: center;">
										<span>{{itm.fileLength/1048576 | forma2}}</span>M
									</td>
									<td @click="xiaoshik(itm)" style="cursor: pointer;text-align: center;">
										<span>{{itm.createTime}}</span>
									</td>
								</tr>
							</table>  
		                       <!-- 分页 -->
		                <div v-if="hetongtal" class="pagination-container">
		                    <el-pagination @size-change="hetongwSizeChange" @current-change="hetongwPageChange" :current-page.sync="detailzhi.page" :page-sizes="[10,20,30, 50]" :page-size="detailzhi.limit" layout="total, sizes, prev, pager, next, jumper" :total="hetongwtal">
		                    </el-pagination>
		                </div>
	            		</div>
            		</div>
            		
            	<!--新建文件-->
            	<div class="wenjian" v-if="wenjian == 1">
            		<p @click="shangji">返回上一级</p>
            		<h3>创建文件夹</h3>
            		<div class="wenjian_xin">
            			<div class="licuan">
            				<span>创建类型：</span>
            				<b>
            					<el-radio v-model="aftertt.type" label="1">P2P合同</el-radio>
  								<el-radio v-model="aftertt.type" label="2">欠条</el-radio>
            				</b>
            			</div>
            			<div v-if='aftertt.type == 1'>
            				<div class="licuan">
	            				<span>文件夹名称：</span>
	            				<el-autocomplete class="zhaizhuan-txt" v-model="aftertt.name" :fetch-suggestions="querySearchAsync" placeholder="例：钱盆网" @select="handleSelect"></el-autocomplete>
	            				<!--<input type="text" placeholder="例：万盈金融" maxlength="10" v-model="aftertt.name" />-->
	            			</div>
	            			<div class="licuan">
	            				<span>标的名称：</span>
	            				<input type="text" placeholder="例：[QP00000773595]消费贷" maxlength="30" v-model="aftertt.bdName" />
	            			</div>
	            			<div class="licuan">
	            				<span>标的金额：</span>
	            				<input type="text" placeholder="例：9000" maxlength="10" @blur="biaoti()" v-model="aftertt.bdAmount" />
	            			</div>
	            			<div class="licuan" style="height: 240px;">
	            				<span>备注：</span>
	            				<textarea name="" placeholder="添加备注（100字以内）" maxlength="100" v-model="aftertt.remark" rows="" cols=""></textarea>
	            			</div>
	            		</div>
	            		<div v-if='aftertt.type == 2'>
            				<div class="licuan">
	            				<span>文件夹名称：</span>
	            				<el-autocomplete class="zhaizhuan-txt" v-model="aftertt.name" :fetch-suggestions="querySearchAsync" placeholder="例：钱盆网" @select="handleSelect"></el-autocomplete>
	            				<!--<input type="text" placeholder="例：万盈金融" maxlength="10" v-model="aftertt.name" />-->
	            			</div>
	            			<div class="licuan">
	            				<span>借款人：</span>
	            				<input type="text" placeholder="请输入借款人名称" maxlength="10" v-model="aftertt.loansSlave" />
	            			</div>
	            			<div class="licuan">
	            				<span>借款金额：</span>
	            				<input type="text" placeholder="请输入借款金额" @blur="biaotia()" v-model="aftertt.loansAmount" maxlength="10" />
	            			</div>
	            			<div class="licuan">
	            				<span>出借人：</span>
	            				<input type="text" placeholder="请输入出借人" v-model="aftertt.loansMaster" maxlength="10" />
	            			</div>
	            			<div class="licuan">
	            				<span>借款期限：</span>
				    <el-date-picker v-model="aftertt.value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				    </el-date-picker>
	            			</div>
	            			<div class="licuan" style="height: 240px;">
	            				<span>备注：</span>
	            				<textarea name="" placeholder="添加备注（100字以内）" maxlength="100" v-model="aftertt.remark" rows="" cols=""></textarea>
	            			</div>
	            			 
	            		</div>
	            		<div class="bim" style="text-align: left;">
                            <el-button style='width: 300px;height: 42px;background:rgba(57,99,208,1);border-radius:20px;border: none;margin-left: 150px;' type="primary" @click="sumwenjian('aftertt')">完成</el-button>
                      	</div>	
            		</div>
            	</div>
            	
            </div>
             <!-- 邀请有礼 -->
            <div class="invitation" v-if="list[4].isShow === true">
            	<div class="invitation_l">
            		<p v-for="(itm,index) in yanqingdh" :class="{'activ':itm.isShow}" @click="yaoqingy(itm,index)">{{itm.title}}</p>
            	</div>
            	<div class="invitation_r" v-if="yanqingdh[0].isShow === true">
            		<h3>邀请奖励</h3>
            		<div class="commissiobag">
            			<div class="commissiobag_l">
            				<p>交易佣金</p>
            				<span>好友成功交易债权后即可拥有</span>
            				<div class="commissiobag_b" :style="bgbei">
            					<p>好友每次成功转让，您可得服务费的30%</p>
            					<p>好友每次成功承接，您可得服务费的20%</p>
            				</div>
            			</div>
            			<div class="commissiobag_l">
            				<p>奖券大礼包</p>
            				<span>好友成功交易债权后即可拥有</span>
            				<div class="commissiobag_b" :style="bgbeia">
            				</div>
            				<span class="bei">被邀请人可获得一份限时奖券大礼包哦~</span>
            			</div>
            		</div>
            		<div class="filstd"></div>
            		<h4>奖励规则</h4>
            		<div class="guize">
            			<ul>
            				<li>
            					<img src="./img/shuyi.png"/>
            					<span>好友注册</span>
            				</li>
            				<li>
            					<img style="margin-top:40px;margin-left: 20px;" src="./img/jiantou.png"/>
            				</li>
            				<li>
            					<img src="./img/shuer.png"/>
            					<span>发布/交易债权</span>
            				</li>
            				<li>
            					<img style="margin-top:40px;margin-left: 20px;" src="./img/jiantou.png"/>
            				</li>
            				<li>
            					<img src="./img/shusan.png"/>
            					<span>获得奖励</span>
            				</li>
            			</ul>
            			<p>注：好友需在注册后15天内发布或承接债权你才可获得抵扣券哦！</p>
            		</div>
            		<div class="filstd"></div>
            		<h4>立即赚钱</h4>
            		<div class="zhuanqian">
            			<div class="zhuanqian_l">
            				<p>我的邀请码</p>
            				<textarea id="cpLinka" readonly v-model="kzzet"></textarea>
            				<span @click="shareBoxa">复制</span>
            			</div>
            			<div class="zhuanqian_l" style="width: 600px;">
            				<p>我的邀请码链接</p>
            				<textarea id="cpLinkaa" readonly v-model="kzzeta"></textarea>
            				<span @click="shareBoxb">复制</span>
            			</div>
            			<div class="wenzi">
            				复制邀请码或专属链接给好友 > 好友通过链接或邀请码注册并符合相关要求 > 您获得交易佣金和折扣券
            			</div>
            		</div>
            		<div class="filstd"></div>
            		<h4>活动规则</h4>
            		<div class="huodong">
            			<p>1.每位被邀请的用户每次成功转让债权后，可以获得该笔交易服务费的30%；</p>
            			<p>2.每位被邀请的用户每次成功承接债权后，可以获得该笔交易服务费的20%；</p>
            			<p>3.当交易双方都是您邀请的时，交易成功您可以获得该笔交易服务费的50%；</p>
            			<p>4.每位被邀请的用户在注册后15天内首次发布或承接债权邀请人即可获得一张抵扣券，减免一次服务费；</p>
            			<p>5.抵扣券获得后，实时自动发放至我的福利，使用规则请查看我的福利；</p>
            			<p>6.该活动最终解释权归黑尘科技所有。</p>
            		</div>
            	</div>
            	<div class="invitation_r" v-if="yanqingdh[1].isShow === true">
            		<div class="myyao_top">
						<ul>
							<li>
								获得佣金(元)
								<span>{{myinvitation.commission.toFixed(2)}}</span>
							</li>
							<li>
								获得福利
								<span>{{myinvitation.countCoupon}}</span>
							</li>
							<li>
								邀请好友
								<span>{{myinvitation.countInvite}}</span>
							</li>
						</ul>            			
            		</div>
            		<table class="tables">
        				<tr>
        					<th>好友</th>
        					<th>注册时间</th>
        					<th>发布/承接时间</th>
        					<th>佣金</th>
        				</tr>
            			<tr v-for='itm in myinvitationa' v-if='myinvitationa.length'>
        					<td>{{itm.phone}}</td>
        					<td>{{itm.createTime | parseTime('{y}-{m}-{d}')}}</td>
        					<td v-if='itm.firstTransferTime'>{{itm.firstTransferTime | parseTime('{y}-{m}-{d}')}}</td>
        					<td v-if='!itm.firstTransferTime'>---</td>
        					<td>{{itm.amount.toFixed(2)}}</td>
        				</tr>	
					</table>
					<div v-if="myinvitationa.length" class="pagination-container">
	                    <el-pagination @size-change="yaoqinglielieatali" @current-change="yaoqinglielieatalia" :current-page.sync="yaoqinglieliea.page" :page-sizes="[10,20,30, 50]" :page-size="yaoqinglieliea.limit" layout="total, sizes, prev, pager, next, jumper" :total="myinvitattal">
	                    </el-pagination>
	                </div>
					<div class="tablesa" v-if='!myinvitationa.length'>
						<img src="./img/wuyaoq.png"/>
						暂无邀请记录
					</div>
            	</div>
            </div>
             <!-- 我的福利 -->
            <div class="mywelfare" v-if="list[5].isShow === true">
            	<div class="invitation_l">
            		<h2>我的福利<span>使用说明<img @click="centerfulishuming = true" src="./img/wenhao.png"></span></h2>
            		<p v-for="(itm,index) in yanqingdf" :class="{'activ':itm.isShow}" @click="yaoqingf(itm,index)">{{itm.title}}</p>
            	</div>
            	<div class="weishiy" v-if="yanqingdf[0].isShow === true">
            		<ul v-if="dikoujuan.length" style="overflow: hidden;">
            			<li :style="bgbeiawu" v-for="itm in dikoujuan">
            				<span class="tit" v-if="itm.rate == 100">抵扣券</span>
            				<span class="tit" v-else>折扣券</span>
            				<span class="zhe">{{itm.rate}}%OFF</span>
            				<span class="fuwu">{{itm.name}}</span>
            				<span class="dikou">最多抵扣{{itm.maxPrice}}元</span>
            				<span class="time">有效期{{itm.createTime | parseTime('{y}-{m}-{d}')}}至{{itm.expireTime | parseTime('{y}-{m}-{d}')}}</span>
            			</li>
            		</ul>
            		<div class="imgmei" v-if="!dikoujuan.length">
            			<img src="./img/moren_coupon.png"/>
            			暂无优惠券
            		</div>
            		
            		
            		<!-- 分页 -->
                <div v-if="dikoujuantotal" class="pagination-container">
                    <el-pagination @size-change="dikoujuanChange" @current-change="dikoujuantPageChange" :current-page.sync="coupons.page" :page-sizes="[10,20,30,50]" :page-size="coupons.limit" layout="total, sizes, prev, pager, next, jumper" :total="dikoujuantotal">
                    </el-pagination>
                </div>
            		
            	</div>
            	<div class="weishiy" v-if="yanqingdf[1].isShow === true">
            		<ul v-if="dikoujuan.length" style="overflow: hidden;">
            			<li :style="bgbeiawuy" v-for="itm in dikoujuan">
            				<span class="tit" v-if="itm.rate == 100">抵扣券</span>
            				<span class="tit" v-else>折扣券</span>
            				<span class="zhe">{{itm.rate}}%OFF</span>
            				<span class="fuwu">{{itm.name}}</span>
            				<span class="dikou">最多抵扣{{itm.maxPrice}}元</span>
            				<span class="time">有效期{{itm.createTime | parseTime('{y}-{m}-{d}')}}至{{itm.expireTime | parseTime('{y}-{m}-{d}')}}</span>
            			</li>
            		</ul>
            		<div class="imgmei" v-if="!dikoujuan.length">
            			<img src="./img/moren_coupon.png"/>
            			暂无优惠券
            		</div>
            			<!-- 分页 -->
                <div v-if="dikoujuantotal" class="pagination-container">
                    <el-pagination @size-change="dikoujuanChange" @current-change="dikoujuantPageChange" :current-page.sync="coupons.page" :page-sizes="[10,20,30,50]" :page-size="coupons.limit" layout="total, sizes, prev, pager, next, jumper" :total="dikoujuantotal">
                    </el-pagination>
                </div>
            	</div>
            	<div class="weishiy" v-if="yanqingdf[2].isShow === true">
            		<ul v-if="dikoujuan.length" style="overflow: hidden;">
            			<li :style="bgbeiawuy" v-for="itm in dikoujuan">
            				<span class="tit" v-if="itm.rate == 100">抵扣券</span>
            				<span class="tit" v-else>折扣券</span>
            				<span class="zhe">{{itm.rate}}%OFF</span>
            				<span class="fuwu">{{itm.name}}</span>
            				<span class="dikou">最多抵扣{{itm.maxPrice}}元</span>
            				<span class="time">有效期{{itm.createTime | parseTime('{y}-{m}-{d}')}}至{{itm.expireTime | parseTime('{y}-{m}-{d}')}}</span>
            			</li>
            		</ul>
            		<div class="imgmei" v-if="!dikoujuan.length">
            			<img src="./img/moren_coupon.png"/>
            			暂无优惠券
            		</div>
            			<!-- 分页 -->
                <div v-if="dikoujuantotal" class="pagination-container">
                    <el-pagination @size-change="dikoujuanChange" @current-change="dikoujuantPageChange" :current-page.sync="coupons.page" :page-sizes="[10,20,30,50]" :page-size="coupons.limit" layout="total, sizes, prev, pager, next, jumper" :total="dikoujuantotal">
                    </el-pagination>
                </div>
            	</div>
            </div>
            <!-- 资金流水 -->
            <div class="section" v-if="list[6].isShow === true&&!rechargeShow&&!cashShow">
                <div class="withdrawal">
                    <div class="balance">
                        <div class="title">可用余额(元)</div>
                        <div class="amount" style="margin-top:23px;">{{response.balance}}</div>
                    </div>
                    <div class="moneyDeal">
                        <div class="item recharge" v-if='response.isBindCard===0||response.isSetTranspwd===0' @click="warnBank()">充值</div>
                        <div class="item recharge" v-if='response.isBindCard >0&&response.isSetTranspwd >0' @click="list[0].isShow = false;list[6].isShow = true;getBankList();rechargeShow = true;cashShow = false;">充值</div>
                        <div class="item cash" v-if='response.isBindCard >0&&response.isSetTranspwd >0' @click="list[0].isShow = false;list[6].isShow = true;getBankList();cashShow = true;rechargeShow = false;">提现</div>
                        <div class="item cash" v-if='response.isBindCard===0||response.isSetTranspwd===0' @click="warnBank()">提现</div>
                    </div>
                </div>
                <div class="status">
                    <span style="margin-left:23px;">资金流水：</span>
                    <el-select v-model="flowParams.type" placeholder="请选择" style="width:169px;" @change="getFlow()">
                        <el-option v-for="item in stateList" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="tableList">
                    <el-table :data="flowList" v-loading="flowListLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%" stripe :header-cell-style="getRowClass">
                        <el-table-column align="center" label="时间">
                            <template slot-scope="scope">
                                {{scope.row.createTime}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="交易类型" width="150">
                            <template slot-scope="scope">
                                {{scope.row.revenueExpendType | revenueExpendTypeFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="交易内容">
                            <template slot-scope="scope">
                                {{scope.row.remark}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作金额(元)">
                            <template slot-scope="scope">
                                {{scope.row.amount}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="手续费(元)" width="150">
                            <template slot-scope="scope">
                                <span v-if="scope.row.remark == '[系统]充值成功'">0.00</span>
                                <span v-else> {{scope.row.feeAmount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="可用金额(元)">
                            <template slot-scope="scope">
                                {{scope.row.currentTotaAamount}}
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <!-- 分页 -->
                <div v-if="flowListTotal" class="pagination-container">
                    <el-pagination @size-change="flowSizeChange" @current-change="flowCurrentPageChange" :current-page.sync="flowParams.page" :page-sizes="[10,20,30,50]" :page-size="flowParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="flowListTotal">
                    </el-pagination>
                </div>
            </div>

            <!-- 充值 -->
            <div class="rechargeCash" v-if="list[6].isShow === true&&rechargeShow">
                <div class="top">
                    <div class="logo"></div>
                    <div class="title">充值</div>
                </div>
                <div class="payStyle">
                    <div class="payTitle">选择方式：</div>
                    <div class="tabButton">
                        <div class="tabitemLeft" :class="{tabActive:!tabShow}" @click="tabShow = !tabShow;">认证支付</div>
                        <div class="tabitemRight" :class="{tabActive:tabShow}" @click="tabShow = !tabShow;">网银支付</div>
                    </div>
                </div>
                <!-- 快捷支付 -->
                <div class="bank" v-if="!tabShow" style="height:60px;">
                    <div class="bankTitle">选择银行：</div>
                    <div class="bankLogo">
                        <div class="img" v-for="(item,index) in cardCheckList" @click="tabSelectOne(index)" :key="index" style="width:230px;height:50px;margin-bottom:10px;float:left;margin-left:10px;">
                            <div class="floatImg" v-if="item.isShow" style="width:230px;height:50px;" :style="bankBackground">
                                <!--<img :src="item.bankLogo" alt="" width="230" height="50" style="opacity:.5;">-->
                                {{item.bankName}}
                            </div>
                            <div class="floatImg" v-if="!item.isShow" style="width:230px;height:50px;line-height: 50px;text-align: center;border: 1px solid #999999;">
                                <!--<img :src="item.bankLogo" alt="" width="230" height="50">-->
                                 {{item.bankName}}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 网银支付 -->
                <div class="bank" v-if="tabShow" style="height:250px;">
                    <div class="bankTitle">选择银行：</div>
                    <div class="bankLogo">
                        <div class="img" v-for="(item,index) in bankCheckList" @click="tabSelectBank(index)" :key="index" style="width:230px;height:50px;float:left;margin-left:10px;margin-bottom:12px;">
                            <img v-if="item.isSeleted" :src="item.selectedImg" alt="" width="230" height="50">
                            <img v-if="!item.isSeleted" :src="item.img" alt="" width="230" height="50">
                        </div>
                    </div>
                </div>
                <div class="border">
                </div>
                <div class="amountCon">
                    <div class="leftCon">
                        <!--<div class="item">
                            可用余额:
                        </div>-->
                        <div class="item">
                            充值金额:
                        </div>
                        <div class="item">
                            手续费用:
                        </div>
                        <div class="item">
                            支付金额:
                        </div>
                        <!--<div class="item" v-if="!tabShow">
                            验证码:
                        </div>-->
                    </div>
                    <div class="rightCon">
                        <!--<div class="item">
                            {{response.balance}}元
                        </div>-->
                        <div class="item">
                            <input type="text" class="text" placeholder="100元起充" v-model.number="confirmBox.amount" v-on:input="confirmBox.realAmount = confirmBox.amount;">
                            <span class="danwei">元</span>
                            <!-- <el-input placeholder="100元起充" style="width:280px;text-indent:0;" v-model.number="confirmBox.amount">
                                    <template slot="append" @click="alert(111)">元</template>
                                </el-input> -->
                        </div>
                        <div class="item">
                            <span>免费</span>
                        </div>
                        <div class="item">
                            <span>{{confirmBox.realAmount}}元</span>
                        </div>
                        <!--<div class="item" v-if="!tabShow">
                            <input class="text" placeholder="请输入验证码" style="width:220px;" v-model="confirmBox.validatecode" maxlength="6">
                             <el-input placeholder="请输入验证码" style="width:200px;text-indent:0;" v-model="confirmBox.validatecode" maxlength="6">
                                </el-input> -->
                           <!-- <div class="getCode" style="text-align:center;" v-if="isSend1" @click="getphonecodeId()">获取</div>
                            <div class="getCode" style="text-align:center;" v-if="!isSend1">{{count1}}s</div>
                        </div>-->
                    </div>
                </div>
                <div class="chongzhi">
                    <div class="button" @click="confirmRecharge()">充值</div>
                </div>
            </div>
            <!-- 提现 -->
            <div class="rechargeCash" v-if="list[6].isShow === true&&cashShow">
                <div class="top">
                    <div class="logo"></div>
                    <div class="title">提现</div>
                </div>
                <!-- <div class="bank">
                                                <div class="bankTitle">充值银行卡：</div>
                                                <div class="bankLogo">
                                                    <img :src="bankList[0].bankLogo" alt="" width="230" height="50">
                                                </div>
                                            </div> -->
                <div class="amountItem">
                    <div class="amountLeft">
                        <div class="item">提现银行：</div>
                        <div class="item">可提金额：</div>
                        <div class="item">提现金额：</div>
                        <div class="item">手续费用：</div>
                        <div class="item">到账金额：</div>
                        <div class="item">交易密码：</div>
                        <!-- <div class="item">验证码：</div> -->
                    </div>
                    <div class="amountRight">
                        <div class="item" style="border: 1px solid #999999;text-align: center;width: 230px;">
                            <!--<img :src="bankList[0].bankLogo" alt="" width="230" height="50">-->
                             {{bankList[0].bankName}}
                        </div>
                        <div class="item">
                            {{response.balance}}元
                        </div>
                        <div class="item">
                            <el-input class="elInput" placeholder="请输入提现金额" style="width:280px;text-indent:0;color:rgba(0, 0, 0, 1);font-weight: 400;" v-model.number="cashBox.amount" @change="acountFare">
                                <template slot="append">元</template>
                            </el-input>
                        </div>
                        <div class="item">
                            {{cashBox.fare}}元
                        </div>
                        <div class="item">
                            {{cashBox.realAmount}}元
                        </div>
                        <div class="item">
                            <el-input class="elInput" type="password" placeholder="请输入6位数字交易密码" maxlength="6" style="width:280px;text-indent:0;color:rgba(0, 0, 0, 1);font-weight: 400;" v-model.number="cashBox.transPassword">
                            </el-input>
                        </div>
                        <div class="item">

                        </div>
                    </div>
                </div>
                <div class="chongzhi">
                    <div class="button" @click="confirmCash()">提现</div>
                </div>
            </div>
            <!-- 消息中心 -->
            <div class="newsCenter" v-if="list[7].isShow === true">
                <div class="title">
                    <div class="tabNew" :class="{tabNewActive:tabNewShow === true}" @click="tabNewShow = !tabNewShow;getNewList(tabNewShow);">转让消息</div>
                    <div class="tabNew" :class="{tabNewActive:tabNewShow === false}" @click="tabNewShow = !tabNewShow;getNewList(tabNewShow);">承接消息</div>
                </div>
                <div class="newsItem" v-for="(item,index) in newsList" :key="index">
                    <!-- <el-collapse v-for="(item,index) in newsList" :key="index" v-model="activeNames" @change="handleChangeNew" accordion>
                            <el-collapse-item :title="item.title+item.createTime" :name="index">
                                <div>{{item.createTime}}</div>
                                <div>{{item.content}}</div>
                            </el-collapse-item>
                        </el-collapse> -->
                    <div class="title">
                        <div class="fabu">{{item.title}}</div>
                        <div class="createTime">{{item.createTime}}</div>
                        <div class="collpose" v-if="item.isread===1">
                            <img src="~@/assets/images/lookUp.png" alt="" @click="item.isread = 0">
                        </div>
                        <div class="collpose" v-if="item.isread===0">
                            <img src="~@/assets/images/lookDown.png" alt="" @click="item.isread = 1">

                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="substr" :class="{active:item.isread===1}">
                        {{item.content}}
                    </div>
                </div>
                <!-- 分页 -->
                <div v-if="newsListTotal" class="pagination-container">
                    <el-pagination @size-change="handleNewsSizeChange" @current-change="handleNewsCurrentPageChange" :current-page.sync="newsOptionParams.page" :page-sizes="[5,10,20]" :page-size="newsOptionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="newsListTotal">
                    </el-pagination>
                </div>
            </div>
            <!-- 安全中心 -->
            <div class="section" v-if="list[8].isShow === true">
                <div class="safeList">
                    <div class="title">手机号码</div>
                    <div class="data">{{response.phone | phoneFilter}}</div>
                    <div class="operate" @click="dialogModifyPhone = true;">修改</div>
                </div>
                <div class="safeList">
                    <div class="title">交易密码</div>
                    <div class="data" v-if='response.isSetTranspwd ==1'>已设置</div>
                    <div class="data" v-else>未设置</div>
                    <div class="operate" v-if='response.isSetTranspwd ==1' @click="dialogEditTradePwd = true;">修改</div>
                    <div class="operate" v-else @click="dialogTradePwd = true;">设置</div>
                </div>
                <div class="safeList">
                    <div class="title">登陆密码</div>
                    <div class="data">已设置</div>
                    <div class="operate" @click="dialogEditLoginPwd = true;">修改</div>
                </div>
                <div class="safeList">
                    <div class="title">QQ号码</div>
                    <div class="data" v-if="response.qqCode == null || response.qqCode == ''">未设置</div>
                    <div class="data" v-else>{{response.qqCode}}</div>
                    <div class="operate" v-if="response.qqCode == null || response.qqCode == ''" @click="dialogEditLoginQQ = true;">设置</div>
                    <div class="operate" v-else @click="dialogEditLoginQQ = true;">修改</div>
                </div>
                <div v-if="bankList.length!=0">
                    <div class="safeList" v-for="(item,index) in bankList" :key="index">
                        <div class="title" v-if="item.isMatser===1">主银行卡</div>
                        <div class="title" v-if="item.isMatser!=1">副银行卡</div>
                        <div class="data">{{item.bankName}}({{item.bankCardNo | bankCardShow}})</div>
                        <div class="operate" v-if="item.isMatser!=1" @click="delBankList(item)">删除</div>
                    </div>
                </div>
                <div class="safeList" v-if="bankList.length===0">
                    <div class="title">主银行卡</div>
                    <div class="data" style="color:#EC9E23;">未绑定</div>
                    <div class="operate" style="color:#3963D0;" @click="dialogBindCard = true;">绑定</div>
                </div>
                <div class="safeList" style="border: none;" v-if="bankList.length!=0">
                    <div class="title">副银行卡</div>
                    <div class="data" style="color:#EC9E23;">未绑定</div>
                    <div class="operate" style="color:#3963D0;" @click="dialogBindCard = true;">绑定</div>
                </div>
            </div>
            <!-- 购买债权 -->
            <!-- 延长支付 delayDataShow-->
            <el-dialog title="延长支付" :visible.sync="delayDataShow" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="delayData" :rules="rules" ref="delayData" label-width="120px" class="demo-loginPwdForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="延长时间:" prop="extendTime">
                                <el-select style="width:100%;" v-model="delayData.extendTime" placeholder="请选择延长时间" class="zhaizhuan-txt">
                                    <el-option v-for="(item,index) in 24" :value="item" :key="index">
                                        {{item}}小时
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model.number="delayData.extendTime" maxlength="2" placeholder="请输入延长时间"></el-input> -->
                            </el-form-item>
                            <el-form-item label="延长理由:" prop="remark">
                                <el-input type="textarea" :rows="3" placeholder="请输入延长理由" v-model="delayData.remark">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="delayConfirm('delayData')">提交</el-button>
                                <el-button @click="resetForm('delayData');delayDataShow = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 查看延长 -->
            <el-dialog title="查看延长" :visible.sync="delayDataShow1" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="delayData" :rules="rules" ref="delayData" label-width="120px" class="demo-loginPwdForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="延长时间:" prop="extendTime">
                                <el-input disabled v-model="delayData.extendTime" maxlength="2" placeholder="请输入延长时间">
                                    <template slot="append">小时</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="延长理由:" prop="remark">
                                <el-input disabled type="textarea" :rows="3" placeholder="请输入延长理由" v-model="delayData.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- dialog修改手机号 -->
            <el-dialog title="修改手机号码" :visible.sync="dialogModifyPhone" width="35%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="modifyPhoneForm" :rules="rules" ref="modifyPhoneForm" label-width="120px" class="demo-modifyPhoneForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="原手机号:">
                                <span>{{phone}}</span>
                            </el-form-item>
                            <el-form-item label="新手机号码:" prop="newphone">
                                <el-input v-model.number="modifyPhoneForm.newphone" maxlength="11" placeholder="请输入新手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="手机验证码:" prop="checkcode">
                                <el-input placeholder="请输入手机验证码" maxlength="6" v-model="modifyPhoneForm.checkcode" style="width:70%;">
                                    <!-- <template slot="append" v-if="isSend" >获取</template>
                                                                    <template slot="append" v-if="!isSend">{{count}}s</template> -->
                                </el-input>
                                <span v-if="isSend" @click="getCheckCode();" style="width:20%;">获取</span>
                                <span v-if="!isSend" style="width:20%;">{{count}}s</span>
                            </el-form-item>
                            <el-form-item label="银行卡号:" prop="bankcardnum">
                                <el-input placeholder="请输入银行卡号" v-model="modifyPhoneForm.bankcardnum">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="登录密码:" prop="pwd">
                                <el-input type="password" placeholder="请输入登录密码" v-model="modifyPhoneForm.pwd">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('modifyPhoneForm')">提交</el-button>
                                <el-button @click="resetForm('modifyPhoneForm');dialogModifyPhone = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 设置交易密码 -->
            <el-dialog title="设置交易密码" :visible.sync="dialogTradePwd" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="tradePwdForm" :rules="rules" ref="tradePwdForm" label-width="120px" class="demo-tradePwdForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="交易密码:" prop="tranPwd">
                                <el-input v-model.number="tradePwdForm.tranPwd" maxlength="6" placeholder="由6位数字组成"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码:" prop="tranPwd">
                                <el-input v-model.number="tradePwdForm.tranPwdTwo" maxlength="6" placeholder="请输入确认密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitTradePwdForm('tradePwdForm')">提交</el-button>
                                <el-button @click="resetForm('tradePwdForm');dialogTradePwd = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 修改交易密码 -->
            <el-dialog title="修改交易密码" :visible.sync="dialogEditTradePwd" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="tradeEditTradePwdForm" :rules="rules" ref="tradeEditTradePwdForm" label-width="120px" class="demo-tradeEditTradePwdForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="旧交易密码:" prop="oldtranPwd">
                                <el-input v-model.number="tradeEditTradePwdForm.oldtranPwd" maxlength="6" placeholder="由6位数字组成"></el-input>
                            </el-form-item>
                            <el-form-item label="新交易密码:" prop="newtranPwd">
                                <el-input v-model.number="tradeEditTradePwdForm.newtranPwd" type='password' maxlength="6" placeholder="由6位数字组成"></el-input>
                            </el-form-item>
                            <el-form-item label="确认交易密码:" prop="newtranPwdTwo">
                                <el-input v-model.number="tradeEditTradePwdForm.newtranPwdTwo" type='password' maxlength="6" placeholder="请输入确认密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitEditTradePwdForm('tradeEditTradePwdForm')">提交</el-button>
                                <el-button @click="resetForm('tradeEditTradePwdForm');dialogEditTradePwd = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 修改登陆密码 -->
            <el-dialog title="修改登陆密码" :visible.sync="dialogEditLoginPwd" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="loginPwdForm" :rules="rules" ref="loginPwdForm" label-width="120px" class="demo-loginPwdForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="旧登陆密码:" prop="oldPwd">
                                <el-input v-model="loginPwdForm.oldPwd" maxlength="16" placeholder="请输入旧登陆密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新登陆密码:" prop="newPwd">
                                <el-input v-model="loginPwdForm.newPwd" type='password' maxlength="16" placeholder="由8-16位字母和数字组成"></el-input>
                            </el-form-item>
                            <el-form-item label="确认登陆密码:" prop="newPwdTwo">
                                <el-input v-model="loginPwdForm.newPwdTwo" type='password' maxlength="16" placeholder="请输入确认密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitLoginPwdForm('loginPwdForm')">提交</el-button>
                                <el-button @click="resetForm('loginPwdForm');dialogEditLoginPwd = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 设置qq号码 -->
            <el-dialog title="QQ号码" :visible.sync="dialogEditLoginQQ" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="setupqq" :rules="rules" ref="setupqq" label-width="120px" class="demo-loginPwdForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="QQ号码:" prop="setupqq">
                                <el-input v-model="setupqq.qqCode" maxlength="13" @change='qqpanduan()' placeholder="请输入QQ号码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitLoginQQForm('setupqq')">提交</el-button>
                                <el-button @click="resetForm('setupqq');dialogEditLoginQQ = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
             <!-- 取消转让 -->
            <el-dialog title="取消转让" :visible.sync="dialogEditLoginZR" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="setupyuan" :rules="rules" ref="setupyuan" label-width="120px" class="demo-loginPwdForm">
                    <el-row>
                        <el-col :span="24">
                        	<el-form-item label="处理方式:" prop="setupyuan">
                               <el-select v-model="setupyuan.value" clearable placeholder="请选择">
								    <el-option v-for="item in optionsyuan" :key="item.value" :label="item.label" :value="item.value">
								    </el-option>
							  </el-select>
                            </el-form-item>
                            <el-form-item label="取消原因:" prop="setupyuan">
                                <el-input type="textarea" v-model="setupyuan.remark" maxlength="60" @change='qqpanduan()' placeholder="请输入取消原因~限制60个字上限"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitLoginyuanForm('setupyuan')">提交</el-button>
                                <el-button @click="resetForm('setupyuan');dialogEditLoginZR = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 绑定银行卡 -->
            <el-dialog title="绑定银行卡" :visible.sync="dialogBindCard" width="30%" :show-close="false">
                <!-- form表单 -->
                <el-form :model="BindCardForm" :rules="rules" ref="BindCardForm" label-width="120px" class="demo-BindCardForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="持卡人姓名:" prop="username">
                                <el-input v-model="BindCardForm.username" maxlength="16" placeholder="请输入持卡人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="证件号:" prop="idCard">
                                <el-input v-model="BindCardForm.idCard" maxlength="18" placeholder="请输入证件号"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号:" prop="bankCardNo">
                                <el-input v-model="BindCardForm.bankCardNo" maxlength="19" placeholder="请输入银行卡号"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="手机号:" prop="phone">
                                <el-input v-model="BindCardForm.phone" maxlength="11" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码:">
                                <el-input style="width:80%;" v-model="BindCardForm.checkCode" maxlength="6" placeholder="请输入验证码"></el-input>
                                <el-button style="color:rgba(57,99,208,1);" v-if="isSend3" @click="getBankCode('BindCardForm')">获取</el-button>
                                <el-button style="color:rgba(57,99,208,1);" v-if="!isSend3">{{count3}}s</el-button>
                            </el-form-item>-->
                            <el-form-item>
                                <el-button type="primary" @click="submitBindCardForm()">提交</el-button>
                                <el-button @click="resetForm('BindCardForm');dialogBindCard = false;">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 绑定主银行卡 -->
            <div style="display:none;">
                <input type="file" accept="image/*" placeholder="选择图片" @change="fileChanged" ref="file" />
            </div>
             <!-- 绑定主银行卡 -->
            <div style="display:none;">
            	<form :action="dizhi" enctype="multipart/form-data" method="post" ref="filet">
                	<input type="file" placeholder="选择图片" @change="fileChangec" id="file" ref="filea" />
                </form>
            </div>
            <!-- 操作说明 -->
            <el-dialog title="操作说明" :visible.sync="dialogOperate" width="1000px">
                <img src="~@/assets/images/operate.png" alt="" width="946" v-if="dialogOperateShow === 1">
                <img src="~@/assets/images/operate1.png" alt="" width="946" v-if="dialogOperateShow === 2">
            </el-dialog>
            <!-- 分享 -->
		<el-dialog title="分享债权信息" :visible.sync="centerDialogVisible" width="39%" center>
			<p class="text">分享出去，让更多人看到，会增加债转成功率哦</p>
			<textarea id="cpLink" readonly v-model="dizhia"></textarea>
			<span slot="footer" class="dialog-footer">				
				<el-button type="primary" @click="shareBox" class="copybtn">复制链接</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="" :visible.sync="centerfulishuming" width="30%" center>
			<div class="shuoming">
				<h1>使用说明</h1>
				<span>什么是优惠券？</span>
				<p>优惠券是不死鸟平台通过活动参与、邀请奖励等形式发放给用户，</p>
				<p>用户减免服务费的惠民措施。</p>
				<p>在类型上分为抵扣券和折扣券。</p>
				<p>抵扣券：服务费1000元以内全免；</p>
				<p>折扣券：服务费2000元以内五折。</p>
				<span style="margin-top: 30px;">如何使用优惠券？</span>
				<p>在不死鸟APP或官网中，进入确认支付页面，选择可使用的优惠券，选择后下单支付即可减免相应金额。</p>
				<span style="margin-top: 30px;">优惠券使用规则？</span>
				<p>1.优惠券支持减免订单服务费金额，支付时直减；<br/> 2.优惠券需在有效期内使用，过期作废；<br/> 3.每笔支付最多可使用一张优惠券； <br/>4.交易未成功后使用的优惠券退回，如果刚好过优惠券有效期，则失效。</p>
			</div>
		</el-dialog>
        </div>
        <div style="width:100%;height:20px;"></div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import  baseURL from '@/assets/js/ajax/baseURL.js';
import { validate } from '@/assets/js/validation';
import { parseTime,forma2 } from '@/filters';
import OSS from "ali-oss";
export default {
    components: {
    },
    data() {
        var validPhone = (rule, value, callback) => {
            if (!validate.validatPhone(value)) {
                callback(new Error('手机格式错误'));
                return false;
            }
            callback();
        };
        var validTranPwd = (rule, value, callback) => {
            if (String(value).length != 6) {
                callback(new Error('交易密码格式错误'));
                return false;
            }
            callback();
        };
        var validLoginPwd = (rule, value, callback) => {
            if (!validate.validatLoginPwd(value)) {
                callback(new Error('登陆密码格式错误'));
                return false;
            }
            callback();
        };
        return {
            bg: {
                backgroundImage: "url(" + require("@/assets/images/personBJ.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
             bgbei: {
                backgroundImage: "url(" + require("./img/youd.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
             bgbeia: {
                backgroundImage: "url(" + require("./img/youc.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
			bgbeiawu: {
                backgroundImage: "url(" + require("./img/keyongwu.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            bgbeiawuy: {
                backgroundImage: "url(" + require("./img/bukeyongwu.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            storad: [
                { label: '全部 ', id: null },
                { label: '转让中，待承接 ', id: '0' },
                { label: '预付款到账中', id: '-1' },
                { label: '锁定中', id: '1' },
                { label: '已转让(已承接)', id: '2' },
                { label: '已申诉', id: '3' },
                { label: '已下架', id: '4' },
                { label: '冻结审核 [已转让]', id: '5' },
                { label: '待转让人支付', id: '11' },
                { label: '等待承接人上传凭证', id: '12' },
                { label: '待转让人确认转账至承接人', id: '13' },
                { label: '转让人延长付款中', id: '14' },
                { label: '转让成功', id: '15' },
                { label: '申诉中', id: '20' },
                { label: '申诉成功', id: '21' },
                { label: '申诉失败 ', id: '22' },
                { label: '冻结审核中', id: '30' },
                { label: '冻结审核通过', id: '31' },
                { label: '冻结审核失败', id: '32' },

            ],
            list: [
                { title: '账户首页', index: 0, isShow: false },
                { title: '我的转让', index: 1, isShow: false },
                { title: '我的承接', index: 2, isShow: false },
                { 
                	title: '存证保全', index: 3, isShow: false,isShowa: true,
                	list2:[
                		{
                			title2:'P2P合同',
                			index: 0, isShow: false,
                		},{
                			title2:'欠条',	
                			index: 1, isShow: false,
                		}
                	]
                },
                { title: '邀请有礼', index: 4, isShow: false },
                { title: '我的福利', index: 5, isShow: false },
                { title: '资金流水', index: 6, isShow: false },
                { title: '消息中心', index: 7, isShow: false },
                { title: '安全中心', index: 8, isShow: false },
            ],
            yanqingdh:[
            { title: '邀请有礼', index: 1, isShow: true },
            { title: '我的邀请', index: 2, isShow: false },
            ],
            yanqingdf:[
            { title: '未使用', index: 1, isShow: true },
            { title: '已使用', index: 2, isShow: false },
            { title: '已过期', index: 3, isShow: false },
            ],
            centerfulishuming:false,
            centerDialogVisible:false,//分享
            dizhia:'',
            phone: '',
            response: {},
            orderSummary: {
                master: { appeal: '', complete: '', freeze: '', lockOn: '', soldOut: '', waiting: '' },
                slave: { appeal: '', complete: '', freeze: '', lockOn: '', soldOut: '', waiting: '' }
            },
            optionParams: {
                page: 1,
                limit: 10,
                status: null
            },//我的p2p转让
            loanParams: {
                page: 1,
                limit: 10,
                status: null,
            },//我的借条转让
            dialogOperate: false,//操作说明弹框
            dialogOperateShow: '',//1转让  2承接
            transferData: [],//我的转让table数据
            transferDataTotal: null,
            loansDataTotal:null,
            transferList: [
                { code: null, text: '全部' },
                { code: 0, text: '转让中' },
                { code: 1, text: '锁定中' },
                { code: 2, text: '已转让(已承接)' },
                { code: 9, text: '申诉中' },//已申诉/冻结
                { code: 4, text: '已下架' },
                { code: 5, text: '审核中' },
                { code: -1, text: '预付款' },
                { code: 11, text: '冻结中' },
            ],
            transferLista: [
                { code: null, text: '全部' },
                { code: 0, text: '转让中' },
                { code: 1, text: '锁定中' },
                { code: 2, text: '已转让' },
                { code: 4, text: '已下架' },
            ],
            listLoading: true,
            tabShow: false,//充值tab
            cashShow: false,//充值展示
            confirmBox: {//充值参数
                amount: '',
                realAmount:'0.00',
                userCardId: '',
                //validatecode: '',
                requestno: '',
            },
            cashBox: {//提现参数
                realAmount: '0.00',
                fare: '0.00',
                amount: '',
                transPassword: ''
            },
            count1: '',
            isSend1: true,
            count2: '',
            isSend2: true,
            count3: '',
            isSend3: true,
            sendShow1: false,
            rechargeShow: false,//提现展示
            tabNewShow: true,//消息tab
            newsList: [],//消息列表
            newsListTotal: null,
            activeNames: "0",
            newsOptionParams: {
                page: 1,
                limit: 10,
                type: 1
            },
            bankList: [],//银行卡
            bankBg: {
                height: ''
            },
            cardCheckList: [], //银行卡选择
            bankCheckList: [   //网银支付银行卡选择
                { bankCode: "01030000", selectedImg: require("@/assets/images/1.png"), img: require("@/assets/images/bank1.png"), isSeleted: true },
                { bankCode: "01040000", selectedImg: require("@/assets/images/2.png"), img: require("@/assets/images/bank2.png"), isSeleted: false },
                { bankCode: "01050000", selectedImg: require("@/assets/images/3.png"), img: require("@/assets/images/bank3.png"), isSeleted: false },
               	{ bankCode: "03030000", selectedImg: require("@/assets/images/4.png"), img: require("@/assets/images/bank4.png"), isSeleted: false },
                { bankCode: "03090000", selectedImg: require("@/assets/images/5.png"), img: require("@/assets/images/bank5.png"), isSeleted: false },
                { bankCode: "03050000", selectedImg: require("@/assets/images/6.png"), img: require("@/assets/images/bank6.png"), isSeleted: false },
                { bankCode: "03020000", selectedImg: require("@/assets/images/7.png"), img: require("@/assets/images/bank7.png"), isSeleted: false },
               	{ bankCode: "03060000", selectedImg: require("@/assets/images/8.png"), img: require("@/assets/images/bank8.png"), isSeleted: false },
                { bankCode: "03100000", selectedImg: require("@/assets/images/9.png"), img: require("@/assets/images/bank9.png"), isSeleted: false },
                { bankCode: "03070000", selectedImg: require("@/assets/images/10.png"), img: require("@/assets/images/bank10.png"), isSeleted: false },
                { bankCode: "01020000", selectedImg: require("@/assets/images/11.png"), img: require("@/assets/images/bank11.png"), isSeleted: false },
                { bankCode: "03080000", selectedImg: require("@/assets/images/12.png"), img: require("@/assets/images/bank12.png"), isSeleted: false },
                
                { bankCode: "04031000", selectedImg: require("@/assets/images/13.png"), img: require("@/assets/images/bank13.png"), isSeleted: false },
                { bankCode: "03040000", selectedImg: require("@/assets/images/14.png"), img: require("@/assets/images/bank14.png"), isSeleted: false },
                { bankCode: "01000000", selectedImg: require("@/assets/images/15.png"), img: require("@/assets/images/bank15.png"), isSeleted: false }
            ],
            seleckCode: 'ABC-NET-B2B',//网银支付银行卡选中
            dialogBindCard: false,
            BindCardForm: {
                bankCardNo: '', //银行卡号
                idCard: '', //身份证号码 bankCardNo idCard checkCode
               // phone: '', //手机号码
                username: '', //用户姓名
               // checkCode: '', //验证码
                requestno: '',
                callback: 'https://www.bsnzz.com/personalCenter/index',
            },
            listtype: [
                { title: 'P2P债权', index: 0, isShow: true },
                { title: '借条债权', index: 1, isShow: false },
            ],
            listtypea: [
                { title: 'P2P债权', index: 0, isShow: true },
                { title: '借条债权', index: 1, isShow: false },
            ],
            bankBackground: {
                backgroundImage: "url(" + require("@/assets/images/bank.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center",
                'line-height':' 50px',
               'text-align': 'center',
            },
            //存证保全
            baozhen:false,
            flowList: [],//资金流水
            flowListTotal: null,
            flowListLoading: true,
            flowParams: {
                page: 1,
                limit: 10,
                type: 0
            },
            stateList: [//流水类型0：全部 1 :充值 2：提现相关 3：折扣金出账 4：折扣金入账
                { code: 0, text: '全部' },
                { code: 8, text: '佣金' },
                { code: 1, text: '充值' },
                { code: 2, text: '提现相关' },
                { code: 4, text: '折扣金出账' },
                { code: 3, text: '折扣金入账' },
                { code: 9, text: '其他' },
            ],
            undertakeParams: {
                page: 1,
                limit: 10,
                status: null	
            },
            undertakeList: [//承接类型10 锁定中  20 已承接   40 申诉中 50 已冻结 60 承接失败
                { code: null, text: '全部' },
                { code: 10, text: '锁定中' },
                { code: 20, text: '已承接' },
                { code: 40, text: '申诉中' },
                { code: 50, text: '冻结中' },
                { code: 60, text: '承接失败' },
            ],
            undertakeLista: [//承接类型10 锁定中  20 已承接   40 申诉中 50 已冻结 60 承接失败
                { code: null, text: '全部' },
                { code: 1, text: '待付款' },
                { code: 2, text: '已承接 ' },
                { code: 4, text: '已下架' },
            ],
            undertakeData: [],//我的承接table数据
            undertakeDataTotal: null,
            undertakeListLoading: true,
            /* S我的承接借条table数据S */
            undertakeiouParams: {
                page: 1,
                limit: 10,
                status: null	
            },
            undertakeiouList: [//承接类型10 锁定中  20 已承接   40 申诉中 50 已冻结 60 承接失败
                { code: null, text: '全部' },
                { code: 10, text: '锁定中' },
                { code: 20, text: '已承接' },
                { code: 40, text: '申诉中' },
                { code: 50, text: '冻结中' },
                { code: 60, text: '承接失败' },
            ],
            undertakeiouData: [],//我的承接table数据
            undertakeiouDataTotal: null,
            undertakeiouListLoading: true,
            /* E我的承接借条table数据E */
            dialogModifyPhone: false,//修改手机号dialog
            modifyPhoneForm: {//修改手机号
                bankcardnum: '',
                checkcode: '',
                newphone: '',
                pwd: '',
            },
            isSend: true,
            sendShow: false,
            count: '',
            timer: null,
            dialogTradePwd: false,
            tradePwdForm: {//设置交易密码
                tranPwd: '',
                tranPwdTwo: ''
            },
            dialogEditTradePwd: false,
            tradeEditTradePwdForm: {//修改交易密码
                oldtranPwd: '',
                newtranPwd: '',
                newtranPwdTwo: ''
            },
            dialogEditLoginPwd: false,
            loginPwdForm: {//修改登陆密码
                newPwd: '',
                oldPwd: '',
                newPwdTwo: ''
            },
            dialogEditLoginQQ:false,
            setupqq:{
            	qqCode:'',
            },
            undertakeanquan:[],//存证保全数据
            tatles:'',
            undertakeData1: [],//上传数据
            //创建文件
            aftertt:{
            	type:'1',
            	value7:[],
            	bdAmount:'',//标的金额
            	bdName:'',//标的名称
            	loansAmount:'',//借款金额
            	loansBeginTime:'',//借款开始时间
            	loansEndTime:'',//借款结束时间
            	loansMaster:'',//出借人
            	loansSlave:'',//借款人
            	name:'',//名称
            	remark:'',//备注
            },
            wenjian:'',
            numbt:'',//放上级状态
            detailsall:'3',
            detailtahtong:{
            	value7:[],
            },//详情数据
            filesa:'',//p2p上
            numx:false,//修改文件夹显示
            numw:false,
            baozhenlie:{
            	page: 1,
                limit: 10,
                type: '0',
            },
            hetongtal:'',
            hetongLoading:false,
            titshang:'上传',//上传提示
            detailzhi:{
            	page: 1,
                limit: 10,
                groupId:'',
            },
            hejinzhi:true,//修改禁止
            qianjinzhi:true,//修改禁止
            hetongwtal:0,
            hexiugai:false,
            qianxiugai:false,
            value1:[],
            meiyoushang:true,
            rules: {
                bankcardnum: [{ required: true, message: "银行卡卡号不能为空", trigger: "blur" }],
                checkcode: [{ required: true, message: "手机验证码不能为空", trigger: "blur" }],
                newphone: [
                    { required: true, message: '请输入新手机号码', trigger: 'blur' },
                    // { validator: validPhone, trigger: 'blur' },
                ],
                pwd: [{ required: true, message: "登录密码不能为空", trigger: "blur" }],
                tranPwd: [
                    { required: true, message: "交易密码不能为空", trigger: "blur" },
                    { validator: validTranPwd, trigger: 'blur' }
                ],
                oldtranPwd: [
                    { required: true, message: "旧交易密码不能为空", trigger: "blur" },
                    { validator: validTranPwd, trigger: 'blur' }
                ],
                newtranPwd: [
                    { required: true, message: "交易密码不能为空", trigger: "blur" },
                    { validator: validTranPwd, trigger: 'blur' }
                ],
                newtranPwdTwo: [
                    { required: true, message: "交易密码不能为空", trigger: "blur" },
                    { validator: validTranPwd, trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: "登陆密码不能为空", trigger: "blur" },
                    { validator: validLoginPwd, trigger: 'blur' }
                ],
                oldPwd: [
                    { required: true, message: "旧登陆密码不能为空", trigger: "blur" },
                    { validator: validLoginPwd, trigger: 'blur' }
                ],
                newPwdTwo: [
                    { required: true, message: "登陆密码不能为空", trigger: "blur" },
                    { validator: validLoginPwd, trigger: 'blur' }
                ],
                extendTime: [
                    { required: true, message: "延长时间不能为空", trigger: "blur" }
                ],
                remark: [{ required: true, message: "延长理由不能为空", trigger: "blur" }],
                username: [{ required: true, message: "请输入", trigger: "blur" }],
                bankCardNo: [
                    { required: true, message: "请输入", trigger: "blur" }],
                idCard: [{ required: true, message: "请输入", trigger: "blur" }],
                checkCode: [{ required: true, message: "请输入", trigger: "blur" }],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    // { validator: validPhone, trigger: 'blur' },
                ],
            },
            delayDataShow: false,
            delayDataShow1: false,
            delayData: {
                orderTranId: '',
                extendTime: '',
                remark: '',
            },
            //上传图片地址
            imgId: '',
            imageUrl: '',
            status: 'ready',
            files: [],
            point: {},
            uploading: false,
            percent: 0,
            img: '',
            dizhi:'',
            pfNameList:[],
            kzzet:'',
            kzzeta:'',
            myinvitation:{},//我邀请数据
            yaoqinglieliea:{
            	page: 1,
                limit: 10,
            },
            myinvitationa:[],
            myinvitattal:0,
            coupons:{
            	page: 1,
                limit: 10,
                isExpired:0,
                status:0,
            },
            dikoujuan:[],
            dikoujuantotal:0,
            loansData:[],//我的借条数据
            type: [//订单类型:1、个人借条 2、小贷(金融)借条
                { key: '个人借条', value: '1' },
                { key: '小贷借条', value: '2' }
            ],
            dialogEditLoginZR:false,//下架原因
            optionsyuan:[
            	{
		          value: '1',
		          label: '再次发起'
		        }, {
		          value: '2',
		          label: '订单下架'
		        },
            ],
            setupyuan:{
            	value:'',
            	remark:'',
            	loansId:'',
            },
        }
    },
    computed: {
    },
    created() {
    	this.dizhi = baseURL() +'evidence/upload_evidence'
        this.getTable();
        this.getOrderSummary();
        let index = this.$route.query.index ? this.$route.query.index : 0;
        let dailogShow = this.$route.query.dailogShow ? this.$route.query.dailogShow : false;
        let transOrderId = this.$route.query.transOrderId ? this.$route.query.transOrderId : '';
        console.log(dailogShow)
        console.log(transOrderId)
        if(dailogShow == true || dailogShow == 'true'){
        	this.centerDialogVisible = true
        	this.dizhia = 'https://www.bsnzz.com/debtList/detail?id=' + transOrderId
        }
        
        this.selectIndex(index);
         this.selectIndexa(0);
         this.loadAll()
         this.yaoqingliea()
         this.yaoqinglielie()
    },
    mounted() {
    },
    methods: {
    	//qq号吗判单 必须输入数字
    	qqpanduan(){
    		var dds = /^[0-9]*$/
    		if (!dds.test(this.setupqq.qqCode)) {
				this.$message.error('qq号不合法');
				this.setupqq.qqCode = ''
				return false;
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
        shareBoxa() {
			var url = document.getElementById("cpLinka");
		    url.select();
		    document.execCommand("copy");
		   	this.$message.success('复制成功');
		   	this.centerDialogVisible=false;
            return
        },
        shareBoxb() {
			var url = document.getElementById("cpLinkaa");
		    url.select();
		    document.execCommand("copy");
		   	this.$message.success('复制成功');
		   	this.centerDialogVisible=false;
            return
        },
        openUrl(val) {
            window.open(val);
        },
        goUrl(val) {
            window.open(val);
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background: rgba(57,99,208,1);color:rgba(255,255,255,1);'
            } else {
                return ''
            }
        },
        //获取用户基本信息
        getTable() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {}
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                        this.response = res.data ? res.data : {}; //http://192.168.0.121:8081/web/xdm/registeredBenefits.html
                        this.kzzet = this.response.inviteCode   //https://www.bsnzz.com/h5/new_features/action/broughtwelfare/registeredBenefits.html
                        this.kzzeta = 'https://www.bsnzz.com/invite?inviteCode='+this.response.inviteCode
                        this.phone = this.response.phone.substr(0, 3) + '****' + this.response.phone.substr(7);
                    } else {
                        // console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //选项卡切换
        selectIndex(val) {
            this.rechargeShow = false;
            this.cashShow = false;
            this.$store.dispatch('SETISCOLLAPSE', { isCollapse: true });
            if (val === '0'||val === 0) {
            	this.baozhen = false
                this.getTable();
                this.getOrderSummary();
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            } else if (val === '1'||val === 1) {
            	this.baozhen = false
                this.$store.dispatch('SETISCOLLAPSE', { isCollapse: false });
                this.getTransferTable();
                this.getLoansTable();
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            } else if (val === '2'||val === 2) {
            	this.baozhen = false
                this.$store.dispatch('SETISCOLLAPSE', { isCollapse: false });
                this.getUndertake();
                this.getUndertakeiou();
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            }else if (val === '3'||val === 3) {
				this.baozhen = true
                this.undertakeanquan.map((itm)=>{
                	this.$set(itm, 'mingzixuan', false)
                	this.$set(itm, 'gming', false)
                	this.$set(itm, 'gengm', false)
                })
            }
            else if (val === '4'||val === 4) {
            	this.baozhen = false
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            }else if (val === '5'||val === 5) {
            	this.coupons.status = 0
            	this.myfuli()
            	this.baozhen = false
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            }
            else if (val === '6'||val === 6) {
            	this.baozhen = false
                this.getFlow();
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            } else if (val === '7'||val === 7) {
            	this.baozhen = false
                this.getNewList(this.tabNewShow);
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            } else if (val === '8'||val === 8) {
            	this.baozhen = false
                this.getBankList();
                this.list[3].list2[0].isShow = true
        		this.list[3].list2[1].isShow = false
        		this.wenjian = ''
        		this.detailsall = '3'
            }
            this.list[0].isShow = false;
            this.list[1].isShow = false;
            this.list[2].isShow = false;
            this.list[3].isShow = false;
            this.list[4].isShow = false;
            this.list[5].isShow = false;
            this.list[6].isShow = false;
            this.list[7].isShow = false;
            this.list[8].isShow = false;
            this.list[val].isShow = true;
            // this.list.forEach((item,index)=>{
            //     item.isShow = false;

            // })
            // this.list[val].isShow = true;
        },
        toptypeti(val){
				if (val === '0'||val === 0) {
					
				}else if(val === '1'||val === 1){
					// this.getLoansTable();
				}
				this.listtype[0].isShow = false;
		        this.listtype[1].isShow = false;
		        this.listtype[val].isShow = true;
		},
		toptypetia(val){
				if (val === '0'||val === 0) {
					
				}else if(val === '1'||val === 1){
				}
				this.listtypea[0].isShow = false;
		        this.listtypea[1].isShow = false;
		        this.listtypea[val].isShow = true;
		},
        selectIndexa(val){
        	this.wenjian = ''
        	this.detailsall = '3'
        	this.numbt = val
        	this.list[3].list2[0].isShow = false
        	this.list[3].list2[1].isShow = false
        	this.list[3].list2[val].isShow = true;
        	if(val == 0){
        		this.baozhenlie.type = '1'
        	}else{
        		this.baozhenlie.type = '2'
        	}
        	 ajax({
                url: 'evidence/group_page',
                optionParams:this.baozhenlie
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.undertakeanquan = response.data.records ? response.data.records : [];
                        this.undertakeanquan.map((itm)=>{
                        	this.$set(itm, 'mingzixuan', false)
                        	this.$set(itm, 'gming', false)
                        	this.$set(itm, 'gengm', false)
                        })
                        this.hetongtal = response.data.total
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //创建文件夹
        folder(num){
        	this.wenjian = 1
        	this.numbt = num
        	this.list[3].list2[num].isShow = false
        	this.list[3].list2[num].isShow = false
        	if(num == 0){
        		this.aftertt.type = '1'
        	}else if(num == 1){
        		this.aftertt.type = '2'
        	}
        },
        //修改文件家
        xiugaiw(row){
        	console.log(row)
        	console.log(this.numx)
        	if(this.numx == false){
        		this.undertakeanquan.map((itm)=>{
	        		if(row.id == itm.id){
	        			this.$set(itm, 'mingzixuan', true)
	        		}else{
	        			this.$set(itm, 'mingzixuan', false)
	        		}
	            })
        		this.numx = true
        	}else if(this.numx  == true){
        		this.undertakeanquan.map((itm)=>{
	        		this.$set(itm, 'mingzixuan', false)
	            })
        		this.numx = false
        	}
        	
        },
        //文件修改文件家
        wenxiugaiw(row){
        	console.log(row)
        	if(this.numw == false){
        		this.undertakeData1.map((itm)=>{
	        		if(row.id == itm.id){
	        			this.$set(itm, 'mingzixuan', true)
	        		}else{
	        			this.$set(itm, 'mingzixuan', false)
	        		}
	            })
        		this.numw = true
        	}else if(this.numw  == true){
        		this.undertakeData1.map((itm)=>{
	        		this.$set(itm, 'mingzixuan', false)
	            })
        		this.numw = false
        	}
        	
        },
        //更改文件夹名字
        gengmingzi(row){
        	this.undertakeanquan.map((itm)=>{
        		if(row.id == itm.id){
        			this.$set(itm, 'gming', true)
        		}else{
        			this.$set(itm, 'gming', false)
        		}
        		this.$set(itm, 'mingzixuan', false)
        		this.numx = false
            })
        },
        //更改文件
        gengmingziw(row){
        	this.undertakeData1.map((itm)=>{
        		if(row.id == itm.id){
        			this.$set(itm, 'gming', true)
        			console.log(itm.fileName)
        		}else{
        			this.$set(itm, 'gming', false)
        		}
        		this.$set(itm, 'mingzixuan', false)
        		this.numw = false
            })
        },
        //修改提交
        namequ(){
        	this.undertakeanquan.map((itm)=>{
        		this.$set(itm, 'gming', false)
            })
        },
         //修改提交
        namequw(){
        	this.undertakeData1.map((itm)=>{
        		this.$set(itm, 'gming', false)
            })
        },
        //删除文件家
        deltsan(row,num){
        	 this.$confirm('是否删除', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
	                url: 'evidence/group/del',
		                optionParams: {
		                	id:row.id,
		                }
		            }).post()
		            .then(response => {
		                if (response.code === 200) {
		                   this.selectIndexa(num)
		                   this.namequ()
		                    this.$message.success(response.message);
		                    this.numx = false
		                }else{
		                	this.$message.success(response.message);
		                }
		            })
		            .catch(error => {
		                console.log(error)
		            })
            }).catch(() => {
            });
        	 
        },
        //删除文件
        deltsanw(row,num){
        	 this.$confirm('是否删除', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
	                url: 'evidence/del',
		                optionParams: {
		                	id:row.id,
		                }
		            }).post()
		            .then(response => {
		                if (response.code === 200) {
		                	this.detailta(this.numbt,this.detailtahtong)
		                    this.$message.success(response.message);
		                    this.numw = false
		                }else{
		                	this.$message.success(response.message);
		                }
		            })
		            .catch(error => {
		                console.log(error)
		            })
            }).catch(() => {
            });
        	 
        },
        pingzheng(row,num){
        	console.log(row)
        	row.mingzixuan = false
        	window.open(row.eviUrl)
        },
        yulangtu(row,num){
        	console.log(row)
        	row.mingzixuan = false
        	window.open(row.ossUrl)
        },
        //修改提交
        namegai(row,num){
        	 ajax({
                url: 'evidence/group/edit',
                optionParams: {
                	id:row.id,
                	name:row.name
                }
            }).post()
            .then(response => {
                if (response.code === 200) {
                   this.selectIndexa(num)
                   this.namequ()
                    this.$message.success(response.message);
                    this.numx = false
                }else{
                	this.$message.success(response.message);
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
         //修改提交
        namegaiw(row,num){
        	 ajax({
                url: 'evidence/rename',
                optionParams: {
                	id:row.id,
                	fileName:row.fileName
                }
            }).post()
            .then(response => {
                if (response.code === 200) {
                	this.detailta(this.numbt,this.detailtahtong)
                   	this.namequw()
                    this.$message.success(response.message);
                    this.numw = false
                }else{
                	this.$message.success(response.message);
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        //返回上级
        shangji(){
        	console.log(this.numbt)
        	this.list[3].list2[this.numbt].isShow = true;
        	this.wenjian = ''
        	this.detailsall = '3'
        	if(this.numbt == 0){
        		this.baozhenlie.type = '1'
        	}else{
        		this.baozhenlie.type = '2'
        	}
        	
        	ajax({
                url: 'evidence/group_page',
                optionParams:this.baozhenlie
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.undertakeanquan = response.data.records ? response.data.records : [];
                        this.undertakeanquan.map((itm)=>{
                        	this.$set(itm, 'mingzixuan', false)
                        	this.$set(itm, 'gming', false)
                        })
                        this.hetongtal = response.data.total
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //详情
        detailta(numb,row){
        	console.log(row)
        	this.value1 = []
        	this.numbt = numb
        	console.log(this.numbt)
        	this.detailsall = numb
        	this.list[3].list2[numb].isShow = false
        	this.list[3].list2[numb].isShow = false //detailzhi
        	this.wenjian = ''
        	this.detailtahtong = row
      		this.value1.push(new Date(row.loansBeginTime)) 
      		this.value1.push(new Date(row.loansEndTime)) 
      		console.log(this.value1)
        	this.detailzhi.groupId = row.id
        	ajax({
                url: 'evidence/page',
                optionParams:this.detailzhi
            }).post()
                .then(response => {
                    if (response.code === 200) {
                    	this.meiyoushang = false	
                    	if(response.data.records == ''){
                    		this.meiyoushang = true
                    	}
                        this.undertakeData1 = response.data.records ? response.data.records : []; 
                         this.undertakeData1.map((itm)=>{
                         	var arr = itm.fileName.split('.');
							var suffix = arr[arr.length-1]
							var suffixa = arr[arr.length-arr.length]
							this.$set(itm, 'fileName', suffixa)
							this.$set(itm, 'suffix', suffix)
                        	this.$set(itm, 'mingzixuan', false)
                        	this.$set(itm, 'gming', false)
                        	this.$set(itm, 'gengm', false)
                        })
                         this.hetongwtal = response.data.total
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //详情保存
        baocunxiu(nnum){
        	if(nnum == 0){
        		if(this.hexiugai == false){
        		this.hejinzhi = false
        		this.hexiugai = true
        		return false
	        	}
	        	this.hexiugai = false
	        	this.hejinzhi = true
        	}
        	if(nnum == 1){
        		if(this.qianxiugai == false){
        		this.qianjinzhi = false
        		this.qianxiugai = true
        		return false
	        	}
        		this.qianxiugai = false
	        	this.qianjinzhi = true
	        	let date = this.value1 ? this.value1 : []; //时间控件清除为null
	      		this.detailtahtong.loansBeginTime = parseTime(date[0], '{y}-{m}-{d} {h}:{i}:{s}');
	            this.detailtahtong.loansEndTime = parseTime(date[1], '{y}-{m}-{d} {h}:{i}:{s}');
        	}
        	ajax({
                url: 'evidence/group/edit',
                optionParams: this.detailtahtong
            }).post()
            .then(response => {
                if (response.code === 200) {
                	this.$message.success(response.message);
                	this.value1 = []
                   this.detailta(this.numbt,this.detailtahtong)
                }else{
                	this.$message.error(response.message);
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        biaoti(){
    		var dds = /^[0-9]*$/
    		if (!dds.test(this.aftertt.bdAmount)) {
				this.$message.error('标的金额必须为数字');
				this.aftertt.bdAmount = ''
				return false;
			}
    	},
    	 biaotia(){
    		var dds = /^[0-9]*$/
    		if (!dds.test(this.aftertt.loansAmount)) {
				this.$message.error('借款金额必须为数字');
				this.aftertt.loansAmount = ''
				return false;
			}
    	},
        //文件夹创建提交
        sumwenjian(){
        	if(this.aftertt.type == 1){
        		if(this.aftertt.name == ""){
        			this.$message.error('请输入文件夹名称！');
        			return false
        		}
        		if(this.aftertt.bdName == ""){
        			this.$message.error('请输入标的名称！');
        			return false
        		}
        		if(this.aftertt.bdAmount == ""){
        			this.$message.error('请输入标的金额！');
        			return false
        		}
        		this.numbt = 0
        	}
        	if(this.aftertt.type == 2){
        		if(this.aftertt.name == ""){
        			this.$message.error('请输入文件夹名称！');
        			return false
        		}
        		if(this.aftertt.loansSlave == ""){
        			this.$message.error('请输入借款人！');
        			return false
        		}
        		if(this.aftertt.loansAmount == ""){
        			this.$message.error('请输入借款金额！');
        			return false
        		}
        		if(this.aftertt.loansMaster == ""){
        			this.$message.error('请输入出借人！');
        			return false
        		}
        		if(this.aftertt.value7 == ""){
        			this.$message.error('请输入借款期限！');
        			return false
        		}
        		this.numbt = 1
        	}
        	let date = this.aftertt.value7 ? this.aftertt.value7 : []; //时间控件清除为null
            this.aftertt.loansBeginTime = parseTime(date[0], '{y}-{m}-{d} {h}:{i}:{s}');
            this.aftertt.loansEndTime = parseTime(date[1], '{y}-{m}-{d} {h}:{i}:{s}');
            console.log(this.aftertt)
             console.log(this.aftertt.type)
             console.log(this.numbt)
        	ajax({
                url: 'evidence/group/add',
                optionParams: this.aftertt
            }).post()
                .then(response => {
                    if (response.code === 200) {
                       this.$message.success(response.message);
                       this.detailta(this.numbt,response.data)
                        this.aftertt={
			            	type:'1',
			            	value7:[],
			            	bdAmount:'',//标的金额
			            	bdName:'',//标的名称
			            	loansAmount:'',//借款金额
			            	loansBeginTime:'',//借款开始时间
			            	loansEndTime:'',//借款结束时间
			            	loansMaster:'',//出借人
			            	loansSlave:'',//借款人
			            	name:'',//名称
			            	remark:'',//备注
			            }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //文件夹
        selectStyle (itme){
          	itme.gengm = true
          },
          outStyle (itme){
          	itme.gengm = false
          },
          xiaoshik(itme){
          	itme.mingzixuan = false
          },
          //文件夹
        selectStylea (itme){
          	itme.gengm = true
          },
          outStylea (itme){
          	itme.gengm = false
          },
          xiaoshika(itme){
          	itme.mingzixuan = false
          },
        //提示绑卡
        warnBank() {
            if(this.response.isBindCard===0){
                this.$message.error('请先前往安全中心绑定银行卡！');
                this.selectIndex(8);
            }
            if(this.response.isSetTranspwd===0){
                this.selectIndex(8);
                this.$message.error('请先前往安全中心设置交易密码！');
            }
        },
        resetWord(val) {
            if(this.response.isBindCard===0){
                this.$message.error('请先前往安全中心绑定银行卡！');
                this.selectIndex(8);
                return false;
            }
            if(this.response.isSetTranspwd===0){
                this.selectIndex(8);
                this.$message.error('请先前往安全中心设置交易密码！');
                return false;
            }
            this.$router.push({path:'/saleClaim/payBird', query:{data: JSON.stringify(val)}});
        },
        //用户订单统计
        getOrderSummary() {
            ajax({
                url: 'orderTransfer/userOrderSummary',
                optionParams: {}
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                        this.orderSummary = res.data ? res.data : {};
                    } else {
                        // console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //转让中获取列表
        getTransferTable() {
            ajax({
                url: 'orderTransfer/mineTransfer',
                optionParams: this.optionParams
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.transferData = response.data.records ? response.data.records : [];
                        this.transferDataTotal = response.data.total;
                        this.listLoading = false;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //转让中取消订单
        openUrlyuan(row){
        	this.dialogEditLoginZR = true
        	this.setupyuan.loansId = row.id
        },
        submitLoginyuanForm(){
        	if(this.setupyuan.value == ''){
        		this.$message.error('请选择处理方式');
        		return false
        	}if(this.setupyuan.remark == ''){
        		this.$message.error('请输入原因');
        		return false
        	}
        	if(this.setupyuan.value == 1){
        		ajax({
	                url: 'order_loans/recall',
	                optionParams: this.setupyuan
	            }).post()
	                .then(response => {
	                    if (response.code === 200) {
	                        this.dialogEditLoginZR = false
	                        this.setupyuan={
	                        	value:'',
				            	remark:'',
				            	loansId:'',
	                        }
	                    }
	                })
	                .catch(error => {
	                    console.log(error)
	                })
        	}else if(this.setupyuan.value == 2){
        		ajax({
	                url: 'order_loans/cancel',
	                optionParams: this.setupyuan
	            }).post()
	                .then(response => {
	                    if (response.code === 200) {
	                        this.dialogEditLoginZR = false
	                         this.setupyuan={
	                        	value:'',
				            	remark:'',
				            	loansId:'',
	                        }
	                    }
	                })
	                .catch(error => {
	                    console.log(error)
	                })
        	}
        },
        //转让中获取列表
        getLoansTable() {
            ajax({
                url: 'order_loans/mine_loans',
                optionParams: this.loanParams
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.loansData = response.data.records ? response.data.records : [];
                        this.loansDataTotal = response.data.total;
                        this.listLoading = false;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //查看失败原因
        lookFailReason(val) {
            this.$alert('失败原因:' + val.msg, '查看失败原因', {
                confirmButtonText: '确定',
                callback: action => {
                    // this.$message({
                    // type: 'info',
                    // message: `action: ${ action }`
                    // });
                }
            });
        },
        //邀请有礼
        yaoqingy(row,index){
        	this.yanqingdh.map((itm)=>{
        		itm.isShow = false
        	})
        	row.isShow = true
        	console.log(index)
        	if(index == 0){
        		//this.yaoqinglie()
        	}else if(index == 1){
        		this.yaoqingliea()
        		this.yaoqinglielie()
        	}
        },
//      yaoqinglie(){
//      	ajax({
//              url: 'tAppUser/invite_url',
//              optionParams: {}
//          }).fetch()
//              .then(res => {
//                  if (res.code === 200) {
//                      this.kzzeta = res.data
//                  } else {
//                      // console.log(response)
//                  }
//
//              })
//              .catch(error => {
//                  console.log(error)
//              })
//      },
        //我的邀请
        yaoqingliea(){
        	ajax({
                url: 'tAppUser/my_invite',
                optionParams: {}
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                    	this.myinvitation = res.data
                    } else {
                        // console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        yaoqinglielie(){
        	ajax({
                url: 'tAppUser/my_invite_list',
                optionParams: this.yaoqinglieliea
            }).post()
                .then(res => {
                    if (res.code === 200) {
                    	this.myinvitationa =res.data.records ? res.data.records : []
                    	this.myinvitattal = res.data.total
                    } else {
                        // console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //我的福利
        yaoqingf(row,index){
        	this.yanqingdf.map((itm)=>{
        		itm.isShow = false
        	})
        	row.isShow = true
        	if(index == 0){
        		this.coupons.isExpired = 0
        		this.coupons.status = 0
        		this.myfuli()
        	}else if(index == 1){
        		this.coupons.isExpired = 0
        		this.coupons.status = 1
        		this.myfuli()
        	}else if(index == 2){
        		this.coupons.isExpired = 1
        		this.coupons.status = 0
        		this.myfuli()
        	}
        },
        myfuli(){
        	ajax({
                url: 'user_coupon/page',
                optionParams: this.coupons
            }).post()
                .then(res => {
                    if (res.code === 200) {
                    	this.dikoujuan = res.data.records
                    	this.dikoujuantotal = res.data.total
                    } else {
                        // console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        
        
         //我的承接  借条
          handleSizeTotal(val) {
            this. loanParams.limit = val;
            this.getLoansTable();
        },
        // 切换页码
        handleCurrentTotal(val) {
            this. loanParams.page = val;
           this.getLoansTable();
        },
        
        
        
        //礼卷分页
         // 改变每一页的条数
        dikoujuanChange(val) {
            this.coupons.limit = val;
            this.myfuli();
        },
        // 切换页码
        dikoujuantPageChange(val) {
            this.coupons.page = val;
           this.myfuli();
        },
        
        
        //邀请好友分页
         yaoqinglielieatali(val) {
            this.yaoqinglieliea.limit = val;
            this.yaoqinglielie();
        },
        // 切换页码
        yaoqinglielieatalia(val) {
            this.yaoqinglieliea.page = val;
           this.yaoqinglielie();
        },
        
        //合同分页
         // 改变每一页的条数
        hetongSizeChange(val) {
            this.baozhenlie.limit = val;
            this.selectIndexa(this.numbt);
        },
        // 切换页码
        hetongPageChange(val) {
            this.baozhenlie.page = val;
           this.selectIndexa(this.numbt);
        },
        //合同文件分页
         // 改变每一页的条数
        hetongwSizeChange(val) {
            this.detailzhi.limit = val;
            this.detailta(this.numbt);
        },
        // 切换页码
        hetongwPageChange(val) {
            this.detailzhi.page = val;
           this.detailta(this.numbt);
        },
        // 改变每一页的条数
        handleSizeChange(val) {
            this.optionParams.limit = val;
            this.getTransferTable();
        },
        // 切换页码
        handleCurrentPageChange(val) {
            this.optionParams.page = val;
            this.getTransferTable();
        },
        // 改变每一页的条数
        flowSizeChange(val) {
            this.flowParams.limit = val;
            this.getFlow();
        },
        // 切换页码
        flowCurrentPageChange(val) {
            this.flowParams.page = val;
            this.getFlow();
        },
        // 改变每一页的条数
        undertakeSizeChange(val) {
            this.undertakeParams.limit = val;
            this.getUndertake();
        },
        // 切换页码
        undertakeCurrentPageChange(val) {
            this.undertakeParams.page = val;
            this.getUndertake();
        },
        // 改变每一页的条数
        undertakeiouSizeChange(val) {
            this.undertakeiouParams.limit = val;
            this.getUndertakeiou();
        },
        // 切换页码
        undertakeiouCurrentPageChange(val) {
            this.undertakeiouParams.page = val;
            this.getUndertakeiou();
        },
        // 改变每一页的条数
        handleNewsSizeChange(val) {
            this.newsOptionParams.limit = val;
            this.getNewList(this.tabNewShow);
        },
        //切换页码
        handleNewsCurrentPageChange(val) {
            this.newsOptionParams.page = val;
            this.getNewList(this.tabNewShow);
        },
        //鼠标悬浮当前行
        handleCurrentChange(val) {

        },
        //资金流水
        getFlow() {
            ajax({
                url: "tAppUser/myfundRecord",
                optionParams: this.flowParams
            }).post()
                .then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.flowList = res.data.records ? res.data.records : [];
                        this.flowListTotal = res.data.total;
                        this.flowListLoading = false;
                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //我的承接table
        getUndertake() {
            ajax({
                url: 'orderTransfer/holdList',
                optionParams: this.undertakeParams
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.undertakeData = response.data.records ? response.data.records : [];
                        this.undertakeDataTotal = response.data.TotalCount;
                        this.undertakeListLoading = false;
                    } else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //我的承接=>借条债权table
        getUndertakeiou(){
            ajax({
                url: 'order_loans/my_hold_list',
                optionParams: this.undertakeiouParams
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.undertakeiouData = response.data.records ? response.data.records : [];
                        this.undertakeiouDataTotal = response.data.total;
                        this.undertakeiouListLoading = false;
                    } else {
                    }
                    console.log(response)

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //我的承接=>借条债权=>取消承接
        cancelUndertaking(loansid){
        	this.$prompt('您正在进行取消，确认后不可恢复, 是否继续?  下方请填写撤销原因', '撤销转让', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((value) => {
                ajax({
                    url: 'order_loans/cancel_hold',
                    optionParams: {
                        loansId: loansid,
                        remark:value.value,
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            this.$message.success(response.message);
                            this.getUndertakeiou();
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
                    message: '已取消撤销'
                });
            });
        	
        	
            
//          ajax({
//              url: 'order_loans/cancel_hold',
//              optionParams: {loansId}
//          }).post()
//              .then(response => {
//                  if (response.code === 200) {
//                      this.getUndertakeiou();
//                  } else {
//                      this.$message.error(response.message);
//                  }
//              })
//              .catch(error => {
//                  console.log(error)
//              })
        },
        //获取消息列表
        getNewList(tabNewShow) {//newsOptionParams
            this.newsOptionParams.type = tabNewShow ? 1 : 2;
            ajax({
                url: "message/center",
                optionParams: this.newsOptionParams
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.newsList = res.data.Messages;
                        this.newsListTotal = res.data.TotalCount;
                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //
        handleChangeNew() {

        },
        //获取短信验证码
        getCheckCode() {
            if (String(this.modifyPhoneForm.newphone).length === 11) {
                ajax({
                    url: 'tAppUser/sendCheckCode',
                    optionParams: {
                        phone: String(this.modifyPhoneForm.newphone)
                    }

                }).post()
                    .then(res => {
                        if (res.code === 200) {
                            this.$message.success(res.message);
                            this.isSend = false;
                            this.count = 60;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= 60) {
                                    this.count--;
                                } else {
                                    this.isSend = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                this.$message.error('输入正确格式的手机号码');
            }
        },
        //提交修改手机号
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    ajax({
                        url: 'tAppUser/UpdBindPhone',
                        optionParams: this.modifyPhoneForm
                    }).post()
                        .then(response => {
                            if (response.code === 200) {
                                this.$message.success(response.message);
                                this.resetForm('modifyPhoneForm');
                                this.dialogModifyPhone = false;
                                this.getTable();
                            } else {
                                this.$message.error(response.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //修改交易密码
        submitEditTradePwdForm(formName) {
            if (this.tradeEditTradePwdForm.newtranPwd === this.tradeEditTradePwdForm.newtranPwdTwo) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ajax({
                            url: 'tAppUser/updTranPwd',
                            optionParams: this.tradeEditTradePwdForm
                        }).post()
                            .then(response => {
                                if (response.code === 200) {
                                    this.$message.success(response.message);
                                    this.resetForm('tradeEditTradePwdForm');
                                    this.dialogEditTradePwd = false;
                                    this.getTable();
                                } else {
                                    this.$message.error(response.message);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                this.$message.error('两次输入的密码不一致');
            }
        },
        //设置交易密码  
        submitTradePwdForm(formName) {
            if (this.tradePwdForm.tranPwd === this.tradePwdForm.tranPwdTwo) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ajax({
                            url: 'tAppUser/setTranPwd',
                            optionParams: {
                                tranPwd: this.tradePwdForm.tranPwd
                            }
                        }).post()
                            .then(response => {
                                if (response.code === 200) {
                                    this.$message.success(response.message);

                                    this.dialogTradePwd = false;
                                    this.getTable();
                                } else {
                                    this.$message.error(response.message);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                this.$message.error('两次输入的密码不一致');
            }
        },
        // 修改登陆密码
        submitLoginPwdForm(formName) {
            console.log(this.loginPwdForm);
            if (this.loginPwdForm.newPwd === this.loginPwdForm.newPwdTwo) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ajax({
                            url: 'tAppUser/updPwd',
                            optionParams: this.loginPwdForm
                        }).post()
                            .then(response => {
                                if (response.code === 200) {
                                    this.$message.success(response.message);
                                    this.resetForm('loginPwdForm');
                                    this.dialogEditLoginPwd = false;
                                    this.getTable();
                                } else {
                                    this.$message.error(response.message);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                this.$message.error('两次输入的密码不一致');
            }
        },
        // qq密码
        submitLoginQQForm(formName) {
            console.log(this.setupqq);
                if(this.setupqq.qqCode == ''){
                	this.$message.error('请输入QQ号吗');
                	return false
                }else{
                	 ajax({
                            url: 'tAppUser/qqCode',
                            optionParams: this.setupqq
                        }).post()
                            .then(response => {
                                if (response.code === 200) {
                                    this.$message.success(response.message);
                                    this.setupqq.qqCode = ''
                                    this.dialogEditLoginQQ = false;
                                    this.getTable();
                                } else {
                                    this.$message.error(response.message);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                }
            
        },
        //获取银行卡信息 userCard/list
        getBankList() {
            this.cardCheckList = [];
            this.bankList = [];
            ajax({
                url: 'userCard/list',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.bankList = response.data;
                        if (this.bankList.length) {
                            this.bankList.forEach((item) => {
                                let obj = {
                                    userCardId: item.id,
                                    bankLogo: item.bankLogo,
                                    isShow: false,
                                    bankName:item.bankName
                                }
                                if (item.isMatser === 1) {
                                    obj.isShow = true;
                                    this.confirmBox.userCardId = item.id;
                                }
                                this.cardCheckList.push(obj);
                            })
                        }
                        // this.bankBg.height = this.cardCheckList.length * 60 + 'px';
                    } else {
                        this.$message.error(response.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        //银行卡选择
        tabSelectOne(index) {
            let _that = this;
            this.cardCheckList.forEach((item) => {
                item.isShow = false;
            })
            this.cardCheckList[index].isShow = true;
            this.confirmBox.userCardId = this.cardCheckList[index].userCardId;
        },
        //网银支付银行卡选择
        tabSelectBank(index) {
            let _that = this;
            this.bankCheckList.forEach((item) => {
                item.isSeleted = false;
            })
            this.bankCheckList[index].isSeleted = true;
            this.seleckCode = this.bankCheckList[index].bankCode;
        },
        //银行卡解绑
        delBankList(val) {
            this.$confirm('确定解绑该张银行卡吗?', '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
                    url: 'userCard/untieCard',
                    optionParams: {
                        id: val.id
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            this.$message.success('银行卡解绑成功！');
                            this.getBankList();
                        } else {
                            this.$message.error(response.message);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        //充值验证码
        // getphonecodeId() {
        //     // if (!this.confirmBox.amount || this.confirmBox.amount < 100) {
        //     //     this.$message.error('请输入大于100的充值金额');
        //     //     return false;
        //     // }
        //     this.isSend1 = false;
        //     this.count1 = 60;
        //     this.timer1 = setInterval(() => {
        //         if (this.count1 > 0 && this.count1 <= 60) {
        //             this.count1--;
        //         } else {
        //             this.isSend1 = true;
        //             clearInterval(this.timer);
        //             this.timer = null;
        //         }
        //     }, 1000)
        //     ajax({
        //         url: 'wdrecharge/appRecharge',
        //         optionParams: {
        //             amount: this.confirmBox.amount,
        //             userCardId: this.confirmBox.userCardId,
        //         }
        //     }).post()
        //         .then(response => {
        //             if (response.code === 200) {
        //                 this.confirmBox.requestno = response.data.requestno;
        //             } else {
        //                 this.$message.error(response.message);
        //             }

        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // },
        //充值确认
        confirmRecharge() {
            
            // if (!this.confirmBox.amount || this.confirmBox.amount <= 100) {
            //     this.$message.error('请输入大于100的充值金额');
            //     return false;
            // }
            if (!this.tabShow) {
                // 快捷支付
                // if (!this.confirmBox.validatecode || this.confirmBox.validatecode.length != 6) {
                //     this.$message.error('请输入6位验证码');
                //     return false;
                // }
                ajax({
                    url: 'wdrecharge/llpay_Recharge',
                    optionParams: {
                         amount: this.confirmBox.amount,
                        userCardId: this.confirmBox.userCardId,
                         callback: 'https://www.bsnzz.com/personalCenter/index'
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            window.location.href=response.data
                            this.confirmBox.isShow = false;
                            this.$message.success(response.message);
                            window.scrollTo(0,0);
                            this.selectIndex(0);
                        } else {
                            this.$message.error(response.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                //网银支付
                ajax({
                    url: 'wdrecharge/pcRecharge',
                    optionParams: {
                        amount: this.confirmBox.amount,
                        bank: this.seleckCode,
                        // callback: 'https://www.bsnzz.com',
                        callback: 'https://www.bsnzz.com/personalCenter/index'
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            window.open(response.data.url);
                            window.scrollTo(0,0);
                            this.selectIndex(0);
                            // this.$router.push({ path: '/personalCenter/index', query: { index: 1 } });
                            // this.confirmBox.isShow = false;
                            // this.$message.success(response.message);
                        } else {
                            this.$message.error(response.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

        },
        //确认提现
        confirmCash() {
            if (!this.cashBox.amount) {
                this.$message.error('请输入提现金额');
                return false
            }
            if (!this.cashBox.transPassword || String(this.cashBox.transPassword).length != 6) {
                this.$message.error('请输入6位数字交易密码');
                return false
            }
            ajax({
                url: 'wdrecharge/withdraw',
                optionParams: {
                    amount: this.cashBox.amount,
                    transPassword: this.cashBox.transPassword
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$message.success(response.message);
                        this.cashBox = {//提现参数
                            realAmount: '',
                            fare: '',
                            amount: '',
                            transPassword: ''
                        }
                    } else {
                        this.$message.error(response.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //计算手续费
        acountFare() {
            this.cashBox.fare = this.formatMoney(this.cashBox.amount * 2.5 / 1000);
            this.cashBox.realAmount = this.formatMoney(this.cashBox.amount - this.cashBox.fare);
        },
        //绑卡
        // getBankCode(formName) {
        //     // if(validate.validatPhone(this.BindCardForm.phone)) {
        //     //     this.$message.error('请输入正常的手机号');
        //     //     return false;
        //     // }
        //     this.$refs[formName].validate((valid) => {
        //         if (!valid) {
        //             return false;
        //         }
        //         const TIME_COUNT = 60;
        //         if (!this.timer) {
        //             this.count3 = TIME_COUNT;
        //             this.isSend3 = false;
        //             this.timer = setInterval(() => {
        //                 if (this.count3 > 0 && this.count3 <= TIME_COUNT) {
        //                     this.count3--;
        //                 } else {
        //                     this.isSend3 = true;
        //                     clearInterval(this.timer);
        //                     this.timer = null;
        //                 }
        //             }, 1000)
        //         }
        //         ajax({
        //             url: 'userCard/bind',
        //             optionParams: this.BindCardForm
        //         }).post()
        //             .then(response => {
        //                 if (response.code === 200) {
        //                     //                 BindCardForm: {
        //                     //     bankCardNo: '', //银行卡号
        //                     //     idCard: '', //身份证号码
        //                     //     phone: '', //手机号码
        //                     //     username: '', //用户姓名
        //                     //     checkCode: '', //验证码
        //                     // 	requestno: '',
        //                     // },
        //                     this.BindCardForm.requestno = response.data.requestno
        //                     this.$message.success(response.message);
        //                 } else {
        //                     this.$message.error(response.message);
        //                 }

        //             })
        //             .catch(error => {
        //                 console.log(error)
        //             })
        //         // else{

        //         // }
        //     });

        // },
        //
        submitBindCardForm() {
                ajax({
                    url: 'userCard/bind',
                    optionParams: this.BindCardForm,
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                           window.location.href=response.data
                          // window.open(response.data)
                            // this.getBankList();
                            // this.$message.success(response.message);
                            // this.resetForm('BindCardForm');
                            // this.dialogBindCard = false;
                        } else {
                            this.$message.error(response.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //金钱过滤
        formatMoney(val) {
            return val.toFixed(2);
        },
        //显示债权密码
        showPwd(val) {
            ajax({
                url: 'orderTransfer/showTransPwd',
                optionParams: {
                    transferId: val.id
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$alert('' + response.data, '债权密码', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // this.$message({
                                //     type: 'info',
                                //     message: `action: ${action}`
                                // });
                            }
                        });
                        // MessageBox({
                        // 	title: '债权密码',
                        // 	message: response.data,
                        // 	showCancelButton: false
                        // });
                    } else {
                        this.$message.error(response.message);
                        //this.$router.go(-1);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //撤销转让
        cancelTransfer(val) {
            this.$confirm('您正在进行撤销转让操作，确认后不可恢复, 是否继续?', '撤销转让', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
                    url: 'orderTransfer/cancel',
                    optionParams: {
                        transferId: val.id
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            this.$message.success(response.message);
                            this.getTransferTable();
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
                    message: '已取消撤销'
                });
            });

        },
         //撤销借条
        cancelTransferj(val) {
            this.$prompt('您正在进行撤销转让操作，确认后不可恢复, 是否继续?  下方请填写撤销原因', '撤销转让', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((value) => {
                ajax({
                    url: 'order_loans/cancel',
                    optionParams: {
                        loansId: val.id,
                        remark:value.value,
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            this.$message.success(response.message);
                            this.getLoansTable();
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
                    message: '已取消撤销'
                });
            });

        },

        //申诉
        appeal(val) {
            this.$confirm('确认对订单号' + val.id + '中的凭证有异议，需要发起申诉吗？', '申诉', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
                    url: 'orderTransfer/igiari',
                    optionParams: {
                        transferId: val.id
                    }
                }).post()
                    .then(response => {
                        if (response.code === 200) {
                            this.$message.success(response.message);
                            this.getTransferTable();
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
                    message: '已取消申诉'
                });
            });
        },
        //重新发起transferId
        reLaunch(val) {
            ajax({
                url: 'orderTransfer/reCall',
                optionParams: {
                    transferId: val.id
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$message.success('再次发起成功！');
                        this.getTransferTable();
                    } else {
                        this.$message.error(response.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //查看下架原因
        undercarriageReason(val) {
            console.log(1111111111)
            this.$alert('下架原因:' + val.msg, '下架原因', {
                confirmButtonText: '确定',
                callback: action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: ``
                    // });
                }
            });
        },
        //查看下架原因
        undercarriageReasonj(val) {
        	//$router.push({path:'/saleClaim/index', query:{data: JSON.stringify(scope.row)}})
            console.log(1111111111)
            this.$alert('下架原因:' + val.remark, '下架原因', {
                confirmButtonText: '确定',
                callback: action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: ``
                    // });
                }
            });
        },
         undercarriagezaici(val) {
        	this.$confirm('订单是否再次发起', '再次发起', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            	this.$router.push({path:'/saleClaim/index', query:{data: JSON.stringify(val),ishd:true}})
//              ajax({
//                  url: 'order_loans/recall',
//                  optionParams: {
//                      loansId: val.id,
//                      remark:'',
//                  }
//              }).post()
//                  .then(response => {
//                      if (response.code === 200) {
//                          this.$message.success(response.message);
//                          this.$router.push({path:'/saleClaim/index', query:{data: JSON.stringify(val),ishd:true}})
//                          //this.getLoansTable();
//                      } else {
//                          this.$message.error(response.message);
//                      }
//
//                  })
//                  .catch(error => {
//                      console.log(error)
//                  })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消申诉'
                });
            });
        },
        //延迟支付
        delayConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // this.delayData.orderTranId = this.delayDataId;
                    // this.delayData.extendTime = this.delayData.extendTime * 3600000;
                    ajax({
                        url: 'orderTransfer/extend',
                        optionParams: {
                            orderTranId: this.delayData.orderTranId,
                            remark: this.delayData.remark,
                            extendTime: this.delayData.extendTime * 3600000,
                        }
                    }).post()
                        .then(res => {
                            if (res.code === 200) {
                                this.$message.success(res.message);
                                this.resetForm('delayData');
                                this.getTransferTable();
                                this.delayDataShow = false;
                            } else {
                                this.$message.error(res.message);
                            }

                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //显示延迟支付
        showDelay(val) {
            ajax({
                url: 'orderTransfer/extendView',
                optionParams: {
                    transferId: val.id
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.delayData.extendTime = res.data[0].extendTime / 3600000;
                        this.delayData.remark = res.data[0].remark;
                        this.delayDataShow1 = true;
                    } else {
                        this.$message.error(res.message)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //购买债转
        holdDebt(val) {
            //window.location.href = this.rowData.link;
            //'转让人还未支付，该链接仅供预览。请在转让人支付完成后购买哦！'
            if (val.advanceChargeStatus === 1) {
                this.goUrl(val.link);
            } else {
                this.$message.error('转让人还未支付，该链接仅供预览。请在转让人支付完成后购买哦!')
            }
        },
        //上传凭证
        upLoadImg() {
            ajax({
                url: 'orderTransfer/upEvidence',
                optionParams: {
                    orderId: this.imgId,
                    image: this.img,
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$message.success('上传凭证成功');
                        this.getUndertake();
                    } else {
                        this.$message.error('上传凭证失败');
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //上传凭证
        add() {
            console.log(111111);
            this.$refs.file.click();
        },
        submit() {
            console.log(this.files)
            // if (this.files.length === 0) {
            //     console.warn('no file!');
            //     return
            // }
            var that = this
            //  这里是OSS
            const client = new OSS.Wrapper({
                region: "oss-cn-shanghai",
                accessKeyId: "LTAIR632dUFd2DhQ",
                accessKeySecret: "vBysGq1EM3Ti3vjmY5dyJmtKaACoDn",
                bucket: "ygg168"
            });
            const fNum = this.files;
            var that = this;
            for (var i = 0; i < fNum.length; i++) {
                var f = fNum[i].file
                const Name = f.name
                const suffix = Name.substr(Name.indexOf("."));
                const obj = this.imgId;
                const storeAs = 'debt/' + obj + suffix  //  路径+时间戳+后缀名
                that.img = storeAs.split('/')[1];
                client.multipartUpload(storeAs, f).then(function(result) {

                })
            }
            this.upLoadImg();
        },
				//模糊查询
		loadAll() {
			ajax({
				url: "orderTransfer/findPfNames",
				optionParams: {
					name: ''
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.pfNameList.push({ 'value': res.data[i] })
						}
					} else {
						this.pfNameList = [];
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
			//模糊查询
		querySearchAsync(queryString, cb) {
			var restaurants = this.pfNameList;
			var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				cb(results);
			}, 1000 * Math.random());
		},
		//模糊查询
		createStateFilter(queryString) {
			return (state) => {
				return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		//模糊查询
		handleSelect(item) {
			//console.log(item);
		},
        finished() {
            this.files = []
            this.status = 'ready'

        },
        remove(index) {
            this.files.splice(index, 1)
        },
        fileChanged() {
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i]
                    }
                    this.html5Reader(list[i], item)
                    this.files.push(item)
                }
            }
            this.$refs.file.value = '';
            this.submit();
        },
        // 将图片文件转成BASE64格式
        html5Reader(file, item) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.$set(item, 'src', e.target.result)
            }
            reader.readAsDataURL(file)
        },
        isContain(file) {
            return this.files.find((item) => item.name === file.name && item.size === file.size)
        },
         //上传凭证
        addc() {
            console.log(111111);
            this.$refs.filea.click();
        },
        upLoadImgqq() {
        	console.log('shangc')
        	
        },
        fileChangec(e) {
        	let file = e.target.files[0];
        	console.log(file)
      		var val = document.getElementById("file").value;
			var arr = val.split('.');
			console.log(arr)
			var suffix = arr[arr.length-1]
			console.log(suffix)
			if(suffix == 'pdf' || suffix == 'zip'|| suffix == 'rar'|| suffix == 'jpeg'|| suffix == 'jpg'|| suffix == 'png'){
				
				if (file.size > 5242880) {
		            alert("上传的文件不能大于5M");
		         	return false;
		      	}
			
			
			this.hetongLoading = true
			this.titshang = '正在上传...'
			e.preventDefault();
            let formData = new FormData();
			formData.append('file', file);
			formData.append('groupId', this.detailtahtong.id);
			 ajax({
                url: 'evidence/upload_evidence',
                optionParams: formData
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$message.success('已成功存证保全');
                        this.titshang = '上传'
                        console.log(this.detailtahtong)
                        console.log(this.numbt)
                        this.detailta(this.numbt,this.detailtahtong)
                        this.hetongLoading = false
                    } else {
                        this.$message.error(response.message);
                        this.titshang = '上传'
                         this.hetongLoading = false
                    }

                })
                .catch(error => {
                    console.log(error)
                })
			 
			} else{
				 this.$message.error('请选择PDF/ZIP/RAR/JPEG/JPG/PNG 文件');
				return false
			}
			 
			
        },
        
          
    },
    filters: {
        //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        },
        //金钱过滤
        formatMoney(val) {
            if (val) {
                return val.toFixed(2);
            } else {
                return val;
            }

        },
        //状态过滤
        statusFilter(val) {

        },
        //类型流水
        revenueExpendTypeFilter(val) {
            if (val === 1) {
                return '充值'
            } else if (val === 2) {
                return '提现中'
            } else if (val === 3) {
                return '折扣金入账'
            } else if (val === 4) {
                return '折扣金出账'
            } else if (val === 5) {
                return '折扣金退回'
            } else if (val === 6) {
                return '提现失败'
            } else if (val === 7) {
                return '提现成功'
            }else if (val === 8) {
                return '佣金'
            }else if (val === 9) {
                return '服务费'
            }else if (val === 10) {
                return '服务费退回'
            } else if (val === 11) {
                return '信息费'
            }else {
                return val;
            }
        },
        //银行卡显示四位
        bankCardShow(bankCardNo) {
            return bankCardNo.substring(bankCardNo.length - 4);
        },
    }
}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
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
		.wenjian input{
			padding-left: 10px;
		}
		.wenjian textarea{
			padding-left: 10px;
		}
</style>


