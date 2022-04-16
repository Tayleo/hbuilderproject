<template>
	<view>
		<view class="header">
			<view class="userinfo" >
				<view class="face"><image :src="vuex_user.user_avator_url ||'/static/img/head.png'"></image></view>
				<view class="info" v-if="vuex_hasLogin">
					<view class="username">{{vuex_user.user_nickname}}</view>
					<!-- <view v-if="userInfo.memberRole==0" class="integral">{{ userInfo.phone }}</view>
					<view v-else class="integral">{{userInfo.company}} . {{userInfo.postName}}</view> -->
				</view>
				<view class="info" v-else  @click="wxlogin" >
					<view class="username">未登录</view>
					<view class="integral">点击进行登陆</view>
				</view>
			</view>
			<view class="setting"><image src="../../static/HM-PersonalCenter/setting.png"></image></view>
		</view>
		<view class="orders">
			
			<view class="box" >
				<view class="label" v-for="(row, index) in orderTypeLise2" :key="row.name" hover-class="hover" @tap="toOrderType2(index)">
					<view class="icon">
						<view class="badge" v-if="row.badge > 0">{{ row.badge }}</view>
						<text class="yzb label-icon" :class="row.icon"></text>
					</view>
					{{ row.name }}
				</view>
			</view>
			
		</view>
		<view class="list" v-for="(list, list_i) in severList" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="icon"><image :src="'../../static/HM-PersonalCenter/sever/' + li.icon"></image></view>
				<view class="text">{{ li.name }}</view>
				<text class="yzb yzb-next icon-next"></text>
			</view>
		</view>
		
		<view>
			<u-picker :show="showrole" ref="uPicker" :columns="columnroles" @confirm="roleconfirm">
				
			</u-picker>
			
		</view>
		<!-- <u-popup show="applywx" mode="bottom">
			<view>
				<view style="margin: 50rpx;">儿童救助系统申请</view>
				<view style="margin: 50rpx;">获取你的昵称，头像，地区及性别</view>
				<view>
					<u-row>
						<u-col span="2" style="margin: 50rpx;">
							<u-avatar></u-avatar>
						</u-col>
						<u-col span="10">
							<view>微信个人信息</view>
							<view>老陈才</view>
						</u-col>
					</u-row>
				</view>
				<u-row>
					<u-col span="6">
						<u-button @click="wxrefuse">拒绝</u-button>
					</u-col>
					<u-col span="6">
						<u-button @click="wxlogin">允许</u-button>
					</u-col>
				</u-row>
				
				
			</view>
		</u-popup> -->
	</view>
</template>
<script>
import {postlogin,CancelBindWechat,chasrelease,changerole} from '../../common/config/api.js';
export default {
	data() {
		return {
			showrole:false,
			applywx:false,
			orderTypeLise2: [
				//name-标题 icon-图标 badge-角标
				{ name: '我的身份', show:true,icon: 'yzb-liulanjilu', badge: 0, url: null},
				{ name: '我的发布', show:true, icon: 'yzb-jianli', badge: 1, url: null },
				{ name: '我的匹配', show:true,icon: 'yzb-mianshiyaoqing', badge: 0, url:null},
				{ name: '我的收藏', show:true,icon: 'yzb-ziyuan141', badge: 2, url: null },
			],
			severList: [
				[
					{ name: '修改信息', show:true,icon: 'momey.png', url: null}, 
					// { name: '求职意向', icon: 'point.png', url: this.$mRoutesConfig.editExpect}, 
					{ name: '隐私设置', show:true,icon: 'quan.png', url:null}, 
					{ name: '退出登录', show:true,icon: 'renw.png', url:"zhaopin" }],
				[
					{ name: '帮助中心', show:true,icon: 'mingxi.png', url: null},
					{ name: '意见反馈', show:true,icon: 'choujiang.png', url: null},
					{ name: '关于我们', show:true,icon: 'addr.png', url: null},
					{ name: '在线客服', show:true,icon: 'kefu.png', url: null},
					{ name: '系统设置', show:true,icon: 'bank.png', url: null},
				]
			],
			columnroles:[
				['走失者','寻亲者','游客']
			]
			
		};
	},
	onShow() {
		// if (this.hasLogin) {
		// 	this.getUserInfo();
		// }
		console.log('是否一登录'+this.vuex_hasLogin);
	},
	methods: {
			//微信信息授权
		wxlogin(){
			uni.getUserProfile({
				desc:"微信信息授权",
				success: infoRes =>{
					
					wx.login({
						 success: res=> {
							
							//this.onShow();
							//将获取到的信息传入后端，后端存入数据库以及解密openid
							postlogin({code:res.code,userinfo:infoRes}).then((res)=>{
								//登录成功，修改hasLogin标志为已登录,
								uni.$u.vuex('vuex_hasLogin', true);
								//可以拿回来session_key以及openid,将openid存入全局变量
								console.log(res.data.open_id);
								uni.$u.vuex('vuex_user.open_id',res.data.open_id)
								//存用户角色信息(角色以及id)
								uni.$u.vuex('vuex_user.role_id',res.data.role_id)
								uni.$u.vuex('vuex_user.user_id',res.data.user_id)
								//将个人信息传递给后端并且存入数据库
								uni.$u.vuex('vuex_user.user_nickname', infoRes.userInfo.nickName)
								uni.$u.vuex('vuex_user.user_avator_url',infoRes.userInfo.avatarUrl)
								//uni.$u.vuex('vuex_token',res.token)
							}).catch((err)=>{
								console.log(err);
							})
							
							console.log(this.vuex_user);
							console.log(this.vuex_hasLogin);
						 }
					 })
				},
				fail:()=>{
					console.log("失败")
				},
			})
		},
		userlogin(){
			//如果用户已经登录，获取用户信息
			//如果没有登录，则执行登录操作
			
			console.log("denglu");
		},


		//用户点击列表项
		toPage(list_i, li_i) {
			
			if(list_i==0&&li_i==2){
				if(this.vuex_hasLogin){
					//uni.$u.vuex('vuex_user',null)
					//uni.$u.vuex('vuex_hasLogin',false)
					//console.log(this.vuex_user)
					//即点击退出登录功能，取消微信绑定
					//而取消用户绑定，只需要置空服务器端用户表对应记录的openId，并置空本地用户的openid信息即可
					CancelBindWechat({user_id:this.vuex_user.user_id}).then((res)=>{
						uni.$u.vuex('vuex_hasLogin',false)
						uni.$u.vuex('vuex_user.open_id',null)
						uni.$u.vuex('vuex_user.user_nickname', null)
						uni.$u.vuex('vuex_user.user_avator_url',null)
						uni.$u.vuex('vuex_user.role_id',null)
						uni.$u.vuex('vuex_user.user_id',null)
						//this.onShow();
					}).catch((err)=>{
						console.log(err)
					})
				}else{
					
				}
				
			}
		},
		
	
		toOrderType2(index){
			if(this.vuex_hasLogin==false){
				uni.showToast({
					icon:'error',
					title: '请先登录',
					duration: 2000
				});
			}else{
				switch(index){
					
					case 0:
						this.showrole=true;
						break;
					case 1:
						//console.log(this.vuex_user.role_id)
						if(this.vuex_user.role_id==2){
							//如果用户已经发布信息，则跳转到查看发布信息页面
							chasrelease({user_id:this.vuex_user.user_id}).then((res)=>{
								if(res.data==null){
									uni.$u.route('/pages/mainpage/manageinfo/releaseinfo');
								}else{
									uni.$u.route('/pages/mainpage/manageinfo/lookinfo');
								}
							})
							//如果用户没有发布信息，则跳转到发布信息页面
							
						}else if(this.vuex_user.role_id==3){
							
						}else{
							
						}
						
						break;
					case 2 :
						break;
					case 3:
						break;
					default: ;
				}
			}
		},
		
		roleconfirm(e){
			// const {
			// 	index,
			// 	// 微信小程序无法将picker实例传出来，只能通过ref操作
			// 	picker = this.$refs.uPicker
			// } = e	
			if(this.vuex_user.role_id!=e.indexs[0]){
				//如果用户改变身份
				//console.log(this.vuex_user.user_id)
				changerole({user_id:this.vuex_user.user_id, role_id:e.indexs[0]}).then(()=>{
					uni.$u.vuex('vuex_user.role_id',e.indexs[0]+2)
					uni.showToast({
						title: '修改身份成功',
						duration: 2000,
					})
				}).catch(()=>{
					uni.showToast({
						icon:'error',
						title: '修改身份失败',
						duration: 2000
					});
				})
			}
			this.showrole=false;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.header {
	&.status {
		padding-top: var(--status-bar-height);
	}
	background-color: #12ae85;
	width: 100%;
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
	width: 100%;
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

