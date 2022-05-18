<template>
	
	<view>
		<u--form labelPosition="left" :model="model" ref="form1">
			<u-form-item  v-if="vuex_user.role_id==2">
				<view class="text">个人基本信息</view>
			</u-form-item>
			<u-form-item  v-if="vuex_user.role_id==3">
				<view class="text">走失人基本信息</view>
			</u-form-item>
			<view class="form">
				<u-form-item label="照片" prop="name" borderBottom >
					<u-image v-if="vuex_user.role_id==3" width="200rpx" height="200rpx" :src="releaseinfo.childrenUrl"></u-image>
					<u-image v-else width="200rpx" height="200rpx" :src="releaseinfo.picUrl"></u-image>
				</u-form-item>
				<u-form-item label="姓名" prop="name" borderBottom >
					<u-text v-if="vuex_user.role_id==2" :text="releaseinfo.realName"></u-text>
					<u-text v-else :text="releaseinfo.childrenName"></u-text>
				</u-form-item>
				<u-form-item label="性别" prop="userInfo.sex"  >
					<u-text v-if="releaseinfo.gender==1||releaseinfo.childrenGender==1" text="男"></u-text>
					<u-text v-else text="女"></u-text>
				</u-form-item>
				<u-form-item  label="年龄" prop="age">
					<u-text v-if="vuex_user.role_id==2" :text="releaseinfo.age"></u-text>	
					<u-text v-else :text="releaseinfo.childrenAge"></u-text>		
				</u-form-item>
				<u-form-item label="出生日期" prop="birthday">
					<u-text :text="releaseinfo.birthday"></u-text>
				</u-form-item>
				<view v-if="vuex_user.role_id==2">
					<u-form-item  label="现居住地" prop="address">
						<u-text :text="releaseinfo.nowAddress"></u-text>
					</u-form-item>
					<u-form-item label="联系电话">
						<u-text :text="releaseinfo.phone"></u-text>
					</u-form-item>
					<u-form-item label="联系邮箱">
						<u-text :text="releaseinfo.eMail"></u-text>
					</u-form-item>
				</view>
			</view>
			
			
		
			<u-form-item >
				<view class="text">走失信息</view>
			</u-form-item>
			<view class="form">
				<u-form-item label="时间">
					<u-text :text="releaseinfo.lostTime"></u-text>
				</u-form-item>
				<u-form-item label="地点">
					<u-text :text="releaseinfo.lostAddress"></u-text>
				</u-form-item>
				<u-form-item label="穿着">
					<u-text :text="releaseinfo.lostCloth"></u-text>
				</u-form-item>
				<u-form-item label="身高">
					<u-text :text="releaseinfo.lostHeight"></u-text>
				</u-form-item>
				<u-form-item label="详细描述">
					<u-text :text="releaseinfo.details"></u-text>
				</u-form-item>
			</view>
			
		
			<view v-if="vuex_user.role_id==3">
				<u-form-item>
					<view class="text">亲属关系</view>
				</u-form-item>
				<view class="form">
					<u-form-item label="关系">
						<u-text :text="releaseinfo.relation" ></u-text>
					</u-form-item>
					<u-form-item label="联系电话">
						<u-text :text="releaseinfo.phone" ></u-text>
					</u-form-item>
					<u-form-item label="联系邮箱">
						<u-text :text="releaseinfo.eMail" ></u-text>
					</u-form-item>
				</view>
				
			</view>
			
			
			<view style="height:110rpx;display: flex;align-items: center;justify-content: center;" >
				<button v-if="isrelease==0" style="width: 100px;text-align: center; color: white;background-color:#12AE85;">待审核</button>
				<button  v-else @click="changeform()" style="width: 100px;text-align: center; color: white;background-color:#12AE85;">修改信息</button>
				<!-- <button v-else-if="isrelease==0"  @click="changeform()"style="width: 100px;text-align: center; color: white;background-color:#12AE85;">已发布,点击修改</button>
				 -->
			</view>
			
		</u--form>
	</view>
</template>

<script>
	import {postchildrenbyid,postRelativeById} from '../../../common/config/api.js'
	export default {
		data() {
			return {
				/* 当前用户是否已发布消息，如果发布则查询，未发布则可以跳转到发布信息页面 */
				isrelease:null,
				releaseinfo:{},
				
			}
		},
		// onShow() {
		// 	this.lookmyrelease();
		// }
		onLoad() {
			//跳转到主界面
			
			this.lookmyrelease();
		},
		onUnload: function () {
		  	uni.switchTab({
		  		url: '/pages/mypages/users'
		  	});
		},
		methods: {
			lookmyrelease(){
				//如果用户的身份为走失者，那么就去children表中寻找数据
				console.log(this.vuex_user.role_id)
				console.log(this.vuex_user.user_id)
				switch(this.vuex_user.role_id){
					case 2:
						postchildrenbyid({user_id:this.vuex_user.user_id}).then((res)=>{
							this.releaseinfo=res.data;
							this.isrelease=res.data.isRelease
							console.log(this.releaseinfo)
						}).catch(()=>{
							
						})
						break;
					case 3:
					
						postRelativeById({user_id:this.vuex_user.user_id}).then((res)=>{
							this.isrelease=res.data.isRelease
							this.releaseinfo=res.data;
							console.log(this.releaseinfo)
						}).catch(()=>{
							
						})
					
						break;
					case 4:
						//
						break;
					default:
						//
				}
				
			},
			changeform(){
				uni.$u.route({
					url:'pages/mainpage/manageinfo/updateinfo'
				})
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.form{
		width: 90%;
		margin-left: 4%;
	}
	.text{
		margin-left: 2rpx;
		font-size: 28rpx;
		font-weight: bold;
		height: 50rpx;
		color: #767A82;
	}
</style>
