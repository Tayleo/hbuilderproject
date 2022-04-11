<template>
	<view>
		<u-button  open-type="getUserInfo" @tap="login"></u-button>
		<u-popup :show="show" mode="center"  @close="close" @open="open">
		        <view>
		            <text>人生若只如初见，何事秋风悲画扇</text>
		        </view>
		</u-popup>
	</view>
	
	
	
</template>

<script>
	
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {
			
			open() {
			        // console.log('open');
			      },
			      close() {
			        this.show = false
			        // console.log('close');
			      },
			// 登录部分
			login(){
				// 获取code 小程序专有，用户登录凭证。
				uni.getUserProfile({
					desc: "获取用户基本资料",
					success : (res)=>{
						console.log(res);
						this.userInfo = res.userInfo;
					},
					// 用户取消登录后的提示
					fail: (res)=>{
						uni.showModal({
							title:"授权用户信息失败！",
							// 是否显示取消按钮，默认为 true
							showCancel:false
						})
					}
				})
				//获取成功基本资料后开启登录，基本资料首先要授权
				uni.login({
					provider : 'weixin',
					success : (res)=>{
						console.log(res);
						if(res.errMsg == "login:ok"){
							let code =res.code;
						}
					}
				})
			},
			// 退出登录
			change(){
				// 这里只是改变了按钮文字内容，真正退出需要清除token，回到首页,还没找到头绪怎么做
				this.logState = '已登录';
			}
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
