<template>
	<view>
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main">
				<view class="chat-ls" v-for="(item,index) in msgList" :key="index" :id="'msg'+item.tip">
					<view class="chat-time">{{item.time}}</view>
					<view class="msg-m msg-left" v-if="item.id==vuex_user.user_id">
						<image src="../../static/pic/people.jpg" class="user-img"></image>
						<view class="message" v-if="item.type==0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.type==1">
							<image :src="item.message" class="msg-img" mode="widthFix"  @click="previewImg" link></image>
						</view>
					</view>
					<view class="msg-m msg-right" v-else>
						<image src="../../static/pic/people.jpg"  class="user-img"></image>
						<view class="message" v-if="item.type==0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<view class="message" v-if="item.type==1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- <view >
				<view>
					<input style="background-color: #FFFFFF;" />
					<button>发送</button>
				</view>
			</view> -->
			<!-- <view class="">
				<input v-model="msg" :focus="focus" @focus="inputFocus" :confirm-hold="true" :adjust-position="false" class="dh-input"
				 type="text" @confirm="sendMsg" confirm-type="send" style="margin-right: 20rpx;" v-if="!voice" />
				
			</view> -->
			
			<!-- <view ref="foot" :animation="footAnimationData" class="flex-column-center" :style="'bottom:'+ KeyboardHeight +'rpx;'">
			
				<view id="bottomfoot" class="bottom-foot-char flex-row-around" style="font-size: 55rpx;" ref="moreMenu" :animation="menuAnimationData">
					<input v-model="msg" :focus="focus" @focus="inputFocus" :confirm-hold="true" :adjust-position="false" class="dh-input"
					 type="text" @confirm="sendMsg" confirm-type="send" style="margin-right: 20rpx;" v-if="!voice" />
					<text style="margin-right: 20rpx;" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd"
					 @touchcancel="voiceCancel" v-if="voice" class="voice-nv">{{voiceTis}}
					</text>
					<image @click="collapse" class="tb-nv" style="margin-right: 10rpx;" src="../../static/images/more.png" mode="aspectFill"></image>
					<view class="" style="flex-direction: row;margin-left: 50rpx;">
						<uni-icons @click="chooseImage" type="image" size="50" style="margin-right: 20rpx;"></uni-icons>
						<uni-icons @click="captureImage" type="camera" size="50"></uni-icons>
					</view>
				</view>
			</view> -->
			
		</scroll-view>
		<!-- <submit @measure="measure" :chatType="type" :maxDuration="maxDuration" :id="id" class="submit" @record="recording"></submit> -->
		<mysubmit></mysubmit>
	</view>
</template>

<script>
	import myfun from '../../common/js/myfun.js';
	import {getmessages} from '../../common/config/api.js'
	import wsRequest from '../../common/js/websocket.js' 
	//import submit from '../../components/submit/submit.vue'
	import mysubmit from '../../components/mysubmit/mysubmit.vue'; 
	export default {
		data() {
			return {
				page:0,
				pagesize:30,
				accept_id:3,
				send_id:15,
				isWxapp:false,
				navBarTitle: 'test',
				scrollToView:'',
				imgList:[
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'../../static/pic/people.jpg'
					
				],
				msgList: [
					{
						id:'3'  ,//用户id
						imagurl:'',//
						message:'你好呀，谭晓松',
						type:'0',   //内容类型：（0文字 1图片 2音频 ）
						time:'2000-10-2',
						tip:0
					},
					{
						id:'6'  ,//用户id
						imagurl:'',//
						message:'../../static/pic/people.jpg',
						type:'1',   //内容类型：（0文字 1图片 2音频 ）
						time:'2000-10-2',
						tip:0
					},
					{
						id:'6'  ,//用户id
						imagurl:'',//
						message:'这张照片怎么样',
						type:'0',   //内容类型：（0文字 1图片 2音频 ）
						time:'2000-10-2',
						tip:0
					},
				],
			}
		},
		onLoad:function(option){
			
			//this.send_id=this.vuex_user.user_id;
			//this.accept_id=parseInt(option.accept_id) 
			
			// this.send_id=15
			// this.accept_id=2 
			// console.log(option.accept_id)
			// console.log(this.accept_id)
			
		},
			
		components:{
			mysubmit,
		},
		onShow() {
			//new wsRequest("ws://localhost:8081/webSocket",5000)
			
			//this.getmoremessage()
		},
		methods: {
			getmoremessage(){
				//查看聊天记录(分页操作)
				getmessages({page:this.page,pagesize:this.pagesize}).then((res)=>{

					console.log(res)
				}).catch((err)=>{
					console.log(err)
				})
				
				this.$nextTick(function(){    //为了让发送消息之后回到底部
					this.scrollToView = 'msg'+this.msgList[i].tip
				})
			},
			sendmessage(){
				//发送消息
			},
			
			//预览图片
			previewImg(e){
				let index=0
				for(let i=0;i<this.imgList.length;i++){
					if(this.imgList[i]==e){
						index=i
					}
				}
				console.log(this.imgList)
				uni.previewImage({
					current:index,
					urls:this.imgList,
					longPressActions:{
						itemList:['发送给朋友，保存'],
						success(data) {
							console.log(data.tapIndex)
						},
						fail(err) {
							console.log(err.errMsg)
						}
					}
				})
			}
			
			
			
		}
	}
</script>
	
<style lang="scss">
	page{
		height: 100%;
		background-color: #e3e3e3 ;
	}
	.content{
		height: 100%;
		background: rgba(244,244,244,1);
	}
	.chat{
		height:100%;
		background-color: #e3e3e3;
		.chat-main{
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 40rpx;
			padding-bottom: 120rpx;
			display: flex;
			flex-direction: column;
		}
		.chat-ls{
			.chat-time{
				font-size: 24rpx;
				color: rgba(39, 40, 50,0.7);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-m{
				display: flex;
				padding: 20rpx 0;
				.user-img{
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}
				.message{
					flex: none;
					max-width: 480rpx;
				}
				.msg-text{
					font-size: 32rpx;
					color: rgba(39,40,50,1);
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}
				.msg-img{
					max-width: 400rpx;
					border-radius: 20rpx;
					
				}
			}
			.msg-left{
				flex-direction: row;
				.msg-text{
					margin-left: 16rpx;
					background-color: #FFFFFF;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-left: 16rpx;
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.msg-text{
					margin-right: 16rpx;
					background-color: #12AE85;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-right: 16rpx;
				}
			}
		}
		
		.flex-column-center {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: fixed !important;
			background-color: #f3f3f3;
			border-radius: 10rpx;
			z-index: 9999999;
		}
		.bottom-foot-char {
			background-color: #f1f1f1;
			//width: 750rpx;
			padding: 20rpx 0 20rpx 0;
			/* #ifndef APP-NVUE */
			flex-flow: row;
			/* #endif */
		}
		.flex-row-around {
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
		}
		.dh-input {
			font-size: 30rpx;
			/* #ifdef H5 */
			width: 610rpx;
			/* #endif */
			/* #ifndef H5 */
			width: 560rpx;
			/* #endif */
			height: 70rpx;
			border-radius: 10rpx;
			padding-left: 15rpx;
			background-color: #FFFFFF;
			/* #ifdef H5 */
			margin-left: 40rpx;
			/* #endif */	
		}
		.voice-nv {
			font-size: 34rpx;
			width: 560rpx;
			height: 70rpx;
			font-weight: bold;
			border-radius: 10rpx;
			padding-left: 15rpx;
			padding-top: 17rpx;
			background-color: #FFFFFF;
			text-align: center;
			color: #333333;
		}
		.tb-nv {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
