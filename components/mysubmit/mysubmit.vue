<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @click="records">
					<image src="../../static/pic/chat/sound.png"></image>
				</view>
				<!-- <textarea auto-height="true" class="chat-send btn"></textarea> -->
				<u-textarea autoHeight="true" class="btn" v-if="isrecord==true" ></u-textarea>
				<view class="record btn" v-else>按住说话</view>
				<view class="bt-img">
					<image src="../../static/pic/chat/emoji.png"></image>
				</view>
				<view class="bt-img">
					<image src="../../static/pic/chat/add.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isrecord:true
			}
		},
		methods: {
			records(){
				//点击切换音频
				this.isrecord=!this.isrecord;
			}
		}
	}
</script>

<style lang="scss">
		
	.submit{
		background-color: #E5E5E5;
		box-shadow: 0px -1px 0px 0px  rgba(0,0,0,0.1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: 10rpx;
	}
		
	.submit-chat{
		width: 100%;
		display:flex;
		align-items:flex-end;
		box-sizing:border-box;
		padding: 14rpx 10rpx;
		image{
			width:56rpx;
			height: 56rpx;
			margin:0 10rpx;
			flex:auto;
		}	
		.btn{
			flex: auto;
			background-color: #E5E5E5;
			border-radius: 10rpx;
			padding: 4rpx;
			height: 90rpx;
			margin-top: 2rpx;
			max-height: 160rpx;
		}
		.record{
			text-align: center;
			font-size: 44rpx;
			color: rgba(39,40,50,0.6);
			height: 91rpx;
			background-color: #FFFFFF;
		}
	}
</style>
