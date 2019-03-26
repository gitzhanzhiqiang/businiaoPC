<template>
    <div class="psspd">
        <top></top>
        <div>
            <router-view></router-view>
        </div>
        <foot></foot>

        <!-- 分享 -->
        <el-dialog :title="tite" :visible.sync="centerDialogVisible" width="39%" center>
            <p class="text" style="width: 400px;">{{msg}}</p>
<span slot="footer" class="dialog-footer">				
				<el-button type="primary" @click="shareBox" class="copybtn">立即前往</el-button>
			</span>
</el-dialog>

</div>
</template>
<script>
    import top from '@/components/header.vue';
    import foot from '@/components/footer.vue';
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    export default {
        components: {
            top,
            foot
        },
        data() {
            return {
                centerDialogVisible: false,
                stompClient: '',
                timer: '',
                tite: '',//标题
                msg: '暂无消息',//内容
                extra: '',
                contentType: '',//类型
            }
        },
        mounted() {
            var user = localStorage.getItem("token");
            if(user){
            	this.connection();
            }
        },
        beforeDestroy() {
            //      // 页面离开时断开连接,清除定时器
            this.disconnect();
            //clearInterval(this.timer);
        },
        created() {
        },
        methods: {

            shareBox() {
                if (this.contentType == 0) {
                    this.$router.push({ path: '/personalCenter/index', query: { index: 1 } })
                }
                if (this.contentType == 2) {
                    this.$router.push({ path: '/personalCenter/index', query: { index: 2 } })
                }
                this.centerDialogVisible = false
            },
            connection() {
                // 建立连接对象
                 let socket = new SockJS('https://www.bsnzz.com/phoenix/mobile/api/ws'); //http://192.168.0.15:8024/debt/sub/
                // let  socket = new SockJS('http://192.168.0.15:8024/debt/')
                // 获取STOMP子协议的客户端对象
                this.stompClient = Stomp.over(socket);
                var phone = localStorage.getItem("phone")
                // 定义客户端的认证信息,按需求配置
                let headers = {
                    Authorization: '',
                    'token': localStorage.getItem("token") ? localStorage.getItem("token") : 'Basic eWdnOnlnZw==',
                }
                // 向服务器发起websocket连接
                this.stompClient.connect(headers, () => {
                    this.stompClient.subscribe('/accurate/' + phone + '/op_msg', (msg) => { // 订阅服务端提供的某个topic
                        console.log('广播成功')
                        console.log(msg)
                        var obj = JSON.parse(msg.body)
                        console.log(obj);
                        this.centerDialogVisible = true
                        this.tite = obj.title
                        this.msg = obj.msg
                        this.extra = obj.extra
                        this.contentType = obj.contentType
                        // msg.body存放的是服务端发送给我们的信息
                    }); //headers
                    //              this.stompClient.send("/app/chat.addUser",
                    //                  headers,
                    //                  JSON.stringify({sender: '',chatType: 'JOIN'}),
                    //              )   //用户加入接口
                }, (err) => {
                    // 连接发生错误时的处理函数
                    console.log('失败')
                    console.log(err);
                });
            },    //连接 后台
            disconnect() {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
            },  // 断开连接

        }
    }
</script>
<style lang='scss' scoped>

.text{
		color: #999999;
		font-size: 20px;
		width: 249px;
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
	.copybtn{
		width:300px;
		height:42px;
		background:rgba(57,99,208,1);
		border: none;
		border-radius:20px;
		font-size:18px;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(255,255,255,1);
	}
</style>