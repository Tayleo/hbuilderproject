<template>
	<view>
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom: inputh+'rpx'}">
				<view class="chat-ls" v-for="(item,index) in msgList" :key="index" :id="'msg'+item.info_id">
					<view class="chat-time">{{item.info_time}}</view>
					<view class="msg-m msg-left" v-if="item.real_send_id!=vuex_user.user_id"><!-- 对方发的 -->
						<image :src="accept_avatar" class="user-img"></image>
						<view class="message" v-if="item.msgtype==0">
							<view class="msg-text">{{item.info_content}}</view>
						</view>
						<view class="message" v-if="item.msgtype==1">
							<image :src="item.info_content" class="msg-img" mode="widthFix"  @click="previewImg" link></image>
						</view>
					</view>
					<view class="msg-m msg-right" v-else>
						<image src="../../static/pic/people.jpg"  class="user-img"></image>
						<view class="message" v-if="item.msgtype==0">
							<view class="msg-text">{{item.info_content}}</view>
						</view>
						<view class="message" v-if="item.msgtype==1">
							<image :src="item.info_content" class="msg-img" mode="widthFix" @tap="previewImg(item.message)"></image>
						</view>
					</view>
				</view>
			</view>
			
			
		</scroll-view>
		<!-- <submit @measure="measure" :chatType="type" :maxDuration="maxDuration" :id="id" class="submit" @record="recording"></submit> -->
		<mysubmit @inputs="inputs" @heights="heights"></mysubmit>
	</view>
</template>

<script>
	import myfun from '../../common/js/myfun.js';
	import {getMessageBefore} from '../../common/config/api.js'
	import wsRequest from '../../common/js/websocket.js' 
	//import submit from '../../components/submit/submit.vue'
	import mysubmit from '../../components/mysubmit/mysubmit.vue'; 
	export default {
		data() {
			return {
				oldtime:new Date(),
				websocket:null,
				page:1,
				pagesize:30,
				accept_id:3,
				accept_avatar:'',
				send_id:15,
				inputh:5,
				isWxapp:false,
				navBarTitle: 'passerby',
				scrollToView:'',
				imgList:[
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'../../static/pic/people.jpg'
					
				],
				msgList: [
					// {
					// 	id:'1'  ,//用户id
					// 	imagurl:'',//
					// 	message:'你好呀，谭晓松',
					// 	type:'0',   //内容类型：（0文字 1图片 2音频 ）
					// 	time:'2000-10-2',
					// 	tip:0
					// },
					// {
					// 	id:'6'  ,//用户id
					// 	imagurl:'',//
					// 	message:'../../static/pic/people.jpg',
					// 	type:'1',   //内容类型：（0文字 1图片 2音频 ）
					// 	time:'2000-10-2',
					// 	tip:1
					// },
					// {
					// 	id:'6'  ,//用户id
					// 	imagurl:'',//
					// 	message:'这张照片怎么样',
					// 	type:'0',   //内容类型：（0文字 1图片 2音频 ）
					// 	time:'2000-10-2',
					// 	tip:2
					// },
					// {
					// 	id:'3'  ,//用户id
					// 	imagurl:'',//
					// 	message:'../../static/pic/people.jpg',
					// 	type:'1',   //内容类型：（0文字 1图片 2音频 ）
					// 	time:'2000-10-2',
					// 	tip:3
					// },
					// {
					// 	id:'3'  ,//用户id
					// 	imagurl:'',//
					// 	message:'../../static/pic/people.jpg',
					// 	type:'1',   //内容类型：（0文字 1图片 2音频 ）
					// 	time:'2000-10-2',
					// 	tip:4
					// },
				],
			}
		},
		
		// onLoad:function(option){
			
		// 	//this.send_id=this.vuex_user.user_id;
		// 	this.accept_id=option.accept_id
		// 	console.log("this is"+option)
			
		// 	// this.send_id=15
		// 	// this.accept_id=2 
		// 	// console.log(option.accept_id)
		// 	// console.log(this.accept_id)
			
		// },
			
		components:{
			mysubmit,
		},
		onLoad(option) {
			this.websocket=new wsRequest("ws://localhost:8081/webSocket",5000,this.vuex_user.user_id)
			this.getnewmessage()
			// this.accept_id=parseInt(option.accept_id)
			this.accept_avatar=option.avatar_url
			// this.navBarTitle=option.name
			console.log("this is"+this.accept_id)
			//this.getmoremessage()
			uni.setNavigationBarTitle({
				title:this.navBarTitle
			})
			
		},
		methods: {
			getmoremessage(){
				//查看聊天记录(分页操作)
				getMessageBefore({page:this.page,pagesize:this.pagesize,accept_id:this.accept_id}).then((res)=>{
					console.log(res)
					this.msgList=res.data
					let i=0;
					for (i = 0; i < this.msgList.length; i++) {
						this.msgList[i].info_time=myfun.dateTime(this.msgList[i].info_time)
					}
					
					if(this.msgList.length>0){
						this.$nextTick(function(){   //回到底部
							this.scrollToView = 'msg'+this.msgList[i-1].info_id;
						})
					}
					
				}).catch((err)=>{
					console.log(err)
				})
			},
			
			//接收输入内容并通过websocket发送给服务器
			inputs(e){
				this.websocket.send(e,this.accept_id,0)
				
			},
			
			// sendmessage(e){
			// 	//发送消息
			// 	this.websocket.send(e)
			// },
			
			//关闭websocket连接
			closesocket(){
				this.websocket.close()
			},
			
			//接收消息
			getnewmessage(){
				//onMessage这个监听在封装的js中赋值给了socketTask对象
				this.websocket.socketTask.onMessage(res => {
					//console.log(res.data);
					var a=JSON.parse(res.data);
					
					this.msgList.push(a)
					console.log(this.msgList)
					// if(res.data == id){
					// 	this.$success("价格核算完毕！")
					// 	this.getOrderInfo(id)//重新调用这个订单详情
					// 	this.websocket.close();//手动关闭websocket
					// }
				})
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
			},
			
			//输入框高度
			heights(e){
				console.log(e)
				this.inputh=e*2-54
				//this.inputh=350(要减去下面框框的长度)
				console.log(this.inputh)
				this.goButtom()
			},
			//滚动到底部
			goButtom(){
				this.scrollToView='',
				this.$nextTick(function(){
					this.scrollToView='msg4'
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
		height:1050rpx;
		background-color: #e3e3e3;
		.chat-main{
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 40rpx;
			/* padding-bottom: 250rpx; */
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
