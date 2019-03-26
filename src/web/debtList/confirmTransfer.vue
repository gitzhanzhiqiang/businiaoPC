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
            <div class="payStyle">确认转承接人</div>
            <div class="amount">折扣金额：
                <span>{{rowData.discountAmount}}元</span>
            </div>
            <!-- 交易密码 -->
            <div class="password">
                <span style="font-size:18px;font-family:MicrosoftYaHeiLight;font-weight:300;color:rgba(0,0,0,1);">交易密码:</span>
                <el-input type="password" placeholder="请输入6位数字交易密码" maxlength="6" style="height:36px;width:300px;text-indent:10px;" v-model.number="confirmBox.transPassword">
                </el-input>
            </div>
            <!-- 立即付款 -->
            <div class="payNow" @click="transferNow()">
                立即确认
            </div>
        </div>

    </div>
</template>
<script>
import ajax from '@utils/config';
import { parseTime } from '@/filters';
export default {
    components: {
    },
    data() {
        return {
            rowData: {},
            confirmBox: {
                transPassword: ''
            }
        }
    },
    computed: {
    },
    created() {
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.rowData = data;
    },
    mounted() {
    },
    methods: {
        //确认转承接人
        transferNow() {
            if (this.confirmBox.transPassword&&String(this.confirmBox.transPassword).length===6) {
                ajax({
                    url: 'orderTransfer/transfer2Buyer',
                    optionParams: {
                        transferId: this.rowData.id,
                        transPassword: this.confirmBox.transPassword
                    }
                }).post()
                    .then(res => {
                        if (res.code === 200) {
                            this.$message.success(res.message);
                            this.$router.push({ path: '/personalCenter/index', query: { index: 1 } })
                            // this.
                        } else {
                            this.$message.error(res.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                this.$message.error('输入正确的的交易密码！');
            }


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
                text-overflow:ellipsis;
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
        width: 800px;
        height: 360px;
        margin-bottom: 50px;
        margin: auto;
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
            width: 100px;
        }
        .amount {
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            font-family: MicrosoftYaHeiLight;
            font-weight: 300;
            text-align: center;
            &>span {
                font-size: 18px;
                font-family: MicrosoftYaHeiLight;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }
        }
        .bank {
            width: 100%;
            min-height: 120px;
            .payTitle {
                float: left;
                font-size: 18px;
                font-family: MicrosoftYaHeiLight;
                font-weight: 300;
                color: rgba(0, 0, 0, 1);
                width: 310px;
                text-align: right;
                line-height: 50px;
            }
            .bankLogo {
                float: left;
                width: 478px;
                margin-left: 12px;
                min-height: 50px;
            }
        }
        .password {
            margin-top: 40px;
            width: 500px;
            margin: 40px auto;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-family: MicrosoftYaHeiLight;
            text-align: center;
            font-weight: 300;
            color: rgba(51, 51, 51, 1);
        }
        .payNow {
            width: 300px;
            margin: 20px auto;
            height: 42px;
            background: rgba(57, 99, 208, 1);
            border-radius: 20px;
            line-height: 42px;
            font-size: 18px;
            font-family: MicrosoftYaHeiLight;
            font-weight: 300;
            color: rgba(255, 255, 255, 1);
            text-align: center;
        }
        .valideCode {
            width: 100%;
            text-align: center;
            margin-top: 60px;
        }
        .blank {
            width: 100%;
            height: 40px;
        }
    }
}
</style>


