<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				
				<!-- <textarea auto-height="true" class="chat-send btn"></textarea> -->
				<u-textarea autoHeight="true" class="btn"  v-model="msgvalue"></u-textarea>
				
				<view class="bt-img">
					<!-- <image src="../../static/pic/chat/add.png"></image> -->
					<u-button @click="inputs">发送</u-button>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isrecord:true,
				isemoji:false,
				toc:'../../static/pic/chat/sound.png',
				msgvalue:'',
			}
		},
		methods: {
			//获取模块高度
			getElementHeight(){
				const query=uni.createSelectorQuery().in(this)
				
				query.select('.submit').boundingClientRect(data=>{
					this.$emit("heights",data.height)
				}).exec(function(){
					
				})
			},
			
			//点击切换音频
			records(){
				if(this.isrecord==true){
					this.isrecord=false
					this.toc='../../static/pic/chat/keypress.png'
				}else{
					this.isrecord=true
					this.toc='../../static/pic/chat/sound.png'
				}
			},
			//表情
			emoji(){
				this.isemoji=!this.isemoji
				if(this.isemoji){
					setTimeout(()=>{
						this.getElementHeight()
					},0)
				}else{
					this.$emit("heights",0)
				}
				
				
			},
			sendmsg(){
				console.log(this.msgvalue)
			},
			//发送
			inputs(){
				if(this.msgvalue.length>0){
					//有内容时
					this.$emit('inputs',this.msgvalue)
					this.msgvalue=''
				}
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
	.emoji{
		width: 100%;
		height: 380rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0px -1px 0px 0px rgba(0,0,0,0.1);
	}
</style>
