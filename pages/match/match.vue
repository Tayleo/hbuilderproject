<template >
	<view >
		<view  class="pic" >	
			<view style="margin-top: 100rpx;">
				<u-button  shape="circle" class="button-style" type="primary" text="点击开始匹配"></u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { postInfos, getMenu } from '../../common/config/api.js';
	export default {		
		
		data() {
			return {
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
			
		}
	}
</script>

<style lang="scss">
page {
	
	background-image:url(../../static/pic/match.webp);
}
	.button-style{
		color:$u-primary;
		width: 400rpx;
		height: 400rpx;
	}
	.pic{
		//background-image:url(../../static/pic/match.webp);
		width: 100%;
		height: 100%;
		background-size: 100%;
	}
	
</style>
