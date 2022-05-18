<template>
	<view>
		<view>
			
			<view style="padding-left: 20rpx;font-weight: bold;">消息列表</view>
			
		</view>
		<view class="chats"  >
			<view class="chat-list"  @click="adminmessage()">
				<view class="chat-list-l">
					<!-- <text class="tip">1</text> -->
					<image src='../../static/img/admin.png'></image>
				</view>
				<view class="chat-list-r">
					<view class="top">
						<view class="name">管理员</view>
						<view class="time">{{ amdinMessage.time}}</view>
					</view>
					<view class="content">{{amdinMessage.content}}</view>
				</view>
			</view>
			<view class="chat-list" v-for="(item,index) in chatlist"  @click="checkmessage(item)">
				<view class="chat-list-l">
					<!-- <text class="tip">1</text> -->
					<image :src='item.avatar_url'></image>
				</view>
				<view class="chat-list-r">
					<view class="top">
						<view class="name">{{item.user_nickname}}</view>
						<view class="time"> {{item.time}}</view>
					</view>
					<view class="content">{{item.content}}</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
import {getchatlist,getadminmessage} from '../../common/config/api.js'
import wsRequest from '../../common/js/websocket.js' 
import myfun from '../../common/js/myfun.js';
export default{
	data(){
		return {
			amdinMessage:[],
			search:'',
			chatlist:[
				// {info_id:'info_id',
				// user_id:'user_id',
				// user_nickname:'老陈菜',
				// avatar_url:'../../static/pic/people1.webp',
				// time:'2020-10-02',
				// content:'你好，小陈菜',
				// status:'0',
				// msgtype:'0',
				// },
				// {info_id:'info_id',
				// user_id:'user_id',
				// user_nickname:'小陈菜',
				// avatar_url:'../../static/pic/people2.webp',
				// time:'2020-10-02',
				// content:'你个玩意儿，老陈菜',
				// status:'0',
				// msgtype:'0',
				// },
			]
		}
	},
	onShow(){
		// if(this.vuex_hasLogin){
		// 	this.getlist()
		// }else{
		// 	uni.showToast({
		// 		title: '请先登录',
		// 		duration: 2000
		// 	});
		// }
		this.getlist()
	},
	
	onLoad (option) {
		//引用全局websocket并发送消息
		// console.log(getApp().globalData.text)
		//  let msg="{acceptId:2,msgtype:0,info_content:哈哈哈哈}";
		// getApp().globalData.websocket.socketTask.send({
		// 	data:msg,
		// })
		
		// uni.$u.vuex("vuex_haswebsocket",false)
		// if(this.vuex_haswebsocket==false){  //如果没连接websocket
		// 	//this.websocket=new wsRequest("ws://localhost:8081/webSocket",5000,this.vuex_user.user_id)
		// 	uni.$u.vuex("vuex_websocket",new wsRequest("ws://localhost:8081/webSocket",5000,this.vuex_user.user_id))
		// 	uni.$u.vuex("vuex_haswebsocket",true)
		// }
		
		
	},
	methods: {
		getlist(){
			
			//获取管理员消息列表
			getadminmessage({user_id:this.vuex_user.user_id}).then((res)=>{
				console.log(res.data)
				if(res.data!=null){
					this.amdinMessage=res.data
					this.amdinMessage.time=myfun.chatTime(this.amdinMessage.time) //格式化时间
				}
			})
			
			//获取与其他用户消息列表
			getchatlist({user_id:this.vuex_user.user_id}).then((res)=>{
				console.log(res.data)
				this.chatlist=res.data
				for (var i = 0; i < this.chatlist.length; i++) {
					this.chatlist[i].time=myfun.chatTime(this.chatlist[i].time)
				}
			}).catch(()=>{
				console.log("获取消息列表失败")
			})
		},
		checkmessage(e){
			uni.$u.route({
				url:'pages/chat/message',
				params:{
					accept_id:e.user_id,
					avatar_url:e.avatar_url,
					name:e.user_nickname
				}
			})
		},
		adminmessage(){
			uni.$u.route({
				url:'pages/chat/message',
				params:{
					accept_id:0,
					avatar_url:"../../static/img/admin.png",
					name:"管理员"
				}
			})
		}
	},
}
</script>

<style lang="scss" scoped>
	.chats{
		padding: 0 10rpx;
	}
	.chat-list{
		margin: 20rpx 0;
		height: 116rpx;
		
		.chat-list-l{
			height: 96rpx;
			padding: 16rpx 0;
			float: left;
			position: relative;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: 20rpx;
			}
			.tip{
				position: absolute;
				top :0;
				left: 68rpx;
				top:-6rpx;
				min-width:36rpx;
				height: 36rpx;
				background: #E45656;
				border-radius: 50rpx;
				font-size: 24rpx;
				color: #000000;
				line-height: 36rpx;
				text-align: center;
			}
		}
		.chat-list-r{
			padding-left: 128rpx;
			padding-top: 16rpx;
			
			.top{
				height: 50rpx;
				.name{
					float: left;
					font-size: 36rpx;
					font-weight: 400;
					color: #000000;
					line-height: 50rpx;
				}
				.time{
					float: right;
					font-size: 28rpx;
					color:#767A82;
					line-height: 50rpx;
				}
			}
		}
		.content{
			font-size: 30rpx;
			color:#808080;
			line-height: 40rpx;
			overflow: hidden;
			display: -webkit-box; 
			-webkit-box-orient: vertical; 
			-webkit-line-clamp: 1; 
		}
	}
</style>
