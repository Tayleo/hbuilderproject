<template>
	<view>
		<view>
			<u-search placeholder="搜索联系人" v-model="search" :clearabled="true" actionText="取消"></u-search>
		</view>
		<view class="chats"  >
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
import {getchatlist} from '../../common/config/api.js'
import myfun from '../../common/js/myfun.js';
export default{
	data(){
		return {
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
				// content:'你个傻逼玩意儿，老陈菜',
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
		
	},
	methods: {
		getlist(){
			getchatlist({user_id:1}).then((res)=>{
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
					avatar_url:e.avatar_url
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
