<template>
	<view >
		<view v-for="(item,index) in starlist" @click="moreinfo(item)">
			<view style="margin-left: 20rpx;">{{item.match_time}}</view>
			<view class="list">
				<view class="list-left">
					<image class="img" :src='item.avatar'></image>
				</view>
				<view class="list-right">
					<view class="top">
						<view class="name">{{item.name}}</view> 
						<view class="starimg" @click.stop="deletematchs(item.user_id)" >删除</view>
					</view>
					<view class="text">{{item.birthday}}</view>
					<view class="details" >{{item.details}}</view>
				</view>
			</view>	
		 </view>
	</view>
	
	
	
</template>

<script>
	import {getmatchlist,deleteMatch} from '../../common/config/api.js'
	import myfun from '../../common/js/myfun.js'
	export default {
		data() {
			return {
				oldtime:new Date(),
				starlist:[
					],
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getmycols();
		},
		methods: {
			 
			deletematchs(e){
				//删除收藏记录
				deleteMatch({user_id:this.vuex_user.user_id,match_id:e}).then((res=>{
					console.log("删除成功")
					this.getmycols()
				}))
			},
			
			getmycols(){
				//查询我的匹配
				getmatchlist({user_id:this.vuex_user.user_id}).then((res)=>{
					this.starlist=res.data
					this.starlist.sort(function(a, b) {
					    return b.match_time< a.match_time? -1 : 1
					})
					console.log(this.starlist)
					
					this.starlist[0].match_time=myfun.getyearmonth(this.starlist[0].match_time)
					this.oldtime=this.starlist[0].match_time
					for (var i = 1; i < this.starlist.length; i++) {
						//时间间隔
						let t=myfun.starspacetime(this.oldtime,this.starlist[i].match_time)
						if(t){
							this.oldtime=t
						}
						this.starlist[i].match_time=t
					}
					
					
					
				}).catch((err)=>{
					console.log(err)
				})
			},
			//跳转到用户详情界面
			moreinfo(item){
				console.log(item);
				uni.$u.route({
					url: 'pages/info/info',
					params: {
						user_id:item.user_id,
						role_id:item.user_role
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #ebebeb ;
	}
	.list{
		box-shadow: 0 1px 1px rgba(156, 156, 156, 1);
		width: 98%;
		height: 210rpx;
		margin-top: 10rpx;
		background-color: white;
		margin-left: 1%;
		border-radius: 20rpx;
		.list-left{
			float: left;
			position: relative;
			.img{
				margin-top: 20rpx;
				margin-left: 20rpx;
				width: 170rpx;
				height: 170rpx;
			}
		}
		.list-right{
			padding-top:20rpx ;
			padding-left: 220rpx;
			position: relative;
			.top{
				height: 50rpx;
				.name{
					float: left;
					font-size: 36rpx;
				}
				.icon{
					float: right;
					width: 50rpx;
					height: 50rpx;
					
					padding-right: 40rpx;
				}
			}
			.text{
				font-size: 36rpx;
				margin: 5rpx;
			}
		}
	}
	.starimg{
		width: 100rpx;
		float: right;
		color: #555555;
	}
	.details{
		font-size: 36rpx;
		margin: 5rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		 white-space:nowrap
		
	}
</style>
