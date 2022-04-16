<template>
	<view>
		
		<view class="u-page">
			<view class="u-demo-block">
				<view class="u-demo-block__content">
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="6.5">
							<view class="demo-layout">
								<view v-if="type==0">
									<view class=" text-style-bold" style="padding-top: 20rpx;">姓名：{{baseinfo.realName}}</view>
									<view class=" text-style-bold">性别：{{baseinfo.gender}}</view>
									<view class=" text-style-bold">年龄：{{baseinfo.age}}</view>
									<view class=" text-style-bold">出生年月：{{baseinfo.birthday}}</view>
									<view class=" text-style-bold">居住地：{{baseinfo.nowAddress}}</view>
								</view>
								<view v-else>
									<view class=" text-style-bold" style="padding-top: 20rpx;">姓名：{{baseinfo.childrenName}}</view>
									<view class=" text-style-bold">性别：{{baseinfo.childrenGender}}</view>
									<view class=" text-style-bold">年龄：{{baseinfo.childrenAge}}</view>
									<view class=" text-style-bold">出生年月：{{baseinfo.birthday}}</view>
									<!-- <view class=" text-style-bold">居住地：{{baseinfo.nowAddress}}</view> -->
								</view>
								
							</view>
						</u-col>
						<u-col span="5.5">
							<view class="demo-layout">
								<u--image :showLoading="true"
								:src="'https://cdn.uviewui.com/uview/album/4.jpg'" 
								width="140px" height="180px" @click="click"></u--image>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		
		
		<view style="border-top: solid 26upx #f1f1f1">走失相关信息</view>
		<view class="list" >
			<view class="li" v-for="(li, li_i) in lostinfoList"  :key="li_i">
				<view class="text">{{ li.name }}:{{li.info}}</view>
			</view>
		</view>
		
		<view>联系方式</view>
		<view class="list" >
			<view class="li" v-for="(li, li_i) in moreinfoList"  :key="li_i">
				<view class="text">{{ li.name }}:{{li.info}}</view>
			</view>
		</view>
		
		<u-tabbar
			:value="tabber_value"
			@change="name => tabber_value = name"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="私聊" icon="chat" @click="chat" ></u-tabbar-item>
			<u-tabbar-item text="收藏" icon="star" @click="star" ></u-tabbar-item>
		</u-tabbar>
		
		
	</view>
	
	
	
	
</template>

<script>
	import {postchildrenbyid,postRelativeById} from '../../common/config/api.js'
	export default {
		data() {
			return {
				type:0,
				user_id:1,
				tabber_value:0,
				
				baseinfo:{},
				
				lostinfoList:[
					{name: '走失时间',info:''},
					{name: '走失地点',info:''},
					{name: '走失时穿着',info :''},
					{name: '走失时身高',info :''},
					{name: '走失详细描述',info :''},
					{name: '个人特征描述',info :''},
				],
				moreinfoList:[
					{name: '电话', show: true, info :''},
					{name: '邮箱', show: true, info :''},
					{name: '寻找人名称', show: true, info :''},
					{name: '与被寻人关系', show: true, info :''},
				],
			}
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			
			this.user_id=parseInt(option.user_id);
			this.type=parseInt(option.type);
			//this.landmore();
		},
			
		methods: {
			landmore(){
				if(this.type==0){
					//发送请求给children
					postchildrenbyid({user_id:this.user_id}).then((res)=>{
						this.baseinfo=res.data
						this.lostinfoList[0].info=this.baseinfo.lostTime
						this.lostinfoList[1].info=this.baseinfo.lostAddress
						this.lostinfoList[2].info=this.baseinfo.lostCloth
						this.lostinfoList[3].info=this.baseinfo.lostHeight
						this.lostinfoList[4].info=this.baseinfo.details
						this.lostinfoList[5].info=this.baseinfo.features
						
						this.moreinfoList[0].info=this.baseinfo.phone
						this.moreinfoList[1].info=this.baseinfo.eMail
						this.moreinfoList[2].info=this.baseinfo.phone
						this.moreinfoList[3].info=this.baseinfo.phone
						
						// console.log(this.baseinfo)
					}).catch(()=>{
						 console.log('获取数据失败')
					})
				}else{
					//发送请求给children
					postRelativeById({user_id:this.user_id}).then((res)=>{
						console.log(res)
						this.baseinfo=res.data
					})
				}		
			},
			chat(){
				//进行聊天
				console.log(this.user_id)
				// uni.$u.route('/pages/chat/message',{
				// 	accept_id:this.user_id
				// })
				uni.$u.route({
					url: '/pages/chat/message',
					params: {
					
						accept_id:this.user_id
					}
				})
			},
			star(){
				//点击进行收藏，再次点击取消收藏
				console.log("this is star")
				
			}
		}
		
	}
</script>

<style lang="scss">
	.demo-layout {
		height: 180px;
		border-radius: 4px;
		padding: 10rpx;
	}
	.text-style-bold{
		font-weight: bold;
		padding: 5rpx;
	}
	
	
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}
		background-color: #12ae85;
		width: 92%;
		height: 30vw;
		padding: 0 4%;
		display: flex;
		align-items: center;
		.userinfo {
			width: 90%;
			display: flex;
			.face {
				flex-shrink: 0;
				width: 17vw;
				height: 17vw;
				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;
				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx;
					margin-left: 10upx;
				}
				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx;
				}
			}
		}
		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.hover {
		background-color: #eee;
	}
	.orders {
		background-color: #12ae85;
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;
		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;
				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;
					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}
					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
	
				.label-icon {
					font-size: 48upx;
					color: $main-color;
				}
			}
		}
	}
	.list {
		width: 100%;
		border-bottom: solid 26upx #f1f1f1;
		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
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
				padding-left: 30upx;
				width: 100%;
				color: #666;
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
</style>
