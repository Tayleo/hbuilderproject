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
		
		<u-popup safeAreaInsetTop="true" :show="showresult" @close="close" @open="open" :round="10" overlayOpacity="0.3">
			<view style="popstyle">
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="4.5">
						<view class="demo-layout-left">
								<u--image :showLoading="true"
								:src="baseinfo.picUrl" 
								width="100px" height="120px" v-if="role_id==2" ></u--image>
								<u--image :showLoading="true"
								:src="baseinfo.childrenUrl" 
								width="100px" height="120px" v-else ></u--image>
						</view>
					</u-col>
					<u-col span="7.5">
						<view class="demo-layout-right">
							<view v-if="role_id==2">
								<view class=" text-style-bold" >姓名：{{baseinfo.realName}}</view>
								
								<view class=" text-style-bold" v-if="baseinfo.gender==1">性别：男</view>
								<view class=" text-style-bold" v-else>性别：女</view>
								<view class=" text-style-bold">年龄：{{baseinfo.age}}</view>
								<view class=" text-style-bold">出生年月：{{baseinfo.birthday}}</view>
								<view class=" text-style-bold">居住地：{{baseinfo.nowAddress}}</view>
							</view>
							<view v-else>
								<view class=" text-style-bold" >姓名：{{baseinfo.childrenName}}</view>
								<view class=" text-style-bold" v-if="baseinfo.childrenGender==1">性别：男</view>
								<view class=" text-style-bold" v-else>性别：女</view>
								<view class=" text-style-bold">年龄：{{baseinfo.childrenAge}}</view>
								<view class=" text-style-bold">出生年月：{{baseinfo.birthday}}</view>
								<!-- <view class=" text-style-bold">居住地：{{baseinfo.nowAddress}}</view> -->
							</view>
							
						</view>
					</u-col>
				</u-row>
				<view class="titletext">
					<view style="padding-top: 15rpx; padding-left: 5rpx;"> 走失相关信息</view>
				</view>
				<view class="list" >
					<view class="li" v-for="(li, li_i) in lostinfoList"  :key="li_i">
						<view class="text">{{ li.name }}:  {{li.info}}</view>
					</view>
				</view>
				
				<button style="background-color: #12ae96;color: white;" @click="moreinfo()">点击查看详情</button>
				
			</view>
			
		</u-popup>
		
	</view>
</template>

<script>
	import { postInfos, getMenu ,startMatch} from '../../common/config/api.js';
	export default {		
		
		data() {
			return {
				role_id:null,
				showresult:false,
				matchsrc:'../../static/pic/match.webp',
				baseinfo:[],
				lostinfoList:[
					{name: '走失时间',info:''},
					{name: '走失地点',info:''},
					{name: '个人特征',info :''},
					{name: '走失详情',info :''},
					
				],
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
				//发送匹配请求
				startMatch({user_id:this.vuex_user.user_id,role_id:this.vuex_user.role_id}).then((res)=>{
					if(res.data!=null){
						this.baseinfo=res.data
						console.log(res.data)
						this.role_id=res.count
						this.lostinfoList[0].info=res.data.lostTime
						this.lostinfoList[1].info=res.data.lostAddress
						this.lostinfoList[2].info=res.data.features
						this.lostinfoList[3].info=res.data.details
						
						this.showresult=true
					}
				}).catch((res)=>{
					
				})
				
				
			},
			tomymatch(){
				uni.$u.route('/pages/match/mymatch');
			},
			close(){
				this.showresult=false
			},
			open(){
				console.log("open")
			},
			moreinfo(){
				//跳转到详细信息界面
				console.log(this.baseinfo.userId)
				console.log(this.role_id)
				uni.$u.route({
					url: 'pages/info/info',
					params: {
						user_id:this.baseinfo.userId,
						role_id:this.role_id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #FFFFFF ;
	}
	.titletext{
		font-size: 28rpx;
		background-color: #f1f1f1;
		
		height: 60rpx;
		
	}
	.popstyle{
		width: 98%;
	}
	.demo-layout-left {
		height: 160px;
		padding: 10rpx;
		margin-left: 20rpx;
		margin-top: 40rpx;
	}
	.demo-layout-right {
		height: 160px;
		padding: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 25rpx;
		
	}
	.text-style-bold{
		font-weight: bold;
		padding: 5rpx;
		margin: 10rpx;
	}
	.list {
		width: 100%;
		/* border-bottom: solid 26upx #f1f1f1; */
		.li {
			width: 92%;
			// height: 100upx;
			// margin-top:20rpx;
			// margin-bottom:20rpx;
			padding: 1% 3%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;
			&.noborder {
				border-bottom: 0;
			}
			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;
				image {
					width: 50upx;
					height: 50upx;
				}
			}
			.text {
				padding-left: 10upx;
				width: 100%;
				color: #000000;
				font-size: 35rpx;
				
			}
			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx;
			}
			.icon-next {
				font-size: $font-size-34;
				color: $font-color-999;
			}
		}
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
