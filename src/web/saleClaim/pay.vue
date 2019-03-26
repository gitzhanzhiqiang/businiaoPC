<template>
    <div class="pay">
        <div class="title">
            <img src="~@/assets/images/safe.png" alt="">
        </div>
        <div class="detail">订单详情</div>
        <div class="list">
            <div class="item">
                <div class="itemList">平台名称：{{rowData.pfName}}</div>
                <div class="itemList">转让金额：{{rowData.amount}}元</div>
                <div class="itemList">标的年化：{{rowData.annualRate}}%</div>
            </div>
            <div class="item">
                <div class="itemList">还款方式:
                    <span v-if="rowData.repaymentType ==0">一次性还本付息</span>
                    <span v-if="rowData.repaymentType ==1">先息后本</span>
                    <span v-if="rowData.repaymentType ==2">等额本息</span>
                    <span v-if="rowData.repaymentType ==3">等额本金</span>
                </div>
                <div class="itemList">债权到期日:{{rowData.surplusPeriod | parseTime('{y}-{m}-{d}')}}</div>
                <div class="itemList">转让有效期:{{rowData.effDay}}天</div>
            </div>
            <div class="item">
                <div class="itemList">折扣金额：{{rowData.discountAmount}}元</div>
                <div class="itemList">转让折扣：{{rowData.discountRate}}</div>
                <div class="itemList">债转链接：{{rowData.link}}</div>
            </div>
        </div>
        <div class="white"></div>
        <div class="content-box">

            <div class="payStyle">确认付款</div>
            <div class="mainCon">
                <div class="amount">实际支付金额：
                    <span>{{rowData.discountAmount}}元</span>
                </div>
                <div class="amount">折扣金额：
                    <span>{{rowData.discountAmount}}元</span>
                </div>
                <div class="amount">手续费金额：
                    <span>0.00元</span>
                </div>
            </div>
            <div class="mainCon" style="margin-top:50px;margin-bottom:40px;">
                <div class="payTitle">支付方式：</div>
                <div class="tabButton">
                    <div class="tabitemLeft" :class="{tabActive:tab1Show}" @click="tab1Show = true;tab2Show = false;tab3Show = false;confirmBox.payType = 1;">余额支付</div>
                    <div class="tabitemCenter" :class="{tabActive:tab2Show}" @click="tab1Show = false;tab2Show = true;tab3Show = false;confirmBox.payType = 3;">网银支付</div>
                    <div class="tabitemRight" :class="{tabActive:tab3Show}" @click="tab1Show = false;tab2Show = false;tab3Show = true;confirmBox.payType = 2;tabSelectOne(0);">快捷支付</div>
                </div>
            </div>
            <div class="bank" v-if="tab1Show" style="height:50px;">
                <div class="bankTitle">付款方式：</div>
                <!-- 余额支付 -->
                <div class="bankLogo">
                    <div class="img" style="width:230px;height:50px;margin-bottom:10px;float:left;">
                        <div class="floatImg" style="width:230px;height:50px;" :style="bankBackground">
                            <img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/bank/balance.png" alt="" width="230" height="50" style="opacity:.5;">
                        </div>
                        <!-- <div class="floatImg" style="width:230px;height:50px;">
                            <img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/bank/balance.png" alt="" width="230" height="50">
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- 快捷支付 -->
            <div class="bank" v-if="tab3Show" style="min-height:50px;">
                <div class="bankTitle">付款方式：</div>
                <div class="bankLogo">
                    <div class="img" v-for="(item,index) in cardCheckList" @click="tabSelectOne(index)" :key="index" style="width:230px;height:50px;margin-bottom:10px;">
                        <div class="floatImg" v-if="item.isShow" style="width:230px;height:50px;" :style="bankBackground">
                            <img :src="item.bankLogo" alt="" width="230" height="50" style="opacity:.5;">
                        </div>
                        <div class="floatImg" v-if="!item.isShow" style="width:230px;height:50px;">
                            <img :src="item.bankLogo" alt="" width="230" height="50">
                        </div>
                    </div>
                </div>
            </div>
             <!-- 网银支付 -->
            <div class="bank" v-if="tab2Show" style="height:250px;">
                <div class="bankTitle">付款方式：</div>
                <div class="bankLogo" style="width:800px;">
                    <div class="img" v-for="(item,index) in bankCheckList" @click="tabSelectBank(index)" :key="index" style="width:230px;height:50px;float:left;margin-bottom:12px;margin-right:10px;">
                        <img v-if="item.isSeleted" :src="item.selectedImg" alt="" width="230" height="50">
                        <img v-if="!item.isSeleted" :src="item.img" alt="" width="230" height="50">
                    </div>
                </div>
            </div>
            <!-- 交易密码 -->
            <div class="password" v-if="tab1Show">
                <div class="pwdTitle">交易密码:</div>
                <div class="pwdInput">
                    <el-input type="password" placeholder="请输入6位数字交易密码" maxlength="6" style="height:36px;width:400px;text-indent:10px;margin-left:10px;" v-model.number="confirmBox.transPassword">
                    </el-input>
                </div>
            </div>
            <!--手机验证码  -->
            <div class="password" v-if="tab3Show">
                <div class="pwdTitle">手机验证码:</div>
                <div class="pwdInput">
                    <el-input placeholder="请输入手机验证码" maxlength="6" v-model="confirmBox.validatecode" style="width:400px;margin-left:10px;">
                    </el-input>
                    <span v-if="!isShow" @click="getCode()" style="width:20%;color:#3963D0;cursor: pointer;">获取</span>
                    <span v-if="isShow" style="width:20%;color:#3963D0;">{{count}}s</span>
                </div>
            </div>
            <!-- 立即付款 -->
            <div class="payNow" @click="confirmCash()" v-if="clickShow">
                立即付款
            </div>
            <div class="payNow" v-if="!clickShow">
                立即付款
            </div>
            <div class="blank"></div>
        </div>

    </div>
</template>
<script>
import ajax from '@utils/config';
import { parseTime } from '@/filters';
import Cookies from 'js-cookie';
export default {
    components: {
    },
    data() {
        return {
            rowData: {},
            bankBackground: {
                backgroundImage: "url(" + require("@/assets/images/bank.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            count: '',
            isShow: false,
            timer: null,
            confirmBox: {//充值参数
                amount: '',
                userCardId: '',
                validatecode: '',
                requestno: '',
                transPassword: '',
                payType: 1
            },
            tab1Show: true,
            tab2Show: false,
            tab3Show: false,
            clickShow: true,//重复点击
            bankList: [],//银行卡
            cardCheckList: [],//银行卡选择
            requestnoStatus: false,
            bankCheckList: [   //网银支付银行卡选择
                { bankCode: "ABC-NET-B2C", selectedImg: require("@/assets/images/1.png"), img: require("@/assets/images/bank1.png"), isSeleted: true },
                { bankCode: "BOC-NET-B2C", selectedImg: require("@/assets/images/2.png"), img: require("@/assets/images/bank2.png"), isSeleted: false },
                { bankCode: "CCB-NET-B2C", selectedImg: require("@/assets/images/3.png"), img: require("@/assets/images/bank3.png"), isSeleted: false },
                { bankCode: "CEB-NET-B2C", selectedImg: require("@/assets/images/4.png"), img: require("@/assets/images/bank4.png"), isSeleted: false },
                { bankCode: "CIB-NET-B2C", selectedImg: require("@/assets/images/5.png"), img: require("@/assets/images/bank5.png"), isSeleted: false },
                { bankCode: "CMBC-NET-B2C", selectedImg: require("@/assets/images/6.png"), img: require("@/assets/images/bank6.png"), isSeleted: false },
                { bankCode: "ECITIC-NET-B2C", selectedImg: require("@/assets/images/7.png"), img: require("@/assets/images/bank7.png"), isSeleted: false },
                { bankCode: "GDB-NET-B2C", selectedImg: require("@/assets/images/8.png"), img: require("@/assets/images/bank8.png"), isSeleted: false },
                { bankCode: "SPDB-NET-B2C", selectedImg: require("@/assets/images/9.png"), img: require("@/assets/images/bank9.png"), isSeleted: false },
                { bankCode: "PINGANBANK-NET-B2C", selectedImg: require("@/assets/images/10.png"), img: require("@/assets/images/bank10.png"), isSeleted: false },
                { bankCode: "ICBC-NET-B2C", selectedImg: require("@/assets/images/11.png"), img: require("@/assets/images/bank11.png"), isSeleted: false },
                { bankCode: "CMBCHINA-NET-B2C", selectedImg: require("@/assets/images/12.png"), img: require("@/assets/images/bank12.png"), isSeleted: false }
            ],
            seleckCode: 'ABC-NET-B2C',//网银支付银行卡选中
        }
    },
    computed: {
    },
    created() {
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.rowData = data;
        console.log(this.rowData);
        this.getBankList();
        this.confirmBox.amount = this.formatMoney(this.rowData.discountAmount);
    },
    mounted() {
    },
    methods: {
        //获取银行卡信息 userCard/list
        getBankList() {
            this.cardCheckList = [];
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
                                    payType: 2
                                }
                                // if (item.isMatser === 1) {
                                //     obj.isShow = false;
                                //     this.confirmBox.userCardId = item.id;
                                // }
                                this.cardCheckList.push(obj);
                            })
                            // let obj = {
                            //     userCardId: 9999,//余额支付id默认值
                            //     bankLogo: 'https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/bank/balance.png',
                            //     isShow: true,
                            //     payType: 1
                            // }
                            // this.confirmBox.userCardId = obj.userCardId;
                            this.confirmBox.payType = 1;
                            // this.cardCheckList.push(obj);
                        } else {
                            this.$message.error('请前往个人中心绑定银行卡！');
                            this.$router.push({ path: '/personalCenter/index', query: { index: 5 } })
                        }
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
            this.confirmBox.payType = this.cardCheckList[index].payType;
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
        //金钱过滤
        formatMoney(val) {
            return val.toFixed(2);
        },
        //银行卡支付获取验证码
        getCode() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.isShow = true;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.isShow = false;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
            this.rowData.payType = this.confirmBox.payType;
            this.rowData.userCardId = this.confirmBox.userCardId;
            if (!this.requestnoStatus) {
                ajax({
                    url: 'orderTransfer',
                    optionParams: this.rowData
                }).post()
                    .then(res => {
                        if (res.code === 200) {
                            this.confirmBox.requestno = res.data.requestno;
                            this.$message.success(res.message);
                        } else {
                            this.confirmBox.transPassword = '';
                            this.confirmBox.validatecode = '';
                            ajax({
                                url: 'wdrecharge/appPayResendCode',
                                optionParams: {
                                }
                            }).post()
                                .then(res => {
                                    if (res.code === 200) {
                                        this.$message.success(res.message);
                                        this.confirmBox.requestno = res.requestno;
                                        this.rowData.requestno = res.requestno;

                                        this.isShow = !this.isShow;

                                    } else {
                                        this.$message.error(res.message);
                                        this.requestnoStatus = true;
                                    }

                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {

            }

        },
        //出售债转
        saleDebt() {
            ajax({
                url: 'orderTransfer',
                optionParams: this.rowData
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.confirmBox.requestno = res.data.requestno;
                        Cookies.remove('saleDebt');
                        this.$message.success('发布成功');
                        this.$router.push('/index');
                    } else {
                        this.$message.error(res.message);
                        this.confirmBox.transPassword = '';
                        this.confirmBox.validatecode = '';

                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //充值确认
        appPayConfirm() {
            ajax({
                url: 'wdrecharge/appPayConfirm',
                optionParams: {
                    validatecode: this.confirmBox.validatecode,
                    requestno: this.confirmBox.requestno,
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        Cookies.remove('saleDebt');
                        // this.confirmBox.isShow = false;
                        this.$message.success('发布成功');
                        this.$router.push('/index');

                    } else {
                        this.$message.error(res.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //确认支付按钮
        confirmCash() {
            if (this.confirmBox.payType === 2) {
                if (!this.confirmBox.validatecode) {
                    this.$message.error('请输入验证码！');
                    return false;
                }
                this.clickShow = false;
                this.appPayConfirm();
                // this.confirmBox.isShow = false;
                // this.$router.push('/index');
                return false;
            }
            if (this.confirmBox.payType === 1) {
                if (!this.confirmBox.transPassword) {
                    this.$message.error('请输入交易密码!');
                    return false;
                }
                this.clickShow = false;
                this.rowData.userTransPassword = this.confirmBox.transPassword;
                this.rowData.payType = this.confirmBox.payType;
                this.saleDebt();
                return false;
            }
            // 网银支付
            if (this.confirmBox.payType === 3) {
                this.clickShow = false;
                this.netpay();
                Cookies.remove('saleDebt');
                return false;
            }
        },
        // 网银支付
        netpay() {
            ajax({
                url: 'orderTransfer',
                optionParams: {
                    payType: this.confirmBox.payType,
                    bank: this.seleckCode,
                    captcha: this.rowData.captcha,
                    bdType: this.rowData.bdType,
                    qqCode: this.rowData.qqCode,
                    repayStatus: this.rowData.repayStatus,
                    pfName: this.rowData.pfName,
                    amount: this.rowData.amount,
                    annualRate: this.rowData.annualRate,
                    surplusPeriod: this.rowData.surplusPeriod,
                    discountRate: this.rowData.discountRate,
                    discountAmount: this.rowData.discountAmount,
                    repaymentType: this.rowData.repaymentType,
                    effDay: this.rowData.effDay,
                    link: this.rowData.link,
                    orientFlag: this.rowData.orientFlag,
                    prepayFlag: this.rowData.prepayFlag,
                    callback: 'https://www.bsnzz.com',
                    // callback: 'http://192.168.0.121:8081/birdPC/#/personalCenter/index?index=1',
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        window.open(res.data.url);
                        this.$router.push({ path: '/personalCenter/index', query: { index: 1 } });
                    } else {
                        this.$message.error(res.message);
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
.pay {
    width: 1200px;
    margin: 0 auto;
    .title {
        width: 1200px;
        height: 100px;
        border: 1px solid rgba(242, 242, 242, 1);
        background: linear-gradient(119deg, rgba(23, 12, 170, 1) 0%, rgba(19, 42, 185, 1) 49%, rgba(23, 12, 170, 1) 100%);
        font-size: 32px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 100px;
        text-align: center;
    }
    .detail {
        margin-top: 34px;
        margin-left: 57px;
        width: 90px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        font-family: MicrosoftYaHeiLight;
        color: rgba(51, 51, 51, 1);
        font-weight: 300;
        border-left: 4px solid rgba(57, 99, 208, 1);
        text-indent: 5px;
    }
    .list {
        width: 100%;
        margin-top: 11px;
        height: 112px;
        .item {
            width: 33.3%;
            float: left;
            height: 100%;
            .itemList {
                height: 33.3%;
                width: 100%;
                text-indent: 104px;
                line-height: 36px;
                font-size: 14px;
                font-family: MicrosoftYaHeiLight;
                font-weight: 300;
                color: rgba(128, 128, 128, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .white {
        height: 46px;
        width: 100%;
        border-bottom: 1px solid rgb(217, 218, 220);
        margin-bottom: 34px;
    }
    .content-box {
        padding-top: 20px;
        width: 1200px; // height: 680px;
        margin-bottom: 50px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 8px 1px rgba(90, 123, 252, 0.16);
        .payStyle {
            margin-left: 57px;
            height: 28px;
            font-size: 14px;
            font-family: MicrosoftYaHeiLight;
            font-weight: 300;
            color: rgba(51, 51, 51, 1);
            line-height: 28px;
            border-left: 4px solid rgba(57, 99, 208, 1);
            text-align: center;
            width: 70px;
        }
        .mainCon {
            width: 1060px;
            height: 36px;
            margin-left: 140px;
            .amount {
                width: 33.3%;
                float: left;
                height: 36px;
                line-height: 36px;
                font-size: 20px;
                font-family: MicrosoftYaHeiLight;
                font-weight: 300;
                color: rgba(128, 128, 128, 1);
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &>span {
                    font-size: 18px;
                    font-family: MicrosoftYaHeiLight;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }
            }
            .payTitle {
                float: left;
                width: 100px;
                height: 40px;
                font-size: 18px;
                font-family: MicrosoftYaHeiLight;
                font-weight: 300;
                color: rgba(0, 0, 0, 1);
                line-height: 40px;
            }
            .tabButton {
                float: left;
                width: 480px;
                height: 40px; // background: rgba(57, 99, 208, 1);
                cursor: pointer;
                .tabitemLeft {
                    text-align: center;
                    height: 38px;
                    width: 158px;
                    border: 1px solid rgba(153, 153, 153, 1);
                    float: left;
                    line-height: 40px;
                    font-size: 9px;
                    font-family: MicrosoftYaHei;
                    font-weight: bold;
                    color: rgba(153, 153, 153, 1);
                    background: #fff;
                    border-radius: 20px 0px 0px 20px;
                }
                .tabitemCenter {
                    text-align: center;
                    height: 38px;
                    width: 158px;
                    float: left;
                    line-height: 40px;
                    font-size: 9px;
                    font-family: MicrosoftYaHei;
                    font-weight: bold;
                    color: rgba(153, 153, 153, 1);
                    background: #fff;
                    border: 1px solid rgba(153, 153, 153, 1);
                }
                .tabitemRight {
                    text-align: center;
                    height: 38px;
                    width: 158px;
                    float: left;
                    line-height: 40px;
                    font-size: 9px;
                    font-family: MicrosoftYaHei;
                    font-weight: bold;
                    color: rgba(153, 153, 153, 1);
                    background: #fff;
                    border-radius: 0px 20px 20px 0px;
                    border: 1px solid rgba(153, 153, 153, 1);
                }
                .tabActive {
                    // border-radius: 20px;
                    background: rgba(57, 99, 208, 1);
                    color: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(57, 99, 208, 1);
                }
            }
        }

        .bank {
            width: 1060px;
            margin-left: 140px;
            min-height: 50px;
            margin-bottom: 51px;
            .bankTitle {
                float: left;
                // margin-left: -700px;
                font-size: 18px;
                font-family: MicrosoftYaHeiLight;
                font-weight: 300;
                color: rgba(0, 0, 0, 1);
                width: 100px;
                // text-align: left;
                line-height: 50px;
                height: 50px;
            }
            .bankLogo {
                float: left;
                width: 278px;
                // margin-left: 12px;
                // min-height: 250px;
            }
        }
        .password {
            width: 700px;
            // margin: 40px auto;
            margin-left: 140px;
            height: 40px;
            line-height: 40px;
            .pwdTitle {
                float: left;
                font-size:18px;
                font-family:MicrosoftYaHeiLight;
                font-weight:300;
                color:rgba(0,0,0,1);
            }
            .pwdInput {
                float: left;
            }
        }
        .payNow {
            width: 300px;
            margin: 50px auto;
            height: 42px;
            background: rgba(57, 99, 208, 1);
            border-radius: 20px;
            line-height: 42px;
            font-size: 18px;
            font-family: MicrosoftYaHeiLight;
            font-weight: 300;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            cursor: pointer;
        }
        .valideCode {
            width: 100%;
            text-align: left;
            text-indent: 140px;
        }
        .blank {
            width: 100%;
            height: 40px;
        }
    }
}
</style>


