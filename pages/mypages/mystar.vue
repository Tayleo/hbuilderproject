<template>
	<view >
		<view v-for="(item,index) in starlist">
			<view style="margin-left: 20rpx;">{{item.col_time}}</view>
			<view class="list">
				<view class="list-left">
					<image class="img" :src='item.avatar'></image>
				</view>
				<view class="list-right">
					<view class="top">
						<view class="name">{{item.name}}</view> 					
					</view>
					<view class="text">{{item.birthday}}</view>
					<view class="details" >{{item.details}}</view>
				</view>
			</view>	
		 </view>
	</view>
	
	
	
</template>

<script>
	import {getstarlist} from '../../common/config/api.js'
	import myfun from '../../common/js/myfun.js'
	export default {
		data() {
			return {
				oldtime:new Date(),
				starlist:[
					{
						avatarurl:'https://cdn.uviewui.com/uview/album/1.jpg',
						name:'hahha',
						details:'',
						birthday:'',
						user_id:'',
						col_time:'',
					},],
			}
		},
		onLoad() {
			this.getmycols();
		},
		methods: {
			getmycols(){
				//查询我的收藏
				getstarlist({user_id:1}).then((res)=>{
					this.starlist=res.data
					this.starlist.sort(function(a, b) {
					    return b.col_time< a.col_time? -1 : 1
					})
					console.log(this.starlist)
					
					this.starlist[0].col_time=myfun.getyearmonth(this.starlist[0].col_time)
					this.oldtime=this.starlist[0].col_time
					for (var i = 1; i < this.starlist.length; i++) {
						//时间间隔
						let t=myfun.starspacetime(this.oldtime,this.starlist[i].col_time)
						if(t){
							this.oldtime=t
						}
						this.starlist[i].col_time=t
					}
					
					
					
				}).catch((err)=>{
					console.log(err)
				})
			}
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
		width: 80rpx;
		height: 80rpx;
		float: left;
	}
	.details{
		font-size: 36rpx;
		margin: 5rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		 white-space:nowrap
		
	}
</style>
