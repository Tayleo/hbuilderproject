<template >
	<view >
		
		<view class="top" @click="tomymatch">
			<view class="text">查看匹配记录</view>
			<image class="icon" src="../../static/icon/right.png"></image>
		</view>
		
		<view class="center">
			
			<view class="match" @click="startmatch">
				<view class="text">开始匹配</view>
			</view>
		</view>
		
		<u-popup :show="showresult" @close="close" @open="open">
			<view>
				<text>出淤泥而不染，濯清涟而不妖</text>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import { postInfos, getMenu } from '../../common/config/api.js';
	export default {		
		
		data() {
			return {
				showresult:false,
				matchsrc:'../../static/pic/match.webp',
			}
		},
		onLoad(){
			
			// postInfos({ custom: { auth: true }}).then((res) => {
			// 				console.log(res)
			// 			}).catch((e) =>{
			// 				console.log(e)
			// 			})
		
						
			// getMenu({ custom: { auth: true }}).then((res) => {
			// 	//如果发生异常那么就不会执行里面的语句
			// 	console.log(res)
			// }).catch((e) =>{
			// 	console.log(e)
			// })
			//console.log(this.vuex_version)
			//新增vuex变量
			//this.$u.vuex('vuex_name','Tom')
			
			//console.log(this.vuex_name)
			
		},
		
		methods: {
			startmatch(){
				//this.showresult=true
				console.log("hahhaha")
			},
			tomymatch(){
				uni.$u.route('/pages/match/mymatch');
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #FFFFFF ;
	}
	.top{
		background-color: #12ae96;
		margin-top: 100rpx;
		width: 90%;
		height: 140rpx;
		margin-left: 5%;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		.text{
			margin-left: 80rpx;
			float: left;
			color: white;
			font-size: 38rpx;
		}
		.icon{
			
			margin-left: 260rpx;
			width: 50rpx;
			height: 50rpx;
		}
	}
	.center{
		display:flex;
		text-align: center;
		justify-content: center;
		margin-top: 70rpx;
		.match{
			background-color: #12AE96;
			width: 450rpx;
			height: 450rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.text{
			font-size: 50rpx;
			color: white;
		}
	}
	
</style>
