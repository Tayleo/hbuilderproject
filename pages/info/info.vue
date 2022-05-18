<template>
	<view>	
		<view class="top">
			<u-row customStyle="margin-bottom: 10px">
				<u-col span="4.5">
					<view class="demo-layout-left">
							<u--image :showLoading="true"
							:src="baseinfo.picUrl" 
							width="100px" height="120px" v-if="type==0||role_id==2" ></u--image>
							<u--image :showLoading="true"
							:src="baseinfo.childrenUrl" 
							width="100px" height="120px" v-else ></u--image>
					</view>
				</u-col>
				<u-col span="7.5">
					<view class="demo-layout-right">
						<view v-if="type==0||role_id==2">
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
		</view>
			
		
		<!-- style="border-top: solid 26upx #f1f1f1" -->
		<view class="titletext">
			<view style="padding-top: 15rpx; padding-left: 5rpx;"> 走失相关信息</view>
		</view>
		<view class="list" >
			<view class="li" v-for="(li, li_i) in lostinfoList"  :key="li_i">
				<view class="text">{{ li.name }}:  {{li.info}}</view>
			</view>
		</view>
		
		<view class="titletext">
			<view style="padding-top: 15rpx; padding-left: 5rpx;"> 联系方式</view>
		</view>
		<view class="list" v-if="type==0||role_id==2">
			<view class="li" v-for="(li, li_i) in childrenmoreinfo"  :key="li_i">
				<view class="text">{{ li.name }}:  {{li.info}}</view>
			</view>
		</view>
		<view class="list" v-else>
			<view class="li" v-for="(li, li_i) in moreinfoList"  :key="li_i">
				<view class="text">{{ li.name }}:  {{li.info}}</view>
			</view>
		</view>
		
		<u-tabbar
			:value="tabber_value"
			@change="name => tabber_value = name"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			activeColor="#7d7e80"
		>
			<u-tabbar-item text="私聊" :icon="chaticon" @click="chat" ></u-tabbar-item>
			<u-tabbar-item text="收藏" :icon="staricon" @click="star" ></u-tabbar-item>
		</u-tabbar>
		
		
	</view>
	
	
	
	
</template>

<script>
	import {postchildrenbyid,postRelativeById,addCol,deleteOneCol,isStar} from '../../common/config/api.js'
	import myfun from '../../common/js/myfun.js'
	export default {
		data() {
			return {
				role_id:null,
				type:0,
				user_id:0,
				tabber_value:0,
				chaticon:'../../../static/icon/Chat-outlined.png',
				staricon:'../../../static/icon/Star-outlined.png',
				baseinfo:{},
				name:'',
				lostinfoList:[
					{name: '走失时间',info:''},
					{name: '走失地点',info:''},
					{name: '走失穿着',info :''},
					{name: '走失身高',info :''},
					{name: '走失详情',info :''},
					{name: '个人特征',info :''},
				],
				moreinfoList:[
					{name: '电话', show: true, info :''},
					{name: '邮箱', show: true, info :''},
					
					{name: '与被寻人关系', show: true, info :''},
				],
				childrenmoreinfo:[
					{name: '电话', show: true, info :''},
					{name: '邮箱', show: true, info :''},
				],
			}
		},
		
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			
			this.user_id=parseInt(option.user_id);
			this.type=parseInt(option.type);
			this.role_id=this.type+2;
			this.role_id=parseInt(option.role_id)
			
			// this.user_id=5;
			// this.type=0;
			this.landmore();
		},
			
		methods: {
			landmore(){
				if(this.type==0||this.role_id==2){
					//发送请求给children
					postchildrenbyid({user_id:this.user_id}).then((res)=>{
						this.name=res.data.realName
						this.baseinfo=res.data
						this.lostinfoList[0].info=this.baseinfo.lostTime
						this.lostinfoList[1].info=this.baseinfo.lostAddress
						this.lostinfoList[2].info=this.baseinfo.lostCloth
						this.lostinfoList[3].info=this.baseinfo.lostHeight
						this.lostinfoList[4].info=this.baseinfo.details
						this.lostinfoList[5].info=this.baseinfo.features
						
						this.childrenmoreinfo[0].info=this.baseinfo.phone
						this.childrenmoreinfo[1].info=this.baseinfo.eMail
						// this.moreinfoList[2].info=this.baseinfo.phone
						// this.moreinfoList[3].info=this.baseinfo.phone
						
						// console.log(this.baseinfo)
					}).catch(()=>{
						 console.log('获取数据失败')
					})
				}else{
					//发送请求给relative
					postRelativeById({user_id:this.user_id}).then((res)=>{
						console.log(res.data)
						
						this.name=res.data.childrenName
						this.baseinfo=res.data
						
						this.lostinfoList[0].info=this.baseinfo.lostTime
						this.lostinfoList[1].info=this.baseinfo.lostAddress
						this.lostinfoList[2].info=this.baseinfo.lostCloth
						this.lostinfoList[3].info=this.baseinfo.lostHeight
						this.lostinfoList[4].info=this.baseinfo.details
						this.lostinfoList[5].info=this.baseinfo.features
						
						this.moreinfoList[0].info=this.baseinfo.phone
						this.moreinfoList[1].info=this.baseinfo.eMail
						this.moreinfoList[2].info=this.baseinfo.relation
						
						
					})
				}	
				//查询用户是否被收藏
				isStar({user_id:this.vuex_user.user_id,star_id:this.user_id}).then((res)=>{
					console.log(res.data)
					if(res.data==true){  //如果已经被收藏
						this.staricon="../../../static/icon/Star-filled.png"
					}
				})
			},
			chat(){
				console.log(this.user_id)
				uni.$u.route({
					url: '/pages/chat/message',
					params: {
						accept_id:this.user_id,
						avatar_url:this.baseinfo.picUrl,
						name:this.name
					}
				})
			},
			star(){
				//点击进行收藏，再次点击取消收藏
				if(this.staricon=="../../../static/icon/Star-outlined.png"){
					//点击收藏
					var time=myfun.createtime()
					addCol({user_id:this.vuex_user.user_id,col_id:this.user_id,time:time}).then(()=>{
						console.log("收藏成功")
						this.staricon="../../../static/icon/Star-filled.png"
					})
				}else{
					//再次点击取消收藏
					deleteOneCol({user_id:this.vuex_user.user_id,col_id:this.user_id}).then(()=>{
						console.log("取消收藏成功")
						this.staricon="../../../static/icon/Star-outlined.png"
					})
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.titletext{
		font-size: 28rpx;
		background-color: #f1f1f1;
		
		height: 60rpx;
		
	}
	.top{
		height: 350rpx;
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
		/* border-bottom: solid 26upx #f1f1f1; */
		.li {
			
			width: 92%;
			// height: 100upx;
			// margin-top:20rpx;
			// margin-bottom:20rpx;
			padding: 4% 3%;
			
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
</style>
